/**
 * Main editor implementation for the page builder
 */
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import {
    setupIconTraits,
    setupIconBlockNotifications,
} from "./utils/iconEditor";
import { setupMediaSelectorForImages } from "./utils/mediaSelector";
import { setupPDFViewer } from "./utils/pdfSelector";
import Swal from "sweetalert2";
import loadAllBlocks from "./blocks/index";
import { showAlert } from "./toast";

function getElementValue(id, defaultValue = "") {
    const element = document.getElementById(id);
    return element ? element.value : defaultValue;
}

document.addEventListener("DOMContentLoaded", function () {
    const editor = initEditor();
    setupSaveButton(editor);
    setupDeviceButtons(editor);
    loadPageData(editor);
    setupExitConfirmation(editor);
});

function initEditor() {
    const assetUploadUrl = getElementValue(
        "asset-upload-url",
        "/upload-assets",
    );

    const editor = createEditorInstance(assetUploadUrl);

    setupComponentHandlers(editor);
    setupEditorPanels(editor);
    setupEditorCommands(editor);
    setupCustomStyles(editor);
    setupTranslations(editor);
    setupComponentInitialization(editor);

    return editor;
}

function createEditorInstance(assetUploadUrl) {
    return grapesjs.init({
        container: "#gjs",
        fromElement: true,
        storageManager: setupStorageManager(),
        deviceManager: {
            devices: [
                {
                    name: "Desktop",
                    width: "",
                },
                {
                    name: "Tablet",
                    width: "768px",
                    widthMedia: "992px",
                },
                {
                    name: "Mobile",
                    width: "320px",
                    widthMedia: "575px",
                },
            ],
        },
        i18n: setupI18n(),
        assetManager: setupAssetManager(assetUploadUrl),
        canvas: {
            styles: [
                "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css",
                "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
            ],
            scripts: [],
        },
        styleManager: setupStyleManager(),
        plugins: [
            gjsPresetWebpage,
            (editor) => loadAllBlocks(editor),
            (editor) => remixIconsPlugin(editor),
            (editor) => setupMediaSelectorForImages(editor),
            (editor) => setupPDFViewer(editor),
        ],
        pluginsOpts: setupPluginsOptions(),
    });
}

function setupStorageManager() {
    const pageId = getElementValue("page-id");

    if (!pageId) {
        return false;
    }

    return {
        type: "local",
        id: "gjs-",
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
        options: {
            local: {
                key: `gjs-page-${pageId}`,
            },
        },
    };
}

function setupI18n() {
    return {
        locale: "es",
        messages: {
            es: {
                styleManager: {
                    properties: "Propiedades",
                    empty: "Selecciona un elemento para usar el Administrador de Estilos",
                    sectors: {
                        position: "Posición",
                        display: "Visualización",
                        flex: "Flex",
                        dimension: "Dimensiones",
                        typography: "Tipografía",
                        decorations: "Decoraciones",
                        extra: "Extra",
                        "flex-properties": "Propiedades Flex",
                        background: "Fondo",
                    },
                },
                traitManager: {
                    traits: "Atributos",
                    empty: "Selecciona un elemento para editarlo",
                },
                blockManager: {
                    labels: {
                        Secciones: "Secciones",
                        Elementos: "Elementos",
                        Botones: "Botones",
                        "link-block": "Bloque Enlace",
                        quote: "Cita",
                        "text-section": "Sección de Texto",
                        column1: "Una columna",
                        column2: "Dos columnas",
                        column3: "Tres columnas",
                        "column3-7": "Dos columnas 3/7",
                        text: "Texto",
                        link: "Enlace",
                        image: "Imagen",
                        Basic: "Básico",
                    },
                    categories: {
                        Basic: "Básico",
                        Secciones: "Secciones",
                        Elementos: "Elementos",
                        Botones: "Botones",
                        Typography: "Tipografía",
                        Media: "Medios",
                        Social: "Social",
                        Layout: "Diseño",
                    },
                },
                navigator: {
                    navigate: "Navegar",
                    component: "Componente",
                    components: "Componentes",
                    empty: "Sin componentes",
                },
                commands: {
                    undo: "Deshacer",
                    redo: "Rehacer",
                    clear: "Limpiar",
                    codeViewer: "Ver código",
                    openAssets: "Abrir medios",
                    openBlocks: "Abrir bloques",
                    openStyle: "Abrir estilos",
                    openTraits: "Abrir atributos",
                },
                assetManager: {
                    addButton: "Añadir imagen",
                    inputPlh: "http://ruta-a-tu-imagen.jpg",
                    modalTitle: "Selecciona la imagen",
                    uploadTitle:
                        "Arrastra tus archivos aquí o haz clic para subir",
                },
                deviceManager: {
                    device: "Dispositivo",
                    devices: {
                        desktop: "Escritorio",
                        tablet: "Tablet",
                        mobileLandscape: "Móvil Horizontal",
                        mobilePortrait: "Móvil Vertical",
                    },
                },
                panels: {
                    buttons: {
                        titles: {
                            preview: "Vista previa",
                            fullscreen: "Pantalla completa",
                            "sw-visibility": "Ver componentes",
                            "export-template": "Ver código",
                            "open-sm": "Abrir estilo",
                            "open-tm": "Configuraciones",
                            "open-layers": "Abrir capas",
                            "open-blocks": "Abrir bloques",
                        },
                    },
                },
                preset_webpage: {
                    blocks: {
                        "link-block": "Bloque Enlace",
                        quote: "Cita",
                        "text-section": "Sección de Texto",
                    },
                    categoryLabel: {
                        Basic: "Básico",
                        Typography: "Tipografía",
                        Media: "Medios",
                    },
                },
            },
        },
    };
}

