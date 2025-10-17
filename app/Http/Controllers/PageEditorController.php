<?php

namespace App\Http\Controllers;

use App\Models\CustomBlock;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PageEditorController extends Controller
{
    /**
     * Initialize controller with authentication middleware
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display the GrapesJS editor for page creation or editing
     */
    public function edit($id = null)
    {
        $customBlocks = CustomBlock::where('active', true)->get();

        if ($id) {
            // Editing existing page
            $page = Page::findOrFail($id);

            // Check edit permission
            if (
                !Auth::user()->hasPermissionTo('edit_pages') &&
                !Auth::user()->hasPermissionTo('manage_pages')
            ) {
                abort(403, 'No tienes permiso para editar páginas');
            }

            return view('pages.editor', compact('page', 'customBlocks'));
        } else {
            // Creating new page
            if (
                !Auth::user()->hasPermissionTo('create_pages') &&
                !Auth::user()->hasPermissionTo('manage_pages')
            ) {
                abort(403, 'No tienes permiso para crear páginas');
            }

            return view('pages.editor', compact('customBlocks'));
        }
    }

    /**
     * Load page content and settings for the editor
     */
    public function load($id)
    {
        $page = Page::findOrFail($id);

        // Check if user can edit or create pages
        if (!Auth::user()->hasAnyPermission(['edit_pages', 'create_pages', 'manage_pages'])) {
            abort(403, 'No tienes permiso para cargar el contenido de páginas');
        }

        return response()->json([
            'html' => $page->content,
            'css' => $page->css,
            'js' => $page->js
        ]);
    }

    /**
     * Store page content, CSS and JavaScript from the editor
     */
    public function store(Request $request)
    {
        // Clean and sanitize JS content
        $jsContent = $request->js;

        if ($request->has('id')) {
            // Update existing page
            $page = Page::findOrFail($request->id);

            // Check edit permission
            if (
                !Auth::user()->hasPermissionTo('edit_pages') &&
                !Auth::user()->hasPermissionTo('manage_pages')
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permiso para editar páginas'
                ], 403);
            }

            $page->update([
                'content' => $request->html,
                'css' => $request->css ?? null,
                'js' => $jsContent,
                'updated_by' => Auth::id(),
            ]);
        } else {
            // Create new page
            // Check create permission
            if (
                !Auth::user()->hasPermissionTo('create_pages') &&
                !Auth::user()->hasPermissionTo('manage_pages')
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permiso para crear páginas'
                ], 403);
            }

            $request->validate([
                'title' => 'required|string|max:255',
            ]);

            $slug = Str::slug($request->title);

            // Check if slug exists and append a number if needed
            $existingCount = Page::where('slug', 'like', $slug . '%')->count();
            if ($existingCount > 0) {
                $slug = $slug . '-' . ($existingCount + 1);
            }

            $page = Page::create([
                'title' => $request->title,
                'slug' => $slug,
                'content' => $request->html,
                'css' => $request->css ?? null,
                'js' => $jsContent,
                'status' => 'draft',
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]);
        }

        return response()->json([
            'success' => true,
            'id' => $page->id,
            'message' => 'Page saved successfully.'
        ]);
    }

    /**
     * Upload media assets for use in the page editor
     */
    public function uploadAsset(Request $request)
    {
        // Check upload permission - requires either edit or create permissions
        if (!Auth::user()->hasAnyPermission(['upload_media', 'manage_media'])) {
            return response()->json([
                'success' => false,
                'message' => 'No tienes permiso para subir archivos'
            ], 403);
        }

        $request->validate([
            'files.*' => 'required|file|max:2048',  // 2MB max
        ]);

        $uploadedFiles = [];

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('uploads'), $filename);
                $uploadedFiles[] = [
                    'src' => '/uploads/' . $filename,
                ];
            }
        }

        return response()->json(['data' => $uploadedFiles]);
    }
}
