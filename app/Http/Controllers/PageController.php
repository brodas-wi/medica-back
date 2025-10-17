<?php

namespace App\Http\Controllers;

use App\Models\Footer;
use App\Models\Navbar;
use App\Models\Page;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PageController extends Controller
{
    /**
     * Initialize controller with authentication middleware
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of pages with optional filtering
     */
    public function index(Request $request)
    {
        // Check view permission
        if (
            !Auth::user()->hasPermissionTo('view_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para ver páginas');
        }

        // Get pagination value from request, default to 10
        $perPage = $request->input('per_page', 10);

        // Validate per_page is one of allowed values
        if (!in_array($perPage, [10, 20, 30])) {
            $perPage = 10;
        }

        $query = Page::with(['creator', 'updater', 'navbar', 'footer'])->latest();

        // Apply search filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q
                    ->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('content', 'LIKE', "%{$search}%")
                    ->orWhere('slug', 'LIKE', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by creator
        if ($request->filled('created_by')) {
            $query->where('created_by', $request->created_by);
        }

        // Use dynamic pagination
        $pages = $query->paginate($perPage);

        // Get creators list for filter dropdown
        $creators = User::select('users.id', 'users.name')
            ->join('pages', 'users.id', '=', 'pages.created_by')
            ->distinct()
            ->get();

        return view('pages.index', compact('pages', 'creators'));
    }

    /**
     * Redirect to page editor for new page creation
     */
    public function create()
    {
        // Check create permission
        if (
            !Auth::user()->hasPermissionTo('create_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para crear páginas');
        }

        return redirect()->route('editor.new');
    }

    /**
     * Display the specified page details
     */
    public function show(Page $page)
    {
        // Check view permission
        if (
            !Auth::user()->hasPermissionTo('view_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para ver páginas');
        }

        return view('pages.show', compact('page'));
    }

    /**
     * Redirect to editor for the specified page
     */
    public function edit(Page $page)
    {
        // Check edit permission
        if (
            !Auth::user()->hasPermissionTo('edit_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para editar páginas');
        }

        return redirect()->route('editor.edit', $page->id);
    }

    /**
     * Create a duplicate of an existing page with a new title
     */
    public function duplicate(Request $request, Page $page)
    {
        // Check create permission
        if (
            !Auth::user()->hasPermissionTo('create_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para duplicar páginas');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // Generate unique slug from new title
        $baseSlug = Str::slug($validated['title']);
        $slug = $baseSlug;
        $counter = 1;

        while (Page::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        // Create duplicated page
        $duplicatedPage = $page->replicate();
        $duplicatedPage->title = $validated['title'];
        $duplicatedPage->slug = $slug;
        $duplicatedPage->status = 'draft';
        $duplicatedPage->created_by = Auth::id();
        $duplicatedPage->updated_by = Auth::id();
        $duplicatedPage->published_at = null;
        $duplicatedPage->save();

        return redirect()
            ->route('pages.settings', $duplicatedPage->id)
            ->with('success', 'Página duplicada correctamente.');
    }

    /**
     * Remove a page from the database
     */
    public function destroy(Page $page)
    {
        // Check delete permission
        if (
            !Auth::user()->hasPermissionTo('delete_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para eliminar páginas');
        }

        $page->delete();
        return redirect()->route('pages.index')->with('success', 'Página eliminada correctamente.');
    }

    /**
     * Display a preview of the page with its navbar and footer
     */
    public function preview(Page $page)
    {
        // Check preview permission
        if (
            !Auth::user()->hasPermissionTo('view_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para previsualizar páginas');
        }

        // Load page with navbar and footer relationships
        $page->load(['navbar', 'footer']);
        return view('pages.preview', compact('page'));
    }

    /**
     * Change a page's status to published
     */
    public function publish(Page $page)
    {
        // Check publish permission
        if (
            !Auth::user()->hasPermissionTo('publish_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para publicar páginas');
        }

        // Update status to published
        $page->status = 'published';
        $page->published_at = now();
        $page->save();

        return redirect()->route('pages.index')->with('success', 'Página publicada correctamente.');
    }

    /**
     * Unpublish the specified page (change to draft)
     */
    public function unpublish(Page $page)
    {
        // Check publish permission
        if (
            !Auth::user()->hasPermissionTo('publish_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para publicar páginas');
        }

        $page->status = 'draft';
        $page->published_at = null;
        $page->save();

        return redirect()->route('pages.index')
            ->with('success', 'La página ha sido cambiada a borrador correctamente.');
    }

    /**
     * Show the form for editing page configuration settings
     */
    public function settings(Page $page)
    {
        // Check edit permission
        if (
            !Auth::user()->hasPermissionTo('edit_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para editar la configuración de páginas');
        }

        // Get published navbars and footers for selection
        $navbars = Navbar::select('id', 'name', 'status')
            ->orderBy('name')
            ->get();

        $footers = Footer::select('id', 'name', 'status')
            ->orderBy('name')
            ->get();

        return view('pages.settings', compact('page', 'navbars', 'footers'));
    }

    /**
     * Save changes to a page's configuration settings
     */
    public function updateSettings(Request $request, Page $page)
    {
        // Check edit permission
        if (
            !Auth::user()->hasPermissionTo('edit_pages') &&
            !Auth::user()->hasPermissionTo('manage_pages')
        ) {
            abort(403, 'No tienes permiso para actualizar la configuración de páginas');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9-]+$/',
                'unique:pages,slug,' . $page->id
            ],
            'navbar_id' => 'nullable|exists:navbars,id',
            'footer_id' => 'nullable|exists:footers,id',
            'status' => 'required|in:draft,published,archived'
        ]);

        // Update only the settings fields
        $page->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'navbar_id' => $validated['navbar_id'],
            'footer_id' => $validated['footer_id'],
            'status' => $validated['status'],
            'updated_by' => Auth::id()
        ]);

        return redirect()
            ->route('pages.settings', $page->id)
            ->with('success', 'Configuración de página actualizada correctamente.');
    }

    /**
     * Search for pages by title or slug
     */
    public function apiSearch(Request $request)
    {
        $query = $request->input('q', '');

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $pages = Page::where('status', 'published')
            ->where(function ($q) use ($query) {
                $q->where('title', 'LIKE', "%{$query}%")
                    ->orWhere('slug', 'LIKE', "%{$query}%");
            })
            ->select('id', 'title', 'slug')
            ->limit(10)
            ->get()
            ->map(function ($page) {
                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'slug' => $page->slug,
                    // 'url' => route('pages.public', $page->slug)
                    'url' => '/' . $page->slug
                ];
            });

        return response()->json($pages);
    }
}
