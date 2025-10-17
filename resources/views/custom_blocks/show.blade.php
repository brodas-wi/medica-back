@extends('layouts.app')

@section('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/theme/dracula.min.css">
    <style>
        .preview-container {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #f9f9f9;
            margin-bottom: 20px;
        }

        .code-container {
            margin-bottom: 20px;
        }

        .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 16px;
            background-color: #282a36;
            border: 1px solid #44475a;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            color: #f8f8f2;
        }

        .code-content {
            background-color: #282a36;
            border: 1px solid #44475a;
            border-top: none;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            overflow: hidden;
        }

        .CodeMirror {
            height: 250px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
        }

        .tab {
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 4px 4px 0 0;
            transition: all 0.3s ease;
        }

        .tab.active {
            background-color: #23366A;
            color: white;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .copy-btn {
            display: flex;
            align-items: center;
            gap: 5px;
            background-color: #44475a;
            color: #f8f8f2;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .copy-btn:hover {
            background-color: #6272a4;
        }
    </style>
@endsection

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-secondary">
                Viendo: {{ $customBlock->name }}
            </h1>
            <div class="flex space-x-2">
                <a href="{{ route('custom-blocks.edit', $customBlock) }}"
                    class="bg-primary hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-edit-line mr-1"></i>Editar
                </a>
                <a href="{{ route('custom-blocks.index') }}"
                    class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-arrow-left-line mr-1"></i>Volver
                </a>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white shadow p-6">
                <h2 class="text-lg font-semibold text-primary mb-4">Información Básica</h2>
                <div class="mb-4">
                    <span class="block text-sm font-medium text-gray-700">Categoría:</span>
                    <span class="block mt-1">{{ $customBlock->category }}</span>
                </div>
                <div class="mb-4">
                    <span class="block text-sm font-medium text-gray-700">Descripción:</span>
                    <span class="block mt-1">{{ $customBlock->description ?: 'Sin descripción' }}</span>
                </div>
                <div class="mb-4">
                    <span class="block text-sm font-medium text-gray-700">Estado:</span>
                    <span
                        class="inline-flex items-center px-2 py-1 rounded text-sm {{ $customBlock->active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                        {{ $customBlock->active ? 'Activo' : 'Inactivo' }}
                    </span>
                </div>
                <div class="mb-4">
                    <span class="block text-sm font-medium text-gray-700">Icono:</span>
                    <div class="flex items-center mt-1">
                        @if ($customBlock->icon_type == 'remix')
                            <i class="ri-{{ $customBlock->icon }} text-2xl mr-2"></i>
                            <span>{{ $customBlock->icon }}</span>
                        @else
                            <img src="{{ $customBlock->icon }}" alt="Icono" class="h-6 w-6 mr-2">
                            <span class="text-xs truncate">{{ $customBlock->icon }}</span>
                        @endif
                    </div>
                </div>
                <div>
                    <span class="block text-sm font-medium text-gray-700">Fecha de creación:</span>
                    <span class="block mt-1">{{ $customBlock->created_at->format('d/m/Y H:i') }}</span>
                </div>
            </div>

            <div class="bg-white shadow p-6 md:col-span-2">
                <h2 class="text-lg font-semibold text-primary mb-4">Vista previa</h2>
                <div class="preview-container">
                    {!! $customBlock->html_content !!}
                </div>

                @if ($customBlock->settings)
                    <div class="mt-4">
                        <h3 class="text-md font-semibold text-gray-700 mb-2">Configuraciones Adicionales:</h3>
                        <div class="bg-gray-50 p-4 rounded border border-gray-200">
                            <pre class="text-xs overflow-auto">{{ json_encode($customBlock->settings, JSON_PRETTY_PRINT) }}</pre>
                        </div>
                    </div>
                @endif
            </div>
        </div>

        <div class="bg-white shadow p-6 mb-6">
            <div class="mb-4">
                <div class="flex space-x-1 border-b border-gray-200">
                    <button type="button" class="tab active py-2 px-4" data-target="html-content">HTML</button>
                    <button type="button" class="tab py-2 px-4" data-target="css-content">CSS</button>
                    <button type="button" class="tab py-2 px-4" data-target="js-content">JavaScript</button>
                    <button type="button" class="tab py-2 px-4" data-target="admin-js-content">Admin JS</button>
                </div>
            </div>

            <div id="code-tabs-content">
                <div id="html-content" class="tab-content active">
                    <div class="code-container">
                        <div class="code-header">
                            <span class="font-medium">Contenido HTML</span>
                            <button class="copy-btn" data-content="{{ htmlspecialchars($customBlock->html_content) }}">
                                <i class="ri-file-copy-line"></i> Copiar
                            </button>
                        </div>
                        <div class="code-content">
                            <textarea id="html-editor">{{ $customBlock->html_content }}</textarea>
                        </div>
                    </div>
                </div>

                <div id="css-content" class="tab-content">
                    <div class="code-container">
                        <div class="code-header">
                            <span class="font-medium">CSS Adicional</span>
                            <button class="copy-btn"
                                data-content="{{ htmlspecialchars($customBlock->css_content ?: '/* Sin CSS adicional */') }}">
                                <i class="ri-file-copy-line"></i> Copiar
                            </button>
                        </div>
                        <div class="code-content">
                            <textarea id="css-editor">{{ $customBlock->css_content ?: '/* Sin CSS adicional */' }}</textarea>
                        </div>
                    </div>
                </div>

                <div id="js-content" class="tab-content">
                    <div class="code-container">
                        <div class="code-header">
                            <span class="font-medium">JavaScript del Bloque</span>
                            <button class="copy-btn"
                                data-content="{{ htmlspecialchars($customBlock->js_content ?: '// Sin JavaScript') }}">
                                <i class="ri-file-copy-line"></i> Copiar
                            </button>
                        </div>
                        <div class="code-content">
                            <textarea id="js-editor">{{ $customBlock->js_content ?: '// Sin JavaScript' }}</textarea>
                        </div>
                    </div>
                </div>

                <div id="admin-js-content" class="tab-content">
                    <div class="code-container">
                        <div class="code-header">
                            <span class="font-medium">JavaScript de Administración</span>
                            <button class="copy-btn"
                                data-content="{{ htmlspecialchars($customBlock->admin_js ?: '// Sin JavaScript de administración') }}">
                                <i class="ri-file-copy-line"></i> Copiar
                            </button>
                        </div>
                        <div class="code-content">
                            <textarea id="admin-js-editor">{{ $customBlock->admin_js ?: '// Sin JavaScript de administración' }}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/mode/xml/xml.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/mode/javascript/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/mode/css/css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/mode/htmlmixed/htmlmixed.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize CodeMirror editors for each tab
            const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
                mode: 'htmlmixed',
                theme: 'dracula',
                lineNumbers: true,
                readOnly: true
            });

            const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
                mode: 'css',
                theme: 'dracula',
                lineNumbers: true,
                readOnly: true
            });

            const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
                mode: 'javascript',
                theme: 'dracula',
                lineNumbers: true,
                readOnly: true
            });

            const adminJsEditor = CodeMirror.fromTextArea(document.getElementById('admin-js-editor'), {
                mode: 'javascript',
                theme: 'dracula',
                lineNumbers: true,
                readOnly: true
            });

            // Tab switching logic
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    // Hide all tab contents
                    document.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.remove('active');
                    });

                    // Remove active class from all tabs
                    document.querySelectorAll('.tab').forEach(t => {
                        t.classList.remove('active');
                    });

                    // Show the selected tab content
                    const target = this.getAttribute('data-target');
                    document.getElementById(target).classList.add('active');
                    this.classList.add('active');

                    // Refresh CodeMirror after tab switch for proper rendering
                    if (target === 'html-content') htmlEditor.refresh();
                    else if (target === 'css-content') cssEditor.refresh();
                    else if (target === 'js-content') jsEditor.refresh();
                    else if (target === 'admin-js-content') adminJsEditor.refresh();
                });
            });

            // Copy button functionality
            document.querySelectorAll('.copy-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const content = this.getAttribute('data-content');

                    navigator.clipboard.writeText(content)
                        .then(() => {
                            // Show success message
                            window.showAlert('Código copiado al portapapeles', 'success', 2000);

                            // Change button text temporarily for visual feedback
                            const originalHTML = this.innerHTML;
                            this.innerHTML = '<i class="ri-check-line"></i> Copiado';

                            setTimeout(() => {
                                this.innerHTML = originalHTML;
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Error al copiar: ', err);
                            window.showAlert('Error al copiar el código', 'error');
                        });
                });
            });

            // Execute block JavaScript if exists
            try {
                const jsContent = {!! json_encode($customBlock->js_content) !!};
                if (jsContent && jsContent.trim() !== '') {
                    eval(jsContent);
                }
            } catch (error) {
                console.error('Error executing block JavaScript:', error);
            }

            // Refresh all editors to ensure proper initial render
            setTimeout(() => {
                htmlEditor.refresh();
                cssEditor.refresh();
                jsEditor.refresh();
                adminJsEditor.refresh();
            }, 100);
        });
    </script>
@endsection
