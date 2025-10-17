@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Gestión de Noticias</h1>
            <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <a href="{{ route('news.articles.create') }}"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition justify-center md:justify-start">
                    <i class="ri-add-line mr-1"></i>Nueva Noticia
                </a>
                <a href="{{ route('news.categories.create') }}"
                    class="bg-secondary cursor-pointer hover:bg-secondary/90 text-white px-4 py-2 flex items-center rounded-full transition justify-center md:justify-start">
                    <i class="ri-add-line mr-1"></i>Nueva Categoría
                </a>
            </div>
        </div>

        <div class="mb-6 border-b border-gray-200">
            <ul class="flex flex-wrap -mb-px">
                <li class="mr-2">
                    <a href="#articles"
                        class="inline-block py-3 px-4 text-primary border-b-2 border-primary font-medium text-sm active-tab"
                        onclick="switchTab(event, 'articles-tab', 'categories-tab')">
                        <i class="ri-newspaper-line mr-1"></i>Noticias
                    </a>
                </li>
                <li class="mr-2">
                    <a href="#categories"
                        class="inline-block py-3 px-4 text-gray-500 hover:text-gray-700 border-b-2 border-transparent font-medium text-sm"
                        onclick="switchTab(event, 'categories-tab', 'articles-tab')">
                        <i class="ri-price-tag-3-line mr-1"></i>Categorías
                    </a>
                </li>
            </ul>
        </div>

        <div id="articles-tab" class="tab-content">
            <div class="bg-white shadow p-6 mb-0">
                <form action="{{ route('news.dashboard') }}" method="GET" id="articleFilterForm"
                    class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div>
                        <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                        <input type="text" name="search" id="search" value="{{ request('search') }}"
                            placeholder="Título o contenido"
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                    </div>
                    <div>
                        <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
                        <select name="category" id="category"
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="">Todas las categorías</option>
                            @foreach ($categories ?? [] as $category)
                                <option value="{{ $category->id }}"
                                    {{ request('category') == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                        <select name="status" id="status"
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="">Todos los estados</option>
                            <option value="published" {{ request('status') == 'published' ? 'selected' : '' }}>Publicado
                            </option>
                            <option value="scheduled" {{ request('status') == 'scheduled' ? 'selected' : '' }}>Programado
                            </option>
                            <option value="draft" {{ request('status') == 'draft' ? 'selected' : '' }}>Borrador</option>
                            <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pendiente de
                                revisión</option>
                            <option value="rejected" {{ request('status') == 'rejected' ? 'selected' : '' }}>Rechazado
                            </option>
                        </select>
                    </div>
                    <div class="flex items-end gap-2">
                        <button type="submit"
                            class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                            <i class="ri-search-line mr-1"></i>Filtrar
                        </button>
                        <a href="{{ route('news.dashboard') }}"
                            class="bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                            <i class="ri-refresh-line mr-1"></i>Limpiar
                        </a>
                    </div>
                </form>
            </div>

            <div class="bg-white shadow px-6 py-3 mt-0 border-t border-gray-200 flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <label for="per_page" class="text-sm text-gray-600">Mostrar:</label>
                    <select id="per_page" name="per_page"
                        class="border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:border-primary"
                        onchange="updatePerPage(this.value)">
                        <option value="10" {{ request('per_page', 10) == 10 ? 'selected' : '' }}>10</option>
                        <option value="20" {{ request('per_page') == 20 ? 'selected' : '' }}>20</option>
                        <option value="30" {{ request('per_page') == 30 ? 'selected' : '' }}>30</option>
                    </select>
                    <span class="text-sm text-gray-600">elementos</span>
                </div>
                <div class="text-sm text-gray-600">
                    Total: {{ $articles->total() }} noticia(s)
                </div>
            </div>

            @if ($articles->isEmpty())
                <div class="bg-white shadow-md p-6 text-center">
                    <i class="ri-newspaper-line text-5xl text-gray-400 mb-3"></i>
                    <h3 class="text-xl font-medium text-gray-600 mb-1">No hay noticias disponibles</h3>
                    <p class="text-gray-500 mb-4">Comienza creando tu primera noticia.</p>
                    <a href="{{ route('news.articles.create') }}"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                        <i class="ri-add-line mr-1"></i> Nueva Noticia
                    </a>
                </div>
            @else
                <div class="bg-white shadow overflow-hidden">
                    <div class="hidden lg:block overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Imagen</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Información</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Autor</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Categoría</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Publicación</th>
                                    <th
                                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                @foreach ($articles as $article)
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            @if ($article->featured_image)
                                                <img src="{{ $article->featured_image_url }}" alt="{{ $article->title }}"
                                                    class="h-12 w-20 object-cover rounded">
                                            @else
                                                <div class="h-12 w-20 bg-gray-200 flex items-center justify-center rounded">
                                                    <i class="ri-image-line text-gray-400"></i>
                                                </div>
                                            @endif
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ Str::limit($article->title, 40) }}</div>
                                            <div class="text-xs text-gray-500 mt-1">{{ $article->slug }}</div>
                                            @if ($article->isRejected() && $article->rejection_reason)
                                                <div class="text-xs text-red-500 mt-1">
                                                    Motivo: {{ Str::limit($article->rejection_reason, 50) }}
                                                </div>
                                            @endif
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <i class="ri-user-line text-gray-400 mr-1"></i>
                                                <span
                                                    class="text-sm text-gray-900">{{ $article->uploader->name ?? 'Desconocido' }}</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ $article->category->name }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    {{ $article->status === 'published'
                                        ? 'bg-green-100 text-green-700'
                                        : ($article->status === 'scheduled'
                                            ? 'bg-blue-100 text-blue-700'
                                            : ($article->status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : ($article->status === 'rejected'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'))) }}">
                                                {{ $article->status === 'published'
                                                    ? 'Publicado'
                                                    : ($article->status === 'scheduled'
                                                        ? 'Programado'
                                                        : ($article->status === 'pending'
                                                            ? 'Pendiente'
                                                            : ($article->status === 'rejected'
                                                                ? 'Rechazado'
                                                                : 'Borrador'))) }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ $article->published_at ? $article->published_at->format('d/m/Y H:i') : 'No publicado' }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                            <div class="flex justify-end gap-1">
                                                @if ($article->status === 'published')
                                                    <a href="{{ url('noticias/' . $article->slug) }}" target="_blank"
                                                        class="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
                                                        title="Ver en sitio">
                                                        <i class="ri-external-link-line text-lg"></i>
                                                    </a>
                                                @endif

                                                @if (auth()->user()->hasAnyPermission(['review_news', 'manage_news']) && $article->status === 'pending')
                                                    <a href="{{ route('news.articles.review', $article) }}"
                                                        class="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
                                                        title="Revisar">
                                                        <i class="ri-eye-line text-lg"></i>
                                                    </a>
                                                @endif

                                                @if (auth()->user()->hasAnyPermission(['edit_all_news', 'manage_news']) || $article->uploaded_by === auth()->id())
                                                    <a href="{{ route('news.articles.edit', $article) }}"
                                                        class="text-primary hover:bg-slate-100 p-1 rounded-full"
                                                        title="Editar">
                                                        <i class="ri-edit-line text-lg"></i>
                                                    </a>

                                                    <form action="{{ route('news.articles.destroy', $article) }}"
                                                        method="POST" class="inline delete-form"
                                                        id="delete-article-form-{{ $article->id }}">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="button"
                                                            onclick="confirmDeleteArticle('{{ $article->title }}', document.getElementById('delete-article-form-{{ $article->id }}'))"
                                                            class="text-red-600 hover:bg-red-50 p-1 rounded-full"
                                                            title="Eliminar">
                                                            <i class="ri-delete-bin-line text-lg"></i>
                                                        </button>
                                                    </form>
                                                @endif
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>

                    <div class="lg:hidden">
                        @foreach ($articles as $article)
                            <div class="border-b border-gray-200 p-4 hover:bg-gray-50">
                                <div class="flex justify-between items-start mb-3">
                                    <div class="flex-1">
                                        <h3 class="text-sm font-medium text-gray-900">{{ $article->title }}</h3>
                                        <p class="text-xs text-gray-500 font-mono mt-1">{{ $article->slug }}</p>
                                    </div>
                                    <div class="ml-2">
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                {{ $article->status === 'published'
                                    ? 'bg-green-100 text-green-700'
                                    : ($article->status === 'scheduled'
                                        ? 'bg-blue-100 text-blue-700'
                                        : ($article->status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : ($article->status === 'rejected'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-gray-100 text-gray-700'))) }}">
                                            {{ $article->status === 'published'
                                                ? 'Publicado'
                                                : ($article->status === 'scheduled'
                                                    ? 'Programado'
                                                    : ($article->status === 'pending'
                                                        ? 'Pendiente'
                                                        : ($article->status === 'rejected'
                                                            ? 'Rechazado'
                                                            : 'Borrador'))) }}
                                        </span>
                                    </div>
                                </div>

                                <div class="flex items-start mb-3">
                                    <div class="flex-shrink-0 mr-3">
                                        @if ($article->featured_image)
                                            <img src="{{ $article->featured_image_url }}" alt="{{ $article->title }}"
                                                class="h-16 w-24 object-cover rounded">
                                        @else
                                            <div class="h-16 w-24 bg-gray-200 flex items-center justify-center rounded">
                                                <i class="ri-image-line text-gray-400"></i>
                                            </div>
                                        @endif
                                    </div>
                                    <div class="flex-1 min-w-0 text-xs text-gray-500 space-y-1">
                                        <div class="flex items-center">
                                            <i class="ri-user-line mr-1"></i>
                                            <span>{{ $article->uploader->name ?? 'Desconocido' }}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i class="ri-price-tag-3-line mr-1"></i>
                                            <span>{{ $article->category->name }}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i class="ri-time-line mr-1"></i>
                                            <span>{{ $article->published_at ? $article->published_at->format('d/m/Y H:i') : 'No publicado' }}</span>
                                        </div>
                                        @if ($article->isRejected() && $article->rejection_reason)
                                            <div class="text-red-500">
                                                <i class="ri-error-warning-line mr-1"></i>
                                                <span>{{ Str::limit($article->rejection_reason, 50) }}</span>
                                            </div>
                                        @endif
                                    </div>
                                </div>

                                <div class="flex flex-wrap justify-end gap-1">
                                    @if ($article->status === 'published')
                                        <a href="{{ url('noticias/' . $article->slug) }}" target="_blank"
                                            class="text-blue-600 hover:bg-blue-50 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                            <i class="ri-external-link-line mr-1"></i>Ver
                                        </a>
                                    @endif

                                    @if (auth()->user()->hasAnyPermission(['review_news', 'manage_news']) && $article->status === 'pending')
                                        <a href="{{ route('news.articles.review', $article) }}"
                                            class="text-blue-600 hover:bg-blue-50 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                            <i class="ri-eye-line mr-1"></i>Revisar
                                        </a>
                                    @endif

                                    @if (auth()->user()->hasAnyPermission(['edit_all_news', 'manage_news']) || $article->uploaded_by === auth()->id())
                                        <a href="{{ route('news.articles.edit', $article) }}"
                                            class="text-primary hover:bg-slate-100 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                            <i class="ri-edit-line mr-1"></i>Editar
                                        </a>

                                        <form action="{{ route('news.articles.destroy', $article) }}" method="POST"
                                            class="inline delete-form"
                                            id="delete-article-form-mobile-{{ $article->id }}">
                                            @csrf
                                            @method('DELETE')
                                            <button type="button"
                                                onclick="confirmDeleteArticle('{{ $article->title }}', document.getElementById('delete-article-form-mobile-{{ $article->id }}'))"
                                                class="text-red-600 hover:bg-red-50 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                                <i class="ri-delete-bin-line mr-1"></i>Eliminar
                                            </button>
                                        </form>
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>

                    @if ($articles->hasPages())
                        <div class="px-6 py-4 border-t border-gray-200 bg-white">
                            <div class="flex items-center justify-center">
                                {{ $articles->appends(request()->query())->links() }}
                            </div>
                        </div>
                    @endif
                </div>
            @endif
        </div>

        <div id="categories-tab" class="tab-content hidden">
            @if ($categories->isEmpty())
                <div class="bg-white shadow-md p-6 text-center">
                    <i class="ri-price-tag-3-line text-5xl text-gray-400 mb-3"></i>
                    <h3 class="text-xl font-medium text-gray-600 mb-1">No hay categorías disponibles</h3>
                    <p class="text-gray-500 mb-4">Comienza creando tu primera categoría para noticias.</p>
                    <a href="{{ route('news.categories.create') }}"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                        <i class="ri-add-line mr-1"></i> Nueva Categoría
                    </a>
                </div>
            @else
                <div class="bg-white shadow overflow-hidden">
                    <div class="hidden lg:block overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Descripción</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Noticias</th>
                                    <th
                                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                @foreach ($categories as $category)
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ $category->id }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">{{ $category->name }}</div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="text-sm text-gray-500">
                                                {{ $category->description ?? 'Sin descripción' }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-center">
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-blue-100 text-blue-700 rounded-full">
                                                {{ $category->newsArticles->count() }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                            <div class="flex justify-end gap-1">
                                                <a href="{{ route('news.categories.edit', $category) }}"
                                                    class="text-primary hover:bg-slate-100 p-1 rounded-full"
                                                    title="Editar">
                                                    <i class="ri-edit-line text-lg"></i>
                                                </a>
                                                <form action="{{ route('news.categories.destroy', $category) }}"
                                                    method="POST" class="inline delete-form"
                                                    id="delete-category-form-{{ $category->id }}">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="button"
                                                        onclick="confirmDeleteCategory('{{ $category->name }}', document.getElementById('delete-category-form-{{ $category->id }}'))"
                                                        class="text-red-600 hover:bg-red-50 p-1 rounded-full"
                                                        title="Eliminar">
                                                        <i class="ri-delete-bin-line text-lg"></i>
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>

                    <div class="lg:hidden">
                        @foreach ($categories as $category)
                            <div class="border-b border-gray-200 p-4 hover:bg-gray-50">
                                <div class="flex justify-between items-start mb-3">
                                    <div class="flex-1">
                                        <h3 class="text-sm font-medium text-gray-900">{{ $category->name }}</h3>
                                        <p class="text-xs text-gray-500 mt-1">ID: {{ $category->id }}</p>
                                    </div>
                                    <div class="ml-2">
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-blue-100 text-blue-700 rounded-full">
                                            {{ $category->newsArticles->count() }} noticias
                                        </span>
                                    </div>
                                </div>

                                <div class="text-xs text-gray-500 mb-3">
                                    <div class="flex items-center">
                                        <i class="ri-file-text-line mr-1"></i>
                                        <span>{{ $category->description ?? 'Sin descripción' }}</span>
                                    </div>
                                </div>

                                <div class="flex flex-wrap justify-end gap-1">
                                    <a href="{{ route('news.categories.edit', $category) }}"
                                        class="text-primary hover:bg-slate-100 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                        <i class="ri-edit-line mr-1"></i>Editar
                                    </a>
                                    <form action="{{ route('news.categories.destroy', $category) }}" method="POST"
                                        class="inline delete-form" id="delete-category-form-mobile-{{ $category->id }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="button"
                                            onclick="confirmDeleteCategory('{{ $category->name }}', document.getElementById('delete-category-form-mobile-{{ $category->id }}'))"
                                            class="text-red-600 hover:bg-red-50 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                            <i class="ri-delete-bin-line mr-1"></i>Eliminar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>
    </div>

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Setup loading indicator for article filter form
            setupLoadingIndicator('articleFilterForm');

            // Setup loading indicators for all delete forms
            document.querySelectorAll('.delete-form').forEach(form => {
                setupLoadingIndicator(form.id);
            });

            // Update per page parameter and reload
            window.updatePerPage = function(value) {
                const url = new URL(window.location.href);
                url.searchParams.set('per_page', value);
                url.searchParams.set('page', '1');
                showLoadingIndicator();
                window.location.href = url.toString();
            };

            // Confirm article deletion
            window.confirmDeleteArticle = function(articleTitle, formElement) {
                Swal.fire({
                    title: '¿Eliminar noticia?',
                    html: `¿Estás seguro de eliminar la noticia <strong>${articleTitle}</strong>?<br>Esta acción no se puede deshacer.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true,
                    focusCancel: true,
                    confirmButtonColor: '#e3342f',
                    cancelButtonColor: '#6b7280',
                }).then((result) => {
                    if (result.isConfirmed) {
                        showLoadingIndicator();
                        formElement.submit();
                    }
                });
            };

            // Confirm category deletion
            window.confirmDeleteCategory = function(categoryId) {
                Swal.fire({
                    title: '¿Eliminar categoría?',
                    text: '¿Estás seguro de eliminar esta categoría? Esta acción no se puede deshacer.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#ef4444',
                    cancelButtonColor: '#6b7280'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const form = document.getElementById('delete-category-form');
                        form.action = `{{ url('news/categories') }}/${categoryId}`;
                        form.submit();
                    }
                });
            };

            window.switchTab = function(event, showTabId, hideTabId) {
                event.preventDefault();

                const tabs = document.querySelectorAll('.inline-block');
                tabs.forEach(tab => {
                    tab.classList.remove('text-primary', 'border-primary');
                    tab.classList.add('text-gray-500', 'border-transparent');
                });

                event.currentTarget.classList.remove('text-gray-500', 'border-transparent');
                event.currentTarget.classList.add('text-primary', 'border-primary');

                document.getElementById(showTabId).classList.remove('hidden');
                document.getElementById(hideTabId).classList.add('hidden');
            };

            if (window.location.hash === '#categories') {
                const categoryTab = document.querySelector('a[href="#categories"]');
                if (categoryTab) {
                    categoryTab.click();
                }
            }
        });
    </script>
@endsection
@endsection
