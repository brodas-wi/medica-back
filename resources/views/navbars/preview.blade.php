<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Vista previa - {{ $navbar->name }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Remix Icons -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">

    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

    <style>
        /* Custom primary and secondary colors */
        .bg-primary {
            background-color: #23366A !important;
        }

        .bg-primary\/90 {
            background-color: rgba(35, 54, 106, 0.9) !important;
        }

        .hover\:bg-primary:hover {
            background-color: #23366A !important;
        }

        .hover\:bg-primary\/90:hover {
            background-color: rgba(35, 54, 106, 0.9) !important;
        }

        .bg-secondary {
            background-color: #333333 !important;
        }

        .text-primary {
            color: #23366A !important;
        }

        .text-secondary {
            color: #333333 !important;
        }

        .hover\:text-primary:hover {
            color: #23366A !important;
        }

        .hover\:text-white:hover {
            color: #ffffff !important;
        }

        .focus\:border-primary:focus {
            border-color: #23366A !important;
        }

        .border-primary {
            border-color: #23366A !important;
        }

        /* Navbar CSS */
        @if ($navbar->css)
            {!! $navbar->css !!}
        @endif

        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            padding-bottom: 80px;
            /* Space for fixed preview bar */
        }

        /* Dummy content styles */
        .dummy-content {
            min-height: 70vh;
            padding: 2rem;
            background-color: #f9fafb;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #6b7280;
        }

        /* Preview info bar styles */
        .preview-info {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to right, #1e293b, #334155);
            color: white;
            padding: 1rem;
            z-index: 9999;
            box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .preview-info-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .preview-info-text {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .preview-info-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .preview-info-actions {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .preview-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s;
        }

        .preview-btn-primary {
            background-color: #3b82f6;
            color: white;
        }

        .preview-btn-primary:hover {
            background-color: #2563eb;
        }

        .preview-btn-secondary {
            background-color: #6b7280;
            color: white;
        }

        .preview-btn-secondary:hover {
            background-color: #4b5563;
        }

        @media (max-width: 768px) {
            .preview-info-content {
                flex-direction: column;
                align-items: stretch;
            }

            .preview-info-text {
                justify-content: center;
            }

            .preview-info-actions {
                justify-content: center;
            }
        }
    </style>
</head>

<body>
    <!-- Navbar content -->
    <div class="navbar-preview">
        {!! $navbar->content !!}
    </div>

    <!-- Dummy content to showcase the navbar -->
    <div class="dummy-content">
        <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Contenido de Ejemplo</h1>
            <p class="text-lg">Este es un contenido de ejemplo para mostrar cómo se vería la barra de navegación en un
                sitio real.</p>
        </div>
    </div>

    <!-- Preview info bar -->
    <div class="preview-info">
        <div class="preview-info-content">
            <div class="preview-info-text">
                <span><strong>Vista previa:</strong> {{ $navbar->name }}</span>

                @if ($navbar->status == 'published')
                    <span class="preview-info-badge" style="background-color: #10b981;">
                        <i class="ri-checkbox-circle-fill"></i> Publicado
                    </span>
                @else
                    <span class="preview-info-badge" style="background-color: #f59e0b;">
                        <i class="ri-draft-line"></i> Borrador
                    </span>
                @endif
            </div>

            <div class="preview-info-actions">
                <a href="{{ route('navbar.editor.edit', $navbar->id) }}" class="preview-btn preview-btn-primary">
                    <i class="ri-edit-line"></i> Editar
                </a>
                <a href="{{ route('navbars.index') }}" class="preview-btn preview-btn-secondary">
                    <i class="ri-arrow-left-line"></i> Volver
                </a>
            </div>
        </div>
    </div>

    <!-- Navbar JavaScript -->
    @if ($navbar->js)
        <script>
            {!! $navbar->js !!}
        </script>
    @endif
</body>

</html>
