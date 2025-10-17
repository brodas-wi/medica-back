<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use App\Models\NewsCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class NewsArticleController extends Controller
{
    /**
     * Create a new controller instance
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the news articles
     */
    public function index()
    {
        if (!auth()->user()->hasPermissionTo('view_news') && !auth()->user()->hasPermissionTo('manage_news')) {
            abort(403, 'No tienes permiso para ver noticias.');
        }

        $query = NewsArticle::with('category');

        if (!auth()->user()->hasAnyPermission(['review_news', 'manage_news'])) {
            $query->where(function ($q) {
                $q->where('status', 'published')
                    ->orWhere('uploaded_by', auth()->id());
            });
        }

        $articles = $query->latest()->paginate(10);
        return view('news.articles.index', compact('articles'));
    }

    /**
     * Show the form for creating a new news article
     */
    public function create()
    {
        if (!auth()->user()->hasPermissionTo('create_news') && !auth()->user()->hasPermissionTo('manage_news')) {
            abort(403, 'No tienes permiso para crear noticias.');
        }

        $categories = NewsCategory::all();
        return view('news.articles.create', compact('categories'));
    }

    /**
     * Store a newly created news article in storage
     */
    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('create_news') && !auth()->user()->hasPermissionTo('manage_news')) {
            abort(403, 'No tienes permiso para crear noticias.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'news_category_id' => 'required|exists:news_categories,id',
            'content' => 'required|string',
            'featured_image' => 'nullable|string|max:500',
            'status' => 'required|in:draft,published,scheduled,pending',
            'published_at' => 'nullable|date',
        ], [
            'featured_image.image' => 'El campo imagen destacada debe ser una imagen.',
            'featured_image.mimes' => 'El campo imagen destacada debe ser un archivo de tipo: jpeg, png, jpg, gif, webp.',
            'featured_image.max' => 'El campo imagen destacada no debe ser mayor a 2048 kilobytes.',
        ]);

        $article = new NewsArticle();
        $article->title = $validated['title'];
        $article->slug = NewsArticle::createSlug($validated['title']);
        $article->news_category_id = $validated['news_category_id'];
        $article->content = $validated['content'];
        $article->uploaded_by = Auth::id();

        if ($validated['status'] === 'published' || $validated['status'] === 'scheduled') {
            if (auth()->user()->hasAnyPermission(['auto_approve_news', 'review_news', 'manage_news'])) {
                $article->status = $validated['status'];
                if ($validated['status'] === 'published') {
                    $article->published_at = now();
                    $article->reviewed_by = Auth::id();
                    $article->reviewed_at = now();
                } elseif ($validated['status'] === 'scheduled' && !empty($validated['published_at'])) {
                    $article->published_at = $validated['published_at'];
                }
            } else {
                $article->status = 'pending';
            }
        } else if ($validated['status'] === 'pending') {
            $article->status = 'pending';
        } else {
            $article->status = 'draft';
        }

        // Handle featured image path
        if ($request->filled('featured_image')) {
            $article->featured_image = $request->featured_image;
        }

        $article->save();

        return redirect()->route('news.dashboard')
            ->with('success', 'Noticia creada exitosamente' . ($article->status === 'pending' ? ' y enviada para revisión' : ''));
    }

    /**
     * Display the specified news article
     */
    public function show(NewsArticle $article)
    {
        if (!auth()->user()->hasPermissionTo('view_news') && !auth()->user()->hasPermissionTo('manage_news')) {
            abort(403, 'No tienes permiso para ver noticias.');
        }

        if (
            $article->status !== 'published' &&
            !auth()->user()->hasAnyPermission(['review_news', 'manage_news']) &&
            $article->uploaded_by !== auth()->id()
        ) {
            abort(403, 'No tienes permiso para ver este artículo.');
        }

        return view('news.articles.show', compact('article'));
    }

    /**
     * Display the review page for a pending article
     */
    public function review(NewsArticle $article)
    {
        if (!auth()->user()->hasAnyPermission(['review_news', 'manage_news'])) {
            abort(403, 'No tienes permisos para revisar noticias.');
        }

        if ($article->status !== 'pending') {
            return redirect()->route('news.dashboard')
                ->with('info', 'Esta noticia no está pendiente de revisión.');
        }

        return view('news.articles.review', compact('article'));
    }

    /**
     * Show the form for editing the specified news article
     */
    public function edit(NewsArticle $article)
    {
        if (!$this->canEditArticle($article)) {
            abort(403, 'No tienes permiso para editar este artículo.');
        }

        $categories = NewsCategory::all();
        return view('news.articles.edit', compact('article', 'categories'));
    }

    /**
     * Update the specified news article in storage
     */
    public function update(Request $request, NewsArticle $article)
    {
        if (!$this->canEditArticle($article)) {
            abort(403, 'No tienes permiso para editar este artículo.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'news_category_id' => 'required|exists:news_categories,id',
            'content' => 'required|string',
            'featured_image' => 'nullable|string|max:500',
            'status' => 'required|in:draft,published,scheduled,pending',
            'published_at' => 'nullable|date',
        ], [
            'featured_image.image' => 'El campo imagen destacada debe ser una imagen.',
            'featured_image.mimes' => 'El campo imagen destacada debe ser un archivo de tipo: jpeg, png, jpg, gif, webp.',
            'featured_image.max' => 'El campo imagen destacada no debe ser mayor a 2048 kilobytes.',
        ]);

        $article->title = $validated['title'];

        if ($article->title !== $validated['title']) {
            $article->slug = NewsArticle::createSlug($validated['title']);
        }

        $article->news_category_id = $validated['news_category_id'];
        $article->content = $validated['content'];

        if ($validated['status'] === 'published') {
            if (auth()->user()->hasAnyPermission(['auto_approve_news', 'review_news', 'manage_news'])) {
                $article->status = 'published';
                $article->published_at = now();
                $article->reviewed_by = Auth::id();
                $article->reviewed_at = now();
            } else {
                $article->status = 'pending';
                $article->reviewed_by = null;
                $article->reviewed_at = null;
            }
        } else if ($validated['status'] === 'scheduled') {
            if (auth()->user()->hasAnyPermission(['auto_approve_news', 'review_news', 'manage_news'])) {
                $article->status = 'scheduled';
                if (!empty($validated['published_at'])) {
                    $article->published_at = $validated['published_at'];
                }
            } else {
                $article->status = 'pending';
                $article->published_at = null;
                $article->reviewed_by = null;
                $article->reviewed_at = null;
            }
        } else if ($validated['status'] === 'pending') {
            $article->status = 'pending';
            if ($article->published_at && $article->status === 'published') {
                $article->published_at = null;
            }
            $article->reviewed_by = null;
            $article->reviewed_at = null;
        } else {
            $article->status = 'draft';
            if ($article->published_at && $article->status === 'published') {
                $article->published_at = null;
            }
            $article->reviewed_by = null;
            $article->reviewed_at = null;
        }

        if ($request->filled('featured_image')) {
            $article->featured_image = $request->featured_image;
        }

        $article->save();

        return redirect()->route('news.dashboard')
            ->with('success', 'Noticia actualizada exitosamente' . ($article->status === 'pending' ? ' y enviada para revisión' : ''));
    }

    /**
     * Remove the specified news article from storage
     */
    public function destroy(NewsArticle $article)
    {
        if (!$this->canDeleteArticle($article)) {
            abort(403, 'No tienes permiso para eliminar este artículo.');
        }

        $article->delete();

        return redirect()->route('news.dashboard')
            ->with('success', 'Noticia eliminada exitosamente');
    }

    /**
     * Check if user can edit an article
     */
    private function canEditArticle(NewsArticle $article)
    {
        return auth()->user()->hasPermissionTo('manage_news') ||
            auth()->user()->hasPermissionTo('edit_all_news') ||
            (auth()->user()->hasPermissionTo('edit_news') && $article->uploaded_by === auth()->id());
    }

    /**
     * Check if user can delete an article
     */
    private function canDeleteArticle(NewsArticle $article)
    {
        return auth()->user()->hasPermissionTo('manage_news') ||
            auth()->user()->hasPermissionTo('delete_all_news') ||
            (auth()->user()->hasPermissionTo('delete_news') && $article->uploaded_by === auth()->id());
    }

    /**
     * Approve a news article
     */
    public function approve(NewsArticle $article)
    {
        if (!auth()->user()->hasAnyPermission(['review_news', 'manage_news'])) {
            abort(403, 'No tienes permisos para aprobar noticias.');
        }

        $article->update([
            'status' => 'published',
            'published_at' => now(),
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
            'rejection_reason' => null,
        ]);

        return back()->with('success', 'Noticia aprobada y publicada correctamente.');
    }

    /**
     * Reject a news article
     */
    public function reject(Request $request, NewsArticle $article)
    {
        if (!auth()->user()->hasAnyPermission(['review_news', 'manage_news'])) {
            abort(403, 'No tienes permisos para rechazar noticias.');
        }

        $request->validate([
            'rejection_reason' => 'required|string|max:500',
        ]);

        $article->update([
            'status' => 'rejected',
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return back()->with('success', 'Noticia rechazada correctamente.');
    }

    /**
     * Display the news article page on the front-end
     */
    public function showArticle($slug)
    {
        // Find the article by slug
        $article = NewsArticle::where('slug', $slug)
            ->where(function ($query) {
                $query->where('status', 'published')
                    ->where('published_at', '<=', now());
            })
            ->firstOrFail();

        // Get latest 5 articles except the current one
        $latestArticles = NewsArticle::published()
            ->where('id', '!=', $article->id)
            ->latest('published_at')
            ->take(5)
            ->get();

        return view('news.public.show', compact('article', 'latestArticles'));
    }

    /**
     * Display list of news articles on the front-end
     */
    public function listArticles(Request $request)
    {
        $query = NewsArticle::published()
            ->with('category');

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
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('id', $request->category);
            });
        }

        // Get perPage parameter or default to 10
        $perPage = $request->get('per_page', 10);
        if (!in_array($perPage, [10, 20, 30])) {
            $perPage = 10;
        }

        $articles = $query->latest('published_at')->paginate($perPage);

        // Get all categories for the filter
        $categories = NewsCategory::all();

        return view('news.public.index', compact('articles', 'categories'));
    }
}
