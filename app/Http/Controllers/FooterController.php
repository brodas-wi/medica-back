<?php

namespace App\Http\Controllers;

use App\Models\Footer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FooterController extends Controller
{
    /**
     * Constructor with auth middleware
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of footers with filtering options
     */
    public function index(Request $request)
    {
        // Check view permission
        if (
            !Auth::user()->hasPermissionTo('view_footers') &&
            !Auth::user()->hasPermissionTo('manage_footers')
        ) {
            abort(403, 'No tienes permiso para ver pies de página');
        }

        // Get pagination value from request, default to 10
        $perPage = $request->input('per_page', 10);

        // Validate per_page is one of allowed values
        if (!in_array($perPage, [10, 20, 30])) {
            $perPage = 10;
        }

        $query = Footer::query();

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
        $footers = $query->orderBy('created_at', 'desc')->paginate($perPage);

        $creators = User::whereIn('id', Footer::distinct('created_by')->pluck('created_by'))
            ->get(['id', 'name']);

        return view('footers.index', compact('footers', 'creators'));
    }

    /**
     * Redirect to footer editor for new footer creation
     */
    public function create()
    {
        // Check create permission
        if (
            !Auth::user()->hasPermissionTo('create_footers') &&
            !Auth::user()->hasPermissionTo('manage_footers')
        ) {
            abort(403, 'No tienes permiso para crear pies de página');
        }

        return redirect()->route('footer.editor.new');
    }

    /**
     * Store a newly created footer (handled by FooterEditorController)
     */
    public function store(Request $request)
    {
        // Handled by FooterEditorController
    }

    /**
     * Redirect to editor view for the specified footer
     */
    public function show(Footer $footer)
    {
        // Check view permission
        if (
            !Auth::user()->hasPermissionTo('view_footers') &&
            !Auth::user()->hasPermissionTo('manage_footers')
        ) {
            abort(403, 'No tienes permiso para ver pies de página');
        }

        return redirect()->route('footer.editor.edit', $footer->id);
    }

    /**
     * Redirect to editor for the specified footer
     */
    public function edit(Footer $footer)
    {
        // Check edit permission
        if (
            !Auth::user()->hasPermissionTo('edit_footers') &&
            !Auth::user()->hasPermissionTo('manage_footers')
        ) {
            abort(403, 'No tienes permiso para editar pies de página');
        }

        return redirect()->route('footer.editor.edit', $footer->id);
    }

    /**
     * Update the specified footer (handled by FooterEditorController)
     */
    public function update(Request $request, Footer $footer)
    {
        // Handled by FooterEditorController
    }

    /**
     * Remove the specified footer from storage
     */
    public function destroy(Footer $footer)
    {
        // Check delete permission
        if (
            !Auth::user()->hasPermissionTo('delete_footers') &&
            !Auth::user()->hasPermissionTo('manage_footers')
        ) {
            abort(403, 'No tienes permiso para eliminar pies de página');
        }

        $footer->delete();
        return redirect()->route('footers.index')->with('success', 'Pie de página eliminado correctamente');
    }

    /**
     * Preview the footer in a standalone view
     */
    public function preview(Footer $footer)
    {
        // Check preview permission
        if (
            !Auth::user()->hasPermissionTo('view_footers') &&
            !Auth::user()->hasPermissionTo('manage_footers')
        ) {
            abort(403, 'No tienes permiso para previsualizar pies de página');
        }

        return view('footers.preview', compact('footer'));
    }

    /**
     * Publish the footer, changing its status
     */
    public function publish(Footer $footer)
    {
        // Check publish permission
        if (
            !Auth::user()->hasPermissionTo('publish_footers') &&
            !Auth::user()->hasPermissionTo('manage_footers')
        ) {
            abort(403, 'No tienes permiso para publicar pies de página');
        }

        $footer->update([
            'status' => 'published',
            'updated_by' => Auth::id()
        ]);

        return redirect()->route('footers.index')->with('success', 'Pie de página publicado correctamente');
    }
}
