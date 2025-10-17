@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
                <h1 class="text-2xl font-bold text-secondary">Configuración de Página</h1>
                <p class="text-gray-600 mt-1">{{ $page->title }}</p>
            </div>
            <div class="flex gap-2">
                <button type="button" onclick="showDuplicateModal()"
                    class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-file-copy-line mr-1"></i>Duplicar
                </button>
                <a href="{{ route('editor.edit', $page->id) }}"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-edit-line mr-1"></i>Editar
                </a>
                <a href="{{ route('pages.index') }}"
                    class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-arrow-left-line mr-1"></i>Volver
                </a>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Settings Form -->
            <div class="bg-white shadow p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">
                    <i class="ri-settings-3-line mr-2"></i>Configuración General
                </h2>

                <form action="{{ route('pages.settings.update', $page->id) }}" method="POST" id="settingsForm">
                    @csrf
                    @method('PUT')

                    <!-- Title -->
                    <div class="mb-4">
                        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
                            Título
                        </label>
                        <input type="text" name="title" id="title" value="{{ old('title', $page->title) }}"
                            required
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                        @error('title')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Slug -->
                    <div class="mb-4">
                        <label for="slug" class="block text-gray-700 text-sm font-bold mb-2">
                            URL (Slug)
                        </label>
                        <div class="flex items-center gap-2 mb-2">
                            <input type="text" name="slug" id="slug" value="{{ old('slug', $page->slug) }}"
                                required
                                class="shadow appearance-none border flex-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full"
                                placeholder="Generado automáticamente">
                            <button type="button" id="toggle-slug"
                                class="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full text-sm border">
                                <i class="ri-edit-line"></i>
                            </button>
                        </div>
                        <div class="text-xs text-gray-500 mb-2">
                            <span id="slug-status">Generado automáticamente desde el título</span>
                        </div>
                        @error('slug')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Status -->
                    <div class="mb-4">
                        <label for="status" class="block text-gray-700 text-sm font-bold mb-2">
                            Estado
                        </label>
                        <select name="status" id="status" required
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="draft" {{ old('status', $page->status) == 'draft' ? 'selected' : '' }}>Borrador
                            </option>
                            <option value="published" {{ old('status', $page->status) == 'published' ? 'selected' : '' }}>
                                Publicado</option>
                            <option value="archived" {{ old('status', $page->status) == 'archived' ? 'selected' : '' }}>
                                Archivado</option>
                        </select>
                        @error('status')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Navbar Selection -->
                    <div class="mb-4">
                        <label for="navbar_id" class="block text-gray-700 text-sm font-bold mb-2">
                            Navbar
                        </label>
                        <select name="navbar_id" id="navbar_id"
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="">Sin navbar</option>
                            @foreach ($navbars->where('status', 'published') as $navbar)
                                <option value="{{ $navbar->id }}"
                                    {{ old('navbar_id', $page->navbar_id) == $navbar->id ? 'selected' : '' }}>
                                    {{ $navbar->name }}
                                </option>
                            @endforeach
                            @if ($page->navbar_id && $page->navbar && $page->navbar->status !== 'published')
                                <option value="{{ $page->navbar_id }}" selected>
                                    {{ $page->navbar->name }}
                                    ({{ $page->navbar->status === 'draft' ? 'Borrador' : 'Archivado' }})
                                </option>
                            @endif
                        </select>
                        @error('navbar_id')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Footer Selection -->
                    <div class="mb-6">
                        <label for="footer_id" class="block text-gray-700 text-sm font-bold mb-2">
                            Footer
                        </label>
                        <select name="footer_id" id="footer_id"
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="">Sin footer</option>
                            @foreach ($footers->where('status', 'published') as $footer)
                                <option value="{{ $footer->id }}"
                                    {{ old('footer_id', $page->footer_id) == $footer->id ? 'selected' : '' }}>
                                    {{ $footer->name }}
                                </option>
                            @endforeach
                            @if ($page->footer_id && $page->footer && $page->footer->status !== 'published')
                                <option value="{{ $page->footer_id }}" selected>
                                    {{ $page->footer->name }}
                                    ({{ $page->footer->status === 'draft' ? 'Borrador' : 'Archivado' }})
                                </option>
                            @endif
                        </select>
                        @error('footer_id')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Submit Button -->
                    <button type="submit"
                        class="bg-primary hover:bg-primary/90 text-white rounded-full font-bold py-2 px-4 w-full focus:outline-none">
                        <i class="ri-save-line mr-1"></i>Guardar Configuración
                    </button>
                </form>
            </div>

            <!-- Code Preview -->
            <div class="bg-white shadow p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">
                    <i class="ri-code-line mr-2"></i>Vista de Código
                </h2>

                <!-- Tab Navigation -->
                <div class="border-b border-gray-200 mb-4">
                    <nav class="-mb-px flex space-x-8">
                        <button id="html-tab"
                            class="tab-button active border-b-2 border-primary text-primary py-2 px-1 text-sm font-medium">
                            HTML
                        </button>
                        <button id="css-tab"
                            class="tab-button border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 text-sm font-medium">
                            CSS
                        </button>
                        <button id="js-tab"
                            class="tab-button border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 text-sm font-medium">
                            JavaScript
                        </button>
                    </nav>
                </div>

                <!-- Code Content -->
                <div class="relative">
                    <!-- HTML Tab -->
                    <div id="html-content" class="tab-content">
                        <div class="flex justify-between items-center mb-2">
                            <button onclick="copyToClipboard('html-code')"
                                class="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center copy-btn">
                                <i class="ri-clipboard-line mr-1"></i>Copiar
                            </button>
                        </div>
                        <textarea id="html-code" class="code-editor">{{ $page->content }}</textarea>
                    </div>

                    <!-- CSS Tab -->
                    <div id="css-content" class="tab-content hidden">
                        <div class="flex justify-between items-center mb-2">
                            <button onclick="copyToClipboard('css-code')"
                                class="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center copy-btn">
                                <i class="ri-clipboard-line mr-1"></i>Copiar
                            </button>
                        </div>
                        <textarea id="css-code" class="code-editor">{{ $page->css }}</textarea>
                    </div>

                    <!-- JS Tab -->
                    <div id="js-content" class="tab-content hidden">
                        <div class="flex justify-between items-center mb-2">
                            <button onclick="copyToClipboard('js-code')"
                                class="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center copy-btn">
                                <i class="ri-clipboard-line mr-1"></i>Copiar
                            </button>
                        </div>
                        <textarea id="js-code" class="code-editor">{{ $page->js }}</textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- Page Info -->
        <div class="bg-white shadow p-6 mt-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
                <i class="ri-information-line mr-2"></i>Información de la Página
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <span class="font-medium text-gray-700">Creado por:</span>
                    <p class="text-gray-600">{{ $page->creator->name ?? 'Desconocido' }}</p>
                </div>
                <div>
                    <span class="font-medium text-gray-700">Fecha de creación:</span>
                    <p class="text-gray-600">{{ $page->created_at->format('d/m/Y H:i') }}</p>
                </div>
                <div>
                    <span class="font-medium text-gray-700">Última actualización:</span>
                    <p class="text-gray-600">{{ $page->updated_at->diffForHumans() }}</p>
                </div>
                <div>
                    <span class="font-medium text-gray-700">URL pública:</span>
                    <p class="text-gray-600">
                        <a href="{{ $page->view_url }}" target="_blank" class="text-primary hover:underline">
                            {{ $page->view_url }}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>

