import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import {
    setupIconTraits,
    setupIconBlockNotifications,
} from "./utils/iconEditor";
import { setupMediaSelectorForImages } from "./utils/mediaSelector";
import Swal from "sweetalert2";
import loadFooterBlocks from "./blocks/footerBlocks";
import loadIconBlocks from "./blocks/iconBlocks";
import loadButtonBlocks from "./blocks/buttonBlocks";
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

    const editor = grapesjs.init({
        container: "#gjs",
        fromElement: true,
        storageManager: (() => {
            const pageId = getElementValue("page-id");

            if (!pageId) {
                return false;
            }

            return {
                type: "local",
                id: "gjs-footer-",
                autosave: true,
                autoload: true,
                stepsBeforeSave: 1,
                options: {
                    local: {
                        key: `gjs-footer-${pageId}`,
                    },
                },
            };
        })(),
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
        i18n: {
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
                            map: "Mapa",
                            Basic: "Básico",
                            footers: "Pies de Página",
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
                            footers: "Pies de Página",
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
                },
            },
        },
        assetManager: {
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
                            showAlert(
                                "Archivos subidos correctamente",
                                "success",
                            );
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        showAlert("Error al subir los archivos", "error");
                    });
            },
        },
        canvas: {
            styles: [
                "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css",
                "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
            ],
            scripts: [],
        },
        styleManager: {
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
                {
                    name: "Flex",
                    open: false,
                    buildProps: [
                        "display",
                        "flex-direction",
                        "flex-wrap",
                        "justify-content",
                        "align-items",
                        "align-content",
                        "order",
                        "flex-basis",
                        "flex-grow",
                        "flex-shrink",
                        "align-self",
                    ],
                },
                {
                    name: "Responsive",
                    open: false,
                    buildProps: ["responsive-hidden", "responsive-visible"],
                    properties: [
                        {
                            name: "responsive-hidden",
                            label: "Ocultar en",
                            type: "select",
                            options: [
                                { id: "", name: "Ninguno" },
                                { id: "hidden md:block", name: "Móvil" },
                                { id: "md:hidden", name: "Desktop" },
                            ],
                        },
                        {
                            name: "responsive-visible",
                            label: "Mostrar en",
                            type: "select",
                            options: [
                                { id: "", name: "Siempre" },
                                { id: "md:flex", name: "Solo Desktop" },
                                { id: "flex md:hidden", name: "Solo Móvil" },
                            ],
                        },
                    ],
                },
            ],
        },
        plugins: [
            gjsPresetWebpage,
            gjsBlocksBasic,
            (editor) => loadFooterBlocks(editor),
            (editor) => loadIconBlocks(editor),
            (editor) => loadButtonBlocks(editor),
            (editor) => remixIconsPlugin(editor),
            (editor) => setupMediaSelectorForImages(editor),
        ],
        pluginsOpts: {
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
            },
            gjsBlocksBasic: {
                blocks: [
                    "column1",
                    "column2",
                    "column3",
                    "column3-7",
                    "text",
                    "link",
                    "image",
                ],
                category: "Básicos",
                labels: {
                    column1: "Una columna",
                    column2: "Dos columnas",
                    column3: "Tres columnas",
                    "column3-7": "Dos columnas 3/7",
                    text: "Texto",
                    link: "Enlace",
                    image: "Imagen",
                    default: "Predeterminado",
                },
                flexGrid: true,
                stylePrefix: "gjs-",
            },
        },
    });

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

    editor.on("load", () => {
        const styleEl = document.createElement("style");
        styleEl.innerHTML = `
        :root {
            --color-primary: #23366A;
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
        .swal2-styled.swal2-confirm {
            background-color: #23366A !important;
        }
        .swal2-styled.swal2-cancel {
            background-color: #e74c3c !important;
        }
        .swal2-popup {
            border-radius: 0.5rem;
        }
        .swal2-styled {
            border-radius: 0 !important;
            font-weight: 500 !important;
        }
        .swal2-title {
            color: #333333 !important;
        }
        .gjs-block {
            padding: 10px;
            min-height: 90px;
            font-size: 12px;
            text-align: center;
            border-radius: 0 !important;
        }
        .gjs-block:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .gjs-block svg {
            margin: 0 auto 5px;
        }
        button {
            border-radius: 0 !important;
        }
        .gjs-pn-btn.gjs-pn-active {
            background-color: #23366A !important;
            color: white !important;
        }
        .gjs-block-category-footers .gjs-block {
            border-left: 3px solid #23366A;
        }
        .gjs-category-open .gjs-title.gjs-block-category-footers {
            background-color: rgba(18, 60, 105, 0.1);
        }
    `;
        document.head.appendChild(styleEl);

        editor.runCommand("sw-visibility");
        const button = editor.Panels.getButton("options", "sw-visibility");
        if (button) {
            button.set("active", true);
        }
    });

    editor.on("canvas:render", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame) {
            const frameDoc = frame.contentDocument;
            if (frameDoc) {
                if (!frameDoc.getElementById("theme-custom-styles")) {
                    const frameStyleEl = frameDoc.createElement("style");
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
                    frameDoc.head.appendChild(frameStyleEl);
                }
            }
        }
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

    editor.DomComponents.addType("footer", {
        model: {
            defaults: {
                traits: [
                    {
                        type: "select",
                        name: "footer-style",
                        label: "Estilo de Pie de Página",
                        options: [
                            { id: "light", name: "Claro" },
                            { id: "dark", name: "Oscuro" },
                            { id: "primary", name: "Color Primario" },
                            { id: "transparent", name: "Transparente" },
                        ],
                        changeProp: 1,
                    },
                    {
                        type: "checkbox",
                        name: "with-shadow",
                        label: "Con sombra",
                    },
                ],
            },

            init() {
                this.on("change:footer-style", this.handleFooterStyle);
                this.on("change:with-shadow", this.handleShadow);
                this.listenTo(this, "change:attributes", this.handleAttrChange);
            },

            handleFooterStyle() {
                const style = this.get("footer-style");
                let classes = this.getClasses();

                classes = classes.filter(
                    (cls) =>
                        ![
                            "bg-white",
                            "bg-gray-900",
                            "bg-primary",
                            "bg-transparent",
                            "text-white",
                            "text-gray-900",
                        ].includes(cls),
                );

                if (style === "light") {
                    classes.push("bg-white", "text-gray-900");
                } else if (style === "dark") {
                    classes.push("bg-gray-900", "text-white");
                } else if (style === "primary") {
                    classes.push("bg-primary", "text-white");
                } else if (style === "transparent") {
                    classes.push("bg-transparent");
                }

                this.setClass(classes);
            },

            handleShadow() {
                const withShadow = this.get("with-shadow");
                let classes = this.getClasses();

                if (withShadow) {
                    classes.push("shadow-md");
                } else {
                    classes = classes.filter((cls) => cls !== "shadow-md");
                }

                this.setClass(classes);
            },

            handleAttrChange() {
                const attrs = this.getAttributes();
                if (attrs["with-shadow"])
                    this.set("with-shadow", attrs["with-shadow"]);
            },
        },
    });

    return editor;
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

