@extends('layouts.app')

@section('styles')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.2/lib/codemirror.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.2/theme/dracula.css">
    <style>
        .CodeMirror {
            height: 350px;
            border: 1px solid #333;
            border-radius: 0.75rem;
        }

        .remix-icons-container {
            max-height: 250px;
            overflow-y: auto;
        }

        .icon-item {
            cursor: pointer;
            padding: 6px;
            border-radius: 0.5rem;
        }

        .icon-item:hover {
            background-color: #f3f4f6;
        }

        .icon-item.selected {
            background-color: #dcfce7;
            border: 1px solid #10b981;
        }

        .tab {
            padding: 8px 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 0.5rem 0.5rem 0 0;
        }

        .tab.active {
            background-color: #23366A;
            color: white;
        }

        .tab-content {
            display: none;
            padding: 12px;
            background-color: #1e1e1e;
            border: 1px solid #333;
            border-radius: 0 0 0.75rem 0.75rem;
        }

        .tab-content.active {
            display: block;
        }

        /* Format button style */
        .format-btn {
            position: absolute;
            right: 15px;
            top: 8px;
            z-index: 10;
            background-color: #23366A;
            color: white;
            border: none;
            padding: 4px 8px;
            cursor: pointer;
            border-radius: 1rem;
            transition: all 0.2s;
        }

        .format-btn:hover {
            background-color: #0d2847;
        }

        .form-group {
            margin-bottom: 16px;
        }

        .editor-container {
            position: relative;
            margin-bottom: 8px;
        }

        /* Toggle switch style */
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 46px;
            height: 24px;
        }

        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
        }

        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked+.toggle-slider {
            background-color: #23366A;
        }

        input:focus+.toggle-slider {
            box-shadow: 0 0 1px #23366A;
        }

        input:checked+.toggle-slider:before {
            transform: translateX(22px);
        }

        /* Help button and modal */
        .help-btn {
            background-color: #3B82F6;
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            margin-left: 10px;
            border-radius: 9999px;
        }

        .help-btn:hover {
            background-color: #2563EB;
        }

        .help-modal {
            display: none;
            position: fixed;
            z-index: 100;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .help-modal-content {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 90%;
            max-width: 700px;
            border-radius: 1rem;
        }

        .help-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }

        .close-modal {
            color: #aaa;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            line-height: 1;
        }

        .close-modal:hover {
            color: black;
        }

        .help-section {
            margin-bottom: 16px;
        }

        .help-section h3 {
            font-size: 16px;
            margin-bottom: 8px;
            color: #23366A;
        }
    </style>
@endsection