function setupAssetManager(assetUploadUrl) {
    return {
        upload: assetUploadUrl,
        uploadName: "files",
        multiUpload: true,
        assets: [],
        uploadFile: (e) => {
            const files = e.dataTransfer
                ? e.dataTransfer.files
                : e.target.files;
            const formData = new FormData();

            for (const file of files) {
                formData.append("files[]", file);
            }

            fetch(assetUploadUrl, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.data) {
                        editor.AssetManager.add(data.data);
                        showAlert("Archivos subidos correctamente", "success");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    showAlert("Error al subir los archivos", "error");
                });
        },
    };
}

function setupStyleManager() {
    return {
        sectors: [
            {
                name: "Dimensiones",
                open: false,
                buildProps: [
                    "width",
                    "height",
                    "min-width",
                    "min-height",
                    "max-width",
                    "max-height",
                    "padding",
                    "margin",
                ],
            },
            {
                name: "Tipografía",
                open: false,
                buildProps: [
                    "font-family",
                    "font-size",
                    "font-weight",
                    "letter-spacing",
                    "color",
                    "line-height",
                    "text-align",
                    "text-shadow",
                ],
            },
            {
                name: "Decoración",
                open: false,
                buildProps: [
                    "background-color",
                    "border",
                    "border-radius",
                    "box-shadow",
                ],
            },
            {
                name: "Extra",
                open: false,
                buildProps: ["opacity", "transition", "transform"],
            },
        ],
    };
}

function setupPluginsOptions() {
    return {
        gjsPresetWebpage: {
            modalImportTitle: "Importar código",
            modalImportLabel: "Pega tu código HTML/CSS aquí:",
            modalImportContent: "",
            importViewerOptions: {},
            textCleanCanvas: "¿Estás seguro de limpiar el canvas?",
            showStylesOnChange: true,
            textGeneral: "General",
            textLayout: "Diseño",
            textTypography: "Tipografía",
            textDecorations: "Decoraciones",
            textExtra: "Extra",
            buttonImport: "Importar",
            buttonCancel: "Cancelar",

            blocks: {
                link: {
                    category: "Básico",
                    label: "Enlace",
                },
                quote: {
                    category: "Básico",
                    label: "Cita",
                },
                "text-basic": {
                    category: "Básico",
                    label: "Texto",
                },
                "link-block": {
                    category: "Básico",
                    label: "Bloque Enlace",
                },
                "text-section": {
                    category: "Básico",
                    label: "Sección de Texto",
                },
            },

            categoryLabel: {
                Basic: "Básico",
                Typography: "Tipografía",
                Media: "Medios",
                Social: "Social",
                Layout: "Diseño",
                Sections: "Secciones",
                Elements: "Elementos",
            },
        },
        gjsBlocksBasic: {
            blocks: [],
            category: "Básicos",
            labels: {
                column1: "Una columna",
                column2: "Dos columnas",
                column3: "Tres columnas",
                "column3-7": "Dos columnas 3/7",
                text: "Texto",
                link: "Enlace",
                image: "Imagen",
                video: "Video",
                section: "Sección",
                paragraph: "Párrafo",
                default: "Predeterminado",
            },
            flexGrid: true,
            stylePrefix: "gjs-",
        },
    };
}

function setupComponentHandlers(editor) {
    editor.on("component:loaded", function (component) {
        handlePDFComponent(component);
    });

    editor.on("component:selected", function (component) {
        if (component) {
            const classes = component.getClasses();

            if (classes.length) {
                const tailwindClasses = classes.join(" ");
                const name = component.getName();
                component.set("custom-name", `${name} [${tailwindClasses}]`);
            }
        }
    });
}

