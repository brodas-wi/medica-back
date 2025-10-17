@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <h1 class="text-2xl font-bold text-secondary">
                Inicio
            </h1>
            <span class="text-gray-600 flex items-center">
                <i class="ri-user-smile-line mr-1"></i>Bienvenido, {{ Auth::user()->name }}
            </span>
        </div>

        @php
            // Define permissions with descriptions
            $canManagePages = auth()
                ->user()
                ->hasAnyPermission(['create_pages', 'manage_pages']);
            $canManageNews = auth()
                ->user()
                ->hasAnyPermission(['create_news', 'manage_news']);
            $canManageNavbars = auth()
                ->user()
                ->hasAnyPermission(['create_navbars', 'manage_navbars']);
            $canManageFooters = auth()
                ->user()
                ->hasAnyPermission(['create_footers', 'manage_footers']);
            $canManageBlocks = auth()
                ->user()
                ->hasAnyPermission(['create_blocks', 'manage_blocks']);
            $canManageUsers = auth()
                ->user()
                ->hasAnyPermission(['create_users', 'manage_users']);
            $canManageRoles = auth()
                ->user()
                ->hasAnyPermission(['create_roles', 'manage_roles']);
            $canManageMedia = auth()
                ->user()
                ->hasAnyPermission(['upload_media', 'manage_media']);
            $canManageBanners = auth()
                ->user()
                ->hasAnyPermission(['create_banners', 'manage_banners']);
            $canManageForms = auth()
                ->user()
                ->hasAnyPermission(['create_forms', 'manage_forms']);
        @endphp

        <!-- Metrics cards section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            @if (auth()->user()->hasAnyPermission(['view_pages', 'manage_pages']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-file-list-line mr-1"></i>Páginas
                    </h3>
                    <p class="text-3xl font-bold">{{ $pagesCount ?? 0 }}</p>
                    <a href="{{ route('pages.index') }}"
                        class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                        Administrar Páginas
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_banners', 'manage_banners']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-slideshow-line mr-1"></i>Banners
                    </h3>
                    <p class="text-3xl font-bold">{{ $bannersCount ?? 0 }}</p>
                    <a href="{{ route('banners.index') }}"
                        class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                        Administrar Banners
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_forms', 'manage_forms']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-file-list-3-line mr-1"></i>Formularios
                    </h3>
                    <p class="text-3xl font-bold">{{ $formsCount ?? 0 }}</p>
                    <a href="{{ route('forms.index') }}"
                        class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                        Administrar Formularios
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_news', 'manage_news']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-newspaper-line mr-1"></i>Noticias
                    </h3>
                    <p class="text-3xl font-bold">{{ $newsCount ?? 0 }}</p>
                    <div class="flex items-center justify-between">
                        <a href="{{ route('news.dashboard') }}"
                            class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                            Administrar Noticias
                            <i class="ri-arrow-right-line ml-1"></i>
                        </a>
                        @if (auth()->user()->hasAnyPermission(['review_news', 'manage_news']))
                            @if (($pendingNewsCount ?? 0) > 0)
                                <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full mt-2">
                                    {{ $pendingNewsCount }} pendiente(s)
                                </span>
                            @endif
                        @endif
                    </div>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_navbars', 'manage_navbars']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-layout-top-line mr-1"></i>Navbars
                    </h3>
                    <p class="text-3xl font-bold">{{ $navbarsCount ?? 0 }}</p>
                    <a href="{{ route('navbars.index') }}"
                        class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                        Administrar Navbars
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_footers', 'manage_footers']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-layout-bottom-line mr-1"></i>Footers
                    </h3>
                    <p class="text-3xl font-bold">{{ $footersCount ?? 0 }}</p>
                    <a href="{{ route('footers.index') }}"
                        class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                        Administrar Footers
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_blocks', 'manage_blocks']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-layout-masonry-line mr-1"></i>Bloques
                    </h3>
                    <p class="text-3xl font-bold">{{ $customBlocksCount ?? 0 }}</p>
                    <a href="{{ route('custom-blocks.index') }}"
                        class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                        Administrar Bloques
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_media', 'manage_media']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-folder-2-line mr-1"></i>Medios
                    </h3>
                    <p class="text-3xl font-bold">{{ $mediaCount ?? 0 }}</p>
                    <div class="flex items-center justify-between">
                        <a href="{{ route('media.index') }}"
                            class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                            Administrar Medios
                            <i class="ri-arrow-right-line ml-1"></i>
                        </a>
                        @if (auth()->user()->canReviewMedia())
                            @php
                                $pendingCount = \App\Models\MediaFile::where('status', 'pending')->count();
                            @endphp
                            @if ($pendingCount > 0)
                                <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full mt-2">
                                    {{ $pendingCount }} pendiente(s)
                                </span>
                            @endif
                        @endif
                    </div>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_users', 'manage_users']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-user-line mr-1"></i>Usuarios
                    </h3>
                    <p class="text-3xl font-bold">{{ $usersCount ?? 0 }}</p>
                    <a href="{{ route('users.index') }}"
                        class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                        Administrar Usuarios
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_roles', 'manage_roles']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-shield-user-line mr-1"></i>Roles
                    </h3>
                    <p class="text-3xl font-bold">{{ $rolesCount ?? 0 }}</p>
                    <a href="{{ route('roles.index') }}"
                        class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                        Administrar Roles
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            @endif

            @if (auth()->user()->hasAnyPermission(['view_scripts', 'manage_scripts']))
                <div class="bg-white shadow p-4 rounded-sm hover:shadow-md transition-shadow">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        <i class="ri-code-line mr-1"></i>Scripts
                    </h3>
                    <p class="text-3xl font-bold">{{ $scriptsCount ?? 0 }}</p>
                    <a href="{{ route('scripts.index') }}"
                        class="text-primary hover:bg-gray-100 px-3 py-2 mt-2 inline-flex items-center rounded transition-colors rounded-full">
                        Administrar Scripts
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            @endif
        </div>

        @if (
            !auth()->user()->hasAnyPermission([
                    'view_pages',
                    'view_banners',
                    'view_forms',
                    'view_navbars',
                    'view_footers',
                    'view_blocks',
                    'view_users',
                    'view_roles',
                    'view_scripts',
                    'view_media',
                ]))
            <div class="bg-white shadow p-6 text-center">
                <i class="ri-error-warning-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">Acceso Limitado</h3>
                <p class="text-gray-500 mb-4">No tienes permisos para acceder a ningún módulo del sistema. Contacta con un
                    administrador para solicitar permisos.</p>
            </div>
        @endif
    </div>
@endsection
