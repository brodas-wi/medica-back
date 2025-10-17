<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use App\Models\NewsCategory;
use Illuminate\Http\Request;

class PublicNewsController extends Controller
{
    /**
     * Display a listing of news articles for public view with filters and pagination
     */
    public function index(Request $request)
    {
        // Base query with published articles only
        $query = NewsArticle::published()->with('category');

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

        // Get perPage parameter or default to 10
        $perPage = $request->get('per_page', 10);
        if (!in_array($perPage, [10, 20, 30])) {
            $perPage = 10;
        }

        // Get articles with pagination
        $articles = $query->latest('published_at')->paginate($perPage);

        // Get all categories for the filter
        $categories = NewsCategory::all();

        return view('news.public.index', compact('articles', 'categories'));
    }

    /**
     * Display a specific news article
     */
    public function show($slug)
    {
        // Find the article by slug and ensure it's published
        $article = NewsArticle::where('slug', $slug)
            ->published()
            ->firstOrFail();

        // Get related articles from the same category
        $relatedArticles = NewsArticle::published()
            ->where('news_category_id', $article->news_category_id)
            ->where('id', '!=', $article->id)
            ->latest('published_at')
            ->take(3)
            ->get();

        return view('news.public.show', compact('article', 'relatedArticles'));
    }
}
