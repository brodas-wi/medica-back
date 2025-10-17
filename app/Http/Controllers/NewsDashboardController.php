<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use App\Models\NewsCategory;
use Illuminate\Http\Request;

class NewsDashboardController extends Controller
{
    /**
     * Display the news management dashboard with both articles and categories
     */
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('view_news') && !auth()->user()->hasPermissionTo('manage_news')) {
            abort(403, 'No tienes permiso para ver noticias.');
        }
        
        // Get all categories
        $categories = NewsCategory::all();

        // Get articles with filter options
        $query = NewsArticle::with('category');

        // Apply search filter
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Apply category filter
        if ($request->has('category') && !empty($request->category)) {
            $query->where('news_category_id', $request->category);
        }

        // Apply status filter
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        // Determine items per page (default to 10)
        $perPage = $request->get('per_page', 10);

        // Get articles with pagination
        $articles = $query->latest()->paginate($perPage);

        return view('news.admin.dashboard', compact('articles', 'categories'));
    }
}
