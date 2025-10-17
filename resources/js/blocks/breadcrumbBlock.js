export default function loadBreadcrumbBlock(editor) {
    // SVG icon for visual representation of breadcrumb
    const breadcrumbSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="1" y="1" width="22" height="22" rx="2" fill="white" stroke="#cccccc" />
        <g transform="translate(3, 9)">
            <rect x="0" y="0" width="3" height="3" rx="0.5" fill="#23366A" />
            <text x="0.5" y="2.3" font-family="Arial" font-size="2" fill="white">H</text>
            <path d="M3.5 1.5h2" stroke="#666" stroke-width="0.8" />
            <polygon points="5.5,1 6.5,1.5 5.5,2" fill="#666" />
            
            <rect x="7" y="0" width="3" height="3" rx="0.5" fill="#23366A" />
            <text x="7.5" y="2.3" font-family="Arial" font-size="2" fill="white">P</text>
            <path d="M10.5 1.5h2" stroke="#666" stroke-width="0.8" />
            <polygon points="12.5,1 13.5,1.5 12.5,2" fill="#666" />
            
            <rect x="14" y="0" width="5" height="3" rx="0.5" fill="#23366A" />
            <text x="14.5" y="2.3" font-family="Arial" font-size="2" fill="white">CUR</text>
        </g>
        <text x="4" y="17" font-family="Arial" font-size="2" fill="#666" text-anchor="middle">Breadcrumb Navigation</text>
        </svg>`;

    // Register the component type
    editor.DomComponents.addType("breadcrumb", {
        // Component identification function
        isComponent: function (el) {
            return (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === "breadcrumb"
            );
        },
        extend: "div",
        priority: 10,
        // Component model definition
        model: {
            defaults: {
                tagName: "nav",
                droppable: false,
                attributes: {
                    "data-gjs-type": "breadcrumb",
                    class: "py-4 bg-white",
                },
                name: "Breadcrumb",
                // Initial traits
                traits: [
                    {
                        type: "number",
                        name: "item-count",
                        label: "Number of items",
                        min: 1,
                        max: 10,
                        default: 3,
                        changeProp: 1, // Important for real-time updates
                    },
                ],
                "item-count": 3, // Store as a property for real-time updates
                // Client-side script
                script: function () {
                    // The script runs only on the actual page, not in the editor
                    if (window.grapesjs || document.querySelector(".gjs-frame"))
                        return;

                    // Ensure links work properly
                    const container = this;
                    const items =
                        container.querySelectorAll(".breadcrumb-item");
                    items.forEach((item) => {
                        if (item.classList.contains("active")) {
                            const link = item.querySelector("a");
                            if (link) {
                                link.addEventListener("click", (e) => {
                                    e.preventDefault(); // Prevent clicking on the current page link
                                });
                            }
                        }
                    });
                },
            },

            // Initialize component
            init() {
                this.listenTo(this, "change:item-count", this.updateItemCount);
                this.listenTo(
                    this,
                    "change:attributes",
                    this.handleAttributesChange,
                );

                // Generate initial breadcrumb items
                this.updateTraitsFromCount();
                this.on("component:update", this.updateView);

                // Initial render of breadcrumb items
                this.updateItems();
            },

            // Update item count when changed
            updateItemCount() {
                const count = this.get("item-count");
                this.updateTraitsFromCount(count);
                this.updateItems();
            },

            // Handle attribute changes
            handleAttributesChange(model, attrs) {
                const changed = Object.keys(attrs.changed || {});

                if (
                    changed.some(
                        (key) =>
                            key.startsWith("item-") && key !== "item-count",
                    )
                ) {
                    this.updateItems();
                }

                // Handle item-count changes through attributes
                if (attrs.changed && "item-count" in attrs.changed) {
                    const count = parseInt(attrs.changed["item-count"]);
                    if (!isNaN(count)) {
                        this.set("item-count", count);
                    }
                }
            },

            // Update view when component is updated
            updateView() {
                this.trigger("breadcrumb-update");
            },

            // Update traits based on item count
            updateTraitsFromCount(count) {
                if (!count) count = this.get("item-count") || 3;

                // Start with the count trait
                const traits = [
                    {
                        type: "number",
                        name: "item-count",
                        label: "Number of items",
                        min: 1,
                        max: 10,
                        default: count,
                        changeProp: 1,
                    },
                ];

                // Add traits for each breadcrumb item
                for (let i = 1; i <= count; i++) {
                    traits.push({
                        type: "text",
                        name: `item-${i}-text`,
                        label: `Item ${i} Text`,
                        changeProp: 1,
                        default:
                            i === 1
                                ? "Home"
                                : i === count
                                  ? "Current Page"
                                  : `Page ${i}`,
                    });

                    traits.push({
                        type: "text",
                        name: `item-${i}-link`,
                        label: `Item ${i} Link`,
                        changeProp: 1,
                        default:
                            i === count ? "#" : i === 1 ? "/" : `/page-${i}`,
                    });

                    traits.push({
                        type: "checkbox",
                        name: `item-${i}-active`,
                        label: `Item ${i} Is Current`,
                        changeProp: 1,
                        default: i === count,
                    });

                    // Add properties to model for each trait
                    this.defaults[`item-${i}-text`] =
                        i === 1
                            ? "Home"
                            : i === count
                              ? "Current Page"
                              : `Page ${i}`;
                    this.defaults[`item-${i}-link`] =
                        i === count ? "#" : i === 1 ? "/" : `/page-${i}`;
                    this.defaults[`item-${i}-active`] = i === count;
                }

                // Update the traits
                this.set("traits", traits);

                // Add property change listeners for real-time updates
                for (let i = 1; i <= count; i++) {
                    this.listenTo(
                        this,
                        `change:item-${i}-text`,
                        this.updateItems,
                    );
                    this.listenTo(
                        this,
                        `change:item-${i}-link`,
                        this.updateItems,
                    );
                    this.listenTo(
                        this,
                        `change:item-${i}-active`,
                        this.updateItems,
                    );
                }
            },

            // Update the breadcrumb items HTML
            updateItems() {
                const count = this.get("item-count") || 3;

                // Estructura con contenedor responsivo
                let html = `<div class="max-w-7xl mx-auto px-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-container">
                        <ol class="breadcrumb flex items-center flex-wrap text-sm">`;

                for (let i = 1; i <= count; i++) {
                    const text =
                        this.get(`item-${i}-text`) ||
                        (i === 1
                            ? "Home"
                            : i === count
                              ? "Current Page"
                              : `Page ${i}`);

                    const link =
                        this.get(`item-${i}-link`) ||
                        (i === count ? "#" : i === 1 ? "/" : `/page-${i}`);

                    const isActive = this.get(`item-${i}-active`);

                    html += `<li class="breadcrumb-item${isActive ? " active" : ""}"${isActive ? ' aria-current="page"' : ""}>
                                <a href="${link}" class="${isActive ? "text-primary font-semibold" : "text-gray-500 hover:text-primary hover:underline"}">${text}</a>
                            </li>`;

                    // Add separator if not the last item
                    if (i < count) {
                        html += `<li class="breadcrumb-separator">
                                <i class="ri-arrow-right-s-line text-gray-500"></i>
                            </li>`;
                    }
                }

                html += `</ol>
                        </nav>
                    </div>`;

                this.set("content", html);
                this.trigger("breadcrumb-updated");
            },
        },

        // Component view definition
        view: {
            // Initialize view
            init() {
                this.listenTo(this.model, "breadcrumb-update", this.render);
                this.listenTo(this.model, "breadcrumb-updated", this.rerender);
                this.listenTo(this.model, "change:content", this.rerender);
            },

            // Re-render the component
            rerender() {
                // Force re-rendering to update the component
                if (this.el) {
                    this.el.innerHTML = this.model.get("content");
                }
            },

            // Render when component is added
            onRender() {
                const html = this.model.get("content");
                if (html && this.el && !this.el.querySelector(".breadcrumb")) {
                    this.el.innerHTML = html;
                }
            },
        },
    });

    // Add the block to the block manager
    editor.BlockManager.add("breadcrumb-block", {
        label: "Breadcrumb",
        category: "Botones",
        attributes: { class: "gjs-block-section" },
        media: breadcrumbSvg,
        content: {
            type: "breadcrumb",
            // Set initial HTML content
            content: `<div class="max-w-7xl mx-auto px-4">
                        <nav aria-label="breadcrumb" class="breadcrumb-container">
                            <ol class="breadcrumb flex items-center flex-wrap text-sm">
                                <li class="breadcrumb-item">
                                    <a href="/" class="text-gray-500 hover:text-primary hover:underline">Home</a>
                                </li>
                                <li class="breadcrumb-separator">
                                    <i class="ri-arrow-right-s-line text-gray-500"></i>
                                </li>
                                <li class="breadcrumb-item">
                                    <a href="/page-2" class="text-gray-500 hover:text-primary hover:underline">Page 2</a>
                                </li>
                                <li class="breadcrumb-separator">
                                    <i class="ri-arrow-right-s-line text-gray-500"></i>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    <a href="#" class="text-primary font-semibold">Current Page</a>
                                </li>
                            </ol>
                        </nav>
                    </div>`,
            // Component styles
            style: {
                ".breadcrumb-container": {
                    width: "100%",
                },
                ".breadcrumb": {
                    "list-style": "none",
                    padding: "0",
                    margin: "0",
                    display: "flex",
                    "align-items": "center",
                    "flex-wrap": "wrap",
                },
                ".breadcrumb-item": {
                    display: "inline-flex",
                    "align-items": "center",
                },
                ".breadcrumb-item a": {
                    color: "#6B7280",
                    "text-decoration": "none",
                    transition: "all 0.2s ease",
                    "font-weight": "normal",
                },
                ".breadcrumb-item a:hover": {
                    color: "#23366A",
                    "text-decoration": "underline",
                },
                ".breadcrumb-item.active a": {
                    color: "#23366A",
                    "font-weight": "600",
                    cursor: "default",
                    "pointer-events": "none",
                },
                ".breadcrumb-separator": {
                    display: "inline-flex",
                    margin: "0 0.5rem",
                    color: "#9CA3AF",
                },
            },
        },
    });

    // Add stylesheet for the breadcrumb component to the canvas
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
