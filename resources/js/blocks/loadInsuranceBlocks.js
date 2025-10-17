// Insurance tabs block with different insurance types and details
export default function loadInsuranceTabsBlock(editor) {
    // Define insurance tabs SVG icon
    const insuranceTabsSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="12" height="2" fill="white" />
      <rect x="4" y="7" width="16" height="1" fill="#cccccc" />
      <rect x="4" y="10" width="6" height="2" rx="1" fill="#ffffff" stroke="#23366A" stroke-width="1" />
      <rect x="11" y="10" width="6" height="2" rx="1" fill="#23366A" />
      <rect x="4" y="14" width="10" height="1" fill="white" />
      <rect x="4" y="16" width="8" height="1" fill="white" />
      <rect x="4" y="18" width="12" height="1" fill="white" />
    </svg>`;

    // Define HTML structure for insurance tabs
    const getTabsHTML = (count = 5) => {
        const defaultTypes = [
            "auto",
            "vida",
            "inmueble",
            "equipo",
            "atencion",
            "tab6",
            "tab7",
            "tab8",
            "tab9",
            "tab10",
        ];
        const defaultNames = [
            "Seguro de auto",
            "Segura vida+",
            "Seguro de inmueble",
            "Seguro de equipo",
            "Atención segura+",
            "Tab adicional 1",
            "Tab adicional 2",
            "Tab adicional 3",
            "Tab adicional 4",
            "Tab adicional 5",
        ];

        let tabButtons = "";
        let tabPanels = "";

        for (let i = 0; i < count && i < 10; i++) {
            const isActive = i === 0;
            const type = defaultTypes[i];
            const name = defaultNames[i];

            // Create tab button
            tabButtons += `
                <button class="insurance-tab-btn ${isActive ? "bg-primary text-white" : "bg-white text-primary"} py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="${type}">
                    <span data-gjs-type="text" class="tab-button-text">${name}</span>
                </button>
            `;

            // Create tab panel
            tabPanels += `
                <div class="insurance-panel-group ${isActive ? "" : "hidden"}" data-type="${type}">
                    <div class="flex flex-col md:flex-row gap-8 items-center py-8">
                        <div class="w-full md:w-1/3">
                            <img src="https://via.placeholder.com/500x700/f8f9fa/666666?text=${name.replace(/ /g, "+")}" class="max-h-[500px] w-auto mx-auto object-cover rounded-lg" alt="${name}">
                        </div>
                        <div class="w-full md:w-2/3">
                            <h2 class="text-4xl font-bold text-primary mb-2">${name}</h2>
                            <h3 class="text-2xl font-semibold text-primary italic mb-4">Subtítulo de ${name}</h3>
                            <p class="text-lg text-gray-600 mb-6">Descripción detallada del seguro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                        </div>
                    </div>
                    
                    <div class="w-full h-0.5 bg-primary my-8"></div>
                    
                    <div class="flex flex-col md:flex-row gap-8 py-8">
                        <div class="w-full md:w-1/2">
                            <h3 class="text-2xl font-bold text-primary mb-4">Coberturas</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-600 text-lg">
                                <li>Cobertura 1</li>
                                <li>Cobertura 2</li>
                                <li>Cobertura 3</li>
                            </ul>
                        </div>
                        <div class="w-full md:w-1/2">
                            <h3 class="text-2xl font-bold text-primary mb-4">Requisitos</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-600 text-lg">
                                <li>Requisito 1</li>
                                <li>Requisito 2</li>
                                <li>Requisito 3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }

        return {
            tabButtons,
            tabPanels,
        };
    };

    // Add insurance tabs block
    editor.BlockManager.add("insurance-tabs-block", {
        label: "Tipos de Seguro",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: insuranceTabsSvg,
        content: {
            type: "insurance-tabs",
            activeTab: "auto",
            tabCount: 5,
        },
    });

    // Register insurance tabs component
    editor.DomComponents.addType("insurance-tabs", {
        isComponent: function (el) {
            return (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === "insurance-tabs"
            );
        },
        model: {
            defaults: {
                tagName: "section",
                draggable: true,
                droppable: true,
                attributes: {
                    "data-gjs-type": "insurance-tabs",
                    class: "insurance-tabs-container py-8 md:py-12 bg-white",
                },
                name: "Tipos de Seguro",
                traits: [
                    {
                        type: "select",
                        name: "data-active",
                        label: "Tab activo inicial",
                        options: [
                            { id: "auto", name: "Tab 1" },
                            { id: "vida", name: "Tab 2" },
                            { id: "inmueble", name: "Tab 3" },
                            { id: "equipo", name: "Tab 4" },
                            { id: "atencion", name: "Tab 5" },
                            { id: "tab6", name: "Tab 6" },
                            { id: "tab7", name: "Tab 7" },
                            { id: "tab8", name: "Tab 8" },
                            { id: "tab9", name: "Tab 9" },
                            { id: "tab10", name: "Tab 10" },
                        ],
                        default: "auto",
                    },
                    {
                        type: "number",
                        name: "tab-count",
                        label: "Número de tabs",
                        min: 1,
                        max: 10,
                        default: 5,
                        changeProp: true,
                    },
                ],
                "tab-count": 5,
                script: function () {
                    const container = this;
                    if (!container.hasAttribute("data-initialized")) {
                        const tabButtons =
                            container.querySelectorAll(".insurance-tab-btn");
                        const panelGroups = container.querySelectorAll(
                            ".insurance-panel-group",
                        );
                        const defaultActive =
                            container.getAttribute("data-active") || "auto";

                        // Verificar si estamos en el editor o en la vista final
                        const isEditor =
                            typeof window.grapesjs !== "undefined" ||
                            document.body.classList.contains("gjs-dmode") ||
                            window.location.href.includes("/editor/");

                        tabButtons.forEach((btn) => {
                            btn.addEventListener("click", function (e) {
                                // Solo en el editor, evitamos la activación cuando se hace clic en el texto
                                if (
                                    isEditor &&
                                    e.target.classList.contains(
                                        "tab-button-text",
                                    )
                                ) {
                                    return;
                                }

                                const tabType = this.getAttribute("data-type");

                                tabButtons.forEach((b) => {
                                    if (b === this) {
                                        b.classList.remove(
                                            "bg-white",
                                            "text-primary",
                                        );
                                        b.classList.add(
                                            "bg-primary",
                                            "text-white",
                                        );
                                    } else {
                                        b.classList.remove(
                                            "bg-primary",
                                            "text-white",
                                        );
                                        b.classList.add(
                                            "bg-white",
                                            "text-primary",
                                        );
                                    }
                                });

                                panelGroups.forEach((panel) => {
                                    if (
                                        panel.getAttribute("data-type") ===
                                        tabType
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

                        container.setAttribute("data-initialized", "true");
                    }
                },
            },
            init() {
                this.on("change:tab-count", this.updateTabCount);
                this.on("change:attributes:data-active", this.updateActiveTab);
            },
            updateTabCount() {
                const count = this.get("tab-count");
                if (!count || count < 1 || count > 10) return;

                const { tabButtons, tabPanels } = getTabsHTML(count);

                const comps = this.components();
                comps.reset();

                comps.add(`
                    <div class="max-w-7xl mx-auto px-4">
                        <div class="insurance-tabs mb-6 flex flex-wrap gap-3">
                            ${tabButtons}
                        </div>
                        <div class="insurance-panels">
                            ${tabPanels}
                        </div>
                    </div>
                `);

                this.trigger("change:script");
            },
            updateActiveTab() {
                this.trigger("change:script");
            },
        },
        view: {
            init() {
                this.model.components().length === 0 &&
                    this.model.updateTabCount();
            },
            onRender() {
                const script = this.model.get("script");
                if (script) {
                    setTimeout(() => {
                        script.call(this.el);
                    }, 100);
                }
            },
        },
    });

    // Insurance Image Text Section Block
    editor.BlockManager.add("insurance-image-text-section", {
        label: "Imagen con Texto Seguro",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="8" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
            <rect x="12" y="4" width="10" height="3" rx="0.5" fill="#23366A"/>
            <rect x="12" y="8" width="8" height="1" rx="0.5" fill="#666666"/>
            <rect x="12" y="10" width="10" height="1" rx="0.5" fill="#999999"/>
        </svg>`,
        content: `
            <div class="flex flex-col md:flex-row gap-8 items-center py-8">
                <div class="w-full md:w-1/3">
                    <img src="https://via.placeholder.com/500x700/f8f9fa/666666?text=Imagen+Seguro" class="max-h-[500px] w-auto mx-auto object-cover rounded-lg" alt="Imagen Seguro">
                </div>
                <div class="w-full md:w-2/3">
                    <h2 class="text-4xl font-bold text-primary mb-2">Titulo</h2>
                    <h3 class="text-2xl font-semibold text-primary italic mb-4">Subtítulo</h3>
                    <p class="text-lg text-gray-600 mb-6">Descripción detallada del seguro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                </div>
            </div>
        `,
    });

    // Insurance Image Text Badge Block
    editor.BlockManager.add("insurance-image-text-badge", {
        label: "Imagen con Texto y Badge",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="8" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
            <rect x="12" y="4" width="10" height="3" rx="0.5" fill="#23366A"/>
            <rect x="12" y="8" width="8" height="1" rx="0.5" fill="#666666"/>
            <rect x="12" y="10" width="10" height="1" rx="0.5" fill="#999999"/>
            <circle cx="18" cy="15" r="2" fill="#23366A" stroke="#ffffff" stroke-width="0.5"/>
        </svg>`,
        content: `
            <div class="flex flex-col md:flex-row gap-8 items-center py-8">
                <div class="w-full md:w-1/3">
                    <img src="https://via.placeholder.com/500x700/f8f9fa/666666?text=Imagen+Seguro" class="max-h-[500px] w-auto mx-auto object-cover rounded-lg" alt="Seguro de Auto">
                </div>
                <div class="w-full md:w-2/3">
                    <h2 class="text-4xl font-bold text-primary mb-2">Titulo</h2>
                    <h3 class="text-2xl font-semibold text-primary italic mb-4">Subtítulo</h3>
                    <p class="text-lg text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                    
                    <!-- Badge de cobertura -->
                    <div class="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-medium">
                        <i class="ri-earth-fill mr-2 text-xl"></i>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </div>
                </div>
            </div>
        `,
    });

    // Insurance Horizontal Basic Block
    editor.BlockManager.add("insurance-horizontal-basic", {
        label: "Imagen Horizontal con Texto",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
        <rect x="3" y="5" width="8" height="14" rx="0.5" fill="#cccccc"/>
        <rect x="12" y="6" width="9" height="2" rx="0.5" fill="#23366A"/>
        <rect x="12" y="9" width="7" height="1" rx="0.5" fill="#666666"/>
        <rect x="12" y="11" width="9" height="1" rx="0.5" fill="#999999"/>
        <rect x="12" y="13" width="9" height="1" rx="0.5" fill="#999999"/>
    </svg>`,
        content: `
        <div class="flex flex-col md:flex-row items-center gap-8 py-8">
            <div class="w-full md:w-2/5">
                <img src="https://via.placeholder.com/600x400/f8f9fa/666666?text=Imagen+Seguro" class="w-full h-auto object-cover rounded-lg" alt="Imagen Seguro">
            </div>
            <div class="w-full md:w-3/5 flex flex-col gap-3">
                <h2 class="text-3xl md:text-4xl font-bold text-primary">Titulo</h2>
                <h3 class="text-xl md:text-2xl font-semibold text-primary italic">Subtitulo</h3>
                <p class="text-gray-600 text-lg">(Lorem ipsum dolor sit amet.)</p>
                <p class="text-gray-700 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
            </div>
        </div>
    `,
    });

    // Insurance Horizontal Badge Block
    editor.BlockManager.add("insurance-horizontal-badge", {
        label: "Imagen Horizontal con Badge",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
        <rect x="3" y="5" width="8" height="14" rx="0.5" fill="#cccccc"/>
        <rect x="12" y="6" width="9" height="2" rx="0.5" fill="#23366A"/>
        <rect x="12" y="9" width="7" height="1" rx="0.5" fill="#666666"/>
        <rect x="12" y="11" width="9" height="1" rx="0.5" fill="#999999"/>
        <circle cx="16" cy="15" r="2" fill="#23366A" stroke="#ffffff" stroke-width="0.5"/>
    </svg>`,
        content: `
        <div class="flex flex-col md:flex-row items-center gap-8 py-8">
            <div class="w-full md:w-2/5">
                <img src="https://via.placeholder.com/600x400/f8f9fa/666666?text=Imagen+Seguro" class="w-full h-auto object-cover rounded-lg" alt="Imagen Seguro">
            </div>
            <div class="w-full md:w-3/5 flex flex-col gap-4">
                <h2 class="text-3xl md:text-4xl font-bold text-primary">Titulo</h2>
                <h3 class="text-xl md:text-2xl font-semibold text-primary italic">Subtitulo</h3>
                <p class="text-gray-600 text-lg">(Lorem ipsum dolor sit amet.)</p>
                <p class="text-gray-700 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                
                <!-- Badge -->
                <div class="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-medium">
                    <i class="ri-shield-check-line mr-2 text-xl"></i>
                    <span>Lorem ipsum dolor sit amet.</span>
                </div>
            </div>
        </div>
    `,
    });

    // Insurance Horizontal List Block
    editor.BlockManager.add("insurance-horizontal-list", {
        label: "Imagen Horizontal con Lista",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
        <rect x="3" y="5" width="8" height="14" rx="0.5" fill="#cccccc"/>
        <rect x="12" y="5" width="9" height="2" rx="0.5" fill="#23366A"/>
        <rect x="12" y="8" width="7" height="1" rx="0.5" fill="#666666"/>
        <circle cx="12.5" cy="11.5" r="0.5" fill="#23366A"/>
        <rect x="13.5" y="11" width="7" height="1" rx="0.5" fill="#999999"/>
        <circle cx="12.5" cy="13.5" r="0.5" fill="#23366A"/>
        <rect x="13.5" y="13" width="7" height="1" rx="0.5" fill="#999999"/>
        <rect x="12" y="16" width="9" height="1" rx="0.5" fill="#999999"/>
    </svg>`,
        content: `
        <div class="flex flex-col md:flex-row items-center gap-8 py-8">
            <div class="w-full md:w-2/5">
                <img src="https://via.placeholder.com/600x400/f8f9fa/666666?text=Imagen+Seguro" class="w-full h-auto object-cover rounded-lg" alt="Imagen Seguro">
            </div>
            <div class="w-full md:w-3/5 flex flex-col gap-4">
                <h2 class="text-3xl md:text-4xl font-bold text-primary">Titulo</h2>
                <h3 class="text-xl md:text-2xl font-semibold text-primary italic">Subtitulo</h3>
                <p class="text-gray-600 text-lg">(Lorem ipsum dolor sit amet.)</p>
                
                <h4 class="text-xl font-semibold text-primary">Lorem ipsum dolor:</h4>
                <ul class="list-none flex flex-col gap-2 text-gray-600 text-lg">
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor </span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                </ul>
                
                <p class="text-gray-600 text-lg">Lorem ipsum dolor sit amet. Ipsum dolor sit amet.</p>
            </div>
        </div>
    `,
    });

    // Insurance Two Columns List Block
    editor.BlockManager.add("insurance-two-columns-list", {
        label: "Dos Columnas Listas Seguros",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="1" y="3" width="10" height="2" rx="0.5" fill="#23366A"/>
            <circle cx="2" cy="7" r="0.5" fill="#23366A"/>
            <rect x="3" y="6.5" width="8" height="1" rx="0.25" fill="#666666"/>
            <circle cx="2" cy="9" r="0.5" fill="#23366A"/>
            <rect x="3" y="8.5" width="8" height="1" rx="0.25" fill="#666666"/>
            <rect x="13" y="3" width="10" height="2" rx="0.5" fill="#23366A"/>
            <circle cx="14" cy="7" r="0.5" fill="#23366A"/>
            <rect x="15" y="6.5" width="8" height="1" rx="0.25" fill="#666666"/>
            <circle cx="14" cy="9" r="0.5" fill="#23366A"/>
            <rect x="15" y="8.5" width="8" height="1" rx="0.25" fill="#666666"/>
        </svg>`,
        content: `
            <div class="flex flex-col md:flex-row gap-8 py-8">
                <div class="w-full md:w-1/2">
                    <h3 class="text-2xl font-bold text-primary mb-4">Titulo 1</h3>
                    <ul class="list-disc pl-5 space-y-2 text-gray-600 text-lg">
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div>
                <div class="w-full md:w-1/2">
                    <h3 class="text-2xl font-bold text-primary mb-4">Titulo 2</h3>
                    <ul class="list-disc pl-5 space-y-2 text-gray-600 text-lg">
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div>
            </div>
        `,
    });

    // Insurance Divider
    editor.BlockManager.add("insurance-divider", {
        label: "Separador Seguros",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="11" width="20" height="2" rx="1" fill="#dddddd"/>
        </svg>`,
        content: `<div class="w-full h-0.5 bg-primary my-8"></div>`,
    });

    // Insurance Feature Card
    editor.BlockManager.add("insurance-feature-card", {
        label: "Tarjeta de Característica",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="4" y="4" width="16" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
            <circle cx="8" cy="8" r="2" fill="#23366A"/>
            <rect x="11" y="7" width="7" height="2" rx="0.5" fill="#23366A"/>
            <rect x="6" y="12" width="12" height="1" rx="0.5" fill="#666666"/>
            <rect x="6" y="14" width="12" height="1" rx="0.5" fill="#666666"/>
            <rect x="6" y="16" width="8" height="1" rx="0.5" fill="#666666"/>
        </svg>`,
        content: `
            <div class="bg-white shadow-lg rounded-xl p-5 border border-primary transition-all duration-300 hover:shadow-xl">
                <div class="flex items-center mb-3">
                    <i class="ri-shield-check-fill text-primary text-3xl mr-3"></i>
                    <h3 class="text-2xl font-bold text-primary">Característica</h3>
                </div>
                <p class="text-lg text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <ul class="list-disc pl-5 space-y-1 text-gray-700 text-lg">
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                </ul>
            </div>
        `,
    });

    // Insurance CTA Block
    editor.BlockManager.add("insurance-cta", {
        label: "Llamado a la Acción Seguros",
        category: "Seguros",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#23366A"/>
            <rect x="4" y="8" width="16" height="2" fill="white"/>
            <rect x="4" y="11" width="12" height="1" fill="#cccccc"/>
            <rect x="8" y="14" width="8" height="3" rx="1.5" fill="white"/>
        </svg>`,
        content: `
            <div class="bg-primary text-white rounded-xl py-8 px-6 md:py-12 md:px-10 text-center shadow-lg">
                <h3 class="text-3xl md:text-4xl font-bold mb-4">Titulo</h3>
                <p class="text-white/80 text-lg mb-6 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <a href="#" class="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-white/90 text-lg">Solicitar información</a>
            </div>
        `,
    });
}
