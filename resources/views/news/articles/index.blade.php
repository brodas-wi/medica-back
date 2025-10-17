@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold text-secondary">Gestión de Noticias</h1>
        <a href="{{ route('news.articles.create') }}"
            class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
            <i class="ri-add-line mr-1"></i>Nueva Noticia
        </a>
    </div>

    <div class="bg-white shadow p-6 mb-6">
        <form action="{{ route('news.articles.index') }}" method="GET" id="filterForm"
            class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                <input type="text" name="search" id="search" value="{{ request('search') }}"
                    placeholder="Título o contenido"
                    class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
            </div>
            <div>
                <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
                <select name="category" id="category"
                    class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                    <option value="">Todas las categorías</option>
                    @foreach ($categories ?? [] as $category)
                    <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                    @endforeach
                </select>
            </div>
            <div>
                <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                <select name="status" id="status"
                    class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                    <option value="">Todos los estados</option>
                    <option value="published" {{ request('status') == 'published' ? 'selected' : '' }}>Publicado</option>
                    <option value="scheduled" {{ request('status') == 'scheduled' ? 'selected' : '' }}>Programado</option>
                    <option value="draft" {{ request('status') == 'draft' ? 'selected' : '' }}>Borrador</option>
                </select>
            </div>
            <div class="flex items-end space-x-2 col-span-1 md:col-span-3">
                <button type="submit"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full flex-shrink-0">
                    <i class="ri-search-line mr-1"></i>Filtrar
                </button>
                <a href="{{ route('news.articles.index') }}"
                    class="bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full flex-shrink-0">
                    <i class="ri-refresh-line mr-1"></i>Limpiar
                </a>
            </div>
        </form>
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
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Imagen
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Título
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Publicación
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @foreach ($articles as $article)
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        @if ($article->featured_image)
                        <img src="{{ asset('storage/' . $article->featured_image) }}" alt="{{ Str::limit($article->title, 10) }}"
                            class="h-12 w-20 object-cover">
                        @else
                        <div class="h-12 w-20 bg-gray-200 flex items-center justify-center">
                            <i class="ri-image-line text-gray-400"></i>
                        </div>
                        @endif
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-medium text-gray-900 line-clamp-1">{{ $article->title }}</div>
                        <div class="text-xs text-gray-500">
                            <span class="inline-block">{{ $article->slug }}</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ $article->category->name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        {{ $article->status === 'published' ? 'bg-green-100 text-green-800' : 
                                           ($article->status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800') }}">
                            {{ $article->status === 'published' ? 'Publicado' : 
                                           ($article->status === 'scheduled' ? 'Programado' : 'Borrador') }}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">
                            {{ $article->published_at ? $article->published_at->format('d/m/Y H:i') : 'No publicado' }}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            @if ($article->status === 'published')
                            <a href="{{ url('noticias/' . $article->slug) }}" target="_blank"
                                class="text-blue-600 hover:text-blue-900" title="Ver en sitio">
                                <i class="ri-external-link-line text-lg"></i>
                            </a>
                            @endif
                            <a href="{{ route('news.articles.edit', $article) }}"
                                class="text-green-600 hover:text-green-900" title="Editar">
                                <i class="ri-edit-line text-lg"></i>
                            </a>
                            <form action="{{ route('news.articles.destroy', $article) }}" method="POST"
                                class="contents">
                                @csrf
                                @method('DELETE')
                                <button type="button" onclick="confirmDeleteArticle({{ $article->id }})"
                                    class="text-red-600 hover:text-red-900" title="Eliminar">
                                    <i class="ri-delete-bin-line text-lg"></i>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        <div class="px-6 py-4 border-t border-gray-200">
            {{ $articles->appends(request()->query())->links() }}
        </div>
    </div>
    @endif
</div>

<form id="delete-article-form" action="" method="POST" style="display: none;">
    @csrf
    @method('DELETE')
</form>

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        window.confirmDeleteArticle = function(articleId) {
            Swal.fire({
                title: '¿Eliminar noticia?',
                text: '¿Estás seguro de eliminar esta noticia? Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280'
            }).then((result) => {
                if (result.isConfirmed) {
                    const form = document.getElementById('delete-article-form');
                    form.action = `{{ route('news.articles.destroy', '') }}/${articleId}`;
                    form.submit();
                }
            });
        };
    });
</script>
@endsection
@endsection