function handlePDFComponent(component) {
    const attributes = component.getAttributes();
    if (attributes && attributes["data-gjs-type"] === "pdf-viewer") {
        component.set("type", "pdf-viewer");

        if (attributes["data-pdf-src"]) {
            const el = component.view.el;
            if (el) {
                const src = attributes["data-pdf-src"];
                const name = attributes["data-pdf-name"] || "Documento PDF";

                const placeholder = el.querySelector(".pdf-placeholder");
                const titleSpan = el.querySelector(".pdf-title");
                const downloadLink = el.querySelector(".pdf-download-link");

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
                    placeholder.parentNode.insertBefore(
                        pdfObject,
                        placeholder.nextSibling,
                    );

                    if (titleSpan) {
                        titleSpan.textContent = name;
                    }

                    if (downloadLink) {
                        downloadLink.href = src;
                        downloadLink.classList.remove("hidden");
                    }
                }
            }
        }
    }
}

function setupComponentInitialization(editor) {
    editor.on("canvas:load", function () {
        setTimeout(function () {
            const frame = editor.Canvas.getFrameEl();
            if (frame && frame.contentDocument) {
                // Inicializar selectores de cuenta en el editor
                const selectors = frame.contentDocument.querySelectorAll(
                    ".account-selector-container",
                );
                if (selectors.length > 0) {
                    const scriptEl =
                        frame.contentDocument.createElement("script");
                    scriptEl.textContent = `
                        (function() {
                            const containers = document.querySelectorAll('.account-selector-container');
                            
                            containers.forEach(container => {
                                if (container.hasAttribute('data-initialized')) return;
                                
                                const buttons = container.querySelectorAll('.account-type-btn');
                                const panels = container.querySelectorAll('.account-panel');
                                const header = container.querySelector('.account-header');
                                const headerTitle = header ? header.querySelector('.account-title') : null;
                                const headerDesc = header ? header.querySelector('.account-description') : null;
                                const closeBtn = header ? header.querySelector('.close-btn') : null;
                                const buttonsContainer = container.querySelector('.buttons-container');
                                const defaultActive = parseInt(container.getAttribute('data-active') || '-1');
                                
                                function activatePanel(index) {
                                    panels.forEach(panel => panel.classList.add('hidden'));
                                    
                                    buttons.forEach(btn => {
                                        btn.classList.remove('bg-primary', 'text-white');
                                        btn.classList.add('bg-white', 'text-primary');
                                    });
                                    
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
                                
                                // Add click events
                                buttons.forEach((btn, index) => {
                                    btn.addEventListener('click', function() {
                                        activatePanel(index);
                                    });
                                });
                                
                                if (closeBtn) {
                                    closeBtn.addEventListener('click', function() {
                                        activatePanel(-1);
                                    });
                                }
                                
                                // Set initial state
                                if (defaultActive >= 0 && defaultActive < buttons.length) {
                                    activatePanel(defaultActive);
                                }
                                
                                container.setAttribute('data-initialized', 'true');
                            });
                        })();
                    `;
                    frame.contentDocument.body.appendChild(scriptEl);
                }
            }
        }, 1000);
    });

    editor.on("component:add", function (component) {
        if (component.get("type") === "account-selector") {
            setTimeout(function () {
                const frame = editor.Canvas.getFrameEl();
                if (frame && frame.contentDocument) {
                    const selectors = frame.contentDocument.querySelectorAll(
                        ".account-selector-container:not([data-initialized])",
                    );
                    if (selectors.length > 0) {
                        const scriptEl =
                            frame.contentDocument.createElement("script");
                        scriptEl.textContent = `
                            (function() {
                                const containers = document.querySelectorAll('.account-selector-container:not([data-initialized])');
                                
                                containers.forEach(container => {
                                    const buttons = container.querySelectorAll('.account-type-btn');
                                    const panels = container.querySelectorAll('.account-panel');
                                    const header = container.querySelector('.account-header');
                                    const headerTitle = header ? header.querySelector('.account-title') : null;
                                    const headerDesc = header ? header.querySelector('.account-description') : null;
                                    const closeBtn = header ? header.querySelector('.close-btn') : null;
                                    const buttonsContainer = container.querySelector('.buttons-container');
                                    const defaultActive = parseInt(container.getAttribute('data-active') || '-1');
                                    
                                    function activatePanel(index) {
                                        panels.forEach(panel => panel.classList.add('hidden'));
                                        
                                        buttons.forEach(btn => {
                                            btn.classList.remove('bg-primary', 'text-white');
                                            btn.classList.add('bg-white', 'text-primary');
                                        });
                                        
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
                                    
                                    // Add click events
                                    buttons.forEach((btn, index) => {
                                        btn.addEventListener('click', function() {
                                            activatePanel(index);
                                        });
                                    });
                                    
                                    if (closeBtn) {
                                        closeBtn.addEventListener('click', function() {
                                            activatePanel(-1);
                                        });
                                    }
                                    
                                    // Set initial state
                                    if (defaultActive >= 0 && defaultActive < buttons.length) {
                                        activatePanel(defaultActive);
                                    }
                                    
                                    container.setAttribute('data-initialized', 'true');
                                });
                            })();
                        `;
                        frame.contentDocument.body.appendChild(scriptEl);
                    }
                }
            }, 500);
        }
    });
}

