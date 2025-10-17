<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Noticias</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        /* Estilo para select con flecha */
        .select-with-arrow {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 16px;
            padding-right: 40px;
        }
    </style>
</head>

<body class="bg-white font-sans">
    <div class="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl sm:text-4xl font-bold text-primary mb-4">Noticias</h1>
            <p class="text-gray-600">Mantente informado con las últimas noticias y actualizaciones.</p>
        </div>

        <!-- Filters Section -->
        <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <form action="{{ route('news.index') }}" method="GET">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3">
                    <div class="md:col-span-4">
                        <label for="search" class="block text-gray-700 text-sm font-semibold mb-1">Buscar</label>
                        <input type="text" name="search" id="search" value="{{ request('search') }}"
                            placeholder="Buscar noticias..."
                            class="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>

                    <div class="md:col-span-4">
                        <label for="category" class="block text-gray-700 text-sm font-semibold mb-1">Categoría</label>
                        <select name="category" id="category"
                            class="w-full px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary appearance-none select-with-arrow">
                            <option value="">Todas las categorías</option>
                            @foreach ($categories as $category)
                                <option value="{{ $category->id }}"
                                    {{ request('category') == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="md:col-span-4">
                        <label for="per_page" class="block text-gray-700 text-sm font-semibold mb-1">Mostrar</label>
                        <select name="per_page" id="per_page"
                            class="w-full px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary appearance-none select-with-arrow">
                            <option value="10"
                                {{ request('per_page') == 10 || !request('per_page') ? 'selected' : '' }}>10 artículos
                            </option>
                            <option value="20" {{ request('per_page') == 20 ? 'selected' : '' }}>20 artículos
                            </option>
                            <option value="30" {{ request('per_page') == 30 ? 'selected' : '' }}>30 artículos
                            </option>
                        </select>
                    </div>
                </div>

                <div class="flex flex-wrap justify-center md:justify-start gap-2">
                    <button type="submit"
                        class="w-full sm:w-auto cursor-pointer px-6 py-2 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors whitespace-nowrap">
                        <i class="ri-search-line mr-1"></i> Filtrar
                    </button>
                    <a href="{{ route('news.index') }}"
                        class="w-full sm:w-auto px-6 py-2 bg-white text-center border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-colors whitespace-nowrap">
                        <i class="ri-refresh-line mr-1"></i> Limpiar
                    </a>
                </div>
            </form>
        </div>

        <!-- News Grid -->
        @if ($articles->isEmpty())
            <div class="bg-white p-8 rounded-3xl shadow-sm text-center">
                <i class="ri-newspaper-line text-5xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No se encontraron noticias</h3>
                <p class="text-gray-500">Intenta con otros criterios de búsqueda.</p>
            </div>
        @else
            <!-- Reemplaza toda la sección del grid de noticias con esto: -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                @foreach ($articles as $article)
                    <!-- Card Container -->
                    <div
                        class="relative bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <!-- Top Image Section -->
                        <div class="relative">
                            @if ($article->featured_image)
                                <img src="{{ asset('storage/' . $article->featured_image) }}"
                                    alt="{{ $article->title }}" class="w-full h-48 object-cover">
                            @else
                                <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <i class="ri-image-line text-gray-400 text-4xl"></i>
                                </div>
                            @endif
                            <span class="absolute top-2 right-2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                                {{ $article->category->name }}
                            </span>
                        </div>

                        <!-- Content Section -->
                        <div class="p-5 flex-grow flex flex-col justify-between">
                            <!-- Title and Content -->
                            <div>
                                <h2 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {{ $article->title }}
                                </h2>
                                <div class="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {!! Str::limit(strip_tags($article->content), 150) !!}
                                </div>
                            </div>

                            <!-- Bottom Section with Date and Link -->
                            <div>
                                <div class="text-xs text-gray-500 mb-4">
                                    <i class="ri-calendar-line mr-1"></i>
                                    {{ $article->published_at->format('d/m/Y') }}
                                </div>

                                <!-- Button styled as a solid primary button for high visibility -->
                                <div class="mx-auto">
                                    <a href="{{ route('news.show', $article->slug) }}"
                                        style="display: inline-block; background-color: #23366A; color: white; font-weight: 600; padding: 8px 20px; border-radius: 9999px; margin-top: 5px; transition: all 0.2s;"
                                        onmouseover="this.style.backgroundColor='#1c2a52'"
                                        onmouseout="this.style.backgroundColor='#23366A'">
                                        Ver más <i class="ri-arrow-right-line ml-1"></i>
                                    </a>
                                </div>
                            </div>
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
    </d>

    <!-- Simple footer -->
    <footer class="bg-gray-800 text-white py-8 mt-10">
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
