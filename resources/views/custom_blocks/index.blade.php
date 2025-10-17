@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Bloques Personalizados</h1>
            <a href="{{ route('custom-blocks.create') }}"
                class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-add-line mr-1"></i>Nuevo Bloque
            </a>
        </div>

        <div class="bg-white shadow p-6 mb-0">
            <form action="{{ route('custom-blocks.index') }}" method="GET" id="filterForm"
                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                    <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                    <input type="text" name="search" id="search" value="{{ request('search') }}"
                        placeholder="Nombre o descripción"
                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                </div>
                <div>
                    <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
                    <select name="category" id="category"
                        class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                        <option value="">Todas</option>
                        @foreach ($categories as $category)
                            <option value="{{ $category }}" {{ request('category') == $category ? 'selected' : '' }}>
                                {{ $category }}
                            </option>
                        @endforeach
                    </select>
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
                <div class="flex items-end gap-2">
                    <button type="submit"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                        <i class="ri-search-line mr-1"></i>Filtrar
                    </button>
                    <a href="{{ route('custom-blocks.index') }}"
                        class="bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                        <i class="ri-refresh-line mr-1"></i>Limpiar
                    </a>
                </div>
            </form>
        </div>

        @if ($blocks->isEmpty())
            <div class="bg-white shadow-md p-6 text-center">
                <i class="ri-layout-masonry-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">No hay bloques personalizados disponibles</h3>
                <p class="text-gray-500 mb-4">Comienza creando tu primer bloque personalizado.</p>
                <a href="{{ route('custom-blocks.create') }}"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                    <i class="ri-add-line mr-1"></i> Crear Bloque
                </a>
            </div>
        @else
            <div class="bg-white shadow overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 table-auto">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                Categoría
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Icono
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                Actualizado
                            </th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @forelse ($blocks as $block)
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4">
                                    <div class="text-sm font-medium text-gray-900">{{ $block->name }}</div>
                                    <div class="text-xs text-gray-500">{{ Str::limit($block->description, 50) }}</div>
                                    <div class="text-xs text-gray-500 sm:hidden mt-1">{{ $block->category }}</div>
                                    <div class="text-xs text-gray-500 md:hidden hidden sm:block">ID: {{ $block->id }}
                                    </div>
                                    <div class="text-xs text-gray-500 md:hidden mt-1">
                                        <i class="ri-time-line"></i> {{ $block->updated_at->diffForHumans() }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                    <div class="text-sm text-gray-900">{{ $block->category }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    @if ($block->icon_type == 'remix')
                                        <i class="ri-{{ $block->icon }} text-xl text-secondary"></i>
                                    @else
                                        <img src="{{ $block->icon }}" alt="Icono" class="h-6 w-6">
                                    @endif
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full {{ $block->active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' }}">
                                        {{ $block->active ? 'Activo' : 'Inactivo' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div class="text-sm text-gray-900">{{ $block->updated_at->diffForHumans() }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                    <div class="flex justify-end flex-wrap gap-2">
                                        <a href="{{ route('custom-blocks.edit', $block) }}"
                                            class="text-primary hover:underline flex items-center">
                                            <i class="ri-edit-line mr-1"></i><span class="hidden sm:inline">Editar</span>
                                        </a>

                                        <a href="{{ route('custom-blocks.show', $block) }}"
                                            class="text-blue-600 hover:underline flex items-center">
                                            <i class="ri-eye-line mr-1"></i><span class="hidden sm:inline">Ver</span>
                                        </a>

                                        <button type="button" data-id="{{ $block->id }}"
                                            class="toggle-status-btn text-{{ $block->active ? 'orange' : 'green' }}-600 hover:underline flex items-center">
                                            <i
                                                class="ri-{{ $block->active ? 'shut-down-line' : 'play-circle-line' }} mr-1"></i>
                                            <span
                                                class="hidden sm:inline">{{ $block->active ? 'Desactivar' : 'Activar' }}</span>
                                        </button>

                                        <form action="{{ route('custom-blocks.destroy', $block) }}" method="POST"
                                            class="inline delete-form" id="delete-form-{{ $block->id }}">
                                            @csrf
                                            @method('DELETE')
                                            <button type="button"
                                                class="text-red-600 hover:underline flex items-center delete-btn"
                                                onclick="confirmDelete('{{ $block->name }}', document.getElementById('delete-form-{{ $block->id }}'))">
                                                <i class="ri-delete-bin-line mr-1"></i><span
                                                    class="hidden sm:inline">Eliminar</span>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                                    <i class="ri-information-line text-3xl mb-2 block"></i>
                                    <p>No hay bloques personalizados para mostrar</p>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>

                <div class="px-6 py-4">
                    {{ $blocks->appends(request()->query())->links() }}
                </div>
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

                // Function to confirm block deletion
                window.confirmDelete = function(blockName, formElement) {
                    Swal.fire({
                        title: '¿Eliminar bloque?',
                        html: `¿Estás seguro de eliminar el bloque <strong>${blockName}</strong>?`,
                        icon: 'warning',
                        iconColor: '#ef4444',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, eliminar',
                        cancelButtonText: 'Cancelar',
                        reverseButtons: true,
                        focusCancel: true,
                        confirmButtonColor: '#ef4444',
                        cancelButtonColor: '#6b7280',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            showLoadingIndicator();
                            formElement.submit();
                        }
                    });
                };

                // Toggle status button functionality
                document.querySelectorAll('.toggle-status-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const blockId = this.getAttribute('data-id');
                        const btn = this;

                        // Show loading state
                        const originalContent = btn.innerHTML;
                        btn.innerHTML =
                            '<i class="ri-loader-4-line animate-spin mr-1"></i><span class="hidden sm:inline">Procesando...</span>';
                        btn.disabled = true;

                        fetch(`/custom-blocks/${blockId}/toggle`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRF-TOKEN': document.querySelector(
                                        'meta[name="csrf-token"]').getAttribute('content')
                                },
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    // Update row status indicator
                                    const statusSpan = btn.closest('tr').querySelector(
                                        'td:nth-child(5) span');
                                    if (statusSpan) {
                                        if (data.active) {
                                            statusSpan.classList.remove('bg-red-100',
                                                'text-red-700');
                                            statusSpan.classList.add('bg-green-100',
                                                'text-green-700');
                                            statusSpan.textContent = 'Activo';
                                        } else {
                                            statusSpan.classList.remove('bg-green-100',
                                                'text-green-700');
                                            statusSpan.classList.add('bg-red-100', 'text-red-700');
                                            statusSpan.textContent = 'Inactivo';
                                        }
                                    }

                                    // Update button state
                                    if (data.active) {
                                        btn.classList.remove('text-green-600');
                                        btn.classList.add('text-orange-600');
                                        btn.innerHTML =
                                            '<i class="ri-shut-down-line mr-1"></i><span class="hidden sm:inline">Desactivar</span>';
                                    } else {
                                        btn.classList.remove('text-orange-600');
                                        btn.classList.add('text-green-600');
                                        btn.innerHTML =
                                            '<i class="ri-play-circle-line mr-1"></i><span class="hidden sm:inline">Activar</span>';
                                    }

                                    // Use the global showAlert function instead of Toastify directly
                                    window.showAlert("Estado actualizado correctamente", "success");
                                } else {
                                    // Restore original button state
                                    btn.innerHTML = originalContent;

                                    // Use the global showAlert function
                                    window.showAlert("Error al actualizar el estado", "error");
                                }

                                // Re-enable button
                                btn.disabled = false;
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                // Restore original button state
                                btn.innerHTML = originalContent;
                                btn.disabled = false;

                                // Use the global showAlert function
                                window.showAlert("Error al actualizar el estado", "error");
                            });
                    });
                });
            });
        </script>
    @endsection
@endsection