function setupEditorPanels(editor) {
    editor.Panels.addPanel({
        id: "panel-preview",
        visible: true,
        buttons: [
            {
                id: "preview",
                className: "ri-eye-line",
                command: {
                    run: function (editor) {
                        editor.runCommand("core:preview");
                        showAlert("Modo vista previa activado", "info");
                    },
                    stop: function (editor) {
                        editor.stopCommand("core:preview");
                        showAlert("Modo edición activado", "info");
                    },
                },
                attributes: { title: "Vista Previa" },
            },
        ],
    });

    editor.Panels.addPanel({
        id: "panel-tailwind",
        visible: true,
        buttons: [
            {
                id: "open-tailwind-classes",
                className: "ri-code-box-line",
                command: "open-tailwind",
                attributes: { title: "Clases Tailwind" },
            },
        ],
    });
}

function setupEditorCommands(editor) {
    editor.Commands.add("canvas-clear", {
        run: function (editor) {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Realmente deseas limpiar el canvas? Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#23366A",
                cancelButtonColor: "#e74c3c",
                confirmButtonText: "Sí, limpiar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    editor.DomComponents.clear();
                    editor.CssComposer.clear();
                    showAlert(
                        "El canvas ha sido limpiado correctamente",
                        "success",
                    );
                }
            });
        },
    });

    editor.Commands.add("open-tailwind", {
        run: function (editor) {
            const selected = editor.getSelected();
            if (!selected) return;

            const currentClasses = selected.getClasses().join(" ");

            Swal.fire({
                title: "Clases Tailwind",
                input: "textarea",
                inputValue: currentClasses,
                inputPlaceholder: "Ingresa las clases separadas por espacios",
                showCancelButton: true,
                confirmButtonText: "Aplicar",
                confirmButtonColor: "#23366A",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#e74c3c",
                preConfirm: (classes) => {
                    return classes.split(" ").filter((cls) => cls);
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    selected.removeClass(selected.getClasses());
                    selected.addClass(result.value);
                    showAlert("Clases aplicadas correctamente", "success");
                }
            });
        },
    });
}

function setupCustomStyles(editor) {
    editor.on("load", () => {
        addGlobalStyles();
        addCanvasStyles(editor);
        removeUnwantedBlocks(editor);
        collapseCategories(editor);
        activateComponentOutlines(editor);
    });

    editor.on("canvas:render", () => {
        addCustomCanvasStyles(editor);
    });
}

