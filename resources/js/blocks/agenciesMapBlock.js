/**
 * Agencies Map Module for GrapesJS - Allows displaying and configuring multiple locations on a map
 */
export default function loadAgenciesMapBlock(editor) {
    const blockManager = editor.BlockManager;
    const defaultLat = 13.6929;
    const defaultLng = -89.2182;
    const defaultZoom = 14;

    // Default configuration
    const defaultConfig = {
        mapTitle: "Nuestras Agencias",
        agencies: [
            {
                id: 1,
                name: "Agencia Central",
                address: "San Salvador, El Salvador",
                phone: "+503 2209-6800",
                lat: 13.6929,
                lng: -89.2182,
            },
        ],
    };

    // Helper functions
    const createMapHTML = (config) => {
        const agenciesHtml = config.agencies
            .map(
                (agency) => `
            <div class="agency-item mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 class="text-lg font-medium text-primary">${agency.name}</h3>
                ${agency.address ? `<p class="text-gray-600 flex items-center gap-2 mt-1"><i class="ri-map-pin-line text-primary"></i> ${agency.address}</p>` : ""}
                ${agency.phone ? `<p class="text-gray-600 flex items-center gap-2 mt-1"><i class="ri-phone-line text-primary"></i> <a href="tel:${agency.phone.replace(/\s+/g, "")}" class="hover:text-primary transition-colors">${agency.phone}</a></p>` : ""}
            </div>
        `,
            )
            .join("");

        const markersData = config.agencies.map((agency) => {
            return {
                lat: agency.lat,
                lng: agency.lng,
                title: agency.name,
                info: `
                    <h4 style="font-weight: bold; margin-bottom: 5px;">${agency.name}</h4>
                    ${agency.address ? `<p style="margin: 0 0 3px 0;"><i class="ri-map-pin-line"></i> ${agency.address}</p>` : ""}
                    ${agency.phone ? `<p style="margin: 0;"><i class="ri-phone-line"></i> <a href="tel:${agency.phone.replace(/\s+/g, "")}" style="color: #23366A; text-decoration: none;">${agency.phone}</a></p>` : ""}
                `,
            };
        });

        return `
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-left mb-8">
                <h2 class="text-4xl font-bold text-primary">${config.mapTitle || "Nuestras Agencias"}</h2>
            </div>
            <div class="flex flex-col lg:flex-row gap-6">
                <div class="lg:w-1/3 order-2 lg:order-1">
                    <div class="agencies-list" style="max-height: 500px; overflow-y: auto; padding-right: 8px; scrollbar-width: thin;">
                        ${agenciesHtml}
                    </div>
                </div>
                <div class="lg:w-2/3 order-1 lg:order-2">
                    <div class="agencies-map-container" style="height: 500px; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        <div class="agencies-map" data-markers='${JSON.stringify(markersData)}' style="width:100%; height:100%; border-radius: 0.75rem;"></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    editor.DomComponents.addType("agencies-map-component", {
        isComponent: function (el) {
            if (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === "agencies-map-component"
            ) {
                return { type: "agencies-map-component" };
            }
            return false;
        },
        model: {
            defaults: {
                name: "Mapa de Agencias",
                tagName: "section",
                draggable: true,
                droppable: false,
                editable: false,
                stylable: true,
                resizable: false,

                attributes: {
                    class: "py-10 bg-white",
                    "data-gjs-type": "agencies-map-component",
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

                    return createMapHTML(config);
                },

                script: function () {
                    const initMap = () => {
                        const section = this;
                        const configAttr =
                            section.getAttribute("data-map-config");
                        const mapContainer =
                            section.querySelector(".agencies-map");

                        if (!mapContainer) return;

                        let config = {
                            mapTitle: "Nuestras Agencias",
                            agencies: [
                                {
                                    id: 1,
                                    name: "Agencia Central",
                                    address: "San Salvador, El Salvador",
                                    phone: "+503 2209-6800",
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
                                        config.agencies &&
                                        config.agencies.length > 0
                                    ) {
                                        markers = config.agencies.map(
                                            (agency) => ({
                                                lat: agency.lat,
                                                lng: agency.lng,
                                                title: agency.name,
                                                info: `
                                                <h4 style="font-weight: bold; margin-bottom: 5px;">${agency.name}</h4>
                                                ${agency.address ? `<p style="margin: 0 0 3px 0;"><i class="ri-map-pin-line"></i> ${agency.address}</p>` : ''}
                                                ${agency.phone ? `<p style="margin: 0;"><i class="ri-phone-line"></i> <a href="tel:${agency.phone.replace(/\s+/g, '')}" style="color: #23366A; text-decoration: none;">${agency.phone}</a></p>` : ''}
                                            `,
                                            }),
                                        );
                                    }
                                } catch (e) {
                                    console.error("Error parsing markers:", e);
                                }

                                // Default center to first agency or fallback coordinates
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

                                // Handle agency list item clicks
                                const agencyItems =
                                    section.querySelectorAll(".agency-item");
                                if (agencyItems && agencyItems.length > 0) {
                                    agencyItems.forEach((item, index) => {
                                        if (index < markers.length) {
                                            item.addEventListener(
                                                "click",
                                                () => {
                                                    const marker =
                                                        markers[index];
                                                    map.setView(
                                                        [
                                                            marker.lat,
                                                            marker.lng,
                                                        ],
                                                        15,
                                                    );

                                                    // Open popup
                                                    map.eachLayer((layer) => {
                                                        if (
                                                            layer._latlng &&
                                                            layer._latlng
                                                                .lat ===
                                                                marker.lat &&
                                                            layer._latlng
                                                                .lng ===
                                                                marker.lng
                                                        ) {
                                                            layer.openPopup();
                                                        }
                                                    });
                                                },
                                            );

                                            // Add hover style
                                            item.style.cursor = "pointer";
                                        }
                                    });
                                }

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
                this.set("type", "agencies-map-component");
                this.addAttributes({
                    "data-gjs-type": "agencies-map-component",
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
                    "data-gjs-type": "agencies-map-component",
                    "data-map-config": JSON.stringify(merged),
                };
                this.setAttributes(attrs);
                this.components(createMapHTML(merged));
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
        const agencies = [...currentConfig.agencies] || [];

        const renderAgenciesList = () => {
            return agencies
                .map(
                    (agency, index) => `
                <div class="agency-item" data-agency-id="${agency.id}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e5e7eb'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #111827;">Agencia ${index + 1}</h4>
                        <button class="delete-agency-btn" data-agency-id="${agency.id}" style="background: #ef4444; color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                            Eliminar
                        </button>
                    </div>

                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Nombre de la Agencia *</label>
                        <input type="text" class="agency-name" data-agency-id="${agency.id}" value="${agency.name || ""}" placeholder="Nombre de la agencia" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                    </div>

                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Dirección (opcional)</label>
                        <input type="text" class="agency-address" data-agency-id="${agency.id}" value="${agency.address || ""}" placeholder="Dirección de la agencia" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                    </div>

                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Teléfono (opcional)</label>
                        <input type="text" class="agency-phone" data-agency-id="${agency.id}" value="${agency.phone || ""}" placeholder="Número de teléfono" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                    </div>

                    <div style="display: flex; gap: 10px; margin-bottom: 14px;">
                        <div style="flex: 1;">
                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Latitud *</label>
                            <input type="number" step="0.0001" class="agency-lat" data-agency-id="${agency.id}" value="${agency.lat || ""}" placeholder="Ej: 13.6929" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Longitud *</label>
                            <input type="number" step="0.0001" class="agency-lng" data-agency-id="${agency.id}" value="${agency.lng || ""}" placeholder="Ej: -89.2182" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
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

        const modalHtml = `
            <div class="agencies-map-config-modal" style="font-family: system-ui, -apple-system, sans-serif; background: white; padding: 10px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 24px;">
                    <h2 style="margin: 0; font-size: 22px; font-weight: 600; color: #111827;">Configurar Mapa de Agencias</h2>
                    <div>
                        <button id="export-btn" style="padding: 6px 16px; border: none; background: #4f46e5; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-right: auto;" onmouseover="this.style.background='#4338ca'" onmouseout="this.style.background='#4f46e5'">
                            <span style="display: flex; align-items: center; justify-content: center;"><svg style="width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>Exportar</span>
                        </button>
                        <button id="import-btn" style="padding: 6px 16px; border: none; background: #0891b2; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#0e7490'" onmouseout="this.style.background='#0891b2'">
                            <span style="display: flex; align-items: center; justify-content: center;"><svg style="width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Importar</span>
                        </button>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Título del Mapa</label>
                    <input type="text" id="map-title-input" value="${currentConfig.mapTitle || "Nuestras Agencias"}" placeholder="Título para la sección de mapa" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                </div>
                
                <div class="modal-body" style="max-height: 60vh; overflow-y: auto; padding-right: 8px;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin-top: 0; margin-bottom: 16px;">Agencias</h3>
                    
                    <div id="agencies-list">
                        ${renderAgenciesList()}
                    </div>

                    <button id="add-agency-btn" style="width: 100%; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
                        Agregar Nueva Agencia
                    </button>
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
        modal.open({ attributes: { class: "agencies-map-modal" } });

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

        // Get the next agency ID
        let nextId = 1;
        if (agencies.length > 0) {
            nextId = Math.max(...agencies.map((a) => a.id)) + 1;
        }

        const updateAgenciesList = () => {
            document.getElementById("agencies-list").innerHTML =
                renderAgenciesList();
            attachAgencyEvents();
        };

        const attachAgencyEvents = () => {
            // Delete agency buttons
            document.querySelectorAll(".delete-agency-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const agencyId = parseInt(e.target.dataset.agencyId);
                    if (agencies.length > 1) {
                        const index = agencies.findIndex(
                            (a) => a.id === agencyId,
                        );
                        if (index !== -1) {
                            agencies.splice(index, 1);
                            updateAgenciesList();
                        }
                    } else {
                        alert("Debe haber al menos una agencia");
                    }
                });
            });

            // Input fields
            const updateAgencyField = (e, field) => {
                const agencyId = parseInt(e.target.dataset.agencyId);
                const agency = agencies.find((a) => a.id === agencyId);
                if (agency) {
                    agency[field] = e.target.value;
                }
            };

            document.querySelectorAll(".agency-name").forEach((input) => {
                input.addEventListener("input", (e) =>
                    updateAgencyField(e, "name"),
                );
            });

            document.querySelectorAll(".agency-address").forEach((input) => {
                input.addEventListener("input", (e) =>
                    updateAgencyField(e, "address"),
                );
            });

            document.querySelectorAll(".agency-phone").forEach((input) => {
                input.addEventListener("input", (e) =>
                    updateAgencyField(e, "phone"),
                );
            });

            document.querySelectorAll(".agency-lat").forEach((input) => {
                input.addEventListener("input", (e) =>
                    updateAgencyField(e, "lat"),
                );
            });

            document.querySelectorAll(".agency-lng").forEach((input) => {
                input.addEventListener("input", (e) =>
                    updateAgencyField(e, "lng"),
                );
            });
        };

        setTimeout(() => {
            attachAgencyEvents();

            // Add agency button
            document
                .getElementById("add-agency-btn")
                ?.addEventListener("click", () => {
                    agencies.push({
                        id: nextId++,
                        name: `Nueva Agencia ${agencies.length + 1}`,
                        address: "",
                        phone: "",
                        lat: defaultLat,
                        lng: defaultLng,
                    });
                    updateAgenciesList();
                });

            // Export button
            document
                .getElementById("export-btn")
                ?.addEventListener("click", () => {
                    const config = {
                        mapTitle:
                            document
                                .getElementById("map-title-input")
                                .value.trim() || "Nuestras Agencias",
                        agencies: agencies,
                    };

                    // Create downloadable file
                    const dataStr = JSON.stringify(config, null, 2);
                    const dataUri =
                        "data:application/json;charset=utf-8," +
                        encodeURIComponent(dataStr);

                    const exportFileName = "mapa-agencias-config.json";

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
                                if (
                                    jsonConfig &&
                                    jsonConfig.agencies &&
                                    Array.isArray(jsonConfig.agencies)
                                ) {
                                    // Update title
                                    if (jsonConfig.mapTitle) {
                                        document.getElementById(
                                            "map-title-input",
                                        ).value = jsonConfig.mapTitle;
                                    }

                                    // Update agencies
                                    if (jsonConfig.agencies.length > 0) {
                                        agencies.length = 0; // Clear current agencies
                                        jsonConfig.agencies.forEach(
                                            (agency) => {
                                                agencies.push({
                                                    id: agency.id || nextId++,
                                                    name: agency.name || "",
                                                    address:
                                                        agency.address || "",
                                                    phone: agency.phone || "",
                                                    lat:
                                                        agency.lat ||
                                                        defaultLat,
                                                    lng:
                                                        agency.lng ||
                                                        defaultLng,
                                                });
                                            },
                                        );

                                        updateAgenciesList();
                                        alert(
                                            "Configuración importada con éxito",
                                        );
                                    } else {
                                        alert(
                                            "El archivo no contiene ninguna agencia",
                                        );
                                    }
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
                    const hasEmptyNames = agencies.some(
                        (a) => !a.name || a.name.trim() === "",
                    );
                    const hasInvalidCoords = agencies.some(
                        (a) => !a.lat || !a.lng || isNaN(a.lat) || isNaN(a.lng),
                    );

                    if (hasEmptyNames) {
                        alert("Todas las agencias deben tener un nombre");
                        return;
                    }

                    if (hasInvalidCoords) {
                        alert(
                            "Todas las agencias deben tener coordenadas válidas",
                        );
                        return;
                    }

                    const mapTitle = document
                        .getElementById("map-title-input")
                        .value.trim();

                    const newConfig = {
                        mapTitle: mapTitle || "Nuestras Agencias",
                        agencies: agencies,
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
    const mapBlockSvg = `<svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
        <rect x="2" y="2" width="9" height="28" fill="#e9ecef" rx="1"/>
        <rect x="13" y="2" width="17" height="28" fill="#a8dadc" rx="1"/>
        <rect x="14" y="3" width="15" height="26" fill="#ebf4fa" rx="1"/>
        <circle cx="21.5" cy="15" r="4" fill="#f8e7d8" stroke="#e34234" stroke-width="0.7"/>
        <circle cx="21.5" cy="15" r="1" fill="#e34234"/>
        <line x1="3" y1="7" x2="10" y2="7" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="11" x2="10" y2="11" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="15" x2="10" y2="15" stroke="#23366A" stroke-width="0.8"/>
    </svg>`;

    // Add block to the block manager
    blockManager.add("agencies-map-block", {
        label: "Mapa de Agencias",
        category: "Mapas",
        content: {
            type: "agencies-map-component",
            attributes: {
                class: "py-10 bg-white",
                "data-gjs-type": "agencies-map-component",
                "data-map-config": JSON.stringify(defaultConfig),
            },
        },
        media: mapBlockSvg,
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

            if (!head.querySelector("#agencies-map-css")) {
                const customCSS = document.createElement("style");
                customCSS.id = "agencies-map-css";
                customCSS.innerHTML = `
                    .leaflet-container {
                        height: 100%;
                        width: 100%;
                        border-radius: inherit;
                    }
                    .agency-item {
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    .agency-item:hover {
                        background-color: #f9fafb;
                    }
                `;
                head.appendChild(customCSS);
            }
        }
    });

    // Handle component selection
    editor.on("component:selected", (component) => {
        if (component.get("type") === "agencies-map-component") {
            const el = component.getEl();
            if (el) {
                const mapContainer = el.querySelector(".agencies-map");
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
                '[data-gjs-type="agencies-map-component"]',
            );

            mapComponents.forEach((comp) => {
                comp.set("type", "agencies-map-component");
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
            el.getAttribute("data-gjs-type") === "agencies-map-component"
        ) {
            component.set("type", "agencies-map-component");

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
        if (component.get("type") === "agencies-map-component") {
            const el = component.getEl();
            if (el) {
                // Clear any existing map instance
                const mapContainer = el.querySelector(".agencies-map");
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
                '[data-gjs-type="agencies-map-component"]',
            );

            mapComponents.forEach((comp) => {
                comp.set("type", "agencies-map-component");
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
            '[data-gjs-type="agencies-map-component"]',
        );

        mapComponents.forEach((comp) => {
            comp.set("type", "agencies-map-component");
            comp.addAttributes({ "data-gjs-type": "agencies-map-component" });

            // Ensure config is properly saved
            const config = comp.getConfig();
            comp.addAttributes({
                "data-map-config": JSON.stringify(config),
            });
        });
    });
}
