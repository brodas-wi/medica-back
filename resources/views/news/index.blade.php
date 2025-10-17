@extends('layouts.frontend')

@section('content')
    <!-- News article listing page for the frontend -->
    <div class="container mx-auto px-4 py-10">
        <div class="mb-10">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Noticias</h1>
            <p class="text-gray-600 max-w-3xl">Mantente al día con las últimas novedades, actualizaciones y artículos de
                interés.</p>
        </div>

        <!-- Categories filter -->
        @if (isset($categories) && $categories->count() > 0)
            <div class="mb-8">
                <div class="flex flex-wrap gap-2">
                    <a href="{{ route('news.index') }}"
                        class="px-4 py-2 text-sm rounded-full {{ !request('category') ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }} transition">
                        Todas
                    </a>
                    @foreach ($categories as $category)
                        <a href="{{ route('news.index', ['category' => $category->slug]) }}"
                            class="px-4 py-2 text-sm rounded-full {{ request('category') === $category->slug ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }} transition">
                            {{ $category->name }}
                        </a>
                    @endforeach
                </div>
            </div>
        @endif

        @if ($articles->isEmpty())
            <!-- Empty state when no articles are found -->
            <div class="bg-white shadow-sm rounded-lg p-10 text-center">
                <i class="ri-newspaper-line text-6xl text-gray-400 mb-4"></i>
                <h3 class="text-lg font-medium text-gray-800 mb-2">No hay noticias disponibles</h3>
                <p class="text-gray-600">No se encontraron artículos para mostrar en este momento.</p>
            </div>
        @else
            <!-- Articles grid display -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach ($articles as $article)
                    <div
                        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <a href="{{ route('news.show', $article->slug) }}" class="block">
                            <div class="h-48 overflow-hidden">
                                @if ($article->featured_image)
                                    <img src="{{ asset('storage/' . $article->featured_image) }}"
                                        alt="{{ Str::limit($article->title, 10) }}"
                                        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                                @else
                                    <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <i class="ri-newspaper-line text-4xl text-gray-400"></i>
                                    </div>
                                @endif
                            </div>
                        </a>
                        <div class="p-5">
                            <div class="mb-3 flex items-center">
                                <span
                                    class="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                                    {{ $article->category->name }}
                                </span>
                                <span class="inline-flex items-center text-gray-500 text-xs ml-2">
                                    <i class="ri-calendar-line mr-1"></i>
                                    {{ $article->published_at->format('d M, Y') }}
                                </span>
                            </div>

                            <a href="{{ route('news.show', $article->slug) }}" class="block">
                                <h3 class="text-xl font-bold text-gray-800 mb-2 hover:text-primary transition-colors">
                                    {{ $article->title }}
                                </h3>
                            </a>

                            <p class="text-gray-600 mb-4 line-clamp-3">
                                {{ Str::limit(strip_tags($article->content), 150) }}
                            </p>

                            <a href="{{ route('news.show', $article->slug) }}"
                                class="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors">
                                Leer más
                                <i class="ri-arrow-right-line ml-1"></i>
                            </a>
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Pagination -->
            @if ($articles->hasPages())
                <div class="px-6 py-4 border-t border-gray-200 bg-white">
                    <div class="flex items-center justify-center">
                        {{ $articles->appends(request()->except('page'))->links() }}
                    </div>
                </div>
            @endif
        @endif
    </div>
@endsection