function addGlobalStyles() {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
        :root {
            --color-primary: #ffffff;
            --color-primary-dark: #0f2d54;
            --color-dark: #333333;
            --color-danger: #e74c3c;
            --color-light: #f8f9fa;
        }
        .bg-primary {
            background-color: #23366A !important;
        }
        .bg-primary\\/90 {
            background-color: rgba(18, 60, 105, 0.9) !important;
        }
        .bg-secondary {
            background-color: #333333 !important;
        }
        .text-primary {
            color: #23366A !important;
        }
        .text-secondary {
            color: #333333 !important;
        }
        .hover\\:bg-primary:hover {
            background-color: #23366A !important;
        }
        .hover\\:bg-primary\\/90:hover {
            background-color: rgba(18, 60, 105, 0.9) !important;
        }
        .hover\\:text-primary:hover {
            color: #23366A !important;
        }
        .focus\\:border-primary:focus {
            border-color: #23366A !important;
        }
        .from-primary {
            --tw-gradient-from: #23366A !important;
            --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(18, 60, 105, 0)) !important;
        }
        .to-secondary {
            --tw-gradient-to: #0f2d54 !important;
        }
        .gjs-block svg {
            display: block;
            margin: 0 auto;
            max-width: 100%;
        }
        .gjs-block-label {
            text-align: center;
            width: 100%;
        }
    `;
    document.head.appendChild(styleEl);
}

function addCanvasStyles(editor) {
    const frame = editor.Canvas.getFrameEl();
    if (frame && frame.contentDocument) {
        const frameStyleEl = frame.contentDocument.createElement("style");
        frameStyleEl.innerHTML = `
            .bg-primary {
                background-color: #23366A !important;
            }
            .bg-primary\\/90 {
                background-color: rgba(18, 60, 105, 0.9) !important;
            }
            .bg-secondary {
                background-color: #333333 !important;
            }
            .text-primary {
                color: #23366A !important;
            }
            .text-secondary {
                color: #333333 !important;
            }
            .hover\\:bg-primary:hover {
                background-color: #23366A !important;
            }
            .hover\\:text-primary:hover {
                color: #23366A !important;
            }
            .focus\\:border-primary:focus {
                border-color: #23366A !important;
            }
            .from-primary {
                --tw-gradient-from: #23366A !important;
                --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(18, 60, 105, 0)) !important;
            }
            .to-secondary {
                --tw-gradient-to: #0f2d54 !important;
            }
        `;
        frame.contentDocument.head.appendChild(frameStyleEl);
    }
}

function addCustomCanvasStyles(editor) {
    const frame = editor.Canvas.getFrameEl();
    if (frame && frame.contentDocument) {
        if (!frame.contentDocument.getElementById("theme-custom-styles")) {
            const frameStyleEl = frame.contentDocument.createElement("style");
            frameStyleEl.id = "theme-custom-styles";
            frameStyleEl.innerHTML = `
                .bg-primary {
                    background-color: #23366A !important;
                }
                .bg-primary\\/90 {
                    background-color: rgba(18, 60, 105, 0.9) !important;
                }
                .bg-secondary {
                    background-color: #333333 !important;
                }
                .text-primary {
                    color: #23366A !important;
                }
                .text-secondary {
                    color: #333333 !important;
                }
                .hover\\:bg-primary:hover {
                    background-color: #23366A !important;
                }
                .hover\\:text-primary:hover {
                    color: #23366A !important;
                }
                .focus\\:border-primary:focus {
                    border-color: #23366A !important;
                }
                .from-primary {
                    --tw-gradient-from: #23366A !important;
                    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(18, 60, 105, 0)) !important;
                }
                .to-secondary {
                    --tw-gradient-to: #0f2d54 !important;
                }
            `;
            frame.contentDocument.head.appendChild(frameStyleEl);
        }
    }
}

function removeUnwantedBlocks(editor) {
    const unwantedBlocks = [
        "map",
        "default",
        "text-basic",
        "quote",
        "link-block",
        "text-section",
    ];
    unwantedBlocks.forEach((blockId) => {
        const block = editor.BlockManager.get(blockId);
        if (block) {
            editor.BlockManager.remove(blockId);
        }
    });
}

function collapseCategories(editor) {
    editor.BlockManager.getCategories().each((category) => {
        const id = category.get("id");
        if (id !== "Basic" && id !== "Básico") {
            category.set("open", false);
        } else {
            category.set("open", true);
        }
    });
}

function activateComponentOutlines(editor) {
    editor.runCommand("sw-visibility");
    const button = editor.Panels.getButton("options", "sw-visibility");
    if (button) {
        button.set("active", true);
    }
}

function setupTranslations(editor) {
    const blockManager = editor.BlockManager;

    const blocksToTranslate = {
        "link-block": "Bloque Enlace",
        quote: "Cita",
        "text-section": "Sección de Texto",
        column1: "Una columna",
        column2: "Dos columnas",
        column3: "Tres columnas",
        "column3-7": "Dos columnas 3/7",
        text: "Texto",
        link: "Enlace",
        image: "Imagen",
    };

    Object.entries(blocksToTranslate).forEach(([blockId, label]) => {
        const block = blockManager.get(blockId);
        if (block) {
            block.set("label", label);
        }
    });

    const categoriesToTranslate = {
        Basic: "Básico",
        Typography: "Tipografía",
        Media: "Medios",
        Social: "Social",
        Layout: "Diseño",
        Sections: "Secciones",
        Elements: "Elementos",
    };

    blockManager.getCategories().each((category) => {
        const id = category.get("id");
        if (categoriesToTranslate[id]) {
            category.set("label", categoriesToTranslate[id]);
        }
    });
}

function remixIconsPlugin(editor) {
    editor.BlockManager.add("icon-block", {
        label: "Icono",
        category: "Elementos",
        content:
            '<i class="ri-home-line" style="font-size: 24px; color: #23366A;"></i>',
        media: `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#23366A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
    });

    setupIconTraits(editor);
    setupIconBlockNotifications(editor);
}

function setupDeviceButtons(editor) {
    editor.Panels.addPanel({
        id: "panel-devices",
        visible: true,
        buttons: [
            {
                id: "device-desktop",
                command: "set-device-desktop",
                className: "ri-computer-line",
                active: true,
                attributes: { title: "Vista Escritorio" },
            },
            {
                id: "device-tablet",
                command: "set-device-tablet",
                className: "ri-tablet-line",
                attributes: { title: "Vista Tablet" },
            },
            {
                id: "device-mobile",
                command: "set-device-mobile",
                className: "ri-smartphone-line",
                attributes: { title: "Vista Móvil" },
            },
        ],
    });

    editor.Commands.add("set-device-desktop", {
        run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-tablet", {
        run: (editor) => editor.setDevice("Tablet"),
    });
    editor.Commands.add("set-device-mobile", {
        run: (editor) => editor.setDevice("Mobile"),
    });
}

