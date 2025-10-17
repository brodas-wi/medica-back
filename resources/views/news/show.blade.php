@extends('layouts.frontend')

@section('styles')
<style>
    .prose h1 {
        font-size: 2.25rem;
        font-weight: 700;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        color: #1a202c;
    }

    .prose h2 {
        font-size: 1.875rem;
        font-weight: 600;
        margin-top: 0.5rem;
        margin-bottom: 0.25rem;
        color: #1a202c;
    }

    .prose h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 0.5rem;
        margin-bottom: 0.25rem;
        color: #1a202c;
    }

    .prose ul {
        list-style-type: disc;
        padding-left: 1.25rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .prose ol {
        list-style-type: decimal;
        padding-left: 1.25rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .prose strong {
        font-weight: 700;
    }
</style>
@endsection

@section('content')
<!-- Single news article display page for the frontend -->
<div class="container mx-auto px-4 py-10">
    <div class="max-w-4xl mx-auto">
        <!-- Breadcrumbs navigation -->
        <div class="mb-6 flex items-center text-sm text-gray-500">
            <a href="{{ url('/') }}" class="hover:text-primary transition-colors">Inicio</a>
            <i class="ri-arrow-right-s-line mx-2"></i>
            <a href="{{ route('news.index') }}" class="hover:text-primary transition-colors">Noticias</a>
            <i class="ri-arrow-right-s-line mx-2"></i>
            <a href="{{ route('news.index', ['category' => $article->category->slug]) }}" class="hover:text-primary transition-colors">
                {{ $article->category->name }}
            </a>
        </div>

        <!-- Article header -->
        <div class="mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ $article->title }}</h1>

            <div class="flex flex-wrap items-center text-gray-500 text-sm mb-6">
                <div class="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold mr-4">
                    {{ $article->category->name }}
                </div>
                <div class="flex items-center mr-4">
                    <i class="ri-calendar-line mr-1"></i>
                    <span>{{ $article->published_at->format('d M, Y') }}</span>
                </div>
                <div class="flex items-center">
                    <i class="ri-time-line mr-1"></i>
                    <span>{{ $article->published_at->diffForHumans() }}</span>
                </div>
            </div>
        </div>

        <!-- Featured image -->
        @if($article->featured_image)
        <div class="mb-8 overflow-hidden shadow-md">
            <img src="{{ asset('storage/' . $article->featured_image) }}"
                alt="{{ $article->title }}"
                class="w-full h-auto">
        </div>
        @endif

        <!-- Article content -->
        <div class="prose prose-lg max-w-none mb-4">
            {!! $article->content !!}
        </div>

        <!-- Share buttons -->
        <div class="border-t border-b border-gray-200 py-6 my-8">
            <div class="flex items-center">
                <span class="text-gray-700 font-medium mr-4">Compartir:</span>
                <div class="flex space-x-3">
                    <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(url()->current()) }}"
                        target="_blank" rel="noopener"
                        class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                        <i class="ri-facebook-fill"></i>
                    </a>
                    <a href="https://x.com/intent/tweet?text={{ urlencode($article->title) }}&url={{ urlencode(url()->current()) }}"
                        target="_blank" rel="noopener"
                        class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <i class="ri-twitter-x-fill"></i>
                    </a>
                    <a href="https://www.instagram.com/"
                        target="_blank" rel="noopener"
                        class="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:opacity-90 transition-colors">
                        <i class="ri-instagram-fill"></i>
                    </a>
                    <a href="https://api.whatsapp.com/send?text={{ urlencode($article->title . ' ' . url()->current()) }}"
                        target="_blank" rel="noopener"
                        class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                        <i class="ri-whatsapp-fill"></i>
                    </a>
                </div>
            </div>
        </div>

        <!-- Related articles -->
        @if(isset($relatedArticles) && $relatedArticles->count() > 0)
        <div class="mt-12">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">Artículos relacionados</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach($relatedArticles as $relatedArticle)
                <a href="{{ route('news.show', $relatedArticle->slug) }}" class="group">
                    <div class="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div class="h-40 overflow-hidden">
                            @if($relatedArticle->featured_image)
                            <img src="{{ asset('storage/' . $relatedArticle->featured_image) }}"
                                alt="{{ $relatedArticle->title }}"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                            @else
                            <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                                <i class="ri-newspaper-line text-3xl text-gray-400"></i>
                            </div>
                            @endif
                        </div>
                        <div class="p-4">
                            <div class="text-xs text-gray-500 mb-1">{{ $relatedArticle->published_at->format('d M, Y') }}</div>
                            <h4 class="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                                {{ $relatedArticle->title }}
                            </h4>
                        </div>
                    </div>
                </a>
                @endforeach
            </div>
        </div>
        @endif

        <!-- Back to all news button -->
        <div class="mt-10 text-center">
            <a href="{{ route('news.index') }}"
                class="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                <i class="ri-arrow-left-line mr-2"></i>
                Volver a todas las noticias
            </a>
        </div>
    </div>
</div>
@endsection

@section('meta')
<!-- Open Graph meta tags for social sharing -->
<meta property="og:title" content="{{ $article->title }}" />
<meta property="og:description" content="{{ Str::limit(strip_tags($article->content), 160) }}" />
@if($article->featured_image)
<meta property="og:image" content="{{ asset('storage/' . $article->featured_image) }}" />
@endif
<meta property="og:url" content="{{ url()->current() }}" />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image">
@endsection