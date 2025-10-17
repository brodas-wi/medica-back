@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Barras de Navegación</h1>
            <a href="{{ route('navbar.editor.new') }}"
                class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-play-list-add-line mr-1"></i>Nuevo Navbar
            </a>
        </div>

        <div class="bg-white shadow p-6 mb-0">
            <form action="{{ route('navbars.index') }}" method="GET" id="filterForm"
                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                    <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                    <input type="text" name="search" id="search" value="{{ request('search') }}"
                        placeholder="Nombre o slug"
                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                </div>
                <div>
                    <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                    <select name="status" id="status"
                        class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                        <option value="">Todos</option>
                        <option value="published" {{ request('status') == 'published' ? 'selected' : '' }}>Publicado
                        </option>
                        <option value="draft" {{ request('status') == 'draft' ? 'selected' : '' }}>Borrador</option>
                    </select>
                </div>
                @if (isset($creators) && count($creators) > 0)
                    <div>
                        <label for="created_by" class="block text-gray-700 text-sm font-bold mb-2">Creado por</label>
                        <select name="created_by" id="created_by"
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="">Todos</option>
                            @foreach ($creators as $creator)
                                <option value="{{ $creator->id }}"
                                    {{ request('created_by') == $creator->id ? 'selected' : '' }}>
                                    {{ $creator->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                @endif
                <div class="flex items-end gap-2">
                    <button type="submit"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                        <i class="ri-search-line mr-1"></i>Filtrar
                    </button>
                    <a href="{{ route('navbars.index') }}"
                        class="bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                        <i class="ri-refresh-line mr-1"></i>Limpiar
                    </a>
                </div>
            </form>
        </div>

        <!-- Pagination selector -->
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
                Total: {{ $navbars->total() }} barra(s) de navegación
            </div>
        </div>

        @if ($navbars->isEmpty())
            <div class="bg-white shadow-md p-6 text-center">
                <i class="ri-menu-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">No hay barras de navegación</h3>
                <p class="text-gray-500 mb-4">Comienza creando tu primera barra de navegación.</p>
                <a href="{{ route('navbar.editor.new') }}"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                    <i class="ri-play-list-add-line mr-1"></i> Crear Navbar
                </a>
            </div>
        @else
            <div class="bg-white shadow overflow-hidden">
                <!-- Desktop Table View -->
                <div class="hidden lg:block overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Información</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actualizado</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @forelse ($navbars as $navbar)
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-medium text-gray-900">{{ $navbar->name }}</div>
                                        <div class="text-xs text-gray-500 mt-1">
                                            <i class="ri-user-line mr-1"></i>{{ $navbar->creator->name ?? 'Desconocido' }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm text-gray-900">{{ $navbar->slug }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        @if ($navbar->status == 'published')
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-700 rounded-full">
                                                Publicado
                                            </span>
                                        @else
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                                                Borrador
                                            </span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ $navbar->updated_at->diffForHumans() }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                        <div class="flex justify-end gap-1">
                                            <a href="{{ route('navbar.editor.edit', $navbar->id) }}"
                                                class="text-primary hover:bg-slate-100 p-1 rounded-full"
                                                title="Editar navbar">
                                                <i class="ri-edit-line text-lg"></i>
                                            </a>
                                            <a href="{{ route('navbars.preview', $navbar->id) }}"
                                                class="text-blue-600 hover:bg-blue-50 p-1 rounded-full" title="Vista previa"
                                                target="_blank">
                                                <i class="ri-eye-line text-lg"></i>
                                            </a>
                                            @if ($navbar->status == 'draft')
                                                <form action="{{ route('navbars.publish', $navbar->id) }}" method="POST"
                                                    class="inline publish-form" id="publish-form-{{ $navbar->id }}">
                                                    @csrf
                                                    <button type="button"
                                                        class="text-green-600 hover:bg-green-50 p-1 rounded-full publish-btn cursor-pointer"
                                                        title="Activar navbar"
                                                        onclick="confirmPublish('{{ $navbar->name }}', document.getElementById('publish-form-{{ $navbar->id }}'))">
                                                        <i class="ri-upload-2-line text-lg"></i>
                                                    </button>
                                                </form>
                                            @endif
                                            @if ($navbar->status == 'published')
                                                <form action="{{ route('navbars.unpublish', $navbar->id) }}"
                                                    method="POST" class="inline unpublish-form"
                                                    id="unpublish-form-{{ $navbar->id }}">
                                                    @csrf
                                                    <button type="button"
                                                        class="text-yellow-600 hover:bg-yellow-50 p-1 rounded-full unpublish-btn cursor-pointer"
                                                        title="Desactivar navbar"
                                                        onclick="confirmUnpublish('{{ $navbar->name }}', document.getElementById('unpublish-form-{{ $navbar->id }}'))">
                                                        <i class="ri-download-2-line text-lg"></i>
                                                    </button>
                                                </form>
                                            @endif
                                            <form action="{{ route('navbars.destroy', $navbar->id) }}" method="POST"
                                                class="inline delete-form" id="delete-form-{{ $navbar->id }}">
                                                @csrf
                                                @method('DELETE')
                                                <button type="button"
                                                    class="text-red-600 hover:bg-red-50 p-1 rounded-full delete-btn cursor-pointer"
                                                    title="Eliminar navbar"
                                                    onclick="confirmDelete('{{ $navbar->name }}', document.getElementById('delete-form-{{ $navbar->id }}'))">
                                                    <i class="ri-delete-bin-line text-lg"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                                        <i class="ri-information-line text-3xl mb-2 block"></i>
                                        <p>No hay barras de navegación para mostrar</p>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Card View -->
                <div class="lg:hidden">
                    @forelse ($navbars as $navbar)
                        <div class="border-b border-gray-200 p-4 hover:bg-gray-50">
                            <!-- Header -->
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex-1">
                                    <h3 class="text-sm font-medium text-gray-900">{{ $navbar->name }}</h3>
                                    <p class="text-xs text-gray-500 mt-1">{{ $navbar->slug }}</p>
                                </div>
                                <div class="ml-2">
                                    @if ($navbar->status == 'published')
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-700 rounded-full">
                                            Publicado
                                        </span>
                                    @else
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                                            Borrador
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <!-- Meta Info -->
                            <div class="text-xs text-gray-500 mb-3 space-y-1">
                                <div class="flex items-center">
                                    <i class="ri-user-line mr-1"></i>
                                    <span>{{ $navbar->creator->name ?? 'Desconocido' }}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="ri-time-line mr-1"></i>
                                    <span>Actualizado: {{ $navbar->updated_at->diffForHumans() }}</span>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-wrap justify-end gap-1">
                                <a href="{{ route('navbar.editor.edit', $navbar->id) }}"
                                    class="text-primary hover:bg-slate-100 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                    <i class="ri-edit-line mr-1"></i>Editar
                                </a>
                                <a href="{{ route('navbars.preview', $navbar->id) }}"
                                    class="text-blue-600 hover:bg-blue-50 rounded-full px-2 py-1 text-sm flex items-center transition-all"
                                    target="_blank">
                                    <i class="ri-eye-line mr-1"></i>Vista previa
                                </a>
                                @if ($navbar->status == 'draft')
                                    <form action="{{ route('navbars.publish', $navbar->id) }}" method="POST"
                                        class="inline publish-form" id="publish-form-mobile-{{ $navbar->id }}">
                                        @csrf
                                        <button type="button"
                                            class="text-green-600 hover:bg-green-50 rounded-full px-2 py-1 text-sm flex items-center cursor-pointer publish-btn transition-all"
                                            onclick="confirmPublish('{{ $navbar->name }}', document.getElementById('publish-form-mobile-{{ $navbar->id }}'))">
                                            <i class="ri-upload-2-line mr-1"></i>Activar
                                        </button>
                                    </form>
                                @endif
                                @if ($navbar->status == 'published')
                                    <form action="{{ route('navbars.unpublish', $navbar->id) }}" method="POST"
                                        class="inline unpublish-form" id="unpublish-form-mobile-{{ $navbar->id }}">
                                        @csrf
                                        <button type="button"
                                            class="text-yellow-600 hover:bg-yellow-50 rounded-full px-2 py-1 text-sm flex items-center cursor-pointer unpublish-btn transition-all"
                                            onclick="confirmUnpublish('{{ $navbar->name }}', document.getElementById('unpublish-form-mobile-{{ $navbar->id }}'))">
                                            <i class="ri-download-2-line mr-1"></i>Desactivar
                                        </button>
                                    </form>
                                @endif
                                <form action="{{ route('navbars.destroy', $navbar->id) }}" method="POST"
                                    class="inline delete-form" id="delete-form-mobile-{{ $navbar->id }}">
                                    @csrf
                                    @method('DELETE')
                                    <button type="button"
                                        class="text-red-600 hover:bg-red-50 rounded-full px-2 py-1 text-sm flex items-center cursor-pointer delete-btn transition-all"
                                        onclick="confirmDelete('{{ $navbar->name }}', document.getElementById('delete-form-mobile-{{ $navbar->id }}'))">
                                        <i class="ri-delete-bin-line mr-1"></i>Eliminar
                                    </button>
                                </form>
                            </div>
                        </div>
                    @empty
                        <div class="p-6 text-center text-gray-500">
                            <i class="ri-information-line text-3xl mb-2 block"></i>
                            <p>No hay barras de navegación para mostrar</p>
                        </div>
                    @endforelse
                </div>

                <!-- Pagination -->
                @if ($navbars->hasPages())
                    <div class="px-6 py-4 border-t border-gray-200 bg-white">
                        <div class="flex items-center justify-center">
                            {{ $navbars->appends(request()->except('page'))->links() }}
                        </div>
                    </div>
                @endif
            </div>
        @endif
    </div>

    @section('scripts')
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                // Setup loading indicator for filter form
                setupLoadingIndicator('filterForm');

                // Setup loading indicators for all delete forms
                document.querySelectorAll('.delete-form').forEach(form => {
                    setupLoadingIndicator(form.id);
                });

                // Setup loading indicators for all publish forms
                document.querySelectorAll('.publish-form').forEach(form => {
                    setupLoadingIndicator(form.id);
                });

                // Setup loading indicators for all unpublish forms
                document.querySelectorAll('.unpublish-form').forEach(form => {
                    setupLoadingIndicator(form.id);
                });

                // Function to update per_page parameter and reload
                window.updatePerPage = function(value) {
                    const url = new URL(window.location.href);
                    url.searchParams.set('per_page', value);
                    url.searchParams.set('page', '1'); // Reset to first page
                    showLoadingIndicator();
                    window.location.href = url.toString();
                };

                // Function to confirm navbar deletion
                window.confirmDelete = function(navbarName, formElement) {
                    Swal.fire({
                        title: '¿Eliminar barra de navegación?',
                        html: `¿Estás seguro de eliminar la barra de navegación <strong>${navbarName}</strong>?`,
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

                // Function to confirm navbar publication
                window.confirmPublish = function(navbarName, formElement) {
                    Swal.fire({
                        title: '¿Activar barra de navegación?',
                        html: `¿Estás seguro de activar la barra de navegación <strong>${navbarName}</strong>?`,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, activar',
                        cancelButtonText: 'Cancelar',
                        reverseButtons: true,
                        focusCancel: true,
                        confirmButtonColor: '#10b981',
                        cancelButtonColor: '#6b7280',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            showLoadingIndicator();
                            formElement.submit();
                        }
                    });
                };

                // Function to confirm navbar unpublication
                window.confirmUnpublish = function(navbarName, formElement) {
                    Swal.fire({
                        title: '¿Desactivar barra de navegación?',
                        html: `¿Estás seguro de cambiar a borrador la barra de navegación <strong>${navbarName}</strong>?`,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, desactivar',
                        cancelButtonText: 'Cancelar',
                        reverseButtons: true,
                        focusCancel: true,
                        confirmButtonColor: '#eab308',
                        cancelButtonColor: '#6b7280',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            showLoadingIndicator();
                            formElement.submit();
                        }
                    });
                };
            });
        </script>
    @endsection
@endsection
