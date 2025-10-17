/**
 * Account Selector Block for GrapesJS with script persistence
 */
export default function loadAccountSelectorBlock(editor) {
    const blockManager = editor.BlockManager;

    // Register custom script in the global editor JS
    addAccountSelectorGlobalScript(editor);

    blockManager.add("account-selector-block", {
        label: "Selector de Cuentas",
        category: "Componentes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="3" fill="#ffffff" stroke="#dddddd"/>
            <rect x="4" y="6" width="10" height="2" rx="1" fill="#23366A"/>
            <rect x="4" y="9" width="16" height="1" fill="#999999"/>
            <rect x="5" y="12" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <rect x="9" y="12" width="3" height="2" rx="1" fill="#23366A" stroke="#23366A"/>
            <rect x="13" y="12" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <rect x="5" y="16" width="14" height="3" rx="1" fill="#f0f0f0"/>
        </svg>`,
        content: `
        <section class="account-selector-container py-12 px-4 md:px-8 lg:px-16" data-gjs-type="account-selector" data-active="-1">
            <div class="bg-white shadow-lg rounded-3xl p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
                <div class="account-header transition-all duration-300 mb-8">
                    <div class="flex justify-between items-center">
                        <h2 class="account-title text-4xl md:text-4xl font-bold text-primary text-center transition-all duration-300 flex-grow">Cuentas</h2>
                        <button class="close-btn opacity-0 invisible w-8 h-8 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center">
                            <i class="ri-close-line text-lg"></i>
                        </button>
                    </div>
                    <p class="account-description text-gray-500 text-center mt-3 max-w-3xl mx-auto transition-all duration-300">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                </div>
                
                <div class="buttons-container flex flex-wrap justify-center gap-3 md:gap-4 mb-8 transition-all duration-300">
                    <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="0">Personal</button>
                    <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="1">Infanto Juvenil</button>
                    <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="2">Premium</button>
                    <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="3">Diamante</button>
                    <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="4">Depósito a Plazo</button>
                </div>
                
                <div class="account-panel hidden transition-all duration-300">
                    <h3 class="text-3xl font-bold text-primary mb-1">Cuenta de ahorro personal</h3>
                    <p class="text-primary font-semibold uppercase text-xl mb-4">AHORRAR ES TU MEJOR OPCION</p>
                    <h4 class="font-bold text-primary text-lg mb-2">Beneficios:</h4>
                    <ul class="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Tasa de interés competitivas</li>
                        <li>Seguro gratis en tu cuenta de ahorros hasta un monto de $1,500.00</li>
                        <li>Capitalización trimestral de intereses</li>
                        <li>Disponibilidad de fondos inmediatos</li>
                        <li>Sin recargos</li>
                        <li>Promociones y beneficios al estar al día</li>
                        <li>Puedes adquirirla con tarjeta de débito</li>
                    </ul>
                </div>
                
                <div class="account-panel hidden transition-all duration-300">
                    <h3 class="text-3xl font-bold text-primary mb-1">Cuenta de ahorro infanto juvenil</h3>
                    <p class="text-primary font-semibold uppercase text-xl mb-4">INVIERTE EN SU FUTURO</p>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="font-bold text-primary text-lg mb-2">Beneficios:</h4>
                            <ul class="list-disc pl-5 space-y-1 text-gray-700">
                                <li>Tasa de interés competitivas</li>
                                <li>Capitalización trimestral de intereses</li>
                                <li>Disponibilidad de retiro a la vista</li>
                                <li>Se fomenta la disciplina del ahorro</li>
                                <li>Promociones y beneficios al estar al día</li>
                            </ul>
                        </div>
                        <div class="md:border-l-2 md:border-gray-400 md:pl-8">
                            <h4 class="font-bold text-primary text-lg mb-2">Requisitos:</h4>
                            <ul class="list-disc pl-5 space-y-1 text-gray-700">
                                <li>Beneficiario de la cuenta debe ser menor de 18 años</li>
                                <li>Completar y firmar declaración jurada del parentesco con el menor autenticada por notario</li>
                                <li>Monto mínimo de apertura $25.00</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="account-panel hidden transition-all duration-300">
                    <h3 class="text-3xl font-bold text-primary mb-1">Cuenta de ahorro premium</h3>
                    <p class="text-primary font-semibold uppercase text-xl mb-4">HAZ TU MEJOR INVERSIÓN</p>
                    <h4 class="font-bold text-primary text-lg mb-2">Beneficios:</h4>
                    <ul class="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Cuotas a la medida</li>
                        <li>Seguro de vida opcional hasta por el monto proyectado de ahorro</li>
                        <li>Créditos automáticos con plazos de 1 a 3 años, hasta un 50% de su saldo contractual</li>
                        <li>Si estás al día puedes adelantar cuotas de ahorro amortizando mayor cantidad de capital</li>
                        <li>Disponibilidad de fondos de saldo capital</li>
                    </ul>
                </div>
                
                <div class="account-panel hidden transition-all duration-300">
                    <h3 class="text-3xl font-bold text-primary mb-1">Cuenta de ahorro diamante</h3>
                    <p class="text-primary font-semibold uppercase text-xl mb-4">MULTIPLICA TUS SUEÑOS</p>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="font-bold text-primary text-lg mb-2">Beneficios:</h4>
                            <ul class="list-disc pl-5 space-y-1 text-gray-700">
                                <li>La cuenta de ahorro que genera mayor rendimiento</li>
                                <li>Cinco planes disponibles con plazos de 3.5 o 6 años</li>
                                <li>Capitalización trimestral de intereses</li>
                                <li>Depósitos y retiros ilimitados siempre y cuando se mantenga el saldo mínimo pactado</li>
                                <li>Disponibilidad de apertura para personas naturales y jurídicas</li>
                            </ul>
                        </div>
                        <div class="md:border-l-2 md:border-gray-400 md:pl-8">
                            <h4 class="font-bold text-primary text-lg mb-2">Requisitos:</h4>
                            <ul class="list-disc pl-5 space-y-1 text-gray-700">
                                <li>Ser socio de COMEDICA</li>
                                <li>Seleccionar uno de los planes y depositar al menos el monto mínimo de acuerdo a dicho plan</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="account-panel hidden transition-all duration-300">
                    <h3 class="text-3xl font-bold text-primary mb-1">Depósito a plazo fijo</h3>
                    <p class="text-primary font-semibold uppercase text-xl mb-4">INVIERTE EN TU FUTURO HOY</p>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="font-bold text-primary text-lg mb-2">Beneficios:</h4>
                            <ul class="list-disc pl-5 space-y-1 text-gray-700">
                                <li>Excelentes tasas de interés</li>
                                <li>Acceso a un crédito automático garantizado por el depósito</li>
                                <li>Sin cobro de comisiones por servicio</li>
                                <li>Plazos disponibles: (Desde 30 a 1800 días)</li>
                            </ul>
                        </div>
                        <div class="md:border-l-2 md:border-gray-400 md:pl-8">
                            <h4 class="font-bold text-primary text-lg mb-2">Requisitos:</h4>
                            <ul class="list-disc pl-5 space-y-1 text-gray-700">
                                <li>Ser asociado, mostrar y aperturar el depósito con un mínimo de $115.00</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
    });

    // Register the component type
    editor.DomComponents.addType("account-selector", {
        model: {
            defaults: {
                name: "Selector de Cuentas",
                traits: [
                    {
                        type: "select",
                        name: "data-active",
                        label: "Cuenta activa inicial",
                        options: [
                            { id: "-1", name: "Ninguna" },
                            { id: "0", name: "Personal" },
                            { id: "1", name: "Infanto Juvenil" },
                            { id: "2", name: "Premium" },
                            { id: "3", name: "Diamante" },
                            { id: "4", name: "Depósito a Plazo" },
                        ],
                    },
                ],
                script: function () {
                    // This script remains for compatibility but does very little
                    // We'll use global scripts for persistence
                    (function () {
                        const container = this;
                        // Add a class that our global script will look for
                        container.classList.add("account-selector-initialized");
                        // Set a data attribute to trigger initialization by the global script
                        container.setAttribute(
                            "data-account-selector-init",
                            "true",
                        );
                    }).bind(this)();
                },
            },
        },
        view: {
            init() {
                this.listenTo(
                    this.model,
                    "change:data-active",
                    this.updateScript,
                );
            },
            onRender() {
                // Trigger initialization in the editor
                setTimeout(() => {
                    initializeAccountSelectors();
                }, 500);
            },
        },
    });

    // Add custom styling for the editor
    editor.on("component:selected", (model) => {
        if (model.get("type") === "account-selector") {
            const style = document.createElement("style");
            style.innerHTML = `
                .account-header.active h2 {
                    font-size: 1.75rem;
                    margin-bottom: 0.5rem;
                }
                
                .account-panel:not(.hidden) {
                    animation: accountPanelFadeIn 0.3s ease;
                }
                
                @keyframes accountPanelFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);

            editor.once("component:deselected", () => {
                document.head.removeChild(style);
            });
        }
    });

    // Reinitialize all account selectors when the canvas loads
    editor.on("canvas:load", () => {
        setTimeout(() => {
            const frame = editor.Canvas.getFrameEl();
            if (frame && frame.contentDocument) {
                // Add the initialization function to the frame
                const scriptEl = frame.contentDocument.createElement("script");
                scriptEl.textContent = `(${initializeAccountSelectors.toString()})()`;
                frame.contentDocument.body.appendChild(scriptEl);
            }
        }, 1000);
    });

    // Also reinitialize on component add
    editor.on("component:add", (component) => {
        if (component.get("type") === "account-selector") {
            setTimeout(() => {
                const frame = editor.Canvas.getFrameEl();
                if (frame && frame.contentDocument) {
                    // Add the initialization function to the frame
                    const scriptEl =
                        frame.contentDocument.createElement("script");
                    scriptEl.textContent = `(${initializeAccountSelectors.toString()})()`;
                    frame.contentDocument.body.appendChild(scriptEl);
                }
            }, 500);
        }
    });
}

/**
 * Add global script to the editor
 */
function addAccountSelectorGlobalScript(editor) {
    // Function to initialize all account selectors
    const initScript = `
    function initializeAccountSelectors() {
        const containers = document.querySelectorAll('.account-selector-container');
        
        containers.forEach(container => {
            // Skip if already initialized
            if (container.hasAttribute('data-initialized')) return;
            
            const buttons = container.querySelectorAll('.account-type-btn');
            const panels = container.querySelectorAll('.account-panel');
            const header = container.querySelector('.account-header');
            const headerTitle = header ? header.querySelector('.account-title') : null;
            const headerDesc = header ? header.querySelector('.account-description') : null;
            const closeBtn = header ? header.querySelector('.close-btn') : null;
            const buttonsContainer = container.querySelector('.buttons-container');
            const defaultActive = parseInt(container.getAttribute('data-active') || '-1');
            
            // Add event listeners to all buttons
            buttons.forEach((btn, index) => {
                btn.addEventListener('click', function() {
                    activatePanel(index);
                });
            });
            
            // Add event listener to close button
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    activatePanel(-1);
                });
            }
            
            function activatePanel(index) {
                // Hide all panels and deactivate all buttons
                panels.forEach(panel => {
                    panel.classList.add('hidden');
                });
                
                buttons.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white');
                    btn.classList.add('bg-white', 'text-primary');
                });
                
                // If valid index, show selected panel and activate button
                if (index >= 0 && index < panels.length) {
                    panels[index].classList.remove('hidden');
                    buttons[index].classList.remove('bg-white', 'text-primary');
                    buttons[index].classList.add('bg-primary', 'text-white');
                    
                    if (header) header.classList.add('active');
                    if (headerTitle) {
                        headerTitle.classList.remove('text-center');
                        headerTitle.classList.add('text-left');
                    }
                    if (headerDesc) headerDesc.classList.add('hidden');
                    if (closeBtn) {
                        closeBtn.classList.remove('opacity-0', 'invisible');
                        closeBtn.classList.add('opacity-100', 'visible');
                    }
                    if (buttonsContainer) {
                        buttonsContainer.classList.remove('justify-center');
                        buttonsContainer.classList.add('justify-start');
                    }
                } else {
                    if (header) header.classList.remove('active');
                    if (headerTitle) {
                        headerTitle.classList.remove('text-left');
                        headerTitle.classList.add('text-center');
                    }
                    if (headerDesc) headerDesc.classList.remove('hidden');
                    if (closeBtn) {
                        closeBtn.classList.add('opacity-0', 'invisible');
                        closeBtn.classList.remove('opacity-100', 'visible');
                    }
                    if (buttonsContainer) {
                        buttonsContainer.classList.add('justify-center');
                        buttonsContainer.classList.remove('justify-start');
                    }
                }
            }
            
            // Set initial state
            if (defaultActive >= 0 && defaultActive < buttons.length) {
                activatePanel(defaultActive);
            }
            
            // Mark as initialized
            container.setAttribute('data-initialized', 'true');
        });
    }
    
    // Call the initialization function when DOM loads
    document.addEventListener('DOMContentLoaded', initializeAccountSelectors);
    
    // Also call it immediately in case DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initializeAccountSelectors, 100);
    }
    `;

    editor.on("canvas:load", () => {
        setTimeout(() => {
            const frame = editor.Canvas.getFrameEl();
            if (frame && frame.contentDocument) {
                const scriptEl = frame.contentDocument.createElement("script");
                scriptEl.textContent = initScript;
                frame.contentDocument.body.appendChild(scriptEl);
            }
        }, 500);
    });
}

/**
 * Initialize all account selectors on the page
 */
function initializeAccountSelectors() {
    const containers = document.querySelectorAll(".account-selector-container");

    containers.forEach((container) => {
        // Skip if already initialized
        if (container.hasAttribute("data-initialized")) return;

        const buttons = container.querySelectorAll(".account-type-btn");
        const panels = container.querySelectorAll(".account-panel");
        const header = container.querySelector(".account-header");
        const headerTitle = header
            ? header.querySelector(".account-title")
            : null;
        const headerDesc = header
            ? header.querySelector(".account-description")
            : null;
        const closeBtn = header ? header.querySelector(".close-btn") : null;
        const buttonsContainer = container.querySelector(".buttons-container");
        const defaultActive = parseInt(
            container.getAttribute("data-active") || "-1",
        );

        // Add event listeners to all buttons
        buttons.forEach((btn, index) => {
            btn.addEventListener("click", function () {
                activatePanel(index);
            });
        });

        // Add event listener to close button
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                activatePanel(-1);
            });
        }

        function activatePanel(index) {
            // Hide all panels and deactivate all buttons
            panels.forEach((panel) => {
                panel.classList.add("hidden");
            });

            buttons.forEach((btn) => {
                btn.classList.remove("bg-primary", "text-white");
                btn.classList.add("bg-white", "text-primary");
            });

            // If valid index, show selected panel and activate button
            if (index >= 0 && index < panels.length) {
                panels[index].classList.remove("hidden");
                buttons[index].classList.remove("bg-white", "text-primary");
                buttons[index].classList.add("bg-primary", "text-white");

                if (header) header.classList.add("active");
                if (headerTitle) {
                    headerTitle.classList.remove("text-center");
                    headerTitle.classList.add("text-left");
                }
                if (headerDesc) headerDesc.classList.add("hidden");
                if (closeBtn) {
                    closeBtn.classList.remove("opacity-0", "invisible");
                    closeBtn.classList.add("opacity-100", "visible");
                }
                if (buttonsContainer) {
                    buttonsContainer.classList.remove("justify-center");
                    buttonsContainer.classList.add("justify-start");
                }
            } else {
                if (header) header.classList.remove("active");
                if (headerTitle) {
                    headerTitle.classList.remove("text-left");
                    headerTitle.classList.add("text-center");
                }
                if (headerDesc) headerDesc.classList.remove("hidden");
                if (closeBtn) {
                    closeBtn.classList.add("opacity-0", "invisible");
                    closeBtn.classList.remove("opacity-100", "visible");
                }
                if (buttonsContainer) {
                    buttonsContainer.classList.add("justify-center");
                    buttonsContainer.classList.remove("justify-start");
                }
            }
        }

        // Set initial state
        if (defaultActive >= 0 && defaultActive < buttons.length) {
            activatePanel(defaultActive);
        }

        // Mark as initialized
        container.setAttribute("data-initialized", "true");
    });
}
