@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Editar Formulario</h1>
            <div class="flex gap-2 w-full md:w-auto">
                <a href="{{ route('forms.index') }}"
                    class="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center">
                    <i class="ri-arrow-left-line mr-1"></i>Volver
                </a>
                <a href="{{ route('forms.submissions', $form->id) }}"
                    class="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center">
                    <i class="ri-file-list-3-line mr-1"></i>Ver Respuestas
                </a>
            </div>
        </div>

        <div class="bg-white shadow-md p-6">
            <form action="{{ route('forms.update', $form->id) }}" method="POST" id="formBuilder">
                @csrf
                @method('PUT')

                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-information-line mr-2"></i>Información Básica
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-1">
                            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
                                Título <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="title" id="title" value="{{ old('title', $form->title) }}"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('title') border-red-500 @enderror"
                                required>
                            @error('title')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="md:col-span-1">
                            <label for="status" class="block text-gray-700 text-sm font-bold mb-2">
                                Estado <span class="text-red-500">*</span>
                            </label>
                            <select name="status" id="status" required
                                class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('status') border-red-500 @enderror">
                                <option value="">Seleccionar estado</option>
                                <option value="active" {{ old('status', $form->status) == 'active' ? 'selected' : '' }}>
                                    Activo</option>
                                <option value="inactive" {{ old('status', $form->status) == 'inactive' ? 'selected' : '' }}>
                                    Inactivo</option>
                            </select>
                            <p class="text-xs text-gray-600 mt-1">Solo los formularios activos son visibles</p>
                            @error('status')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="md:col-span-2">
                            <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                            <textarea name="description" id="description" rows="4" placeholder="Descripción del formulario (opcional)"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-2xl @error('description') border-red-500 @enderror">{{ old('description', $form->description) }}</textarea>
                            @error('description')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-list-check mr-2"></i>Campos del Formulario
                    </h3>

                    <div id="fieldsContainer">
                        @foreach ($form->fields as $index => $field)
                            <div class="field-item border rounded-lg p-4 mb-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <!-- Tipo de campo -->
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">
                                            Tipo de Campo <span class="text-red-500">*</span>
                                        </label>
                                        <select name="fields[{{ $index }}][type]"
                                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full"
                                            required>
                                            <option value="">Seleccionar tipo</option>
                                            <option value="text" {{ $field['type'] == 'text' ? 'selected' : '' }}>Texto
                                            </option>
                                            <option value="email" {{ $field['type'] == 'email' ? 'selected' : '' }}>Correo
                                                Electrónico</option>
                                            <option value="tel" {{ $field['type'] == 'tel' ? 'selected' : '' }}>Teléfono
                                            </option>
                                            <option value="number" {{ $field['type'] == 'number' ? 'selected' : '' }}>
                                                Número</option>
                                            <option value="textarea" {{ $field['type'] == 'textarea' ? 'selected' : '' }}>
                                                Área de Texto</option>
                                            <option value="select" {{ $field['type'] == 'select' ? 'selected' : '' }}>
                                                Selector</option>
                                            <option value="radio" {{ $field['type'] == 'radio' ? 'selected' : '' }}>Radio
                                                Buttons</option>
                                            <option value="checkbox" {{ $field['type'] == 'checkbox' ? 'selected' : '' }}>
                                                Checkbox</option>
                                        </select>
                                    </div>

                                    <!-- Etiqueta del campo -->
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">
                                            Etiqueta <span class="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="fields[{{ $index }}][label]"
                                            value="{{ old('fields.' . $index . '.label', $field['label']) }}"
                                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full"
                                            required>
                                    </div>

                                    <!-- Nombre del campo -->
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">
                                            Nombre del Campo <span class="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="fields[{{ $index }}][name]"
                                            value="{{ old('fields.' . $index . '.name', $field['name']) }}"
                                            class="field-name shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full"
                                            required>
                                        <p class="text-xs text-gray-600 mt-1">Solo letras, números y guiones bajos (sin
                                            espacios)</p>
                                    </div>

                                    <!-- Campo requerido -->
                                    <div class="flex items-center">
                                        <div class="mt-6">
                                            <label class="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" name="fields[{{ $index }}][required]"
                                                    value="1"
                                                    {{ old('fields.' . $index . '.required', isset($field['required']) && $field['required']) ? 'checked' : '' }}
                                                    class="rounded border-gray-300 text-primary shadow-sm">
                                                <span class="ml-2 text-sm text-gray-700">Campo obligatorio</span>
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Opciones para campos select o radio -->
                                    @if (in_array($field['type'], ['select', 'radio']) && isset($field['options']))
                                        <div class="md:col-span-2 mt-3">
                                            <label class="block text-gray-700 text-sm font-bold mb-2">Opciones</label>
                                            <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                                <div class="space-y-2">
                                                    @foreach ($field['options'] as $optionIndex => $option)
                                                        <div class="flex items-center">
                                                            <input type="text"
                                                                name="fields[{{ $index }}][options][]"
                                                                value="{{ old('fields.' . $index . '.options.' . $optionIndex, $option) }}"
                                                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full"
                                                                placeholder="Opción {{ $optionIndex + 1 }}">
                                                        </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                </div>
                            </div>
                        @endforeach

                        @if (count($form->fields) == 0)
                            <!-- Si no hay campos, mostrar un mensaje -->
                            <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-4">
                                <div class="flex">
                                    <i class="ri-information-line text-yellow-600 text-xl mr-2"></i>
                                    <div>
                                        <h4 class="font-medium text-yellow-800">No hay campos definidos</h4>
                                        <p class="text-yellow-700 text-sm">Este formulario no tiene campos. Por favor,
                                            edita la configuración para añadir los campos necesarios.</p>
                                    </div>
                                </div>
                            </div>
                        @endif
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-settings-line mr-2"></i>Configuración Adicional
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="submit_button_text" class="block text-gray-700 text-sm font-bold mb-2">
                                Texto del Botón de Envío <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="submit_button_text" id="submit_button_text"
                                value="{{ old('submit_button_text', $form->submit_button_text) }}"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('submit_button_text') border-red-500 @enderror"
                                required>
                            @error('submit_button_text')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <div>
                            <label for="success_message" class="block text-gray-700 text-sm font-bold mb-2">
                                Mensaje de Éxito <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="success_message" id="success_message"
                                value="{{ old('success_message', $form->success_message) }}"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('success_message') border-red-500 @enderror"
                                required>
                            @error('success_message')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="md:col-span-2">
                            <label for="redirect_url" class="block text-gray-700 text-sm font-bold mb-2">
                                URL de Redirección (opcional)
                            </label>
                            <input type="url" name="redirect_url" id="redirect_url"
                                value="{{ old('redirect_url', $form->redirect_url) }}"
                                placeholder="https://ejemplo.com/gracias"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('redirect_url') border-red-500 @enderror">
                            <p class="text-xs text-gray-600 mt-1">Si se proporciona, el usuario será redirigido después de
                                enviar el formulario</p>
                            @error('redirect_url')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-end space-x-4">
                    <button type="submit"
                        class="bg-primary hover:bg-primary/90 text-white rounded-full font-bold py-2 px-6 focus:outline-none focus:shadow-outline transition-colors">
                        <i class="ri-save-line mr-1"></i>Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    </div>

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            setupLoadingIndicator('formBuilder');
        });
    </script>
@endsection
@endsection
