<?php

namespace App\Http\Controllers;

use App\Models\Navbar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class NavbarController extends Controller
{
    /**
     * Constructor with auth middleware
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of navbars with filtering options
     */
    public function index(Request $request)
    {
        // Check view permission
        if (
            !Auth::user()->hasPermissionTo('view_navbars') &&
            !Auth::user()->hasPermissionTo('manage_navbars')
        ) {
            abort(403, 'No tienes permiso para ver barras de navegación');
        }

        // Get pagination value from request, default to 10
        $perPage = $request->input('per_page', 10);

        // Validate per_page is one of allowed values
        if (!in_array($perPage, [10, 20, 30])) {
            $perPage = 10;
        }

        $query = Navbar::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('created_by')) {
            $query->where('created_by', $request->input('created_by'));
        }

        // Use dynamic pagination
        $navbars = $query->orderBy('created_at', 'desc')->paginate($perPage);

        $creators = User::whereIn('id', Navbar::distinct('created_by')->pluck('created_by'))
            ->get(['id', 'name']);

        return view('navbars.index', compact('navbars', 'creators'));
    }

    /**
     * Redirect to navbar editor for new navbar creation
     */
    public function create()
    {
        // Check create permission
        if (
            !Auth::user()->hasPermissionTo('create_navbars') &&
            !Auth::user()->hasPermissionTo('manage_navbars')
        ) {
            abort(403, 'No tienes permiso para crear barras de navegación');
        }

        return redirect()->route('navbar.editor.new');
    }

    /**
     * Store a newly created navbar (handled by NavbarEditorController)
     */
    public function store(Request $request)
    {
        // Handled by NavbarEditorController
    }

    /**
     * Redirect to editor view for the specified navbar
     */
    public function show(Navbar $navbar)
    {
        // Check view permission
        if (
            !Auth::user()->hasPermissionTo('view_navbars') &&
            !Auth::user()->hasPermissionTo('manage_navbars')
        ) {
            abort(403, 'No tienes permiso para ver barras de navegación');
        }

        return redirect()->route('navbar.editor.edit', $navbar->id);
    }

    /**
     * Redirect to editor for the specified navbar
     */
    public function edit(Navbar $navbar)
    {
        // Check edit permission
        if (
            !Auth::user()->hasPermissionTo('edit_navbars') &&
            !Auth::user()->hasPermissionTo('manage_navbars')
        ) {
            abort(403, 'No tienes permiso para editar barras de navegación');
        }

        return redirect()->route('navbar.editor.edit', $navbar->id);
    }

    /**
     * Update the specified navbar (handled by NavbarEditorController)
     */
    public function update(Request $request, Navbar $navbar)
    {
        // Handled by NavbarEditorController
    }

    /**
     * Remove the specified navbar from storage
     */
    public function destroy(Navbar $navbar)
    {
        // Check delete permission
        if (
            !Auth::user()->hasPermissionTo('delete_navbars') &&
            !Auth::user()->hasPermissionTo('manage_navbars')
        ) {
            abort(403, 'No tienes permiso para eliminar barras de navegación');
        }

        $navbar->delete();
        return redirect()->route('navbars.index')->with('success', 'Barra de navegación eliminada correctamente');
    }

    /**
     * Preview the navbar in a standalone view
     */
    public function preview(Navbar $navbar)
    {
        // Check preview permission
        if (
            !Auth::user()->hasPermissionTo('view_navbars') &&
            !Auth::user()->hasPermissionTo('manage_navbars')
        ) {
            abort(403, 'No tienes permiso para previsualizar barras de navegación');
        }

        return view('navbars.preview', compact('navbar'));
    }

    /**
     * Publish the navbar, changing its status
     */
    public function publish(Navbar $navbar)
    {
        // Check publish permission
        if (
            !Auth::user()->hasPermissionTo('publish_navbars') &&
            !Auth::user()->hasPermissionTo('manage_navbars')
        ) {
            abort(403, 'No tienes permiso para activar barras de navegación');
        }

        $navbar->update([
            'status' => 'published',
            'updated_by' => Auth::id()
        ]);

        return redirect()->route('navbars.index')->with('success', 'Barra de navegación publicada correctamente');
    }

    /**
     * Unpublish the specified navbar (change to draft)
     */
    public function unpublish(Navbar $navbar)
    {
        // Check publish permission
        if (
            !Auth::user()->hasPermissionTo('publish_navbars') &&
            !Auth::user()->hasPermissionTo('manage_navbars')
        ) {
            abort(403, 'No tienes permiso para desactivar barras de navegación');
        }

        $navbar->status = 'draft';
        $navbar->save();

        return redirect()->route('navbars.index')
            ->with('success', 'La barra de navegación ha sido cambiada a borrador correctamente.');
    }
}