function setupSaveButton(editor) {
    const saveButton = document.getElementById("save-button");
    if (!saveButton) return;

    const badge = createUnsavedChangesBadge();

    saveButton.parentNode.insertBefore(badge, saveButton);

    let isInitialLoad = true;

    const showBadge = () => {
        if (!isInitialLoad) {
            badge.style.display = "inline";
        }
    };

    const hideBadge = () => {
        badge.style.display = "none";
    };

    setTimeout(() => {
        isInitialLoad = false;
    }, 1000);

    editor.on("component:update", showBadge);
    editor.on("component:add", showBadge);
    editor.on("component:remove", showBadge);
    editor.on("style:update", showBadge);

    saveButton.addEventListener("click", function () {
        savePageData(editor);
    });

    document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            savePageData(editor);
        }
    });

    document.addEventListener("editor:saved", hideBadge);
}

function createUnsavedChangesBadge() {
    const badge = document.createElement("span");
    badge.id = "unsaved-changes-badge";
    badge.textContent = "●";
    badge.style.cssText = `
        display: none;
        color: #e74c3c;
        font-size: 20px;
        margin-right: 6px;
        animation: pulse 1.5s ease-in-out infinite;
    `;

    const style = document.createElement("style");
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);

    return badge;
}

function loadPageData(editor) {
    const pageId = getElementValue("page-id");
    const loadUrl = getElementValue("page-load-url");

    if (pageId && loadUrl) {
        fetch(loadUrl)
            .then((response) => response.json())
            .then((data) => {
                editor.setComponents(data.html || "");
                editor.setStyle(data.css || "");
                showAlert(
                    "Datos de la página cargados correctamente",
                    "success",
                );

                window.history.pushState(
                    { pageId },
                    document.title,
                    window.location.href,
                );
            })
            .catch((error) => {
                console.error("Error loading page data:", error);
                showAlert("Error al cargar los datos de la página", "error");
            });
    } else {
        window.history.pushState(
            { isNew: true },
            document.title,
            window.location.href,
        );
    }
}

function savePageData(editor) {
    const pageId = getElementValue("page-id");
    const storeUrl = getElementValue("page-store-url", "/pages/store");

    preparePDFComponents(editor);

    const htmlContent = editor.getHtml();
    let cssContent = editor.getCss() || "";
    let jsContent = editor.getJs() || "";

    // Check for account selectors
    if (
        htmlContent.includes("account-selector-container") &&
        !jsContent.includes("initializeAccountSelectors")
    ) {
        const accountSelectorScript = `
        // Account Selector Initialization Script
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

        // Call on DOMContentLoaded
        document.addEventListener('DOMContentLoaded', initializeAccountSelectors);

        // Also run immediately if DOM is already ready
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(initializeAccountSelectors, 100);
        }
        `;
        jsContent += "\n\n" + accountSelectorScript;
    }

    // Check for quick access carousel
    if (htmlContent.includes("quick-access-carousel")) {
        if (
            !jsContent.includes("scrollBy") ||
            !jsContent.includes("quick-access-carousel")
        ) {
            const carouselScript = `
            // Quick Access Carousel scrolling functionality
            (function() {
            if (!Element.prototype.scrollBy) {
                Element.prototype.scrollBy = function(options) {
                if (typeof options === 'object') {
                    var left = options.left || 0;
                    var top = options.top || 0;
                    this.scrollLeft += left;
                    this.scrollTop += top;
                }
                };
            }
            
            document.addEventListener('DOMContentLoaded', function() {
                var carousel = document.getElementById('quick-access-carousel');
                if (carousel) {
                var leftButtons = document.querySelectorAll('.ri-arrow-left-s-line, button:first-of-type');
                var rightButtons = document.querySelectorAll('.ri-arrow-right-s-line, button:last-of-type');
                
                leftButtons.forEach(function(btn) {
                    btn.addEventListener('click', function() {
                    carousel.scrollBy({left: -300, behavior: 'smooth'});
                    });
                });
                
                rightButtons.forEach(function(btn) {
                    btn.addEventListener('click', function() {
                    carousel.scrollBy({left: 300, behavior: 'smooth'});
                    });
                });
                }
            });
            })();`;

            jsContent += "\n\n" + carouselScript;
        }
    }

    // Check for configurable banner
    if (htmlContent.includes("banner-slides-container")) {
        if (
            !jsContent.includes("banner-dot") ||
            !jsContent.includes("banner-slide")
        ) {
            const bannerScript = `
            // Banner Slider functionality
            (function() {
            document.addEventListener('DOMContentLoaded', function() {
                var slidesContainers = document.querySelectorAll('.banner-slides-container');
                
                slidesContainers.forEach(function(container) {
                    var slides = container.querySelectorAll('.banner-slide');
                    var dotsContainer = container.closest('.max-w-7xl').querySelector('.banner-dots-container');
                    var dots = dotsContainer ? dotsContainer.querySelectorAll('.banner-dot') : [];
                    var slidesCount = slides.length;
                    var currentSlide = 0;
                    var slideInterval;
                    
                    function goToSlide(index) {
                        if (slideInterval) {
                            clearInterval(slideInterval);
                        }
                        
                        slides.forEach(function(slide) {
                            slide.classList.remove('active', 'fadeIn');
                            slide.classList.add('fadeOut');
                            setTimeout(function() {
                                slide.style.display = 'none';
                            }, 500);
                        });
                        
                        dots.forEach(function(dot) {
                            dot.classList.remove('active');
                        });
                        
                        setTimeout(function() {
                            slides[index].style.display = 'flex';
                            slides[index].classList.remove('fadeOut');
                            slides[index].classList.add('active', 'fadeIn');
                            
                            if(dots[index]) {
                                dots[index].classList.add('active');
                            }
                            
                            currentSlide = index;
                            
                            if (slidesCount > 1) {
                                startSlideTimer();
                            }
                        }, 500);
                    }
                    
                    function nextSlide() {
                        var next = (currentSlide + 1) % slidesCount;
                        goToSlide(next);
                    }
                    
                    function startSlideTimer() {
                        slideInterval = setInterval(function() {
                            nextSlide();
                        }, 5000);
                    }
                    
                    dots.forEach(function(dot, index) {
                        dot.addEventListener('click', function() {
                            goToSlide(index);
                        });
                    });
                    
                    if (slidesCount > 0) {
                        // Add initial classes
                        slides[0].classList.add('active', 'fadeIn');
                        if(dots[0]) dots[0].classList.add('active');
                        
                        if (slidesCount > 1) {
                            startSlideTimer();
                        }
                    }
                });
            });
            })();`;

            // Add CSS for animations
            const animationCSS = `
            /* Banner Animations */
            .banner-slide {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            .banner-slide.fadeIn {
                opacity: 1;
            }
            .banner-slide.fadeOut {
                opacity: 0;
            }
            .banner-slide.active {
                display: flex !important;
            }`;

            jsContent += "\n\n" + bannerScript;
            cssContent += "\n\n" + animationCSS;
        }
    }

    let formData = {
        html: htmlContent,
        css: cssContent,
        js: jsContent,
    };

    if (pageId) {
        formData.id = pageId;
        sendSaveRequest(storeUrl, formData);
        document.dispatchEvent(new CustomEvent("editor:saved"));
    } else {
        promptForPageTitle(storeUrl, formData);
    }
}

