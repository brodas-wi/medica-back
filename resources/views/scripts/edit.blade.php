@extends('layouts.app')

@section('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/theme/monokai.min.css" />
@endsection

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-3">
                <h1 class="text-2xl font-bold text-secondary">Editar Script: {{ $script->name }}</h1>
                <button type="button" id="helpBtn"
                    class="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    title="¿Cómo funciona?">
                    <i class="ri-question-line text-lg"></i>
                </button>
            </div>
            <div class="flex gap-2">
                <a href="{{ route('scripts.preview', $script->id) }}" target="_blank"
                    class="bg-blue-600 hover:bg-blue-600/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-eye-line mr-1"></i>Previsualizar
                </a>
                <a href="{{ route('scripts.index') }}"
                    class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-arrow-left-line mr-1"></i>Volver a Scripts
                </a>
            </div>
        </div>

        <div class="bg-white shadow-md overflow-hidden">
            <form action="{{ route('scripts.update', $script->id) }}" method="POST" id="scriptForm">
                @csrf
                @method('PUT')
                <div class="p-6 border-b">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre del Script <span
                                    class="text-red-500">*</span></label>
                            <input type="text" name="name" id="name" value="{{ old('name', $script->name) }}"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('name') border-red-500 @enderror"
                                required>
                            @error('name')
                                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                            @enderror
                        </div>

                        <div>
                            <label for="location" class="block text-gray-700 text-sm font-bold mb-2">Ubicación <span
                                    class="text-red-500">*</span></label>
                            <select name="location" id="location"
                                class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('location') border-red-500 @enderror">
                                <option value="header"
                                    {{ old('location', $script->location) == 'header' ? 'selected' : '' }}>Header (head)
                                </option>
                                <option value="body" {{ old('location', $script->location) == 'body' ? 'selected' : '' }}>
                                    Body (inicio)
                                </option>
                                <option value="footer"
                                    {{ old('location', $script->location) == 'footer' ? 'selected' : '' }}>Footer (final)
                                </option>
                            </select>
                            @error('location')
                                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label for="priority" class="block text-gray-700 text-sm font-bold mb-2">Prioridad</label>
                            <input type="number" name="priority" id="priority"
                                value="{{ old('priority', $script->priority) }}"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('priority') border-red-500 @enderror"
                                min="1">
                            <p class="text-gray-500 text-xs mt-1">Los valores más bajos se cargan primero.</p>
                            @error('priority')
                                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="flex items-center">
                            <div class="mt-6">
                                <label class="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="is_active" class="form-checkbox h-5 w-5 text-primary"
                                        {{ old('is_active', $script->is_active) ? 'checked' : '' }}>
                                    <span class="ml-2 text-gray-700">Script activo</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Alcance del Script <span
                                class="text-red-500">*</span></label>
                        <div class="space-y-3">
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="scope" value="global" class="form-radio h-5 w-5 text-primary"
                                    {{ old('scope', $script->scope) == 'global' ? 'checked' : '' }}
                                    onchange="togglePageSelection()">
                                <span class="ml-2 text-gray-700">Global - Se ejecuta en todas las páginas</span>
                            </label>
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="scope" value="specific"
                                    class="form-radio h-5 w-5 text-primary"
                                    {{ old('scope', $script->scope) == 'specific' ? 'checked' : '' }}
                                    onchange="togglePageSelection()">
                                <span class="ml-2 text-gray-700">Específico - Se ejecuta solo en páginas
                                    seleccionadas</span>
                            </label>
                        </div>
                        @error('scope')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div id="pageSelectionContainer"
                        class="mb-6 {{ old('scope', $script->scope) == 'specific' ? '' : 'hidden' }}">
                        <label for="page_ids" class="block text-gray-700 text-sm font-bold mb-2">Seleccionar Páginas <span
                                class="text-red-500">*</span></label>
                        <select name="page_ids[]" id="page_ids" multiple
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-lg @error('page_ids') border-red-500 @enderror"
                            size="8">
                            @foreach ($pages as $page)
                                <option value="{{ $page->id }}"
                                    {{ is_array(old('page_ids', $script->page_ids)) && in_array($page->id, old('page_ids', $script->page_ids ?? [])) ? 'selected' : '' }}>
                                    {{ $page->title }}
                                    @if ($page->status == 'published')
                                        <span class="text-green-600">(Publicado)</span>
                                    @elseif($page->status == 'draft')
                                        <span class="text-yellow-600">(Borrador)</span>
                                    @else
                                        <span class="text-gray-600">(Archivado)</span>
                                    @endif
                                </option>
                            @endforeach
                        </select>
                        <p class="text-gray-500 text-xs mt-1">Mantén presionado Ctrl (Cmd en Mac) para seleccionar múltiples
                            páginas</p>
                        @error('page_ids')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-6">
                        <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                        <textarea name="description" id="description" rows="3"
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-2xl @error('description') border-red-500 @enderror">{{ old('description', $script->description) }}</textarea>
                        @error('description')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="code" class="block text-gray-700 text-sm font-bold mb-2">Código del Script <span
                                class="text-red-500">*</span></label>
                        <div class="relative">
                            <div class="absolute top-2 right-2 z-10">
                                <button type="button" id="formatCodeBtn"
                                    class="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 shadow-md transition">
                                    <i class="ri-code-s-slash-line"></i>
                                    <span>Formatear</span>
                                </button>
                            </div>
                            <div class="border mb-2 @error('code') border-red-500 @enderror">
                                <textarea name="code" id="codeEditor" class="hidden">{{ old('code', $script->code) }}</textarea>
                            </div>
                        </div>
                        @error('code')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                        <p class="text-gray-500 text-xs">
                            Introduce el código JavaScript o HTML a ejecutar. No necesitas incluir las etiquetas
                            &lt;script&gt;.
                        </p>
                    </div>
                </div>

                <div class="p-6 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="flex flex-col text-sm text-gray-500 gap-1">
                        <span><i class="ri-time-line mr-1"></i>Actualizado:
                            {{ $script->updated_at->diffForHumans() }}</span>
                        <span><i class="ri-user-line mr-1"></i>Autor: {{ $script->creator->name ?? 'Desconocido' }}</span>
                    </div>
                    <div class="flex gap-2">
                        <button type="button" id="testScriptBtn"
                            class="bg-blue-600 hover:bg-blue-600/90 text-white px-4 py-2 flex items-center rounded-full">
                            <i class="ri-code-box-line mr-1"></i>Probar Script
                        </button>
                        <button type="submit" id="saveScriptBtn"
                            class="bg-primary hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                            <i class="ri-save-line mr-1"></i>Guardar Cambios
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div id="helpModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">

                <div class="bg-blue-500 text-white p-4 rounded-t-lg flex-shrink-0">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <i class="ri-lightbulb-line text-2xl"></i>
                            <h3 class="text-xl font-bold">Guía: Editar Script</h3>
                        </div>
                        <button id="closeHelpBtn" class="text-white hover:text-gray-200 transition">
                            <i class="ri-close-line text-2xl"></i>
                        </button>
                    </div>
                </div>

                <div class="p-6 space-y-6 overflow-y-auto flex-1">

                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <p class="text-gray-700">
                            Estás editando un script existente. Puedes modificar cualquier campo y probar los cambios antes
                            de guardarlos.
                            Los scripts permiten agregar código JavaScript o HTML personalizado a tu sitio web.
                        </p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-lg font-bold text-gray-800 border-b pb-2">Campos del Formulario</h4>

                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="flex items-start gap-3">
                                <div
                                    class="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                    1</div>
                                <div class="flex-1">
                                    <h5 class="font-bold text-gray-800 mb-1">Nombre del Script</h5>
                                    <p class="text-sm text-gray-600 mb-2">Identifica tu script con un nombre descriptivo.
                                    </p>
                                    <div class="bg-white p-2 rounded border text-sm">
                                        <strong>Ejemplo:</strong> "Google Analytics", "Botón WhatsApp", "Pixel de Facebook"
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="flex items-start gap-3">
                                <div
                                    class="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                    2</div>
                                <div class="flex-1">
                                    <h5 class="font-bold text-gray-800 mb-1">Ubicación</h5>
                                    <p class="text-sm text-gray-600 mb-2">Dónde se insertará el script en tu página:</p>
                                    <div class="space-y-2">
                                        <div class="bg-white p-3 rounded border">
                                            <strong class="text-blue-600">Header (head):</strong>
                                            <span class="text-sm text-gray-600">Para scripts críticos que deben cargarse
                                                primero (Analytics, fuentes, meta tags)</span>
                                        </div>
                                        <div class="bg-white p-3 rounded border">
                                            <strong class="text-green-600">Body (inicio):</strong>
                                            <span class="text-sm text-gray-600">Cuando el script necesita acceso temprano
                                                al DOM pero no es crítico</span>
                                        </div>
                                        <div class="bg-white p-3 rounded border">
                                            <strong class="text-purple-600">Footer (final):</strong>
                                            <span class="text-sm text-gray-600">Para scripts que pueden esperar (botones
                                                flotantes, widgets, chat)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="flex items-start gap-3">
                                <div
                                    class="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                    3</div>
                                <div class="flex-1">
                                    <h5 class="font-bold text-gray-800 mb-1">Prioridad</h5>
                                    <p class="text-sm text-gray-600 mb-2">Orden de carga: números más bajos se cargan
                                        primero.</p>
                                    <div class="bg-white p-3 rounded border text-sm space-y-1">
                                        <div><strong>1-5:</strong> Scripts críticos (Analytics, configuración inicial)</div>
                                        <div><strong>10:</strong> Scripts normales (por defecto)</div>
                                        <div><strong>20+:</strong> Scripts de baja prioridad (widgets opcionales)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="flex items-start gap-3">
                                <div
                                    class="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                    4</div>
                                <div class="flex-1">
                                    <h5 class="font-bold text-gray-800 mb-1">Código del Script</h5>
                                    <p class="text-sm text-gray-600 mb-2">El código JavaScript o HTML. NO incluyas las
                                        etiquetas &lt;script&gt;&lt;/script&gt;</p>
                                    <div class="bg-white p-3 rounded border text-xs font-mono">
                                        console.log('Hola mundo');<br>
                                        &lt;div id="mi-widget"&gt;&lt;/div&gt;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <h5 class="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                            <i class="ri-lightbulb-flash-line"></i> Consejos
                        </h5>
                        <ul class="text-sm text-yellow-900 space-y-1 list-disc list-inside">
                            <li>Usa el botón "Probar Script" antes de guardar cambios</li>
                            <li>Si desactivas el script, dejará de ejecutarse inmediatamente</li>
                            <li>Usa el botón "Formatear" para ordenar el código automáticamente</li>
                            <li>Revisa la consola del navegador (F12) si hay errores</li>
                        </ul>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-b-lg flex justify-end flex-shrink-0">
                    <button id="closeHelpBtnFooter"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition">
                        <i class="ri-check-line"></i> Entendido
                    </button>
                </div>
            </div>
        </div>

        <div id="testScriptModal"
            class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4">
            <div class="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[90vh] flex flex-col">

                <div class="bg-blue-500 text-white p-4 rounded-t-lg flex-shrink-0">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <i class="ri-code-box-line text-2xl"></i>
                            <h3 class="text-xl font-bold">Previsualización del Script</h3>
                        </div>
                        <button id="closeModalBtn" class="text-white hover:text-gray-200 transition">
                            <i class="ri-close-line text-2xl"></i>
                        </button>
                    </div>
                </div>

                <div class="p-6 space-y-4 overflow-y-auto flex-1">

                    <div class="bg-gray-100 p-3 rounded">
                        <div class="flex items-center text-sm">
                            <span class="font-medium mr-2">Ubicación:</span>
                            <span id="previewLocation" class="capitalize font-semibold text-blue-600">header</span>
                        </div>
                    </div>

                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Resultado de la ejecución:</label>
                        <div id="previewContainer" class="border rounded-lg overflow-hidden bg-white"
                            style="height: 500px;">
                            <iframe id="previewFrame" class="w-full h-full border-none"></iframe>
                        </div>
                    </div>

                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <i class="ri-information-line text-yellow-400"></i>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-yellow-700">
                                    Esta es una previsualización aislada. El comportamiento puede variar cuando se integre
                                    con el resto del sitio.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/javascript/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/htmlmixed/htmlmixed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/xml/xml.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/css/css.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-beautify@1.14.7/js/lib/beautify.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {

            // Initialize CodeMirror editor
            const codeEditor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
                mode: "javascript",
                theme: "monokai",
                lineNumbers: true,
                lineWrapping: true,
                autoCloseBrackets: true,
                matchBrackets: true,
                indentUnit: 4,
                tabSize: 4,
                extraKeys: {
                    "Tab": function(cm) {
                        var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                        cm.replaceSelection(spaces);
                    }
                }
            });

            codeEditor.setSize(null, 300);

            // Toggle page selection visibility based on scope
            function togglePageSelection() {
                const scopeSpecific = document.querySelector('input[name="scope"][value="specific"]');
                const pageSelectionContainer = document.getElementById('pageSelectionContainer');

                if (scopeSpecific && scopeSpecific.checked) {
                    pageSelectionContainer.classList.remove('hidden');
                } else {
                    pageSelectionContainer.classList.add('hidden');
                }
            }

            togglePageSelection();

            // Format code button handler using js-beautify
            const formatCodeBtn = document.getElementById('formatCodeBtn');
            formatCodeBtn.addEventListener('click', function() {
                try {
                    const code = codeEditor.getValue();

                    if (!code.trim()) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Código vacío',
                            text: 'No hay código para formatear',
                            confirmButtonColor: '#3b82f6'
                        });
                        return;
                    }

                    const formatted = js_beautify(code, {
                        indent_size: 4,
                        space_in_empty_paren: false
                    });

                    codeEditor.setValue(formatted);

                    Swal.fire({
                        icon: 'success',
                        title: 'Código formateado',
                        text: 'El código ha sido formateado correctamente',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al formatear',
                        text: 'No se pudo formatear el código',
                        confirmButtonColor: '#ef4444'
                    });
                }
            });

            // Save code to textarea before form submit
            document.getElementById('scriptForm').addEventListener('submit', function() {
                codeEditor.save();
                showLoadingIndicator();
            });

            setupLoadingIndicator('scriptForm');

            // Help modal handlers
            const helpBtn = document.getElementById('helpBtn');
            const helpModal = document.getElementById('helpModal');
            const closeHelpBtn = document.getElementById('closeHelpBtn');
            const closeHelpBtnFooter = document.getElementById('closeHelpBtnFooter');

            function openHelpModal() {
                helpModal.classList.remove('hidden');
                helpModal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            }

            function closeHelpModal() {
                helpModal.classList.remove('flex');
                helpModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }

            helpBtn.addEventListener('click', openHelpModal);
            closeHelpBtn.addEventListener('click', closeHelpModal);
            closeHelpBtnFooter.addEventListener('click', closeHelpModal);

            helpModal.addEventListener('click', function(e) {
                if (e.target === helpModal) {
                    closeHelpModal();
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && !helpModal.classList.contains('hidden')) {
                    closeHelpModal();
                }
            });

            // Test script modal handlers
            const testScriptBtn = document.getElementById('testScriptBtn');
            const testScriptModal = document.getElementById('testScriptModal');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const previewLocation = document.getElementById('previewLocation');
            const previewFrame = document.getElementById('previewFrame');

            // Open preview modal with script test
            testScriptBtn.addEventListener('click', function() {
                const code = codeEditor.getValue();
                const location = document.getElementById('location').value;

                previewLocation.textContent = location;

                const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                iframeDoc.open();
                iframeDoc.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>Script Preview</title>
                        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    </head>
                    <body class="p-4">
                        <div class="bg-gray-100 p-4 mb-4 rounded">
                            <h2 class="text-xl font-bold mb-2">Previsualización de Script</h2>
                            <p>Este es un entorno de prueba para el script.</p>
                        </div>
                        <div id="scriptOutput" class="border p-4 mb-4 min-h-[100px]">
                            <p>Área de salida: aquí se mostrarán los resultados.</p>
                        </div>
                        <div class="mt-8 text-sm text-gray-500">
                            <p>Nota: Script en posición "${location}".</p>
                        </div>
                    </body>
                    </html>
                `);
                iframeDoc.close();

                const scriptElement = iframeDoc.createElement('script');
                scriptElement.textContent = code;

                if (location === 'header') {
                    iframeDoc.head.appendChild(scriptElement);
                } else if (location === 'body') {
                    iframeDoc.body.insertBefore(scriptElement, iframeDoc.body.firstChild);
                } else {
                    iframeDoc.body.appendChild(scriptElement);
                }

                testScriptModal.classList.remove('hidden');
                testScriptModal.classList.add('flex');
            });

            // Close test modal
            function closeTestModal() {
                testScriptModal.classList.remove('flex');
                testScriptModal.classList.add('hidden');
            }

            closeModalBtn.addEventListener('click', closeTestModal);

            testScriptModal.addEventListener('click', function(e) {
                if (e.target === testScriptModal) {
                    closeTestModal();
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && !testScriptModal.classList.contains('hidden')) {
                    closeTestModal();
                }
            });
        });
    </script>
@endsection
