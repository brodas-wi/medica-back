<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'CMS') }}</title>

    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- CKEditor - Rich text editor -->
    <script src="https://cdn.ckeditor.com/ckeditor5/37.0.0/decoupled-document/ckeditor.js"></script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @yield('styles')
</head>

<body class="bg-gray-100">
    <div id="app">
        <nav class="bg-primary text-white shadow-sm">
            <div class="container mx-auto px-4">
                <div class="relative flex items-center justify-between h-16">
                    <!-- Logo Section -->
                    <div class="flex-shrink-0 flex items-center">
                        <a href="{{ route('dashboard') }}">
                            <span class="text-xl font-bold">{{ config('app.name', 'CMS') }}</span>
                        </a>
                    </div>

                    <!-- Mobile Menu Button -->
                    <div class="absolute inset-y-0 right-0 flex items-center md:hidden">
                        <button id="mobile-menu-button" type="button"
                            class="inline-flex items-center justify-center p-2 text-white hover:text-gray-200 hover:bg-secondary/30 focus:outline-none"
                            aria-controls="mobile-menu" aria-expanded="false">
                            <i class="ri-menu-line text-xl"></i>
                        </button>
                    </div>

                    @auth
                        <!-- Desktop Navigation Menu -->
                        <div class="hidden md:flex md:items-center md:ml-6 space-x-1">
                            @php
                                // Calculate permissions for menu visibility
                                $canViewPages = auth()
                                    ->user()
                                    ->hasAnyPermission(['view_pages', 'manage_pages']);
                                $canViewPromotions = auth()
                                    ->user()
                                    ->hasAnyPermission(['view_promotions', 'manage_promotions']);
                                $canViewNews = auth()
                                    ->user()
                                    ->hasAnyPermission(['view_news', 'manage_news']);
                                $canViewNavbars = auth()
                                    ->user()
                                    ->hasAnyPermission(['view_navbars', 'manage_navbars']);
                                $canViewFooters = auth()
                                    ->user()
                                    ->hasAnyPermission(['view_footers', 'manage_footers']);
                                $canViewMedia = auth()->user()->canUploadMedia() || auth()->user()->canReviewMedia();
                                $canViewScripts = auth()
                                    ->user()
                                    ->hasAnyPermission(['view_scripts', 'manage_scripts']);
                                $canViewBlocks = auth()
                                    ->user()
                                    ->hasAnyPermission(['view_blocks', 'manage_blocks']);
                                $canViewUsers = auth()
                                    ->user()
                                    ->hasAnyPermission(['view_users', 'manage_users']);
                                $canViewRoles = auth()
                                    ->user()
                                    ->hasAnyPermission(['view_roles', 'manage_roles']);

                                $showPagesMenu = $canViewPages || $canViewPromotions || $canViewMedia || $canViewNews;
                                $showComponentsMenu =
                                    $canViewNavbars || $canViewFooters || $canViewScripts || $canViewBlocks;
                                $showAdminMenu = $canViewUsers || $canViewRoles;
                            @endphp

                            <!-- Pages Dropdown Menu -->
                            @if ($showPagesMenu)
                                <div class="relative">
                                    <button type="button"
                                        class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 focus:outline-none rounded-full"
                                        onclick="toggleDropdown('contentDropdown')">
                                        <i class="ri-layout-grid-line mr-1"></i>
                                        <span>Contenido</span>
                                        <i class="ri-arrow-down-s-line ml-1"></i>
                                    </button>

                                    <div id="contentDropdown" class="absolute left-0 mt-2 bg-white shadow-md hidden z-10"
                                        style="min-width: 12rem;">
                                        @if ($canViewPages)
                                            <a href="{{ route('pages.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-file-list-line mr-2 text-gray-500"></i>
                                                Páginas
                                            </a>
                                        @endif

                                        @if ($canViewPages)
                                            <a href="{{ route('banners.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-slideshow-line mr-2 text-gray-500"></i>
                                                Banners
                                            </a>
                                        @endif

                                        @if ($canViewPromotions)
                                            <a href="{{ route('promotions.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-megaphone-line mr-2 text-gray-500"></i>
                                                Promociones
                                            </a>
                                        @endif

                                        @if ($canViewNews)
                                            <a href="{{ route('news.dashboard') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-newspaper-line mr-2 text-gray-500"></i>
                                                Noticias
                                                @if (auth()->user()->hasAnyPermission(['review_news', 'manage_news']))
                                                    @php
                                                        $pendingNewsCount = \App\Models\NewsArticle::where(
                                                            'status',
                                                            'pending',
                                                        )->count();
                                                    @endphp
                                                    @if ($pendingNewsCount > 0)
                                                        <span
                                                            class="ml-auto bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">{{ $pendingNewsCount }}</span>
                                                    @endif
                                                @endif
                                            </a>
                                        @endif

                                        @if ($canViewPages)
                                            <a href="{{ route('forms.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-file-list-3-line mr-2 text-gray-500"></i>
                                                Formularios
                                            </a>
                                        @endif

                                        @if ($canViewMedia)
                                            <a href="{{ route('media.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-folder-2-line mr-2 text-gray-500"></i>
                                                Medios
                                                @if (auth()->user()->canReviewMedia())
                                                    @php
                                                        $pendingCount = \App\Models\MediaFile::where(
                                                            'status',
                                                            'pending',
                                                        )->count();
                                                    @endphp
                                                    @if ($pendingCount > 0)
                                                        <span
                                                            class="ml-auto bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">{{ $pendingCount }}</span>
                                                    @endif
                                                @endif
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            @endif

                            <!-- Components Dropdown Menu -->
                            @if ($showComponentsMenu)
                                <div class="relative">
                                    <button type="button"
                                        class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 focus:outline-none rounded-full"
                                        onclick="toggleDropdown('componentsDropdown')">
                                        <i class="ri-code-box-line mr-1"></i>
                                        <span>Componentes</span>
                                        <i class="ri-arrow-down-s-line ml-1"></i>
                                    </button>

                                    <div id="componentsDropdown" class="absolute left-0 mt-2 bg-white shadow-md hidden z-10"
                                        style="min-width: 12rem;">
                                        @if ($canViewNavbars)
                                            <a href="{{ route('navbars.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-layout-top-line mr-2 text-gray-500"></i>
                                                Navegación
                                            </a>
                                        @endif

                                        @if ($canViewFooters)
                                            <a href="{{ route('footers.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-layout-bottom-line mr-2 text-gray-500"></i>
                                                Pie de Página
                                            </a>
                                        @endif

                                        @if ($canViewScripts)
                                            <a href="{{ route('scripts.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-code-line mr-2 text-gray-500"></i>
                                                Scripts
                                            </a>
                                        @endif

                                        @if ($canViewBlocks)
                                            <a href="{{ route('custom-blocks.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-layout-masonry-line mr-2 text-gray-500"></i>
                                                Bloques
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            @endif

                            <!-- Administration Dropdown Menu -->
                            @if ($showAdminMenu)
                                <div class="relative">
                                    <button type="button"
                                        class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 focus:outline-none rounded-full"
                                        onclick="toggleDropdown('usersDropdown')">
                                        <i class="ri-user-settings-line mr-1"></i>
                                        <span>Administrar</span>
                                        <i class="ri-arrow-down-s-line ml-1"></i>
                                    </button>

                                    <div id="usersDropdown" class="absolute left-0 mt-2 bg-white shadow-md hidden z-10"
                                        style="min-width: 12rem;">
                                        @if ($canViewUsers)
                                            <a href="{{ route('users.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-user-line mr-2 text-gray-500"></i>
                                                Usuarios
                                            </a>
                                        @endif

                                        @if ($canViewRoles)
                                            <a href="{{ route('roles.index') }}"
                                                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <i class="ri-shield-user-line mr-2 text-gray-500"></i>
                                                Roles
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            @endif

                            <!-- User Profile Dropdown -->
                            <div class="relative ml-3">
                                <button type="button"
                                    class="flex items-center text-secondary bg-white bg-opacity-30 px-3 py-2 hover:bg-opacity-50 focus:outline-none rounded-full focus:ring focus:ring-white focus:ring-opacity-50"
                                    onclick="toggleDropdown('userDropdown')">
                                    <i class="ri-user-3-line mr-1"></i>
                                    <span>{{ Auth::user()->name }}</span>
                                    <i class="ri-arrow-down-s-line ml-1"></i>
                                </button>

                                <div id="userDropdown" class="absolute right-0 mt-2 bg-white shadow-md hidden z-10"
                                    style="min-width: 12rem;">
                                    <a href="{{ route('profile.edit') }}"
                                        class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        <i class="ri-user-settings-line mr-2 text-gray-500"></i>
                                        Mi Perfil
                                    </a>
                                    <hr class="border-gray-200">
                                    <a href="{{ route('logout') }}"
                                        class="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
                                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                        <i class="ri-logout-box-r-line mr-2"></i>
                                        Cerrar Sesión
                                    </a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                        class="hidden">
                                        @csrf
                                    </form>
                                </div>
                            </div>
                        </div>
                    @endauth
                </div>

                @auth
                    <!-- Mobile Navigation Menu -->
                    <div class="md:hidden hidden" id="mobile-menu">
                        <div class="flex flex-col space-y-1 pt-2 pb-3 border-t border-secondary/20">
                            <!-- Mobile Pages Menu -->
                            @if ($showPagesMenu)
                                <button type="button"
                                    class="flex items-center justify-between text-white hover:bg-secondary/20 px-3 py-2 text-left"
                                    onclick="toggleMobileSubmenu('mobile-pages-submenu', 'mobile-pages-arrow')">
                                    <div class="flex items-center">
                                        <i class="ri-layout-grid-line mr-1"></i>
                                        <span>Contenido</span>
                                    </div>
                                    <i class="ri-arrow-down-s-line" id="mobile-pages-arrow"></i>
                                </button>
                                <div id="mobile-pages-submenu" class="hidden pl-4 border-l border-secondary/20 ml-3">
                                    @if ($canViewPages)
                                        <a href="{{ route('pages.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-file-list-line mr-1"></i>Páginas
                                        </a>
                                    @endif

                                    @if ($canViewPages)
                                        <a href="{{ route('banners.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-slideshow-line mr-1"></i>Banners
                                        </a>
                                    @endif

                                    @if ($canViewPromotions)
                                        <a href="{{ route('promotions.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-megaphone-line mr-1"></i>Promociones
                                        </a>
                                    @endif

                                    @if ($canViewNews)
                                        <a href="{{ route('news.dashboard') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-newspaper-line mr-1"></i>Noticias
                                            @if (auth()->user()->hasAnyPermission(['review_news', 'manage_news']))
                                                @php
                                                    $pendingNewsCount = \App\Models\NewsArticle::where(
                                                        'status',
                                                        'pending',
                                                    )->count();
                                                @endphp
                                                @if ($pendingNewsCount > 0)
                                                    <span
                                                        class="ml-1 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full">{{ $pendingNewsCount }}</span>
                                                @endif
                                            @endif
                                        </a>
                                    @endif

                                    @if ($canViewPages)
                                        <a href="{{ route('forms.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-file-list-3-line mr-1"></i>Formularios
                                        </a>
                                    @endif

                                    @if ($canViewMedia)
                                        <a href="{{ route('media.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-folder-2-line mr-1"></i>Medios
                                            @if (auth()->user()->canReviewMedia())
                                                @php
                                                    $pendingCount = \App\Models\MediaFile::where(
                                                        'status',
                                                        'pending',
                                                    )->count();
                                                @endphp
                                                @if ($pendingCount > 0)
                                                    <span
                                                        class="ml-1 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full">{{ $pendingCount }}</span>
                                                @endif
                                            @endif
                                        </a>
                                    @endif
                                </div>
                            @endif

                            <!-- Mobile Components Menu -->
                            @if ($showComponentsMenu)
                                <button type="button"
                                    class="flex items-center justify-between text-white hover:bg-secondary/20 px-3 py-2 text-left"
                                    onclick="toggleMobileSubmenu('mobile-components-submenu', 'mobile-components-arrow')">
                                    <div class="flex items-center">
                                        <i class="ri-code-box-line mr-1"></i>
                                        <span>Componentes</span>
                                    </div>
                                    <i class="ri-arrow-down-s-line" id="mobile-components-arrow"></i>
                                </button>
                                <div id="mobile-components-submenu" class="hidden pl-4 border-l border-secondary/20 ml-3">
                                    @if ($canViewNavbars)
                                        <a href="{{ route('navbars.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-layout-top-line mr-1"></i>Navegación
                                        </a>
                                    @endif

                                    @if ($canViewFooters)
                                        <a href="{{ route('footers.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-layout-bottom-line mr-1"></i>Pie de Página
                                        </a>
                                    @endif

                                    @if ($canViewScripts)
                                        <a href="{{ route('scripts.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-code-line mr-1"></i>Scripts
                                        </a>
                                    @endif

                                    @if ($canViewBlocks)
                                        <a href="{{ route('custom-blocks.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-layout-masonry-line mr-1"></i>Bloques
                                        </a>
                                    @endif
                                </div>
                            @endif

                            <!-- Mobile Administration Menu -->
                            @if ($showAdminMenu)
                                <button type="button"
                                    class="flex items-center justify-between text-white hover:bg-secondary/20 px-3 py-2 text-left"
                                    onclick="toggleMobileSubmenu('mobile-users-submenu', 'mobile-users-arrow')">
                                    <div class="flex items-center">
                                        <i class="ri-user-settings-line mr-1"></i>
                                        <span>Administrar</span>
                                    </div>
                                    <i class="ri-arrow-down-s-line" id="mobile-users-arrow"></i>
                                </button>
                                <div id="mobile-users-submenu" class="hidden pl-4 border-l border-secondary/20 ml-3">
                                    @if ($canViewUsers)
                                        <a href="{{ route('users.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-user-line mr-1"></i>Usuarios
                                        </a>
                                    @endif

                                    @if ($canViewRoles)
                                        <a href="{{ route('roles.index') }}"
                                            class="flex items-center text-white hover:bg-secondary/20 px-3 py-2 mt-1">
                                            <i class="ri-shield-user-line mr-1"></i>Roles
                                        </a>
                                    @endif
                                </div>
                            @endif

                            <hr class="border-secondary/20">

                            <!-- Mobile Profile Links -->
                            <a href="{{ route('profile.edit') }}" class="text-white hover:bg-secondary/20 px-3 py-2">
                                <i class="ri-user-settings-line mr-1"></i>Mi Perfil
                            </a>

                            <a href="{{ route('logout') }}" class="text-white hover:bg-secondary/20 px-3 py-2"
                                onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                <i class="ri-logout-box-r-line mr-1"></i>Cerrar Sesión
                            </a>
                        </div>
                    </div>
                @endauth
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>

    <!-- Toast notification system -->
    <script>
        // Show toast notification with customizable type and duration
        window.showAlert = function(message, type = 'success', duration = 3000) {
            const backgrounds = {
                success: 'linear-gradient(to right, #00b09b, #96c93d)',
                error: 'linear-gradient(to right, #ff5f6d, #ffc371)',
                warning: 'linear-gradient(to right, #f7b733, #fc4a1a)',
                info: 'linear-gradient(to right, #2193b0, #6dd5ed)'
            };

            Toastify({
                text: message,
                duration: duration,
                gravity: "top",
                position: "right",
                style: {
                    background: backgrounds[type]
                },
                stopOnFocus: true,
                className: `toast-${type}`,
                onClick: function() {}
            }).showToast();
        };

        // Toggle desktop dropdown menus
        function toggleDropdown(id) {
            const dropdown = document.getElementById(id);
            dropdown.classList.toggle('hidden');

            // Close other open dropdowns
            document.querySelectorAll('.absolute.bg-white').forEach(el => {
                if (el.id !== id) el.classList.add('hidden');
            });
        }

        // Toggle mobile navigation menu
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });

        // Toggle mobile submenu with arrow rotation
        function toggleMobileSubmenu(submenuId, arrowId) {
            const submenu = document.getElementById(submenuId);
            const arrow = document.getElementById(arrowId);
            submenu.classList.toggle('hidden');

            if (submenu.classList.contains('hidden')) {
                arrow.classList.remove('transform', 'rotate-180');
            } else {
                arrow.classList.add('transform', 'rotate-180');
            }
        }

        // Close dropdowns when clicking outside
        window.addEventListener('click', function(e) {
            if (!e.target.closest('button') && !e.target.closest('#mobile-menu')) {
                document.querySelectorAll('.absolute.bg-white').forEach(el => {
                    el.classList.add('hidden');
                });
            }
        });
    </script>

    <!-- Flash messages handling -->
    @if (session('success'))
        <div id="flash-success" data-message="{{ session('success') }}" class="hidden"></div>
    @endif

    @if (session('error'))
        <div id="flash-error" data-message="{{ session('error') }}" class="hidden"></div>
    @endif

    @if (session('warning'))
        <div id="flash-warning" data-message="{{ session('warning') }}" class="hidden"></div>
    @endif

    @if (session('info'))
        <div id="flash-info" data-message="{{ session('info') }}" class="hidden"></div>
    @endif

    <!-- Modern Loading Overlay -->
    <div id="loading-overlay" class="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center"
        style="display: none;">
        <div
            class="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-md mx-4 border border-gray-100">
            <!-- Modern Spinner Animation -->
            <div class="relative mb-6">
                <div class="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div
                    class="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin">
                </div>
                <div
                    class="absolute top-2 left-2 w-12 h-12 border-2 border-primary/30 border-b-transparent rounded-full animate-spin animation-delay-150">
                </div>
                <div
                    class="absolute top-4 left-4 w-8 h-8 border-2 border-primary/20 border-l-transparent rounded-full animate-spin animation-delay-300">
                </div>
            </div>

            <!-- Loading Text with Animation -->
            <div class="text-center">
                <h3 class="text-gray-800 text-xl font-semibold mb-2">Procesando...</h3>
                <div class="flex items-center justify-center space-x-1">
                    <span class="text-gray-600">Por favor espere</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Custom CSS for loading animations -->
    <style>
        .animation-delay-150 {
            animation-delay: 150ms;
        }

        .animation-delay-300 {
            animation-delay: 300ms;
        }
    </style>

    <!-- Loading indicator functions -->
    <script>
        // Setup loading indicator for specific form
        function setupLoadingIndicator(formId) {
            const form = document.getElementById(formId);
            const loadingOverlay = document.getElementById('loading-overlay');

            if (form && loadingOverlay) {
                form.addEventListener('submit', function() {
                    loadingOverlay.style.display = 'flex';
                });
            }
        }

        // Show loading indicator manually
        function showLoadingIndicator() {
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) loadingOverlay.style.display = 'flex';
        }

        // Hide loading indicator manually
        function hideLoadingIndicator() {
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) loadingOverlay.style.display = 'none';
        }

        // Expose functions globally
        window.setupLoadingIndicator = setupLoadingIndicator;
        window.showLoadingIndicator = showLoadingIndicator;
        window.hideLoadingIndicator = hideLoadingIndicator;
    </script>

    @yield('scripts')
    @stack('scripts')
</body>

</html>
