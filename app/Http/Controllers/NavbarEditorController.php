<?php

namespace App\Http\Controllers;

use App\Models\Navbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class NavbarEditorController extends Controller
{
    /**
     * Initialize controller with authentication middleware
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display the GrapesJS editor for navbar creation or editing
     */
    public function edit($id = null)
    {
        if ($id) {
            // Editing existing navbar
            $navbar = Navbar::findOrFail($id);

            // Check edit permission
            if (
                !Auth::user()->hasPermissionTo('edit_navbars') &&
                !Auth::user()->hasPermissionTo('manage_navbars')
            ) {
                abort(403, 'No tienes permiso para editar barras de navegación');
            }

            return view('navbars.editor', compact('navbar'));
        } else {
            // Creating new navbar
            if (
                !Auth::user()->hasPermissionTo('create_navbars') &&
                !Auth::user()->hasPermissionTo('manage_navbars')
            ) {
                abort(403, 'No tienes permiso para crear barras de navegación');
            }

            return view('navbars.editor');
        }
    }

    /**
     * Load navbar content and settings for the editor
     */
    public function load($id)
    {
        $navbar = Navbar::findOrFail($id);

        // Check if user can edit or create navbars
        if (!Auth::user()->hasAnyPermission(['edit_navbars', 'create_navbars', 'manage_navbars'])) {
            abort(403, 'No tienes permiso para cargar el contenido de barras de navegación');
        }

        return response()->json([
            'html' => $navbar->content,
            'css' => $navbar->css,
            'js' => $navbar->js,
            'components' => $navbar->components
        ]);
    }

    /**
     * Store navbar content, CSS, JavaScript and component configurations
     */
    public function store(Request $request)
    {
        if ($request->has('id')) {
            // Update existing navbar
            $navbar = Navbar::findOrFail($request->id);

            // Check edit permission
            if (
                !Auth::user()->hasPermissionTo('edit_navbars') &&
                !Auth::user()->hasPermissionTo('manage_navbars')
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permiso para editar barras de navegación'
                ], 403);
            }

            $navbar->update([
                'content' => $request->html,
                'css' => $request->css ?? null,
                'js' => $request->js ?? null,
                'components' => $request->components ?? null,
                'updated_by' => Auth::id(),
            ]);
        } else {
            // Create new navbar
            // Check create permission
            if (
                !Auth::user()->hasPermissionTo('create_navbars') &&
                !Auth::user()->hasPermissionTo('manage_navbars')
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permiso para crear barras de navegación'
                ], 403);
            }

            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $slug = Str::slug($request->name);

            // Check if slug exists and append a number if needed
            $existingCount = Navbar::where('slug', 'like', $slug . '%')->count();
            if ($existingCount > 0) {
                $slug = $slug . '-' . ($existingCount + 1);
            }

            $navbar = Navbar::create([
                'name' => $request->name,
                'slug' => $slug,
                'content' => $request->html,
                'css' => $request->css ?? null,
                'js' => $request->js ?? null,
                'components' => $request->components ?? null,
                'status' => 'draft',
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]);
        }

        return response()->json([
            'success' => true,
            'id' => $navbar->id,
            'message' => 'Navbar guardado correctamente.'
        ]);
    }
}
