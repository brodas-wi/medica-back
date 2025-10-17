<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Constructor - ensure authentication
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of users
     */
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('view_users') && !auth()->user()->hasPermissionTo('manage_users')) {
            abort(403, 'No tienes permiso para ver usuarios.');
        }

        $query = User::with('roles')->orderBy('id', 'desc');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q
                    ->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->role($request->role);
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->status);
        }

        $perPage = $request->get('per_page', 10); // Default to 10 if not specified
        $users = $query->paginate($perPage);
        $roles = Role::all();

        return view('users.index', compact('users', 'roles'));
    }

    /**
     * Show form to create a new user
     */
    public function create()
    {
        if (!auth()->user()->hasPermissionTo('create_users') && !auth()->user()->hasPermissionTo('manage_users')) {
            abort(403, 'No tienes permiso para crear usuarios.');
        }

        $roles = Role::all();
        return view('users.create', compact('roles'));
    }

    /**
     * Store a newly created user
     */
    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('create_users') && !auth()->user()->hasPermissionTo('manage_users')) {
            abort(403, 'No tienes permiso para crear usuarios.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/'],
            'email' => ['required', 'string', 'email:rfc,dns', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'confirmed', Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
            'role' => ['required', 'exists:roles,name'],
        ], [
            'name.regex' => 'El nombre solo debe contener letras y espacios.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'email.unique' => 'Este correo electrónico ya está en uso.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.letters' => 'La contraseña debe contener al menos una letra.',
            'password.mixed_case' => 'La contraseña debe contener letras mayúsculas y minúsculas.',
            'password.numbers' => 'La contraseña debe contener al menos un número.',
            'password.symbols' => 'La contraseña debe contener al menos un símbolo.',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'is_active' => $request->has('is_active'),
        ]);

        if ($user) {
            $user->assignRole($validated['role']);

            return redirect()
                ->route('users.index')
                ->with('success', 'Usuario creado correctamente.');
        } else {
            return back()
                ->with('error', 'Ha ocurrido un error al crear el usuario.')
                ->withInput();
        }
    }

    /**
     * Display a specific user
     */
    public function show(User $user)
    {
        if (!auth()->user()->hasPermissionTo('view_users') && !auth()->user()->hasPermissionTo('manage_users')) {
            abort(403, 'No tienes permiso para ver usuarios.');
        }

        return view('users.show', compact('user'));
    }

    /**
     * Show form to edit a user
     */
    public function edit(User $user)
    {
        if (!auth()->user()->hasPermissionTo('edit_users') && !auth()->user()->hasPermissionTo('manage_users')) {
            abort(403, 'No tienes permiso para editar usuarios.');
        }

        $roles = Role::all();
        return view('users.edit', compact('user', 'roles'));
    }

    /**
     * Update a specific user
     */
    public function update(Request $request, User $user)
    {
        if (!auth()->user()->hasPermissionTo('edit_users') && !auth()->user()->hasPermissionTo('manage_users')) {
            abort(403, 'No tienes permiso para editar usuarios.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/'],
            'email' => ['required', 'string', 'email:rfc,dns', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => ['required', 'exists:roles,name'],
        ], [
            'name.regex' => 'El nombre solo debe contener letras y espacios.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
        ]);

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'is_active' => $request->has('is_active'),
        ];

        if ($request->filled('password')) {
            $request->validate([
                'password' => ['string', 'confirmed', Password::min(8)->letters()->mixedCase()->numbers()->symbols()],
            ], [
                'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
                'password.letters' => 'La contraseña debe contener al menos una letra.',
                'password.mixed_case' => 'La contraseña debe contener letras mayúsculas y minúsculas.',
                'password.numbers' => 'La contraseña debe contener al menos un número.',
                'password.symbols' => 'La contraseña debe contener al menos un símbolo.',
            ]);
            $data['password'] = Hash::make($request->password);
        }

        // Update user data first
        $updated = $user->update($data);

        // Then sync roles using Spatie's syncRoles method
        $user->syncRoles([$validated['role']]);

        if ($updated) {
            return redirect()
                ->route('users.index')
                ->with('success', 'Usuario actualizado correctamente.');
        } else {
            return back()->with('error', 'Ha ocurrido un error al actualizar el usuario.');
        }
    }

    /**
     * Delete a user
     */
    public function destroy(User $user)
    {
        if (!auth()->user()->hasPermissionTo('delete_users') && !auth()->user()->hasPermissionTo('manage_users')) {
            abort(403, 'No tienes permiso para eliminar usuarios.');
        }

        if ($user->id === auth()->id()) {
            return redirect()
                ->route('users.index')
                ->with('error', 'No puedes eliminar tu propio usuario.');
        }

        if ($user->delete()) {
            return redirect()
                ->route('users.index')
                ->with('success', 'Usuario eliminado correctamente.');
        } else {
            return redirect()
                ->route('users.index')
                ->with('error', 'Ha ocurrido un error al eliminar el usuario.');
        }
    }

    /**
     * Verify admin password before allowing edit of admin user
     */
    public function verifyAdminPassword(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'admin_password' => 'required',
            'redirect_url' => 'required|string',
            'user_id' => 'required|exists:users,id'
        ]);

        // Check if the password matches
        if (!Hash::check($validated['admin_password'], auth()->user()->password)) {
            return back()->with('error', 'La contraseña ingresada es incorrecta.');
        }

        // If password is correct, redirect to the edit page
        return redirect($validated['redirect_url']);
    }
}
