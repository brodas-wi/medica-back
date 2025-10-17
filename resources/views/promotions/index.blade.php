@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Promociones</h1>
            @if (auth()->user()->hasPermissionTo('manage_promotions'))
                <a href="{{ route('promotions.create') }}"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                    <i class="ri-add-line mr-1"></i>Nueva Promoción
                </a>
            @endif
        </div>

        <div class="bg-white shadow p-6 mb-0">
            <form action="{{ route('promotions.index') }}" method="GET" id="filterForm">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                        <input type="text" name="search" id="search" value="{{ request('search') }}"
                            placeholder="Título, categoría o descripción"
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                    </div>
                    <div>
                        <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                        <select name="status" id="status"
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="">Todos</option>
                            <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Activo</option>
                            <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>Inactivo
                            </option>
                        </select>
                    </div>
                    @if (count($categories) > 0)
                        <div>
                            <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
                            <select name="category" id="category"
                                class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                <option value="">Todas</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category }}"
                                        {{ request('category') == $category ? 'selected' : '' }}>
                                        {{ $category }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    @endif
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
                </div>

                <div class="flex flex-col sm:flex-row gap-2 justify-start">
                    <button type="submit"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-6 focus:outline-none flex items-center justify-center rounded-full">
                        <i class="ri-search-line mr-1"></i>Filtrar
                    </button>
                    <a href="{{ route('promotions.index') }}"
                        class="bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-2 px-6 focus:outline-none flex items-center justify-center rounded-full">
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
                Total: {{ $promotions->total() }} promoción(es)
            </div>
        </div>

        @if ($promotions->isEmpty())
            <div class="bg-white shadow-md p-6 text-center">
                <i class="ri-megaphone-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">No hay promociones disponibles</h3>
                <p class="text-gray-500 mb-4">Comienza creando tu primera promoción.</p>
                @if (auth()->user()->hasPermissionTo('manage_promotions'))
                    <a href="{{ route('promotions.create') }}"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                        <i class="ri-add-line mr-1"></i> Crear Promoción
                    </a>
                @endif
            </div>
        @else
            <div class="bg-white shadow overflow-hidden">
                <div class="hidden lg:block overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vista previa</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Información</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Autor</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vigencia</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @forelse ($promotions as $promotion)
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="w-24 h-16 bg-gray-100 rounded overflow-hidden">
                                            <img src="{{ $promotion->getImageAttribute() }}" alt="{{ $promotion->title }}"
                                                class="w-full h-full object-cover">
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-medium text-gray-900">{{ $promotion->title }}</div>
                                        <div class="text-xs text-primary font-medium">{{ $promotion->category }}</div>
                                        <div class="text-xs text-gray-500 mt-1">
                                            {{ Str::limit($promotion->short_description, 50) }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ $promotion->creator->name ?? 'Desconocido' }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        @if ($promotion->status == 'active')
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
                                        @if (!empty($promotion->active_days))
                                            <span class="text-xs text-gray-700">
                                                <i
                                                    class="ri-calendar-check-line mr-1"></i>{{ $promotion->active_days_label }}
                                            </span>
                                        @endif
                                        @if ($promotion->end_date)
                                            @if ($promotion->remaining_days > 0)
                                                <span
                                                    class="text-xs text-gray-700 {{ !empty($promotion->active_days) ? 'block mt-1' : '' }}">
                                                    <i class="ri-time-line mr-1"></i>{{ $promotion->remaining_days }}
                                                    día(s)
                                                </span>
                                            @else
                                                <span
                                                    class="text-xs text-red-600 {{ !empty($promotion->active_days) ? 'block mt-1' : '' }}">
                                                    <i class="ri-close-circle-line mr-1"></i>Expirada
                                                </span>
                                            @endif
                                        @elseif (empty($promotion->active_days))
                                            <span class="text-xs text-gray-500">Sin límite</span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                        <div class="flex justify-end gap-1">
                                            @if (auth()->user()->hasPermissionTo('manage_promotions') || auth()->user()->hasPermissionTo('toggle_promotions'))
                                                <button type="button"
                                                    class="toggle-status-btn {{ $promotion->status == 'active' ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50' }} p-1 rounded-full"
                                                    title="{{ $promotion->status == 'active' ? 'Desactivar promoción' : 'Activar promoción' }}"
                                                    data-promotion-id="{{ $promotion->id }}"
                                                    data-promotion-title="{{ $promotion->title }}"
                                                    data-promotion-status="{{ $promotion->status }}"
                                                    data-promotion-expired="{{ $promotion->end_date && $promotion->remaining_days <= 0 ? 'true' : 'false' }}">
                                                    <i
                                                        class="ri-{{ $promotion->status == 'active' ? 'close' : 'check' }}-line text-xl"></i>
                                                </button>
                                            @endif
                                            @if (auth()->user()->hasPermissionTo('manage_promotions') || auth()->user()->hasPermissionTo('edit_promotions'))
                                                <a href="{{ route('promotions.edit', $promotion->id) }}"
                                                    class="text-primary hover:bg-slate-100 p-1 rounded-full"
                                                    title="Editar promoción">
                                                    <i class="ri-edit-line text-lg"></i>
                                                </a>
                                            @endif
                                            @if (auth()->user()->hasPermissionTo('manage_promotions') || auth()->user()->hasPermissionTo('delete_promotions'))
                                                <form action="{{ route('promotions.destroy', $promotion->id) }}"
                                                    method="POST" class="inline delete-form"
                                                    id="delete-form-{{ $promotion->id }}">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="button"
                                                        class="text-red-600 hover:bg-red-50 p-1 rounded-full delete-btn cursor-pointer"
                                                        title="Eliminar promoción"
                                                        onclick="confirmDelete('{{ $promotion->title }}', document.getElementById('delete-form-{{ $promotion->id }}'))">
                                                        <i class="ri-delete-bin-line text-lg"></i>
                                                    </button>
                                                </form>
                                            @endif
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                                        <i class="ri-information-line text-3xl mb-2 block"></i>
                                        <p>No hay promociones para mostrar</p>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div class="lg:hidden">
                    @forelse ($promotions as $promotion)
                        <div class="border-b border-gray-200 p-4 hover:bg-gray-50">
                            <div class="mb-3">
                                <img src="{{ $promotion->getImageAttribute() }}" alt="{{ $promotion->title }}"
                                    class="w-full h-32 object-cover rounded">
                            </div>

                            <div class="flex justify-between items-start mb-3">
                                <div class="flex-1">
                                    <h3 class="text-sm font-medium text-gray-900">{{ $promotion->title }}</h3>
                                    <p class="text-xs text-primary font-medium mt-1">{{ $promotion->category }}</p>
                                </div>
                                <div class="ml-2">
                                    @if ($promotion->status == 'active')
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

                            <p class="text-xs text-gray-600 mb-3">{{ Str::limit($promotion->short_description, 100) }}</p>

                            <div class="text-xs text-gray-500 mb-3 space-y-1">
                                <div class="flex items-center">
                                    <i class="ri-user-line mr-1"></i>
                                    <span>{{ $promotion->creator->name ?? 'Desconocido' }}</span>
                                </div>
                                @if (!empty($promotion->active_days))
                                    <div class="flex items-center">
                                        <i class="ri-calendar-check-line mr-1"></i>
                                        <span>{{ $promotion->active_days_label }}</span>
                                    </div>
                                @endif
                                @if ($promotion->end_date)
                                    <div class="flex items-center">
                                        <i class="ri-time-line mr-1"></i>
                                        <span>
                                            @if ($promotion->remaining_days > 0)
                                                {{ $promotion->remaining_days }} día(s) restantes
                                            @else
                                                Expirada
                                            @endif
                                        </span>
                                    </div>
                                @endif
                            </div>

                            <div class="flex flex-wrap justify-end gap-1">
                                @if (auth()->user()->hasPermissionTo('manage_promotions') || auth()->user()->hasPermissionTo('toggle_promotions'))
                                    <button type="button"
                                        class="toggle-status-btn {{ $promotion->status == 'active' ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50' }} rounded-full px-2 py-1 text-sm flex items-center transition-all"
                                        data-promotion-id="{{ $promotion->id }}"
                                        data-promotion-title="{{ $promotion->title }}"
                                        data-promotion-status="{{ $promotion->status }}"
                                        data-promotion-expired="{{ $promotion->end_date && $promotion->remaining_days <= 0 ? 'true' : 'false' }}">
                                        <i
                                            class="ri-{{ $promotion->status == 'active' ? 'close' : 'check' }}-line mr-1"></i>
                                        {{ $promotion->status == 'active' ? 'Desactivar' : 'Activar' }}
                                    </button>
                                @endif
                                @if (auth()->user()->hasPermissionTo('manage_promotions') || auth()->user()->hasPermissionTo('edit_promotions'))
                                    <a href="{{ route('promotions.edit', $promotion->id) }}"
                                        class="text-primary hover:bg-slate-100 rounded-full px-2 py-1 text-sm flex items-center transition-all">
                                        <i class="ri-edit-line mr-1"></i>Editar
                                    </a>
                                @endif
                                @if (auth()->user()->hasPermissionTo('manage_promotions') || auth()->user()->hasPermissionTo('delete_promotions'))
                                    <form action="{{ route('promotions.destroy', $promotion->id) }}" method="POST"
                                        class="inline delete-form" id="delete-form-mobile-{{ $promotion->id }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="button"
                                            class="text-red-600 hover:bg-red-50 rounded-full px-2 py-1 text-sm flex items-center cursor-pointer delete-btn transition-all"
                                            onclick="confirmDelete('{{ $promotion->title }}', document.getElementById('delete-form-mobile-{{ $promotion->id }}'))">
                                            <i class="ri-delete-bin-line mr-1"></i>Eliminar
                                        </button>
                                    </form>
                                @endif
                            </div>
                        </div>
                    @empty
                        <div class="p-6 text-center text-gray-500">
                            <i class="ri-information-line text-3xl mb-2 block"></i>
                            <p>No hay promociones para mostrar</p>
                        </div>
                    @endforelse
                </div>

                @if ($promotions->hasPages())
                    <div class="px-6 py-4 border-t border-gray-200 bg-white">
                        <div class="flex items-center justify-center">
                            {{ $promotions->appends(request()->except('page'))->links() }}
                        </div>
                    </div>
                @endif
            </div>
        @endif
    </div>

    @section('scripts')
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                setupLoadingIndicator('filterForm');

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

                // Confirm promotion deletion
                window.confirmDelete = function(promotionTitle, formElement) {
                    Swal.fire({
                        title: '¿Eliminar promoción?',
                        html: `¿Estás seguro de eliminar la promoción <strong>${promotionTitle}</strong>?`,
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

                // Toggle promotion status
                document.querySelectorAll('.toggle-status-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const promotionId = this.dataset.promotionId;
                        const promotionTitle = this.dataset.promotionTitle;
                        const currentStatus = this.dataset.promotionStatus;
                        const isExpired = this.dataset.promotionExpired === 'true';
                        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

                        // Prevent activating expired promotions
                        if (isExpired && newStatus === 'active') {
                            Swal.fire({
                                title: 'Promoción expirada',
                                text: 'No se puede activar una promoción que ya ha expirado. Por favor, actualiza la fecha de finalización primero.',
                                icon: 'error',
                                confirmButtonColor: '#23366A',
                            });
                            return;
                        }

                        Swal.fire({
                            title: `¿${newStatus === 'active' ? 'Activar' : 'Desactivar'} promoción?`,
                            html: `¿Estás seguro de ${newStatus === 'active' ? 'activar' : 'desactivar'} la promoción <strong>${promotionTitle}</strong>?`,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: `Sí, ${newStatus === 'active' ? 'activar' : 'desactivar'}`,
                            cancelButtonText: 'Cancelar',
                            reverseButtons: true,
                            focusCancel: true,
                            confirmButtonColor: '#23366A',
                            cancelButtonColor: '#6b7280',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Show loading
                                Swal.fire({
                                    title: 'Procesando...',
                                    allowOutsideClick: false,
                                    didOpen: () => {
                                        Swal.showLoading();
                                    }
                                });

                                // Send AJAX request
                                fetch(`/promotions/${promotionId}/toggle`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector(
                                                'meta[name="csrf-token"]').getAttribute(
                                                'content'),
                                        },
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            Swal.fire({
                                                title: '¡Éxito!',
                                                text: data.message,
                                                icon: 'success',
                                                confirmButtonColor: '#23366A',
                                            }).then(() => {
                                                // Reload page to reflect changes
                                                window.location.reload();
                                            });
                                        } else {
                                            Swal.fire({
                                                title: 'Error',
                                                text: data.message ||
                                                    'No se pudo cambiar el estado de la promoción',
                                                icon: 'error',
                                                confirmButtonColor: '#23366A',
                                            });
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                        Swal.fire({
                                            title: 'Error',
                                            text: 'Ocurrió un error al cambiar el estado de la promoción',
                                            icon: 'error',
                                            confirmButtonColor: '#23366A',
                                        });
                                    });
                            }
                        });
                    });
                });
            });
        </script>
    @endsection
@endsection
