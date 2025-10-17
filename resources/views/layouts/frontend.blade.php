<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'CMS') }} - @yield('title', 'Noticias')</title>

    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Remix Icons -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">

    <!-- Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Open Graph Meta Tags -->
    @yield('meta')

    <!-- Additional Styles -->
    @yield('styles')
</head>

<body class="bg-gray-50 font-sans antialiased">
    <div id="app">
        <!-- Header/Navigation -->
        <header class="bg-white shadow-sm">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <a href="{{ url('/') }}" class="text-xl font-bold text-primary">
                            {{ config('app.name', 'CMS') }}
                        </a>
                    </div>

                    <div class="flex items-center">
                        <button id="mobile-menu-button" class="md:hidden text-gray-500 hover:text-primary focus:outline-none">
                            <i class="ri-menu-line text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="md:hidden hidden bg-white border-t border-gray-200">
                <div class="container mx-auto px-4 py-3 space-y-2">
                    <a href="{{ url('/') }}" class="block py-2 text-gray-700 hover:text-primary transition-colors">Inicio</a>
                    <a href="{{ route('news.index') }}" class="block py-2 text-gray-700 hover:text-primary transition-colors">Noticias</a>
                    <!-- Añade más enlaces de navegación según sea necesario -->
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main>
            @yield('content')
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-10 mt-12">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Acerca de</h3>
                        <p class="text-gray-300">
                            Ofrecemos servicios financieros de alta calidad, comprometidos con la excelencia y la satisfacción de nuestros clientes.
                        </p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold mb-4">Enlaces rápidos</h3>
                        <ul class="space-y-2">
                            <li><a href="{{ url('/') }}" class="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="{{ route('news.index') }}" class="text-gray-300 hover:text-white transition-colors">Noticias</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Servicios</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold mb-4">Servicios</h3>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Cuentas bancarias</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Préstamos</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Inversiones</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Seguros</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold mb-4">Contacto</h3>
                        <ul class="space-y-2 text-gray-300">
                            <li class="flex items-center"><i class="ri-map-pin-line mr-2"></i> Calle Principal 123, Ciudad</li>
                            <li class="flex items-center"><i class="ri-phone-line mr-2"></i> +123 456 7890</li>
                            <li class="flex items-center"><i class="ri-mail-line mr-2"></i> info@tuempresa.com</li>
                        </ul>

                        <div class="flex space-x-4 mt-4">
                            <a href="#" class="text-gray-300 hover:text-white transition-colors">
                                <i class="ri-facebook-fill text-xl"></i>
                            </a>
                            <a href="#" class="text-gray-300 hover:text-white transition-colors">
                                <i class="ri-twitter-fill text-xl"></i>
                            </a>
                            <a href="#" class="text-gray-300 hover:text-white transition-colors">
                                <i class="ri-linkedin-fill text-xl"></i>
                            </a>
                            <a href="#" class="text-gray-300 hover:text-white transition-colors">
                                <i class="ri-instagram-fill text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; {{ date('Y') }} {{ config('app.name', 'CMS') }}. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    </div>

    <!-- Scripts -->
    <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
    </script>

    @yield('scripts')
</body>

</html>