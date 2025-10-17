<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Sistema CMS') }} - Editor de Navbar</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Remix Icons -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">

    <!-- Styles con Vite -->
    @vite(['resources/css/app.css', 'resources/css/editor.css'])

    <!-- Toastify CSS -->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
</head>

<body class="font-sans antialiased bg-gray-100">
    <!-- Editor Navbar -->
    <nav class="bg-secondary text-white shadow py-3 px-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center">
                <a href="{{ route('navbars.index') }}"
                    class="flex items-center mr-4 bg-white text-secondary px-4 py-2 rounded-full hover:bg-gray-100 transition">
                    <i class="ri-arrow-left-line mr-1"></i>
                    <span>Volver</span>
                </a>
                <h1 class="text-xl font-semibold editor-title">
                    @if (isset($navbar))
                        Editando: {{ $navbar->name }}
                    @else
                        Nuevo Navbar
                    @endif
                </h1>
            </div>
            <div class="flex items-center space-x-4">
                <button id="save-button"
                    class="!rounded-full bg-primary hover:bg-primary/90 transition px-4 py-2 flex items-center">
                    <i class="ri-save-line mr-1"></i>
                    <span>Guardar</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Editor Container -->
    <div id="gjs" class="h-screen"></div>

    <!-- Hidden fields for editor data -->
    <input type="hidden" id="page-id" value="{{ $navbar->id ?? '' }}">
    <input type="hidden" id="page-load-url" value="{{ isset($navbar) ? route('api.navbars.load', $navbar->id) : '' }}">
    <input type="hidden" id="page-store-url" value="{{ route('api.navbars.store') }}">
    <input type="hidden" id="asset-upload-url" value="{{ route('api.assets.upload') }}">

    <!-- Scripts con Vite -->
    @vite(['resources/js/app.js', 'resources/js/navbar-editor.js'])

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Toastify JS -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
</body>

</html>
