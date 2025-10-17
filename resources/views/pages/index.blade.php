@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Páginas</h1>
            <a href="{{ route('editor.new') }}"
                class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-file-add-line mr-1"></i>Nueva Página
            </a>
        </div>

        <div class="bg-white shadow p-6 mb-0">
            <form action="{{ route('pages.index') }}" method="GET" id="filterForm"
                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                    <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                    <input type="text" name="search" id="search" value="{{ request('search') }}"
                        placeholder="Título o contenido"
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
                        <option value="archived" {{ request('status') == 'archived' ? 'selected' : '' }}>Archivado</option>
                    </select>
                </div>
                @if (count($creators) > 0)
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
                    <a href="{{ route('pages.index') }}"
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
                Total: {{ $pages->total() }} página(s)
            </div>
        </div>

        @if ($pages->isEmpty())
            <div class="bg-white shadow-md p-6 text-center">
                <i class="ri-file-list-3-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">No hay páginas disponibles</h3>
                <p class="text-gray-500 mb-4">Comienza creando tu primera página.</p>
                <a href="{{ route('editor.new') }}"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                    <i class="ri-file-add-line mr-1"></i> Crear Página
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
                                    Componentes</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actualizado</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @forelse ($pages as $page)
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-medium text-gray-900">{{ $page->title }}</div>
                                        <div class="text-xs text-gray-500 mt-1">
                                            <i class="ri-user-line mr-1"></i>{{ $page->creator->name ?? 'Desconocido' }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm text-gray-900 font-mono">{{ $page->slug }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        @if ($page->status == 'published')
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-700 rounded-full">
                                                Publicado
                                            </span>
                                        @elseif($page->status == 'draft')
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                                                Borrador
                                            </span>
                                        @else
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-gray-100 text-gray-700 rounded-full">
                                                Archivado
                                            </span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex flex-wrap gap-1">
                                            @if ($page->navbar)
                                                <span
                                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                                    <i
                                                        class="ri-layout-top-line mr-1"></i>{{ Str::limit($page->navbar->name, 10) }}
                                                </span>
                                            @endif
                                            @if ($page->footer)
                                                <span
                                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                                    <i
                                                        class="ri-layout-bottom-line mr-1"></i>{{ Str::limit($page->footer->name, 10) }}
                                                </span>
                                            @endif
                                            @if (!$page->navbar && !$page->footer)
                                                <span class="text-xs text-gray-400">Sin componentes</span>
                                            @endif
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ $page->updated_at->diffForHumans() }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                        <div class="flex justify-end gap-1">
                                            <a href="{{ route('editor.edit', $page->id) }}"
                                                class="text-primary hover:bg-slate-100 p-1 rounded-full"
                                                title="Editar contenido">
                                                <i class="ri-edit-line text-lg"></i>
                                            </a>
                                            <a href="{{ route('pages.settings', $page->id) }}"
                                                class="text-purple-600 hover:bg-purple-50 p-1 rounded-full"
                                                title="Configurar">
                                                <i class="ri-settings-3-line text-lg"></i>
                                            </a>
                                            <a href="{{ route('pages.preview', $page->id) }}" target="_blank"
                                                class="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
                                                title="Previsualizar">
                                                <i class="ri-eye-line text-lg"></i>
                                            </a>
                                            @if ($page->status != 'published' && auth()->user()->hasPermissionTo('publish_pages'))
                                                <form action="{{ route('pages.publish', $page->id) }}" method="POST"
                                                    class="inline publish-form" id="publish-form-{{ $page->id }}">
                                                    @csrf
                                                    <button type="button"
                                                        class="text-green-600 hover:bg-green-50 p-1 rounded-full publish-btn cursor-pointer"
                                                        title="Publicar página"
                                                        onclick="confirmPublish('{{ $page->title }}', document.getElementById('publish-form-{{ $page->id }}'))">
                                                        <i class="ri-upload-2-line text-lg"></i>
                                                    </button>
                                                </form>
                                            @endif
                                            @if ($page->status == 'published' && auth()->user()->hasPermissionTo('publish_pages'))
                                                <form action="{{ route('pages.unpublish', $page->id) }}" method="POST"
                                                    class="inline unpublish-form"
                                                    id="unpublish-form-{{ $page->id }}">
                                                    @csrf
                                                    <button type="button"
                                                        class="text-yellow-600 hover:bg-yellow-50 p-1 rounded-full unpublish-btn cursor-pointer"
                                                        title="Despublicar página"
                                                        onclick="confirmUnpublish('{{ $page->title }}', document.getElementById('unpublish-form-{{ $page->id }}'))">
                                                        <i class="ri-download-2-line text-lg"></i>
                                                    </button>
                                                </form>
                                            @endif
                                            <form action="{{ route('pages.destroy', $page->id) }}" method="POST"
                                                class="inline delete-form" id="delete-form-{{ $page->id }}">
                                                @csrf
                                                @method('DELETE')
                                                <button type="button"
                                                    class="text-red-600 hover:bg-red-50 p-1 rounded-full delete-btn cursor-pointer"
                                                    title="Eliminar página"
                                                    onclick="confirmDelete('{{ $page->title }}', document.getElementById('delete-form-{{ $page->id }}'))">
                                                    <i class="ri-delete-bin-line text-lg"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                                        <i class="ri-information-line text-3xl mb-2 block"></i>
                                        <p>No hay páginas para mostrar</p>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Card View -->
                <div class="lg:hidden">
                    @forelse ($pages as $page)
                        <div class="border-b border-gray-200 p-4 hover:bg-gray-50">
                            <!-- Header -->
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex-1">
                                    <h3 class="text-sm font-medium text-gray-900">{{ $page->title }}</h3>
                                    <p class="text-xs text-gray-500 font-mono mt-1">{{ $page->slug }}</p>
                                </div>
                                <div class="ml-2">
                                    @if ($page->status == 'published')
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-700 rounded-full">
                                            Publicado
                                        </span>
                                    @elseif($page->status == 'draft')
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                                            Borrador
                                        </span>
                                    @else
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-gray-100 text-gray-700 rounded-full">
                                            Archivado
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <!-- Meta Info -->
                            <div class="text-xs text-gray-500 mb-3 space-y-1">
                                <div class="flex items-center">
                                    <i class="ri-user-line mr-1"></i>
                                    <span>{{ $page->creator->name ?? 'Desconocido' }}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="ri-time-line mr-1"></i>
                                    <span>Actualizado: {{ $page->updated_at->diffForHumans() }}</span>
                                </div>
                            </div>

                            <!-- Components -->
                            @if ($page->navbar || $page->footer)
                                <div class="mb-3">
                                    <div class="flex flex-wrap gap-1">
                                        @if ($page->navbar)
                                            <span
                                                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                                <i class="ri-layout-top-line mr-1"></i>{{ $page->navbar->name }}
                                            </span>
                                        @endif
                                        @if ($page->footer)
                                            <span
                                                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                                <i class="ri-layout-bottom-line mr-1"></i>{{ $page->footer->name }}
                                            </span>
                                        @endif
                                    </div>
                                </div>
                            @endif

                            <!-- Actions -->
                            <div class="flex flex-wrap justify-end gap-1">
                                <a href="{{ route('editor.edit', $page->id) }}"
                                    class="text-primary hover:bg-slate-100 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                    <i class="ri-edit-line mr-1"></i>Editar
                                </a>
                                <a href="{{ route('pages.settings', $page->id) }}"
                                    class="text-purple-600 hover:bg-purple-50 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                    <i class="ri-settings-3-line mr-1"></i>Configurar
                                </a>
                                <a href="{{ route('pages.preview', $page->id) }}" target="_blank"
                                    class="text-blue-600 hover:bg-blue-50 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                    <i class="ri-eye-line mr-1"></i>Ver
                                </a>
                                @if ($page->status != 'published' && auth()->user()->hasPermissionTo('publish_pages'))
                                    <form action="{{ route('pages.publish', $page->id) }}" method="POST"
                                        class="inline publish-form" id="publish-form-mobile-{{ $page->id }}">
                                        @csrf
                                        <button type="button"
                                            class="text-green-600 hover:bg-green-50 rounded-full px-2 py-1 text-sm flex items-center cursor-pointer publish-btn transition-all"
                                            onclick="confirmPublish('{{ $page->title }}', document.getElementById('publish-form-mobile-{{ $page->id }}'))">
                                            <i class="ri-upload-2-line mr-1"></i>Publicar
                                        </button>
                                    </form>
                                @endif
                                @if ($page->status == 'published' && auth()->user()->hasPermissionTo('publish_pages'))
                                    <form action="{{ route('pages.unpublish', $page->id) }}" method="POST"
                                        class="inline unpublish-form" id="unpublish-form-mobile-{{ $page->id }}">
                                        @csrf
                                        <button type="button"
                                            class="text-yellow-600 hover:bg-yellow-50 rounded-full px-2 py-1 text-sm flex items-center cursor-pointer unpublish-btn transition-all"
                                            onclick="confirmUnpublish('{{ $page->title }}', document.getElementById('unpublish-form-mobile-{{ $page->id }}'))">
                                            <i class="ri-download-2-line mr-1"></i>Despublicar
                                        </button>
                                    </form>
                                @endif
                                <form action="{{ route('pages.destroy', $page->id) }}" method="POST"
                                    class="inline delete-form" id="delete-form-mobile-{{ $page->id }}">
                                    @csrf
                                    @method('DELETE')
                                    <button type="button"
                                        class="text-red-600 hover:bg-red-50 rounded-full px-2 py-1 text-sm flex items-center cursor-pointer delete-btn transition-all"
                                        onclick="confirmDelete('{{ $page->title }}', document.getElementById('delete-form-mobile-{{ $page->id }}'))">
                                        <i class="ri-delete-bin-line mr-1"></i>Eliminar
                                    </button>
                                </form>
                            </div>
                        </div>
                    @empty
                        <div class="p-6 text-center text-gray-500">
                            <i class="ri-information-line text-3xl mb-2 block"></i>
                            <p>No hay páginas para mostrar</p>
                        </div>
                    @endforelse
                </div>

                <!-- Pagination -->
                @if ($pages->hasPages())
                    <div class="px-6 py-4 border-t border-gray-200 bg-white">
                        <div class="flex items-center justify-center">
                            {{ $pages->appends(request()->except('page'))->links() }}
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

                // Function to confirm page deletion
                window.confirmDelete = function(pageTitle, formElement) {
                    Swal.fire({
                        title: '¿Eliminar página?',
                        html: `¿Estás seguro de eliminar la página <strong>${pageTitle}</strong>?`,
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

                // Function to confirm page publication
                window.confirmPublish = function(pageTitle, formElement) {
                    Swal.fire({
                        title: '¿Publicar página?',
                        html: `¿Estás seguro de publicar la página <strong>${pageTitle}</strong>?`,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, publicar',
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

                // Function to confirm page unpublication
                window.confirmUnpublish = function(pageTitle, formElement) {
                    Swal.fire({
                        title: '¿Despublicar página?',
                        html: `¿Estás seguro de cambiar a borrador la página <strong>${pageTitle}</strong>?`,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, despublicar',
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
