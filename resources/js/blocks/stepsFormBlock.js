// blocks/stepsFormBlock.js

// Creates a credit pre-qualification multi-step form with input masks and custom validation
export default function loadStepsFormBlock(editor) {
    // SVG icon for the form block
    const formStepsSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <circle cx="6" cy="8" r="2" fill="white" />
      <circle cx="12" cy="8" r="2" fill="white" />
      <circle cx="18" cy="8" r="2" fill="white" />
      <rect x="4" y="14" width="16" height="2" fill="white" />
      <rect x="4" y="18" width="10" height="2" fill="white" />
    </svg>`;

    // Add custom component for multi-step form
    editor.DomComponents.addType("precalificador-form", {
        model: {
            defaults: {
                name: "Formulario Precalificador",
                tagName: "section",
                droppable: false,
                attributes: {
                    class: "py-8 md:py-14 bg-white",
                },
                traits: [
                    {
                        type: "text",
                        name: "form-title",
                        label: "Título del formulario",
                        default: "Precalificador de créditos",
                    },
                    {
                        type: "text",
                        name: "form-subtitle",
                        label: "Subtítulo",
                        default: "Por favor llene los campos del formulario",
                    },
                    {
                        type: "button",
                        text: "Generar tabla",
                        full: true,
                        command: "create-form-in-db",
                    },
                ],
            },

            // Initialize the component
            init() {
                this.on("change:attributes", this.updateContent);
                setTimeout(() => this.updateContent(), 100);
            },

            // Generate HTML content based on component attributes
            updateContent() {
                const attrs = this.getAttributes();
                const title =
                    attrs["form-title"] || "Precalificador de créditos";
                const subtitle =
                    attrs["form-subtitle"] ||
                    "Por favor llene los campos del formulario";

                // Create the multi-step form HTML
                const formHTML = `
                    <div class="max-w-7xl mx-auto px-4">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-primary mb-2">${title}</h2>
                            <p class="text-gray-600">${subtitle}</p>
                        </div>
                        
                        <div class="precalificador-form max-w-4xl mx-auto">
                            <div class="steps-progress mb-8">
                                <div class="flex justify-between items-center">
                                    <div class="step-indicator flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-1">
                                            <i class="ri-user-line"></i>
                                        </div>
                                        <span class="text-xs text-primary font-medium">Personal</span>
                                    </div>
                                    
                                    <div class="flex-1 h-1 bg-gray-200 relative top-[-10px]"></div>
                                    
                                    <div class="step-indicator flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-white text-primary border-2 border-primary flex items-center justify-center mb-1">
                                            <i class="ri-money-dollar-circle-line"></i>
                                        </div>
                                        <span class="text-xs text-gray-500">Perfil</span>
                                    </div>
                                    
                                    <div class="flex-1 h-1 bg-gray-200 relative top-[-10px]"></div>
                                    
                                    <div class="step-indicator flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-white text-primary border-2 border-primary flex items-center justify-center mb-1">
                                            <i class="ri-file-list-3-line"></i>
                                        </div>
                                        <span class="text-xs text-gray-500">Cuota</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Custom Alert Banner -->
                            <div id="form-alert-banner" class="hidden mb-6 p-4 rounded-lg bg-red-100 text-red-700 border border-red-400">
                                <div class="flex items-center">
                                    <i class="ri-error-warning-line mr-2 text-xl"></i>
                                    <span id="alert-message" class="font-semibold"></span>
                                </div>
                            </div>
                            
                            <form id="precalificador_form" class="steps-form">
                                <!-- Step 1: Personal Information -->
                                <div id="step-1" class="step-content">
                                    <h3 class="text-xl font-bold text-primary mb-6">Información personal</h3>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label for="nombres" class="block text-primary text-sm font-bold mb-2">
                                                Nombre según DUI <span class="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="nombres" name="nombres" required 
                                                placeholder="Nombres"
                                                class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                        
                                        <div>
                                            <label for="apellidos" class="block text-primary text-sm font-bold mb-2">
                                                Nombre según DUI <span class="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="apellidos" name="apellidos" required 
                                                placeholder="Apellidos"
                                                class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label for="dui" class="block text-primary text-sm font-bold mb-2">
                                                Número de DUI <span class="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="dui" name="dui" required 
                                                placeholder="00000000-0"
                                                class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                        
                                        <div>
                                            <label for="edad" class="block text-primary text-sm font-bold mb-2">
                                                Edad <span class="text-red-500">*</span>
                                            </label>
                                            <input type="number" id="edad" name="edad" min="18" required 
                                                class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-8">
                                        <label class="block text-primary text-sm font-bold mb-2">
                                            Datos de contacto <span class="text-red-500">*</span>
                                        </label>
                                        
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <input type="tel" id="telefono" name="telefono" placeholder="0000-0000" required 
                                                    class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                            </div>
                                            
                                            <div>
                                                <input type="email" id="correo" name="correo" placeholder="Correo electrónico" required 
                                                    class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex justify-end">
                                        <button type="button" class="next-step bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Step 2: Financial Profile -->
                                <div id="step-2" class="step-content hidden">
                                    <h3 class="text-xl font-bold text-primary mb-6">Perfil</h3>
                                    
                                    <div class="mb-6">
                                        <label for="ingreso_mensual" class="block text-primary text-sm font-bold mb-2">
                                            Ingreso mensual <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-700">$</span>
                                            <input type="text" id="ingreso_mensual" name="ingreso_mensual" required 
                                                placeholder="0.00"
                                                class="border-2 border-primary w-full py-2 pl-8 pr-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-6">
                                        <label for="tipo_empleo" class="block text-primary text-sm font-bold mb-2">
                                            Tipo de empleo <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <select id="tipo_empleo" name="tipo_empleo" required
                                                class="appearance-none border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                                <option value="">Seleccione una opción</option>
                                                <option value="Formal">Empleo Formal</option>
                                                <option value="Informal">Empleo Informal</option>
                                                <option value="Negocio propio">Negocio propio</option>
                                                <option value="Jubilado">Jubilado/a</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                                <i class="ri-arrow-down-s-line text-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-8">
                                        <label for="antiguedad_laboral" class="block text-primary text-sm font-bold mb-2">
                                            Antigüedad laboral (años) <span class="text-red-500">*</span>
                                        </label>
                                        <input type="number" id="antiguedad_laboral" name="antiguedad_laboral" min="0" required 
                                            class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                    </div>
                                    
                                    <div class="flex justify-between">
                                        <button type="button" class="prev-step border-2 border-primary bg-white hover:bg-gray-100 text-primary font-semibold py-3 px-8 rounded-full transition-colors">
                                            Anterior
                                        </button>
                                        
                                        <button type="button" class="next-step bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Step 3: Loan Information -->
                                <div id="step-3" class="step-content hidden">
                                    <h3 class="text-xl font-bold text-primary mb-6">Cuota</h3>
                                    
                                    <div class="mb-6">
                                        <label for="monto_solicitado" class="block text-primary text-sm font-bold mb-2">
                                            Monto solicitado <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-700">$</span>
                                            <input type="text" id="monto_solicitado" name="monto_solicitado" required 
                                                placeholder="0.00"
                                                class="border-2 border-primary w-full py-2 pl-8 pr-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-6">
                                        <label for="plazo_meses" class="block text-primary text-sm font-bold mb-2">
                                            Plazo en meses <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <select id="plazo_meses" name="plazo_meses" required
                                                class="appearance-none border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                                <option value="">Seleccione una opción</option>
                                                <option value="12">12 meses</option>
                                                <option value="24">24 meses</option>
                                                <option value="36">36 meses</option>
                                                <option value="48">48 meses</option>
                                                <option value="60">60 meses</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                                <i class="ri-arrow-down-s-line text-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-8">
                                        <label class="flex items-center">
                                            <input type="checkbox" id="acepto_terminos" name="acepto_terminos" required
                                                class="h-4 w-4 text-primary border-primary rounded">
                                            <span class="ml-2 text-gray-700 text-sm">
                                                Acepto los <a href="#" class="text-primary hover:underline">términos y condiciones</a> <span class="text-red-500">*</span>
                                            </span>
                                        </label>
                                    </div>
                                    
                                    <div class="flex justify-between">
                                        <button type="button" class="prev-step border-2 border-primary bg-white hover:bg-gray-100 text-primary font-semibold py-3 px-8 rounded-full transition-colors">
                                            Anterior
                                        </button>
                                        
                                        <button type="submit" class="submit-form bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                            Enviar solicitud
                                        </button>
                                    </div>
                                </div>
                            </form>
                            
                            <div id="form_success" class="hidden mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
                                <p class="flex items-center"><i class="ri-check-line mr-2"></i> Su solicitud ha sido enviada correctamente. Nos pondremos en contacto con usted pronto.</p>
                            </div>
                        </div>
                    </div>
                    
                    <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            if (window.precalificador_form_initialized) {
                                return;
                            }
                            
                            window.precalificador_form_initialized = true;
                            
                            const form = document.getElementById('precalificador_form');
                            const alertBanner = document.getElementById('form-alert-banner');
                            const alertMessage = document.getElementById('alert-message');
                            
                            if (form) {
                                const totalSteps = 3;
                                let currentStep = 1;
                                
                                const steps = Array.from({length: totalSteps}).map((_, i) => 
                                    document.getElementById('step-' + (i + 1))
                                );
                                
                                const indicators = document.querySelectorAll('.step-indicator');
                                const prevButtons = form.querySelectorAll('.prev-step');
                                const nextButtons = form.querySelectorAll('.next-step');
                                const submitButton = form.querySelector('.submit-form');
                                
                                // Initialize input masks and validations
                                const initInputMasks = function() {
                                    // DUI mask (00000000-0)
                                    const duiInput = document.getElementById('dui');
                                    if (duiInput) {
                                        duiInput.addEventListener('input', function(e) {
                                            let value = e.target.value.replace(/\\D/g, ''); // Remove non-digits
                                            
                                            if (value.length > 9) {
                                                value = value.substr(0, 9); // Limit to 9 digits
                                            }
                                            
                                            // Format: XXXXXXXX-X
                                            if (value.length > 8) {
                                                e.target.value = value.substr(0, 8) + '-' + value.substr(8);
                                            } else {
                                                e.target.value = value;
                                            }
                                        });
                                    }
                                    
                                    // Phone mask (0000-0000)
                                    const phoneInput = document.getElementById('telefono');
                                    if (phoneInput) {
                                        phoneInput.addEventListener('input', function(e) {
                                            let value = e.target.value.replace(/\\D/g, ''); // Remove non-digits
                                            
                                            if (value.length > 8) {
                                                value = value.substr(0, 8); // Limit to 8 digits
                                            }
                                            
                                            // Format: XXXX-XXXX
                                            if (value.length > 4) {
                                                e.target.value = value.substr(0, 4) + '-' + value.substr(4);
                                            } else {
                                                e.target.value = value;
                                            }
                                        });
                                    }
                                    
                                    // Currency inputs with 2 decimal places
                                    const moneyInputs = [
                                        document.getElementById('ingreso_mensual'),
                                        document.getElementById('monto_solicitado')
                                    ];
                                    
                                    moneyInputs.forEach(input => {
                                        if (input) {
                                            input.addEventListener('input', function(e) {
                                                let value = e.target.value.replace(/[^0-9.]/g, ''); // Allow only digits and dot
                                                
                                                // Check if there's already a decimal point
                                                const decimalIndex = value.indexOf('.');
                                                if (decimalIndex !== -1) {
                                                    // Limit to 2 decimal places
                                                    const integerPart = value.substring(0, decimalIndex);
                                                    let decimalPart = value.substring(decimalIndex + 1);
                                                    
                                                    if (decimalPart.length > 2) {
                                                        decimalPart = decimalPart.substring(0, 2);
                                                    }
                                                    
                                                    e.target.value = integerPart + '.' + decimalPart;
                                                } else {
                                                    e.target.value = value;
                                                }
                                            });
                                            
                                            // Format to 2 decimal places when losing focus
                                            input.addEventListener('blur', function(e) {
                                                if (e.target.value) {
                                                    const value = parseFloat(e.target.value);
                                                    if (!isNaN(value)) {
                                                        e.target.value = value.toFixed(2);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                    
                                    // Validate min age
                                    const ageInput = document.getElementById('edad');
                                    if (ageInput) {
                                        ageInput.addEventListener('input', function(e) {
                                            let value = parseInt(e.target.value);
                                            if (value < 18) {
                                                ageInput.setCustomValidity('La edad mínima es 18 años');
                                            } else {
                                                ageInput.setCustomValidity('');
                                            }
                                        });
                                    }
                                    
                                    // Email validation
                                    const emailInput = document.getElementById('correo');
                                    if (emailInput) {
                                        emailInput.addEventListener('input', function(e) {
                                            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/;
                                            
                                            if (e.target.value && !emailPattern.test(e.target.value)) {
                                                emailInput.setCustomValidity('Por favor ingrese un correo electrónico válido');
                                            } else {
                                                emailInput.setCustomValidity('');
                                            }
                                        });
                                    }
                                };
                                
                                // Show custom alert banner
                                const showAlert = function(message) {
                                    alertMessage.textContent = message;
                                    alertBanner.classList.remove('hidden');
                                    
                                    // Scroll to the alert banner
                                    alertBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                    
                                    // Auto hide after 5 seconds
                                    setTimeout(() => {
                                        alertBanner.classList.add('hidden');
                                    }, 5000);
                                };
                                
                                // Function to show a specific step
                                function showStep(stepNumber) {
                                    // Hide all steps
                                    steps.forEach(step => {
                                        if (step) step.classList.add('hidden');
                                    });
                                    
                                    // Show current step
                                    const currentStepEl = steps[stepNumber - 1];
                                    if (currentStepEl) currentStepEl.classList.remove('hidden');
                                    
                                    // Update indicators
                                    indicators.forEach((indicator, i) => {
                                        const numElement = indicator.querySelector('div:first-child');
                                        const textElement = indicator.querySelector('span');
                                        
                                        if (i < stepNumber - 1) {
                                            // Completed step
                                            numElement.classList.remove('bg-white', 'text-primary', 'border-primary', 'border-2');
                                            numElement.classList.add('bg-green-500', 'text-white');
                                            numElement.innerHTML = '<i class="ri-check-line"></i>';
                                            textElement.classList.remove('text-gray-500');
                                            textElement.classList.add('text-green-500', 'font-medium');
                                        } else if (i === stepNumber - 1) {
                                            // Current step
                                            numElement.classList.remove('bg-white', 'text-primary', 'border-primary', 'border-2', 'bg-green-500');
                                            numElement.classList.add('bg-primary', 'text-white');
                                            if (i === 0) numElement.innerHTML = '<i class="ri-user-line"></i>';
                                            if (i === 1) numElement.innerHTML = '<i class="ri-money-dollar-circle-line"></i>';
                                            if (i === 2) numElement.innerHTML = '<i class="ri-file-list-3-line"></i>';
                                            textElement.classList.remove('text-gray-500', 'text-green-500');
                                            textElement.classList.add('text-primary', 'font-medium');
                                        } else {
                                            // Future steps
                                            numElement.classList.remove('bg-primary', 'text-white', 'bg-green-500');
                                            numElement.classList.add('bg-white', 'text-primary', 'border-primary', 'border-2');
                                            if (i === 0) numElement.innerHTML = '<i class="ri-user-line"></i>';
                                            if (i === 1) numElement.innerHTML = '<i class="ri-money-dollar-circle-line"></i>';
                                            if (i === 2) numElement.innerHTML = '<i class="ri-file-list-3-line"></i>';
                                            textElement.classList.remove('text-primary', 'font-medium', 'text-green-500');
                                            textElement.classList.add('text-gray-500');
                                        }
                                    });
                                    
                                    // Hide alert banner when changing steps
                                    alertBanner.classList.add('hidden');
                                    
                                    currentStep = stepNumber;
                                }
                                
                                // Previous buttons event listeners
                                prevButtons.forEach(button => {
                                    button.addEventListener('click', function() {
                                        if (currentStep > 1) {
                                            showStep(currentStep - 1);
                                        }
                                    });
                                });
                                
                                // Next buttons event listeners
                                nextButtons.forEach(button => {
                                    button.addEventListener('click', function() {
                                        if (currentStep < totalSteps) {
                                            // Validate current step fields before proceeding
                                            const currentStepEl = steps[currentStep - 1];
                                            const requiredInputs = currentStepEl.querySelectorAll('input[required], select[required]');
                                            let isValid = true;
                                            let firstInvalidInput = null;
                                            
                                            requiredInputs.forEach(input => {
                                                // Check custom validity
                                                if (input.validity.customError) {
                                                    isValid = false;
                                                    input.classList.remove('border-primary');
                                                    input.classList.add('border-red-500');
                                                    
                                                    if (!firstInvalidInput) firstInvalidInput = input;
                                                    return;
                                                }
                                                
                                                // Check email format
                                                if (input.type === 'email' && input.value) {
                                                    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/;
                                                    if (!emailPattern.test(input.value)) {
                                                        isValid = false;
                                                        input.classList.remove('border-primary');
                                                        input.classList.add('border-red-500');
                                                        
                                                        if (!firstInvalidInput) firstInvalidInput = input;
                                                        return;
                                                    }
                                                }
                                                
                                                // Check if field is empty
                                                if (!input.value.trim()) {
                                                    isValid = false;
                                                    input.classList.remove('border-primary');
                                                    input.classList.add('border-red-500');
                                                    
                                                    if (!firstInvalidInput) firstInvalidInput = input;
                                                } else {
                                                    input.classList.remove('border-red-500');
                                                    input.classList.add('border-primary');
                                                }
                                            });
                                            
                                            if (isValid) {
                                                showStep(currentStep + 1);
                                            } else {
                                                showAlert('Por favor complete todos los campos obligatorios correctamente.');
                                                
                                                // Focus on first invalid input
                                                if (firstInvalidInput) {
                                                    firstInvalidInput.focus();
                                                }
                                            }
                                        }
                                    });
                                });
                                
                                // Form submission
                                form.addEventListener('submit', function(e) {
                                    e.preventDefault();
                                    
                                    // Validate final step fields
                                    const lastStepEl = steps[totalSteps - 1];
                                    const requiredInputs = lastStepEl.querySelectorAll('input[required], select[required]');
                                    let isValid = true;
                                    let firstInvalidInput = null;
                                    
                                    requiredInputs.forEach(input => {
                                        if (input.type === 'checkbox') {
                                            if (!input.checked) {
                                                isValid = false;
                                                if (!firstInvalidInput) firstInvalidInput = input;
                                            }
                                        } else if (!input.value.trim()) {
                                            isValid = false;
                                            input.classList.remove('border-primary');
                                            input.classList.add('border-red-500');
                                            
                                            if (!firstInvalidInput) firstInvalidInput = input;
                                        } else {
                                            input.classList.remove('border-red-500');
                                            input.classList.add('border-primary');
                                        }
                                    });
                                    
                                    if (!isValid) {
                                        showAlert('Por favor complete todos los campos obligatorios correctamente.');
                                        
                                        // Focus on first invalid input
                                        if (firstInvalidInput) {
                                            firstInvalidInput.focus();
                                        }
                                        
                                        return;
                                    }

                                    const submitBtn = submitButton;
                                    if (submitBtn.disabled) return;
                                    
                                    submitBtn.disabled = true;
                                    submitBtn.innerHTML = 'Enviando...';
                                    
                                    // Get form data
                                    const formData = new FormData(form);
                                    const jsonData = {};
                                    formData.forEach((value, key) => {
                                        jsonData[key] = value;
                                    });
                                    
                                    // Submit form via AJAX - using existing API endpoint
                                    fetch('/api/forms/' + (form.closest('.precalificador-form').getAttribute('data-form-id') || '1') + '/submit', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                                        },
                                        body: JSON.stringify(jsonData)
                                    })
                                    .then(response => {
                                        // First check if response is ok
                                        if (!response.ok) {
                                            throw new Error('Error ' + response.status + ': ' + response.statusText);
                                        }
                                        
                                        // Check content type to ensure it's JSON
                                        const contentType = response.headers.get('content-type');
                                        if (!contentType || !contentType.includes('application/json')) {
                                            throw new Error('La respuesta no es JSON válido. Tipo recibido: ' + contentType);
                                        }
                                        
                                        return response.json();
                                    })
                                    .then(data => {
                                        submitBtn.disabled = false;
                                        submitBtn.innerHTML = 'Enviar solicitud';
                                        
                                        if (data.success) {
                                            // Show success message
                                            form.reset();
                                            form.classList.add('hidden');
                                            const successMessage = document.getElementById('form_success');
                                            if (successMessage) {
                                                successMessage.classList.remove('hidden');
                                                
                                                // Optionally redirect after successful submission
                                                if (data.redirect_url) {
                                                    setTimeout(() => {
                                                        window.location.href = data.redirect_url;
                                                    }, 2000);
                                                }
                                            }
                                        } else {
                                            // Show error messages in banner
                                            let errorMessage = 'Ocurrió un error al procesar su solicitud.';
                                            
                                            if (data.errors) {
                                                if (typeof data.errors === 'string') {
                                                    errorMessage = data.errors;
                                                } else if (typeof data.errors === 'object') {
                                                    // Get first error message
                                                    const firstKey = Object.keys(data.errors)[0];
                                                    if (firstKey && data.errors[firstKey][0]) {
                                                        errorMessage = data.errors[firstKey][0];
                                                    }
                                                }
                                            }
                                            
                                            showAlert(errorMessage);
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error submitting form:', error);
                                        submitBtn.disabled = false;
                                        submitBtn.innerHTML = 'Enviar solicitud';
                                        
                                        showAlert('Error al enviar el formulario: ' + error.message);
                                    });
                                });
                                
                                // Initialize masks and validations
                                initInputMasks();
                                
                                // Initialize first step
                                showStep(1);
                            }
                        });
                    </script>
                    `;

                this.set("content", formHTML);
            },
        },
    });

    // Register command for creating form in database
    editor.Commands.add("create-form-in-db", {
        run: function (editor, sender) {
            createFormInDatabase(editor);
        },
    });

    // Add the block to the block manager
    editor.BlockManager.add("precalificador-form-block", {
        label: "Precalificador de Créditos",
        category: "Formularios",
        attributes: { class: "gjs-block-section" },
        media: formStepsSvg,
        content: { type: "precalificador-form" },
    });

    // Add listener for when the block is added
    editor.on("component:add", (component) => {
        if (component.get("type") === "precalificador-form") {
            // Show notification recommending to generate the table in the database
            setTimeout(() => {
                showAlert(
                    "Para que el formulario funcione correctamente, recuerda generar la tabla en base de datos usando el botón en el panel de propiedades.",
                    "info",
                    8000,
                );
            }, 1000);
        }
    });
}

// Create form in database to collect submissions
function createFormInDatabase(editor) {
    // Get the selected component (our form)
    const selectedComponent = editor.getSelected();

    // Show loading message with SweetAlert (keep this for the loading state)
    const loading = {
        title: "Creando formulario",
        text: "Por favor espere mientras se crea el formulario en la base de datos...",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        },
    };

    Swal.fire(loading);

    // Prepare form data
    const formData = {
        title: "Precalificador de Créditos",
        description: "Formulario para precalificación de créditos",
        fields: [
            {
                type: "text",
                label: "Nombres",
                name: "nombres",
                required: true,
            },
            {
                type: "text",
                label: "Apellidos",
                name: "apellidos",
                required: true,
            },
            {
                type: "text",
                label: "Número de DUI",
                name: "dui",
                required: true,
            },
            {
                type: "number",
                label: "Edad",
                name: "edad",
                required: true,
            },
            {
                type: "tel",
                label: "Teléfono",
                name: "telefono",
                required: true,
            },
            {
                type: "email",
                label: "Correo Electrónico",
                name: "correo",
                required: true,
            },
            {
                type: "number",
                label: "Ingreso Mensual",
                name: "ingreso_mensual",
                required: true,
            },
            {
                type: "select",
                label: "Tipo de Empleo",
                name: "tipo_empleo",
                required: true,
                options: ["Formal", "Informal", "Negocio propio", "Jubilado"],
            },
            {
                type: "number",
                label: "Antigüedad Laboral",
                name: "antiguedad_laboral",
                required: true,
            },
            {
                type: "number",
                label: "Monto Solicitado",
                name: "monto_solicitado",
                required: true,
            },
            {
                type: "select",
                label: "Plazo en Meses",
                name: "plazo_meses",
                required: true,
                options: ["12", "24", "36", "48", "60"],
            },
            {
                type: "checkbox",
                label: "Acepto términos y condiciones",
                name: "acepto_terminos",
                required: true,
            },
        ],
        submit_button_text: "Enviar solicitud",
        success_message:
            "Su solicitud ha sido enviada correctamente. Nos pondremos en contacto con usted pronto.",
        status: "active",
    };

    // Send request to create form
    fetch("/api/forms/create-precalificador", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Error al crear formulario: " + response.statusText,
                );
            }
            return response.json();
        })
        .then((data) => {
            Swal.close();

            if (data.success) {
                // Update the form-id attribute
                selectedComponent.set("attributes", {
                    ...selectedComponent.getAttributes(),
                    "data-form-id": data.formId,
                });

                // Show success notification with Toastify instead of Swal
                showAlert(
                    `Formulario creado correctamente con ID: ${data.formId}`,
                    "success",
                    5000,
                );
            } else {
                // Show error notification with Toastify
                showAlert(
                    data.message || "Error desconocido al crear el formulario",
                    "error",
                    5000,
                );
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            Swal.close();
            // Show error notification with Toastify
            showAlert("Error: " + error.message, "error", 5000);
        });
}
