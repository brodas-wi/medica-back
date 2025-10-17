import { showMediaSelector } from "../utils/mediaSelector";

// Load promotion blocks into GrapesJS editor
export default function loadPromotionBlocks(editor) {
    const blockManager = editor.BlockManager;

    const promotionSvg = `
    <svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#ffffff"/>
        
        <rect x="1" y="1" width="14" height="2" rx="1" fill="none" stroke="#23366A" stroke-width="0.4"/>
        <path d="M 13 2 L 14 2.5 L 13 3" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="17" y="1" width="14" height="2" rx="1" fill="none" stroke="#23366A" stroke-width="0.4"/>
        <path d="M 29 2 L 30 2.5 L 29 3" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="1" y="5" width="14" height="12" rx="0.8" fill="#f3f4f6"/>
        <rect x="1" y="5" width="14" height="6" rx="0.8" fill="#3b82f6"/>
        <rect x="2" y="6" width="5" height="1" rx="0.5" fill="#23366A"/>
        <rect x="9" y="6" width="4" height="1" rx="0.5" fill="#ef4444"/>
        <rect x="2" y="12" width="11" height="0.8" rx="0.3" fill="#23366A"/>
        <rect x="2" y="13.2" width="8" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="2" y="14.5" width="11" height="1.2" rx="0.6" fill="none" stroke="#23366A" stroke-width="0.4"/>
        
        <rect x="17" y="5" width="14" height="12" rx="0.8" fill="#f3f4f6"/>
        <rect x="17" y="5" width="14" height="6" rx="0.8" fill="#2563eb"/>
        <rect x="18" y="6" width="5" height="1" rx="0.5" fill="#23366A"/>
        <rect x="25" y="6" width="4" height="1" rx="0.5" fill="#3b82f6"/>
        <rect x="18" y="12" width="11" height="0.8" rx="0.3" fill="#23366A"/>
        <rect x="18" y="13.2" width="8" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="18" y="14.5" width="11" height="1.2" rx="0.6" fill="none" stroke="#23366A" stroke-width="0.4"/>
        
        <rect x="1" y="19" width="14" height="12" rx="0.8" fill="#f3f4f6"/>
        <rect x="1" y="19" width="14" height="6" rx="0.8" fill="#1e40af"/>
        <rect x="2" y="20" width="5" height="1" rx="0.5" fill="#23366A"/>
        <rect x="9" y="20" width="4" height="1" rx="0.5" fill="#10b981"/>
        <rect x="2" y="26" width="11" height="0.8" rx="0.3" fill="#23366A"/>
        <rect x="2" y="27.2" width="8" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="2" y="28.5" width="11" height="1.2" rx="0.6" fill="none" stroke="#23366A" stroke-width="0.4"/>
        
        <rect x="17" y="19" width="14" height="12" rx="0.8" fill="#f3f4f6"/>
        <rect x="17" y="19" width="14" height="6" rx="0.8" fill="#23366A"/>
        <rect x="18" y="20" width="5" height="1" rx="0.5" fill="#23366A"/>
        <rect x="25" y="20" width="4" height="1" rx="0.5" fill="#ef4444"/>
        <rect x="18" y="26" width="11" height="0.8" rx="0.3" fill="#23366A"/>
        <rect x="18" y="27.2" width="8" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="18" y="28.5" width="11" height="1.2" rx="0.6" fill="none" stroke="#23366A" stroke-width="0.4"/>
        </svg>`;

    // Add custom component type for promotion viewer
    editor.DomComponents.addType("promotion-viewer", {
        isComponent: (el) => {
            if (
                el.getAttribute &&
                el.getAttribute("data-promotion-component") === "true"
            ) {
                return { type: "promotion-viewer" };
            }
            return false;
        },
        model: {
            defaults: {
                name: "Visor de Promociones",
                tagName: "section",
                droppable: false,
                editable: false,
                selectable: true,
                hoverable: true,
                attributes: {
                    class: "py-8 md:py-12 bg-white",
                    "data-promotion-component": "true",
                },
                script: function () {
                    (function () {
                        if (!window.Swal) {
                            var script = document.createElement("script");
                            script.src =
                                "https://cdn.jsdelivr.net/npm/sweetalert2@11";
                            document.head.appendChild(script);
                        }

                        var initializePromotionComponent = function () {
                            var container = document.querySelector(
                                '[data-promotion-component="true"]',
                            );
                            if (!container) {
                                setTimeout(initializePromotionComponent, 500);
                                return;
                            }

                            var viewMoreButtons = container.querySelectorAll(
                                ".promotion-view-more",
                            );
                            viewMoreButtons.forEach(function (btn) {
                                btn.addEventListener("click", function (e) {
                                    e.preventDefault();
                                    var title =
                                        btn.getAttribute(
                                            "data-promotion-title",
                                        ) || "Promoción";
                                    var image =
                                        btn.getAttribute(
                                            "data-promotion-image",
                                        ) || "";
                                    var desc =
                                        btn.getAttribute(
                                            "data-promotion-description",
                                        ) || "";
                                    var cat =
                                        btn.getAttribute(
                                            "data-promotion-category",
                                        ) || "";
                                    var days =
                                        btn.getAttribute(
                                            "data-promotion-days",
                                        ) || "";
                                    var activeDays =
                                        btn.getAttribute(
                                            "data-promotion-active-days",
                                        ) || "";

                                    var loadSweetAlert = function () {
                                        if (window.Swal) {
                                            var daysHTML = "";
                                            if (days && days !== "") {
                                                daysHTML =
                                                    '<p class="text-red-600 font-semibold mb-4"><i class="ri-time-line mr-1"></i> Quedan ' +
                                                    days +
                                                    " días para aprovechar esta promoción</p>";
                                            } else if (
                                                activeDays &&
                                                activeDays !== ""
                                            ) {
                                                daysHTML =
                                                    '<p class="text-blue-600 font-semibold mb-4"><i class="ri-calendar-line mr-1"></i> Disponible: ' +
                                                    activeDays +
                                                    "</p>";
                                            }

                                            window.Swal.fire({
                                                html:
                                                    '<div class="text-left"><div class="mb-4 mt-4"><img src="' +
                                                    image +
                                                    '" alt="' +
                                                    title +
                                                    '" class="w-full h-64 object-cover rounded-lg"></div><span class="inline-block bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full mb-3">' +
                                                    cat +
                                                    '</span><h2 class="text-2xl font-bold text-primary mb-4">' +
                                                    title +
                                                    "</h2>" +
                                                    daysHTML +
                                                    '<div class="text-gray-700 whitespace-pre-line">' +
                                                    desc +
                                                    "</div></div>",
                                                width: "800px",
                                                showCloseButton: true,
                                                showConfirmButton: false,
                                                customClass: {
                                                    popup: "promotion-modal",
                                                    closeButton:
                                                        "promotion-modal-close-button",
                                                },
                                            });
                                        }
                                    };

                                    if (!window.Swal) {
                                        var script =
                                            document.createElement("script");
                                        script.src =
                                            "https://cdn.jsdelivr.net/npm/sweetalert2@11";
                                        script.onload = loadSweetAlert;
                                        document.head.appendChild(script);
                                    } else {
                                        loadSweetAlert();
                                    }
                                });
                            });

                            var categoryFilter = container.querySelector(
                                "#promotion-category-filter",
                            );
                            var dayFilter = container.querySelector(
                                "#promotion-day-filter",
                            );
                            if (categoryFilter && dayFilter) {
                                function applyFilters() {
                                    var selectedCategory = categoryFilter.value;
                                    var selectedDay = dayFilter.value;
                                    var cards =
                                        container.querySelectorAll(
                                            ".promotion-card",
                                        );
                                    var noResults = container.querySelector(
                                        ".no-results-message",
                                    );
                                    var visible = 0;

                                    cards.forEach(function (card) {
                                        var category =
                                            card.getAttribute("data-category");
                                        var days =
                                            card.getAttribute("data-days") ||
                                            "";

                                        var hasRemainingDays =
                                            days.includes("días restantes");

                                        var matchCat =
                                            selectedCategory === "" ||
                                            category === selectedCategory;

                                        var matchDay = false;

                                        if (selectedDay === "") {
                                            matchDay = true;
                                        } else if (hasRemainingDays) {
                                            matchDay = true;
                                        } else if (
                                            days.toLowerCase() ===
                                            "todos los días"
                                        ) {
                                            matchDay = true;
                                        } else {
                                            var dayShortMap = {
                                                Lunes: "Lun",
                                                Martes: "Mar",
                                                Miércoles: "Mié",
                                                Jueves: "Jue",
                                                Viernes: "Vie",
                                                Sábado: "Sáb",
                                                Domingo: "Dom",
                                            };

                                            var dayShort =
                                                dayShortMap[selectedDay];

                                            if (dayShort) {
                                                var regex = new RegExp(
                                                    dayShort + "(?:,|$)",
                                                    "i",
                                                );
                                                matchDay = regex.test(days);
                                            }
                                        }

                                        if (matchCat && matchDay) {
                                            card.style.display = "flex";
                                            visible++;
                                        } else {
                                            card.style.display = "none";
                                        }
                                    });

                                    if (noResults) {
                                        noResults.style.display =
                                            visible === 0 ? "block" : "none";
                                    }
                                }

                                categoryFilter.addEventListener(
                                    "change",
                                    applyFilters,
                                );
                                dayFilter.addEventListener(
                                    "change",
                                    applyFilters,
                                );
                            }
                        };

                        setTimeout(initializePromotionComponent, 500);
                    })();
                },
            },
            init() {
                const model = this;

                const hasContent = () => {
                    const content = model.get("content") || "";
                    return (
                        content.includes("promotion-card") ||
                        content.includes("Promociones vigentes")
                    );
                };

                if (hasContent()) {
                    console.log("Promotions already loaded, skipping fetch");
                    return;
                }

                this.on("component:mount", this.loadPromotions);

                let attempts = 0;
                const maxAttempts = 3;

                const tryLoadPromotions = () => {
                    if (hasContent()) {
                        console.log("Content detected, stopping load attempts");
                        return;
                    }

                    attempts++;
                    console.log(`Attempt ${attempts} to load promotions`);
                    model.loadPromotions();

                    setTimeout(() => {
                        const el = model.view?.el;
                        if (
                            el &&
                            el.querySelector(".promotion-card") === null &&
                            attempts < maxAttempts &&
                            !hasContent()
                        ) {
                            console.log("Promotions not loaded, retrying...");
                            tryLoadPromotions();
                        }
                    }, 1000);
                };

                setTimeout(() => tryLoadPromotions(), 100);
            },
            // Load active promotions from API
            loadPromotions() {
                fetch("/api/promotions/active")
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `Error ${response.status}: ${response.statusText}`,
                            );
                        }
                        return response.json();
                    })
                    .then((promotions) => {
                        this.updatePromotionsHTML(promotions);
                    })
                    .catch((error) => {
                        this.set(
                            "content",
                            '<div class="text-center p-8"><p class="text-gray-500">Error al cargar las promociones</p></div>',
                        );
                    });
            },
            // Update component HTML with promotions data
            updatePromotionsHTML(promotions) {
                if (!promotions || promotions.length === 0) {
                    this.set(
                        "content",
                        '<div class="text-center p-8"><p class="text-gray-500">No hay promociones disponibles en este momento</p></div>',
                    );
                    return;
                }

                // Get categories for filter
                const categories = [
                    ...new Set(promotions.map((promo) => promo.category)),
                ];

                // Get day options for filter
                const dayMapping = {
                    monday: { full: "Lunes", short: "Lun" },
                    tuesday: { full: "Martes", short: "Mar" },
                    wednesday: { full: "Miércoles", short: "Mié" },
                    thursday: { full: "Jueves", short: "Jue" },
                    friday: { full: "Viernes", short: "Vie" },
                    saturday: { full: "Sábado", short: "Sáb" },
                    sunday: { full: "Domingo", short: "Dom" },
                };

                const allDays = Object.entries(dayMapping).map(
                    ([key, values]) => {
                        return { key, full: values.full, short: values.short };
                    },
                );

                let gridHTML = "";
                promotions.forEach((promo) => {
                    // Prepare days information
                    let daysText = "";
                    let daysDisplay = "";

                    if (
                        promo.remaining_days !== null &&
                        promo.remaining_days !== undefined
                    ) {
                        daysText = `${promo.remaining_days} días restantes`;
                        daysDisplay = `<span class="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center"><i class="ri-time-line mr-1"></i>${promo.remaining_days}d</span>`;
                    } else if (
                        promo.active_days &&
                        promo.active_days.length > 0
                    ) {
                        const shortDays = promo.active_days
                            .map((day) =>
                                dayMapping[day] ? dayMapping[day].short : day,
                            )
                            .join(", ");
                        daysText = shortDays;
                        daysDisplay = `<span class="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center"><i class="ri-calendar-line mr-1"></i>${shortDays}</span>`;
                    } else {
                        daysText = "Todos los días";
                        daysDisplay = `<span class="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center"><i class="ri-calendar-line mr-1"></i>Todos</span>`;
                    }

                    gridHTML += `
                    <div class="promotion-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
                        data-category="${promo.category}"
                        data-days="${daysText}">
                        <div class="relative h-48">
                            <img src="${promo.image_url}" alt="${promo.title}" class="w-full h-full object-cover">
                            <span class="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">${promo.category}</span>
                            ${daysDisplay}
                        </div>
                        <div class="p-5 flex-grow flex flex-col h-full">
                            <h3 class="text-lg font-bold text-primary mb-2">${promo.title}</h3>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${promo.short_description}</p>
                            <div class="mt-auto">
                                <button 
                                    class="promotion-view-more bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm w-full flex items-center justify-center"
                                    data-promotion-id="${promo.id}"
                                    data-promotion-title="${promo.title.replace(/"/g, "&quot;")}"
                                    data-promotion-image="${promo.image_url}"
                                    data-promotion-description="${promo.long_description.replace(/"/g, "&quot;")}"
                                    data-promotion-category="${promo.category}"
                                    data-promotion-days="${promo.remaining_days || ""}"
                                    data-promotion-active-days="${daysText}"
                                >
                                    Ver más
                                    <i class="ri-arrow-right-line ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    `;
                });

                // Create filters HTML with improved styling
                let categoryFilterHTML = `
                <div class="relative inline-block w-full">
                    <select id="promotion-category-filter" class="appearance-none w-full bg-white border-2 border-primary text-primary rounded-full px-4 py-2 pr-8 focus:outline-none cursor-pointer">
                        <option value="">Todas las categorías</option>
                        ${categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("")}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                        <i class="ri-arrow-down-s-line"></i>
                    </div>
                </div>
                `;

                let dayFilterHTML = `
                <div class="relative inline-block w-full">
                    <select id="promotion-day-filter" class="appearance-none w-full bg-white border-2 border-primary text-primary rounded-full px-4 py-2 pr-8 focus:outline-none cursor-pointer">
                        <option value="">Todos los días</option>
                        ${allDays.map((day) => `<option value="${day.full}">${day.full}</option>`).join("")}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                        <i class="ri-arrow-down-s-line"></i>
                    </div>
                </div>
                `;

                const innerHTML = `
                    <div class="max-w-7xl mx-auto px-4">
                        <h2 class="text-3xl font-bold text-primary mb-8">Promociones vigentes</h2>

                        <!-- Filters -->
                        <div class="mb-8 flex flex-wrap gap-4">
                            <div class="flex-1 min-w-[200px]">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por categoría</label>
                                <div class="relative">
                                    ${categoryFilterHTML}
                                </div>
                            </div>
                            <div class="flex-1 min-w-[200px]">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por día disponible</label>
                                <div class="relative">
                                    ${dayFilterHTML}
                                </div>
                            </div>
                        </div>

                        <!-- Grid -->
                        <div class="mb-8">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                ${gridHTML}
                            </div>
                            <div class="no-results-message hidden mt-8 text-center py-8">
                                <p class="text-gray-500">No hay promociones que coincidan con los filtros seleccionados</p>
                            </div>
                        </div>
                    </div>
                `;

                this.set("content", innerHTML);

                setTimeout(() => {
                    if (this.view && this.view.render) {
                        this.view.render();
                    }
                }, 100);
            },
        },
        view: {
            events: {
                dblclick: "reloadPromotions",
            },
            // Reload promotions on double click
            reloadPromotions() {
                this.model.loadPromotions();
            },
        },
    });

    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            let styleEl =
                frame.contentDocument.getElementById("promotion-styles");
            if (!styleEl) {
                styleEl = frame.contentDocument.createElement("style");
                styleEl.id = "promotion-styles";
                styleEl.innerHTML = `
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .promotion-modal-close-button {
                    position: absolute !important;
                    top: 10px !important;
                    right: 10px !important;
                    z-index: 10 !important;
                    font-size: 1.5rem !important;
                    background-color: white !important;
                    color: #23366A !important;
                    border-radius: 50% !important;
                    border: 1px solid #23366A !important;
                    width: 32px !important;
                    height: 32px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                    padding: 0 !important;
                    line-height: 1 !important;
                }
                .promotion-modal-close-button:hover {
                    background-color: #23366A !important;
                    color: white !important;
                }
                .promotion-modal {
                    padding-top: 30px !important;
                    border-radius: 16px !important;
                    overflow: hidden !important;
                }
                .swal2-popup.promotion-modal {
                    border-radius: 16px !important;
                }
                .swal2-close.promotion-modal-close-button i,
                .swal2-close.promotion-modal-close-button svg {
                    position: absolute !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    margin: 0 !important;
                }
            `;
                frame.contentDocument.head.appendChild(styleEl);
            }
        }
    });

    editor.on("canvas:render", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            let styleEl =
                frame.contentDocument.getElementById("promotion-styles");
            if (!styleEl) {
                styleEl = frame.contentDocument.createElement("style");
                styleEl.id = "promotion-styles";
                styleEl.innerHTML = `
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .promotion-modal-close-button {
                    position: absolute !important;
                    top: 10px !important;
                    right: 10px !important;
                    z-index: 10 !important;
                    font-size: 1.5rem !important;
                    background-color: white !important;
                    color: #23366A !important;
                    border-radius: 50% !important;
                    border: 1px solid #23366A !important;
                    width: 32px !important;
                    height: 32px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                    padding: 0 !important;
                    line-height: 1 !important;
                }
                .promotion-modal-close-button:hover {
                    background-color: #23366A !important;
                    color: white !important;
                }
                .promotion-modal {
                    padding-top: 30px !important;
                    border-radius: 16px !important;
                    overflow: hidden !important;
                }
                .swal2-popup.promotion-modal {
                    border-radius: 16px !important;
                }
                .swal2-close.promotion-modal-close-button i,
                .swal2-close.promotion-modal-close-button svg {
                    position: absolute !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    margin: 0 !important;
                }
            `;
                frame.contentDocument.head.appendChild(styleEl);
            }
        }
    });

    // Add block to block manager
    blockManager.add("promotion-viewer", {
        label: "Visor de Promociones",
        category: "Promociones",
        attributes: { class: "gjs-block-section" },
        media: promotionSvg,
        content: {
            type: "promotion-viewer",
        },
    });
}
