// blocks/creditTypesBlock.js - Custom block for displaying credit types with tabbed navigation
export default function loadCreditTypesBlock(editor) {
    // Register the credit card component
    editor.DomComponents.addType("credit-card", {
        isComponent: function (el) {
            return el.classList && el.classList.contains("credit-panel");
        },
        model: {
            defaults: {
                tagName: "div",
                draggable: true,
                droppable: true,
                attributes: {
                    class: "credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300",
                },
                name: "Tarjeta de Crédito",
                traits: [
                    {
                        type: "text",
                        name: "credit-title",
                        label: "Título del Crédito",
                    },
                ],
            },
            init() {
                this.on("change:attributes:credit-title", this.updateTitle);
                this.on("change:attributes:credit-icon", this.updateIcon);
            },
            updateTitle() {
                const title = this.get("attributes")["credit-title"];
                if (!title) return;

                const titleEl = this.view.el.querySelector("h3");
                if (titleEl) {
                    titleEl.textContent = title;
                }
            },
            updateIcon(iconClass) {
                const newIconClass =
                    iconClass || this.get("attributes")["credit-icon"];
                if (!newIconClass) return;

                const iconEl = this.view.el.querySelector("i");
                if (iconEl) {
                    // Remove all ri- classes
                    const classList = [...iconEl.classList];
                    classList.forEach((className) => {
                        if (
                            className.startsWith("ri-") &&
                            className !== "text-primary"
                        ) {
                            iconEl.classList.remove(className);
                        }
                    });
                    // Add the new icon class
                    iconEl.classList.add(newIconClass);
                }
            },
        },
    });

    // Create the credit card block
    editor.BlockManager.add("credit-card-block", {
        label: "Tarjeta de Crédito",
        category: "Componentes",
        content: {
            type: "credit-card",
            content: `
                <div class="flex items-center mb-3">
                    <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                    <h3 class="text-xl font-bold text-primary">Crédito Personal</h3>
                </div>
                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                    <li>
                        <span class="font-medium">Monto hasta $50,000.00</span>
                    </li>
                    <li>
                        <span>Plazo hasta 10 años</span>
                    </li>
                </ul>
            `,
        },
    });

    // Create the main credit types block
    const creditTypesSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="12" height="2" fill="white" />
      <rect x="4" y="7" width="16" height="1" fill="#cccccc" />
      <rect x="4" y="10" width="6" height="2" rx="1" fill="#ffffff" stroke="#23366A" stroke-width="1" />
      <rect x="11" y="10" width="6" height="2" rx="1" fill="#23366A" />
      <rect x="4" y="14" width="10" height="1" fill="white" />
      <rect x="4" y="16" width="8" height="1" fill="white" />
      <rect x="4" y="18" width="12" height="1" fill="white" />
    </svg>`;

    // This is our complete solution - we pre-generate all 10 tabs at once
    // All tab panels are created from the start, we just toggle visibility
    editor.BlockManager.add("credit-types-block", {
        label: "Tipos de Crédito",
        category: "Componentes",
        attributes: { class: "gjs-block-section" },
        media: creditTypesSvg,
        content: `
            <section class="credit-types-container py-8 md:py-12 bg-white" data-gjs-type="credit-types">
                <div class="max-w-7xl mx-auto px-4">
                    <h2 class="text-3xl font-bold text-primary mb-6">Conoce nuestros créditos</h2>
                    
                    <div class="credit-tabs mb-6 flex flex-wrap gap-3">
                        <button class="credit-tab-btn bg-primary text-white py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-1">Tab 1</button>
                        <button class="credit-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-2">Tab 2</button>
                        <button class="credit-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-3">Tab 3</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-4">Tab 4</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-5">Tab 5</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-6">Tab 6</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-7">Tab 7</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-8">Tab 8</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-9">Tab 9</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-10">Tab 10</button>
                    </div>
                    
                    <div class="credit-panels">
                        <div class="credit-panel-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-1">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 1</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $10,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 8 años.</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-user-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Personal</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $50,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 12 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-2">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-car-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 2</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $70,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 8 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-3">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-home-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 3</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto desde $50,000.00 hasta $700,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 30 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-4">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 4</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $50,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 10 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-5">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 5</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $50,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 10 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-6">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 6</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $50,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 10 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-7">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 7</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $50,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 10 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-8">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 8</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $50,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 10 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-9">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 9</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $50,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 10 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-type="tab-10">
                            <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300" data-gjs-type="credit-card">
                                <div class="flex items-center mb-3">
                                    <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                    <h3 class="text-xl font-bold text-primary">Crédito Tab 10</h3>
                                </div>
                                <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                    <li>
                                        <span class="font-medium">Monto hasta $50,000.00</span>
                                    </li>
                                    <li>
                                        <span>Plazo hasta 10 años</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `,
    });

    editor.DomComponents.addType("credit-types", {
        isComponent: function (el) {
            return (
                el.tagName === "SECTION" &&
                el.classList.contains("credit-types-container")
            );
        },
        model: {
            defaults: {
                tagName: "section",
                draggable: true,
                droppable: true,
                attributes: {
                    "data-gjs-type": "credit-types",
                    class: "credit-types-container py-8 md:py-12 bg-white",
                },
                name: "Tipos de Crédito",
                traits: [
                    {
                        type: "number",
                        name: "tab-count",
                        label: "Número de tabs",
                        min: 1,
                        max: 10,
                        default: 3,
                    },
                    {
                        type: "select",
                        name: "data-active",
                        label: "Tab activo inicial",
                        options: [
                            { id: "tab-1", name: "Tab 1" },
                            { id: "tab-2", name: "Tab 2" },
                            { id: "tab-3", name: "Tab 3" },
                            { id: "tab-4", name: "Tab 4" },
                            { id: "tab-5", name: "Tab 5" },
                            { id: "tab-6", name: "Tab 6" },
                            { id: "tab-7", name: "Tab 7" },
                            { id: "tab-8", name: "Tab 8" },
                            { id: "tab-9", name: "Tab 9" },
                            { id: "tab-10", name: "Tab 10" },
                        ],
                        default: "tab-1",
                    },
                    {
                        type: "text",
                        name: "tab-1-name",
                        label: "Nombre Tab 1",
                        default: "Tab 1",
                    },
                    {
                        type: "text",
                        name: "tab-2-name",
                        label: "Nombre Tab 2",
                        default: "Tab 2",
                    },
                    {
                        type: "text",
                        name: "tab-3-name",
                        label: "Nombre Tab 3",
                        default: "Tab 3",
                    },
                    {
                        type: "text",
                        name: "tab-4-name",
                        label: "Nombre Tab 4",
                        default: "Tab 4",
                    },
                    {
                        type: "text",
                        name: "tab-5-name",
                        label: "Nombre Tab 5",
                        default: "Tab 5",
                    },
                    {
                        type: "text",
                        name: "tab-6-name",
                        label: "Nombre Tab 6",
                        default: "Tab 6",
                    },
                    {
                        type: "text",
                        name: "tab-7-name",
                        label: "Nombre Tab 7",
                        default: "Tab 7",
                    },
                    {
                        type: "text",
                        name: "tab-8-name",
                        label: "Nombre Tab 8",
                        default: "Tab 8",
                    },
                    {
                        type: "text",
                        name: "tab-9-name",
                        label: "Nombre Tab 9",
                        default: "Tab 9",
                    },
                    {
                        type: "text",
                        name: "tab-10-name",
                        label: "Nombre Tab 10",
                        default: "Tab 10",
                    },
                ],
                script: function () {
                    const container = this;
                    const tabButtons =
                        container.querySelectorAll(".credit-tab-btn");
                    const panelGroups = container.querySelectorAll(
                        ".credit-panel-group",
                    );
                    const defaultActive =
                        container.getAttribute("data-active") || "tab-1";
                    const tabCount = parseInt(
                        container.getAttribute("tab-count") || 3,
                    );

                    // Show or hide tabs based on tab-count
                    tabButtons.forEach((btn, index) => {
                        if (index < tabCount) {
                            btn.classList.remove("hidden");

                            // Update tab name if set
                            const tabNumber = index + 1;
                            const tabName = container.getAttribute(
                                `tab-${tabNumber}-name`,
                            );
                            if (tabName) {
                                btn.textContent = tabName;
                            }
                        } else {
                            btn.classList.add("hidden");
                        }

                        // Setup click handlers
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

                    // Set initial active tab
                    const activeBtn = Array.from(tabButtons).find(
                        (btn) =>
                            btn.getAttribute("data-type") === defaultActive &&
                            !btn.classList.contains("hidden"),
                    );

                    if (activeBtn) {
                        activeBtn.click();
                    } else if (
                        tabButtons.length > 0 &&
                        !tabButtons[0].classList.contains("hidden")
                    ) {
                        tabButtons[0].click();
                    }
                },
            },
            init() {
                this.on("change:attributes:credit-title", this.updateTitle);

                this.listenTo(editor, "component:update", (component) => {
                    if (
                        component &&
                        component.get("tagName") === "I" &&
                        this.view &&
                        this.view.el
                    ) {
                        const iconEl = this.view.el.querySelector("i");
                        if (iconEl && component.getEl() === iconEl) {
                            const newIconClass = Array.from(
                                component.getEl().classList,
                            ).find((cls) => cls.startsWith("ri-"));

                            if (newIconClass) {
                                this.updateIcon(newIconClass);
                            }
                        }
                    }
                });

                // Tab name changes
                for (let i = 1; i <= 10; i++) {
                    this.on(
                        `change:attributes:tab-${i}-name`,
                        this.updateTabNames,
                    );
                }

                // Initialize on component load
                this.listenTo(this.collection, "add", this.onAdd);

                // Update active tab options based on tab count
                this.updateActiveTabOptions();
            },
            onAdd() {
                setTimeout(() => this.initializeScript(), 300);
            },
            initializeScript() {
                const script = this.get("script");
                const el = this.view?.el;
                if (script && el) {
                    script.call(el);
                }
            },
            updateActiveTabOptions() {
                const count = parseInt(
                    this.get("attributes")["tab-count"] || 3,
                );
                const options = [];

                // Create options based on current tab count
                for (let i = 1; i <= count; i++) {
                    options.push({
                        id: `tab-${i}`,
                        name: `Tab ${i}`,
                    });
                }

                // Find the active tab trait
                const activeTabTrait = this.get("traits").where({
                    name: "data-active",
                })[0];

                if (activeTabTrait) {
                    // Update options
                    activeTabTrait.set("options", options);

                    // Validate current value
                    const currentValue = this.get("attributes")["data-active"];
                    const validOptions = options.map((opt) => opt.id);

                    // If current value is not in valid options, set to first tab
                    if (!validOptions.includes(currentValue)) {
                        this.set("attributes", {
                            ...this.get("attributes"),
                            "data-active": "tab-1",
                        });
                    }
                }
            },
            updateTabs() {
                // Update the DOM with the current tab count
                const count = parseInt(
                    this.get("attributes")["tab-count"] || 3,
                );

                // Set tab-count attribute for the script to use
                this.set("attributes", {
                    ...this.get("attributes"),
                    "tab-count": count,
                });

                // Update active tab options
                this.updateActiveTabOptions();

                // Re-initialize the tabs
                this.initializeScript();
            },
            updateTabNames() {
                // Collect all tab names from attributes
                const tabNames = {};
                for (let i = 1; i <= 10; i++) {
                    const nameAttr = `tab-${i}-name`;
                    const name = this.get("attributes")[nameAttr];
                    if (name) {
                        tabNames[`tab-${i}-name`] = name;
                    }
                }

                // Update tab-name attributes for the script to use
                this.set("attributes", {
                    ...this.get("attributes"),
                    ...tabNames,
                });

                // Re-initialize the tabs
                this.initializeScript();
            },
            updateActiveTab() {
                // Re-initialize the tabs to update the active tab
                this.initializeScript();
            },
        },
        view: {
            init() {
                this.listenTo(
                    this.model,
                    "change:attributes",
                    this.updateScript,
                );
            },
            updateScript() {
                this.onRender();
            },
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
