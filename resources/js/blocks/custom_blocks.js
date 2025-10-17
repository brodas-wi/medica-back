export default function (editor) {
    const blockManager = editor.BlockManager;

    fetch("/api/custom-blocks/active")
        .then((response) => response.json())
        .then((blocks) => {
            blocks.forEach((block) => {
                registerCustomBlock(editor, block);
            });
        })
        .catch((error) => {
            console.error("Error loading custom blocks:", error);
        });

    function registerCustomBlock(editor, block) {
        blockManager.add(`custom-block-${block.id}`, {
            label: block.name,
            category: block.category,
            content: {
                type: `custom-block-type-${block.id}`,
                content: block.html_content,
                attributes: {
                    "data-custom-block-id": block.id,
                    "data-custom-block": "true",
                },
            },
            media:
                block.icon_type === "remix"
                    ? `<i class="ri-${block.icon} text-2xl text-primary"></i>`
                    : `<img src="${block.icon}" alt="${block.name}" class="w-6 h-6">`,
        });

        // Execute admin JS with proper context
        const executeAdminJS = (editor, model) => {
            if (block.admin_js && block.admin_js.trim() !== "") {
                try {
                    // Create a function from the admin JS code
                    const adminFunction = new Function(
                        "editor",
                        "model",
                        "Swal",
                        block.admin_js,
                    );
                    // Execute it with the proper context
                    adminFunction(editor, model, window.Swal);
                } catch (error) {
                    console.error(
                        `Error executing admin JavaScript for block ${block.id}:`,
                        error,
                    );
                }
            }
        };

        editor.DomComponents.addType(`custom-block-type-${block.id}`, {
            isComponent: (el) => {
                if (!el) return false;

                if (
                    el.getAttribute &&
                    (el.getAttribute("data-custom-block-id") ===
                        String(block.id) ||
                        el.getAttribute("data-custom-block") === "true")
                ) {
                    return true;
                }

                if (typeof el.outerHTML === "string") {
                    try {
                        const htmlContent = block.html_content
                            .trim()
                            .replace(/\s+/g, " ");
                        const elHTML = el.outerHTML.trim().replace(/\s+/g, " ");
                        return elHTML.includes(htmlContent);
                    } catch (e) {
                        return false;
                    }
                }

                return false;
            },
            model: {
                defaults: {
                    name: block.name,
                    tagName: "div",
                    attributes: {
                        "data-custom-block-id": block.id,
                        "data-custom-block": "true",
                    },
                    traits: [],
                },
                init() {
                    const model = this;

                    this.on("change:attributes", this.handleAttrChange);

                    // Process block settings
                    if (block.settings) {
                        try {
                            const settings =
                                typeof block.settings === "string"
                                    ? JSON.parse(block.settings)
                                    : block.settings;

                            if (
                                settings.traits &&
                                Array.isArray(settings.traits)
                            ) {
                                const processedTraits = settings.traits.map(
                                    (trait) => {
                                        // Handle custom trait type for configurator
                                        if (
                                            trait.type ===
                                                "cards-configurator" ||
                                            trait.name === "configure"
                                        ) {
                                            return {
                                                type: "button",
                                                name: trait.name || "configure",
                                                label:
                                                    trait.label || "Configurar",
                                                text:
                                                    trait.text ||
                                                    trait.label ||
                                                    "Configurar Bloque",
                                                full: true,
                                                command: () => {
                                                    const selectedModel =
                                                        editor.getSelected();
                                                    if (selectedModel) {
                                                        executeAdminJS(
                                                            editor,
                                                            selectedModel,
                                                        );
                                                    }
                                                },
                                            };
                                        }
                                        return trait;
                                    },
                                );

                                this.set("traits", processedTraits);
                            }

                            if (
                                settings.attributes &&
                                typeof settings.attributes === "object"
                            ) {
                                const currentAttrs =
                                    this.get("attributes") || {};
                                this.set("attributes", {
                                    ...currentAttrs,
                                    ...settings.attributes,
                                });
                            }
                        } catch (e) {
                            console.error(
                                "Error processing block settings:",
                                e,
                            );
                        }
                    }

                    // Execute admin JS on initialization
                    executeAdminJS(editor, model);
                },
                handleAttrChange() {
                    // Handle attribute changes if needed
                },
            },
            view: {
                init() {
                    this.listenTo(
                        this.model,
                        "change:attributes",
                        this.handleAttrUpdate,
                    );
                },
                handleAttrUpdate() {
                    this.render();
                },
                events: {
                    dblclick: "handleDblClick",
                },
                handleDblClick(e) {
                    const model = this.model;
                    executeAdminJS(editor, model);
                },
            },
        });
    }
}
