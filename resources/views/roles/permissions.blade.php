@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="max-w-4xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-secondary">Permisos para {{ $role->name }}</h1>
                <a href="{{ route('roles.index') }}"
                    class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-arrow-left-line mr-1"></i>Volver a Roles
                </a>
            </div>

            <div class="bg-white shadow p-6">
                <form action="{{ route('roles.permissions.update', $role->id) }}" method="POST" id="permissionsForm">
                    @csrf

                    <div class="mb-6">
                        <h2 class="text-lg font-semibold text-secondary mb-4">Selecciona los permisos para este rol</h2>

                        <div class="flex justify-between items-center mb-4">
                            <div>
                                <span class="text-sm text-gray-600">Total: {{ count($permissions) }} permisos</span>
                                <span class="mx-2 text-gray-400">|</span>
                                <span class="text-sm text-gray-600">Seleccionados: <span
                                        id="selected-count">{{ count($role->permissions) }}</span></span>
                            </div>
                            <div>
                                <button type="button" id="select-all" class="text-blue-600 text-sm hover:underline mr-3">
                                    <i class="ri-checkbox-multiple-line mr-1"></i>Seleccionar todos
                                </button>
                                <button type="button" id="deselect-all" class="text-gray-600 text-sm hover:underline">
                                    <i class="ri-checkbox-multiple-blank-line mr-1"></i>Deseleccionar todos
                                </button>
                            </div>
                        </div>

                        @php
                            // Define permission groups and their icons
                            $permissionGroups = [
                                'dashboard' => [
                                    'title' => 'Panel de Control',
                                    'icon' => 'ri-dashboard-line',
                                    'permissions' => [],
                                ],
                                'users' => [
                                    'title' => 'Usuarios',
                                    'icon' => 'ri-user-line',
                                    'permissions' => [],
                                ],
                                'roles' => [
                                    'title' => 'Roles',
                                    'icon' => 'ri-shield-user-line',
                                    'permissions' => [],
                                ],
                                'pages' => [
                                    'title' => 'Páginas',
                                    'icon' => 'ri-file-list-line',
                                    'permissions' => [],
                                ],
                                'banners' => [
                                    'title' => 'Banners',
                                    'icon' => 'ri-slideshow-line',
                                    'permissions' => [],
                                ],
                                'forms' => [
                                    'title' => 'Formularios',
                                    'icon' => 'ri-file-list-3-line',
                                    'permissions' => [],
                                ],
                                'news_categories' => [
                                    'title' => 'Categorías de Noticias',
                                    'icon' => 'ri-price-tag-3-line',
                                    'permissions' => [],
                                ],
                                'news' => [
                                    'title' => 'Artículos de Noticias',
                                    'icon' => 'ri-newspaper-line',
                                    'permissions' => [],
                                ],
                                'navbars' => [
                                    'title' => 'Navegación',
                                    'icon' => 'ri-layout-top-line',
                                    'permissions' => [],
                                ],
                                'footers' => [
                                    'title' => 'Pies de Página',
                                    'icon' => 'ri-layout-bottom-line',
                                    'permissions' => [],
                                ],
                                'scripts' => [
                                    'title' => 'Scripts',
                                    'icon' => 'ri-code-line',
                                    'permissions' => [],
                                ],
                                'blocks' => [
                                    'title' => 'Bloques',
                                    'icon' => 'ri-layout-masonry-line',
                                    'permissions' => [],
                                ],
                                'media' => [
                                    'title' => 'Medios',
                                    'icon' => 'ri-folder-2-line',
                                    'permissions' => [],
                                ],
                                'otros' => [
                                    'title' => 'Otros Permisos',
                                    'icon' => 'ri-settings-line',
                                    'permissions' => [],
                                ],
                            ];

                            // Group permissions by type using improved grouping logic
                            foreach ($permissions as $permission) {
                                // Extract permission name parts
                                $name = $permission->name;
                                $parts = explode('_', $name);

                                // Special cases handling
                                if (strpos($name, 'view_dashboard') === 0) {
                                    $permissionGroups['dashboard']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle user permissions
                                if (
                                    strpos($name, 'view_users') === 0 ||
                                    strpos($name, 'create_users') === 0 ||
                                    strpos($name, 'edit_users') === 0 ||
                                    strpos($name, 'delete_users') === 0 ||
                                    strpos($name, 'manage_users') === 0
                                ) {
                                    $permissionGroups['users']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle role permissions
                                if (
                                    strpos($name, 'view_roles') === 0 ||
                                    strpos($name, 'create_roles') === 0 ||
                                    strpos($name, 'edit_roles') === 0 ||
                                    strpos($name, 'delete_roles') === 0 ||
                                    strpos($name, 'manage_roles') === 0
                                ) {
                                    $permissionGroups['roles']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle pages permissions
                                if (
                                    strpos($name, 'view_pages') === 0 ||
                                    strpos($name, 'create_pages') === 0 ||
                                    strpos($name, 'edit_pages') === 0 ||
                                    strpos($name, 'delete_pages') === 0 ||
                                    strpos($name, 'publish_pages') === 0 ||
                                    strpos($name, 'manage_pages') === 0
                                ) {
                                    $permissionGroups['pages']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle banners permissions
                                if (
                                    strpos($name, 'view_banners') === 0 ||
                                    strpos($name, 'create_banners') === 0 ||
                                    strpos($name, 'edit_banners') === 0 ||
                                    strpos($name, 'delete_banners') === 0 ||
                                    strpos($name, 'manage_banners') === 0
                                ) {
                                    $permissionGroups['banners']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle forms permissions
                                if (
                                    strpos($name, 'view_forms') === 0 ||
                                    strpos($name, 'create_forms') === 0 ||
                                    strpos($name, 'edit_forms') === 0 ||
                                    strpos($name, 'delete_forms') === 0 ||
                                    strpos($name, 'manage_forms') === 0
                                ) {
                                    $permissionGroups['forms']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle news categories permissions
                                if (strpos($name, '_news_categories') !== false) {
                                    $permissionGroups['news_categories']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle news articles permissions
                                if (
                                    strpos($name, 'view_news') === 0 ||
                                    strpos($name, 'create_news') === 0 ||
                                    strpos($name, 'edit_news') === 0 ||
                                    strpos($name, 'delete_news') === 0 ||
                                    strpos($name, 'edit_all_news') === 0 ||
                                    strpos($name, 'delete_all_news') === 0 ||
                                    strpos($name, 'review_news') === 0 ||
                                    strpos($name, 'auto_approve_news') === 0 ||
                                    strpos($name, 'manage_news') === 0
                                ) {
                                    $permissionGroups['news']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle navbars permissions
                                if (
                                    strpos($name, 'view_navbars') === 0 ||
                                    strpos($name, 'create_navbars') === 0 ||
                                    strpos($name, 'edit_navbars') === 0 ||
                                    strpos($name, 'delete_navbars') === 0 ||
                                    strpos($name, 'publish_navbars') === 0 ||
                                    strpos($name, 'manage_navbars') === 0
                                ) {
                                    $permissionGroups['navbars']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle footers permissions
                                if (
                                    strpos($name, 'view_footers') === 0 ||
                                    strpos($name, 'create_footers') === 0 ||
                                    strpos($name, 'edit_footers') === 0 ||
                                    strpos($name, 'delete_footers') === 0 ||
                                    strpos($name, 'publish_footers') === 0 ||
                                    strpos($name, 'manage_footers') === 0
                                ) {
                                    $permissionGroups['footers']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle scripts permissions
                                if (
                                    strpos($name, 'view_scripts') === 0 ||
                                    strpos($name, 'create_scripts') === 0 ||
                                    strpos($name, 'edit_scripts') === 0 ||
                                    strpos($name, 'delete_scripts') === 0 ||
                                    strpos($name, 'toggle_scripts') === 0 ||
                                    strpos($name, 'manage_scripts') === 0
                                ) {
                                    $permissionGroups['scripts']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle blocks permissions
                                if (
                                    strpos($name, 'view_blocks') === 0 ||
                                    strpos($name, 'create_blocks') === 0 ||
                                    strpos($name, 'edit_blocks') === 0 ||
                                    strpos($name, 'delete_blocks') === 0 ||
                                    strpos($name, 'toggle_blocks') === 0 ||
                                    strpos($name, 'manage_blocks') === 0
                                ) {
                                    $permissionGroups['blocks']['permissions'][] = $permission;
                                    continue;
                                }

                                // Handle media permissions
                                if (
                                    strpos($name, 'view_media') === 0 ||
                                    strpos($name, 'upload_media') === 0 ||
                                    strpos($name, 'auto_approve_media') === 0 ||
                                    strpos($name, 'edit_all_media') === 0 ||
                                    strpos($name, 'delete_all_media') === 0 ||
                                    strpos($name, 'review_media') === 0 ||
                                    strpos($name, 'view_pending_media') === 0 ||
                                    strpos($name, 'manage_media') === 0
                                ) {
                                    $permissionGroups['media']['permissions'][] = $permission;
                                    continue;
                                }

                                // If no match found, add to "otros" group
                                $permissionGroups['otros']['permissions'][] = $permission;
                            }

                            // Remove empty groups
                            foreach ($permissionGroups as $key => $group) {
                                if (empty($group['permissions'])) {
                                    unset($permissionGroups[$key]);
                                }
                            }
                        @endphp

                        <div class="space-y-4">
                            @foreach ($permissionGroups as $groupKey => $group)
                                @if (count($group['permissions']) > 0)
                                    <div class="permission-group border border-gray-200 rounded-lg overflow-hidden">
                                        <div class="accordion-header bg-gray-50 px-4 py-3 cursor-pointer flex items-center justify-between"
                                            data-group="{{ $groupKey }}">
                                            <div class="flex items-center">
                                                <i class="{{ $group['icon'] }} text-lg text-primary mr-2"></i>
                                                <span class="font-medium text-gray-800">{{ $group['title'] }}</span>
                                                <span class="ml-2 text-sm text-gray-600">
                                                    (<span
                                                        class="group-selected-count">0</span>/{{ count($group['permissions']) }})
                                                </span>
                                            </div>
                                            <i class="ri-arrow-down-s-line text-xl text-gray-500 accordion-icon"></i>
                                        </div>

                                        <div class="accordion-content bg-white p-4 hidden">
                                            @php
                                                $hasManagePermission = false;
                                                $managePermission = null;
                                                foreach ($group['permissions'] as $permission) {
                                                    if (strpos($permission->name, 'manage_' . $groupKey) === 0) {
                                                        $hasManagePermission = true;
                                                        $managePermission = $permission;
                                                        break;
                                                    }
                                                }
                                            @endphp

                                            @if ($hasManagePermission)
                                                <div class="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                                    <div class="flex items-start">
                                                        <input type="checkbox" name="permissions[]"
                                                            id="permission-{{ $managePermission->id }}"
                                                            value="{{ $managePermission->id }}"
                                                            class="permission-checkbox manage-permission mt-1 mr-3"
                                                            data-group="{{ $groupKey }}"
                                                            {{ $role->permissions->contains($managePermission->id) ? 'checked' : '' }}>
                                                        <label for="permission-{{ $managePermission->id }}"
                                                            class="text-gray-700 cursor-pointer ml-2">
                                                            <span
                                                                class="font-semibold block text-blue-700">{{ $managePermission->name }}</span>
                                                            <p class="text-sm text-blue-600 mt-1">
                                                                {{ $managePermission->description }}</p>
                                                            <p class="text-xs text-blue-500 mt-2 italic">Este permiso otorga
                                                                acceso completo a todas las funciones de
                                                                {{ strtolower($group['title']) }}.</p>
                                                        </label>
                                                    </div>
                                                </div>
                                            @endif

                                            <div
                                                class="grid grid-cols-1 md:grid-cols-2 gap-3 regular-permissions-container">
                                                @foreach ($group['permissions'] as $permission)
                                                    @if (!$hasManagePermission || $permission->id !== $managePermission->id)
                                                        <div
                                                            class="permission-card border p-3 hover:bg-gray-50 transition cursor-pointer rounded-lg
                                                                    {{ $hasManagePermission ? 'can-be-disabled' : '' }}">
                                                            <div class="flex items-start">
                                                                <input type="checkbox" name="permissions[]"
                                                                    id="permission-{{ $permission->id }}"
                                                                    value="{{ $permission->id }}"
                                                                    class="permission-checkbox regular-permission mt-1 mr-3"
                                                                    data-group="{{ $groupKey }}"
                                                                    {{ $role->permissions->contains($permission->id) ? 'checked' : '' }}
                                                                    {{ $hasManagePermission && $role->permissions->contains($managePermission->id) ? 'disabled' : '' }}>
                                                                <label for="permission-{{ $permission->id }}"
                                                                    class="text-gray-700 cursor-pointer ml-2
                                                                        {{ $hasManagePermission && $role->permissions->contains($managePermission->id) ? 'text-gray-400' : '' }}">
                                                                    <span
                                                                        class="font-semibold block">{{ $permission->name }}</span>
                                                                    <p class="text-sm text-gray-500 mt-1">
                                                                        {{ $permission->description }}</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    @endif
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            @endforeach
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <button type="submit"
                            class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                            <i class="ri-save-line mr-1"></i>Guardar Permisos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Use the loading indicator function
            setupLoadingIndicator('permissionsForm');

            // DOM Elements
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            const permissionCards = document.querySelectorAll('.permission-card');
            const checkboxes = document.querySelectorAll('.permission-checkbox');
            const managePermissions = document.querySelectorAll('.manage-permission');
            const regularPermissions = document.querySelectorAll('.regular-permission');
            const selectedCountElement = document.getElementById('selected-count');
            const selectAllButton = document.getElementById('select-all');
            const deselectAllButton = document.getElementById('deselect-all');
            const groupSelectedCounts = document.querySelectorAll('.group-selected-count');

            // Function to update the general selected count
            function updateSelectedCount() {
                const checkedCount = document.querySelectorAll('.permission-checkbox:not(:disabled):checked')
                    .length;
                selectedCountElement.textContent = checkedCount;
            }

            // Function to update the group selected counts
            function updateGroupCounts() {
                const permissionGroups = {};

                // Initialize counters for each group
                document.querySelectorAll('.accordion-header').forEach(header => {
                    const groupKey = header.dataset.group;
                    permissionGroups[groupKey] = {
                        total: 0,
                        checked: 0,
                        element: header.querySelector('.group-selected-count')
                    };
                });

                // Count checked permissions per group
                document.querySelectorAll('.permission-checkbox').forEach(checkbox => {
                    const groupKey = checkbox.dataset.group;
                    if (permissionGroups[groupKey]) {
                        permissionGroups[groupKey].total++;
                        if (checkbox.checked && !checkbox.disabled) {
                            permissionGroups[groupKey].checked++;
                        }
                    }
                });

                // Update group counters in the UI
                for (const groupKey in permissionGroups) {
                    const group = permissionGroups[groupKey];
                    if (group.element) {
                        group.element.textContent = group.checked;
                    }
                }
            }

            // Manage permissions checkbox change handler
            function handleManagePermissions(manageCheckbox) {
                const groupKey = manageCheckbox.dataset.group;
                const isChecked = manageCheckbox.checked;

                // Get all regular permissions in the same group
                const groupRegularPermissions = document.querySelectorAll(
                    `.regular-permission[data-group="${groupKey}"]`);

                groupRegularPermissions.forEach(permission => {
                    // If manage is checked, disable regular permissions
                    permission.disabled = isChecked;
                    // Also update the visual style
                    const permissionCard = permission.closest('.permission-card');
                    const permissionLabel = permission.nextElementSibling;

                    if (isChecked) {
                        permissionCard.classList.add('opacity-50');
                        permissionLabel.classList.add('text-gray-400');
                    } else {
                        permissionCard.classList.remove('opacity-50');
                        permissionLabel.classList.remove('text-gray-400');
                    }
                });

                updateSelectedCount();
                updateGroupCounts();
            }

            // Configure accordion headers click handler
            accordionHeaders.forEach(header => {
                // Open the first accordion by default
                if (header === accordionHeaders[0]) {
                    const content = header.nextElementSibling;
                    content.classList.remove('hidden');
                    header.querySelector('.accordion-icon').classList.add('transform', 'rotate-180');
                }

                header.addEventListener('click', function() {
                    const content = this.nextElementSibling;
                    const icon = this.querySelector('.accordion-icon');

                    content.classList.toggle('hidden');
                    icon.classList.toggle('rotate-180');
                });
            });

            // Configure permission cards click handler
            permissionCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    // If click was on checkbox or card is disabled, do nothing
                    if (e.target.type === 'checkbox') {
                        return;
                    }

                    const checkbox = this.querySelector('.permission-checkbox');
                    if (checkbox.disabled) return;

                    checkbox.checked = !checkbox.checked;

                    // If it's a manage permission, handle regular permissions
                    if (checkbox.classList.contains('manage-permission')) {
                        handleManagePermissions(checkbox);
                    }

                    // Update counters
                    updateSelectedCount();
                    updateGroupCounts();
                });
            });

            // Handle manage permissions change
            managePermissions.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    handleManagePermissions(this);
                });

                // Initialize state
                if (checkbox.checked) {
                    handleManagePermissions(checkbox);
                }
            });

            // Configure select/deselect all buttons click handler
            selectAllButton.addEventListener('click', function() {
                checkboxes.forEach(checkbox => {
                    if (!checkbox.disabled) {
                        checkbox.checked = true;
                    }
                });

                // Re-process manage permissions that are now checked
                managePermissions.forEach(checkbox => {
                    if (checkbox.checked) {
                        handleManagePermissions(checkbox);
                    }
                });

                updateSelectedCount();
                updateGroupCounts();
            });

            deselectAllButton.addEventListener('click', function() {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.disabled = false;
                });

                // Restore regular permission cards styles
                document.querySelectorAll('.permission-card').forEach(card => {
                    card.classList.remove('opacity-50');
                    const label = card.querySelector('label');
                    if (label) label.classList.remove('text-gray-400');
                });

                updateSelectedCount();
                updateGroupCounts();
            });

            // Update counters when a checkbox is manually changed
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    updateSelectedCount();
                    updateGroupCounts();
                });
            });

            // Initialize counters
            updateSelectedCount();
            updateGroupCounts();
        });
    </script>
@endsection
