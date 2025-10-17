@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Usuarios</h1>
            @if (auth()->user()->hasAnyPermission(['create_users', 'manage_users']))
                <a href="{{ route('users.create') }}"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                    <i class="ri-user-add-line mr-1"></i>Nuevo Usuario
                </a>
            @endif
        </div>

        <div class="bg-white shadow p-6 mb-0">
            <form action="{{ route('users.index') }}" method="GET" id="filterForm"
                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                    <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                    <input type="text" name="search" id="search" value="{{ request('search') }}"
                        placeholder="Nombre o correo"
                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                </div>
                <div>
                    <label for="role" class="block text-gray-700 text-sm font-bold mb-2">Rol</label>
                    <select name="role" id="role"
                        class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                        <option value="">Todos los roles</option>
                        @foreach ($roles as $role)
                            <option value="{{ $role->name }}" {{ request('role') == $role->name ? 'selected' : '' }}>
                                {{ $role->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div>
                    <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                    <select name="status" id="status"
                        class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                        <option value="">Todos</option>
                        <option value="1" {{ request('status') === '1' ? 'selected' : '' }}>Activo</option>
                        <option value="0" {{ request('status') === '0' ? 'selected' : '' }}>Inactivo</option>
                    </select>
                </div>
                <div class="flex items-end space-x-2 col-span-1 md:col-span-3 lg:col-span-1">
                    <button type="submit"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full flex-shrink-0">
                        <i class="ri-search-line mr-1"></i>Filtrar
                    </button>
                    <a href="{{ route('users.index') }}"
                        class="bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full flex-shrink-0">
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
                Total: {{ $users->total() }} usuario(s)
            </div>
        </div>

        @if ($users->isEmpty())
            <div class="bg-white shadow-md p-6 text-center">
                <i class="ri-user-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">No hay usuarios disponibles</h3>
                <p class="text-gray-500 mb-4">No se encontraron usuarios con los criterios especificados.</p>
                @if (auth()->user()->hasAnyPermission(['create_users', 'manage_users']))
                    <a href="{{ route('users.create') }}"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                        <i class="ri-user-add-line mr-1"></i> Nuevo Usuario
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
                                    Nombre
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Correo
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @foreach ($users as $user)
                                @php
                                    $isAdmin = $user->hasRole('Administrator');
                                    $isSelf = $user->id === auth()->id();
                                @endphp
                                <tr class="hover:bg-gray-50 {{ $isAdmin ? 'bg-gray-50' : '' }}">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="text-sm font-medium text-gray-900">{{ $user->name }}</div>
                                            @if ($isAdmin)
                                                <span
                                                    class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                    Administrador
                                                </span>
                                            @endif
                                            @if ($isSelf)
                                                <span
                                                    class="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                                    Tú
                                                </span>
                                            @endif
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ $user->email }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ $user->roles->first()->name ?? 'Sin Rol' }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        @if ($user->is_active)
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-700 rounded-full">
                                                Activo
                                            </span>
                                        @else
                                            <span
                                                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-red-100 text-red-700 rounded-full">
                                                Inactivo
                                            </span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                        <div class="flex justify-end gap-1">
                                            @if (auth()->user()->hasAnyPermission(['edit_users', 'manage_users']))
                                                @if ($isAdmin)
                                                    <button type="button"
                                                        onclick="showAdminAuthModal('{{ $user->id }}')"
                                                        class="text-primary hover:bg-slate-100 p-1 rounded-full"
                                                        title="Editar">
                                                        <i class="ri-edit-line text-lg"></i>
                                                    </button>
                                                @else
                                                    <a href="{{ route('users.edit', $user->id) }}"
                                                        class="text-primary hover:bg-slate-100 p-1 rounded-full"
                                                        title="Editar">
                                                        <i class="ri-edit-line text-lg"></i>
                                                    </a>
                                                @endif
                                            @endif

                                            @if (auth()->user()->hasAnyPermission(['delete_users', 'manage_users']) &&
                                                    !$isSelf &&
                                                    !$isAdmin)
                                                <form action="{{ route('users.destroy', $user->id) }}" method="POST"
                                                    class="inline delete-form" id="delete-form-{{ $user->id }}">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="button"
                                                        class="text-red-600 hover:bg-red-50 p-1 rounded-full delete-btn"
                                                        title="Eliminar"
                                                        onclick="confirmDelete('{{ $user->name }}', document.getElementById('delete-form-{{ $user->id }}'))">
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
                    @foreach ($users as $user)
                        @php
                            $isAdmin = $user->hasRole('Administrator');
                            $isSelf = $user->id === auth()->id();
                        @endphp
                        <div class="border-b border-gray-200 p-4 hover:bg-gray-50 {{ $isAdmin ? 'bg-gray-50' : '' }}">
                            <!-- Header -->
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex-1">
                                    <div class="flex items-center flex-wrap gap-1">
                                        <h3 class="text-sm font-medium text-gray-900">{{ $user->name }}</h3>
                                        @if ($isAdmin)
                                            <span class="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                Administrador
                                            </span>
                                        @endif
                                        @if ($isSelf)
                                            <span class="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                                Tú
                                            </span>
                                        @endif
                                    </div>
                                    <p class="text-xs text-gray-500 mt-1">{{ $user->email }}</p>
                                </div>
                                <div class="ml-2">
                                    @if ($user->is_active)
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-700 rounded-full">
                                            Activo
                                        </span>
                                    @else
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-red-100 text-red-700 rounded-full">
                                            Inactivo
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <!-- Meta Info -->
                            <div class="text-xs text-gray-500 mb-3">
                                <div class="flex items-center">
                                    <i class="ri-shield-user-line mr-1"></i>
                                    <span>{{ $user->roles->first()->name ?? 'Sin Rol' }}</span>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-wrap justify-end gap-2">
                                @if (auth()->user()->hasAnyPermission(['edit_users', 'manage_users']))
                                    @if ($isAdmin)
                                        <button type="button" onclick="showAdminAuthModal('{{ $user->id }}')"
                                            class="text-primary hover:bg-slate-100 rounded-full px-3 py-1 text-sm flex items-center">
                                            <i class="ri-edit-line mr-1"></i>Editar
                                        </button>
                                    @else
                                        <a href="{{ route('users.edit', $user->id) }}"
                                            class="text-primary hover:bg-slate-100 rounded-full px-3 py-1 text-sm flex items-center">
                                            <i class="ri-edit-line mr-1"></i>Editar
                                        </a>
                                    @endif
                                @endif

                                @if (auth()->user()->hasAnyPermission(['delete_users', 'manage_users']) &&
                                        !$isSelf &&
                                        !$isAdmin)
                                    <form action="{{ route('users.destroy', $user->id) }}" method="POST"
                                        class="inline delete-form" id="delete-form-mobile-{{ $user->id }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="button"
                                            class="text-red-600 hover:bg-red-50 rounded-full px-3 py-1 text-sm flex items-center delete-btn"
                                            onclick="confirmDelete('{{ $user->name }}', document.getElementById('delete-form-mobile-{{ $user->id }}'))">
                                            <i class="ri-delete-bin-line mr-1"></i>Eliminar
                                        </button>
                                    </form>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>

                <!-- Pagination -->
                @if ($users->hasPages())
                    <div class="px-6 py-4 border-t border-gray-200 bg-white">
                        <div class="flex items-center justify-center">
                            {{ $users->appends(request()->except('page'))->links() }}
                        </div>
                    </div>
                @endif
            </div>
        @endif
    </div>

    <!-- Admin authentication modal -->
    <div id="admin-auth-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center">
        <div class="bg-white p-6 max-w-md w-full mx-4 rounded-lg shadow-xl">
            <h3 class="text-lg font-bold mb-4">Autenticación requerida</h3>
            <p class="mb-4 text-gray-700">Para editar un usuario administrador, debes ingresar tu contraseña actual.</p>

            <form id="admin-auth-form" action="{{ route('admin.verify-password') }}" method="POST">
                @csrf
                <input type="hidden" name="redirect_url" id="admin_redirect_url" value="">
                <input type="hidden" name="user_id" id="admin_user_id" value="">

                <div class="mb-4">
                    <label for="admin_password" class="block text-sm font-medium text-gray-700 mb-2">Tu contraseña</label>
                    <div class="relative">
                        <input type="password" id="admin_password" name="admin_password"
                            class="w-full border border-gray-300 px-3 py-2 rounded-full focus:outline-none focus:border-primary pr-10"
                            required>
                        <button type="button" class="absolute inset-y-0 right-0 px-3 py-2 flex items-center"
                            onclick="togglePasswordVisibility()">
                            <i id="password-toggle-icon" class="ri-eye-off-line text-gray-500"></i>
                        </button>
                    </div>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" onclick="closeAdminAuthModal()"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full transition-colors">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-colors">
                        Verificar y continuar
                    </button>
                </div>
            </form>
        </div>
    </div>