function setupSaveButton(editor) {
    const saveButton = document.getElementById("save-button");
    if (!saveButton) return;

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

function loadPageData(editor) {
    const pageId = getElementValue("page-id");
    const loadUrl = getElementValue("page-load-url");

    if (pageId && loadUrl) {
        fetch(loadUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.components) {
                    try {
                        const componentsData =
                            typeof data.components === "string"
                                ? JSON.parse(data.components)
                                : data.components;

                        editor.setComponents(componentsData);
                    } catch (err) {
                        console.error("Error parsing components:", err);
                        editor.setComponents(data.html || "");
                    }
                } else {
                    editor.setComponents(data.html || "");
                }

                editor.setStyle(data.css || "");

                showAlert(
                    "Datos del pie de página cargados correctamente",
                    "success",
                );

                window.history.pushState(
                    { pageId },
                    document.title,
                    window.location.href,
                );
            })
            .catch((error) => {
                console.error("Error loading footer data:", error);
                showAlert(
                    "Error al cargar los datos del pie de página",
                    "error",
                );
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
    const storeUrl = getElementValue("page-store-url", "/api/footers/store");

    const htmlContent = editor.getHtml();
    const cssContent = editor.getCss();
    const componentsJSON = JSON.stringify(editor.getComponents());

    const jsContent = `
        // Footer column dropdown functionality
        (function() {
            // Initialize footer dropdowns
            document.addEventListener('DOMContentLoaded', function() {
                document.querySelectorAll('.footer-dropdown-toggle').forEach(toggle => {
                    toggle.addEventListener('click', function(e) {
                        const parent = this.closest('.footer-column');
                        const content = parent.querySelector('.footer-dropdown-content');
                        const icon = this.querySelector('i');
                        
                        // Close all other dropdowns
                        document.querySelectorAll('.footer-dropdown-content.block').forEach(openContent => {
                            if (openContent !== content) {
                                openContent.classList.remove('block');
                                openContent.classList.add('hidden');
                                
                                const openToggle = openContent.parentElement.querySelector('.footer-dropdown-toggle');
                                if (openToggle) {
                                    openToggle.classList.remove('bg-primary');
                                    openToggle.classList.remove('text-white');
                                    
                                    const openIcon = openToggle.querySelector('i');
                                    if (openIcon) {
                                        openIcon.classList.remove('ri-arrow-up-s-line');
                                        openIcon.classList.add('ri-arrow-down-s-line');
                                    }
                                }
                            }
                        });
                        
                        // Toggle current dropdown
                        if (content.classList.contains('hidden')) {
                            content.classList.remove('hidden');
                            content.classList.add('block');
                            
                            this.classList.add('bg-primary');
                            this.classList.add('text-white');
                            this.classList.remove('text-primary');
                            
                            if (icon) {
                                icon.classList.remove('ri-arrow-down-s-line');
                                icon.classList.add('ri-arrow-up-s-line');
                                icon.style.color = 'white';
                            }
                        } else {
                            content.classList.remove('block');
                            content.classList.add('hidden');
                            
                            this.classList.remove('bg-primary');
                            this.classList.remove('text-white');
                            this.classList.add('text-primary');
                            
                            if (icon) {
                                icon.classList.remove('ri-arrow-up-s-line');
                                icon.classList.add('ri-arrow-down-s-line');
                                icon.style.color = '';
                            }
                        }
                    });
                });
            });
        })();
        `;

    let formData = {
        html: htmlContent,
        css: cssContent,
        js: jsContent,
        components: componentsJSON,
    };

    if (pageId) {
        formData.id = pageId;
        sendSaveRequest(storeUrl, formData);
        document.dispatchEvent(new CustomEvent("editor:saved"));
    } else {
        Swal.fire({
            title: "Nombre del pie de página",
            input: "text",
            inputLabel: "Ingresa un nombre para el pie de página",
            inputPlaceholder: "Ej: Footer Principal, Footer Enlaces, etc.",
            confirmButtonText: "Agregar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            confirmButtonColor: "#23366A",
            cancelButtonColor: "#e74c3c",
            inputValidator: (value) => {
                if (!value) {
                    return "Debes ingresar un nombre para el pie de página";
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                formData.name = result.value;
                sendSaveRequest(storeUrl, formData);
                document.dispatchEvent(new CustomEvent("editor:saved"));
            }
        });
    }
}

function sendSaveRequest(url, data) {
    Swal.fire({
        title: "Guardando...",
        html: "Por favor espera mientras se guarda el pie de página",
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

            if (result.success) {
                showAlert("Pie de página guardado correctamente", "success");

                window.editorHasUnsavedChanges = false;

                document.dispatchEvent(new CustomEvent("editor:saved"));

                if (!data.id && result.id) {
                    const pageIdElement = document.getElementById("page-id");
                    if (pageIdElement) pageIdElement.value = result.id;
                    const loadUrlElement =
                        document.getElementById("page-load-url");
                    if (loadUrlElement)
                        loadUrlElement.value = loadUrlElement.value.replace(
                            "new",
                            result.id,
                        );

                    const titleElement =
                        document.querySelector(".editor-title");
                    if (titleElement && data.name) {
                        titleElement.textContent = "Editando: " + data.name;
                    }

                    window.history.pushState(
                        {},
                        "Editando: " + data.name,
                        "/footer-editor/" + result.id,
                    );
                }
            } else {
                showAlert(
                    "Error al guardar el pie de página: " +
                        (result.message || "Error desconocido"),
                    "error",
                );
            }
        })
        .catch((error) => {
            Swal.close();
            console.error("Error:", error);
            showAlert("Error al guardar el pie de página", "error");
        });
}

function setupExitConfirmation(editor) {
    let hasUnsavedChanges = false;
    let isNavigatingAway = false;

    const isNewPage = !getElementValue("page-id");

    if (isNewPage) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (
                key &&
                key.startsWith("gjs-footer-") &&
                !key.includes("page-")
            ) {
                localStorage.removeItem(key);
            }
        }
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
                        isNavigatingAway = true;

                        if (isNewPage) {
                            for (let i = 0; i < localStorage.length; i++) {
                                const key = localStorage.key(i);
                                if (
                                    key &&
                                    key.startsWith("gjs-") &&
                                    !key.includes("page-")
                                ) {
                                    localStorage.removeItem(key);
                                }
                            }
                        }

                        if (href) {
                            window.location.href = href;
                        } else if (isNavButton) {
                            const navAction =
                                navElement.getAttribute("data-nav");
                            if (navAction === "back") {
                                window.history.back();
                            } else if (navAction === "home") {
                                window.location.href = "/";
                            } else if (navAction) {
                                window.location.href = navAction;
                            }
                        }
                    }
                });
            }
        }
    });

    window.addEventListener("popstate", function (e) {
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
                    isNavigatingAway = true;

                    if (isNewPage) {
                        for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i);
                            if (
                                key &&
                                key.startsWith("gjs-") &&
                                !key.includes("page-")
                            ) {
                                localStorage.removeItem(key);
                            }
                        }
                    }

                    window.history.back();
                }
            });
        }
    });

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
