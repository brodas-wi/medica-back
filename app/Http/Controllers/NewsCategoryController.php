<?php

namespace App\Http\Controllers;

use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsCategoryController extends Controller
{
    /**
     * Create a new controller instance
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the news categories
     */
    public function index()
    {
        if (!auth()->user()->hasPermissionTo('view_news_categories') && !auth()->user()->hasPermissionTo('manage_news_categories')) {
            abort(403, 'No tienes permiso para ver categorías de noticias.');
        }

        $categories = NewsCategory::all();
        return view('news.categories.index', compact('categories'));
    }

    /**
     * Show the form for creating a new news category
     */
    public function create()
    {
        if (!auth()->user()->hasPermissionTo('create_news_categories') && !auth()->user()->hasPermissionTo('manage_news_categories')) {
            abort(403, 'No tienes permiso para crear categorías de noticias.');
        }

        return view('news.categories.create');
    }

    /**
     * Store a newly created news category in storage
     */
    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('create_news_categories') && !auth()->user()->hasPermissionTo('manage_news_categories')) {
            abort(403, 'No tienes permiso para crear categorías de noticias.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category = new NewsCategory();
        $category->name = $validated['name'];
        $category->slug = Str::slug($validated['name']);
        $category->description = $validated['description'] ?? null;
        $category->save();

        return redirect()->route('news.dashboard', ['#categories'])
            ->with('success', 'Categoría de noticias creada exitosamente');
    }

    /**
     * Display the specified news category
     */
    public function show(NewsCategory $category)
    {
        if (!auth()->user()->hasPermissionTo('view_news_categories') && !auth()->user()->hasPermissionTo('manage_news_categories')) {
            abort(403, 'No tienes permiso para ver categorías de noticias.');
        }

        return view('news.categories.show', compact('category'));
    }

    /**
     * Show the form for editing the specified news category
     */
    public function edit(NewsCategory $category)
    {
        if (!auth()->user()->hasPermissionTo('edit_news_categories') && !auth()->user()->hasPermissionTo('manage_news_categories')) {
            abort(403, 'No tienes permiso para editar categorías de noticias.');
        }

        return view('news.categories.edit', compact('category'));
    }

    /**
     * Update the specified news category in storage
     */
    public function update(Request $request, NewsCategory $category)
    {
        if (!auth()->user()->hasPermissionTo('edit_news_categories') && !auth()->user()->hasPermissionTo('manage_news_categories')) {
            abort(403, 'No tienes permiso para editar categorías de noticias.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category->name = $validated['name'];
        $category->slug = Str::slug($validated['name']);
        $category->description = $validated['description'] ?? null;
        $category->save();

        return redirect()->route('news.dashboard', ['#categories'])
            ->with('success', 'Categoría de noticias actualizada exitosamente');
    }

    /**
     * Remove the specified news category from storage
     */
    public function destroy(NewsCategory $category)
    {
        if (!auth()->user()->hasPermissionTo('delete_news_categories') && !auth()->user()->hasPermissionTo('manage_news_categories')) {
            abort(403, 'No tienes permiso para eliminar categorías de noticias.');
        }

        $category->delete();

        return redirect()->route('news.dashboard', ['#categories'])
            ->with('success', 'Categoría de noticias eliminada exitosamente');
    }
}