@section('content')
    <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center">
                <h1 class="text-2xl font-bold text-secondary">
                    Crear Bloque
                </h1>
                <button type="button" id="help-button" class="help-btn">
                    <i class="ri-question-line"></i>
                </button>
            </div>
            <a href="{{ route('custom-blocks.index') }}"
                class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                <i class="ri-arrow-left-line mr-1"></i>Volver a Bloques
            </a>
        </div>

        @if ($errors->any())
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="bg-white shadow rounded-xl">
            <form id="custom-block-form" action="{{ route('custom-blocks.store') }}" method="POST">
                @csrf

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <!-- Left column - Basic info -->
                    <div class="space-y-4">
                        <!-- Block name -->
                        <div class="form-group">
                            <label for="name" class="block text-sm font-bold text-gray-700 mb-2">Nombre del Bloque <span
                                    class="text-red-500">*</span></label>
                            <input type="text" name="name" id="name" value="{{ old('name') }}"
                                class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('name') border-red-500 @enderror"
                                required>
                            @error('name')
                                <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Category -->
                        <div class="form-group">
                            <label for="category" class="block text-sm font-bold text-gray-700 mb-2">Categoría <span
                                    class="text-red-500">*</span></label>
                            <input type="text" name="category" id="category" value="{{ old('category') }}"
                                list="category-list"
                                class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('category') border-red-500 @enderror"
                                required>
                            <datalist id="category-list">
                                @foreach ($categories as $category)
                                    <option value="{{ $category }}">
                                @endforeach
                            </datalist>
                            <p class="text-xs text-gray-500 mt-1">Escribe una nueva o selecciona una existente</p>
                            @error('category')
                                <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Description -->
                        <div class="form-group">
                            <label for="description" class="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
                            <textarea name="description" id="description" rows="3"
                                class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-2xl @error('description') border-red-500 @enderror">{{ old('description') }}</textarea>
                            @error('description')
                                <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Status toggle -->
                        <div class="form-group">
                            <div class="flex items-center">
                                <span class="text-sm font-bold text-gray-700 mr-3">Estado:</span>
                                <label class="toggle-switch">
                                    <input type="checkbox" name="active" {{ old('active', true) ? 'checked' : '' }}>
                                    <span class="toggle-slider"></span>
                                </label>
                                <span class="ml-3 text-sm text-gray-700">
                                    <span id="status-text">{{ old('active', true) ? 'Activo' : 'Inactivo' }}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Right column - Icon selection -->
                    <div class="space-y-4">
                        <!-- Icon type selection -->
                        <div class="form-group">
                            <label class="block text-sm font-bold text-gray-700 mb-2">Tipo de Icono <span
                                    class="text-red-500">*</span></label>
                            <div class="flex space-x-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" name="icon_type" value="remix"
                                        class="icon-type-radio w-4 h-4 text-primary" checked
                                        {{ old('icon_type') == 'remix' ? 'checked' : '' }}>
                                    <span class="ml-2">Remix Icon</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" name="icon_type" value="svg"
                                        class="icon-type-radio w-4 h-4 text-primary"
                                        {{ old('icon_type') == 'svg' ? 'checked' : '' }}>
                                    <span class="ml-2">SVG personalizado</span>
                                </label>
                            </div>
                        </div>

                        <!-- Remix icon selector -->
                        <div id="remix-icon-selector" class="form-group">
                            <div class="mb-2">
                                <input type="text" id="icon-search" placeholder="Buscar iconos..."
                                    class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            </div>
                            <input type="hidden" name="icon" id="selected-icon"
                                value="{{ old('icon', 'layout-masonry-line') }}">
                            <div class="grid grid-cols-5 gap-1 remix-icons-container p-2 border border-gray-200 rounded-xl">
                                <!-- Icons loaded via JavaScript -->
                            </div>
                            <div class="mt-2 flex items-center">
                                <span class="mr-2 text-sm font-medium">Seleccionado:</span>
                                <i id="selected-icon-preview" class="ri-layout-masonry-line text-xl"></i>
                                <span id="selected-icon-name" class="ml-2 text-xs">layout-masonry-line</span>
                            </div>
                        </div>

                        <!-- SVG input -->
                        <div id="svg-input" class="form-group" style="display: none;">
                            <label for="svg-url" class="block text-sm font-bold text-gray-700 mb-2">URL del SVG</label>
                            <input type="text" name="svg-url" id="svg-url" value="{{ old('icon') }}"
                                class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <p class="text-xs text-gray-500 mt-1">Ingresa la URL de un SVG o un Data URI</p>
                        </div>
                    </div>
                </div>

                <!-- JSON Settings -->
                <div class="px-6 pb-4">
                    <label for="settings" class="block text-sm font-bold text-gray-700 mb-2">Configuraciones
                        (JSON)</label>
                    <div class="editor-container">
                        <button type="button" id="format-json-btn" class="format-btn"><i class="ri-code-line"></i>
                            Formatear</button>
                        <textarea id="json-editor" name="settings">{{ old(
'settings',
'{
  "traits": [
    {
      "type": "button",
      "name": "configure",
      "label": "Configurar",
      "text": "Abrir configuración"
    }
  ],
  "attributes": {
    "data-custom-block": "true",
    "data-custom-block-id": "my-block"
  }
}',
                        ) }}</textarea>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Configuraciones adicionales en formato JSON</p>
                </div>

                <!-- Code tabs -->
                <div class="px-6 pb-6">
                    <div class="flex border-b border-gray-200 mb-2">
                        <div class="tab active" data-tab="html">HTML</div>
                        <div class="tab" data-tab="css">CSS</div>
                        <div class="tab" data-tab="js">JavaScript</div>
                        <div class="tab" data-tab="admin-js">Admin JS</div>
                    </div>

                    <!-- HTML tab -->
                    <div class="tab-content active" id="html-tab">
                        <div class="editor-container">
                            <button type="button" id="format-html-btn" class="format-btn"><i class="ri-code-line"></i>
                                Formatear</button>
                            <textarea id="html-editor" name="html_content">{{ old('html_content', '<!-- Estructura HTML del bloque personalizado -->
<!-- Utiliza clases de Tailwind CSS para estilos responsivos -->
<div class="my-custom-block p-6 bg-white shadow-lg rounded-xl">
  <h2 class="text-2xl md:text-3xl font-bold text-primary mb-4">Mi Bloque Personalizado</h2>
  <p class="text-gray-600 leading-relaxed">Contenido del bloque con descripción detallada.</p>
  <button class="mt-4 bg-primary text-white px-6 py-2 rounded-full hover:opacity-90">
    Acción
  </button>
</div>')}}
                            </textarea>
                        </div>
                        <p class="text-xs text-white mt-1">Utiliza Tailwind CSS para estilos</p>
                    </div>

                    <!-- CSS tab -->
                    <div class="tab-content" id="css-tab">
                        <div class="editor-container">
                            <button type="button" id="format-css-btn" class="format-btn"><i class="ri-code-line"></i>
                                Formatear</button>
                            <textarea id="css-editor" name="css_content">{{ old('css_content', '/* Estilos CSS adicionales para el bloque */
/* Solo si necesitas estilos que Tailwind no cubre */

.my-custom-block {
  /* Ejemplo: animación personalizada */
  transition: transform 0.3s ease;
}

.my-custom-block:hover {
  transform: translateY(-2px);
}

/* Ejemplo: estilos para elementos específicos */
.my-custom-block button:active {
  transform: scale(0.95);
}') }}
</textarea>
                        </div>
                        <p class="text-xs text-white mt-1">CSS específico para el bloque (opcional)</p>
                    </div>

                    <!-- JS tab -->
                    <div class="tab-content" id="js-tab">
                        <div class="editor-container">
                            <button type="button" id="format-js-btn" class="format-btn"><i class="ri-code-line"></i>
                                Formatear</button>
                            <textarea id="js-editor" name="js_content">{{ old('js_content', '// JavaScript para funcionalidad pública del bloque
// Este código se ejecuta en la página publicada

document.addEventListener("DOMContentLoaded", function() {
  // Ejemplo: agregar interactividad al bloque
  const customBlocks = document.querySelectorAll(".my-custom-block");

  customBlocks.forEach(block => {
    const button = block.querySelector("button");

    if (button) {
      button.addEventListener("click", function() {
        console.log("Botón clickeado en bloque personalizado");
        // Aquí va tu lógica personalizada
      });
    }
  });
});') }}
</textarea>
                        </div>
                        <p class="text-xs text-white mt-1">Código JavaScript para la funcionalidad pública del bloque</p>
                    </div>

                    <!-- Admin JS tab -->
                    <div class="tab-content" id="admin-js-tab">
                        <div class="editor-container">
                            <button type="button" id="format-admin-js-btn" class="format-btn"><i
                                    class="ri-code-line"></i> Formatear</button>
                            <textarea id="admin-js-editor" name="admin_js">{{ old('admin_js', '// JavaScript para el editor GrapesJS (solo admin)
// Configura traits, eventos y comportamiento en el editor

// Ejemplo: Agregar trait personalizado para configuración
editor.TraitManager.addType("my-custom-trait", {
  createInput: function({ trait }) {
    const el = document.createElement("div");
    el.innerHTML = `
      <button class="gjs-btn-prim">Configurar Bloque</button>
    `;

    const btn = el.querySelector("button");
    btn.addEventListener("click", function() {
      // Abrir modal de configuración
      Swal.fire({
        title: "Configurar Componente",
        html: `
          <input type="text" id="swal-input" class="swal2-input" placeholder="Ingrese valor">
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          // Guardar configuración
          console.log("Configuración guardada");
        }
      });
    });

    return el;
  }
});

// Ejemplo: Escuchar cambios en el componente
model.on("change:attributes", function() {
  console.log("Atributos del componente cambiaron");
});') }}
</textarea>
                        </div>
                        <p class="text-xs text-white mt-1">JavaScript para el panel de administración en GrapesJS (traits,
                            eventos, etc.)</p>
                    </div>
                </div>

                <!-- Submit button -->
                <div class="flex justify-end px-6 pb-6 pt-2 border-t border-gray-200">
                    <button type="submit"
                        class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full flex items-center font-semibold">
                        <i class="ri-save-line mr-2"></i>Guardar Bloque
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Help Modal -->
    <div id="help-modal" class="help-modal">
        <div class="help-modal-content">
            <div class="help-modal-header">
                <h2 class="text-xl font-bold text-secondary">Guía de uso - Bloques Personalizados</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="help-modal-body">
                <div class="help-section">
                    <h3>¿Qué son los bloques personalizados?</h3>
                    <p>Los bloques personalizados son componentes reutilizables que puedes crear para el editor GrapesJS.
                        Estos bloques permiten insertar elementos predefinidos en tus páginas con facilidad.</p>
                </div>

                <div class="help-section">
                    <h3>Información básica del bloque</h3>
                    <p><strong>Nombre:</strong> Identifica el bloque en el panel de GrapesJS.</p>
                    <p><strong>Categoría:</strong> Agrupa los bloques similares en el panel lateral.</p>
                    <p><strong>Descripción:</strong> Proporciona detalles sobre la funcionalidad del bloque.</p>
                    <p><strong>Estado:</strong> Activa o desactiva la disponibilidad del bloque en el editor.</p>
                </div>

                <div class="help-section">
                    <h3>Iconos</h3>
                    <p>Puedes elegir entre iconos de Remix (recomendado) o usar un SVG personalizado para representar tu
                        bloque en el panel.</p>
                </div>

                <div class="help-section">
                    <h3>Códigos del bloque</h3>
                    <p><strong>HTML:</strong> Define la estructura del bloque. Puedes usar clases de Tailwind CSS para
                        estilos.</p>
                    <p><strong>CSS:</strong> Agrega estilos personalizados que no son cubiertos por Tailwind.</p>
                    <p><strong>JavaScript:</strong> Código que se ejecutará en el frontend cuando se use el bloque.</p>
                    <p><strong>Admin JS:</strong> Código para configurar traits, propiedades y comportamientos del bloque en
                        el editor GrapesJS.</p>
                </div>

                <div class="help-section">
                    <h3>Configuraciones (JSON)</h3>
                    <p>Define propiedades adicionales para tu bloque en formato JSON. Estas configuraciones pueden incluir:
                    </p>
                    <ul class="list-disc pl-5 mt-2">
                        <li>Definiciones de traits para el panel de propiedades</li>
                        <li>Opciones de tamaño y comportamiento</li>
                        <li>Valores predeterminados para atributos</li>
                        <li>Configuraciones para comportamiento responsivo</li>
                    </ul>
                </div>

                <div class="help-section">
                    <h3>Consejos útiles</h3>
                    <ul class="list-disc pl-5">
                        <li>Usa el botón "Formatear" para mantener tu código ordenado y legible.</li>
                        <li>Incluye comentarios en tu código para facilitar el mantenimiento.</li>
                        <li>Utiliza traits en el Admin JS para hacer tus bloques más configurables.</li>
                        <li>Aprovecha las clases de Tailwind para estilos responsivos.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.2/lib/codemirror.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.2/mode/htmlmixed/htmlmixed.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.2/mode/css/css.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.2/mode/javascript/javascript.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.2/mode/xml/xml.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-beautify@1.14.7/js/lib/beautify.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-beautify@1.14.7/js/lib/beautify-css.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-beautify@1.14.7/js/lib/beautify-html.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize CodeMirror editors
            const editors = {
                html: CodeMirror.fromTextArea(document.getElementById('html-editor'), {
                    mode: 'htmlmixed',
                    lineNumbers: true,
                    theme: 'dracula',
                    tabSize: 2,
                    lineWrapping: true,
                    extraKeys: {
                        "Ctrl-Space": "autocomplete"
                    }
                }),
                css: CodeMirror.fromTextArea(document.getElementById('css-editor'), {
                    mode: 'css',
                    lineNumbers: true,
                    theme: 'dracula',
                    tabSize: 2,
                    lineWrapping: true
                }),
                js: CodeMirror.fromTextArea(document.getElementById('js-editor'), {
                    mode: 'javascript',
                    lineNumbers: true,
                    theme: 'dracula',
                    tabSize: 2,
                    lineWrapping: true
                }),
                adminJs: CodeMirror.fromTextArea(document.getElementById('admin-js-editor'), {
                    mode: 'javascript',
                    lineNumbers: true,
                    theme: 'dracula',
                    tabSize: 2,
                    lineWrapping: true
                }),
                json: CodeMirror.fromTextArea(document.getElementById('json-editor'), {
                    mode: {
                        name: "javascript",
                        json: true
                    },
                    lineNumbers: true,
                    theme: 'dracula',
                    tabSize: 2,
                    lineWrapping: true
                })
            };

            // Format button handlers
            document.getElementById('format-html-btn').addEventListener('click', function() {
                editors.html.setValue(html_beautify(editors.html.getValue(), {
                    indent_size: 2
                }));
            });

            document.getElementById('format-css-btn').addEventListener('click', function() {
                editors.css.setValue(css_beautify(editors.css.getValue(), {
                    indent_size: 2
                }));
            });

            document.getElementById('format-js-btn').addEventListener('click', function() {
                editors.js.setValue(js_beautify(editors.js.getValue(), {
                    indent_size: 2
                }));
            });

            document.getElementById('format-admin-js-btn').addEventListener('click', function() {
                editors.adminJs.setValue(js_beautify(editors.adminJs.getValue(), {
                    indent_size: 2
                }));
            });

            document.getElementById('format-json-btn').addEventListener('click', function() {
                try {
                    const jsonObj = JSON.parse(editors.json.getValue() || '{}');
                    editors.json.setValue(JSON.stringify(jsonObj, null, 2));
                } catch (e) {
                    showAlert('Error: El formato JSON no es válido - ' + e.message, 'error', 4000);
                }
            });

            // Handle tab switching
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove(
                        'active'));

                    this.classList.add('active');
                    document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');

                    // Refresh active editor
                    const activeTab = this.dataset.tab;
                    if (editors[activeTab === 'admin-js' ? 'adminJs' : activeTab]) {
                        editors[activeTab === 'admin-js' ? 'adminJs' : activeTab].refresh();
                    }
                });
            });

            // Toggle status text
            const statusToggle = document.querySelector('input[name="active"]');
            statusToggle.addEventListener('change', function() {
                document.getElementById('status-text').textContent = this.checked ? 'Activo' : 'Inactivo';
            });

            // Help modal functionality
            const helpModal = document.getElementById('help-modal');
            const helpBtn = document.getElementById('help-button');
            const closeModal = document.querySelector('.close-modal');

            helpBtn.addEventListener('click', () => helpModal.style.display = 'block');
            closeModal.addEventListener('click', () => helpModal.style.display = 'none');
            window.addEventListener('click', (e) => {
                if (e.target === helpModal) helpModal.style.display = 'none';
            });

            // Remix icons array
            const remixIcons = [
                // Layout & Design
                'layout-masonry-line', 'layout-2-line', 'layout-3-line', 'layout-grid-line',
                'layout-column-line', 'layout-row-line', 'layout-bottom-line', 'layout-top-line',
                'layout-right-line', 'layout-left-line', 'layout-grid-fill', 'layout-fill',
                'table-line', 'table-2', 'table-alt-line', 'table-fill',
                'grid-line', 'grid-fill', 'dashboard-line', 'dashboard-fill',
                'artboard-line', 'artboard-2-line', 'crop-line', 'crop-2-line',
                'drag-move-line', 'drag-move-2-line', 'focus-line', 'focus-2-line',
                'focus-3-line', 'shape-line', 'shape-2-line', 'scissors-line',
                'ruler-line', 'ruler-2-line', 'pencil-ruler-line', 'pencil-ruler-2-line',
                'tools-line', 'pen-nib-line', 'brush-line', 'brush-2-line',
                'paint-brush-line', 'paint-line', 'palette-line', 'pantone-line',

                // Media & Images
                'image-line', 'image-2-line', 'image-add-line', 'image-edit-line',
                'gallery-line', 'gallery-upload-line', 'movie-line', 'movie-2-line',
                'film-line', 'clapperboard-line', 'vidicon-line', 'vidicon-2-line',
                'video-line', 'video-add-line', 'video-upload-line', 'slideshow-line',
                'slideshow-2-line', 'slideshow-3-line', 'slideshow-4-line', 'picture-in-picture-line',
                'picture-in-picture-2-line', 'camera-line', 'camera-2-line', 'camera-3-line',
                'polaroid-line', 'polaroid-2-line', 'music-line', 'music-2-line',
                'speaker-line', 'speaker-2-line', 'speaker-3-line', 'volume-up-line',
                'volume-down-line', 'volume-mute-line', 'volume-vibrate-line', 'radio-line',
                'podcast-line', 'mic-line', 'mic-2-line', 'mic-off-line',

                // Document & Files
                'file-line', 'file-2-line', 'file-add-line', 'file-reduce-line',
                'file-search-line', 'file-list-line', 'file-list-2-line', 'file-list-3-line',
                'file-copy-line', 'file-copy-2-line', 'file-transfer-line', 'file-text-line',
                'file-code-line', 'file-chart-line', 'file-pdf-line', 'file-excel-line',
                'file-zip-line', 'file-music-line', 'file-paper-line', 'file-paper-2-line',
                'folder-line', 'folder-2-line', 'folder-add-line', 'folder-reduce-line',
                'folder-open-line', 'folder-shared-line', 'folder-received-line', 'folder-transfer-line',
                'folder-upload-line', 'folder-download-line', 'folders-line', 'archive-line',
                'archive-drawer-line', 'inbox-line', 'inbox-2-line', 'inbox-archive-line',
                'inbox-unarchive-line', 'cloud-line', 'cloud-fill', 'cloud-off-line',

                // UI Elements & Navigation
                'apps-line', 'apps-2-line', 'menu-line', 'menu-2-line',
                'menu-3-line', 'menu-4-line', 'menu-5-line', 'menu-fold-line',
                'menu-unfold-line', 'hamburger-line', 'more-line', 'more-2-line',
                'list-check', 'list-check-2', 'list-ordered', 'list-unordered',
                'checkbox-line', 'checkbox-blank-line', 'checkbox-multiple-line', 'checkbox-blank-circle-line',
                'checkbox-circle-line', 'add-line', 'add-circle-line', 'subtract-line',
                'subtract-circle-line', 'close-line', 'close-circle-line', 'check-line',
                'check-double-line', 'check-circle-line', 'information-line', 'information-fill',
                'error-warning-line', 'error-warning-fill', 'question-line', 'question-fill',
                'alert-line', 'spam-line', 'spam-2-line', 'spam-3-line',
                'bookmark-line', 'bookmark-2-line', 'bookmark-3-line', 'price-tag-line',
                'price-tag-2-line', 'price-tag-3-line', 'attachment-line', 'link-line',
                'link-unlink-line', 'link-m-line', 'external-link-line', 'eye-line',
                'eye-close-line', 'eye-2-line', 'eye-off-line', 'lock-line',
                'lock-unlock-line', 'shield-line', 'shield-check-line', 'shield-cross-line',

                // Business & Finance
                'bank-line', 'bank-card-line', 'bank-card-2-line', 'secure-payment-line',
                'hand-coin-line', 'coin-line', 'coins-line', 'currency-line',
                'money-dollar-circle-line', 'money-euro-circle-line', 'shopping-bag-line',
                'shopping-bag-2-line',
                'shopping-bag-3-line', 'shopping-basket-line', 'shopping-basket-2-line', 'shopping-cart-line',
                'shopping-cart-2-line', 'calculator-line', 'safe-line', 'safe-2-line',
                'coupon-line', 'coupon-2-line', 'coupon-3-line', 'coupon-4-line',
                'coupon-5-line', 'percent-line', 'exchange-line', 'exchange-funds-line',
                'swap-line', 'exchange-box-line', 'scales-line', 'scales-2-line',
                'scales-3-line', 'auction-line', 'ticket-line', 'ticket-2-line',
                'vip-line', 'vip-crown-line', 'vip-crown-2-line', 'wallet-line',
                'wallet-2-line', 'wallet-3-line', 'hand-heart-line', 'hand-card-line',

                // Communication & People
                'user-line', 'user-2-line', 'user-3-line', 'user-4-line',
                'user-5-line', 'user-6-line', 'user-add-line', 'user-follow-line',
                'user-unfollow-line', 'user-settings-line', 'user-shared-line', 'user-location-line',
                'user-search-line', 'admin-line', 'contacts-line', 'team-line',
                'group-line', 'group-2-line', 'service-line', 'customer-service-line',
                'customer-service-2-line', 'chat-1-line', 'chat-2-line', 'chat-3-line',
                'chat-4-line', 'message-line', 'message-2-line', 'message-3-line',
                'chat-smile-line', 'chat-smile-2-line', 'chat-smile-3-line', 'chat-heart-line',
                'chat-settings-line', 'question-answer-line', 'discuss-line', 'feedback-line',
                'mail-line', 'mail-open-line', 'mail-send-line', 'mail-check-line',
                'mail-settings-line', 'mail-star-line', 'mail-volume-line', 'send-plane-line',
                'send-plane-2-line', 'share-line', 'share-circle-line', 'share-forward-line',
                'share-forward-2-line', 'reply-line', 'reply-all-line', 'chat-forward-line',

                // Devices & Hardware
                'computer-line', 'smartphone-line', 'tablet-line', 'device-line',
                'phone-line', 'cellphone-line', 'tv-line', 'tv-2-line',
                'remote-control-line', 'remote-control-2-line', 'mouse-line', 'keyboard-line',
                'keyboard-box-line', 'wireless-charging-line', 'wifi-line', 'wifi-off-line',
                'bluetooth-line', 'bluetooth-connect-line', 'hotspot-line', 'fingerprint-line',
                'fingerprint-2-line', 'scan-line', 'scan-2-line', 'qr-code-line',
                'qr-scan-line', 'qr-scan-2-line', 'barcode-line', 'barcode-box-line',
                'battery-line', 'battery-2-line', 'battery-charge-line', 'battery-low-line',
                'battery-share-line', 'plug-line', 'plug-2-line', 'hard-drive-line',
                'hard-drive-2-line', 'cpu-line', 'database-line', 'database-2-line',
                'server-line', 'server-fill', 'save-line', 'save-2-line',
                'save-3-line', 'sd-card-line', 'sd-card-mini-line', 'sim-card-line',
                'sim-card-2-line', 'dual-sim-1-line', 'dual-sim-2-line', 'wireless-line',

                // Maps & Location
                'map-line', 'map-2-line', 'map-pin-line', 'map-pin-2-line',
                'map-pin-3-line', 'map-pin-4-line', 'map-pin-5-line', 'map-pin-add-line',
                'map-pin-range-line', 'map-pin-time-line', 'map-pin-user-line', 'pin-distance-line',
                'compass-line', 'compass-2-line', 'compass-3-line', 'compass-4-line',
                'navigation-line', 'navigation-fill', 'guide-line', 'guide-fill',
                'road-map-line', 'traffic-light-line', 'direction-line', 'route-line',
                'treasure-map-line', 'passport-line', 'earth-line', 'globe-line',
                'planet-line', 'flight-takeoff-line', 'flight-land-line', 'rocket-line',
                'rocket-2-line', 'space-ship-line', 'taxi-line', 'taxi-wifi-line',
                'car-line', 'car-washing-line', 'bus-line', 'bus-2-line',
                'train-line', 'train-wifi-line', 'subway-line', 'subway-wifi-line',
                'ship-line', 'ship-2-line', 'truck-line', 'motorbike-line',
                'bike-line', 'pedestrian-line', 'footprint-line', 'parking-line',

                // Weather & Time
                'sun-line', 'sun-fill', 'moon-line', 'moon-fill',
                'cloud-line', 'cloudy-line', 'cloudy-2-line', 'cloudy-fill',
                'mist-line', 'mist-fill', 'foggy-line', 'foggy-fill',
                'sun-cloudy-line', 'sun-cloudy-fill', 'sun-foggy-line', 'sun-foggy-fill',
                'moon-cloudy-line', 'moon-cloudy-fill', 'moon-foggy-line', 'moon-foggy-fill',
                'drizzle-line', 'drizzle-fill', 'showers-line', 'showers-fill',
                'heavy-showers-line', 'heavy-showers-fill', 'thunderstorms-line', 'thunderstorms-fill',
                'hail-line', 'hail-fill', 'snow-line', 'snow-fill',
                'temperature-line', 'temperature-hot-line', 'temperature-cold-line', 'celcius-line',
                'fahrenheit-line', 'fire-line', 'windy-line', 'tornado-line',
                'typhoon-line', 'earthquake-line', 'flood-line', 'seedling-line',
                'plant-line', 'sprout-line', 'leaf-line', 'tree-line',
                'umbrella-line', 'rainy-line', 'rainbow-line', 'meteor-line',
                'time-line', 'time-fill', 'timer-line', 'timer-2-line',
                'timer-flash-line', 'alarm-line', 'alarm-warning-line', 'calendar-line',
                'calendar-2-line', 'calendar-event-line', 'calendar-check-line', 'calendar-todo-line',

                // Business & Documents
                'briefcase-line', 'briefcase-2-line', 'briefcase-3-line', 'briefcase-4-line',
                'briefcase-5-line', 'bookmark-line', 'bookmark-2-line', 'bookmark-3-line',
                'graduation-cap-line', 'award-line', 'medal-line', 'medal-2-line',
                'trophy-line', 'gift-line', 'gift-2-line', 'mail-line',
                'mail-open-line', 'mail-send-line', 'mail-unread-line', 'mail-add-line',
                'mail-check-line', 'mail-close-line', 'mail-download-line', 'mail-forbid-line',
                'mail-star-line', 'chat-1-line', 'chat-2-line', 'chat-3-line',
                'chat-4-line', 'article-line', 'newspaper-line', 'clipboard-line',
                'clipboard-fill', 'survey-line', 'draft-line', 'file-paper-line',
                'file-text-line', 'file-edit-line', 'bill-line', 'bell-line',
                'notification-badge-line', 'pin-line', 'lightbulb-line', 'lightbulb-flash-line',
                'stack-line', 'projector-line', 'slideshow-line', 'slideshow-4-line',
                'presentation-line', 'pie-chart-line', 'pie-chart-2-line', 'bar-chart-line',
                'bar-chart-2-line', 'line-chart-line', 'bubble-chart-line', 'donut-chart-line'
            ];

            // Populate icon grid
            const iconContainer = document.querySelector('.remix-icons-container');
            remixIcons.forEach(icon => {
                const div = document.createElement('div');
                div.className = 'icon-item flex flex-col items-center';
                div.dataset.icon = icon;
                div.innerHTML = `
                    <i class="ri-${icon} text-xl"></i>
                    <span class="text-xs mt-1 text-center">${icon.split('-')[0]}</span>
                `;
                div.addEventListener('click', () => selectIcon(icon));
                iconContainer.appendChild(div);
            });

            // Select icon function
            function selectIcon(iconName) {
                document.getElementById('selected-icon').value = iconName;
                document.getElementById('selected-icon-preview').className = `ri-${iconName} text-xl`;
                document.getElementById('selected-icon-name').textContent = iconName;
                document.querySelectorAll('.icon-item').forEach(item => {
                    item.classList.toggle('selected', item.dataset.icon === iconName);
                });
            }

            // Initialize selected icon
            selectIcon(document.getElementById('selected-icon').value);

            // Icon search functionality
            document.getElementById('icon-search').addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                document.querySelectorAll('.icon-item').forEach(item => {
                    item.style.display = item.dataset.icon.includes(searchTerm) ? '' : 'none';
                });
            });

            // Icon type toggle
            document.querySelectorAll('.icon-type-radio').forEach(radio => {
                radio.addEventListener('change', function() {
                    document.getElementById('remix-icon-selector').style.display = this.value ===
                        'remix' ? '' : 'none';
                    document.getElementById('svg-input').style.display = this.value === 'svg' ? '' :
                        'none';
                });
            });

            // Form submission - save editor contents
            document.getElementById('custom-block-form').addEventListener('submit', function(e) {
                // Update icon value if SVG type is selected
                if (document.querySelector('input[name="icon_type"]:checked').value === 'svg') {
                    document.getElementById('selected-icon').value = document.getElementById('svg-url')
                        .value;
                }

                // Save all editor contents to textareas
                Object.values(editors).forEach(editor => editor.save());

                // Show loading indicator
                showLoadingIndicator();
            });

            // Setup loading indicator for form
            setupLoadingIndicator('custom-block-form');
        });
    </script>
@endsection
