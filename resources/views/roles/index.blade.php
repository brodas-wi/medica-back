@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Roles</h1>
            @if (auth()->user()->hasAnyPermission(['create_roles', 'manage_roles']))
                <a href="{{ route('roles.create') }}"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                    <i class="ri-shield-cross-line mr-1"></i>Nuevo Rol
                </a>
            @endif
        </div>

        <div class="bg-white shadow p-6 mb-0">
            <form action="{{ route('roles.index') }}" method="GET" id="filterForm"
                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                    <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                    <input type="text" name="search" id="search" value="{{ request('search') }}"
                        placeholder="Nombre o descripción"
                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                </div>
                <div>
                    <label for="users" class="block text-gray-700 text-sm font-bold mb-2">Usuarios</label>
                    <select name="users" id="users"
                        class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                        <option value="">Todos</option>
                        <option value="with" {{ request('users') == 'with' ? 'selected' : '' }}>Con usuarios</option>
                        <option value="without" {{ request('users') == 'without' ? 'selected' : '' }}>Sin usuarios</option>
                    </select>
                </div>
                <div class="flex items-end gap-2 lg:col-span-2">
                    <button type="submit"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                        <i class="ri-search-line mr-1"></i>Filtrar
                    </button>
                    <a href="{{ route('roles.index') }}"
                        class="bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                        <i class="ri-refresh-line mr-1"></i>Limpiar
                    </a>
                </div>
            </form>
        </div>

        @if ($roles->isEmpty())
            <div class="bg-white shadow-md p-6 text-center">
                <i class="ri-shield-user-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">No hay roles disponibles</h3>
                <p class="text-gray-500 mb-4">Comienza creando tu primer rol.</p>
                @if (auth()->user()->hasAnyPermission(['create_roles', 'manage_roles']))
                    <a href="{{ route('roles.create') }}"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                        <i class="ri-shield-cross-line mr-1"></i>Nuevo Rol
                    </a>
                @endif
            </div>
        @else
            <div class="bg-white shadow overflow-hidden">
                <!-- Desktop Table View -->
                <div class="hidden md:block overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16 hidden md:table-cell">
                                    ID
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                    Descripción
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                    Usuarios
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24 hidden sm:table-cell">
                                    Permisos
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @foreach ($roles as $role)
                                @php
                                    $isAdmin = strtolower($role->name) === 'administrator';
                                @endphp
                                <tr class="hover:bg-gray-50 {{ $isAdmin ? 'bg-gray-50' : '' }}">
                                    <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                        <div class="text-sm text-gray-900">{{ $role->id }}</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="text-sm font-medium text-gray-900">{{ $role->name }}</div>
                                            @if ($isAdmin)
                                                <span
                                                    class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                    Sistema
                                                </span>
                                            @endif
                                        </div>
                                        <div class="text-xs text-gray-500 md:hidden hidden sm:block">ID:
                                            {{ $role->id }}</div>
                                        <!-- Mostrar contador de permisos en móvil -->
                                        <div class="text-xs text-gray-500 sm:hidden mt-1">
                                            <i class="ri-lock-line"></i> {{ $role->permissions_count ?? 0 }} Permisos
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 hidden sm:table-cell">
                                        <div class="text-sm text-gray-900">{{ $role->description }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 rounded-full font-semibold {{ $role->users_count > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700' }}">
                                            {{ $role->users_count }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 rounded-full font-semibold {{ $role->permissions_count > 0 ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700' }}">
                                            {{ $role->permissions_count ?? 0 }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                        <div class="flex justify-end flex-wrap gap-2">
                                            <!-- Manage role permissions button - hidden for Administrator role -->
                                            @if (auth()->user()->hasAnyPermission(['edit_roles', 'manage_roles']) && !$isAdmin)
                                                <a href="{{ route('roles.permissions', $role->id) }}"
                                                    class="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
                                                    title="Permisos">
                                                    <i class="ri-lock-line text-lg"></i>
                                                </a>
                                            @endif

                                            <!-- Edit button - hidden for Administrator role -->
                                            @if (auth()->user()->hasAnyPermission(['edit_roles', 'manage_roles']) && !$isAdmin)
                                                <a href="{{ route('roles.edit', $role->id) }}"
                                                    class="text-primary hover:bg-slate-100 p-1 rounded-full" title="Editar">
                                                    <i class="ri-edit-line text-lg"></i>
                                                </a>
                                            @endif

                                            <!-- Delete button - hidden for Administrator role and roles with users -->
                                            @if (auth()->user()->hasAnyPermission(['delete_roles', 'manage_roles']) &&
                                                    $role->users_count == 0 &&
                                                    !$isAdmin)
                                                <form action="{{ route('roles.destroy', $role->id) }}" method="POST"
                                                    class="inline delete-form" id="delete-form-{{ $role->id }}">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="button"
                                                        class="text-red-600 hover:bg-red-50 p-1 rounded-full delete-btn"
                                                        title="Eliminar"
                                                        onclick="confirmDelete('{{ $role->name }}', document.getElementById('delete-form-{{ $role->id }}'))">
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
                <div class="md:hidden">
                    @foreach ($roles as $role)
                        @php
                            $isAdmin = strtolower($role->name) === 'administrator';
                        @endphp
                        <div class="border-b border-gray-200 p-4 hover:bg-gray-50 {{ $isAdmin ? 'bg-gray-50' : '' }}">
                            <!-- Header -->
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex-1">
                                    <div class="flex items-center">
                                        <h3 class="text-sm font-medium text-gray-900">{{ $role->name }}</h3>
                                        @if ($isAdmin)
                                            <span class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                Sistema
                                            </span>
                                        @endif
                                    </div>
                                    <p class="text-xs text-gray-500 mt-1">#{{ $role->id }}</p>
                                </div>
                                <div class="ml-2 flex space-x-2">
                                    <span
                                        class="px-2 py-1 inline-flex text-xs leading-5 rounded-full font-semibold {{ $role->users_count > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700' }}">
                                        <i class="ri-user-line mr-1"></i>{{ $role->users_count }}
                                    </span>
                                    <span
                                        class="px-2 py-1 inline-flex text-xs leading-5 rounded-full font-semibold {{ $role->permissions_count > 0 ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700' }}">
                                        <i class="ri-lock-line mr-1"></i>{{ $role->permissions_count ?? 0 }}
                                    </span>
                                </div>
                            </div>

                            <!-- Description -->
                            <div class="mb-3">
                                <p class="text-sm text-gray-700">{{ $role->description }}</p>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-wrap justify-end gap-2">
                                <!-- Manage role permissions button - hidden for Administrator role -->
                                @if (auth()->user()->hasAnyPermission(['edit_roles', 'manage_roles']) && !$isAdmin)
                                    <a href="{{ route('roles.permissions', $role->id) }}"
                                        class="text-blue-600 hover:bg-blue-50 rounded-full px-3 py-1 text-sm flex items-center">
                                        <i class="ri-lock-line mr-1"></i>Permisos
                                    </a>
                                @endif

                                <!-- Edit button - hidden for Administrator role -->
                                @if (auth()->user()->hasAnyPermission(['edit_roles', 'manage_roles']) && !$isAdmin)
                                    <a href="{{ route('roles.edit', $role->id) }}"
                                        class="text-primary hover:bg-slate-100 rounded-full px-3 py-1 text-sm flex items-center">
                                        <i class="ri-edit-line mr-1"></i>Editar
                                    </a>
                                @endif

                                <!-- Delete button - hidden for Administrator role and roles with users -->
                                @if (auth()->user()->hasAnyPermission(['delete_roles', 'manage_roles']) &&
                                        $role->users_count == 0 &&
                                        !$isAdmin)
                                    <form action="{{ route('roles.destroy', $role->id) }}" method="POST"
                                        class="inline delete-form" id="delete-form-mobile-{{ $role->id }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="button"
                                            class="text-red-600 hover:bg-red-50 rounded-full px-3 py-1 text-sm flex items-center delete-btn"
                                            onclick="confirmDelete('{{ $role->name }}', document.getElementById('delete-form-mobile-{{ $role->id }}'))">
                                            <i class="ri-delete-bin-line mr-1"></i>Eliminar
                                        </button>
                                    </form>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif
    </div>

@section('scripts')
    <script>
        // Initialize loading indicators and setup event listeners for the page
        document.addEventListener('DOMContentLoaded', function() {
            // Usar el indicador de carga global para el formulario de filtros
            setupLoadingIndicator('filterForm');

            // Setup loading indicators for all delete forms
            document.querySelectorAll('.delete-form').forEach(form => {
                setupLoadingIndicator(form.id);
            });

            // Function to confirm role deletion with SweetAlert2
            window.confirmDelete = function(roleName, form) {
                Swal.fire({
                    title: '¿Eliminar rol?',
                    html: `¿Estás seguro de eliminar el rol <strong>${roleName}</strong>?<br>Esta acción no se puede deshacer.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#e3342f',
                    cancelButtonColor: '#6b7280',
                    reverseButtons: true,
                    focusCancel: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        showLoadingIndicator();
                        form.submit();
                    }
                });
            };
        });
    </script>
@endsection
@endsection
