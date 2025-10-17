// Load form blocks into the GrapesJS editor
export default function loadFormBlocks(editor) {
    // SVG icon for basic form block
    const formSimpleSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="16" height="2" fill="white" />
      <rect x="4" y="8" width="16" height="2" fill="white" />
      <rect x="4" y="12" width="16" height="2" fill="white" />
      <rect x="4" y="16" width="10" height="2" fill="white" />
      <rect x="16" y="16" width="4" height="2" fill="white" />
    </svg>`;

    // SVG icon for section form block
    const formSectionSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="2" fill="#333" />
      <rect x="2" y="5" width="20" height="17" rx="2" fill="#23366A" />
      <rect x="4" y="7" width="16" height="2" fill="white" />
      <rect x="4" y="11" width="16" height="2" fill="white" />
      <rect x="4" y="15" width="16" height="2" fill="white" />
      <rect x="4" y="19" width="10" height="1" fill="white" />
    </svg>`;

    // Add custom component for basic form
    editor.DomComponents.addType("dynamic-form-basic", {
        model: {
            defaults: {
                name: "Formulario Simple",
                tagName: "div",
                droppable: false,
                attributes: {
                    class: "form-container bg-white p-6 rounded-2xl border border-gray-200",
                    "data-form-id": "",
                },
            },

            // Initialize component
            init() {
                this.listenTo(this, "change:attributes", this.handleAttrChange);
                this.loadFormOptions();
                this.on("change:attributes:data-form-id", this.updateFormHTML);
                setTimeout(() => this.updateFormHTML(), 100);
            },

            // Handle attribute changes
            handleAttrChange() {
                const attrs = this.getAttributes();
                if (
                    attrs["data-form-id"] !==
                    this.get("attributes")["data-form-id"]
                ) {
                    this.set("attributes", {
                        ...attrs,
                        "data-form-id": attrs["data-form-id"] || "",
                    });
                }
            },

            // Load available forms from API
            async loadFormOptions() {
                try {
                    const response = await fetch("/api/forms/active");
                    if (!response.ok) throw new Error("Error loading forms");

                    this.availableForms = await response.json();
                } catch (error) {
                    console.error("Error loading form options:", error);
                    this.availableForms = [];
                }
            },

            // Update HTML content when form ID changes
            updateFormHTML() {
                try {
                    const formId = this.getAttributes()["data-form-id"];
                    if (!formId) {
                        this.set(
                            "content",
                            `
                            <div class="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                <i class="ri-file-list-3-line text-4xl text-gray-400 mb-2"></i>
                                <h3 class="text-lg font-medium text-gray-700 mb-1">Formulario no seleccionado</h3>
                                <p class="text-sm text-gray-500">Haga doble clic para seleccionar un formulario.</p>
                            </div>
                        `,
                        );
                        return;
                    }

                    // Fetch form details
                    fetch(`/api/forms/active`)
                        .then((response) => response.json())
                        .then((forms) => {
                            const form = forms.find((f) => f.id == formId);
                            if (!form) {
                                throw new Error("Formulario no encontrado");
                            }

                            this.renderForm(form);
                        })
                        .catch((error) => {
                            console.error("Error updating form HTML:", error);
                            this.set(
                                "content",
                                `
                                <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                                    <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                                    <h3 class="text-lg font-medium text-red-700 mb-1">Error al cargar el formulario</h3>
                                    <p class="text-sm text-red-500">No se pudo cargar el formulario seleccionado. Por favor, verifique que el formulario exista y esté activo.</p>
                                </div>
                            `,
                            );
                        });
                } catch (error) {
                    console.error("Error in updateFormHTML:", error);
                }
            },

            // Render the form HTML
            renderForm(form) {
                // Check if fields is an object with keys like field_0, field_1 instead of an array
                let fieldsArray = [];

                if (form.fields && !Array.isArray(form.fields)) {
                    // Convert object format to array format
                    fieldsArray = Object.keys(form.fields).map(
                        (key) => form.fields[key],
                    );
                } else if (Array.isArray(form.fields)) {
                    fieldsArray = form.fields;
                } else {
                    console.error("Invalid form fields format:", form.fields);
                    this.set(
                        "content",
                        `
                        <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                            <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                            <h3 class="text-lg font-medium text-red-700 mb-1">Error de formato</h3>
                            <p class="text-sm text-red-500">El formato de los campos del formulario es inválido. Por favor, verifique la estructura de datos.</p>
                        </div>
                    `,
                    );
                    return;
                }

                // Generate HTML for form fields
                const fieldsHTML = fieldsArray
                    .map((field) => {
                        const fieldId = `form_${form.id}_${field.name}`;
                        const requiredAttr = field.required ? "required" : "";
                        const requiredMark = field.required
                            ? '<span class="text-red-500">*</span>'
                            : "";

                        let inputHTML = "";

                        switch (field.type) {
                            case "text":
                                inputHTML = `
                                    <input type="text" id="${fieldId}" name="${field.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${requiredAttr}>
                                `;
                                break;
                            case "email":
                                inputHTML = `
                                    <input type="email" id="${fieldId}" name="${field.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                                        ${requiredAttr}>
                                `;
                                break;
                            case "tel":
                                inputHTML = `
                                    <input type="tel" id="${fieldId}" name="${field.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[0-9]{4}-?[0-9]{4}"
                                        placeholder="0000-0000"
                                        ${requiredAttr}>
                                `;
                                break;
                            case "number":
                                inputHTML = `
                                    <input type="number" id="${fieldId}" name="${field.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        min="0"
                                        ${requiredAttr}>
                                `;
                                break;
                            case "textarea":
                                inputHTML = `
                                <textarea id="${fieldId}" name="${field.name}" rows="4"
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-2xl" ${requiredAttr}></textarea>
                            `;
                                break;
                            case "select":
                                const optionsHTML = field.options
                                    .map(
                                        (option) =>
                                            `<option value="${option}">${option}</option>`,
                                    )
                                    .join("");

                                inputHTML = `
                                <select id="${fieldId}" name="${field.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${requiredAttr}>
                                    <option value="">Seleccione una opción</option>
                                    ${optionsHTML}
                                </select>
                            `;
                                break;
                            case "radio":
                                inputHTML = `
                                <div class="space-y-2">
                                    ${field.options
                                        .map(
                                            (option, idx) => `
                                        <div class="flex items-center">
                                            <input type="radio" id="${fieldId}_${idx}" name="${field.name}" value="${option}" 
                                                class="h-4 w-4 text-primary border-gray-300" ${idx === 0 && field.required ? "required" : ""}>
                                            <label for="${fieldId}_${idx}" class="ml-2 text-gray-700">${option}</label>
                                        </div>
                                    `,
                                        )
                                        .join("")}
                                </div>
                            `;
                                break;
                            case "checkbox":
                                inputHTML = `
                                <div class="flex items-center">
                                    <input type="checkbox" id="${fieldId}" name="${field.name}" value="1" 
                                        class="h-4 w-4 text-primary border-gray-300 rounded" ${requiredAttr}>
                                    <label for="${fieldId}" class="ml-2 text-gray-700">${field.label}</label>
                                </div>
                            `;
                                return inputHTML; // No need for additional label for checkboxes
                            default:
                                inputHTML = `
                                <input type="text" id="${fieldId}" name="${field.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${requiredAttr}>
                            `;
                        }

                        // For checkbox we return only the input, for others we add the label
                        if (field.type === "checkbox") {
                            return inputHTML;
                        }

                        return `
                        <div class="mb-4">
                            <label for="${fieldId}" class="block text-gray-700 text-sm font-bold mb-2">
                                ${field.label} ${requiredMark}
                            </label>
                            ${inputHTML}
                        </div>
                    `;
                    })
                    .join("");

                // Create form HTML
                const formHTML = `
                    <h2 class="text-2xl font-bold text-primary mb-2">${form.title}</h2>
                    ${form.description ? `<p class="text-gray-600 mb-4">${form.description}</p>` : ""}
                    
                    <form id="dynamic_form_${form.id}" class="dynamic-form" data-form-id="${form.id}">
                        ${fieldsHTML}
                        
                        <div class="mt-6">
                            <button type="submit" class="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                ${form.submit_button_text}
                            </button>
                        </div>
                    </form>
                    
                    <div id="form_success_${form.id}" class="hidden mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        <p class="flex items-center"><i class="ri-check-line mr-2"></i> ${form.success_message}</p>
                    </div>
                    
                    <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            const formId = '${form.id}';
                            if (window['form_initialized_' + formId]) {
                                return;
                            }
                            
                            window['form_initialized_' + formId] = true;
                            
                            const form = document.getElementById('dynamic_form_' + formId);
                            if (form) {
                                const newForm = form.cloneNode(true);
                                form.parentNode.replaceChild(newForm, form);
                                
                                newForm.addEventListener('submit', function(e) {
                                    e.preventDefault();

                                    const submitButton = newForm.querySelector('button[type="submit"]');
                                    if (submitButton.disabled) return;
                                    
                                    submitButton.disabled = true;
                                    submitButton.innerHTML = 'Enviando...';
                                    
                                    // Get form data
                                    const formData = new FormData(newForm);
                                    const jsonData = {};
                                    formData.forEach((value, key) => {
                                        jsonData[key] = value;
                                    });
                                    
                                    // Submit form via AJAX
                                    fetch('/api/forms/' + formId + '/submit', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                                        },
                                        body: JSON.stringify(jsonData)
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        submitButton.disabled = false;
                                        submitButton.innerHTML = '${form.submit_button_text}';
                                        
                                        if (data.success) {
                                            // Show success message
                                            newForm.reset();
                                            const successMessage = document.getElementById('form_success_' + formId);
                                            if (successMessage) {
                                                successMessage.classList.remove('hidden');
                                                
                                                setTimeout(() => {
                                                    successMessage.classList.add('hidden');
                                                }, 5000);
                                            }
                                            
                                            // Redirect if URL is provided
                                            if (data.redirect_url) {
                                                setTimeout(() => {
                                                    window.location.href = data.redirect_url;
                                                }, 1000);
                                            }
                                        } else {
                                            // Show error messages
                                            alert('Error: ' + JSON.stringify(data.errors));
                                        }
                                    })
                                    .catch(error => {
                                        submitButton.disabled = false;
                                        submitButton.innerHTML = '${form.submit_button_text}';
                                        
                                        console.error('Error submitting form:', error);
                                        alert('Error al enviar el formulario. Inténtelo de nuevo más tarde.');
                                    });
                                });
                            }
                        });
                    </script>
                `;

                this.set("content", formHTML);
            },

            // Show form selection dialog when double clicked
            showFormSelector() {
                if (!this.availableForms || this.availableForms.length === 0) {
                    alert(
                        "No hay formularios disponibles. Por favor, cree un formulario primero.",
                    );
                    return;
                }

                // Build HTML for form selector
                const formOptions = this.availableForms
                    .map(
                        (form) =>
                            `<div class="form-option p-3 border rounded mb-2 cursor-pointer hover:bg-gray-50" data-form-id="${form.id}">
                        <div class="font-medium">${form.title}</div>
                        <div class="text-sm text-gray-500">${Object.keys(form.fields).length} campos</div>
                    </div>`,
                    )
                    .join("");

                const selectorHtml = `
                    <div class="form-selector p-4">
                        <h3 class="text-lg font-medium mb-3">Seleccionar Formulario</h3>
                        <div class="form-options max-h-60 overflow-y-auto">
                            ${formOptions}
                        </div>
                    </div>
                `;

                // Use SweetAlert to show the selector
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Seleccionar Formulario",
                        html: selectorHtml,
                        showCancelButton: true,
                        cancelButtonText: "Cancelar",
                        showConfirmButton: false,
                        width: "500px",
                        didOpen: () => {
                            const popup = Swal.getPopup();

                            // Add click handlers to form options
                            popup
                                .querySelectorAll(".form-option")
                                .forEach((option) => {
                                    option.addEventListener("click", () => {
                                        const formId =
                                            option.getAttribute("data-form-id");
                                        this.set("attributes", {
                                            ...this.getAttributes(),
                                            "data-form-id": formId,
                                        });
                                        Swal.close();
                                    });
                                });
                        },
                    });
                } else {
                    // Fallback if SweetAlert is not available
                    const formId = prompt("Ingrese el ID del formulario:");
                    if (formId) {
                        this.set("attributes", {
                            ...this.getAttributes(),
                            "data-form-id": formId,
                        });
                    }
                }
            },
        },
        view: {
            events: {
                dblclick: "onDblClick",
            },

            // Handle double click to open form selector
            onDblClick() {
                this.model.showFormSelector();
            },
        },
    });

    // Add custom component for section form
    editor.DomComponents.addType("dynamic-form-section", {
        model: {
            defaults: {
                name: "Sección con Formulario",
                tagName: "section",
                droppable: false,
                attributes: {
                    class: "py-8 md:py-14 bg-white",
                    "data-form-id": "",
                },
            },

            // Initialize component
            init() {
                this.listenTo(this, "change:attributes", this.handleAttrChange);
                this.loadFormOptions();
                this.on("change:attributes:data-form-id", this.updateFormHTML);
                setTimeout(() => this.updateFormHTML(), 100);
            },

            // Handle attribute changes
            handleAttrChange() {
                const attrs = this.getAttributes();
                if (
                    attrs["data-form-id"] !==
                    this.get("attributes")["data-form-id"]
                ) {
                    this.set("attributes", {
                        ...attrs,
                        "data-form-id": attrs["data-form-id"] || "",
                    });
                }
            },

            // Load available forms from API
            async loadFormOptions() {
                try {
                    const response = await fetch("/api/forms/active");
                    if (!response.ok) throw new Error("Error loading forms");

                    this.availableForms = await response.json();
                } catch (error) {
                    console.error("Error loading form options:", error);
                    this.availableForms = [];
                }
            },

            // Update HTML content when form ID changes
            updateFormHTML() {
                try {
                    const formId = this.getAttributes()["data-form-id"];
                    if (!formId) {
                        this.set(
                            "content",
                            `
                            <div class="max-w-7xl mx-auto px-4">
                                <div class="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                    <i class="ri-file-list-3-line text-4xl text-gray-400 mb-2"></i>
                                    <h3 class="text-lg font-medium text-gray-700 mb-1">Formulario no seleccionado</h3>
                                    <p class="text-sm text-gray-500">Haga doble clic para seleccionar un formulario.</p>
                                </div>
                            </div>
                        `,
                        );
                        return;
                    }

                    // Fetch form details
                    fetch(`/api/forms/active`)
                        .then((response) => response.json())
                        .then((forms) => {
                            const form = forms.find((f) => f.id == formId);
                            if (!form) {
                                throw new Error("Formulario no encontrado");
                            }

                            this.renderForm(form);
                        })
                        .catch((error) => {
                            console.error("Error updating form HTML:", error);
                            this.set(
                                "content",
                                `
                                <div class="max-w-7xl mx-auto px-4">
                                    <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                                        <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                                        <h3 class="text-lg font-medium text-red-700 mb-1">Error al cargar el formulario</h3>
                                        <p class="text-sm text-red-500">No se pudo cargar el formulario seleccionado. Por favor, verifique que el formulario exista y esté activo.</p>
                                    </div>
                                </div>
                            `,
                            );
                        });
                } catch (error) {
                    console.error("Error in updateFormHTML:", error);
                }
            },

            // Render the form HTML
            renderForm(form) {
                // Check if fields is an object with keys like field_0, field_1 instead of an array
                let fieldsArray = [];

                if (form.fields && !Array.isArray(form.fields)) {
                    // Convert object format to array format
                    fieldsArray = Object.keys(form.fields).map(
                        (key) => form.fields[key],
                    );
                } else if (Array.isArray(form.fields)) {
                    fieldsArray = form.fields;
                } else {
                    console.error("Invalid form fields format:", form.fields);
                    this.set(
                        "content",
                        `
                        <div class="max-w-7xl mx-auto px-4">
                            <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                                <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                                <h3 class="text-lg font-medium text-red-700 mb-1">Error de formato</h3>
                                <p class="text-sm text-red-500">El formato de los campos del formulario es inválido. Por favor, verifique la estructura de datos.</p>
                            </div>
                        </div>
                    `,
                    );
                    return;
                }

                // Generate HTML for form fields
                const fieldsHTML = fieldsArray
                    .map((field) => {
                        const fieldId = `form_${form.id}_${field.name}`;
                        const requiredAttr = field.required ? "required" : "";
                        const requiredMark = field.required
                            ? '<span class="text-red-500">*</span>'
                            : "";

                        let inputHTML = "";

                        switch (field.type) {
                            case "text":
                                inputHTML = `
                                    <input type="text" id="${fieldId}" name="${field.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${requiredAttr}>
                                `;
                                break;
                            case "email":
                                inputHTML = `
                                    <input type="email" id="${fieldId}" name="${field.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                                        ${requiredAttr}>
                                `;
                                break;
                            case "tel":
                                inputHTML = `
                                    <input type="tel" id="${fieldId}" name="${field.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[0-9]{4}-?[0-9]{4}"
                                        placeholder="0000-0000"
                                        ${requiredAttr}>
                                `;
                                break;
                            case "number":
                                inputHTML = `
                                    <input type="number" id="${fieldId}" name="${field.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        min="0"
                                        ${requiredAttr}>
                                `;
                                break;
                            case "textarea":
                                inputHTML = `
                                <textarea id="${fieldId}" name="${field.name}" rows="4"
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-2xl" ${requiredAttr}></textarea>
                            `;
                                break;
                            case "select":
                                const optionsHTML = field.options
                                    .map(
                                        (option) =>
                                            `<option value="${option}">${option}</option>`,
                                    )
                                    .join("");

                                inputHTML = `
                                <select id="${fieldId}" name="${field.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${requiredAttr}>
                                    <option value="">Seleccione una opción</option>
                                    ${optionsHTML}
                                </select>
                            `;
                                break;
                            case "radio":
                                inputHTML = `
                                <div class="space-y-2">
                                    ${field.options
                                        .map(
                                            (option, idx) => `
                                        <div class="flex items-center">
                                            <input type="radio" id="${fieldId}_${idx}" name="${field.name}" value="${option}" 
                                                class="h-4 w-4 text-primary border-gray-300" ${idx === 0 && field.required ? "required" : ""}>
                                            <label for="${fieldId}_${idx}" class="ml-2 text-gray-700">${option}</label>
                                        </div>
                                    `,
                                        )
                                        .join("")}
                                </div>
                            `;
                                break;
                            case "checkbox":
                                inputHTML = `
                                <div class="flex items-center">
                                    <input type="checkbox" id="${fieldId}" name="${field.name}" value="1" 
                                        class="h-4 w-4 text-primary border-gray-300 rounded" ${requiredAttr}>
                                    <label for="${fieldId}" class="ml-2 text-gray-700">${field.label}</label>
                                </div>
                            `;
                                return inputHTML; // No need for additional label for checkboxes
                            default:
                                inputHTML = `
                                <input type="text" id="${fieldId}" name="${field.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${requiredAttr}>
                            `;
                        }

                        // For checkbox we return only the input, for others we add the label
                        if (field.type === "checkbox") {
                            return inputHTML;
                        }

                        return `
                        <div class="mb-4">
                            <label for="${fieldId}" class="block text-gray-700 text-sm font-bold mb-2">
                                ${field.label} ${requiredMark}
                            </label>
                            ${inputHTML}
                        </div>
                    `;
                    })
                    .join("");

                // Create section with form HTML
                const sectionHTML = `
                    <div class="max-w-7xl mx-auto px-4">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-primary mb-2">${form.title}</h2>
                            ${form.description ? `<p class="text-gray-600 mb-2 max-w-3xl mx-auto">${form.description}</p>` : ""}
                        </div>
                        
                        <div class="max-w-2xl mx-auto">
                            <div class="bg-white p-6 rounded-2xl border border-gray-200">
                                <form id="dynamic_form_${form.id}" class="dynamic-form" data-form-id="${form.id}">
                                    ${fieldsHTML}
                                    
                                    <div class="mt-6">
                                        <button type="submit" class="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                            ${form.submit_button_text}
                                        </button>
                                    </div>
                                </form>
                                
                                <div id="form_success_${form.id}" class="hidden mt-6 p-4 bg-green-100 text-green-700 rounded-2xl">
                                    <p class="flex items-center"><i class="ri-check-line mr-2"></i> ${form.success_message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            const formId = '${form.id}';
                            if (window['form_initialized_' + formId]) {
                                return;
                            }
                            
                            window['form_initialized_' + formId] = true;
                            
                            const form = document.getElementById('dynamic_form_' + formId);
                            if (form) {
                                const newForm = form.cloneNode(true);
                                form.parentNode.replaceChild(newForm, form);
                                
                                newForm.addEventListener('submit', function(e) {
                                    e.preventDefault();

                                    const submitButton = newForm.querySelector('button[type="submit"]');
                                    if (submitButton.disabled) return; // Ya está en proceso
                                    
                                    submitButton.disabled = true;
                                    submitButton.innerHTML = 'Enviando...';
                                    
                                    // Get form data
                                    const formData = new FormData(newForm);
                                    const jsonData = {};
                                    formData.forEach((value, key) => {
                                        jsonData[key] = value;
                                    });
                                    
                                    // Submit form via AJAX
                                    fetch('/api/forms/' + formId + '/submit', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                                        },
                                        body: JSON.stringify(jsonData)
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        submitButton.disabled = false;
                                        submitButton.innerHTML = '${form.submit_button_text}';
                                        
                                        if (data.success) {
                                            // Show success message
                                            newForm.reset();
                                            const successMessage = document.getElementById('form_success_' + formId);
                                            if (successMessage) {
                                                successMessage.classList.remove('hidden');
                                                
                                                setTimeout(() => {
                                                    successMessage.classList.add('hidden');
                                                }, 5000);
                                            }
                                            
                                            // Redirect if URL is provided
                                            if (data.redirect_url) {
                                                setTimeout(() => {
                                                    window.location.href = data.redirect_url;
                                                }, 1000);
                                            }
                                        } else {
                                            // Show error messages
                                            alert('Error: ' + JSON.stringify(data.errors));
                                        }
                                    })
                                    .catch(error => {
                                        submitButton.disabled = false;
                                        submitButton.innerHTML = '${form.submit_button_text}';
                                        
                                        console.error('Error submitting form:', error);
                                        alert('Error al enviar el formulario. Inténtelo de nuevo más tarde.');
                                    });
                                });
                            }
                        });
                    </script>
                `;

                this.set("content", sectionHTML);
            },

            // Show form selection dialog when double clicked
            showFormSelector() {
                if (!this.availableForms || this.availableForms.length === 0) {
                    alert(
                        "No hay formularios disponibles. Por favor, cree un formulario primero.",
                    );
                    return;
                }

                // Build HTML for form selector
                const formOptions = this.availableForms
                    .map(
                        (form) =>
                            `<div class="form-option p-3 border rounded mb-2 cursor-pointer hover:bg-gray-50" data-form-id="${form.id}">
                        <div class="font-medium">${form.title}</div>
                        <div class="text-sm text-gray-500">${Object.keys(form.fields).length} campos</div>
                    </div>`,
                    )
                    .join("");

                const selectorHtml = `
                    <div class="form-selector p-4">
                        <h3 class="text-lg font-medium mb-3">Seleccionar Formulario</h3>
                        <div class="form-options max-h-60 overflow-y-auto">
                            ${formOptions}
                        </div>
                    </div>
                `;

                // Use SweetAlert to show the selector
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Seleccionar Formulario",
                        html: selectorHtml,
                        showCancelButton: true,
                        cancelButtonText: "Cancelar",
                        showConfirmButton: false,
                        width: "500px",
                        didOpen: () => {
                            const popup = Swal.getPopup();

                            // Add click handlers to form options
                            popup
                                .querySelectorAll(".form-option")
                                .forEach((option) => {
                                    option.addEventListener("click", () => {
                                        const formId =
                                            option.getAttribute("data-form-id");
                                        this.set("attributes", {
                                            ...this.getAttributes(),
                                            "data-form-id": formId,
                                        });
                                        Swal.close();
                                    });
                                });
                        },
                    });
                } else {
                    // Fallback if SweetAlert is not available
                    const formId = prompt("Ingrese el ID del formulario:");
                    if (formId) {
                        this.set("attributes", {
                            ...this.getAttributes(),
                            "data-form-id": formId,
                        });
                    }
                }
            },
        },
        view: {
            events: {
                dblclick: "onDblClick",
            },

            // Handle double click to open form selector
            onDblClick() {
                this.model.showFormSelector();
            },
        },
    });

    // Add basic form block to the editor
    editor.BlockManager.add("dynamic-form-basic", {
        label: "Formulario Simple",
        category: "Formularios",
        attributes: { class: "gjs-block-section" },
        media: formSimpleSvg,
        content: { type: "dynamic-form-basic" },
    });

    // Add section form block to the editor
    editor.BlockManager.add("dynamic-form-section", {
        label: "Sección con Formulario",
        category: "Formularios",
        attributes: { class: "gjs-block-section" },
        media: formSectionSvg,
        content: { type: "dynamic-form-section" },
    });
}
