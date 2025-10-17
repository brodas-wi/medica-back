<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Create a new controller instance
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display list of roles with filters
     */
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('view_roles') && !auth()->user()->hasPermissionTo('manage_roles')) {
            abort(403, 'No tienes permiso para ver roles.');
        }

        $query = Role::withCount('users')->withCount('permissions');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('users')) {
            if ($request->users === 'with') {
                $query->has('users');
            } elseif ($request->users === 'without') {
                $query->doesntHave('users');
            }
        }

        $roles = $query->paginate(10);

        return view('roles.index', compact('roles'));
    }

    /**
     * Show role creation form
     */
    public function create()
    {
        if (!auth()->user()->hasPermissionTo('create_roles') && !auth()->user()->hasPermissionTo('manage_roles')) {
            abort(403, 'No tienes permiso para crear roles.');
        }

        return view('roles.create');
    }

    /**
     * Store new role
     */
    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('create_roles') && !auth()->user()->hasPermissionTo('manage_roles')) {
            abort(403, 'No tienes permiso para crear roles.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'description' => 'nullable|string|max:255',
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'guard_name' => 'web',
            'description' => $validated['description']
        ]);

        return redirect()->route('roles.index')->with('success', 'Rol creado correctamente.');
    }

    /**
     * Show role details
     */
    public function show(Role $role)
    {
        if (!auth()->user()->hasPermissionTo('view_roles') && !auth()->user()->hasPermissionTo('manage_roles')) {
            abort(403, 'No tienes permiso para ver roles.');
        }

        return view('roles.show', compact('role'));
    }

    /**
     * Show role edit form
     */
    public function edit(Role $role)
    {
        if (!auth()->user()->hasPermissionTo('edit_roles') && !auth()->user()->hasPermissionTo('manage_roles')) {
            abort(403, 'No tienes permiso para editar roles.');
        }

        return view('roles.edit', compact('role'));
    }

    /**
     * Update role
     */
    public function update(Request $request, Role $role)
    {
        if (!auth()->user()->hasPermissionTo('edit_roles') && !auth()->user()->hasPermissionTo('manage_roles')) {
            abort(403, 'No tienes permiso para editar roles.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('roles')->ignore($role->id)],
            'description' => 'nullable|string|max:255',
        ]);

        $role->name = $validated['name'];
        $role->description = $validated['description'];
        $role->save();

        return redirect()->route('roles.index')->with('success', 'Rol actualizado correctamente.');
    }

    /**
     * Delete role
     */
    public function destroy(Role $role)
    {
        if (!auth()->user()->hasPermissionTo('delete_roles') && !auth()->user()->hasPermissionTo('manage_roles')) {
            abort(403, 'No tienes permiso para eliminar roles.');
        }

        if ($role->users->count() > 0) {
            return redirect()->route('roles.index')->with('error', 'No se puede eliminar un rol con usuarios asignados.');
        }

        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Rol eliminado correctamente.');
    }

    /**
     * Show permissions management form
     */
    public function permissions(Role $role)
    {
        if (!auth()->user()->hasPermissionTo('edit_roles') && !auth()->user()->hasPermissionTo('manage_roles')) {
            abort(403, 'No tienes permiso para gestionar permisos de roles.');
        }

        $permissions = Permission::all();
        return view('roles.permissions', compact('role', 'permissions'));
    }

    /**
     * Update role permissions
     */
    public function updatePermissions(Request $request, Role $role)
    {
        // Direct permission check for more reliable validation
        if (!auth()->user()->hasPermissionTo('edit_roles') && !auth()->user()->hasPermissionTo('manage_roles')) {
            abort(403, 'No tienes permiso para gestionar permisos de roles.');
        }

        $permissions = [];
        if ($request->has('permissions')) {
            foreach ($request->input('permissions', []) as $permissionId) {
                $permission = Permission::find($permissionId);
                if ($permission) {
                    $permissions[] = $permission->name;
                }
            }
        }

        $role->syncPermissions($permissions);

        return redirect()->route('roles.index')->with('success', 'Permisos actualizados correctamente.');
    }
}
