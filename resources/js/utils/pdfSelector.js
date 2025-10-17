import { showMediaSelector } from "./mediaSelector";
import { showAlert } from "../toast";

// Setup PDF viewer component
export function setupPDFViewer(editor) {
    // Register custom component type
    editor.DomComponents.addType("pdf-viewer", {
        model: {
            defaults: {
                tagName: "div",
                attributes: { "data-gjs-type": "pdf-viewer" },
                traits: [
                    {
                        type: "button",
                        label: "Seleccionar PDF",
                        name: "selectPDF",
                        text: "Seleccionar PDF",
                        command: "open-pdf-selector",
                    },
                ],
            },
            init() {
                this.set("type", "pdf-viewer");
                const attrs = this.getAttributes();
                if (attrs["data-pdf-src"]) {
                    const view = this.getView();
                    if (view && view.el) {
                        updatePDFDisplay(
                            view.el,
                            attrs["data-pdf-src"],
                            attrs["data-pdf-name"] || "Documento PDF",
                        );
                    }
                }

                this.on("change:attributes", this.handleAttrChange);
            },
            handleAttrChange() {
                const attrs = this.getAttributes();
                const view = this.getView();
                if (view && view.el && attrs["data-pdf-src"]) {
                    updatePDFDisplay(
                        view.el,
                        attrs["data-pdf-src"],
                        attrs["data-pdf-name"] || "Documento PDF",
                    );
                }
            },
        },
        view: {
            events: {
                click: "onClick",
            },
            init() {
                const model = this.model;
                const attrs = model.getAttributes();

                this.el.setAttribute("data-gjs-type", "pdf-viewer");

                if (attrs["data-pdf-src"]) {
                    updatePDFDisplay(
                        this.el,
                        attrs["data-pdf-src"],
                        attrs["data-pdf-name"] || "Documento PDF",
                    );
                }
            },
            onClick(e) {
                if (
                    e.target.tagName === "OBJECT" ||
                    e.target.closest("object")
                ) {
                    e.stopPropagation();
                    return;
                }

                editor.select(this.model);
                editor.runCommand("open-pdf-selector", {
                    component: this.model,
                });
            },
            onRender() {
                const attrs = this.model.getAttributes();
                if (attrs["data-pdf-src"]) {
                    updatePDFDisplay(
                        this.el,
                        attrs["data-pdf-src"],
                        attrs["data-pdf-name"] || "Documento PDF",
                    );
                }
            },
        },
    });

    // Update PDF display function
    function updatePDFDisplay(el, src, name) {
        try {
            const placeholder = el.querySelector(".pdf-placeholder");
            const titleSpan = el.querySelector(".pdf-title");

            if (placeholder) {
                const pdfObject = document.createElement("object");
                pdfObject.setAttribute("data", src);
                pdfObject.setAttribute("type", "application/pdf");
                pdfObject.setAttribute("width", "100%");
                pdfObject.setAttribute("height", "500");
                pdfObject.classList.add("pdf-object");
                pdfObject.style.minHeight = "500px";

                pdfObject.innerHTML = `
                <div class="p-6 bg-gray-100 text-center">
                    <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                    <a href="${src}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                </div>
            `;

                placeholder.classList.add("hidden");

                let existingObject = el.querySelector(".pdf-object");
                if (existingObject) {
                    existingObject.setAttribute("data", src);
                } else {
                    placeholder.parentNode.insertBefore(
                        pdfObject,
                        placeholder.nextSibling,
                    );
                }

                if (titleSpan) {
                    titleSpan.textContent = name;
                }
            }
        } catch (error) {
            console.error("Error displaying PDF:", error);
            showAlert(`Error al mostrar el PDF: ${error.message}`, "error");
        }
    }

    // Add command for opening PDF selector
    editor.Commands.add("open-pdf-selector", {
        run(editor, sender, options = {}) {
            const component = options.component || editor.getSelected();
            if (!component) return;

            try {
                showMediaSelector("pdf", (mediaData) => {
                    const fileName =
                        mediaData.alt || mediaData.name || "Documento PDF";

                    component.set("attributes", {
                        ...component.getAttributes(),
                        "data-pdf-src": mediaData.src,
                        "data-pdf-name": fileName,
                    });
                });
            } catch (error) {
                console.error("Error selecting PDF:", error);
                showAlert(
                    `Error al seleccionar PDF: ${error.message}`,
                    "error",
                );
            }
        },
    });

    // Add event listener for editor load
    editor.on("load", function () {
        setTimeout(() => {
            try {
                const frame = editor.Canvas.getFrameEl();
                if (frame && frame.contentDocument) {
                    const pdfViewers = frame.contentDocument.querySelectorAll(
                        '[data-gjs-type="pdf-viewer"]',
                    );

                    pdfViewers.forEach((el) => {
                        const pdfSrc = el.getAttribute("data-pdf-src");
                        const pdfName =
                            el.getAttribute("data-pdf-name") || "Documento PDF";

                        if (pdfSrc) {
                            updatePDFDisplay(el, pdfSrc, pdfName);
                        }
                    });
                }
            } catch (error) {
                console.error("Error initializing PDF viewers:", error);
                showAlert(
                    `Error al inicializar visores PDF: ${error.message}`,
                    "error",
                );
            }
        }, 1000);
    });

    // Add event handler for component add
    editor.on("component:add", function (component) {
        if (
            component.get("type") === "pdf-viewer" ||
            component.getAttributes()["data-gjs-type"] === "pdf-viewer"
        ) {
            const attrs = component.getAttributes();
            if (attrs["data-pdf-src"]) {
                const view = component.getView();
                if (view && view.el) {
                    updatePDFDisplay(
                        view.el,
                        attrs["data-pdf-src"],
                        attrs["data-pdf-name"] || "Documento PDF",
                    );
                }
            }
        }
    });

    // Attach custom HTML for saving in the output
    editor.on("component:selected", function (component) {
        if (
            component.get("type") === "pdf-viewer" ||
            component.getAttributes()["data-gjs-type"] === "pdf-viewer"
        ) {
            const attrs = component.getAttributes();
            if (attrs["data-pdf-src"]) {
                const view = component.getView();
                if (view && view.el) {
                    updatePDFDisplay(
                        view.el,
                        attrs["data-pdf-src"],
                        attrs["data-pdf-name"] || "Documento PDF",
                    );
                }
            }
        }
    });

    // Add event listener to modify the HTML before saving
    editor.on("storage:start", function (obj) {
        const pdfViewers = editor.DomComponents.getComponents().filter(
            (component) =>
                component.get("type") === "pdf-viewer" ||
                (component.getAttributes() &&
                    component.getAttributes()["data-gjs-type"] ===
                        "pdf-viewer"),
        );

        pdfViewers.forEach((component) => {
            const attrs = component.getAttributes();
            if (attrs["data-pdf-src"]) {
                component.set(
                    "html-output",
                    `
                    <div class="pdf-viewer-container bg-white shadow-lg rounded-lg overflow-hidden" data-gjs-type="pdf-viewer" data-pdf-src="${attrs["data-pdf-src"]}" data-pdf-name="${attrs["data-pdf-name"] || "Documento PDF"}" style="min-height: 500px; width: 100%;">
                        <div class="p-4 bg-primary text-white font-semibold flex justify-between items-center">
                            <span class="pdf-title">${attrs["data-pdf-name"] || "Documento PDF"}</span>
                        </div>
                        <object data="${attrs["data-pdf-src"]}" type="application/pdf" width="100%" height="500" class="pdf-object" style="min-height: 500px;">
                            <div class="p-6 bg-gray-100 text-center">
                                <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                                <a href="${attrs["data-pdf-src"]}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                            </div>
                        </object>
                    </div>
                `,
                );
            }
        });
    });
}
