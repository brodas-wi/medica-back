@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold text-secondary">Categorías de Noticias</h1>
        <a href="{{ route('news.categories.create') }}"
            class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
            <i class="ri-add-line mr-1"></i>Nueva Categoría
        </a>
    </div>

    @if ($categories->isEmpty())
    <div class="bg-white shadow-md p-6 text-center">
        <i class="ri-folder-2-line text-5xl text-gray-400 mb-3"></i>
        <h3 class="text-xl font-medium text-gray-600 mb-1">No hay categorías disponibles</h3>
        <p class="text-gray-500 mb-4">Comienza creando tu primera categoría para noticias.</p>
        <a href="{{ route('news.categories.create') }}"
            class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
            <i class="ri-add-line mr-1"></i> Nueva Categoría
        </a>
    </div>
    @else
    <div class="bg-white shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Noticias
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @foreach ($categories as $category)
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ $category->id }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ $category->name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">{{ $category->slug }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">{{ $category->newsArticles->count() }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            <a href="{{ route('news.categories.edit', $category) }}"
                                class="text-green-600 hover:text-green-900">
                                <i class="ri-edit-line text-lg"></i>
                            </a>
                            <form action="{{ route('news.categories.destroy', $category) }}" method="POST"
                                class="contents">
                                @csrf
                                @method('DELETE')
                                <button type="button" onclick="confirmDeleteCategory({{ $category->id }})"
                                    class="text-red-600 hover:text-red-900">
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
    @endif
</div>

<form id="delete-form" action="" method="POST" style="display: none;">
    @csrf
    @method('DELETE')
</form>

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
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
                    const form = document.getElementById('delete-form-' + categoryId);
                    form.submit();
                }
            });
        };
    });
</script>
@endsection
@endsection