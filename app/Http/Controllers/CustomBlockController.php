<?php

namespace App\Http\Controllers;

use App\Models\CustomBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CustomBlockController extends Controller
{
    /**
     * Constructor applying auth middleware and setting up permissions
     */
    public function __construct()
    {
        $this->middleware('auth');
        // Excluimos getActiveBlocks porque se usa desde la API pública
    }

    /**
     * Display a listing of custom blocks with filtering options
     */
    public function index(Request $request)
    {
        // Check view permission
        if (
            !auth()->user()->hasPermissionTo('view_blocks') &&
            !auth()->user()->hasPermissionTo('manage_blocks')
        ) {
            abort(403, 'No tienes permiso para ver bloques personalizados');
        }

        $query = CustomBlock::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q
                    ->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('category') && !empty($request->category)) {
            $query->where('category', $request->category);
        }

        if ($request->has('status')) {
            if ($request->status == 'active') {
                $query->where('active', true);
            } elseif ($request->status == 'inactive') {
                $query->where('active', false);
            }
        }

        $blocks = $query
            ->orderBy('category')
            ->orderBy('name')
            ->paginate(10);

        $categories = CustomBlock::getCategories();

        return view('custom_blocks.index', compact('blocks', 'categories'));
    }

    /**
     * Show the form for creating a new custom block
     */
    public function create()
    {
        // Check create permission
        if (
            !auth()->user()->hasPermissionTo('create_blocks') &&
            !auth()->user()->hasPermissionTo('manage_blocks')
        ) {
            abort(403, 'No tienes permiso para crear bloques personalizados');
        }

        $categories = CustomBlock::getCategories();
        return view('custom_blocks.create', compact('categories'));
    }

    /**
     * Store a newly created custom block in the database
     */
    public function store(Request $request)
    {
        // Check create permission
        if (
            !auth()->user()->hasPermissionTo('create_blocks') &&
            !auth()->user()->hasPermissionTo('manage_blocks')
        ) {
            abort(403, 'No tienes permiso para crear bloques personalizados');
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'html_content' => 'required|string',
            'icon_type' => 'required|in:remix,svg',
            'icon' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $block = CustomBlock::create([
            'name' => $request->name,
            'description' => $request->description,
            'category' => $request->category,
            'html_content' => $request->html_content,
            'css_content' => $request->css_content,
            'js_content' => $request->js_content,
            'admin_js' => $request->admin_js,
            'icon_type' => $request->icon_type,
            'icon' => $request->icon,
            'settings' => $request->settings ? json_decode($request->settings) : null,
            'active' => $request->has('active'),
        ]);

        return redirect()
            ->route('custom-blocks.index')
            ->with('success', 'Bloque personalizado creado exitosamente.');
    }

    /**
     * Display the specified custom block
     */
    public function show(CustomBlock $customBlock)
    {
        // Check view permission
        if (
            !auth()->user()->hasPermissionTo('view_blocks') &&
            !auth()->user()->hasPermissionTo('manage_blocks')
        ) {
            abort(403, 'No tienes permiso para ver bloques personalizados');
        }

        return view('custom_blocks.show', compact('customBlock'));
    }

    /**
     * Show the form for editing the specified custom block
     */
    public function edit(CustomBlock $customBlock)
    {
        // Check edit permission
        if (
            !auth()->user()->hasPermissionTo('edit_blocks') &&
            !auth()->user()->hasPermissionTo('manage_blocks')
        ) {
            abort(403, 'No tienes permiso para editar bloques personalizados');
        }

        $categories = CustomBlock::getCategories();
        return view('custom_blocks.edit', compact('customBlock', 'categories'));
    }

    /**
     * Update the specified custom block in the database
     */
    public function update(Request $request, CustomBlock $customBlock)
    {
        // Check edit permission
        if (
            !auth()->user()->hasPermissionTo('edit_blocks') &&
            !auth()->user()->hasPermissionTo('manage_blocks')
        ) {
            abort(403, 'No tienes permiso para editar bloques personalizados');
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'html_content' => 'required|string',
            'icon_type' => 'required|in:remix,svg',
            'icon' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $customBlock->update([
            'name' => $request->name,
            'description' => $request->description,
            'category' => $request->category,
            'html_content' => $request->html_content,
            'css_content' => $request->css_content,
            'js_content' => $request->js_content,
            'admin_js' => $request->admin_js,
            'icon_type' => $request->icon_type,
            'icon' => $request->icon,
            'settings' => $request->settings ? json_decode($request->settings) : null,
            'active' => $request->has('active'),
        ]);

        return redirect()
            ->route('custom-blocks.index')
            ->with('success', 'Bloque personalizado actualizado exitosamente.');
    }

    /**
     * Remove the specified custom block from the database
     */
    public function destroy(CustomBlock $customBlock)
    {
        // Check delete permission
        if (
            !auth()->user()->hasPermissionTo('delete_blocks') &&
            !auth()->user()->hasPermissionTo('manage_blocks')
        ) {
            abort(403, 'No tienes permiso para eliminar bloques personalizados');
        }

        $customBlock->delete();

        return redirect()
            ->route('custom-blocks.index')
            ->with('success', 'Bloque personalizado eliminado exitosamente.');
    }

    /**
     * Toggle the active status of a custom block
     */
    public function toggleStatus(CustomBlock $customBlock)
    {
        // Check toggle permission
        if (
            !auth()->user()->hasPermissionTo('toggle_blocks') &&
            !auth()->user()->hasPermissionTo('manage_blocks')
        ) {
            return response()->json([
                'success' => false,
                'message' => 'No tienes permiso para activar o desactivar bloques personalizados'
            ], 403);
        }

        $customBlock->active = !$customBlock->active;
        $customBlock->save();

        return response()->json([
            'success' => true,
            'active' => $customBlock->active
        ]);
    }

    /**
     * Get all active custom blocks as JSON for GrapesJS
     */
    public function getActiveBlocks()
    {
        // No permission check needed as this is a public API endpoint
        $blocks = CustomBlock::where('active', true)->get();
        return response()->json($blocks);
    }
}
