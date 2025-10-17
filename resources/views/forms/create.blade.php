@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Nuevo Formulario</h1>
            <a href="{{ route('forms.index') }}"
                class="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-arrow-left-line mr-1"></i>Volver al Listado
            </a>
        </div>

        <div class="bg-white shadow-md p-6">
            <form action="{{ route('forms.store') }}" method="POST" id="formBuilder">
                @csrf

                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-information-line mr-2"></i>Información Básica
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-1">
                            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
                                Título <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="title" id="title" value="{{ old('title') }}"
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
                                <option value="active" {{ old('status', 'active') == 'active' ? 'selected' : '' }}>Activo
                                </option>
                                <option value="inactive" {{ old('status') == 'inactive' ? 'selected' : '' }}>Inactivo
                                </option>
                            </select>
                            <p class="text-xs text-gray-600 mt-1">Solo los formularios activos son visibles</p>
                            @error('status')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="md:col-span-2">
                            <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                            <textarea name="description" id="description" rows="4" placeholder="Descripción del formulario (opcional)"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-2xl @error('description') border-red-500 @enderror">{{ old('description') }}</textarea>
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
                    </div>

                    <div class="mt-4">
                        <button type="button" id="addFieldBtn"
                            class="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-full flex items-center">
                            <i class="ri-add-line mr-1"></i>Añadir Campo
                        </button>
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
                                value="{{ old('submit_button_text', 'Enviar') }}"
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
                                value="{{ old('success_message', 'Formulario enviado correctamente') }}"
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
                            <input type="url" name="redirect_url" id="redirect_url" value="{{ old('redirect_url') }}"
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
                        <i class="ri-save-line mr-1"></i>Guardar Formulario
                    </button>
                </div>
            </form>
        </div>
    </div>

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            setupLoadingIndicator('formBuilder');

            // Define field types outside any functions
            const FIELD_TYPES = {
                text: {
                    label: 'Texto',
                    hasOptions: false
                },
                email: {
                    label: 'Correo Electrónico',
                    hasOptions: false
                },
                tel: {
                    label: 'Teléfono',
                    hasOptions: false
                },
                number: {
                    label: 'Número',
                    hasOptions: false
                },
                textarea: {
                    label: 'Área de Texto',
                    hasOptions: false
                },
                select: {
                    label: 'Selector',
                    hasOptions: true
                },
                radio: {
                    label: 'Radio Buttons',
                    hasOptions: true
                },
                checkbox: {
                    label: 'Checkbox',
                    hasOptions: false
                }
            };

            let fieldCounter = 0;
            const fieldsContainer = document.getElementById('fieldsContainer');

            // Add field button event
            document.getElementById('addFieldBtn').addEventListener('click', function() {
                createFieldElement();
            });

            // Create and add an initial field
            createFieldElement();

            // Form validation before submit
            document.getElementById('formBuilder').addEventListener('submit', function(e) {
                if (!validateForm()) {
                    e.preventDefault();
                }
            });

            // Create a new field element
            function createFieldElement(fieldData = null) {
                const fieldId = `field_${fieldCounter++}`;

                // Create main container
                const fieldItem = document.createElement('div');
                fieldItem.id = fieldId;
                fieldItem.className = 'field-item border rounded-lg p-4 mb-4 relative';

                // Delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className =
                    'delete-field absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none';
                deleteBtn.innerHTML = '<i class="ri-delete-bin-line text-lg"></i>';
                deleteBtn.addEventListener('click', function() {
                    if (document.querySelectorAll('.field-item').length > 1) {
                        fieldItem.remove();
                    } else {
                        alert('Debe haber al menos un campo en el formulario.');
                    }
                });

                // Grid container
                const gridContainer = document.createElement('div');
                gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4';

                // Field Type
                const typeContainer = document.createElement('div');
                const typeLabel = document.createElement('label');
                typeLabel.className = 'block text-gray-700 text-sm font-bold mb-2';
                typeLabel.innerHTML = 'Tipo de Campo <span class="text-red-500">*</span>';

                const typeSelect = document.createElement('select');
                typeSelect.name = `fields[${fieldId}][type]`;
                typeSelect.className =
                    'field-type shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full';
                typeSelect.required = true;

                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Seleccionar tipo';
                typeSelect.appendChild(defaultOption);

                // Add field type options
                for (const [value, {
                        label
                    }] of Object.entries(FIELD_TYPES)) {
                    const option = document.createElement('option');
                    option.value = value;
                    option.textContent = label;
                    if (fieldData && fieldData.type === value) {
                        option.selected = true;
                    }
                    typeSelect.appendChild(option);
                }

                typeContainer.appendChild(typeLabel);
                typeContainer.appendChild(typeSelect);

                // Label Field
                const labelContainer = document.createElement('div');
                const labelLabel = document.createElement('label');
                labelLabel.className = 'block text-gray-700 text-sm font-bold mb-2';
                labelLabel.innerHTML = 'Etiqueta <span class="text-red-500">*</span>';

                const labelInput = document.createElement('input');
                labelInput.type = 'text';
                labelInput.name = `fields[${fieldId}][label]`;
                labelInput.value = fieldData ? fieldData.label : '';
                labelInput.placeholder = 'Ej: Nombre Completo';
                labelInput.className =
                    'shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full';
                labelInput.required = true;

                labelContainer.appendChild(labelLabel);
                labelContainer.appendChild(labelInput);

                // Name Field
                const nameContainer = document.createElement('div');
                const nameLabel = document.createElement('label');
                nameLabel.className = 'block text-gray-700 text-sm font-bold mb-2';
                nameLabel.innerHTML = 'Nombre del Campo <span class="text-red-500">*</span>';

                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.name = `fields[${fieldId}][name]`;
                nameInput.value = fieldData ? fieldData.name : '';
                nameInput.placeholder = 'Ej: nombre_completo';
                nameInput.className =
                    'field-name shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full';
                nameInput.required = true;

                const nameHelpText = document.createElement('p');
                nameHelpText.className = 'text-xs text-gray-600 mt-1';
                nameHelpText.textContent = 'Solo letras, números y guiones bajos (sin espacios)';

                nameContainer.appendChild(nameLabel);
                nameContainer.appendChild(nameInput);
                nameContainer.appendChild(nameHelpText);

                // Required Checkbox
                const requiredContainer = document.createElement('div');
                requiredContainer.className = 'flex items-center';

                const checkboxWrapper = document.createElement('div');
                checkboxWrapper.className = 'mt-6';

                const checkboxLabel = document.createElement('label');
                checkboxLabel.className = 'inline-flex items-center cursor-pointer';

                const checkboxInput = document.createElement('input');
                checkboxInput.type = 'checkbox';
                checkboxInput.name = `fields[${fieldId}][required]`;
                checkboxInput.value = '1';
                checkboxInput.className = 'rounded border-gray-300 text-primary shadow-sm';
                if (fieldData && fieldData.required) {
                    checkboxInput.checked = true;
                }

                const checkboxText = document.createElement('span');
                checkboxText.className = 'ml-2 text-sm text-gray-700';
                checkboxText.textContent = 'Campo obligatorio';

                checkboxLabel.appendChild(checkboxInput);
                checkboxLabel.appendChild(checkboxText);
                checkboxWrapper.appendChild(checkboxLabel);
                requiredContainer.appendChild(checkboxWrapper);

                // Add all form elements to the grid
                gridContainer.appendChild(typeContainer);
                gridContainer.appendChild(labelContainer);
                gridContainer.appendChild(nameContainer);
                gridContainer.appendChild(requiredContainer);

                // Options container for select/radio fields
                const optionsContainer = document.createElement('div');
                optionsContainer.className = 'options-container mt-4 hidden';

                const optionsHeading = document.createElement('h4');
                optionsHeading.className = 'font-medium text-gray-700 mb-2';
                optionsHeading.textContent = 'Opciones';

                const optionsList = document.createElement('div');
                optionsList.className = 'options-list mb-2';

                // Create initial option if it's a select/radio field
                if (fieldData && fieldData.options && fieldData.options.length > 0) {
                    fieldData.options.forEach((option, idx) => {
                        const optionItem = createOptionElement(fieldId, option, `Opción ${idx + 1}`);
                        optionsList.appendChild(optionItem);
                    });
                } else {
                    const optionItem = createOptionElement(fieldId, '', 'Opción 1');
                    optionsList.appendChild(optionItem);
                }

                const addOptionBtn = document.createElement('button');
                addOptionBtn.type = 'button';
                addOptionBtn.className =
                    'add-option text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-full';
                addOptionBtn.innerHTML = '<i class="ri-add-line mr-1"></i>Añadir Opción';
                addOptionBtn.addEventListener('click', function() {
                    const optionCount = optionsList.querySelectorAll('.option-item').length;
                    const newOption = createOptionElement(fieldId, '', `Opción ${optionCount + 1}`);
                    optionsList.appendChild(newOption);
                });

                optionsContainer.appendChild(optionsHeading);
                optionsContainer.appendChild(optionsList);
                optionsContainer.appendChild(addOptionBtn);

                // Add all elements to the main field container
                fieldItem.appendChild(deleteBtn);
                fieldItem.appendChild(gridContainer);
                fieldItem.appendChild(optionsContainer);

                // Add to DOM
                fieldsContainer.appendChild(fieldItem);

                // Add event listeners
                setupFieldEvents(fieldItem, fieldId);

                // If it's an options field, show options container
                if (fieldData && FIELD_TYPES[fieldData.type] && FIELD_TYPES[fieldData.type].hasOptions) {
                    optionsContainer.classList.remove('hidden');
                }

                return fieldItem;
            }

            // Create a single option element for select/radio fields
            function createOptionElement(fieldId, value = '', placeholder = 'Opción') {
                const optionItem = document.createElement('div');
                optionItem.className = 'option-item flex items-center mb-2';

                const optionInput = document.createElement('input');
                optionInput.type = 'text';
                optionInput.name = `fields[${fieldId}][options][]`;
                optionInput.value = value;
                optionInput.placeholder = placeholder;
                optionInput.className =
                    'shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full';

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'delete-option ml-2 text-red-500 hover:text-red-700';
                deleteBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
                deleteBtn.addEventListener('click', function() {
                    optionItem.remove();
                });

                optionItem.appendChild(optionInput);
                optionItem.appendChild(deleteBtn);

                return optionItem;
            }

            // Setup field events
            function setupFieldEvents(fieldElement, fieldId) {
                // Field type change
                const typeSelect = fieldElement.querySelector('.field-type');
                const optionsContainer = fieldElement.querySelector('.options-container');

                typeSelect.addEventListener('change', function() {
                    const fieldType = this.value;

                    if (FIELD_TYPES[fieldType] && FIELD_TYPES[fieldType].hasOptions) {
                        optionsContainer.classList.remove('hidden');
                    } else {
                        optionsContainer.classList.add('hidden');
                    }
                });

                // Generate field name from label
                const labelInput = fieldElement.querySelector('input[name$="[label]"]');
                const nameInput = fieldElement.querySelector('.field-name');

                labelInput.addEventListener('blur', function() {
                    if (nameInput.value === '') {
                        nameInput.value = this.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '_')
                            .replace(/^_+|_+$/g, '');
                    }
                });
            }

            // Validate form before submit
            function validateForm() {
                let isValid = true;
                const fieldItems = document.querySelectorAll('.field-item');

                // Check if there are any fields
                if (fieldItems.length === 0) {
                    alert('Debe agregar al menos un campo al formulario.');
                    return false;
                }

                // Check each field for valid configuration
                fieldItems.forEach(fieldItem => {
                    const fieldType = fieldItem.querySelector('.field-type').value;

                    // Check if field type is selected
                    if (!fieldType) {
                        alert('Todos los campos deben tener un tipo seleccionado.');
                        isValid = false;
                        return;
                    }

                    // Check options for select and radio types
                    if (FIELD_TYPES[fieldType] && FIELD_TYPES[fieldType].hasOptions) {
                        const options = fieldItem.querySelectorAll('input[name$="[options][]"]');
                        if (options.length < 2) {
                            alert(
                                `Los campos de tipo ${FIELD_TYPES[fieldType].label} deben tener al menos 2 opciones.`);
                            isValid = false;
                            return;
                        }

                        // Check if all options have values
                        let hasEmptyOption = false;
                        options.forEach(option => {
                            if (!option.value.trim()) {
                                hasEmptyOption = true;
                            }
                        });

                        if (hasEmptyOption) {
                            alert('Todas las opciones deben tener un valor.');
                            isValid = false;
                            return;
                        }
                    }
                });

                return isValid;
            }
        });
    </script>
@endsection
@endsection