@section('scripts')
    <script>
        // Initialize loading indicators and handle form submissions
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

            // Confirm deletion with SweetAlert2
            window.confirmDelete = function(userName, form) {
                Swal.fire({
                    title: '¿Eliminar usuario?',
                    html: `¿Estás seguro de eliminar a <strong>${userName}</strong>?<br>Esta acción no se puede deshacer.`,
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

            // Show admin authentication modal
            window.showAdminAuthModal = function(userId) {
                const modal = document.getElementById('admin-auth-modal');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.getElementById('admin_redirect_url').value = "{{ route('users.edit', ':id') }}"
                    .replace(':id', userId);
                document.getElementById('admin_user_id').value = userId;
                document.getElementById('admin_password').focus();
            };

            // Close admin authentication modal
            window.closeAdminAuthModal = function() {
                const modal = document.getElementById('admin-auth-modal');
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.getElementById('admin_password').value = '';
            };

            // Toggle password visibility
            window.togglePasswordVisibility = function() {
                const passwordField = document.getElementById('admin_password');
                const toggleIcon = document.getElementById('password-toggle-icon');

                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    toggleIcon.classList.remove('ri-eye-off-line');
                    toggleIcon.classList.add('ri-eye-line');
                } else {
                    passwordField.type = 'password';
                    toggleIcon.classList.remove('ri-eye-line');
                    toggleIcon.classList.add('ri-eye-off-line');
                }
            };

            // Close modal when clicking outside
            document.addEventListener('click', function(event) {
                const modal = document.getElementById('admin-auth-modal');
                if (event.target === modal) {
                    closeAdminAuthModal();
                }
            });

            // Setup loading indicator for admin auth form
            const adminAuthForm = document.getElementById('admin-auth-form');
            if (adminAuthForm) {
                adminAuthForm.addEventListener('submit', function() {
                    showLoadingIndicator();
                });
            }
        });
    </script>
@endsection
@endsection