@section('scripts')
    <!-- CodeMirror CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/material-darker.min.css">

    <!-- CodeMirror JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/xml/xml.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/css/css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/javascript/javascript.min.js"></script>

    <!-- Beautify JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify-css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify-html.min.js"></script>

    <style>
        /* CodeMirror custom styles */
        .code-editor {
            height: 300px;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
        }

        .CodeMirror {
            height: 300px;
            font-family: 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace;
            font-size: 14px;
        }

        .CodeMirror.cm-s-material-darker {
            background: #212121;
            color: #eeffff;
            border-radius: 4px;
        }

        /* Tab styling */
        .tab-button.active {
            border-bottom-color: #23366A !important;
            color: #23366A !important;
        }

        .tab-content {
            min-height: 350px;
        }

        /* Copy button styling */
        .copy-btn {
            transition: all 0.2s ease;
        }

        .copy-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Focus states */
        input:focus,
        select:focus {
            box-shadow: 0 0 0 3px rgba(18, 60, 105, 0.1);
        }

        /* Form styling */
        .shadow {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        /* Slug input styling */
        input[readonly] {
            background-color: #f9fafb;
            cursor: not-allowed;
        }

        .bg-gray-50 {
            background-color: #f9fafb;
        }

        /* Responsive improvements */
        @media (max-width: 768px) {
            .tab-button {
                font-size: 0.875rem;
                padding: 0.5rem 0.75rem;
            }

            .CodeMirror {
                height: 250px;
                font-size: 12px;
            }
        }
    </style>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
                mode: 'xml',
                theme: 'material-darker',
                lineNumbers: true,
                readOnly: true,
                lineWrapping: true,
                autoCloseTags: true
            });

            const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
                mode: 'css',
                theme: 'material-darker',
                lineNumbers: true,
                readOnly: true,
                lineWrapping: true,
                autoCloseBrackets: true
            });

            const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
                mode: 'javascript',
                theme: 'material-darker',
                lineNumbers: true,
                readOnly: true,
                lineWrapping: true,
                autoCloseBrackets: true
            });

            // Auto-beautify content on load
            setTimeout(() => {
                // Beautify HTML
                const htmlContent = htmlEditor.getValue();
                if (htmlContent.trim()) {
                    const beautifiedHtml = html_beautify(htmlContent, {
                        indent_size: 2,
                        indent_char: ' ',
                        max_preserve_newlines: 2,
                        preserve_newlines: true,
                        wrap_line_length: 120
                    });
                    htmlEditor.setValue(beautifiedHtml);
                }

                // Beautify CSS
                const cssContent = cssEditor.getValue();
                if (cssContent.trim()) {
                    const beautifiedCss = css_beautify(cssContent, {
                        indent_size: 2,
                        indent_char: ' '
                    });
                    cssEditor.setValue(beautifiedCss);
                }

                // Beautify JavaScript
                const jsContent = jsEditor.getValue();
                if (jsContent.trim()) {
                    const beautifiedJs = js_beautify(jsContent, {
                        indent_size: 2,
                        indent_char: ' ',
                        space_in_empty_paren: false
                    });
                    jsEditor.setValue(beautifiedJs);
                }
            }, 100);

            // Tab switching functionality
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetTab = this.id.replace('-tab', '-content');

                    // Remove active class from all tabs
                    tabButtons.forEach(btn => {
                        btn.classList.remove('active', 'border-primary',
                            'text-primary');
                        btn.classList.add('border-transparent', 'text-gray-500');
                    });

                    tabContents.forEach(content => {
                        content.classList.add('hidden');
                    });

                    // Add active class to clicked tab
                    this.classList.add('active', 'border-primary', 'text-primary');
                    this.classList.remove('border-transparent', 'text-gray-500');

                    // Show target content
                    document.getElementById(targetTab).classList.remove('hidden');

                    // Refresh CodeMirror editors when tab changes
                    setTimeout(() => {
                        if (targetTab === 'html-content') htmlEditor.refresh();
                        if (targetTab === 'css-content') cssEditor.refresh();
                        if (targetTab === 'js-content') jsEditor.refresh();
                    }, 100);
                });
            });

            // Copy to clipboard function
            window.copyToClipboard = function(elementId) {
                const element = document.getElementById(elementId);
                const editor = element.nextElementSibling.CodeMirror;
                const text = editor ? editor.getValue() : element.value;

                navigator.clipboard.writeText(text).then(() => {
                    // Show success feedback
                    const button = event.target.closest('button');
                    const originalText = button.innerHTML;
                    button.innerHTML = '<i class="ri-check-line mr-1"></i>Copiado';
                    button.classList.add('bg-green-100', 'text-green-700');

                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.classList.remove('bg-green-100', 'text-green-700');
                    }, 2000);
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                });
            };

            // Show duplicate page modal with dynamic count
            window.showDuplicateModal = function() {
                const currentTitle = '{{ $page->title }}';

                // Get next number for duplicate
                fetch('{{ route('api.pages.duplicate-count', $page->id) }}')
                    .then(response => response.json())
                    .then(data => {
                        const suggestedTitle = `${currentTitle} ${data.count}`;

                        Swal.fire({
                            title: 'Duplicar Página',
                            html: `
                            <div class="text-center">
                                <label class="block text-gray-700 text-sm font-bold mb-2">
                                    Nombre de la nueva página
                                </label>
                                <input type="text" id="duplicate-title" 
                                    class="swal2-input w-full" 
                                    style="height: 38px; margin: 0 auto;"
                                    value="${suggestedTitle}"
                                    placeholder="Ingrese el título">
                                <p class="text-xs text-gray-500 mt-2">
                                    <i class="ri-information-line"></i> 
                                    Se creará como borrador con el mismo contenido
                                </p>
                            </div>
                        `,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Duplicar',
                            cancelButtonText: 'Cancelar',
                            confirmButtonColor: '#23366A',
                            cancelButtonColor: '#dc2626',
                            reverseButtons: true,
                            preConfirm: () => {
                                const title = document.getElementById('duplicate-title').value;
                                if (!title) {
                                    Swal.showValidationMessage('El título es requerido');
                                    return false;
                                }
                                return title;
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                showLoadingIndicator();

                                const form = document.createElement('form');
                                form.method = 'POST';
                                form.action = '{{ route('pages.duplicate', $page->id) }}';

                                const csrfToken = document.createElement('input');
                                csrfToken.type = 'hidden';
                                csrfToken.name = '_token';
                                csrfToken.value = '{{ csrf_token() }}';

                                const titleInput = document.createElement('input');
                                titleInput.type = 'hidden';
                                titleInput.name = 'title';
                                titleInput.value = result.value;

                                form.appendChild(csrfToken);
                                form.appendChild(titleInput);
                                document.body.appendChild(form);
                                form.submit();
                            }
                        });
                    });
            };

            // Slug functionality
            let isSlugManual = {{ $page->id ? 'true' : 'false' }};
            const titleInput = document.getElementById('title');
            const slugInput = document.getElementById('slug');
            const toggleSlugBtn = document.getElementById('toggle-slug');
            const slugStatus = document.getElementById('slug-status');

            // Generate slug from title
            function generateSlug(text) {
                return text
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '') // Remove accents
                    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .replace(/-+/g, '-') // Replace multiple hyphens
                    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
            }

            // Update slug status
            function updateSlugStatus() {
                if (isSlugManual) {
                    slugInput.readOnly = false;
                    slugInput.classList.remove('bg-gray-50');
                    slugStatus.textContent = 'Modo manual - Verifica que sea único';
                    toggleSlugBtn.innerHTML = '<i class="ri-refresh-line"></i>';
                    toggleSlugBtn.title = 'Cambiar a automático';
                } else {
                    slugInput.readOnly = true;
                    slugInput.classList.add('bg-gray-50');
                    slugStatus.textContent = 'Generado automáticamente desde el título';
                    toggleSlugBtn.innerHTML = '<i class="ri-edit-line"></i>';
                    toggleSlugBtn.title = 'Editar manualmente';
                }
            }

            // Initialize slug status
            updateSlugStatus();

            // Auto-generate slug when title changes
            titleInput.addEventListener('input', function() {
                if (!isSlugManual) {
                    slugInput.value = generateSlug(this.value);
                }
            });

            // Toggle slug mode
            toggleSlugBtn.addEventListener('click', function() {
                isSlugManual = !isSlugManual;
                updateSlugStatus();

                if (!isSlugManual) {
                    slugInput.value = generateSlug(titleInput.value);
                }
            });

            // Validate slug format
            slugInput.addEventListener('input', function() {
                if (isSlugManual) {
                    this.value = generateSlug(this.value);
                }
            });

            // Setup loading indicator for form
            setupLoadingIndicator('settingsForm');
        });
    </script>
@endsection
@endsection
