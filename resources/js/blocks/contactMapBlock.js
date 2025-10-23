/**
 * Contact Map Module for GrapesJS - Displays contact information cards alongside a configurable map
 */
export default function loadContactMapBlock(editor) {
    const blockManager = editor.BlockManager;
    const defaultLat = 13.6929;
    const defaultLng = -89.2182;
    const defaultZoom = 14;

    // Default configuration
    const defaultConfig = {
        mapTitle: "Contáctanos",
        contactCards: [
            {
                id: 1,
                title: "Whatsapp Institucional",
                iconClass: "ri-whatsapp-fill",
                items: [
                    {
                        text: "7988-8080",
                        link: "tel:79888080",
                        type: "phone",
                    },
                ],
            },
            {
                id: 2,
                title: "Tarjeta de Crédito",
                iconClass: "ri-bank-card-fill",
                items: [
                    {
                        text: "2209-6857",
                        link: "tel:22096857",
                        type: "phone",
                    },
                    {
                        text: "2209-6828",
                        link: "tel:22096828",
                        type: "phone",
                    },
                    {
                        text: "2209-6837 (Horarios no hábiles)",
                        link: "tel:22096837",
                        type: "phone",
                    },
                ],
            },
        ],
        locations: [
            {
                id: 1,
                name: "Oficina Central",
                address: "San Salvador, El Salvador",
                lat: 13.6929,
                lng: -89.2182,
            },
        ],
    };

    // Helper functions
    const createContactMapHTML = (config) => {
        // Generate contact cards HTML
        const contactCardsHtml = config.contactCards
            .map((card) => {
                const itemsHtml = card.items
                    .map((item) => {
                        let itemHtml = "";

                        if (item.type === "phone") {
                            itemHtml = `<a href="${item.link}" class="text-gray-600 hover:text-primary block mt-1">${item.text}</a>`;
                        } else if (item.type === "email") {
                            itemHtml = `<a href="${item.link}" class="text-gray-600 hover:text-primary block mt-1">${item.text}</a>`;
                        } else if (item.type === "address") {
                            itemHtml = `<p class="text-gray-600 mt-1">${item.text}</p>`;
                        } else if (item.type === "hours") {
                            itemHtml = `<p class="text-gray-600 mt-1">${item.text}</p>`;
                        } else {
                            itemHtml = `<p class="text-gray-600 mt-1">${item.text}</p>`;
                        }

                        return itemHtml;
                    })
                    .join("");

                return `
            <div class="contact-card mb-6 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0 h-14 w-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                        <i class="${card.iconClass} text-primary text-2xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-medium text-primary">${card.title}</h3>
                        <div class="mt-1">
                            ${itemsHtml}
                        </div>
                    </div>
                </div>
            </div>
            `;
            })
            .join("");

        // Prepare markers data for the map
        const markersData = config.locations.map((location) => {
            return {
                lat: location.lat,
                lng: location.lng,
                title: location.name,
                info: `
                    <h4 style="font-weight: bold; margin-bottom: 5px;">${location.name}</h4>
                    ${location.address ? `<p style="margin: 0;">${location.address}</p>` : ""}
                `,
            };
        });

        return `
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-left mb-8">
                <h2 class="text-4xl font-bold text-primary">${config.mapTitle || "Contáctanos"}</h2>
            </div>
            <div class="flex flex-col lg:flex-row gap-6">
                <div class="lg:w-1/3 order-2 lg:order-1">
                    <div class="contact-cards" style="max-height: 500px; overflow-y: auto; padding-right: 8px; scrollbar-width: thin;">
                        ${contactCardsHtml}
                    </div>
                </div>
                <div class="lg:w-2/3 order-1 lg:order-2">
                    <div class="contact-map-container" style="height: 500px; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        <div class="contact-map" data-markers='${JSON.stringify(markersData)}' style="width:100%; height:100%; border-radius: 0.75rem;"></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    editor.DomComponents.addType("contact-map-component", {
        isComponent: function (el) {
            if (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === "contact-map-component"
            ) {
                return { type: "contact-map-component" };
            }
            return false;
        },
        model: {
            defaults: {
                name: "Mapa de Contacto",
                tagName: "section",
                draggable: true,
                droppable: false,
                editable: false,
                stylable: true,
                resizable: false,

                attributes: {
                    class: "py-10 bg-white",
                    "data-gjs-type": "contact-map-component",
                    "data-map-config": JSON.stringify(defaultConfig),
                },

                traits: [
                    {
                        type: "button",
                        label: false,
                        text: "Configurar Mapa",
                        full: true,
                        command: (editor) => {
                            const component = editor.getSelected();
                            if (component) {
                                openConfigModal(editor, component);
                            }
                        },
                    },
                ],

                components: (model) => {
                    const configAttr = model.getAttributes()["data-map-config"];
                    let config = { ...defaultConfig };

                    if (configAttr) {
                        try {
                            config = {
                                ...defaultConfig,
                                ...JSON.parse(configAttr),
                            };
                        } catch (e) {
                            console.error("Error parsing map config:", e);
                        }
                    }

                    return createContactMapHTML(config);
                },

                script: function () {
                    const initMap = () => {
                        const section = this;
                        const configAttr =
                            section.getAttribute("data-map-config");
                        const mapContainer =
                            section.querySelector(".contact-map");

                        if (!mapContainer) return;

                        let config = {
                            mapTitle: "Contáctanos",
                            contactCards: [
                                {
                                    id: 1,
                                    title: "Whatsapp Institucional",
                                    iconClass: "ri-whatsapp-fill",
                                    items: [
                                        {
                                            text: "7988-8080",
                                            link: "tel:79888080",
                                            type: "phone",
                                        },
                                    ],
                                },
                            ],
                            locations: [
                                {
                                    id: 1,
                                    name: "Oficina Central",
                                    address: "San Salvador, El Salvador",
                                    lat: 13.6929,
                                    lng: -89.2182,
                                },
                            ],
                        };

                        if (configAttr) {
                            try {
                                config = JSON.parse(configAttr);
                            } catch (e) {
                                console.error("Error parsing map config:", e);
                            }
                        }

                        if (!document.getElementById("leaflet-css")) {
                            const link = document.createElement("link");
                            link.id = "leaflet-css";
                            link.rel = "stylesheet";
                            link.href =
                                "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                            document.head.appendChild(link);
                        }

                        if (typeof window.L === "undefined") {
                            const script = document.createElement("script");
                            script.src =
                                "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                            script.onload = function () {
                                renderMap();
                            };
                            document.head.appendChild(script);
                        } else {
                            renderMap();
                        }

                        function renderMap() {
                            try {
                                // Clean up any existing map
                                if (mapContainer._leaflet_id) {
                                    mapContainer._map.remove();
                                }

                                // Get markers data
                                let markers = [];
                                try {
                                    if (
                                        mapContainer.getAttribute(
                                            "data-markers",
                                        )
                                    ) {
                                        markers = JSON.parse(
                                            mapContainer.getAttribute(
                                                "data-markers",
                                            ),
                                        );
                                    } else if (
                                        config.locations &&
                                        config.locations.length > 0
                                    ) {
                                        markers = config.locations.map(
                                            (location) => ({
                                                lat: location.lat,
                                                lng: location.lng,
                                                title: location.name,
                                                info: `
                                                <h4 style="font-weight: bold; margin-bottom: 5px;">${location.name}</h4>
                                                ${location.address ? `<p style="margin: 0;">${location.address}</p>` : ""}
                                            `,
                                            }),
                                        );
                                    }
                                } catch (e) {
                                    console.error("Error parsing markers:", e);
                                }

                                // Default center to first location or fallback coordinates
                                let centerLat =
                                    markers.length > 0
                                        ? markers[0].lat
                                        : 13.6929;
                                let centerLng =
                                    markers.length > 0
                                        ? markers[0].lng
                                        : -89.2182;

                                // Create map
                                const map = window.L.map(mapContainer).setView(
                                    [centerLat, centerLng],
                                    12,
                                );

                                // Add OpenStreetMap tiles
                                window.L.tileLayer(
                                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                                    {
                                        attribution:
                                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                    },
                                ).addTo(map);

                                // Add markers
                                if (markers.length > 0) {
                                    const bounds = [];

                                    markers.forEach((marker) => {
                                        if (marker.lat && marker.lng) {
                                            bounds.push([
                                                marker.lat,
                                                marker.lng,
                                            ]);
                                            const mapMarker = window.L.marker([
                                                marker.lat,
                                                marker.lng,
                                            ]).addTo(map);

                                            if (marker.info) {
                                                mapMarker.bindPopup(
                                                    marker.info,
                                                );
                                            } else if (marker.title) {
                                                mapMarker.bindPopup(
                                                    marker.title,
                                                );
                                            }
                                        }
                                    });

                                    // Fit map to contain all markers if more than one
                                    if (bounds.length > 1) {
                                        map.fitBounds(bounds, {
                                            padding: [30, 30],
                                        });
                                    }
                                }

                                // Adjust z-index to prevent controls from appearing over navbar
                                setTimeout(() => {
                                    const leafletControls =
                                        document.querySelectorAll(
                                            ".leaflet-control-container, .leaflet-top, .leaflet-bottom, .leaflet-control",
                                        );
                                    leafletControls.forEach((control) => {
                                        control.style.zIndex = "999";
                                    });
                                }, 100);

                                // Ensure proper map rendering
                                setTimeout(() => {
                                    map.invalidateSize();
                                }, 300);

                                mapContainer._map = map;
                            } catch (e) {
                                console.error("Error rendering map:", e);
                            }
                        }
                    };

                    if (document.readyState === "loading") {
                        document.addEventListener("DOMContentLoaded", initMap);
                    } else {
                        initMap();
                    }
                },
            },

            init() {
                // Ensure type persistence
                this.set("type", "contact-map-component");
                this.addAttributes({
                    "data-gjs-type": "contact-map-component",
                });
            },

            getConfig() {
                const configAttr = this.getAttributes()["data-map-config"];
                if (configAttr) {
                    try {
                        return { ...defaultConfig, ...JSON.parse(configAttr) };
                    } catch (e) {
                        console.error("Error parsing map config:", e);
                    }
                }
                return { ...defaultConfig };
            },

            setConfig(newConfig) {
                const merged = { ...this.getConfig(), ...newConfig };
                const attrs = {
                    ...this.getAttributes(),
                    "data-gjs-type": "contact-map-component",
                    "data-map-config": JSON.stringify(merged),
                };
                this.setAttributes(attrs);
                this.components(createContactMapHTML(merged));
                this.view.render();
            },

            exportConfig() {
                return JSON.stringify(this.getConfig(), null, 2);
            },

            importConfig(jsonString) {
                try {
                    const config = JSON.parse(jsonString);
                    this.setConfig(config);
                    return true;
                } catch (e) {
                    console.error("Error importing configuration:", e);
                    return false;
                }
            },
        },
    });

    // Configuration modal
    function openConfigModal(editor, component) {
        const currentConfig = component.getConfig();
        const contactCards = [...currentConfig.contactCards] || [];
        const locations = [...currentConfig.locations] || [];

        let activeTab = "contactCards";

        // Render functions for tabs
        const renderContactCardsList = () => {
            if (contactCards.length === 0) {
                return `<div style="text-align: center; padding: 20px; color: #6b7280;">No hay tarjetas de contacto. Haz clic en "Agregar Tarjeta" para crear una.</div>`;
            }

            return contactCards
                .map((card, index) => {
                    const itemsList = card.items
                        .map((item, itemIndex) => {
                            return `
                                <div class="contact-item-row" style="display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start;">
                                    <div style="flex: 1;">
                                        <input type="text" class="card-item-text" data-card-id="${card.id}" data-item-index="${itemIndex}" value="${item.text}" placeholder="Texto" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                    </div>
                                    <div style="flex: 1;">
                                        <input type="text" class="card-item-link" data-card-id="${card.id}" data-item-index="${itemIndex}" value="${item.link || ""}" placeholder="Enlace (opcional)" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                    </div>
                                    <div>
                                        <select class="card-item-type" data-card-id="${card.id}" data-item-index="${itemIndex}" style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                            <option value="phone" ${item.type === "phone" ? "selected" : ""}>Teléfono</option>
                                            <option value="email" ${item.type === "email" ? "selected" : ""}>Email</option>
                                            <option value="address" ${item.type === "address" ? "selected" : ""}>Dirección</option>
                                            <option value="hours" ${item.type === "hours" ? "selected" : ""}>Horario</option>
                                            <option value="text" ${item.type === "text" || !item.type ? "selected" : ""}>Texto</option>
                                        </select>
                                    </div>
                                    <button class="delete-card-item-btn" data-card-id="${card.id}" data-item-index="${itemIndex}" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                                        ✕
                                    </button>
                                </div>
                                `;
                        })
                        .join("");

                    return `
                        <div class="contact-card-item" data-card-id="${card.id}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #111827;">Tarjeta ${index + 1}</h4>
                                <button class="delete-card-btn" data-card-id="${card.id}" style="background: #ef4444; color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                                    Eliminar
                                </button>
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Título *</label>
                                <input type="text" class="card-title" data-card-id="${card.id}" value="${card.title || ""}" placeholder="Título de la tarjeta" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Icono *</label>
                                <select class="card-icon" data-card-id="${card.id}" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                    <option value="ri-whatsapp-fill" ${card.iconClass === "ri-whatsapp-fill" ? "selected" : ""}>WhatsApp</option>
                                    <option value="ri-phone-fill" ${card.iconClass === "ri-phone-fill" ? "selected" : ""}>Teléfono</option>
                                    <option value="ri-mail-fill" ${card.iconClass === "ri-mail-fill" ? "selected" : ""}>Email</option>
                                    <option value="ri-map-pin-fill" ${card.iconClass === "ri-map-pin-fill" ? "selected" : ""}>Ubicación</option>
                                    <option value="ri-time-fill" ${card.iconClass === "ri-time-fill" ? "selected" : ""}>Horario</option>
                                    <option value="ri-bank-card-fill" ${card.iconClass === "ri-bank-card-fill" ? "selected" : ""}>Tarjeta</option>
                                    <option value="ri-building-fill" ${card.iconClass === "ri-building-fill" ? "selected" : ""}>Edificio</option>
                                    <option value="ri-customer-service-fill" ${card.iconClass === "ri-customer-service-fill" ? "selected" : ""}>Atención al cliente</option>
                                </select>
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Elementos</label>
                                <div class="card-items-container">
                                    ${itemsList}
                                </div>
                                <button class="add-card-item-btn" data-card-id="${card.id}" style="width: 100%; background: #4f46e5; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s; margin-top: 10px;" onmouseover="this.style.background='#4338ca'" onmouseout="this.style.background='#4f46e5'">
                                    + Agregar Elemento
                                </button>
                            </div>
                        </div>
                        `;
                })
                .join("");
        };

        const renderLocationsList = () => {
            if (locations.length === 0) {
                return `<div style="text-align: center; padding: 20px; color: #6b7280;">No hay ubicaciones. Haz clic en "Agregar Ubicación" para crear una.</div>`;
            }

            return locations
                .map(
                    (location, index) => `
                        <div class="location-item" data-location-id="${location.id}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #111827;">Ubicación ${index + 1}</h4>
                                <button class="delete-location-btn" data-location-id="${location.id}" style="background: #ef4444; color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                                    Eliminar
                                </button>
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Nombre de la Ubicación *</label>
                                <input type="text" class="location-name" data-location-id="${location.id}" value="${location.name || ""}" placeholder="Nombre de la ubicación" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Dirección (opcional)</label>
                                <input type="text" class="location-address" data-location-id="${location.id}" value="${location.address || ""}" placeholder="Dirección de la ubicación" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <div style="display: flex; gap: 10px; margin-bottom: 14px;">
                                <div style="flex: 1;">
                                    <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Latitud *</label>
                                    <input type="number" step="0.0001" class="location-lat" data-location-id="${location.id}" value="${location.lat || ""}" placeholder="Ej: 13.6929" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                </div>
                                <div style="flex: 1;">
                                    <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Longitud *</label>
                                    <input type="number" step="0.0001" class="location-lng" data-location-id="${location.id}" value="${location.lng || ""}" placeholder="Ej: -89.2182" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                </div>
                            </div>

                            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; font-size: 13px;">
                                <p style="margin: 0; color: #6b7280;">Puedes obtener las coordenadas buscando la ubicación en <a href="https://www.google.com/maps" target="_blank" style="color: #3b82f6; text-decoration: none;">Google Maps</a>, luego haz clic derecho y selecciona "¿Qué hay aquí?". Las coordenadas aparecerán en la parte inferior.</p>
                            </div>
                        </div>
                    `,
                )
                .join("");
        };

        const getActiveTabContent = () => {
            if (activeTab === "contactCards") {
                return `
                <div id="contact-cards-tab" class="tab-content">
                    <div id="contact-cards-list" style="margin-bottom: 16px;">
                        ${renderContactCardsList()}
                    </div>
                    <button id="add-card-btn" style="width: 100%; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
                        Agregar Nueva Tarjeta
                    </button>
                </div>
                `;
            } else {
                return `
                <div id="locations-tab" class="tab-content">
                    <div id="locations-list" style="margin-bottom: 16px;">
                        ${renderLocationsList()}
                    </div>
                    <button id="add-location-btn" style="width: 100%; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
                        Agregar Nueva Ubicación
                    </button>
                </div>
                `;
            }
        };

        const modalHtml = `
            <div class="contact-map-config-modal" style="font-family: system-ui, -apple-system, sans-serif; background: white; padding: 10px; border-radius: 8px; max-height: 90vh; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 24px;">
                    <h2 style="margin: 0; font-size: 22px; font-weight: 600; color: #111827;">Configurar Mapa de Contacto</h2>
                    <div>
                        <button id="export-btn" style="padding: 6px 16px; border: none; background: #4f46e5; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-right: 8px;" onmouseover="this.style.background='#4338ca'" onmouseout="this.style.background='#4f46e5'">
                            <span style="display: flex; align-items: center; justify-content: center;"><svg style="width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>Exportar</span>
                        </button>
                        <button id="import-btn" style="padding: 6px 16px; border: none; background: #0891b2; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#0e7490'" onmouseout="this.style.background='#0891b2'">
                            <span style="display: flex; align-items: center; justify-content: center;"><svg style="width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Importar</span>
                        </button>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Título del Mapa</label>
                    <input type="text" id="map-title-input" value="${currentConfig.mapTitle || "Contáctanos"}" placeholder="Título para la sección de mapa" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                </div>
                
                <div class="tabs-container" style="margin-bottom: 20px;">
                    <div class="tabs-header" style="display: flex; border-bottom: 1px solid #e5e7eb; margin-bottom: 16px;">
                        <button id="contact-cards-tab-btn" class="tab-btn ${activeTab === "contactCards" ? "active" : ""}" style="flex: 1; padding: 12px; background: ${activeTab === "contactCards" ? "#f9fafb" : "transparent"}; border: none; border-bottom: ${activeTab === "contactCards" ? "2px solid #23366A" : "2px solid transparent"}; color: ${activeTab === "contactCards" ? "#23366A" : "#6b7280"}; font-weight: ${activeTab === "contactCards" ? "600" : "500"}; cursor: pointer; transition: all 0.2s;">
                            Tarjetas de Contacto
                        </button>
                        <button id="locations-tab-btn" class="tab-btn ${activeTab === "locations" ? "active" : ""}" style="flex: 1; padding: 12px; background: ${activeTab === "locations" ? "#f9fafb" : "transparent"}; border: none; border-bottom: ${activeTab === "locations" ? "2px solid #23366A" : "2px solid transparent"}; color: ${activeTab === "locations" ? "#23366A" : "#6b7280"}; font-weight: ${activeTab === "locations" ? "600" : "500"}; cursor: pointer; transition: all 0.2s;">
                            Ubicaciones en Mapa
                        </button>
                    </div>
                </div>
                
                <div class="modal-body" style="max-height: calc(90vh - 240px); overflow-y: auto; padding-right: 8px; flex: 1;">
                    <div id="tab-content">
                        ${getActiveTabContent()}
                    </div>
                </div>

                <div class="modal-footer" style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb; display: flex; gap: 12px; justify-content: flex-end;">
                    <button id="cancel-btn" style="padding: 10px 24px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
                        Cancelar
                    </button>
                    <button id="save-btn" style="padding: 10px 28px; border: none; background: #23366A; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#1a2752'" onmouseout="this.style.background='#23366A'">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        `;

        const modal = editor.Modal;
        modal.setTitle("");
        modal.setContent(modalHtml);
        modal.open({ attributes: { class: "contact-map-modal" } });

        // Override modal styles
        setTimeout(() => {
            const modalContainer = document.querySelector(".gjs-mdl-dialog");
            if (modalContainer) {
                modalContainer.style.backgroundColor = "white";
            }

            const modalHeader = document.querySelector(".gjs-mdl-header");
            if (modalHeader) {
                modalHeader.style.padding = "0";
                modalHeader.style.border = "none";
                modalHeader.style.display = "none";
            }

            // Hide default close button
            const closeBtn = document.querySelector(".gjs-mdl-close");
            if (closeBtn) {
                closeBtn.style.display = "none";
            }
        }, 10);

        // Get the next ID for cards and locations
        let nextCardId = 1;
        if (contactCards.length > 0) {
            nextCardId = Math.max(...contactCards.map((card) => card.id)) + 1;
        }

        let nextLocationId = 1;
        if (locations.length > 0) {
            nextLocationId = Math.max(...locations.map((loc) => loc.id)) + 1;
        }

        // Update functions for tabs and content
        const updateTabContent = () => {
            document.getElementById("tab-content").innerHTML =
                getActiveTabContent();

            if (activeTab === "contactCards") {
                attachContactCardEvents();
            } else {
                attachLocationEvents();
            }
        };

        const switchTab = (tab) => {
            activeTab = tab;

            // Update tab buttons
            document.querySelectorAll(".tab-btn").forEach((btn) => {
                if (btn.id === `${tab}-tab-btn`) {
                    btn.style.background = "#f9fafb";
                    btn.style.borderBottom = "2px solid #23366A";
                    btn.style.color = "#23366A";
                    btn.style.fontWeight = "600";
                } else {
                    btn.style.background = "transparent";
                    btn.style.borderBottom = "2px solid transparent";
                    btn.style.color = "#6b7280";
                    btn.style.fontWeight = "500";
                }
            });

            updateTabContent();
        };

        // Event handlers for contact cards
        const attachContactCardEvents = () => {
            // Delete card buttons
            document.querySelectorAll(".delete-card-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const cardId = parseInt(e.target.dataset.cardId);
                    if (contactCards.length > 1) {
                        const index = contactCards.findIndex(
                            (card) => card.id === cardId,
                        );
                        if (index !== -1) {
                            contactCards.splice(index, 1);
                            updateTabContent();
                        }
                    } else {
                        alert("Debe haber al menos una tarjeta de contacto");
                    }
                });
            });

            // Add card item buttons
            document.querySelectorAll(".add-card-item-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const cardId = parseInt(e.target.dataset.cardId);
                    const card = contactCards.find((c) => c.id === cardId);

                    if (card) {
                        card.items.push({
                            text: "Nuevo elemento",
                            link: "",
                            type: "text",
                        });
                        updateTabContent();
                    }
                });
            });

            // Delete card item buttons
            document
                .querySelectorAll(".delete-card-item-btn")
                .forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        const cardId = parseInt(e.target.dataset.cardId);
                        const itemIndex = parseInt(e.target.dataset.itemIndex);

                        const card = contactCards.find((c) => c.id === cardId);

                        if (card && card.items.length > 1) {
                            card.items.splice(itemIndex, 1);
                            updateTabContent();
                        } else {
                            alert(
                                "Cada tarjeta debe tener al menos un elemento",
                            );
                        }
                    });
                });

            // Input fields for cards
            document.querySelectorAll(".card-title").forEach((input) => {
                input.addEventListener("input", (e) => {
                    const cardId = parseInt(e.target.dataset.cardId);
                    const card = contactCards.find((c) => c.id === cardId);

                    if (card) {
                        card.title = e.target.value;
                    }
                });
            });

            document.querySelectorAll(".card-icon").forEach((select) => {
                select.addEventListener("change", (e) => {
                    const cardId = parseInt(e.target.dataset.cardId);
                    const card = contactCards.find((c) => c.id === cardId);

                    if (card) {
                        card.iconClass = e.target.value;
                    }
                });
            });

            // Input fields for card items
            document.querySelectorAll(".card-item-text").forEach((input) => {
                input.addEventListener("input", (e) => {
                    const cardId = parseInt(e.target.dataset.cardId);
                    const itemIndex = parseInt(e.target.dataset.itemIndex);

                    const card = contactCards.find((c) => c.id === cardId);

                    if (card && card.items[itemIndex]) {
                        card.items[itemIndex].text = e.target.value;
                    }
                });
            });

            document.querySelectorAll(".card-item-link").forEach((input) => {
                input.addEventListener("input", (e) => {
                    const cardId = parseInt(e.target.dataset.cardId);
                    const itemIndex = parseInt(e.target.dataset.itemIndex);

                    const card = contactCards.find((c) => c.id === cardId);

                    if (card && card.items[itemIndex]) {
                        card.items[itemIndex].link = e.target.value;
                    }
                });
            });

            document.querySelectorAll(".card-item-type").forEach((select) => {
                select.addEventListener("change", (e) => {
                    const cardId = parseInt(e.target.dataset.cardId);
                    const itemIndex = parseInt(e.target.dataset.itemIndex);

                    const card = contactCards.find((c) => c.id === cardId);

                    if (card && card.items[itemIndex]) {
                        card.items[itemIndex].type = e.target.value;

                        // Update link field based on type
                        if (e.target.value === "phone") {
                            const text = card.items[itemIndex].text || "";
                            // Only numbers for phone
                            card.items[itemIndex].link =
                                `tel:${text.replace(/\D/g, "")}`;
                        } else if (e.target.value === "email") {
                            card.items[itemIndex].link =
                                `mailto:${card.items[itemIndex].text || ""}`;
                        }

                        updateTabContent();
                    }
                });
            });

            // Add new card button
            document
                .getElementById("add-card-btn")
                ?.addEventListener("click", () => {
                    contactCards.push({
                        id: nextCardId++,
                        title: `Nueva Tarjeta ${contactCards.length + 1}`,
                        iconClass: "ri-phone-fill",
                        items: [
                            {
                                text: "Elemento 1",
                                link: "",
                                type: "text",
                            },
                        ],
                    });
                    updateTabContent();
                });
        };

        // Event handlers for locations
        const attachLocationEvents = () => {
            // Delete location buttons
            document.querySelectorAll(".delete-location-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const locationId = parseInt(e.target.dataset.locationId);
                    if (locations.length > 1) {
                        const index = locations.findIndex(
                            (loc) => loc.id === locationId,
                        );
                        if (index !== -1) {
                            locations.splice(index, 1);
                            updateTabContent();
                        }
                    } else {
                        alert("Debe haber al menos una ubicación");
                    }
                });
            });

            // Input fields for locations
            const updateLocationField = (e, field) => {
                const locationId = parseInt(e.target.dataset.locationId);
                const location = locations.find((loc) => loc.id === locationId);
                if (location) {
                    location[field] = e.target.value;
                }
            };

            document.querySelectorAll(".location-name").forEach((input) => {
                input.addEventListener("input", (e) =>
                    updateLocationField(e, "name"),
                );
            });

            document.querySelectorAll(".location-address").forEach((input) => {
                input.addEventListener("input", (e) =>
                    updateLocationField(e, "address"),
                );
            });

            document.querySelectorAll(".location-lat").forEach((input) => {
                input.addEventListener("input", (e) =>
                    updateLocationField(e, "lat"),
                );
            });

            document.querySelectorAll(".location-lng").forEach((input) => {
                input.addEventListener("input", (e) =>
                    updateLocationField(e, "lng"),
                );
            });

            // Add new location button
            document
                .getElementById("add-location-btn")
                ?.addEventListener("click", () => {
                    locations.push({
                        id: nextLocationId++,
                        name: `Nueva Ubicación ${locations.length + 1}`,
                        address: "",
                        lat: defaultLat,
                        lng: defaultLng,
                    });
                    updateTabContent();
                });
        };

        setTimeout(() => {
            // Attach tab switching events
            document
                .getElementById("contact-cards-tab-btn")
                ?.addEventListener("click", () => {
                    switchTab("contactCards");
                });

            document
                .getElementById("locations-tab-btn")
                ?.addEventListener("click", () => {
                    switchTab("locations");
                });

            // Initial tab events
            if (activeTab === "contactCards") {
                attachContactCardEvents();
            } else {
                attachLocationEvents();
            }

            // Export button
            document
                .getElementById("export-btn")
                ?.addEventListener("click", () => {
                    const config = {
                        mapTitle:
                            document
                                .getElementById("map-title-input")
                                .value.trim() || "Contáctanos",
                        contactCards: contactCards,
                        locations: locations,
                    };

                    // Create downloadable file
                    const dataStr = JSON.stringify(config, null, 2);
                    const dataUri =
                        "data:application/json;charset=utf-8," +
                        encodeURIComponent(dataStr);

                    const exportFileName = "mapa-contacto-config.json";

                    // Create download link and click it
                    const linkElement = document.createElement("a");
                    linkElement.setAttribute("href", dataUri);
                    linkElement.setAttribute("download", exportFileName);
                    linkElement.style.display = "none";
                    document.body.appendChild(linkElement);
                    linkElement.click();
                    document.body.removeChild(linkElement);
                });

            // Import button
            document
                .getElementById("import-btn")
                ?.addEventListener("click", () => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "application/json";

                    input.onchange = (e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();

                        reader.onload = (event) => {
                            try {
                                const jsonConfig = JSON.parse(
                                    event.target.result,
                                );

                                // Validate basic structure
                                if (jsonConfig) {
                                    // Update title
                                    if (jsonConfig.mapTitle) {
                                        document.getElementById(
                                            "map-title-input",
                                        ).value = jsonConfig.mapTitle;
                                    }

                                    // Update contact cards
                                    if (
                                        jsonConfig.contactCards &&
                                        Array.isArray(
                                            jsonConfig.contactCards,
                                        ) &&
                                        jsonConfig.contactCards.length > 0
                                    ) {
                                        contactCards.length = 0; // Clear current cards
                                        jsonConfig.contactCards.forEach(
                                            (card) => {
                                                contactCards.push({
                                                    id: card.id || nextCardId++,
                                                    title: card.title || "",
                                                    iconClass:
                                                        card.iconClass ||
                                                        "ri-phone-fill",
                                                    items: Array.isArray(
                                                        card.items,
                                                    )
                                                        ? card.items.map(
                                                              (item) => ({
                                                                  text:
                                                                      item.text ||
                                                                      "",
                                                                  link:
                                                                      item.link ||
                                                                      "",
                                                                  type:
                                                                      item.type ||
                                                                      "text",
                                                              }),
                                                          )
                                                        : [
                                                              {
                                                                  text: "Elemento",
                                                                  link: "",
                                                                  type: "text",
                                                              },
                                                          ],
                                                });
                                            },
                                        );
                                    }

                                    // Update locations
                                    if (
                                        jsonConfig.locations &&
                                        Array.isArray(jsonConfig.locations) &&
                                        jsonConfig.locations.length > 0
                                    ) {
                                        locations.length = 0; // Clear current locations
                                        jsonConfig.locations.forEach(
                                            (location) => {
                                                locations.push({
                                                    id:
                                                        location.id ||
                                                        nextLocationId++,
                                                    name: location.name || "",
                                                    address:
                                                        location.address || "",
                                                    lat:
                                                        location.lat ||
                                                        defaultLat,
                                                    lng:
                                                        location.lng ||
                                                        defaultLng,
                                                });
                                            },
                                        );
                                    }

                                    updateTabContent();
                                    alert("Configuración importada con éxito");
                                } else {
                                    alert("Formato de archivo no válido");
                                }
                            } catch (e) {
                                alert(
                                    "Error al procesar el archivo: " +
                                        e.message,
                                );
                            }
                        };

                        reader.readAsText(file);
                    };

                    input.click();
                });

            // Save button
            document
                .getElementById("save-btn")
                ?.addEventListener("click", () => {
                    // Validate required fields
                    const hasEmptyCardTitles = contactCards.some(
                        (card) => !card.title || card.title.trim() === "",
                    );
                    const hasEmptyCardItems = contactCards.some((card) =>
                        card.items.some(
                            (item) => !item.text || item.text.trim() === "",
                        ),
                    );
                    const hasEmptyLocationNames = locations.some(
                        (location) =>
                            !location.name || location.name.trim() === "",
                    );
                    const hasInvalidCoords = locations.some(
                        (location) =>
                            !location.lat ||
                            !location.lng ||
                            isNaN(location.lat) ||
                            isNaN(location.lng),
                    );

                    if (hasEmptyCardTitles) {
                        alert("Todas las tarjetas deben tener un título");
                        switchTab("contactCards");
                        return;
                    }

                    if (hasEmptyCardItems) {
                        alert(
                            "Todos los elementos de las tarjetas deben tener texto",
                        );
                        switchTab("contactCards");
                        return;
                    }

                    if (hasEmptyLocationNames) {
                        alert("Todas las ubicaciones deben tener un nombre");
                        switchTab("locations");
                        return;
                    }

                    if (hasInvalidCoords) {
                        alert(
                            "Todas las ubicaciones deben tener coordenadas válidas",
                        );
                        switchTab("locations");
                        return;
                    }

                    const mapTitle = document
                        .getElementById("map-title-input")
                        .value.trim();

                    const newConfig = {
                        mapTitle: mapTitle || "Contáctanos",
                        contactCards: contactCards,
                        locations: locations,
                    };

                    component.setConfig(newConfig);
                    modal.close();
                });

            // Cancel button
            document
                .getElementById("cancel-btn")
                ?.addEventListener("click", () => {
                    modal.close();
                });
        }, 100);
    }

    // SVG icon for the block
    const contactMapSvg = `<svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
        <rect x="2" y="2" width="9" height="28" fill="#e9ecef" rx="1"/>
        <rect x="13" y="2" width="17" height="28" fill="#a8dadc" rx="1"/>
        <circle cx="22" cy="15" r="5" fill="#f8e7d8" stroke="#e34234" stroke-width="0.7"/>
        <circle cx="22" cy="15" r="1" fill="#e34234"/>
        <line x1="3" y1="7" x2="10" y2="7" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="11" x2="10" y2="11" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="15" x2="10" y2="15" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="19" x2="10" y2="19" stroke="#23366A" stroke-width="0.8"/>
    </svg>`;

    // Add block to the block manager
    blockManager.add("contact-map-block", {
        label: "Mapa de Contacto",
        category: "Mapas",
        content: {
            type: "contact-map-component",
            attributes: {
                class: "py-10 bg-white",
                "data-gjs-type": "contact-map-component",
                "data-map-config": JSON.stringify(defaultConfig),
            },
        },
        media: contactMapSvg,
    });

    // Handle editor events
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (iframe) {
            const head = iframe.contentDocument.head;
            if (!head.querySelector("#leaflet-css")) {
                const leafletCSS = document.createElement("link");
                leafletCSS.id = "leaflet-css";
                leafletCSS.rel = "stylesheet";
                leafletCSS.href =
                    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                head.appendChild(leafletCSS);
            }

            if (!head.querySelector("#contact-map-css")) {
                const customCSS = document.createElement("style");
                customCSS.id = "contact-map-css";
                customCSS.innerHTML = `
                .leaflet-container {
                    height: 100%;
                    width: 100%;
                    border-radius: inherit;
                }
                .contact-card {
                    transition: background-color 0.2s;
                }
                .contact-card:hover {
                    background-color: #f9fafb;
                }
                .leaflet-control-zoom, 
                .leaflet-control-attribution,
                .leaflet-control-container .leaflet-control,
                .leaflet-popup-pane,
                .leaflet-tooltip-pane,
                .leaflet-top, 
                .leaflet-bottom {
                    z-index: 999 !important;
                }
            `;
                head.appendChild(customCSS);
            }
        }
    });

    // Handle component selection
    editor.on("component:selected", (component) => {
        if (component.get("type") === "contact-map-component") {
            const el = component.getEl();
            if (el) {
                const mapContainer = el.querySelector(".contact-map");
                if (mapContainer && mapContainer._map) {
                    setTimeout(() => {
                        mapContainer._map.invalidateSize();
                    }, 100);
                }
            }
        }
    });

    // Initialize maps after loading stored content
    editor.on("storage:end:load", () => {
        setTimeout(() => {
            const wrapper = editor.getWrapper();
            const mapComponents = wrapper.find(
                '[data-gjs-type="contact-map-component"]',
            );

            mapComponents.forEach((comp) => {
                comp.set("type", "contact-map-component");
                const el = comp.getEl();

                if (el) {
                    const script = comp.get("script");
                    if (script && typeof script === "function") {
                        script.call(el);
                    }
                }
            });
        }, 1000);
    });

    // Handle component mounting
    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (
            el &&
            el.getAttribute &&
            el.getAttribute("data-gjs-type") === "contact-map-component"
        ) {
            component.set("type", "contact-map-component");

            setTimeout(() => {
                const script = component.get("script");
                if (script && typeof script === "function") {
                    script.call(el);
                }
            }, 500);
        }
    });

    // Reinitialize map when component is cloned
    editor.on("component:clone", (component) => {
        if (component.get("type") === "contact-map-component") {
            const el = component.getEl();
            if (el) {
                // Clear any existing map instance
                const mapContainer = el.querySelector(".contact-map");
                if (mapContainer && mapContainer._map) {
                    mapContainer._map.remove();
                    delete mapContainer._map;
                }

                setTimeout(() => {
                    const script = component.get("script");
                    if (script && typeof script === "function") {
                        script.call(el);
                    }
                }, 500);
            }
        }
    });

    // Handle render event to reinitialize maps
    editor.on("canvas:render", () => {
        setTimeout(() => {
            const wrapper = editor.getWrapper();
            const mapComponents = wrapper.find(
                '[data-gjs-type="contact-map-component"]',
            );

            mapComponents.forEach((comp) => {
                comp.set("type", "contact-map-component");
                const el = comp.getEl();

                if (el && el.isConnected) {
                    const script = comp.get("script");
                    if (script && typeof script === "function") {
                        script.call(el);
                    }
                }
            });
        }, 800);
    });

    // Make sure components save properly
    editor.on("storage:start:store", () => {
        const wrapper = editor.getWrapper();
        const mapComponents = wrapper.find(
            '[data-gjs-type="contact-map-component"]',
        );

        mapComponents.forEach((comp) => {
            comp.set("type", "contact-map-component");
            comp.addAttributes({ "data-gjs-type": "contact-map-component" });

            // Ensure config is properly saved
            const config = comp.getConfig();
            comp.addAttributes({
                "data-map-config": JSON.stringify(config),
            });
        });
    });
}
