// Modern footer block implementation with responsive columns and social media buttons
import { showMediaSelector } from "../utils/mediaSelector";

export default function loadFooterBlocks(editor) {
    const blockManager = editor.BlockManager;

    editor.DomComponents.addType("configurable-footer", {
        model: {
            defaults: {
                tagName: "footer",
                attributes: { class: "bg-gray-50" },
                draggable: true,
                droppable: true,
                traits: [
                    {
                        type: "button",
                        name: "configure-footer",
                        label: "Footer",
                        text: "Configurar",
                        full: true,
                        command: (editor) => {
                            const component = editor.getSelected();
                            openFooterConfigModal(editor, component);
                        },
                    },
                ],
                "footer-config": {
                    logoUrl: "https://via.placeholder.com/150x50?text=LOGO",
                    columns: [
                        {
                            id: "col1",
                            title: "Información institucional",
                            hasSubmenu: true,
                            links: [
                                {
                                    text: "Acerca de COMÉDICA",
                                    url: "#",
                                    type: "internal",
                                },
                                {
                                    text: "Gobierno corporativo",
                                    url: "#",
                                    type: "internal",
                                },
                                {
                                    text: "Activos extraordinarios",
                                    url: "#",
                                    type: "internal",
                                },
                                {
                                    text: "Estados Financieros",
                                    url: "#",
                                    type: "internal",
                                },
                            ],
                        },
                        {
                            id: "col2",
                            title: "Puntos de Servicio",
                            hasSubmenu: true,
                            links: [
                                {
                                    text: "Agencias",
                                    url: "#",
                                    type: "internal",
                                },
                                {
                                    text: "Corresponsales financieros",
                                    url: "#",
                                    type: "internal",
                                },
                                {
                                    text: "Banca en Línea",
                                    url: "#",
                                    type: "internal",
                                },
                                {
                                    text: "WhatsApp",
                                    url: "#",
                                    type: "external",
                                },
                            ],
                        },
                        {
                            id: "col3",
                            title: "Quejas y sugerencias",
                            hasSubmenu: true,
                            links: [
                                {
                                    text: "Estadísticas",
                                    url: "#",
                                    type: "internal",
                                },
                            ],
                        },
                        {
                            id: "col4",
                            title: "Preguntas frecuentes",
                            hasSubmenu: false,
                            links: [
                                {
                                    text: "Preguntas frecuentes",
                                    url: "#",
                                    type: "internal",
                                },
                            ],
                        },
                        {
                            id: "col5",
                            title: "Tasas y comisiones",
                            hasSubmenu: false,
                            links: [
                                {
                                    text: "Tasas y comisiones",
                                    url: "#",
                                    type: "internal",
                                },
                            ],
                        },
                        {
                            id: "col6",
                            title: "Términos y condiciones",
                            hasSubmenu: false,
                            links: [
                                {
                                    text: "Términos y condiciones",
                                    url: "#",
                                    type: "internal",
                                },
                            ],
                        },
                        {
                            id: "col7",
                            title: "Política de seguridad",
                            hasSubmenu: false,
                            links: [
                                {
                                    text: "Política de seguridad",
                                    url: "#",
                                    type: "internal",
                                },
                            ],
                        },
                        {
                            id: "col8",
                            title: "Bolsa de Empleo",
                            hasSubmenu: false,
                            links: [
                                {
                                    text: "Bolsa de Empleo",
                                    url: "#",
                                    type: "internal",
                                },
                            ],
                        },
                        {
                            id: "col9",
                            title: "Contactos",
                            hasSubmenu: false,
                            links: [
                                {
                                    text: "Contactos",
                                    url: "#",
                                    type: "internal",
                                },
                            ],
                        },
                    ],
                    badges: [
                        {
                            imageUrl:
                                "https://via.placeholder.com/80x80?text=Badge1",
                            altText: "Badge 1",
                            url: "#",
                        },
                        {
                            imageUrl:
                                "https://via.placeholder.com/80x80?text=Badge2",
                            altText: "Badge 2",
                            url: "#",
                        },
                        {
                            imageUrl:
                                "https://via.placeholder.com/80x80?text=Badge3",
                            altText: "Badge 3",
                            url: "#",
                        },
                    ],
                    socialLinks: [
                        {
                            icon: "ri-facebook-fill",
                            url: "https://facebook.com",
                            platform: "facebook",
                        },
                        {
                            icon: "ri-instagram-fill",
                            url: "https://instagram.com",
                            platform: "instagram",
                        },
                        {
                            icon: "ri-twitter-x-line",
                            url: "https://twitter.com",
                            platform: "twitter",
                        },
                    ],
                },
            },

            init() {
                if (!this.get("footer-config")) {
                    const defaults = this.get("defaults");
                    if (defaults && defaults["footer-config"]) {
                        this.set("footer-config", defaults["footer-config"]);
                    }
                }

                this.on("change:footer-config", this.updateFooterHTML);
                setTimeout(() => this.updateFooterHTML(), 0);
            },

            updateFooterHTML() {
                let config;
                if (this.get("footer-config")) {
                    config = this.get("footer-config");
                } else if (
                    this.get("defaults") &&
                    this.get("defaults")["footer-config"]
                ) {
                    config = this.get("defaults")["footer-config"];
                } else {
                    config = {
                        logoUrl: "https://via.placeholder.com/150x50?text=LOGO",
                        columns: [],
                        badges: [],
                        socialLinks: [],
                    };
                }

                const columnsHTML = this.generateColumnsHTML(config.columns);
                const logoHTML = `<img src="${config.logoUrl || "https://via.placeholder.com/150x50?text=LOGO"}" alt="Logo" class="h-10 md:h-12">`;

                const badgesHTML = (config.badges || [])
                    .map(
                        (badge) => `
                    <a href="${badge.url}" target="_blank" rel="noopener" class="inline-block">
                        <img src="${badge.imageUrl}" alt="${badge.altText}" class="h-12 w-auto">
                    </a>
                `,
                    )
                    .join("");

                const socialLinksHTML = (config.socialLinks || [])
                    .map(
                        (social) => `
                    <a href="${social.url}" 
                       target="_blank" 
                       rel="noopener"
                       class="footer-social-link inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary transition-colors">
                        <i class="${social.icon}"></i>
                    </a>
                `,
                    )
                    .join("");

                const footerHTML = `
                    <div class="footer-container bg-gray-50 text-gray-800">
                        <div class="footer-links-section py-4">
                            <div class="container mx-auto px-4">
                                <div class="footer-columns grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                                    ${columnsHTML}
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer-bottom bg-primary py-4">
                            <div class="container mx-auto px-4">
                                <div class="flex flex-col md:flex-row justify-between items-center">
                                    <div class="mb-4 md:mb-0">
                                        ${logoHTML}
                                    </div>
                                    
                                    <div class="flex flex-wrap items-center gap-4">
                                        <div class="flex items-center gap-4">
                                            ${badgesHTML}
                                        </div>
                                        <div class="flex items-center gap-3">
                                            ${socialLinksHTML}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script>
                        (function() {
                            // Initialize footer dropdowns
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
                        })();
                    </script>
                `;

                this.components(footerHTML);
            },

            generateColumnsHTML(columns) {
                return (columns || [])
                    .map((column) => {
                        if (
                            column.hasSubmenu &&
                            column.links &&
                            column.links.length > 1
                        ) {
                            return `
                            <div class="footer-column mb-1">
                                <div class="footer-dropdown">
                                    <button class="footer-dropdown-toggle flex items-center justify-between w-full text-left font-semibold text-md text-primary py-2 px-4 rounded-xl hover:bg-primary hover:text-white transition-colors">
                                        ${column.title}
                                        <i class="ri-arrow-down-s-line ml-2 transition-transform"></i>
                                    </button>
                                    <div class="footer-dropdown-content hidden mt-2 pl-2">
                                        ${column.links
                                            .map(
                                                (link) => `
                                            <a href="${link.url}" 
                                               ${link.type === "external" ? 'target="_blank" rel="noopener"' : ""}
                                               class="block py-2 px-4 rounded-xl hover:bg-primary hover:text-white transition-colors">
                                                ${link.text}
                                            </a>
                                        `,
                                            )
                                            .join("")}
                                    </div>
                                </div>
                            </div>
                        `;
                        } else {
                            // Single link column
                            const link =
                                column.links && column.links.length > 0
                                    ? column.links[0]
                                    : { url: "#", text: column.title };
                            return `
                            <div class="footer-column mb-1">
                                <a href="${link.url}" 
                                   ${link.type === "external" ? 'target="_blank" rel="noopener"' : ""}
                                   class="font-semibold text-md text-primary py-2 px-4 rounded-xl block hover:bg-primary hover:text-white transition-colors">
                                    ${column.title}
                                </a>
                            </div>
                        `;
                        }
                    })
                    .join("");
            },
        },
    });

    // Add modern footer block
    blockManager.add("footer-modern-config", {
        label: "Footer Configurable",
        category: "footers",
        content: {
            type: "configurable-footer",
            "footer-config": {
                logoUrl: "https://via.placeholder.com/150x50?text=LOGO",
                columns: [
                    {
                        id: "col1",
                        title: "Información institucional",
                        hasSubmenu: true,
                        links: [
                            {
                                text: "Acerca de COMÉDICA",
                                url: "#",
                                type: "internal",
                            },
                            {
                                text: "Gobierno corporativo",
                                url: "#",
                                type: "internal",
                            },
                            {
                                text: "Activos extraordinarios",
                                url: "#",
                                type: "internal",
                            },
                            {
                                text: "Estados Financieros",
                                url: "#",
                                type: "internal",
                            },
                        ],
                    },
                    {
                        id: "col2",
                        title: "Puntos de Servicio",
                        hasSubmenu: true,
                        links: [
                            { text: "Agencias", url: "#", type: "internal" },
                            {
                                text: "Corresponsales financieros",
                                url: "#",
                                type: "internal",
                            },
                            {
                                text: "Banca en Línea",
                                url: "#",
                                type: "internal",
                            },
                            { text: "WhatsApp", url: "#", type: "external" },
                        ],
                    },
                    {
                        id: "col3",
                        title: "Quejas y sugerencias",
                        hasSubmenu: true,
                        links: [
                            {
                                text: "Estadísticas",
                                url: "#",
                                type: "internal",
                            },
                        ],
                    },
                    {
                        id: "col4",
                        title: "Preguntas frecuentes",
                        hasSubmenu: false,
                        links: [
                            {
                                text: "Preguntas frecuentes",
                                url: "#",
                                type: "internal",
                            },
                        ],
                    },
                    {
                        id: "col5",
                        title: "Tasas y comisiones",
                        hasSubmenu: false,
                        links: [
                            {
                                text: "Tasas y comisiones",
                                url: "#",
                                type: "internal",
                            },
                        ],
                    },
                    {
                        id: "col6",
                        title: "Términos y condiciones",
                        hasSubmenu: false,
                        links: [
                            {
                                text: "Términos y condiciones",
                                url: "#",
                                type: "internal",
                            },
                        ],
                    },
                    {
                        id: "col7",
                        title: "Política de seguridad",
                        hasSubmenu: false,
                        links: [
                            {
                                text: "Política de seguridad",
                                url: "#",
                                type: "internal",
                            },
                        ],
                    },
                    {
                        id: "col8",
                        title: "Bolsa de Empleo",
                        hasSubmenu: false,
                        links: [
                            {
                                text: "Bolsa de Empleo",
                                url: "#",
                                type: "internal",
                            },
                        ],
                    },
                    {
                        id: "col9",
                        title: "Contactos",
                        hasSubmenu: false,
                        links: [
                            { text: "Contactos", url: "#", type: "internal" },
                        ],
                    },
                ],
                badges: [
                    {
                        imageUrl:
                            "https://via.placeholder.com/80x80?text=Badge1",
                        altText: "Badge 1",
                        url: "#",
                    },
                    {
                        imageUrl:
                            "https://via.placeholder.com/80x80?text=Badge2",
                        altText: "Badge 2",
                        url: "#",
                    },
                    {
                        imageUrl:
                            "https://via.placeholder.com/80x80?text=Badge3",
                        altText: "Badge 3",
                        url: "#",
                    },
                ],
                socialLinks: [
                    {
                        icon: "ri-facebook-fill",
                        url: "https://facebook.com",
                        platform: "facebook",
                    },
                    {
                        icon: "ri-instagram-fill",
                        url: "https://instagram.com",
                        platform: "instagram",
                    },
                    {
                        icon: "ri-twitter-x-line",
                        url: "https://twitter.com",
                        platform: "twitter",
                    },
                ],
            },
        },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect width="24" height="20" y="2" fill="#f3f4f6" rx="2"></rect>
            <rect width="24" height="4" y="18" fill="#23366A" rx="1"></rect>
            <rect x="2" y="4" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="7" y="4" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="12" y="4" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="17" y="4" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="2" y="8" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="7" y="8" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="12" y="8" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="17" y="8" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="2" y="12" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="7" y="12" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="2" y="19" width="5" height="2" fill="#fff" opacity="0.7" rx="0.5"></rect>
            <circle cx="19" cy="20" r="1" fill="#fff" opacity="0.7"></circle>
            <circle cx="16" cy="20" r="1" fill="#fff" opacity="0.7"></circle>
            <circle cx="22" cy="20" r="1" fill="#fff" opacity="0.7"></circle>
        </svg>`,
    });

    // Open configuration modal
    function openFooterConfigModal(editor, component) {
        window.editor = editor;
        const config = component.get("footer-config");

        Swal.fire({
            title: "Configurar Footer",
            html: createConfigModalHTML(config),
            width: "95%",
            maxWidth: "1200px",
            padding: 0,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#23366A",
            cancelButtonColor: "#e74c3c",
            customClass: {
                container: "footer-config-modal",
                popup: "footer-config-popup",
                header: "footer-config-header",
                title: "footer-config-title",
                content: "footer-config-content",
                actions: "footer-config-actions",
            },
            allowOutsideClick: false,
            allowEscapeKey: true,
            didOpen: () => {
                document.querySelector(".swal2-popup").style.padding = "0";
                setupModalEventListeners(config);
            },
            preConfirm: () => {
                return collectModalData();
            },
        }).then((result) => {
            if (result.isConfirmed) {
                component.set("footer-config", result.value);
                component.trigger("change:footer-config");
            }
        });
    }

    function setupEnhancedPageSearch() {
        const pageSearchInputs =
            document.querySelectorAll(".page-search-input");

        pageSearchInputs.forEach((input) => {
            let resultsContainer = input.nextElementSibling;
            if (
                !resultsContainer ||
                !resultsContainer.classList.contains("page-search-results")
            ) {
                resultsContainer = document.createElement("div");
                resultsContainer.className = "page-search-results";
                resultsContainer.style.cssText = `
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #ced4da;
                border-radius: 4px;
                max-height: 250px;
                overflow-y: auto;
                z-index: 1010;
                margin-top: 2px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            `;

                input.parentNode.style.position = "relative";
                input.insertAdjacentElement("afterend", resultsContainer);
            }

            let searchTimeout;

            const performSearch = (query) => {
                resultsContainer.innerHTML = `
                <div class="page-search-loading" style="padding: 10px; text-align: center; color: #6c757d;">
                    <i class="ri-search-line" style="margin-right: 5px;"></i> Buscando...
                </div>
            `;
                resultsContainer.style.display = "block";

                fetch(`/api/pages/search?q=${encodeURIComponent(query)}`)
                    .then((response) => response.json())
                    .then((pages) => {
                        if (pages.length === 0) {
                            resultsContainer.innerHTML = `
                            <div class="page-search-empty" style="padding: 10px; text-align: center; color: #6c757d;">
                                No se encontraron páginas
                            </div>
                        `;
                        } else {
                            const resultsHTML = pages
                                .map(
                                    (page) => `
                            <div class="page-search-item" data-slug="/${page.slug}" data-title="${page.title}" 
                                 style="padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #e9ecef; transition: background-color 0.2s;">
                                <div style="font-weight: 600; color: #23366A; margin-bottom: 2px;">
                                    ${page.title}
                                </div>
                                <div style="font-size: 0.75rem; color: #6c757d; display: flex; align-items: center;">
                                    <i class="ri-link" style="margin-right: 4px; font-size: 12px;"></i>
                                    /${page.slug}
                                </div>
                            </div>
                        `,
                                )
                                .join("");

                            resultsContainer.innerHTML = resultsHTML;

                            const items =
                                resultsContainer.querySelectorAll(
                                    ".page-search-item",
                                );
                            items.forEach((item) => {
                                item.addEventListener("mouseenter", () => {
                                    item.style.backgroundColor = "#f8f9fa";
                                });

                                item.addEventListener("mouseleave", () => {
                                    item.style.backgroundColor = "transparent";
                                });
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error al buscar páginas:", error);
                        resultsContainer.innerHTML = `
                        <div class="page-search-error" style="padding: 10px; text-align: center; color: #dc3545;">
                            Error al buscar páginas
                        </div>
                    `;
                    });
            };

            input.addEventListener("input", (e) => {
                const query = e.target.value.trim();

                clearTimeout(searchTimeout);

                if (query.startsWith("http") || query.length < 2) {
                    resultsContainer.style.display = "none";
                    return;
                }

                if (query.startsWith("/")) {
                    const searchTerm = query.substring(1);
                    if (searchTerm.length > 1) {
                        searchTimeout = setTimeout(
                            () => performSearch(searchTerm),
                            300,
                        );
                    } else {
                        resultsContainer.style.display = "none";
                    }
                    return;
                }

                searchTimeout = setTimeout(() => performSearch(query), 300);
            });

            resultsContainer.addEventListener("mousedown", (e) => {
                e.preventDefault();

                const item = e.target.closest(".page-search-item");
                if (item) {
                    const slug = item.getAttribute("data-slug");
                    input.value = slug;
                    resultsContainer.style.display = "none";

                    input.dispatchEvent(new Event("input", { bubbles: true }));
                    input.dispatchEvent(new Event("change", { bubbles: true }));
                }
            });

            document.addEventListener("click", (e) => {
                if (
                    !input.contains(e.target) &&
                    !resultsContainer.contains(e.target)
                ) {
                    resultsContainer.style.display = "none";
                }
            });

            input.addEventListener("focus", function () {
                if (
                    this.value.trim().length >= 2 &&
                    !this.value.startsWith("http")
                ) {
                    this.dispatchEvent(new Event("input"));
                }
            });

            input.addEventListener("keydown", (e) => {
                if (resultsContainer.style.display === "none") return;

                const items = Array.from(
                    resultsContainer.querySelectorAll(".page-search-item"),
                );
                if (items.length === 0) return;

                const activeItem = resultsContainer.querySelector(
                    ".page-search-item.active",
                );
                let activeIndex = activeItem ? items.indexOf(activeItem) : -1;

                switch (e.key) {
                    case "ArrowDown":
                        e.preventDefault();

                        if (activeItem) {
                            activeItem.style.backgroundColor = "transparent";
                            activeItem.classList.remove("active");
                        }
                        activeIndex = (activeIndex + 1) % items.length;
                        items[activeIndex].classList.add("active");
                        items[activeIndex].style.backgroundColor = "#e9ecef";
                        items[activeIndex].scrollIntoView({ block: "nearest" });
                        break;

                    case "ArrowUp":
                        e.preventDefault();

                        if (activeItem) {
                            activeItem.style.backgroundColor = "transparent";
                            activeItem.classList.remove("active");
                        }
                        activeIndex =
                            (activeIndex - 1 + items.length) % items.length;
                        items[activeIndex].classList.add("active");
                        items[activeIndex].style.backgroundColor = "#e9ecef";
                        items[activeIndex].scrollIntoView({ block: "nearest" });
                        break;

                    case "Enter":
                        if (activeItem) {
                            e.preventDefault();
                            const slug = activeItem.getAttribute("data-slug");
                            input.value = slug;
                            resultsContainer.style.display = "none";
                            input.dispatchEvent(
                                new Event("input", { bubbles: true }),
                            );
                            input.dispatchEvent(
                                new Event("change", { bubbles: true }),
                            );
                        }
                        break;

                    case "Escape":
                        e.preventDefault();
                        resultsContainer.style.display = "none";
                        break;
                }
            });
        });
    }

    // Create configuration modal HTML
    function createConfigModalHTML(config) {
        return `
        <style>
            .footer-config-popup {
                display: flex;
                flex-direction: column;
                max-height: 90vh;
                padding: 0 !important;
                margin: 0 !important;
                border-radius: 8px;
                overflow: hidden;
                width: 100% !important;
            }
            .footer-config-header {
                background-color: #23366A;
                color: white;
                padding: 1rem;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            .footer-config-title {
                font-size: 1.25rem !important;
                margin: 0 !important;
            }
            .footer-config-content {
                padding: 0 !important;
                margin: 0 !important;
                overflow: visible !important;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .footer-config-actions {
                background-color: #f8f9fa;
                border-top: 1px solid #dee2e6;
                padding: 1rem;
                position: sticky;
                bottom: 0;
                z-index: 10;
            }
            #footer-config-inner {
                padding: 0;
                overflow-y: auto;
                flex: 1;
                height: calc(90vh - 110px);
            }
            .footer-config-tabs {
                display: flex;
                overflow-x: auto;
                background-color: #fff;
                border-bottom: 1px solid #dee2e6;
                position: sticky;
                top: 0;
                z-index: 5;
                width: 100%;
                padding: 0;
            }
            .footer-config-tab {
                padding: 0.75rem 1.5rem;
                cursor: pointer;
                border: none;
                background: none;
                font-weight: 500;
                color: #495057;
                white-space: nowrap;
                position: relative;
            }
            .footer-config-tab.active {
                color: #23366A;
                font-weight: 600;
            }
            .footer-config-tab.active::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 2px;
                background-color: #23366A;
            }
            .footer-config-panel {
                display: none;
                padding: 1rem;
                overflow-y: auto;
                height: 100%;
            }
            .footer-config-panel.active {
                display: block;
            }
            .config-section {
                background: #ffffff;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                border: 1px solid #eee;
            }
            .config-section h4 {
                color: #23366A;
                font-weight: 600;
                margin-bottom: 0.75rem;
                font-size: 1rem;
            }
            .column-item {
                background: white;
                padding: 1rem;
                border-radius: 6px;
                margin-bottom: 0.75rem;
                border: 1px solid #dee2e6;
            }
            .link-item {
                background: #f8f9fa;
                padding: 0.5rem;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                display: grid;
                grid-template-columns: 1fr 1fr auto auto;
                gap: 0.5rem;
                align-items: center;
            }
            .link-item input, .link-item select {
                padding: 0.375rem;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 0.875rem;
            }
            .image-selector-wrapper {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .image-selector-button {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: #23366A;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 9999px !important;
                cursor: pointer;
                font-size: 0.875rem;
                white-space: nowrap;
                flex-shrink: 0;
            }
            .image-selector-button:hover {
                background: #0f2d54;
            }
            .btn-icon {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                color: #6c757d;
                font-size: 1.25rem;
            }
            .btn-icon:hover {
                color: #23366A;
            }
            .btn-add {
                background: #23366A;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.875rem;
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
                margin-bottom: 0.5rem;
            }
            .btn-add:hover {
                background: #0f2d54;
            }
            .badge-item {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.5rem;
                background: white;
                padding: 0.75rem;
                border-radius: 4px;
                border: 1px solid #dee2e6;
            }
            .badge-preview {
                width: 60px;
                height: 60px;
                object-fit: contain;
                background-color: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 4px;
            }
            .badge-inputs {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .badge-inputs input {
                padding: 0.375rem;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 0.875rem;
            }
            .has-submenu-checkbox {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
            }
            .social-item {
                display: flex;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.5rem;
                background: white;
                padding: 0.75rem;
                border-radius: 4px;
                border: 1px solid #dee2e6;
            }
            .social-item input, .social-item select {
                flex: 1;
                padding: 0.375rem;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 0.875rem;
            }
            .swal2-html-container {
                padding: 0 !important;
                margin: 0 !important;
                overflow-y: hidden !important;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .swal2-actions {
                margin: 0 !important;
                padding: 1rem !important;
                background-color: #f8f9fa;
                border-top: 1px solid #dee2e6;
                width: 100%;
                justify-content: flex-end !important;
                z-index: 5;
            }
            @media (max-width: 768px) {
                .link-item {
                    grid-template-columns: 1fr;
                }
                .badge-item {
                    grid-template-columns: 1fr;
                }
                .footer-config-panel {
                    padding: 0.5rem;
                }
                .footer-config-tab {
                    padding: 0.5rem 1rem;
                }
                #footer-config-inner {
                    height: calc(90vh - 140px);
                }
            }
        </style>

        <div id="footer-config-container">
            <div class="footer-config-tabs">
                <button class="footer-config-tab active" data-target="general">General</button>
                <button class="footer-config-tab" data-target="columns">Columnas</button>
                <button class="footer-config-tab" data-target="badges">Badges</button>
                <button class="footer-config-tab" data-target="social">Redes</button>
            </div>
            
            <div id="footer-config-inner">
                <div id="panel-general" class="footer-config-panel active">
                    <div class="config-section">
                        <h4>Logo</h4>
                        <div class="mb-3">
                            <label class="form-label" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">URL del Logo</label>
                            <div class="image-selector-wrapper">
                                <input type="text" id="logo-url" class="form-control" value="${config.logoUrl || ""}" placeholder="https://ejemplo.com/logo.png" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                                <button type="button" id="select-logo-image" class="image-selector-button">
                                    <i class="ri-image-line"></i> Seleccionar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="panel-columns" class="footer-config-panel">
                    <div class="config-section">
                        <h4>Columnas de Enlaces</h4>
                        <div id="columns-container">
                            ${config.columns
                                .map(
                                    (col, colIndex) => `
                                    <div class="column-item" data-column-index="${colIndex}">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                                            <input type="text" class="column-title" value="${col.title}" placeholder="Título de la columna" style="flex: 1; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px; font-weight: 600;">
                                            <button class="btn-icon remove-column" data-column-index="${colIndex}">
                                                <i class="ri-delete-bin-line"></i>
                                            </button>
                                        </div>
                                        <div class="has-submenu-checkbox">
                                            <input type="checkbox" id="has-submenu-${colIndex}" class="has-submenu" ${col.hasSubmenu ? "checked" : ""}>
                                            <label for="has-submenu-${colIndex}" style="font-size: 0.875rem; margin: 0;">Tiene submenú desplegable</label>
                                        </div>
                                        <div class="single-link-container" style="display: ${!col.hasSubmenu ? "block" : "none"}; margin-top: 0.75rem;">
                                            <div style="position: relative;">
                                                <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem;">URL del enlace:</label>
                                                <input type="text" class="single-link-url page-search-input" value="${col.links && col.links.length > 0 ? col.links[0].url : "#"}" placeholder="URL del enlace" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                                            </div>
                                        </div>
                                        <div class="links-container" ${!col.hasSubmenu ? 'style="display:none"' : ""}>
                                            ${(col.links || [])
                                                .map(
                                                    (link, linkIndex) => `
                                                <div class="link-item" data-link-index="${linkIndex}">
                                                    <input type="text" class="link-text" value="${link.text}" placeholder="Texto del enlace">
                                                    <input type="text" class="link-url page-search-input" value="${link.url}" placeholder="URL">
                                                    <select class="link-type">
                                                        <option value="internal" ${link.type === "internal" ? "selected" : ""}>Interno</option>
                                                        <option value="external" ${link.type === "external" ? "selected" : ""}>Externo</option>
                                                    </select>
                                                    <button class="btn-icon remove-link" data-column-index="${colIndex}" data-link-index="${linkIndex}">
                                                        <i class="ri-close-line"></i>
                                                    </button>
                                                </div>
                                            `,
                                                )
                                                .join("")}
                                            <button class="btn-add add-link" data-column-index="${colIndex}">
                                                <i class="ri-add-line"></i> Agregar enlace
                                            </button>
                                        </div>
                                    </div>
                            `,
                                )
                                .join("")}
                        </div>
                        <button class="btn-add" id="add-column">
                            <i class="ri-add-line"></i> Agregar columna
                        </button>
                    </div>
                </div>
                
                <div id="panel-badges" class="footer-config-panel">
                    <div class="config-section">
                        <h4>Badges e Insignias</h4>
                        <div id="badges-container">
                            ${(config.badges || [])
                                .map(
                                    (badge, index) => `
                                <div class="badge-item" data-badge-index="${index}">
                                    <img src="${badge.imageUrl}" alt="${badge.altText}" class="badge-preview">
                                    <div class="badge-inputs">
                                        <input type="text" class="badge-url" value="${badge.imageUrl}" placeholder="URL de la imagen">
                                        <input type="text" class="badge-alt" value="${badge.altText}" placeholder="Texto alternativo">
                                        <input type="text" class="badge-link page-search-input" value="${badge.url}" placeholder="Enlace (opcional)">
                                    </div>
                                    <button class="btn-icon remove-badge" data-badge-index="${index}">
                                        <i class="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            `,
                                )
                                .join("")}
                        </div>
                        <button class="btn-add" id="add-badge">
                            <i class="ri-add-line"></i> Agregar badge
                        </button>
                    </div>
                </div>
                
                <div id="panel-social" class="footer-config-panel">
                    <div class="config-section">
                        <h4>Enlaces de Redes</h4>
                        <div id="social-container">
                            ${(config.socialLinks || [])
                                .map(
                                    (social, index) => `
                                <div class="social-item" data-social-index="${index}">
                                    <select class="social-icon">
                                        <option value="ri-facebook-fill" ${social.icon === "ri-facebook-fill" ? "selected" : ""}>Facebook</option>
                                        <option value="ri-instagram-fill" ${social.icon === "ri-instagram-fill" ? "selected" : ""}>Instagram</option>
                                        <option value="ri-twitter-x-line" ${social.icon === "ri-twitter-x-line" ? "selected" : ""}>Twitter/X</option>
                                        <option value="ri-linkedin-fill" ${social.icon === "ri-linkedin-fill" ? "selected" : ""}>LinkedIn</option>
                                        <option value="ri-youtube-fill" ${social.icon === "ri-youtube-fill" ? "selected" : ""}>YouTube</option>
                                    </select>
                                    <input type="text" class="social-url" value="${social.url}" placeholder="URL">
                                    <button class="btn-icon remove-social" data-social-index="${index}">
                                        <i class="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            `,
                                )
                                .join("")}
                        </div>
                        <button class="btn-add" id="add-social">
                            <i class="ri-add-line"></i> Agregar red social
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    // Setup modal event listeners
    function setupModalEventListeners(config) {
        document.querySelectorAll(".footer-config-tab").forEach((tab) => {
            tab.addEventListener("click", () => {
                document.querySelectorAll(".footer-config-tab").forEach((t) => {
                    t.classList.remove("active");
                });

                document
                    .querySelectorAll(".footer-config-panel")
                    .forEach((p) => {
                        p.classList.remove("active");
                    });

                tab.classList.add("active");

                const targetId = `panel-${tab.getAttribute("data-target")}`;
                document.getElementById(targetId).classList.add("active");
            });
        });

        const selectLogoBtn = document.getElementById("select-logo-image");
        if (selectLogoBtn) {
            selectLogoBtn.addEventListener("click", () => {
                const tempConfig = collectModalData();
                Swal.close();

                setTimeout(() => {
                    showMediaSelector("image", (mediaData) => {
                        if (mediaData && mediaData.src) {
                            tempConfig.logoUrl = mediaData.src;
                        }

                        const selectedComponent = editor.getSelected();
                        if (selectedComponent) {
                            setTimeout(() => {
                                openFooterConfigModal(
                                    editor,
                                    selectedComponent,
                                );

                                setTimeout(() => {
                                    restoreModalData(tempConfig);

                                    const logoUrlInput =
                                        document.getElementById("logo-url");
                                    if (logoUrlInput && tempConfig.logoUrl) {
                                        logoUrlInput.value = tempConfig.logoUrl;
                                    }
                                }, 300);
                            }, 100);
                        }
                    });
                }, 200);
            });
        }

        document.getElementById("add-column").addEventListener("click", () => {
            const container = document.getElementById("columns-container");
            const colIndex = container.children.length;
            const newColumn = document.createElement("div");
            newColumn.className = "column-item";
            newColumn.setAttribute("data-column-index", colIndex);
            newColumn.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <input type="text" class="column-title" value="Nueva Columna" placeholder="Título de la columna" style="flex: 1; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px; font-weight: 600;">
                    <button class="btn-icon remove-column" data-column-index="${colIndex}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
                <div class="has-submenu-checkbox">
                    <input type="checkbox" id="has-submenu-${colIndex}" class="has-submenu">
                    <label for="has-submenu-${colIndex}" style="font-size: 0.875rem; margin: 0;">Tiene submenú desplegable</label>
                </div>
                <div class="single-link-container" style="display: block; margin-top: 0.75rem;">
                    <div style="position: relative;">
                        <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem;">URL del enlace:</label>
                        <input type="text" class="single-link-url page-search-input" value="#" placeholder="URL del enlace" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                    </div>
                </div>
                <div class="links-container" style="display:none">
                    <button class="btn-add add-link" data-column-index="${colIndex}">
                        <i class="ri-add-line"></i> Agregar enlace
                    </button>
                </div>
            `;
            container.appendChild(newColumn);
            attachColumnEventListeners(newColumn);
        });

        document.getElementById("add-badge").addEventListener("click", () => {
            const container = document.getElementById("badges-container");
            const badgeIndex = container.children.length;
            const newBadge = document.createElement("div");
            newBadge.className = "badge-item";
            newBadge.setAttribute("data-badge-index", badgeIndex);
            newBadge.innerHTML = `
                    <img src="https://via.placeholder.com/80x80?text=New+Badge" alt="Nueva Badge" class="badge-preview">
                    <div class="badge-inputs">
                        <input type="text" class="badge-url" value="https://via.placeholder.com/80x80?text=New+Badge" placeholder="URL de la imagen">
                        <input type="text" class="badge-alt" value="Nueva Badge" placeholder="Texto alternativo">
                        <input type="text" class="badge-link" value="#" placeholder="Enlace (opcional)">
                    </div>
                    <button class="btn-icon remove-badge" data-badge-index="${badgeIndex}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                `;
            container.appendChild(newBadge);
            attachBadgeEventListeners(newBadge);
        });

        document.getElementById("add-social").addEventListener("click", () => {
            const container = document.getElementById("social-container");
            const socialIndex = container.children.length;
            const newSocial = document.createElement("div");
            newSocial.className = "social-item";
            newSocial.setAttribute("data-social-index", socialIndex);
            newSocial.innerHTML = `
                    <select class="social-icon">
                        <option value="ri-facebook-fill">Facebook</option>
                        <option value="ri-instagram-fill">Instagram</option>
                        <option value="ri-twitter-x-line">Twitter/X</option>
                        <option value="ri-linkedin-fill">LinkedIn</option>
                        <option value="ri-youtube-fill">YouTube</option>
                    </select>
                    <input type="text" class="social-url" value="#" placeholder="URL">
                    <button class="btn-icon remove-social" data-social-index="${socialIndex}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                `;
            container.appendChild(newSocial);
            attachSocialEventListeners(newSocial);
        });

        document
            .querySelectorAll(".column-item")
            .forEach(attachColumnEventListeners);
        document
            .querySelectorAll(".badge-item")
            .forEach(attachBadgeEventListeners);
        document
            .querySelectorAll(".social-item")
            .forEach(attachSocialEventListeners);

        setupEnhancedPageSearch();
    }

    // Attach column event listeners
    function attachColumnEventListeners(columnItem) {
        const removeBtn = columnItem.querySelector(".remove-column");
        if (removeBtn) {
            removeBtn.addEventListener("click", () => columnItem.remove());
        }

        const hasSubmenuCheck = columnItem.querySelector(".has-submenu");
        const linksContainer = columnItem.querySelector(".links-container");
        const singleLinkContainer = columnItem.querySelector(
            ".single-link-container",
        );

        if (hasSubmenuCheck && linksContainer && singleLinkContainer) {
            hasSubmenuCheck.addEventListener("change", function () {
                linksContainer.style.display = this.checked ? "block" : "none";
                singleLinkContainer.style.display = this.checked
                    ? "none"
                    : "block";

                if (
                    this.checked &&
                    !linksContainer.querySelector(".link-item")
                ) {
                    const addLinkBtn =
                        linksContainer.querySelector(".add-link");
                    if (addLinkBtn) {
                        addLinkBtn.click();
                    }
                }
            });
        }

        const addLinkBtn = columnItem.querySelector(".add-link");
        if (addLinkBtn) {
            addLinkBtn.addEventListener("click", () => {
                const linksContainer =
                    columnItem.querySelector(".links-container");
                const colIndex = columnItem.getAttribute("data-column-index");
                const linkIndex =
                    linksContainer.querySelectorAll(".link-item").length;
                const newLink = document.createElement("div");
                newLink.className = "link-item";
                newLink.setAttribute("data-link-index", linkIndex);
                newLink.innerHTML = `
                    <input type="text" class="link-text" value="Nuevo enlace" placeholder="Texto del enlace">
                    <input type="text" class="link-url page-search-input" value="#" placeholder="URL">
                    <select class="link-type">
                        <option value="internal">Interno</option>
                        <option value="external">Externo</option>
                    </select>
                    <button class="btn-icon remove-link" data-column-index="${colIndex}" data-link-index="${linkIndex}">
                        <i class="ri-close-line"></i>
                    </button>
                `;
                // Insert before the add button
                linksContainer.insertBefore(newLink, addLinkBtn);
                attachLinkEventListeners(newLink);
            });
        }

        columnItem
            .querySelectorAll(".link-item")
            .forEach(attachLinkEventListeners);
    }

    // Attach link event listeners
    function attachLinkEventListeners(linkItem) {
        const removeBtn = linkItem.querySelector(".remove-link");
        if (removeBtn) {
            removeBtn.addEventListener("click", () => linkItem.remove());
        }
    }

    // Attach badge event listeners
    function attachBadgeEventListeners(badgeItem) {
        const removeBtn = badgeItem.querySelector(".remove-badge");
        if (removeBtn) {
            removeBtn.addEventListener("click", () => badgeItem.remove());
        }

        const imageUrlInput = badgeItem.querySelector(".badge-url");
        const imagePreview = badgeItem.querySelector(".badge-preview");

        if (imageUrlInput && imagePreview) {
            imageUrlInput.addEventListener("change", () => {
                imagePreview.src = imageUrlInput.value;
            });

            // Add image selector for badge
            imagePreview.addEventListener("click", () => {
                const tempConfig = collectModalData();
                Swal.close();

                setTimeout(() => {
                    showMediaSelector("image", (mediaData) => {
                        const selectedComponent = editor.getSelected();
                        if (selectedComponent) {
                            setTimeout(() => {
                                openFooterConfigModal(
                                    editor,
                                    selectedComponent,
                                );

                                setTimeout(() => {
                                    if (tempConfig) {
                                        restoreModalData(tempConfig);

                                        // Update badge image - find the badge by index
                                        const badgeIndex =
                                            badgeItem.getAttribute(
                                                "data-badge-index",
                                            );
                                        const newBadgeItems =
                                            document.querySelectorAll(
                                                ".badge-item",
                                            );

                                        if (newBadgeItems[badgeIndex]) {
                                            const newImageUrl =
                                                newBadgeItems[
                                                    badgeIndex
                                                ].querySelector(".badge-url");
                                            const newImagePreview =
                                                newBadgeItems[
                                                    badgeIndex
                                                ].querySelector(
                                                    ".badge-preview",
                                                );

                                            if (
                                                newImageUrl &&
                                                newImagePreview &&
                                                mediaData &&
                                                mediaData.src
                                            ) {
                                                newImageUrl.value =
                                                    mediaData.src;
                                                newImagePreview.src =
                                                    mediaData.src;
                                            }
                                        }
                                    }
                                }, 300);
                            }, 100);
                        }
                    });
                }, 200);
            });
        }
    }

    // Attach social event listeners
    function attachSocialEventListeners(socialItem) {
        const removeBtn = socialItem.querySelector(".remove-social");
        if (removeBtn) {
            removeBtn.addEventListener("click", () => socialItem.remove());
        }
    }

    // Restore modal data after image selection
    function restoreModalData(tempConfig) {
        const logoUrlInput = document.getElementById("logo-url");
        if (logoUrlInput && tempConfig.logoUrl) {
            logoUrlInput.value = tempConfig.logoUrl;
        }

        if (tempConfig.badges && tempConfig.badges.length > 0) {
            tempConfig.badges.forEach((badge, index) => {
                const badgeItems = document.querySelectorAll(".badge-item");
                if (badgeItems[index]) {
                    const urlInput =
                        badgeItems[index].querySelector(".badge-url");
                    const altInput =
                        badgeItems[index].querySelector(".badge-alt");
                    const linkInput =
                        badgeItems[index].querySelector(".badge-link");
                    const preview =
                        badgeItems[index].querySelector(".badge-preview");

                    if (urlInput) urlInput.value = badge.imageUrl;
                    if (altInput) altInput.value = badge.altText;
                    if (linkInput) linkInput.value = badge.url;
                    if (preview) preview.src = badge.imageUrl;
                }
            });
        }

        if (tempConfig.socialLinks && tempConfig.socialLinks.length > 0) {
            tempConfig.socialLinks.forEach((social, index) => {
                const socialItems = document.querySelectorAll(".social-item");
                if (socialItems[index]) {
                    const iconSelect =
                        socialItems[index].querySelector(".social-icon");
                    const urlInput =
                        socialItems[index].querySelector(".social-url");

                    if (iconSelect) iconSelect.value = social.icon;
                    if (urlInput) urlInput.value = social.url;
                }
            });
        }
    }

    // Collect modal data
    function collectModalData() {
        const logoUrl = document.getElementById("logo-url").value;

        const columns = Array.from(
            document.querySelectorAll(".column-item"),
        ).map((col, colIndex) => {
            const hasSubmenu = col.querySelector(".has-submenu").checked;

            if (hasSubmenu) {
                return {
                    id: `col${colIndex + 1}`,
                    title: col.querySelector(".column-title").value,
                    hasSubmenu: true,
                    links: Array.from(col.querySelectorAll(".link-item")).map(
                        (link) => ({
                            text: link.querySelector(".link-text").value,
                            url: link.querySelector(".link-url").value,
                            type: link.querySelector(".link-type").value,
                        }),
                    ),
                };
            } else {
                const singleLinkUrl =
                    col.querySelector(".single-link-url")?.value || "#";
                return {
                    id: `col${colIndex + 1}`,
                    title: col.querySelector(".column-title").value,
                    hasSubmenu: false,
                    links: [
                        {
                            text: col.querySelector(".column-title").value,
                            url: singleLinkUrl,
                            type: "internal",
                        },
                    ],
                };
            }

            return {
                id: `col${colIndex + 1}`,
                title: col.querySelector(".column-title").value,
                hasSubmenu: hasSubmenu,
                links: hasSubmenu
                    ? Array.from(col.querySelectorAll(".link-item")).map(
                          (link) => ({
                              text: link.querySelector(".link-text").value,
                              url: link.querySelector(".link-url").value,
                              type: link.querySelector(".link-type").value,
                          }),
                      )
                    : [
                          {
                              text: col.querySelector(".column-title").value,
                              url: "#",
                              type: "internal",
                          },
                      ],
            };
        });

        const badges = Array.from(document.querySelectorAll(".badge-item")).map(
            (badge) => ({
                imageUrl: badge.querySelector(".badge-url").value,
                altText: badge.querySelector(".badge-alt").value,
                url: badge.querySelector(".badge-link").value,
            }),
        );

        const socialLinks = Array.from(
            document.querySelectorAll(".social-item"),
        ).map((social) => ({
            icon: social.querySelector(".social-icon").value,
            url: social.querySelector(".social-url").value,
            platform: social
                .querySelector(".social-icon")
                .value.replace("ri-", "")
                .replace("-fill", "")
                .replace("-line", ""),
        }));

        return {
            logoUrl,
            columns,
            badges,
            socialLinks,
        };
    }
}
