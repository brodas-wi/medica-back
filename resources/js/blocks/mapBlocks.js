/**
 * Map blocks module for GrapesJS
 */
export default function loadMapBlocks(editor) {
    const blockManager = editor.BlockManager;
    const defaultLat = 13.6929;
    const defaultLng = -89.2182;
    const defaultZoom = 14;

    editor.DomComponents.addType("map-component", {
        isComponent: function (el) {
            if (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === "map-component"
            ) {
                return { type: "map-component" };
            }
            return false;
        },
        model: {
            defaults: {
                name: "Mapa",
                tagName: "div",
                droppable: false,
                removable: true,
                copyable: true,
                resizable: false,
                highlightable: true,
                hoverable: true,
                layerable: true,
                selectable: true,
                type: "map-component",
                script: function () {
                    if (!this.id) {
                        this.id = "map-" + Math.floor(Math.random() * 100000);
                    }

                    const lat = this.getAttribute("data-lat") || 13.6929;
                    const lng = this.getAttribute("data-lng") || -89.2182;
                    const zoom = this.getAttribute("data-zoom") || 14;
                    const title =
                        this.getAttribute("data-marker-title") || "Ubicación";
                    const self = this;

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
                            initializeMap();
                        };
                        document.head.appendChild(script);
                    } else {
                        initializeMap();
                    }

                    function initializeMap() {
                        if (self._map) {
                            self._map.remove();
                            delete self._map;
                            delete self._leaflet_id;
                        }

                        try {
                            self.style.height = self.style.height || "450px";
                            self.style.width = self.style.width || "100%";

                            if (!document.getElementById(self.id)) {
                                setTimeout(initializeMap, 300);
                                return;
                            }

                            const rect = self.getBoundingClientRect();
                            if (rect.width === 0 || rect.height === 0) {
                                setTimeout(initializeMap, 300);
                                return;
                            }

                            setTimeout(() => {
                                try {
                                    if (!document.getElementById(self.id)) {
                                        return;
                                    }

                                    // Clean up any existing map instances
                                    if (
                                        window.L &&
                                        window.L.DomUtil &&
                                        self._leaflet_id
                                    ) {
                                        window.L.DomUtil.removeClass(
                                            self,
                                            "leaflet-container",
                                        );
                                        window.L.DomUtil.removeClass(
                                            self,
                                            "leaflet-touch",
                                        );
                                        window.L.DomUtil.removeClass(
                                            self,
                                            "leaflet-fade-anim",
                                        );
                                        delete self._leaflet_id;
                                    }

                                    const map = window.L.map(self.id).setView(
                                        [parseFloat(lat), parseFloat(lng)],
                                        parseInt(zoom),
                                    );

                                    window.L.tileLayer(
                                        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                                        {
                                            attribution:
                                                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                        },
                                    ).addTo(map);

                                    window.L.marker([
                                        parseFloat(lat),
                                        parseFloat(lng),
                                    ])
                                        .addTo(map)
                                        .bindPopup(title)
                                        .openPopup();

                                    self._map = map;

                                    setTimeout(() => {
                                        if (map) map.invalidateSize();
                                    }, 300);
                                } catch (e) {
                                    console.error("Map creation error:", e);
                                }
                            }, 200);
                        } catch (e) {
                            console.error("Map initialization error:", e);
                        }
                    }
                },
                attributes: {
                    "data-gjs-type": "map-component",
                    "data-lat": defaultLat,
                    "data-lng": defaultLng,
                    "data-zoom": defaultZoom,
                    "data-marker-title": "Nuestra ubicación",
                    style: "width:100%; height:450px; border-radius:0.5rem; overflow:hidden;",
                },
                traits: [
                    {
                        type: "number",
                        name: "data-lat",
                        label: "Latitud",
                        placeholder: "13.6929",
                        min: -90,
                        max: 90,
                        step: 0.0001,
                    },
                    {
                        type: "number",
                        name: "data-lng",
                        label: "Longitud",
                        placeholder: "-89.2182",
                        min: -180,
                        max: 180,
                        step: 0.0001,
                    },
                    {
                        type: "number",
                        name: "data-zoom",
                        label: "Nivel de Zoom",
                        min: 1,
                        max: 18,
                        placeholder: "14",
                    },
                    {
                        type: "text",
                        name: "data-marker-title",
                        label: "Título Marcador",
                        placeholder: "Nuestra ubicación",
                    },
                ],
            },
            init() {
                this.on("change:attributes", this.updateScript);
                this.on("change:attributes:id", (component, value) => {
                    if (!value) {
                        component.addAttributes({
                            id: "map-" + Math.floor(Math.random() * 100000),
                        });
                    }
                });
            },
            updateScript() {
                const script = this.get("script");
                if (script) {
                    const el = this.getEl();
                    if (el) {
                        script.call(el);
                    }
                }
            },
        },
    });

    blockManager.add("map-block", {
        label: "Mapa",
        category: "Elementos",
        content: {
            type: "map-component",
            attributes: {
                "data-gjs-type": "map-component",
            },
            style: { width: "100%", height: "400px" },
        },
        media: `<svg viewBox="0 0 24 24" width="24" height="24">
            <rect width="24" height="24" fill="#a8dadc" rx="2"/>
            <line x1="2" y1="8" x2="22" y2="8" stroke="#81c3c6" stroke-width="0.5"/>
            <line x1="2" y1="16" x2="22" y2="16" stroke="#81c3c6" stroke-width="0.5"/>
            <line x1="8" y1="2" x2="8" y2="22" stroke="#81c3c6" stroke-width="0.5"/>
            <line x1="16" y1="2" x2="16" y2="22" stroke="#81c3c6" stroke-width="0.5"/>
            <circle cx="12" cy="12" r="2" fill="#e74c3c" stroke="white" stroke-width="0.5"/>
        </svg>`,
    });

    blockManager.add("contact-map-block", {
        label: "Contacto con Mapa",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="24" height="24">
            <rect width="24" height="24" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="4" width="8" height="16" fill="#e9ecef" rx="1"/>
            <rect x="12" y="4" width="10" height="16" fill="#a8dadc" rx="1"/>
            <circle cx="12" cy="12" r="1.5" fill="#e74c3c"/>
            <line x1="3" y1="8" x2="9" y2="8" stroke="#23366A" stroke-width="0.5"/>
            <line x1="3" y1="12" x2="9" y2="12" stroke="#23366A" stroke-width="0.5"/>
            <line x1="3" y1="16" x2="9" y2="16" stroke="#23366A" stroke-width="0.5"/>
        </svg>`,
        content: `
        <section class="py-10 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-1/3">
                        <h2 class="text-3xl font-bold text-primary mb-6">Contáctanos</h2>
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                                    <i class="ri-map-pin-fill text-primary text-xl"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Dirección</h3>
                                    <p class="mt-1 text-gray-600">San Salvador, El Salvador</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                                    <i class="ri-phone-fill text-primary text-xl"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Teléfono</h3>
                                    <p class="mt-1 text-gray-600">+503 0000-0000</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                                    <i class="ri-mail-fill text-primary text-xl"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Email</h3>
                                    <p class="mt-1 text-gray-600">info@ejemplo.com</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                                    <i class="ri-time-fill text-primary text-xl"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Horario</h3>
                                    <p class="mt-1 text-gray-600">Lun - Vie: 8:00 AM - 5:00 PM</p>
                                    <p class="mt-1 text-gray-600">Sábado: 8:00 AM - 12:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-2/3">
                        <div data-gjs-type="map-component"
                            data-gjs-custom-name="Mapa Interactivo"
                            data-lat="${defaultLat}"
                            data-lng="${defaultLng}" 
                            data-zoom="${defaultZoom}" 
                            data-marker-title="Nuestra ubicación"
                            style="width:100%; height:450px; border-radius:0.75rem; overflow:hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);"></div>
                    </div>
                </div>
            </div>
        </section>
        `,
    });

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

            if (!head.querySelector("#map-custom-css")) {
                const customCSS = document.createElement("style");
                customCSS.id = "map-custom-css";
                customCSS.innerHTML = `
                    .leaflet-container {
                        height: 100%;
                        width: 100%;
                        border-radius: inherit;
                    }
                    [data-gjs-type="map-component"] {
                        border-radius: 0.75rem;
                        overflow: hidden;
                    }
                `;
                head.appendChild(customCSS);
            }
        }
    });

    editor.on("storage:end:load", () => {
        setTimeout(() => {
            const wrapper = editor.getWrapper();
            const maps = wrapper.find('[data-gjs-type="map-component"]');
            maps.forEach((mapComp) => {
                mapComp.set("type", "map-component");

                const el = mapComp.getEl();
                if (el) {
                    if (!el.id) {
                        const uniqueId =
                            "map-" +
                            Date.now() +
                            "-" +
                            Math.floor(Math.random() * 10000);
                        el.id = uniqueId;
                        mapComp.addAttributes({ id: uniqueId });
                    }

                    setTimeout(() => {
                        const script = mapComp.get("script");
                        if (script && typeof script === "function") {
                            script.call(el);
                        }
                    }, 500);
                }
            });
        }, 1000);
    });

    editor.on("storage:start:store", () => {
        const wrapper = editor.getWrapper();
        const maps = wrapper.find('[data-gjs-type="map-component"]');
        maps.forEach((mapComp) => {
            mapComp.set("type", "map-component");

            const el = mapComp.getEl();
            if (el) {
                if (!el.id) {
                    const uniqueId =
                        "map-" +
                        Date.now() +
                        "-" +
                        Math.floor(Math.random() * 10000);
                    mapComp.addAttributes({ id: uniqueId });
                }

                mapComp.addAttributes({
                    "data-gjs-type": "map-component",
                    "data-lat": el.getAttribute("data-lat") || defaultLat,
                    "data-lng": el.getAttribute("data-lng") || defaultLng,
                    "data-zoom": el.getAttribute("data-zoom") || defaultZoom,
                    "data-marker-title":
                        el.getAttribute("data-marker-title") ||
                        "Nuestra ubicación",
                });
            }
        });
    });

    editor.on("component:selected", (component) => {
        if (component.get("type") === "map-component") {
            const el = component.getEl();
            if (el && el._map) {
                setTimeout(() => {
                    if (el._map) {
                        el._map.invalidateSize();
                    }
                }, 100);
            }
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(() => {
            const wrapper = editor.getWrapper();
            const maps = wrapper.find('[data-gjs-type="map-component"]');
            maps.forEach((mapComp) => {
                mapComp.set("type", "map-component");

                const el = mapComp.getEl();
                if (el && el.isConnected) {
                    if (!el.id) {
                        el.id =
                            "map-" +
                            Date.now() +
                            "-" +
                            Math.floor(Math.random() * 10000);
                    }
                    const script = mapComp.get("script");
                    if (script && typeof script === "function") {
                        script.call(el);
                    }
                }
            });
        }, 800);
    });

    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (
            el &&
            el.getAttribute &&
            el.getAttribute("data-gjs-type") === "map-component"
        ) {
            component.set("type", "map-component");

            if (!el.id) {
                const uniqueId =
                    "map-" +
                    Date.now() +
                    "-" +
                    Math.floor(Math.random() * 10000);
                component.addAttributes({ id: uniqueId });
            }

            setTimeout(() => {
                const script = component.get("script");
                if (script && typeof script === "function") {
                    script.call(el);
                }
            }, 500);
        }
    });

    // Prevent duplicate map initialization
    editor.on("component:clone", (component) => {
        if (component.get("type") === "map-component") {
            const el = component.getEl();
            if (el && el._map) {
                el._map.remove();
                delete el._map;
                delete el._leaflet_id;

                const uniqueId =
                    "map-" +
                    Date.now() +
                    "-" +
                    Math.floor(Math.random() * 10000);
                component.addAttributes({ id: uniqueId });

                setTimeout(() => {
                    const script = component.get("script");
                    if (script && typeof script === "function") {
                        script.call(el);
                    }
                }, 500);
            }
        }
    });
}
