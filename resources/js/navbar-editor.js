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
import loadNavbarBlocks from "./blocks/navbarBlocks";
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

    editor.on("load", () => {
        editor.runCommand("sw-visibility");
        const button = editor.Panels.getButton("options", "sw-visibility");
        if (button) {
            button.set("active", true);
        }
    });
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
                id: "gjs-navbar-",
                autosave: true,
                autoload: true,
                stepsBeforeSave: 1,
                options: {
                    local: {
                        key: `gjs-navbar-${pageId}`,
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
                            navbars: "Barras de Navegación",
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
                            navbars: "Barras de Navegación",
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
            scripts: [], // Eliminamos la función que estaba aquí
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
            (editor) => loadNavbarBlocks(editor),
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

    // Update activate navbar scripts for click-based dropdowns
    editor.Commands.add("activate-navbar-scripts", {
        run: function (editor) {
            const frame = editor.Canvas.getFrameEl();
            if (!frame) return;

            const doc = frame.contentDocument || frame.contentWindow.document;
            if (!doc) return;

            const currentUrl = window.location.pathname;

            setTimeout(() => {
                try {
                    const allLinks = doc.querySelectorAll("[href]");
                    let activeTopLevelItem = null;
                    let foundMatchingUrl = false;

                    allLinks.forEach((link) => {
                        const href = link.getAttribute("href");
                        if (
                            href &&
                            (href === currentUrl ||
                                (href !== "#" && currentUrl.startsWith(href)))
                        ) {
                            link.classList.add("active");
                            foundMatchingUrl = true;

                            const level1Container =
                                link.closest(".navbar-dropdown");
                            if (level1Container) {
                                activeTopLevelItem = level1Container;
                            }
                        }
                    });

                    if (
                        !foundMatchingUrl &&
                        (currentUrl === "/" ||
                            currentUrl === "/inicio" ||
                            currentUrl === "/asociados" ||
                            currentUrl === "/tarjetas-asociados")
                    ) {
                        const defaultDropdown =
                            doc.querySelector(".navbar-dropdown");
                        if (defaultDropdown) {
                            activeTopLevelItem = defaultDropdown;
                        }
                    }

                    // Si encontramos un elemento de nivel 1 activo, lo marcamos como activo
                    if (activeTopLevelItem) {
                        const toggle =
                            activeTopLevelItem.querySelector(
                                ".dropdown-toggle",
                            );
                        const menu = activeTopLevelItem.querySelector(
                            ".navbar-dropdown-menu",
                        );

                        if (toggle && menu) {
                            menu.classList.add("show");
                            activeTopLevelItem.classList.add("active");
                            toggle.classList.add("active");

                            const currentTheme =
                                toggle.getAttribute("data-navbar-theme") ||
                                "light";
                            if (currentTheme === "light") {
                                toggle.style.backgroundColor = "#23366A";
                                toggle.style.color = "white";
                                const icon = toggle.querySelector("i");
                                if (icon) icon.style.color = "white";
                            } else {
                                toggle.style.backgroundColor = "white";
                                toggle.style.color = "#23366A";
                                const icon = toggle.querySelector("i");
                                if (icon) icon.style.color = "#23366A";
                            }

                            const mainNavContainer =
                                activeTopLevelItem.closest(".rounded-full");
                            if (mainNavContainer) {
                                mainNavContainer.style.borderBottomLeftRadius =
                                    "0";
                                mainNavContainer.style.borderBottomRightRadius =
                                    "0";
                                mainNavContainer.style.borderTopLeftRadius =
                                    "18px";
                                mainNavContainer.style.borderTopRightRadius =
                                    "18px";
                                mainNavContainer.style.borderBottom = "none";

                                const allButtons =
                                    mainNavContainer.querySelectorAll(
                                        "button.dropdown-toggle, a.block",
                                    );
                                if (allButtons.length > 0) {
                                    const firstButton = allButtons[0];
                                    firstButton.style.borderTopLeftRadius =
                                        "16px";
                                    firstButton.style.borderBottomLeftRadius =
                                        "0px";

                                    const lastButton =
                                        allButtons[allButtons.length - 1];
                                    lastButton.style.borderTopRightRadius =
                                        "16px";
                                    lastButton.style.borderBottomRightRadius =
                                        "0px";
                                }
                            }
                        }
                    }

                    // Configurar los dropdowns de nivel 1
                    const dropdowns = doc.querySelectorAll(".navbar-dropdown");
                    dropdowns.forEach((dropdown) => {
                        const toggle =
                            dropdown.querySelector(".dropdown-toggle");
                        const menu = dropdown.querySelector(
                            ".navbar-dropdown-menu",
                        );
                        const mainNavContainer =
                            dropdown.closest(".rounded-full");

                        if (!toggle || !menu || !mainNavContainer) return;

                        const newToggle = toggle.cloneNode(true);
                        toggle.parentNode.replaceChild(newToggle, toggle);

                        const currentTheme =
                            newToggle.getAttribute("data-navbar-theme") ||
                            "light";

                        newToggle.addEventListener("click", function (e) {
                            e.preventDefault();
                            e.stopPropagation();

                            const isOpen = menu.classList.contains("show");

                            // Cerrar todos los menús
                            doc.querySelectorAll(
                                ".navbar-dropdown-menu",
                            ).forEach((m) => m.classList.remove("show"));
                            doc.querySelectorAll(".navbar-nested-menu").forEach(
                                (m) => (m.style.display = "none"),
                            );

                            doc.querySelectorAll(".dropdown-toggle").forEach(
                                (t) => {
                                    t.style.backgroundColor = "";
                                    t.style.color = "";
                                    const icon = t.querySelector("i");
                                    if (icon) icon.style.color = "";
                                },
                            );

                            doc.querySelectorAll(".navbar-dropdown").forEach(
                                (d) => d.classList.remove("active"),
                            );
                            doc.querySelectorAll(".dropdown-toggle").forEach(
                                (t) => t.classList.remove("active"),
                            );

                            const allNavContainers =
                                doc.querySelectorAll(".rounded-full");
                            allNavContainers.forEach((container) => {
                                container.style.borderBottomLeftRadius =
                                    "9999px";
                                container.style.borderBottomRightRadius =
                                    "9999px";
                                container.style.borderTopLeftRadius = "9999px";
                                container.style.borderTopRightRadius = "9999px";
                            });

                            if (!isOpen) {
                                menu.classList.add("show");
                                dropdown.classList.add("active");
                                newToggle.classList.add("active");

                                if (mainNavContainer) {
                                    mainNavContainer.style.borderBottomLeftRadius =
                                        "0";
                                    mainNavContainer.style.borderBottomRightRadius =
                                        "0";
                                    mainNavContainer.style.borderTopLeftRadius =
                                        "18px";
                                    mainNavContainer.style.borderTopRightRadius =
                                        "18px";
                                    mainNavContainer.style.borderBottom =
                                        "none";

                                    const allButtons =
                                        mainNavContainer.querySelectorAll(
                                            "button.dropdown-toggle, a.block",
                                        );

                                    if (allButtons.length > 0) {
                                        const firstButton = allButtons[0];
                                        firstButton.style.borderTopLeftRadius =
                                            "16px";
                                        firstButton.style.borderBottomLeftRadius =
                                            "0px";

                                        const lastButton =
                                            allButtons[allButtons.length - 1];
                                        lastButton.style.borderTopRightRadius =
                                            "16px";
                                        lastButton.style.borderBottomRightRadius =
                                            "0px";
                                    }
                                }

                                if (currentTheme === "light") {
                                    newToggle.style.backgroundColor = "#23366A";
                                    newToggle.style.color = "white";
                                    const icon = newToggle.querySelector("i");
                                    if (icon) icon.style.color = "white";
                                } else {
                                    newToggle.style.backgroundColor = "white";
                                    newToggle.style.color = "#23366A";
                                    const icon = newToggle.querySelector("i");
                                    if (icon) icon.style.color = "#23366A";
                                }
                            } else {
                                menu.classList.remove("show");
                                dropdown.classList.remove("active");
                                newToggle.classList.remove("active");

                                if (mainNavContainer) {
                                    mainNavContainer.style.borderBottomLeftRadius =
                                        "9999px";
                                    mainNavContainer.style.borderBottomRightRadius =
                                        "9999px";
                                    mainNavContainer.style.borderTopLeftRadius =
                                        "9999px";
                                    mainNavContainer.style.borderTopRightRadius =
                                        "9999px";
                                    mainNavContainer.style.borderBottom = "";

                                    const allButtons =
                                        mainNavContainer.querySelectorAll(
                                            "button.dropdown-toggle, a.block",
                                        );
                                    allButtons.forEach((btn) => {
                                        btn.style.borderTopLeftRadius = "";
                                        btn.style.borderTopRightRadius = "";
                                        btn.style.borderBottomLeftRadius = "";
                                        btn.style.borderBottomRightRadius = "";
                                    });
                                }
                            }

                            menu.style.position = "absolute";
                            menu.style.top = "100%";
                            menu.style.left = "0";
                            menu.style.right = "0";
                            menu.style.width = "100%";
                            menu.style.borderBottomLeftRadius = "18px";
                            menu.style.borderBottomRightRadius = "18px";
                            menu.style.border = "none";
                            menu.style.borderTop = "2px solid #23366A";
                            menu.style.textAlign = "center";
                        });

                        // Configurar menús de nivel 2
                        const nestedToggles = dropdown.querySelectorAll(
                            ".navbar-nested-toggle",
                        );
                        console.log(
                            "Menús nivel 2 encontrados:",
                            nestedToggles.length,
                        );

                        nestedToggles.forEach(function (nestedToggle) {
                            // Clonar el botón para evitar problemas con event listeners previos
                            const newNestedToggle =
                                nestedToggle.cloneNode(true);
                            nestedToggle.parentNode.replaceChild(
                                newNestedToggle,
                                nestedToggle,
                            );

                            // Buscar el menú anidado
                            const nestedMenu =
                                newNestedToggle.nextElementSibling;
                            if (
                                !nestedMenu ||
                                !nestedMenu.classList.contains(
                                    "navbar-nested-menu",
                                )
                            ) {
                                console.log("No se encontró menú anidado");
                                return;
                            }

                            // Dentro de la función de clic para los toggles anidados, actualiza los estilos:
                            newNestedToggle.addEventListener(
                                "click",
                                function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    // Comprobar si el menú está visible
                                    const isVisible =
                                        nestedMenu.style.display === "block";

                                    // Cerrar todos los menús de nivel 2
                                    doc.querySelectorAll(
                                        ".navbar-nested-menu",
                                    ).forEach((m) => {
                                        m.style.display = "none";
                                    });

                                    // Si no estaba visible, mostrarlo
                                    if (!isVisible) {
                                        console.log("Mostrando menú nivel 2");

                                        // Obtener los enlaces del menú existente
                                        const links =
                                            nestedMenu.querySelectorAll("a");
                                        const linkData = [];
                                        links.forEach((link) => {
                                            linkData.push({
                                                href: link.getAttribute("href"),
                                                text: link.textContent.trim(),
                                            });
                                        });

                                        // Crear un nuevo menú desde cero
                                        const newMenu =
                                            doc.createElement("div");
                                        newMenu.className = "custom-submenu";
                                        newMenu.style.position = "absolute";
                                        newMenu.style.left = "0";
                                        newMenu.style.top = "100%";
                                        newMenu.style.width =
                                            this.offsetWidth + "px";
                                        newMenu.style.backgroundColor = "white";
                                        newMenu.style.zIndex = "1002";
                                        newMenu.style.borderTopLeftRadius = "0";
                                        newMenu.style.borderTopRightRadius =
                                            "0";
                                        newMenu.style.borderBottomLeftRadius =
                                            "18px";
                                        newMenu.style.borderBottomRightRadius =
                                            "18px";
                                        newMenu.style.border = "none";
                                        newMenu.style.borderTop =
                                            "2px solid #23366A";
                                        newMenu.style.overflow = "hidden";
                                        newMenu.style.boxShadow =
                                            "0 4px 6px rgba(0, 0, 0, 0.1)";

                                        // Agregar los enlaces al nuevo menú
                                        linkData.forEach((item) => {
                                            const link = doc.createElement("a");
                                            link.href = item.href;
                                            link.textContent = item.text;
                                            link.style.display = "block";
                                            link.style.width = "100%";
                                            link.style.padding = "10px 15px";
                                            link.style.textAlign = "left";
                                            link.style.borderBottom =
                                                "1px solid rgba(35, 54, 106, 0.1)";
                                            link.style.textDecoration = "none";
                                            link.style.color = "#374151";
                                            link.style.transition =
                                                "background-color 0.2s, color 0.2s";

                                            link.addEventListener(
                                                "mouseover",
                                                function () {
                                                    this.style.backgroundColor =
                                                        "#23366A";
                                                    this.style.color = "white";
                                                },
                                            );

                                            link.addEventListener(
                                                "mouseout",
                                                function () {
                                                    this.style.backgroundColor =
                                                        "";
                                                    this.style.color =
                                                        "#374151";
                                                },
                                            );

                                            newMenu.appendChild(link);
                                        });

                                        // El último enlace sin borde inferior
                                        if (newMenu.lastChild) {
                                            newMenu.lastChild.style.borderBottom =
                                                "none";
                                        }

                                        // Reemplazar el menú original o agregarlo como hermano
                                        if (nestedMenu.parentNode) {
                                            nestedMenu.style.display = "none";
                                            nestedMenu.parentNode.appendChild(
                                                newMenu,
                                            );
                                        }
                                    } else {
                                        // Si ya hay un menú personalizado, ocultarlo
                                        const customMenu =
                                            this.parentNode.querySelector(
                                                ".custom-submenu",
                                            );
                                        if (customMenu) {
                                            customMenu.parentNode.removeChild(
                                                customMenu,
                                            );
                                        }
                                    }
                                },
                            );
                        });
                    });

                    // Configurar el menú móvil
                    const mobileBtn = doc.querySelector(".mobile-menu-button");
                    const mobileMenu = doc.querySelector(".navbar-mobile-menu");

                    if (mobileBtn && mobileMenu) {
                        mobileBtn.onclick = function () {
                            mobileMenu.classList.toggle("navbar-hidden");

                            // Cambiar icono entre hamburguesa y X
                            const icon = this.querySelector("i");
                            if (icon) {
                                if (
                                    mobileMenu.classList.contains(
                                        "navbar-hidden",
                                    )
                                ) {
                                    // Si el menú está oculto, mostrar icono de hamburguesa
                                    icon.className =
                                        "ri-menu-line text-xl text-primary";
                                } else {
                                    // Si el menú está visible, mostrar icono de X
                                    icon.className =
                                        "ri-close-line text-xl text-primary";
                                }
                            }
                        };
                    }

                    doc.querySelectorAll(".mobile-dropdown-toggle").forEach(
                        function (btn) {
                            btn.onclick = function () {
                                var submenu = this.nextElementSibling;
                                var icon = this.querySelector("i");
                                if (submenu)
                                    submenu.classList.toggle("navbar-hidden");
                                if (icon) {
                                    icon.style.transform =
                                        submenu &&
                                        submenu.classList.contains(
                                            "navbar-hidden",
                                        )
                                            ? "rotate(0deg)"
                                            : "rotate(180deg)";
                                }
                            };
                        },
                    );

                    doc.querySelectorAll(
                        ".mobile-dropdown-toggle-nested",
                    ).forEach(function (btn) {
                        btn.onclick = function () {
                            var submenu = this.nextElementSibling;
                            var icon = this.querySelector("i");
                            if (submenu)
                                submenu.classList.toggle("navbar-hidden");
                            if (icon) {
                                icon.style.transform =
                                    submenu &&
                                    submenu.classList.contains("navbar-hidden")
                                        ? "rotate(0deg)"
                                        : "rotate(180deg)";
                            }
                        };
                    });

                    // Cerrar menús al hacer clic fuera
                    doc.addEventListener("click", function (e) {
                        if (
                            !e.target.closest('.w-full[style*="fixed"]') &&
                            !e.target.closest(".account-selector-container")
                        ) {
                            doc.querySelectorAll(
                                ".navbar-nested-menu, .custom-submenu",
                            ).forEach((m) => {
                                m.style.display = "none";
                            });
                        } else if (
                            !e.target.closest(".navbar-nested-dropdown")
                        ) {
                            doc.querySelectorAll(
                                ".navbar-nested-menu, .custom-submenu",
                            ).forEach((m) => {
                                m.style.display = "none";
                            });
                        }
                    });

                    // Inyectar CSS adicional para mejorar la experiencia
                    const styleEl = doc.createElement("style");
                    styleEl.textContent = `
                        .navbar-nested-menu {
                            display: none;
                            padding: 0 !important;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            background-color: white;
                        }
                        
                        .navbar-nested-menu a {
                            display: block;
                            width: 100%;
                            padding: 10px 15px;
                            text-align: left;
                            border-radius: 0 !important;
                            margin: 0;
                            border-bottom: 1px solid rgba(35, 54, 106, 0.1);
                            transition: background-color 0.2s;
                        }
                        
                        .navbar-nested-menu a:last-child {
                            border-bottom: none;
                        }
                        
                        .navbar-nested-menu a:hover {
                            background-color: #23366A;
                            color: white;
                        }
                        
                        .navbar-nested-menu .grid {
                            display: block !important;
                            grid-template-columns: 1fr !important;
                            gap: 0 !important;
                            padding: 0 !important;
                        }
                    `;
                    doc.head.appendChild(styleEl);
                } catch (error) {
                    console.error("Error activating navbar scripts:", error);
                }
            }, 300);
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

    .gjs-block-category-navbars .gjs-block {
        border-left: 3px solid #23366A;
    }

    .gjs-category-open .gjs-title.gjs-block-category-navbars {
        background-color: rgba(18, 60, 105, 0.1);
    }
`;
        document.head.appendChild(styleEl);
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

    editor.on("storage:load", () => {
        setTimeout(() => editor.runCommand("activate-navbar-scripts"), 300);
    });

    editor.on("component:update", (component) => {
        if (
            component &&
            component.getEl &&
            component.getEl() &&
            (component.getEl().classList.contains("mobile-menu-button") ||
                component.getEl().classList.contains("mobile-dropdown") ||
                component.getEl().classList.contains("mobile-menu"))
        ) {
            setTimeout(() => editor.runCommand("activate-navbar-scripts"), 300);
        }
    });

    editor.DomComponents.addType("nav", {
        model: {
            defaults: {
                traits: [
                    {
                        type: "select",
                        name: "navbar-style",
                        label: "Estilo de Navbar",
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
                        name: "sticky",
                        label: "Fijar en tope",
                    },
                    {
                        type: "checkbox",
                        name: "with-shadow",
                        label: "Con sombra",
                    },
                ],
            },

            init() {
                this.on("change:navbar-style", this.handleNavbarStyle);
                this.on("change:sticky", this.handleSticky);
                this.on("change:with-shadow", this.handleShadow);
                this.listenTo(this, "change:attributes", this.handleAttrChange);
            },

            handleNavbarStyle() {
                const style = this.get("navbar-style");
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

            handleSticky() {
                const isSticky = this.get("sticky");
                let classes = this.getClasses();

                if (isSticky) {
                    classes.push("fixed", "top-0", "left-0", "right-0", "z-50");
                } else {
                    classes = classes.filter(
                        (cls) =>
                            ![
                                "fixed",
                                "top-0",
                                "left-0",
                                "right-0",
                                "z-50",
                            ].includes(cls),
                    );
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
                if (attrs.sticky) this.set("sticky", attrs.sticky);
                if (attrs["with-shadow"])
                    this.set("with-shadow", attrs["with-shadow"]);
            },
        },
    });

    editor.Commands.add("insert-mobile-toggle", {
        run: function (editor) {
            editor.getSelected().append(`
            <div class="md:hidden">
                <button class="mobile-menu-button p-2">
                    <i class="ri-menu-line text-xl"></i>
                </button>
            </div>
            <div class="mobile-menu hidden md:hidden">
                <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Elemento 1</a>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Elemento 2</a>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Elemento 3</a>
            </div>
        `);
            showAlert("Menú móvil agregado", "success");

            setTimeout(() => editor.runCommand("activate-navbar-scripts"), 300);
        },
    });

    editor.on("canvas:load", () => {
        setTimeout(() => editor.runCommand("activate-navbar-scripts"), 500);
    });

    setTimeout(() => editor.runCommand("activate-navbar-scripts"), 1000);

    window.activateNavbarScripts = function () {
        if (editor) {
            editor.runCommand("activate-navbar-scripts");
            console.log("Scripts de navbar activados manualmente");
        }
    };

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

    // Create unsaved changes badge
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

    // Add pulse animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);

    // Insert badge BEFORE the button (left side)
    saveButton.parentNode.insertBefore(badge, saveButton);

    // Track if it's the initial load
    let isInitialLoad = true;

    // Show badge on changes (but not on initial load)
    const showBadge = () => {
        if (!isInitialLoad) {
            badge.style.display = "inline";
        }
    };

    const hideBadge = () => {
        badge.style.display = "none";
    };

    // Mark initial load as complete after a short delay
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

    // Hide badge after successful save
    document.addEventListener("editor:saved", hideBadge);
}

// Load page data with full component preservation
function loadPageData(editor) {
    const pageId = getElementValue("page-id");
    const loadUrl = getElementValue("page-load-url");

    if (pageId && loadUrl) {
        fetch(loadUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.components) {
                    try {
                        // Parse components if it's a string, or use directly if already an object
                        const componentsData =
                            typeof data.components === "string"
                                ? JSON.parse(data.components)
                                : data.components;

                        editor.setComponents(componentsData);
                    } catch (err) {
                        console.error("Error parsing components:", err);
                        // Fallback to HTML if components parsing fails
                        editor.setComponents(data.html || "");
                    }
                } else {
                    // Fallback to HTML if no components data is available
                    editor.setComponents(data.html || "");
                }

                editor.setStyle(data.css || "");

                setTimeout(
                    () => editor.runCommand("activate-navbar-scripts"),
                    500,
                );

                showAlert(
                    "Datos de la barra de navegación cargados correctamente",
                    "success",
                );

                window.history.pushState(
                    { pageId },
                    document.title,
                    window.location.href,
                );
            })
            .catch((error) => {
                console.error("Error loading navbar data:", error);
                showAlert(
                    "Error al cargar los datos de la barra de navegación",
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

// Save page data with component structure preservation
function savePageData(editor) {
    const pageId = getElementValue("page-id");
    const storeUrl = getElementValue("page-store-url", "/api/navbars/store");

    const htmlContent = editor.getHtml();
    const cssContent = editor.getCss();

    // Save full component structure to preserve configurations
    const componentsJSON = JSON.stringify(editor.getComponents());

    // Enhanced JavaScript with explicit dropdown click handling
    const jsContent = `
        (function() {
            function initNavbar() {
                var dropdowns = document.querySelectorAll('.navbar-dropdown');
                const currentUrl = window.location.pathname;

                let foundMatchingUrl = false;
                let activeTopLevelItem = null;

                document.querySelectorAll('[href]').forEach(function(link) {
                    var href = link.getAttribute('href');
                    if (href && (href === currentUrl || (href !== '#' && currentUrl.startsWith(href)))) {
                        link.classList.add('active');
                        
                        var level1Container = link.closest('.navbar-dropdown');
                        if (level1Container) {
                            var mainToggle = level1Container.querySelector('.dropdown-toggle');
                            var mainMenu = level1Container.querySelector('.navbar-dropdown-menu');
                            var mainNavContainer = level1Container.closest('.rounded-full');
                            
                            if (mainToggle) mainToggle.classList.add('active');
                            if (mainMenu) mainMenu.classList.add('show');
                            level1Container.classList.add('active');
                            
                            if (mainToggle && mainMenu) {
                                var currentTheme = mainToggle.getAttribute('data-navbar-theme') || 'light';
                                if (currentTheme === 'light') {
                                    mainToggle.style.backgroundColor = '#23366A';
                                    mainToggle.style.color = 'white';
                                    var icon = mainToggle.querySelector('i');
                                    if (icon) icon.style.color = 'white';
                                } else {
                                    mainToggle.style.backgroundColor = 'white';
                                    mainToggle.style.color = '#23366A';
                                    var icon = mainToggle.querySelector('i');
                                    if (icon) icon.style.color = '#23366A';
                                }
                                
                                if (mainNavContainer) {
                                    mainNavContainer.style.borderBottomLeftRadius = '0';
                                    mainNavContainer.style.borderBottomRightRadius = '0';
                                    mainNavContainer.style.borderTopLeftRadius = '18px';
                                    mainNavContainer.style.borderTopRightRadius = '18px';
                                    mainNavContainer.style.borderBottom = 'none';
                                    
                                    var allButtons = mainNavContainer.querySelectorAll('button.dropdown-toggle, a.block');
                                    if (allButtons.length > 0) {
                                        var firstButton = allButtons[0];
                                        firstButton.style.borderTopLeftRadius = '16px';
                                        firstButton.style.borderBottomLeftRadius = '0px';
                                        
                                        var lastButton = allButtons[allButtons.length - 1];
                                        lastButton.style.borderTopRightRadius = '16px';
                                        lastButton.style.borderBottomRightRadius = '0px';
                                    }
                                }
                            }
                        } else {
                            if (link.classList.contains('block') && !link.classList.contains('dropdown-toggle')) {
                                var navbarContainer = link.closest('.w-full');
                                var theme = 'light';
                                
                                if (navbarContainer && navbarContainer.classList.contains('text-white')) {
                                    theme = 'primary';
                                }
                                
                                if (theme === 'light') {
                                    link.style.backgroundColor = '#23366A';
                                    link.style.color = 'white';
                                } else {
                                    link.style.backgroundColor = 'white';
                                    link.style.color = '#23366A';
                                }
                            }
                        }
                    }
                });

                if (!foundMatchingUrl && (currentUrl === "/" || currentUrl === "/inicio" || currentUrl === "/asociados" || currentUrl === "/tarjetas-asociados")) {
                    var defaultDropdown = document.querySelector('.navbar-dropdown');
                    if (defaultDropdown) {
                        activeTopLevelItem = defaultDropdown;
                        
                        var mainToggle = defaultDropdown.querySelector('.dropdown-toggle');
                        var mainMenu = defaultDropdown.querySelector('.navbar-dropdown-menu');
                        var mainNavContainer = defaultDropdown.closest('.rounded-full');
                        
                        if (mainToggle) mainToggle.classList.add('active');
                        if (mainMenu) mainMenu.classList.add('show');
                        defaultDropdown.classList.add('active');
                        
                        if (mainToggle && mainMenu) {
                            var currentTheme = mainToggle.getAttribute('data-navbar-theme') || 'light';
                            if (currentTheme === 'light') {
                                mainToggle.style.backgroundColor = '#23366A';
                                mainToggle.style.color = 'white';
                                var icon = mainToggle.querySelector('i');
                                if (icon) icon.style.color = 'white';
                            } else {
                                mainToggle.style.backgroundColor = 'white';
                                mainToggle.style.color = '#23366A';
                                var icon = mainToggle.querySelector('i');
                                if (icon) icon.style.color = '#23366A';
                            }
                            
                            if (mainNavContainer) {
                                mainNavContainer.style.borderBottomLeftRadius = '0';
                                mainNavContainer.style.borderBottomRightRadius = '0';
                                mainNavContainer.style.borderTopLeftRadius = '18px';
                                mainNavContainer.style.borderTopRightRadius = '18px';
                                mainNavContainer.style.borderBottom = 'none';
                                
                                var allButtons = mainNavContainer.querySelectorAll('button.dropdown-toggle, a.block');
                                if (allButtons.length > 0) {
                                    var firstButton = allButtons[0];
                                    firstButton.style.borderTopLeftRadius = '16px';
                                    firstButton.style.borderBottomLeftRadius = '0px';
                                    
                                    var lastButton = allButtons[allButtons.length - 1];
                                    lastButton.style.borderTopRightRadius = '16px';
                                    lastButton.style.borderBottomRightRadius = '0px';
                                }
                            }
                        }
                    }
                }
                
                dropdowns.forEach(function(dropdown) {
                    var toggle = dropdown.querySelector('.dropdown-toggle');
                    var menu = dropdown.querySelector('.navbar-dropdown-menu');
                    var mainNavContainer = dropdown.closest('.rounded-full');
                    
                    if (!toggle || !menu || !mainNavContainer) return;
                    
                    var currentTheme = toggle.getAttribute('data-navbar-theme') || 'light';
                    
                    toggle.onclick = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        var isOpen = menu.classList.contains('show');
                        
                        document.querySelectorAll('.navbar-dropdown-menu').forEach(function(m) {
                            m.classList.remove('show');
                        });
                        document.querySelectorAll('.navbar-nested-menu').forEach(function(m) {
                            m.style.display = 'none';
                        });
                        
                        document.querySelectorAll('.dropdown-toggle').forEach(function(t) {
                            t.style.backgroundColor = '';
                            t.style.color = '';
                            var icon = t.querySelector('i');
                            if (icon) icon.style.color = '';
                        });
                        
                        document.querySelectorAll('.navbar-dropdown').forEach(function(d) {
                            d.classList.remove('active');
                        });
                        document.querySelectorAll('.dropdown-toggle').forEach(function(t) {
                            t.classList.remove('active');
                        });
                        
                        if (!isOpen) {
                            menu.classList.add('show');
                            dropdown.classList.add('active');
                            toggle.classList.add('active');
                            
                            if (mainNavContainer) {
                                mainNavContainer.style.borderBottomLeftRadius = '0';
                                mainNavContainer.style.borderBottomRightRadius = '0';
                                mainNavContainer.style.borderTopLeftRadius = '18px';
                                mainNavContainer.style.borderTopRightRadius = '18px';
                                mainNavContainer.style.borderBottom = 'none';
                                
                                var allButtons = mainNavContainer.querySelectorAll('button.dropdown-toggle, a.block');
                                
                                if (allButtons.length > 0) {
                                    var firstButton = allButtons[0];
                                    firstButton.style.borderTopLeftRadius = '16px';
                                    firstButton.style.borderBottomLeftRadius = '0px';
                                    
                                    var lastButton = allButtons[allButtons.length - 1];
                                    lastButton.style.borderTopRightRadius = '16px';
                                    lastButton.style.borderBottomRightRadius = '0px';
                                }
                            }
                            
                            if (currentTheme === 'light') {
                                toggle.style.backgroundColor = '#23366A';
                                toggle.style.color = 'white';
                                var icon = toggle.querySelector('i');
                                if (icon) icon.style.color = 'white';
                            } else {
                                toggle.style.backgroundColor = 'white';
                                toggle.style.color = '#23366A';
                                var icon = toggle.querySelector('i');
                                if (icon) icon.style.color = '#23366A';
                            }
                        } else {
                            menu.classList.remove('show');
                            dropdown.classList.remove('active');
                            toggle.classList.remove('active');
                            
                            if (mainNavContainer) {
                                mainNavContainer.style.borderBottomLeftRadius = '9999px';
                                mainNavContainer.style.borderBottomRightRadius = '9999px';
                                mainNavContainer.style.borderTopLeftRadius = '9999px';
                                mainNavContainer.style.borderTopRightRadius = '9999px';
                                mainNavContainer.style.borderBottom = '';
                                
                                var allButtons = mainNavContainer.querySelectorAll('button.dropdown-toggle, a.block');
                                allButtons.forEach(function(btn) {
                                    btn.style.borderTopLeftRadius = '';
                                    btn.style.borderTopRightRadius = '';
                                    btn.style.borderBottomLeftRadius = '';
                                    btn.style.borderBottomRightRadius = '';
                                });
                            }
                        }
                        
                        var innerContainer = menu.querySelector('div');
                        if (innerContainer) {
                            innerContainer.className = 'flex flex-wrap justify-center';
                            innerContainer.style.width = '100%';
                            innerContainer.style.padding = '0';
                        }
                        
                        menu.style.position = 'absolute';
                        menu.style.top = '100%';
                        menu.style.left = '0';
                        menu.style.right = '0';
                        menu.style.width = '100%';
                        menu.style.borderBottomLeftRadius = '18px';
                        menu.style.borderBottomRightRadius = '18px';
                        menu.style.border = 'none';
                        menu.style.borderTop = '2px solid #23366A';
                        menu.style.textAlign = 'center';
                    };
                    
                    var nestedToggles = dropdown.querySelectorAll('.navbar-nested-toggle');
                    
                    nestedToggles.forEach(function(nestedToggle) {
                        var nestedMenu = nestedToggle.nextElementSibling;
                        if (!nestedMenu || !nestedMenu.classList.contains('navbar-nested-menu')) {
                            return;
                        }
                        
                        nestedToggle.onclick = function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            var customMenu = this.parentNode.querySelector('.custom-submenu');
                            var isVisible = customMenu ? true : false;
                            
                            document.querySelectorAll('.navbar-nested-menu, .custom-submenu').forEach(function(m) {
                                if (m.parentNode) {
                                    m.parentNode.removeChild(m);
                                }
                            });
                            
                            if (!isVisible) {
                                var links = nestedMenu.querySelectorAll('a');
                                var linkData = [];
                                links.forEach(function(link) {
                                    linkData.push({
                                        href: link.getAttribute('href'),
                                        text: link.textContent.trim()
                                    });
                                });
                                
                                var newMenu = document.createElement('div');
                                newMenu.className = 'custom-submenu';
                                newMenu.style.position = 'absolute';
                                newMenu.style.left = '0';
                                newMenu.style.top = '100%';
                                newMenu.style.width = this.offsetWidth + 'px';
                                newMenu.style.backgroundColor = 'white';
                                newMenu.style.zIndex = '1002';
                                newMenu.style.borderTopLeftRadius = '0';
                                newMenu.style.borderTopRightRadius = '0';
                                newMenu.style.borderBottomLeftRadius = '18px';
                                newMenu.style.borderBottomRightRadius = '18px';
                                newMenu.style.border = 'none';
                                newMenu.style.borderTop = '2px solid #23366A';
                                newMenu.style.overflow = 'hidden';
                                newMenu.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                                
                                linkData.forEach(function(item) {
                                    var link = document.createElement('a');
                                    link.href = item.href;
                                    link.textContent = item.text;
                                    link.style.display = 'block';
                                    link.style.width = '100%';
                                    link.style.padding = '10px 15px';
                                    link.style.textAlign = 'left';
                                    link.style.borderBottom = '1px solid rgba(35, 54, 106, 0.1)';
                                    link.style.textDecoration = 'none';
                                    link.style.color = '#374151';
                                    link.style.transition = 'background-color 0.2s, color 0.2s';
                                    
                                    link.onmouseover = function() {
                                        this.style.backgroundColor = '#23366A';
                                        this.style.color = 'white';
                                    };
                                    
                                    link.onmouseout = function() {
                                        this.style.backgroundColor = '';
                                        this.style.color = '#374151';
                                    };
                                    
                                    newMenu.appendChild(link);
                                });
                                
                                if (newMenu.lastChild) {
                                    newMenu.lastChild.style.borderBottom = 'none';
                                }
                                
                                this.parentNode.appendChild(newMenu);
                            }
                        };
                    });
                });
                
                var searchInputs = document.querySelectorAll('.navbar-search-input');
                searchInputs.forEach(function(searchInput) {
                    var searchTimeout;
                    
                    var searchResults = searchInput.parentElement.querySelector('.navbar-search-results');
                    
                    if (!searchResults) {
                        searchResults = document.createElement('div');
                        searchResults.className = 'navbar-search-results absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto hidden z-50';
                        searchInput.parentElement.style.position = 'relative';
                        searchInput.parentElement.appendChild(searchResults);
                    }
                    
                    searchInput.addEventListener('input', function(e) {
                        var query = e.target.value.trim();
                        clearTimeout(searchTimeout);
                        
                        if (query.length < 2) {
                            searchResults.classList.add('hidden');
                            return;
                        }
                        
                        searchTimeout = setTimeout(function() {
                            fetch('/api/pages/search?q=' + encodeURIComponent(query))
                                .then(function(response) { return response.json(); })
                                .then(function(pages) {
                                    if (pages.length === 0) {
                                        searchResults.innerHTML = '<div class="p-4 text-gray-500 text-center">No se encontraron resultados</div>';
                                    } else {
                                        searchResults.innerHTML = pages.map(function(page) {
                                            return '<a href="' + page.url + '" class="block px-4 py-2 hover:bg-gray-100 border-b last:border-b-0">' +
                                                '<div class="font-semibold text-gray-900">' + page.title + '</div>' +
                                                '</a>';
                                        }).join('');
                                    }
                                    searchResults.classList.remove('hidden');
                                })
                                .catch(function(error) {
                                    console.error('Error:', error);
                                    searchResults.classList.add('hidden');
                                });
                        }, 300);
                    });
                    
                    document.addEventListener('click', function(e) {
                        if (!searchInput.parentElement.contains(e.target)) {
                            searchResults.classList.add('hidden');
                        }
                    });
                });
                
                var mobileBtn = document.querySelector('.mobile-menu-button');
                var mobileMenu = document.querySelector('.navbar-mobile-menu');

                if (mobileBtn && mobileMenu) {
                    mobileBtn.onclick = function() {
                        mobileMenu.classList.toggle('navbar-hidden');
                        
                        var icon = this.querySelector('i');
                        if (icon) {
                            if (mobileMenu.classList.contains('navbar-hidden')) {
                                icon.className = 'ri-menu-line text-xl text-primary';
                            } else {
                                icon.className = 'ri-close-line text-xl text-primary';
                            }
                        }
                    };
                }
                
                document.querySelectorAll('.mobile-dropdown-toggle').forEach(function(btn) {
                    btn.onclick = function() {
                        var submenu = this.nextElementSibling;
                        var icon = this.querySelector('i');
                        if (submenu) submenu.classList.toggle('navbar-hidden');
                        if (icon) {
                            icon.style.transform = submenu && submenu.classList.contains('navbar-hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                        }
                    };
                });
                
                document.querySelectorAll('.mobile-dropdown-toggle-nested').forEach(function(btn) {
                    btn.onclick = function() {
                        var submenu = this.nextElementSibling;
                        var icon = this.querySelector('i');
                        if (submenu) submenu.classList.toggle('navbar-hidden');
                        if (icon) {
                            icon.style.transform = submenu && submenu.classList.contains('navbar-hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                        }
                    };
                });
                
                document.addEventListener('click', function(e) {
                    if (!e.target.closest('.w-full[style*="fixed"]') && !e.target.closest('.account-selector-container')) {
                        document.querySelectorAll('.navbar-nested-menu, .custom-submenu').forEach(function(m) {
                            m.style.display = 'none';
                        });
                    } else if (!e.target.closest('.navbar-nested-dropdown')) {
                        document.querySelectorAll('.navbar-nested-menu, .custom-submenu').forEach(function(m) {
                            m.style.display = 'none';
                        });
                    }
                });
                
                var styleEl = document.createElement('style');
                styleEl.textContent = \`
                    .navbar-nested-menu {
                        display: none;
                        padding: 0 !important;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        background-color: white;
                    }
                    .navbar-nested-menu a {
                        display: block;
                        width: 100%;
                        padding: 10px 15px;
                        text-align: left;
                        border-radius: 0 !important;
                        margin: 0;
                        border-bottom: 1px solid rgba(35, 54, 106, 0.1);
                        transition: background-color 0.2s;
                    }
                    .navbar-nested-menu a:last-child {
                        border-bottom: none;
                    }
                    .navbar-nested-menu a:hover {
                        background-color: #23366A;
                        color: white;
                    }
                    .navbar-nested-menu .grid {
                        display: block !important;
                        grid-template-columns: 1fr !important;
                        gap: 0 !important;
                        padding: 0 !important;
                    }
                \`;
                document.head.appendChild(styleEl);
            }
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initNavbar);
            } else {
                initNavbar();
            }
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
            title: "Nombre de la barra de navegación",
            input: "text",
            inputLabel: "Ingresa un nombre para la barra de navegación",
            inputPlaceholder: "Ej: Navbar Principal, Menú Superior, etc.",
            confirmButtonText: "Agregar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            confirmButtonColor: "#23366A",
            cancelButtonColor: "#e74c3c",
            inputValidator: (value) => {
                if (!value) {
                    return "Debes ingresar un nombre para la barra de navegación";
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
        html: "Por favor espera mientras se guarda la barra de navegación",
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
                showAlert(
                    "Barra de navegación guardada correctamente",
                    "success",
                );

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
                        "/navbar-editor/" + result.id,
                    );
                }
            } else {
                showAlert(
                    "Error al guardar la barra de navegación: " +
                        (result.message || "Error desconocido"),
                    "error",
                );
            }
        })
        .catch((error) => {
            Swal.close();
            console.error("Error:", error);
            showAlert("Error al guardar la barra de navegación", "error");
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
                key.startsWith("gjs-navbar-") &&
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
