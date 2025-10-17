// blocks/accountTypesBlock.js

// Registers a new block for displaying account types with tabbed navigation
export default function loadAccountTypesBlock(editor) {
    const accountTypesSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="16" height="3" fill="white" />
      <rect x="4" y="8" width="7" height="1" fill="#ffffff" />
      <rect x="12" y="8" width="8" height="1" fill="#ffffff" />
      <line x1="11.5" y1="8" x2="11.5" y2="20" stroke="#cccccc" stroke-width="0.5" />
      <rect x="4" y="10" width="6" height="1" fill="#ffffff" />
      <rect x="13" y="10" width="7" height="1" fill="#ffffff" />
      <rect x="4" y="12" width="5" height="1" fill="#ffffff" />
      <rect x="13" y="12" width="6" height="1" fill="#ffffff" />
      <rect x="4" y="15" width="16" height="0.5" fill="#cccccc" />
      <rect x="4" y="17" width="16" height="1" fill="#ffffff" />
    </svg>`;

    editor.BlockManager.add("account-types-block", {
        label: "Tipos de Cuenta",
        category: "Componentes",
        attributes: { class: "gjs-block-section" },
        media: accountTypesSvg,
        content: `
            <section class="account-types-container py-8 md:py-12 bg-white" data-gjs-type="account-types">
                <div class="max-w-7xl mx-auto px-4">
                    <h2 class="text-3xl font-bold text-primary mb-6">Conoce nuestros créditos</h2>
                    
                    <div class="account-tabs mb-6 flex flex-wrap gap-3">
                        <button class="account-tab-btn bg-primary text-white py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="personal">Personal</button>
                        <button class="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="infanto-juvenil">Infanto Juvenil</button>
                        <button class="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="premium">Premium</button>
                        <button class="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="diamante">Diamante</button>
                        <button class="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="deposito">Depósito a Plazo</button>
                    </div>
                    
                    <div class="account-panels">
                        <div class="account-panel-group" data-type="personal">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de aportaciones</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Seguro de vida gratis (por fallecimiento o incapacidad parcial o permanente).</li>
                                            <li>Puede pagar sus cuotas de aportaciones por medio de un cargo automático aplicado a su cuenta de ahorros.</li>
                                            <li>Sin recargos.</li>
                                            <li>Participe en promociones y goce de los beneficios por mantener su cuenta al día.</li>
                                            <li>Devolución de excedentes anuales.</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Ser asociado y aperturar la cuenta con un mínimo de $6.00.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="pt-8 border-t-4 border-gray-200">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ahorro personal</h3>
                                <p class="text-lg text-primary font-medium mb-3">AHORRAR ES TU MEJOR OPCIÓN</p>
                                <div>
                                    <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                        <li>Tasa de interés competitivas</li>
                                        <li>Seguro gratis en tu cuenta de ahorros hasta un monto de $1,500.00</li>
                                        <li>Capitalización trimestral de intereses</li>
                                        <li>Disponibilidad de fondos inmediatos.</li>
                                        <li>Sin recargos.</li>
                                        <li>Promociones y beneficios al estar al día.</li>
                                        <li>Puedes adquirirla con tarjeta de débito</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-panel-group hidden" data-type="infanto-juvenil">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ahorro infanto juvenil</h3>
                                <p class="text-lg text-primary font-medium mb-3">INVIERTE EN SU FUTURO</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Tasa de interés competitivas</li>
                                            <li>Capitalización trimestral de intereses.</li>
                                            <li>Disponibilidad de retiro a la vista.</li>
                                            <li>Se fomenta la disciplina del ahorro.</li>
                                            <li>Promociones y beneficios al estar al día.</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Beneficiario de la cuenta debe ser menor de 18 años.</li>
                                            <li>Completar y firmar declaración jurada del parentesco con el menor autenticada por notario.</li>
                                            <li>Monto mínimo de apertura $25.00</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-panel-group hidden" data-type="premium">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ahorro premium</h3>
                                <p class="text-lg text-primary font-medium mb-3">HAZ TU MEJOR INVERSIÓN</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Cuotas a la medida</li>
                                            <li>Seguro de vida opcional hasta por el monto proyectado de ahorro.</li>
                                            <li>Créditos automáticos con plazos de 1 a 3 años, hasta un 90% de su saldo contractual.</li>
                                            <li>Si estás al día puedes adelantar cuotas de ahorro amortizando mayor cantidad de capital.</li>
                                            <li>Disponibilidad de fondos de saldo capital.</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Ser asociado.</li>
                                            <li>Monto mínimo de apertura $10.00</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-panel-group hidden" data-type="diamante">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ahorro diamante</h3>
                                <p class="text-lg text-primary font-medium mb-3">MULTIPLICA TUS SUEÑOS</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>La cuenta de ahorro que genera mayor rendimiento.</li>
                                            <li>Cinco planes disponibles con plazos de 3.5 o 6 años.</li>
                                            <li>Capitalización trimestral de intereses</li>
                                            <li>Depósitos y retiros ilimitados siempre y cuando se mantenga el saldo mínimo pactado.</li>
                                            <li>Disponibilidad de apertura para personas naturales y jurídicas.</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Ser socio de COMEDICA.</li>
                                            <li>Seleccionar uno de los planes y depositar al menos el monto mínimo de acuerdo a dicho plan.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-panel-group hidden" data-type="deposito">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Depósito a plazo fijo</h3>
                                <p class="text-lg text-primary font-medium mb-3">INVIERTE EN TU FUTURO HOY</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Excelentes tasas de interés</li>
                                            <li>Acceso a un crédito automático garantizado por el depósito.</li>
                                            <li>Sin cobro de comisiones por servicio.</li>
                                            <li>Plazos disponibles: (Desde 30 a 1800 días)</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Ser asociado, mostrar y aperturar el depósito con un mínimo de $115.00</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="pt-8 border-t-4 border-gray-200">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta corriente</h3>
                                <p class="text-lg text-primary font-medium mb-3">APERTURA TU CUENTA Y ASEGURATE DE LLEVAR EL CONTROL DE TUS FINANZAS</p>
                                <div>
                                    <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                        <li>Liberación de fondos con cheques propios al instante y cheques de otros bancos en 5 horas.</li>
                                        <li>Podrás hacer uso de tus fondos el mismo día</li>
                                        <li>Chequera personalizada</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `,
    });

    editor.DomComponents.addType("account-types", {
        isComponent: function (el) {
            return (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === "account-types"
            );
        },
        model: {
            defaults: {
                tagName: 'section',
                draggable: true,
                droppable: false,
                attributes: {
                    'data-gjs-type': 'account-types',
                    'class': 'account-types-container py-8 md:py-12 bg-white'
                },
                name: "Tipos de Cuenta",
                traits: [
                    {
                        type: "select",
                        name: "data-active",
                        label: "Tab activo inicial",
                        options: [
                            { id: "personal", name: "Personal" },
                            { id: "infanto-juvenil", name: "Infanto Juvenil" },
                            { id: "premium", name: "Premium" },
                            { id: "diamante", name: "Diamante" },
                            { id: "deposito", name: "Depósito a Plazo" },
                        ],
                        default: "personal",
                    },
                    {
                        type: "number",
                        name: "tab-count",
                        label: "Número de tabs",
                        min: 1,
                        max: 8,
                        default: 5,
                    },
                    {
                        type: "text",
                        name: "tab-1-name",
                        label: "Nombre Tab 1",
                        default: "Personal",
                    },
                    {
                        type: "text",
                        name: "tab-2-name",
                        label: "Nombre Tab 2",
                        default: "Infanto Juvenil",
                    },
                    {
                        type: "text",
                        name: "tab-3-name",
                        label: "Nombre Tab 3",
                        default: "Premium",
                    },
                    {
                        type: "text",
                        name: "tab-4-name",
                        label: "Nombre Tab 4",
                        default: "Diamante",
                    },
                    {
                        type: "text",
                        name: "tab-5-name",
                        label: "Nombre Tab 5",
                        default: "Depósito a Plazo",
                    },
                    {
                        type: "text",
                        name: "tab-6-name",
                        label: "Nombre Tab 6 (opcional)",
                        default: "Tab 6",
                    },
                    {
                        type: "text",
                        name: "tab-7-name",
                        label: "Nombre Tab 7 (opcional)",
                        default: "Tab 7",
                    },
                    {
                        type: "text",
                        name: "tab-8-name",
                        label: "Nombre Tab 8 (opcional)",
                        default: "Tab 8",
                    },
                ],
                script: function () {
                    const container = this;
                    const tabButtons =
                        container.querySelectorAll(".account-tab-btn");
                    const panelGroups = container.querySelectorAll(
                        ".account-panel-group",
                    );
                    const defaultActive =
                        container.getAttribute("data-active") || "personal";

                    tabButtons.forEach((btn) => {
                        btn.addEventListener("click", function () {
                            const tabType = this.getAttribute("data-type");

                            tabButtons.forEach((b) => {
                                if (b === this) {
                                    b.classList.remove(
                                        "bg-white",
                                        "text-primary",
                                    );
                                    b.classList.add("bg-primary", "text-white");
                                } else {
                                    b.classList.remove(
                                        "bg-primary",
                                        "text-white",
                                    );
                                    b.classList.add("bg-white", "text-primary");
                                }
                            });

                            panelGroups.forEach((panel) => {
                                if (
                                    panel.getAttribute("data-type") === tabType
                                ) {
                                    panel.classList.remove("hidden");
                                } else {
                                    panel.classList.add("hidden");
                                }
                            });
                        });
                    });

                    const activeBtn = Array.from(tabButtons).find(
                        (btn) =>
                            btn.getAttribute("data-type") === defaultActive,
                    );

                    if (activeBtn) {
                        activeBtn.click();
                    } else if (tabButtons.length > 0) {
                        tabButtons[0].click();
                    }
                },
            },
            init() {
                this.on("change:attributes:tab-count", this.updateTabs);
                for (let i = 1; i <= 8; i++) {
                    this.on(
                        `change:attributes:tab-${i}-name`,
                        this.updateTabNames,
                    );
                }
                this.on("change:attributes:data-active", this.updateActiveTab);

                // Add this line to initialize on component load
                setTimeout(() => this.initializeScript(), 300);
            },
            initializeScript() {
                const script = this.get("script");
                const el = this.view?.el;
                if (script && el) {
                    script.call(el);
                }
            },
            updateTabs() {
                const count = parseInt(
                    this.get("attributes")["tab-count"] || 5,
                );
                const tabsContainer =
                    this.view.el.querySelector(".account-tabs");
                const panelsContainer =
                    this.view.el.querySelector(".account-panels");

                if (!tabsContainer || !panelsContainer) return;

                const currentTabs =
                    tabsContainer.querySelectorAll(".account-tab-btn");
                const currentGroups = panelsContainer.querySelectorAll(
                    ".account-panel-group",
                );

                const defaultTabNames = [
                    "Personal",
                    "Infanto Juvenil",
                    "Premium",
                    "Diamante",
                    "Depósito a Plazo",
                    "Tab 6",
                    "Tab 7",
                    "Tab 8",
                ];

                const defaultDataTypes = [
                    "personal",
                    "infanto-juvenil",
                    "premium",
                    "diamante",
                    "deposito",
                    "tab-6",
                    "tab-7",
                    "tab-8",
                ];

                const existingTypes = Array.from(currentTabs).map((tab) =>
                    tab.getAttribute("data-type"),
                );

                tabsContainer.innerHTML = "";

                for (let i = 0; i < count; i++) {
                    const tabName =
                        this.get("attributes")[`tab-${i + 1}-name`] ||
                        defaultTabNames[i];
                    const tabType = existingTypes[i] || defaultDataTypes[i];

                    const tabBtn = document.createElement("button");
                    tabBtn.className =
                        "account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300";
                    tabBtn.setAttribute("data-type", tabType);
                    tabBtn.textContent = tabName;
                    tabsContainer.appendChild(tabBtn);

                    let panelGroup = Array.from(currentGroups).find(
                        (group) => group.getAttribute("data-type") === tabType,
                    );

                    if (!panelGroup) {
                        panelGroup = document.createElement("div");
                        panelGroup.className = "account-panel-group hidden";
                        panelGroup.setAttribute("data-type", tabType);

                        let template;

                        if (i < 2) {
                            // For Personal and Infanto Juvenil, two-column layout
                            template = `
                                <div class="mb-8">
                                    <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ${tabName.toLowerCase()}</h3>
                                    <p class="text-lg text-primary font-medium mb-3">DESCRIPCIÓN DESTACADA</p>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        <div class="benefits-column">
                                            <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                                <li>Beneficio 1</li>
                                                <li>Beneficio 2</li>
                                                <li>Beneficio 3</li>
                                            </ul>
                                        </div>
                                        <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                            <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                                <li>Requisito 1</li>
                                                <li>Requisito 2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else {
                            // For others, single column layout
                            template = `
                                <div class="mb-8">
                                    <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ${tabName.toLowerCase()}</h3>
                                    <p class="text-lg text-primary font-medium mb-3">DESCRIPCIÓN DESTACADA</p>
                                    <div>
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Beneficio 1</li>
                                            <li>Beneficio 2</li>
                                            <li>Beneficio 3</li>
                                        </ul>
                                    </div>
                                </div>
                            `;
                        }

                        panelGroup.innerHTML = template;
                        panelsContainer.appendChild(panelGroup);
                    }
                }

                Array.from(currentGroups).forEach((group) => {
                    const type = group.getAttribute("data-type");
                    const stillExists = Array.from(
                        tabsContainer.querySelectorAll(".account-tab-btn"),
                    ).some((tab) => tab.getAttribute("data-type") === type);

                    if (!stillExists) {
                        group.remove();
                    }
                });

                const activeTab =
                    this.get("attributes")["data-active"] || "personal";
                setTimeout(() => {
                    const script = this.get("script");
                    const el = this.view.el;
                    if (script && el) {
                        script.call(el);
                    }
                }, 100);
            },
            updateTabNames() {
                const tabsContainer =
                    this.view.el.querySelector(".account-tabs");
                if (!tabsContainer) return;

                const tabs = tabsContainer.querySelectorAll(".account-tab-btn");

                for (let i = 0; i < tabs.length; i++) {
                    const nameAttr = `tab-${i + 1}-name`;
                    const newName = this.get("attributes")[nameAttr];

                    if (newName && tabs[i]) {
                        tabs[i].textContent = newName;
                    }
                }
            },
            updateActiveTab() {
                const activeTab = this.get("attributes")["data-active"];
                if (!activeTab) return;

                const el = this.view.el;
                if (el) {
                    const script = this.get("script");
                    if (script) {
                        script.call(el);
                    }
                }
            },
        },
        view: {
            onRender() {
                setTimeout(() => {
                    const el = this.el;
                    const script = this.model.get("script");
                    if (script && el) {
                        script.call(el);
                    }
                }, 100);
            },
        },
    });
}
