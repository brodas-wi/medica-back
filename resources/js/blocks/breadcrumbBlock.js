export default function loadBreadcrumbBlock(editor) {
    // SVG icon for visual representation of breadcrumb
    const breadcrumbSvg = `<svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="10" width="4" height="4" rx="0.5" fill="#23366A" />
        
        <path d="M7,11 L8,12 L7,13" stroke="#666" stroke-width="1" fill="none" />
        
        <rect x="9" y="10" width="4" height="4" rx="0.5" fill="#23366A" />

        <path d="M14,11 L15,12 L14,13" stroke="#666" stroke-width="1" fill="none" />
        
        <rect x="16" y="10" width="6" height="4" rx="0.5" fill="#23366A" />
        </svg>`;

    // Register the breadcrumb component type
    editor.DomComponents.addType("breadcrumb", {
        // Component identification
        isComponent: function (el) {
            return (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === "breadcrumb"
            );
        },
        extend: "div",
        priority: 10,

        // Component model
        model: {
            defaults: {
                tagName: "nav",
                droppable: false,
                attributes: {
                    "data-gjs-type": "breadcrumb",
                    class: "py-4 bg-white",
                    "data-item-count": "3",
                    "data-item-1-text": "Inicio",
                    "data-item-1-link": "/",
                    "data-item-1-active": "",
                    "data-item-2-text": "Pagina 1",
                    "data-item-2-link": "#",
                    "data-item-2-active": "",
                    "data-item-3-text": "Pagina 2",
                    "data-item-3-link": "#",
                    "data-item-3-active": "true",
                },
                name: "Breadcrumb",
                traits: [],

                // Client-side script
                script: function () {
                    if (window.grapesjs || document.querySelector(".gjs-frame"))
                        return;

                    const container = this;
                    const items =
                        container.querySelectorAll(".breadcrumb-item");
                    items.forEach((item) => {
                        if (item.classList.contains("active")) {
                            const link = item.querySelector("a");
                            if (link) {
                                link.addEventListener("click", (e) => {
                                    e.preventDefault();
                                });
                            }
                        }
                    });
                },
            },

            // Initialize component
            init() {
                this._updating = false;

                // Ensure all attributes have initial values
                this.normalizeAttributes();

                // Build traits from attributes
                this.buildTraits();

                // Generate initial HTML
                this.updateItems();

                // Setup listeners
                this.on("change:attributes", this.onAttributesChange);
            },

            // Normalize attributes to ensure consistent values
            normalizeAttributes() {
                const attrs = this.getAttributes();
                const count = parseInt(attrs["data-item-count"]) || 3;
                const updates = {};

                // Ensure count is set
                if (!attrs["data-item-count"]) {
                    updates["data-item-count"] = "3";
                }

                // Ensure all items have attributes
                for (let i = 1; i <= count; i++) {
                    if (!attrs[`data-item-${i}-text`]) {
                        updates[`data-item-${i}-text`] =
                            i === 1
                                ? "Inicio"
                                : i === count
                                  ? "Pagina actual"
                                  : `Pagina ${i}`;
                    }
                    if (!attrs[`data-item-${i}-link`]) {
                        updates[`data-item-${i}-link`] =
                            i === 1 ? "/" : i === count ? "#" : `/page-${i}`;
                    }
                    if (attrs[`data-item-${i}-active`] === undefined) {
                        updates[`data-item-${i}-active`] =
                            i === count ? "true" : "";
                    }
                }

                // Apply updates if any
                if (Object.keys(updates).length > 0) {
                    this.addAttributes(updates);
                }
            },

            // Handle attributes change
            onAttributesChange() {
                if (this._updating) return;

                const attrs = this.getAttributes();
                const changed = this.changed?.attributes || {};

                // Get the keys that actually changed
                const changedKeys = Object.keys(changed).filter((key) =>
                    key.startsWith("data-item-"),
                );

                if (changedKeys.length === 0) return;

                // Check if count changed
                const countChanged = changed.hasOwnProperty("data-item-count");

                if (countChanged) {
                    const newCount = parseInt(attrs["data-item-count"]) || 3;
                    const oldCount = this._lastCount || 3;

                    if (newCount !== oldCount) {
                        this._lastCount = newCount;

                        // Add attributes for new items
                        if (newCount > oldCount) {
                            const updates = {};
                            for (let i = oldCount + 1; i <= newCount; i++) {
                                const isLast = i === newCount;
                                updates[`data-item-${i}-text`] = isLast
                                    ? "Pagina actual"
                                    : `Pagina ${i}`;
                                updates[`data-item-${i}-link`] = isLast
                                    ? "#"
                                    : `/page-${i}`;
                                updates[`data-item-${i}-active`] = isLast
                                    ? "true"
                                    : "";
                            }
                            this._updating = true;
                            this.addAttributes(updates);
                            this._updating = false;
                        }

                        // Rebuild traits
                        this.buildTraits();
                    }
                }

                // Update HTML
                this.updateItems();
            },

            // Build traits from current attributes
            buildTraits() {
                const attrs = this.getAttributes();
                const count = parseInt(attrs["data-item-count"]) || 3;
                this._lastCount = count;

                const traits = [
                    {
                        type: "number",
                        name: "data-item-count",
                        label: "Number of items",
                        min: 1,
                        max: 10,
                    },
                ];

                // Generate traits for each breadcrumb item
                for (let i = 1; i <= count; i++) {
                    traits.push(
                        {
                            type: "text",
                            name: `data-item-${i}-text`,
                            label: `Item ${i} Text`,
                        },
                        {
                            type: "text",
                            name: `data-item-${i}-link`,
                            label: `Item ${i} Link`,
                        },
                        {
                            type: "checkbox",
                            name: `data-item-${i}-active`,
                            label: `Item ${i} Is Current`,
                            valueTrue: "true",
                            valueFalse: "",
                        },
                    );
                }

                this.set("traits", traits);
            },

            // Update breadcrumb HTML
            updateItems() {
                const attrs = this.getAttributes();
                const count = parseInt(attrs["data-item-count"]) || 3;

                let html = `<div class="max-w-7xl mx-auto px-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-container">
                        <ol class="breadcrumb flex items-center flex-wrap text-sm">`;

                for (let i = 1; i <= count; i++) {
                    const text = attrs[`data-item-${i}-text`] || `Item ${i}`;
                    const link = attrs[`data-item-${i}-link`] || "#";
                    const activeAttr = attrs[`data-item-${i}-active`];
                    const isActive =
                        activeAttr === "true" || activeAttr === true;

                    html += `<li class="breadcrumb-item${isActive ? " active" : ""}"${isActive ? ' aria-current="page"' : ""}>
                                <a href="${link}" class="${isActive ? "text-primary font-semibold" : "text-gray-500 hover:text-primary hover:underline"}">${text}</a>
                            </li>`;

                    if (i < count) {
                        html += `<li class="breadcrumb-separator">
                                <i class="ri-arrow-right-s-line text-gray-500"></i>
                            </li>`;
                    }
                }

                html += `</ol>
                        </nav>
                    </div>`;

                // Update components to render changes immediately
                this.components(html);

                // Trigger a view update to ensure visual refresh
                this.view?.render();
            },
        },

        // Component view
        view: {
            init() {
                this.listenTo(this.model, "change:components", this.render);
            },
        },
    });

    // Add block to block manager
    editor.BlockManager.add("breadcrumb-block", {
        label: "Ruta de Navegación",
        category: "Botones",
        attributes: { class: "gjs-block-section" },
        media: breadcrumbSvg,
        content: {
            type: "breadcrumb",
        },
    });

    // Add stylesheet to canvas
    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            const style = frame.contentDocument.createElement("style");
            style.textContent = `
                .breadcrumb-container {
                    width: 100%;
                }
                .breadcrumb {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .breadcrumb-item {
                    display: inline-flex;
                    align-items: center;
                }
                .breadcrumb-item a {
                    color: #6B7280;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    font-weight: normal;
                }
                .breadcrumb-item a:hover {
                    color: #23366A;
                    text-decoration: underline;
                }
                .breadcrumb-item.active a {
                    color: #23366A;
                    font-weight: 600;
                    cursor: default;
                    pointer-events: none;
                }
                .breadcrumb-separator {
                    display: inline-flex;
                    margin: 0 0.5rem;
                    color: #9CA3AF;
                }
            `;
            frame.contentDocument.head.appendChild(style);
        }
    });
}
