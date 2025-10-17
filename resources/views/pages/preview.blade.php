<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Vista previa - {{ $page->title }}</title>

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

        .focus\:ring-primary:focus {
            --tw-ring-color: #23366A !important;
        }

        .from-primary {
            --tw-gradient-from: #23366A !important;
            --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(35, 54, 106, 0)) !important;
        }

        .to-secondary {
            --tw-gradient-to: #0f2d54 !important;
        }

        /* Page CSS */
        @if ($page->css)
            {!! $page->css !!}
        @endif

        /* Navbar CSS */
        @if ($page->navbar && $page->navbar->css)
            {!! $page->navbar->css !!}
        @endif

        /* Footer CSS */
        @if ($page->footer && $page->footer->css)
            {!! $page->footer->css !!}
        @endif

        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            padding-bottom: 80px;
            /* Space for fixed preview bar */
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

        .preview-btn-purple {
            background-color: #9333ea;
            color: white;
        }

        .preview-btn-purple:hover {
            background-color: #7e22ce;
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

    <!-- Header scripts -->
    @php
        $headerScripts = $page->getActiveScripts('header');
    @endphp

    @foreach ($headerScripts as $script)
        <script>
            {!! $script->code !!}
        </script>
    @endforeach
</head>

<body>
    <!-- Body scripts -->
    @php
        $bodyScripts = $page->getActiveScripts('body');
    @endphp

    @foreach ($bodyScripts as $script)
        <script>
            {!! $script->code !!}
        </script>
    @endforeach

    <!-- Navbar content -->
    @if ($page->navbar && $page->navbar->content)
        <div class="navbar-container m-20 md:mt-36">
            {!! $page->navbar->content !!}
        </div>
    @endif

    <!-- Page content -->
    @if ($page->content)
        <div class="page-container">
            {!! $page->content !!}
        </div>
    @endif

    <!-- Footer content -->
    @if ($page->footer && $page->footer->content)
        <div class="footer-container">
            {!! $page->footer->content !!}
        </div>
    @endif

    <!-- Preview info bar -->
    <div class="preview-info">
        <div class="preview-info-content">
            <div class="preview-info-text">
                <span><strong>Vista previa:</strong> {{ $page->title }}</span>

                @if ($page->status == 'published')
                    <span class="preview-info-badge" style="background-color: #10b981;">
                        <i class="ri-checkbox-circle-fill"></i> Publicado
                    </span>
                @elseif($page->status == 'draft')
                    <span class="preview-info-badge" style="background-color: #f59e0b;">
                        <i class="ri-draft-line"></i> Borrador
                    </span>
                @else
                    <span class="preview-info-badge" style="background-color: #6b7280;">
                        <i class="ri-archive-line"></i> Archivado
                    </span>
                @endif

                @php
                    $activeScriptsCount = \App\Models\Script::where('is_active', true)->count();
                @endphp

                @if ($activeScriptsCount > 0)
                    <span class="preview-info-badge" style="background-color: #3b82f6;"
                        title="Scripts activos incluidos">
                        <i class="ri-code-line"></i> {{ $activeScriptsCount }} script(s) activo(s)
                    </span>
                @endif

                @if ($page->navbar)
                    <span class="preview-info-badge" style="background-color: #8b5cf6;">
                        <i class="ri-layout-top-line"></i> {{ $page->navbar->name }}
                    </span>
                @endif

                @if ($page->footer)
                    <span class="preview-info-badge" style="background-color: #06b6d4;">
                        <i class="ri-layout-bottom-line"></i> {{ $page->footer->name }}
                    </span>
                @endif
            </div>

            <div class="preview-info-actions">
                <a href="{{ route('editor.edit', $page->id) }}" class="preview-btn preview-btn-primary">
                    <i class="ri-edit-line"></i> Editar
                </a>
                <a href="{{ route('pages.settings', $page->id) }}" class="preview-btn preview-btn-purple">
                    <i class="ri-settings-3-line"></i> Configurar
                </a>
                <a href="{{ route('pages.index') }}" class="preview-btn preview-btn-secondary">
                    <i class="ri-arrow-left-line"></i> Volver
                </a>
            </div>
        </div>
    </div>

    <!-- Page JavaScript -->
    @if ($page->js)
        <script>
            {!! $page->js !!}
        </script>
    @endif

    <!-- Navbar JavaScript -->
    @if ($page->navbar && $page->navbar->js)
        <script>
            {!! $page->navbar->js !!}
        </script>
    @endif

    <!-- Footer JavaScript -->
    @if ($page->footer && $page->footer->js)
        <script>
            {!! $page->footer->js !!}
        </script>
    @endif

    <!-- Footer scripts -->
    @php
        $footerScripts = $page->getActiveScripts('footer');
    @endphp

    @foreach ($footerScripts as $script)
        <script>
            {!! $script->code !!}
        </script>
    @endforeach

    <!-- PDF Script init -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const pdfViewers = document.querySelectorAll('[data-gjs-type="pdf-viewer"]');

            pdfViewers.forEach(function(viewer) {
                const pdfSrc = viewer.getAttribute('data-pdf-src');
                const pdfName = viewer.getAttribute('data-pdf-name') || 'Documento PDF';

                if (pdfSrc) {
                    let titleSpan = viewer.querySelector('.pdf-title');
                    if (titleSpan) {
                        titleSpan.textContent = pdfName;
                    }

                    let placeholder = viewer.querySelector('.pdf-placeholder');
                    if (placeholder) {
                        placeholder.classList.add('hidden');
                    }

                    let pdfObject = viewer.querySelector('.pdf-object');
                    if (!pdfObject) {
                        pdfObject = document.createElement('object');
                        pdfObject.setAttribute('data', pdfSrc);
                        pdfObject.setAttribute('type', 'application/pdf');
                        pdfObject.setAttribute('width', '100%');
                        pdfObject.setAttribute('height', '500');
                        pdfObject.classList.add('pdf-object');
                        pdfObject.style.minHeight = '500px';

                        pdfObject.innerHTML = `
                        <div class="p-6 bg-gray-100 text-center">
                            <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                            <a href="${pdfSrc}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                        </div>
                    `;

                        if (placeholder) {
                            placeholder.parentNode.insertBefore(pdfObject, placeholder.nextSibling);
                        } else {
                            viewer.appendChild(pdfObject);
                        }
                    } else {
                        pdfObject.setAttribute('data', pdfSrc);
                    }
                }
            });
        });
    </script>
</body>

</html>
