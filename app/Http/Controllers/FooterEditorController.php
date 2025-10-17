<?php

namespace App\Http\Controllers;

use App\Models\Footer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FooterEditorController extends Controller
{
    /**
     * Initialize controller with authentication middleware
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display the GrapesJS editor for footer creation or editing
     */
    public function edit($id = null)
    {
        if ($id) {
            // Editing existing footer
            $footer = Footer::findOrFail($id);

            // Check edit permission
            if (
                !Auth::user()->hasPermissionTo('edit_footers') &&
                !Auth::user()->hasPermissionTo('manage_footers')
            ) {
                abort(403, 'No tienes permiso para editar pies de página');
            }

            return view('footers.editor', compact('footer'));
        } else {
            // Creating new footer
            if (
                !Auth::user()->hasPermissionTo('create_footers') &&
                !Auth::user()->hasPermissionTo('manage_footers')
            ) {
                abort(403, 'No tienes permiso para crear pies de página');
            }

            return view('footers.editor');
        }
    }

    /**
     * Load footer content and settings for the editor
     */
    public function load($id)
    {
        $footer = Footer::findOrFail($id);

        // Check if user can edit or create footers
        if (!Auth::user()->hasAnyPermission(['edit_footers', 'create_footers', 'manage_footers'])) {
            abort(403, 'No tienes permiso para cargar el contenido de pies de página');
        }

        return response()->json([
            'html' => $footer->content,
            'css' => $footer->css,
            'js' => $footer->js,
            'components' => $footer->components
        ]);
    }

    /**
     * Store footer content, CSS, JavaScript and component configurations
     */
    public function store(Request $request)
    {
        if ($request->has('id')) {
            // Update existing footer
            $footer = Footer::findOrFail($request->id);

            // Check edit permission
            if (
                !Auth::user()->hasPermissionTo('edit_footers') &&
                !Auth::user()->hasPermissionTo('manage_footers')
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permiso para editar pies de página'
                ], 403);
            }

            $footer->update([
                'content' => $request->html,
                'css' => $request->css ?? null,
                'js' => $request->js ?? null,
                'components' => $request->components ?? null,
                'updated_by' => Auth::id(),
            ]);
        } else {
            // Create new footer
            // Check create permission
            if (
                !Auth::user()->hasPermissionTo('create_footers') &&
                !Auth::user()->hasPermissionTo('manage_footers')
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permiso para crear pies de página'
                ], 403);
            }

            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $slug = Str::slug($request->name);

            // Check if slug exists and append a number if needed
            $existingCount = Footer::where('slug', 'like', $slug . '%')->count();
            if ($existingCount > 0) {
                $slug = $slug . '-' . ($existingCount + 1);
            }

            $footer = Footer::create([
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
            'id' => $footer->id,
            'message' => 'Footer se ha guardado correctamente.'
        ]);
    }
}
