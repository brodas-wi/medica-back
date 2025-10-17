<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $article->title }} - Noticias</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="{{ Str::limit(strip_tags($article->content), 160) }}">
    <meta property="og:title" content="{{ $article->title }}">
    <meta property="og:description" content="{{ Str::limit(strip_tags($article->content), 160) }}">
    @if ($article->featured_image)
        <meta property="og:image" content="{{ asset('storage/' . $article->featured_image) }}">
    @endif
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="article">

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .prose {
            color: #374151;
        }

        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4 {
            color: #111827;
            font-weight: 600;
            margin-top: 0.5em;
        }

        .prose h1 {
            font-size: 2.25em;
            line-height: 1.1;
        }

        .prose h2 {
            font-size: 1.5em;
            line-height: 1.3;
        }

        .prose h3 {
            font-size: 1.25em;
            line-height: 1.4;
        }

        .prose p {
            margin-top: 1.25em;
            margin-bottom: 1.25em;
            font-size: 1.125em;
            line-height: 1.6;
        }

        .prose a {
            color: #23366A;
            text-decoration: underline;
        }

        .prose ul,
        .prose ol {
            margin-top: 1.25em;
            margin-bottom: 1.25em;
            padding-left: 1.625em;
        }

        .prose li {
            margin-top: 0.5em;
            margin-bottom: 0.5em;
        }

        .prose img {
            margin-top: 2em;
            margin-bottom: 2em;
        }

        .prose blockquote {
            border-left-width: 4px;
            border-left-color: #e5e7eb;
            padding-left: 1em;
            font-style: italic;
        }

        .social-btn {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s;
        }
    </style>
</head>

<body class="bg-white font-sans">
    <div class="py-8">
        <!-- Breadcrumbs -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div class="flex items-center text-sm text-gray-500 flex-wrap">
                <a href="{{ route('news.index') }}" class="hover:text-primary">
                    Noticias
                </a>
                <i class="ri-arrow-right-s-line mx-2"></i>
                <a href="{{ route('news.index', ['category' => $article->category->id]) }}" class="hover:text-primary">
                    {{ $article->category->name }}
                </a>
                <i class="ri-arrow-right-s-line mx-2"></i>
                <span class="truncate max-w-xs">{{ $article->title }}</span>
            </div>
        </div>

        <!-- Content Container -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Title -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
                {{ $article->title }}
            </h1>

            <!-- Featured Image -->
            @if ($article->featured_image)
                <div class="mb-6">
                    <img src="{{ $article->featured_image_url }}" alt="{{ $article->title }}"
                        class="w-full max-h-[400px] h-auto object-cover rounded-2xl">
                </div>
            @endif

            <!-- Category and Date -->
            <div class="flex items-center text-sm text-gray-500 mb-8 flex-wrap gap-4">
                <span class="bg-primary text-white px-3 py-1 rounded-full">
                    {{ $article->category->name }}
                </span>
                <span>
                    <i class="ri-calendar-line mr-1"></i>
                    {{ $article->published_at->format('d/m/Y') }}
                </span>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Main Content -->
                <div class="w-full lg:w-2/3">
                    <div class="prose prose-lg max-w-none">
                        {!! $article->content !!}
                    </div>
                </div>

                <!-- Sidebar (Latest News) -->
                <div class="w-full lg:w-1/3">
                    <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <h2 class="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                            <i class="ri-time-line mr-2"></i>Últimas Noticias
                        </h2>

                        <div class="space-y-6">
                            @foreach ($latestArticles as $latestArticle)
                                <div class="flex flex-col">
                                    @if ($latestArticle->featured_image)
                                        <div class="mb-3 rounded-2xl overflow-hidden">
                                            <img src="{{ $latestArticle->featured_image_url }}" alt="{{ $latestArticle->title }}" class="w-full h-32 object-cover">
                                        </div>
                                    @endif
                                    <h3 class="font-semibold text-gray-800 mb-1 line-clamp-2">
                                        {{ $latestArticle->title }}</h3>
                                    <div class="text-xs text-gray-500 mb-2">
                                        <i class="ri-calendar-line mr-1"></i>
                                        {{ $latestArticle->published_at->format('d/m/Y') }}
                                    </div>
                                    <a href="{{ route('news.show', $latestArticle->slug) }}"
                                        class="inline-flex items-center bg-white border-2 border-primary text-primary font-medium px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors text-sm self-start">
                                        Ver más <i class="ri-arrow-right-line ml-1"></i>
                                    </a>
                                </div>

                                @if (!$loop->last)
                                    <div class="border-b border-gray-200"></div>
                                @endif
                            @endforeach
                        </div>

                        <!-- Social Share -->
                        <div class="mt-8 pt-4 border-t border-gray-200">
                            <p class="text-sm font-semibold text-gray-700 mb-3">Compartir artículo:</p>
                            <div class="flex space-x-3">
                                <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(url()->current()) }}"
                                    target="_blank" class="social-btn bg-blue-600 text-white hover:bg-blue-700">
                                    <i class="ri-facebook-fill"></i>
                                </a>
                                <a href="https://twitter.com/intent/tweet?url={{ urlencode(url()->current()) }}&text={{ urlencode($article->title) }}"
                                    target="_blank" class="social-btn bg-blue-400 text-white hover:bg-blue-500">
                                    <i class="ri-twitter-fill"></i>
                                </a>
                                <a href="https://wa.me/?text={{ urlencode($article->title . ' ' . url()->current()) }}"
                                    target="_blank" class="social-btn bg-green-500 text-white hover:bg-green-600">
                                    <i class="ri-whatsapp-fill"></i>
                                </a>
                            </div>
                        </div>

                        <!-- Back to News Link -->
                        <div class="mt-8 text-center">
                            <a href="{{ route('news.index') }}"
                                class="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
                                <i class="ri-arrow-left-line mr-2"></i> Volver a Noticias
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Simple footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <p class="text-center md:text-left">&copy; {{ date('Y') }}
                        {{ config('app.name', 'Sistema CMS') }}. Todos los derechos reservados.</p>
                </div>
                <div class="flex space-x-4">
                    <a href="{{ url('/') }}" class="hover:text-gray-300">Inicio</a>
                    <a href="{{ route('news.index') }}" class="hover:text-gray-300">Noticias</a>
                    <a href="#" class="hover:text-gray-300">Contacto</a>
                </div>
            </div>
        </div>
    </footer>
</body>

</html>
