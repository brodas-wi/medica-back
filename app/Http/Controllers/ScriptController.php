<?php

namespace App\Http\Controllers;

use App\Models\Script;
use App\Models\User;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ScriptController extends Controller
{
    /**
     * Initialize controller with authentication middleware
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of scripts with filtering options
     */
    public function index(Request $request)
    {
        // Check view permission
        if (
            !Auth::user()->hasPermissionTo('view_scripts') &&
            !Auth::user()->hasPermissionTo('manage_scripts')
        ) {
            abort(403, 'No tienes permiso para ver scripts');
        }

        $query = Script::with(['creator', 'updater'])->orderBy('priority');

        // Apply search filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q
                    ->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")
                    ->orWhere('code', 'LIKE', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $isActive = $request->status === 'active';
            $query->where('is_active', $isActive);
        }

        // Filter by location
        if ($request->filled('location')) {
            $query->where('location', $request->location);
        }

        // Filter by creator
        if ($request->filled('created_by')) {
            $query->where('created_by', $request->created_by);
        }

        $scripts = $query->paginate(10);

        // Get creators for filter
        $creators = User::select('users.id', 'users.name')
            ->join('scripts', 'users.id', '=', 'scripts.created_by')
            ->distinct()
            ->get();

        return view('scripts.index', compact('scripts', 'creators'));
    }

    /**
     * Show the form for creating a new script
     */
    public function create()
    {
        if (
            !Auth::user()->hasPermissionTo('create_scripts') &&
            !Auth::user()->hasPermissionTo('manage_scripts')
        ) {
            abort(403, 'No tienes permiso para crear scripts');
        }

        $pages = Page::select('id', 'title', 'status')
            ->orderBy('title')
            ->get();

        return view('scripts.create', compact('pages'));
    }

    /**
     * Store a newly created script in storage
     */
    public function store(Request $request)
    {
        // Check create permission
        if (
            !Auth::user()->hasPermissionTo('create_scripts') &&
            !Auth::user()->hasPermissionTo('manage_scripts')
        ) {
            abort(403, 'No tienes permiso para crear scripts');
        }

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'code' => 'required|string',
                'location' => 'required|in:header,body,footer',
                'priority' => 'nullable|integer|min:1',
                'scope' => 'required|in:global,specific',
                'page_ids' => 'required_if:scope,specific|array',
                'page_ids.*' => 'exists:pages,id'
            ]);

            if ($validator->fails()) {
                return redirect()
                    ->back()
                    ->withErrors($validator)
                    ->withInput();
            }

            $script = new Script();
            $script->name = $request->name;
            $script->description = $request->description;
            $script->code = $request->code;
            $script->location = $request->location;
            $script->is_active = $request->has('is_active');
            $script->priority = $request->priority ?? 10;
            $script->scope = $request->scope ?? 'global';
            $script->page_ids = $request->scope === 'specific' ? $request->page_ids : null;
            $script->created_by = Auth::id();
            $script->updated_by = Auth::id();
            $script->save();

            return redirect()
                ->route('scripts.index')
                ->with('success', 'Script creado correctamente.');
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Error al guardar el script: ' . $e->getMessage());

            // Return with error message
            return redirect()
                ->back()
                ->with('error', 'Error al guardar el script: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Display detailed information about a specific script
     */
    public function show(Script $script)
    {
        // Check view permission
        if (
            !Auth::user()->hasPermissionTo('view_scripts') &&
            !Auth::user()->hasPermissionTo('manage_scripts')
        ) {
            abort(403, 'No tienes permiso para ver scripts');
        }

        return view('scripts.show', compact('script'));
    }

    /**
     * Show the form for editing a script
     */
    public function edit(Script $script)
    {
        if (
            !Auth::user()->hasPermissionTo('edit_scripts') &&
            !Auth::user()->hasPermissionTo('manage_scripts')
        ) {
            abort(403, 'No tienes permiso para editar scripts');
        }

        $pages = Page::select('id', 'title', 'status')
            ->orderBy('title')
            ->get();

        return view('scripts.edit', compact('script', 'pages'));
    }

    /**
     * Update a script's content and configuration
     */
    public function update(Request $request, Script $script)
    {
        // Check edit permission
        if (
            !Auth::user()->hasPermissionTo('edit_scripts') &&
            !Auth::user()->hasPermissionTo('manage_scripts')
        ) {
            abort(403, 'No tienes permiso para editar scripts');
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'required|string',
            'location' => 'required|in:header,body,footer',
            'priority' => 'nullable|integer|min:1',
            'scope' => 'required|in:global,specific',
            'page_ids' => 'required_if:scope,specific|array',
            'page_ids.*' => 'exists:pages,id'
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $script->name = $request->name;
        $script->description = $request->description;
        $script->code = $request->code;
        $script->location = $request->location;
        $script->is_active = $request->has('is_active');
        $script->priority = $request->priority ?? 10;
        $script->scope = $request->scope ?? 'global';
        $script->page_ids = $request->scope === 'specific' ? $request->page_ids : null;
        $script->updated_by = Auth::id();
        $script->save();

        return redirect()
            ->route('scripts.index')
            ->with('success', 'Script actualizado correctamente.');
    }

    /**
     * Remove a script from the database
     */
    public function destroy(Script $script)
    {
        // Check delete permission
        if (
            !Auth::user()->hasPermissionTo('delete_scripts') &&
            !Auth::user()->hasPermissionTo('manage_scripts')
        ) {
            abort(403, 'No tienes permiso para eliminar scripts');
        }

        $script->delete();
        return redirect()
            ->route('scripts.index')
            ->with('success', 'Script eliminado correctamente.');
    }

    /**
     * Display a preview of how the script will render
     */
    public function preview(Script $script)
    {
        // Check preview permission
        if (
            !Auth::user()->hasPermissionTo('view_scripts') &&
            !Auth::user()->hasPermissionTo('manage_scripts')
        ) {
            abort(403, 'No tienes permiso para previsualizar scripts');
        }

        return view('scripts.preview', compact('script'));
    }

    /**
     * Toggle the active status of a script
     */
    public function toggleStatus(Script $script)
    {
        // Check toggle permission
        if (
            !Auth::user()->hasPermissionTo('toggle_scripts') &&
            !Auth::user()->hasPermissionTo('manage_scripts')
        ) {
            abort(403, 'No tienes permiso para activar o desactivar scripts');
        }

        $script->is_active = !$script->is_active;
        $script->updated_by = Auth::id();
        $script->save();

        $status = $script->is_active ? 'activado' : 'desactivado';
        return redirect()
            ->route('scripts.index')
            ->with('success', "Script {$status} correctamente.");
    }

    /**
     * Get all active scripts ordered by priority for use in the site
     */
    public function getActiveScripts()
    {
        // No permission check needed as this is a public API endpoint
        $scripts = Script::where('is_active', true)
            ->orderBy('priority')
            ->get(['id', 'name', 'code', 'location', 'priority']);

        return response()->json($scripts);
    }
}