function preparePDFComponents(editor) {
    const pdfViewers = editor.DomComponents.getComponents().filter(
        (component) =>
            component.get("type") === "pdf-viewer" ||
            (component.getAttributes &&
                component.getAttributes()["data-gjs-type"] === "pdf-viewer"),
    );

    pdfViewers.forEach((component) => {
        const attrs = component.getAttributes();
        if (attrs && attrs["data-pdf-src"]) {
            const viewEl = component.view.el;
            const pdfSrc = attrs["data-pdf-src"];
            const pdfName = attrs["data-pdf-name"] || "Documento PDF";

            let pdfObject = viewEl.querySelector(".pdf-object");
            if (!pdfObject) {
                pdfObject = document.createElement("object");
                pdfObject.setAttribute("data", pdfSrc);
                pdfObject.setAttribute("type", "application/pdf");
                pdfObject.setAttribute("width", "100%");
                pdfObject.setAttribute("height", "500");
                pdfObject.classList.add("pdf-object");
                pdfObject.style.minHeight = "500px";

                pdfObject.innerHTML = `
                    <div class="p-6 bg-gray-100 text-center">
                        <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                        <a href="${pdfSrc}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                    </div>
                `;

                const placeholder = viewEl.querySelector(".pdf-placeholder");
                if (placeholder) {
                    placeholder.classList.add("hidden");
                    placeholder.parentNode.insertBefore(
                        pdfObject,
                        placeholder.nextSibling,
                    );
                }
            }
        }
    });
}

