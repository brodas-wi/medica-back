<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Create a new controller instance
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of banners
     */
    public function index(Request $request)
    {
        // Check view permission
        if (!Auth::user()->hasPermissionTo('manage_banners') && !Auth::user()->hasPermissionTo('view_banners')) {
            abort(403, 'No tienes permiso para ver los banners');
        }

        // Get pagination value from request, default to 10
        $perPage = $request->input('per_page', 10);

        // Validate per_page is one of allowed values
        if (!in_array($perPage, [10, 20, 30])) {
            $perPage = 10;
        }

        $query = Banner::with(['creator', 'updater'])->latest();

        // Apply search filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('category', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
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
        $banners = $query->paginate($perPage);

        // Get creators list for filter dropdown
        $creators = User::select('users.id', 'users.name')
            ->join('banners', 'users.id', '=', 'banners.created_by')
            ->distinct()
            ->get();

        return view('banners.index', compact('banners', 'creators'));
    }

    /**
     * Show the form for creating a new banner
     */
    public function create()
    {
        // Check manage permission
        if (!Auth::user()->hasPermissionTo('manage_banners') && !Auth::user()->hasPermissionTo('create_banners')) {
            abort(403, 'No tienes permiso para crear banners');
        }

        return view('banners.create');
    }

    /**
     * Store a newly created banner in storage
     */
    public function store(Request $request)
    {
        // Check manage permission
        if (!Auth::user()->hasPermissionTo('manage_banners') && !Auth::user()->hasPermissionTo('create_banners')) {
            abort(403, 'No tienes permiso para crear banners');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image_url' => 'required|url',
            'primary_button_text' => 'nullable|string|max:50',
            'primary_button_url' => 'nullable|string|max:255',
            'secondary_button_text' => 'nullable|string|max:50',
            'secondary_button_url' => 'nullable|string|max:255',
            'show_category' => 'boolean',
            'show_description' => 'boolean',
            'show_primary_button' => 'boolean',
            'show_secondary_button' => 'boolean',
            'order' => 'nullable|integer|min:0',
            'status' => 'required|in:active,inactive'
        ]);

        // Set default values
        $validated['show_category'] = $request->boolean('show_category', true);
        $validated['show_description'] = $request->boolean('show_description', true);
        $validated['show_primary_button'] = $request->boolean('show_primary_button', true);
        $validated['show_secondary_button'] = $request->boolean('show_secondary_button', false);
        $validated['order'] = $validated['order'] ?? 0;
        $validated['created_by'] = Auth::id();

        Banner::create($validated);

        return redirect()->route('banners.index')->with('success', 'Banner creado correctamente.');
    }

    /**
     * Show the form for editing the specified banner
     */
    public function edit(Banner $banner)
    {
        // Check manage permission
        if (!Auth::user()->hasPermissionTo('manage_banners') && !Auth::user()->hasPermissionTo('edit_banners')) {
            abort(403, 'No tienes permiso para editar banners');
        }

        return view('banners.edit', compact('banner'));
    }

    /**
     * Update the specified banner in storage
     */
    public function update(Request $request, Banner $banner)
    {
        // Check manage permission
        if (!Auth::user()->hasPermissionTo('manage_banners') && !Auth::user()->hasPermissionTo('edit_banners')) {
            abort(403, 'No tienes permiso para editar banners');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image_url' => 'required|url',
            'primary_button_text' => 'nullable|string|max:50',
            'primary_button_url' => 'nullable|string|max:255',
            'secondary_button_text' => 'nullable|string|max:50',
            'secondary_button_url' => 'nullable|string|max:255',
            'show_category' => 'boolean',
            'show_description' => 'boolean',
            'show_primary_button' => 'boolean',
            'show_secondary_button' => 'boolean',
            'order' => 'nullable|integer|min:0',
            'status' => 'required|in:active,inactive'
        ]);

        // Set boolean values
        $validated['show_category'] = $request->boolean('show_category');
        $validated['show_description'] = $request->boolean('show_description');
        $validated['show_primary_button'] = $request->boolean('show_primary_button');
        $validated['show_secondary_button'] = $request->boolean('show_secondary_button');
        $validated['updated_by'] = Auth::id();

        $banner->update($validated);

        return redirect()->route('banners.index')->with('success', 'Banner actualizado correctamente.');
    }

    /**
     * Remove the specified banner from storage
     */
    public function destroy(Banner $banner)
    {
        // Check manage permission
        if (!Auth::user()->hasPermissionTo('manage_banners') && !Auth::user()->hasPermissionTo('delete_banners')) {
            abort(403, 'No tienes permiso para eliminar banners');
        }

        // Delete associated image
        if ($banner->image_url && str_starts_with($banner->image_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $banner->image_url));
        }

        $banner->delete();

        return redirect()->route('banners.index')->with('success', 'Banner eliminado correctamente.');
    }

    /**
     * Get active banner categories
     */
    public function getCategories()
    {
        $categories = Banner::where('status', 'active')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values();

        return response()->json($categories);
    }

    /**
     * Update banner order via AJAX
     */
    public function updateOrder(Request $request)
    {
        // Check manage permission
        if (!Auth::user()->hasPermissionTo('manage_banners') && !Auth::user()->hasPermissionTo('edit_banners')) {
            return response()->json(['error' => 'Sin permisos'], 403);
        }

        $validated = $request->validate([
            'banners' => 'required|array',
            'banners.*.id' => 'required|exists:banners,id',
            'banners.*.order' => 'required|integer|min:0'
        ]);

        foreach ($validated['banners'] as $bannerData) {
            Banner::where('id', $bannerData['id'])->update([
                'order' => $bannerData['order'],
                'updated_by' => Auth::id()
            ]);
        }

        return response()->json(['success' => true, 'message' => 'Orden actualizado correctamente']);
    }

    /**
     * Get active banners for API
     */
    public function getActive()
    {
        $banners = Banner::where('status', 'active')
            ->orderBy('order')
            ->get();

        return response()->json($banners);
    }
}
