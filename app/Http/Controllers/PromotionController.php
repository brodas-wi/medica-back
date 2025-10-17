<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class PromotionController extends Controller
{
    // Create controller instance with auth middleware
    public function __construct()
    {
        $this->middleware('auth');
    }

    // Display listing of promotions
    public function index(Request $request)
    {
        if (!Auth::user()->hasPermissionTo('manage_promotions') && !Auth::user()->hasPermissionTo('view_promotions')) {
            abort(403, 'No tienes permiso para ver las promociones');
        }

        // Auto-deactivate expired promotions
        $this->deactivateExpiredPromotions();

        $perPage = $request->input('per_page', 10);

        if (!in_array($perPage, [10, 20, 30])) {
            $perPage = 10;
        }

        $query = Promotion::with(['creator', 'updater'])->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('category', 'LIKE', "%{$search}%")
                    ->orWhere('short_description', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('created_by')) {
            $query->where('created_by', $request->created_by);
        }

        $promotions = $query->paginate($perPage);

        $creators = User::select('users.id', 'users.name')
            ->join('promotions', 'users.id', '=', 'promotions.created_by')
            ->distinct()
            ->get();

        $categories = Promotion::getCategories();

        return view('promotions.index', compact('promotions', 'creators', 'categories'));
    }

    // Show form for creating promotion
    public function create()
    {
        if (!Auth::user()->hasPermissionTo('manage_promotions') && !Auth::user()->hasPermissionTo('create_promotions')) {
            abort(403, 'No tienes permiso para crear promociones');
        }

        $categories = Promotion::getCategories();
        return view('promotions.create', compact('categories'));
    }

    // Store newly created promotion
    public function store(Request $request)
    {
        if (!Auth::user()->hasPermissionTo('manage_promotions') && !Auth::user()->hasPermissionTo('create_promotions')) {
            abort(403, 'No tienes permiso para crear promociones');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string|max:500',
            'long_description' => 'required|string',
            'category' => 'required|string|max:100',
            'image_url' => 'required|url',
            'active_days' => 'nullable|array',
            'active_days.*' => 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'end_date' => 'nullable|date|after_or_equal:today',
            'order' => 'nullable|integer|min:0',
            'status' => 'required|in:active,inactive'
        ]);

        $validated['order'] = $validated['order'] ?? 0;
        $validated['created_by'] = Auth::id();

        Promotion::create($validated);

        return redirect()->route('promotions.index')->with('success', 'Promoción creada correctamente.');
    }

    // Show form for editing promotion
    public function edit(Promotion $promotion)
    {
        if (!Auth::user()->hasPermissionTo('manage_promotions') && !Auth::user()->hasPermissionTo('edit_promotions')) {
            abort(403, 'No tienes permiso para editar promociones');
        }

        $categories = Promotion::getCategories();
        return view('promotions.edit', compact('promotion', 'categories'));
    }

    // Update specified promotion
    public function update(Request $request, Promotion $promotion)
    {
        if (!Auth::user()->hasPermissionTo('manage_promotions') && !Auth::user()->hasPermissionTo('edit_promotions')) {
            abort(403, 'No tienes permiso para editar promociones');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string|max:500',
            'long_description' => 'required|string',
            'category' => 'required|string|max:100',
            'image_url' => 'required|url',
            'active_days' => 'nullable|array',
            'active_days.*' => 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'end_date' => 'nullable|date|after_or_equal:today',
            'order' => 'nullable|integer|min:0',
            'status' => 'required|in:active,inactive'
        ]);

        $validated['updated_by'] = Auth::id();

        $promotion->update($validated);

        return redirect()->route('promotions.index')->with('success', 'Promoción actualizada correctamente.');
    }

    // Remove specified promotion
    public function destroy(Promotion $promotion)
    {
        if (!Auth::user()->hasPermissionTo('manage_promotions') && !Auth::user()->hasPermissionTo('delete_promotions')) {
            abort(403, 'No tienes permiso para eliminar promociones');
        }

        if ($promotion->image_url && str_starts_with($promotion->image_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $promotion->image_url));
        }

        $promotion->delete();

        return redirect()->route('promotions.index')->with('success', 'Promoción eliminada correctamente.');
    }

    // Toggle promotion status (active/inactive)
    public function toggleStatus(Promotion $promotion)
    {
        if (!Auth::user()->hasPermissionTo('manage_promotions') && !Auth::user()->hasPermissionTo('toggle_promotions')) {
            return response()->json(['error' => 'Sin permisos'], 403);
        }

        // Check if promotion is expired
        if ($promotion->end_date && Carbon::parse($promotion->end_date)->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede activar una promoción expirada'
            ], 400);
        }

        $newStatus = $promotion->status === 'active' ? 'inactive' : 'active';
        $promotion->update([
            'status' => $newStatus,
            'updated_by' => Auth::id()
        ]);

        return response()->json([
            'success' => true,
            'status' => $newStatus,
            'message' => $newStatus === 'active'
                ? 'Promoción activada correctamente'
                : 'Promoción desactivada correctamente'
        ]);
    }

    // Get active promotions for API
    public function getActive()
    {
        $today = strtolower(Carbon::now()->locale('es')->dayName);
        $dayMapping = [
            'lunes' => 'monday',
            'martes' => 'tuesday',
            'miércoles' => 'wednesday',
            'jueves' => 'thursday',
            'viernes' => 'friday',
            'sábado' => 'saturday',
            'domingo' => 'sunday'
        ];
        $todayEnglish = array_search($today, $dayMapping) ?: $today;

        $promotions = Promotion::where('status', 'active')
            ->where(function ($query) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', Carbon::today());
            })
            ->orderBy('order')
            ->get();

        $promotions->each(function ($promotion) {
            if ($promotion->end_date) {
                $promotion->remaining_days = Carbon::today()->diffInDays($promotion->end_date, false);
                $promotion->remaining_days = $promotion->remaining_days > 0 ? $promotion->remaining_days : 0;
            } else {
                $promotion->remaining_days = null;
            }

            if (!empty($promotion->active_days)) {
                $dayNames = [
                    'monday' => 'Lunes',
                    'tuesday' => 'Martes',
                    'wednesday' => 'Miércoles',
                    'thursday' => 'Jueves',
                    'friday' => 'Viernes',
                    'saturday' => 'Sábado',
                    'sunday' => 'Domingo'
                ];

                $activeDayNames = array_map(function ($day) use ($dayNames) {
                    return $dayNames[$day] ?? $day;
                }, $promotion->active_days);

                $promotion->active_days_label = implode(', ', $activeDayNames);
            } else {
                $promotion->active_days_label = 'Todos los días';
            }
        });

        return response()->json($promotions);
    }

    // Auto-deactivate expired promotions
    private function deactivateExpiredPromotions()
    {
        Promotion::where('status', 'active')
            ->whereNotNull('end_date')
            ->where('end_date', '<', Carbon::today())
            ->update([
                'status' => 'inactive',
                'updated_by' => Auth::id()
            ]);
    }
}