function promptForPageTitle(storeUrl, formData) {
    Swal.fire({
        title: "Título de la página",
        input: "text",
        inputLabel: "Ingresa un título para la página",
        inputPlaceholder: "Título de la página",
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        confirmButtonColor: "#23366A",
        cancelButtonColor: "#e74c3c",
        inputValidator: (value) => {
            if (!value) {
                return "Debes ingresar un título para la página";
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            formData.title = result.value;
            sendSaveRequest(storeUrl, formData);
            document.dispatchEvent(new CustomEvent("editor:saved"));
        }
    });
}

function sendSaveRequest(url, data) {
    Swal.fire({
        title: "Guardando...",
        html: "Por favor espera mientras se guarda la página",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            Swal.close();
            handleSaveResponse(result, data);
        })
        .catch((error) => {
            Swal.close();
            console.error("Error:", error);
            showAlert("Error al guardar la página", "error");
        });
}

function handleSaveResponse(result, data) {
    if (result.success) {
        showAlert("Página guardada correctamente", "success");
        window.editorHasUnsavedChanges = false;
        document.dispatchEvent(new CustomEvent("editor:saved"));

        if (!data.id && result.id) {
            updatePageInfo(result.id, data.title);
        }
    } else {
        showAlert(
            "Error al guardar la página: " +
                (result.message || "Error desconocido"),
            "error",
        );
    }
}

function updatePageInfo(pageId, title) {
    const pageIdElement = document.getElementById("page-id");
    if (pageIdElement) pageIdElement.value = pageId;

    const loadUrlElement = document.getElementById("page-load-url");
    if (loadUrlElement)
        loadUrlElement.value = loadUrlElement.value.replace("new", pageId);

    const titleElement = document.querySelector(".editor-title");
    if (titleElement && title) {
        titleElement.textContent = "Editando: " + title;
    }

    window.history.pushState({}, "Editando: " + title, "/editor/" + pageId);
}

function setupExitConfirmation(editor) {
    let hasUnsavedChanges = false;
    let isNavigatingAway = false;

    const isNewPage = !getElementValue("page-id");

    if (isNewPage) {
        clearNewPageLocalStorage();
    }

    editor.on("component:update", () => {
        hasUnsavedChanges = true;
    });
    editor.on("component:add", () => {
        hasUnsavedChanges = true;
    });
    editor.on("component:remove", () => {
        hasUnsavedChanges = true;
    });
    editor.on("style:update", () => {
        hasUnsavedChanges = true;
    });

    document.addEventListener("editor:saved", () => {
        hasUnsavedChanges = false;
    });

    const saveButton = document.getElementById("save-button");
    if (saveButton) {
        saveButton.addEventListener("click", function () {
            setTimeout(() => {
                hasUnsavedChanges = false;
            }, 1000);
        });
    }

    document.addEventListener("click", function (e) {
        handleNavigationClick(e, hasUnsavedChanges, isNewPage, (value) => {
            isNavigatingAway = value;
        });
    });

    window.addEventListener("popstate", function (e) {
        handlePopState(
            e,
            hasUnsavedChanges,
            isNavigatingAway,
            isNewPage,
            (value) => {
                isNavigatingAway = value;
            },
        );
    });

    setupNavigationButtons();
}

function clearNewPageLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("gjs-") && !key.includes("page-")) {
            localStorage.removeItem(key);
        }
    }
}

function handleNavigationClick(
    e,
    hasUnsavedChanges,
    isNewPage,
    setNavigatingAway,
) {
    const navElement = e.target.closest("a[href], button[data-nav]");

    if (
        navElement &&
        !navElement.closest("#gjs") &&
        !navElement.closest(".swal2-container") &&
        hasUnsavedChanges
    ) {
        const href = navElement.getAttribute("href") || "";
        const isNavButton = navElement.hasAttribute("data-nav");

        if (
            (href &&
                !href.startsWith("#") &&
                !href.startsWith("javascript:")) ||
            isNavButton
        ) {
            e.preventDefault();

            Swal.fire({
                title: "¿Estás seguro?",
                text: "Hay cambios sin guardar que se perderán si sales de esta página.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#23366A",
                cancelButtonColor: "#e74c3c",
                confirmButtonText: "Sí, salir",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    setNavigatingAway(true);

                    if (isNewPage) {
                        clearNewPageLocalStorage();
                    }

                    if (href) {
                        window.location.href = href;
                    } else if (isNavButton) {
                        handleNavButtonAction(navElement);
                    }
                }
            });
        }
    }
}

function handleNavButtonAction(navElement) {
    const navAction = navElement.getAttribute("data-nav");
    if (navAction === "back") {
        window.history.back();
    } else if (navAction === "home") {
        window.location.href = "/";
    } else if (navAction) {
        window.location.href = navAction;
    }
}

function handlePopState(
    e,
    hasUnsavedChanges,
    isNavigatingAway,
    isNewPage,
    setNavigatingAway,
) {
    if (hasUnsavedChanges && !isNavigatingAway) {
        e.preventDefault();
        history.pushState(null, document.title, window.location.href);

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Hay cambios sin guardar que se perderán si sales de esta página.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#23366A",
            cancelButtonColor: "#e74c3c",
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setNavigatingAway(true);

                if (isNewPage) {
                    clearNewPageLocalStorage();
                }

                window.history.back();
            }
        });
    }
}

function setupNavigationButtons() {
    const backButtons = document.querySelectorAll(
        ".back-button, .nav-back, .btn-back",
    );
    backButtons.forEach((btn) => {
        if (!btn.hasAttribute("href") && !btn.hasAttribute("data-nav")) {
            btn.setAttribute("data-nav", "back");
        }
    });

    const homeButtons = document.querySelectorAll(
        ".home-button, .nav-home, .btn-home",
    );
    homeButtons.forEach((btn) => {
        if (!btn.hasAttribute("href") && !btn.hasAttribute("data-nav")) {
            btn.setAttribute("data-nav", "home");
        }
    });
}

export default initEditor;
