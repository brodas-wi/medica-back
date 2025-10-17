@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Formularios</h1>
            @if (auth()->user()->hasPermissionTo('manage_pages'))
                <a href="{{ route('forms.create') }}"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                    <i class="ri-file-list-3-line mr-1"></i>Nuevo Formulario
                </a>
            @endif
        </div>

        <div class="bg-white shadow p-6 mb-0">
            <form action="{{ route('forms.index') }}" method="GET" id="filterForm"
                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                    <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                    <input type="text" name="search" id="search" value="{{ request('search') }}"
                        placeholder="Título o descripción"
                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                </div>
                <div>
                    <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                    <select name="status" id="status"
                        class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                        <option value="">Todos</option>
                        <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Activo</option>
                        <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>Inactivo</option>
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
                    <a href="{{ route('forms.index') }}"
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
                Total: {{ $forms->total() }} formulario(s)
            </div>
        </div>

        @if ($forms->isEmpty())
            <div class="bg-white shadow-md p-6 text-center">
                <i class="ri-file-list-3-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">No hay formularios disponibles</h3>
                <p class="text-gray-500 mb-4">Comienza creando tu primer formulario.</p>
                @if (auth()->user()->hasPermissionTo('manage_pages'))
                    <a href="{{ route('forms.create') }}"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                        <i class="ri-file-list-3-line mr-1"></i> Crear Formulario
                    </a>
                @endif
            </div>
        @else
            <div class="bg-white shadow overflow-hidden">
                <!-- Desktop Table View -->
                <div class="hidden lg:block overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Título</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Campos</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Respuestas</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Orden</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @foreach ($forms as $form)
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-medium text-gray-900">{{ $form->title }}</div>
                                        <div class="text-xs text-gray-500 mt-1">
                                            <i class="ri-user-line mr-1"></i>{{ $form->creator->name ?? 'Desconocido' }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm text-gray-600">{{ count($form->fields) }} campos</div>
                                        <div class="flex flex-wrap gap-1 mt-1">
                                            @foreach ($form->fields as $index => $field)
                                                @if ($index < 3)
                                                    <span
                                                        class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                                        {{ $field['label'] }}
                                                    </span>
                                                @elseif ($index == 3)
                                                    <span
                                                        class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                                        +{{ count($form->fields) - 3 }} más
                                                    </span>
                                                    @break
                                                @endif
                                            @endforeach
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        @if ($form->status == 'active')
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-700 rounded-full">
                                                Activo
                                            </span>
                                        @else
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-gray-100 text-gray-700 rounded-full">
                                                Inactivo
                                            </span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <a href="{{ route('forms.submissions', $form->id) }}"
                                            class="text-primary hover:underline">
                                            {{ $form->submissions()->count() }} respuestas
                                        </a>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="text-sm text-gray-900 font-mono">{{ $form->order }}</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                        <div class="flex justify-end gap-1">
                                            @if (auth()->user()->hasPermissionTo('manage_pages'))
                                                <a href="{{ route('forms.submissions', $form->id) }}"
                                                    class="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
                                                    title="Ver respuestas">
                                                    <i class="ri-file-list-3-line text-lg"></i>
                                                </a>
                                                <a href="{{ route('forms.edit', $form->id) }}"
                                                    class="text-primary hover:bg-slate-100 p-1 rounded-full"
                                                    title="Editar formulario">
                                                    <i class="ri-edit-line text-lg"></i>
                                                </a>
                                                <form action="{{ route('forms.destroy', $form->id) }}" method="POST"
                                                    class="inline delete-form" id="delete-form-{{ $form->id }}">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="button"
                                                        class="text-red-600 hover:bg-red-50 p-1 rounded-full delete-btn cursor-pointer"
                                                        title="Eliminar formulario"
                                                        onclick="confirmDelete('{{ $form->title }}', document.getElementById('delete-form-{{ $form->id }}'))">
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

                <!-- Mobile Card View -->
                <div class="lg:hidden">
                    @foreach ($forms as $form)
                        <div class="border-b border-gray-200 p-4 hover:bg-gray-50">
                            <!-- Header -->
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex-1">
                                    <h3 class="text-sm font-medium text-gray-900">{{ $form->title }}</h3>
                                    <p class="text-xs text-gray-500 mt-1">
                                        <i class="ri-user-line mr-1"></i>{{ $form->creator->name ?? 'Desconocido' }}
                                    </p>
                                </div>
                                <div class="ml-2">
                                    @if ($form->status == 'active')
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-700 rounded-full">
                                            Activo
                                        </span>
                                    @else
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-gray-100 text-gray-700 rounded-full">
                                            Inactivo
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <!-- Fields -->
                            <div class="mb-3">
                                <p class="text-xs text-gray-600 mb-1">{{ count($form->fields) }} campos</p>
                                <div class="flex flex-wrap gap-1">
                                    @foreach ($form->fields as $index => $field)
                                        @if ($index < 3)
                                            <span
                                                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                                {{ $field['label'] }}
                                            </span>
                                        @elseif ($index == 3)
                                            <span
                                                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                                +{{ count($form->fields) - 3 }} más
                                            </span>
                                            @break
                                        @endif
                                    @endforeach
                                </div>
                            </div>

                            <!-- Meta Info -->
                            <div class="text-xs text-gray-500 mb-3 space-y-1">
                                <div class="flex items-center">
                                    <i class="ri-reply-line mr-1"></i>
                                    <a href="{{ route('forms.submissions', $form->id) }}"
                                        class="text-primary hover:underline">
                                        {{ $form->submissions()->count() }} respuestas
                                    </a>
                                </div>
                                <div class="flex items-center">
                                    <i class="ri-sort-asc mr-1"></i>
                                    <span>Orden: {{ $form->order }}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="ri-time-line mr-1"></i>
                                    <span>Actualizado: {{ $form->updated_at->diffForHumans() }}</span>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-wrap justify-end gap-1">
                                @if (auth()->user()->hasPermissionTo('manage_pages'))
                                    <a href="{{ route('forms.submissions', $form->id) }}"
                                        class="text-blue-600 hover:bg-blue-50 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                        <i class="ri-file-list-3-line mr-1"></i>Respuestas
                                    </a>
                                    <a href="{{ route('forms.edit', $form->id) }}"
                                        class="text-primary hover:bg-slate-100 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                        <i class="ri-edit-line mr-1"></i>Editar
                                    </a>
                                    <form action="{{ route('forms.destroy', $form->id) }}" method="POST"
                                        class="inline delete-form" id="delete-form-mobile-{{ $form->id }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="button"
                                            class="text-red-600 hover:bg-red-50 rounded-full px-2 py-1 text-sm flex items-center cursor-pointer delete-btn transition-all"
                                            onclick="confirmDelete('{{ $form->title }}', document.getElementById('delete-form-mobile-{{ $form->id }}'))">
                                            <i class="ri-delete-bin-line mr-1"></i>Eliminar
                                        </button>
                                    </form>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>

                <!-- Pagination -->
                @if ($forms->hasPages())
                    <div class="px-6 py-4 border-t border-gray-200 bg-white">
                        <div class="flex items-center justify-center">
                            {{ $forms->appends(request()->except('page'))->links() }}
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

            // Function to update per_page parameter and reload
            window.updatePerPage = function(value) {
                const url = new URL(window.location.href);
                url.searchParams.set('per_page', value);
                url.searchParams.set('page', '1'); // Reset to first page
                showLoadingIndicator();
                window.location.href = url.toString();
            };

            // Function to confirm form deletion
            window.confirmDelete = function(formTitle, formElement) {
                Swal.fire({
                    title: '¿Eliminar formulario?',
                    html: `¿Estás seguro de eliminar el formulario <strong>${formTitle}</strong>?`,
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
        });
    </script>
@endsection
@endsection
