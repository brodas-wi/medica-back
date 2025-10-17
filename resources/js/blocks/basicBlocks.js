export default function loadBasicBlocks(editor) {
    const blockManager = editor.BlockManager;

    // Ensure custom styles are loaded
    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            const customStyles = frame.contentDocument.createElement("style");
            customStyles.textContent = `
              .text-primary { color: #23366A !important; }
              .text-secondary { color: #333333 !important; }
              .bg-primary { background-color: #23366A !important; }
              .rounded-2xl { border-radius: 1rem !important; }
            `;
            frame.contentDocument.head.appendChild(customStyles);
        }
    });

    // BASIC TEXT BLOCKS
    // HEADING BLOCK
    const headingSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="4" y="5" width="16" height="3" fill="#23366A"/>
    </svg>`;

    blockManager.add("basic-heading", {
        label: "Título",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-header" style="font-size: 30px; display: block; margin: 0 auto;"></i>',
        content: `
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Título Principal</h2>
            </div>
        </div>
        `,
    });

    // SUBTITLE BLOCK
    blockManager.add("basic-subtitle", {
        label: "Subtítulo",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-font" style="font-size: 30px; display: block; margin: 0 auto;"></i>',
        content: `
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <h3 class="text-secondary text-xl md:text-2xl font-semibold">Subtítulo</h3>
            </div>
        </div>
        `,
    });

    // PARAGRAPH BLOCK
    blockManager.add("basic-paragraph", {
        label: "Párrafo",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-paragraph" style="font-size: 30px; display: block; margin: 0 auto;"></i>',
        content: `
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <p class="text-gray-500 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
        </div>
        `,
    });

    // BASIC DIVIDER BLOCK
    blockManager.add("basic-divider-gray", {
        label: "Separador Horizontal Gris",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-minus" style="font-size: 30px; display: block; margin: 0 auto;"></i>',
        content: `
        <div class="py-8">
            <div class="max-w-7xl mx-auto px-4">
                <div class="bg-gray-400 w-full" style="height: 2px;"></div>
            </div>
        </div>
        `,
    });

    // BASIC DIVIDER BLOCK
    blockManager.add("basic-divider-blue", {
        label: "Separador Horizontal Azul",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-minus" style="font-size: 30px; display: block; margin: 0 auto; color: #23366A;"></i>',
        content: `
        <div class="py-8">
            <div class="max-w-7xl mx-auto px-4">
                <div class="bg-primary w-full" style="height: 2px;"></div>
            </div>
        </div>
        `,
    });

    // BASIC IMAGE BLOCK
    blockManager.add("basic-image", {
        label: "Imagen Básica",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-image" style="font-size: 30px; display: block; margin: 0 auto;"></i>',
        content: `
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 object-cover rounded-2xl">
            </div>
        </div>
        `,
    });

    // BASIC MAP BLOCK
    // Register map component if not already registered
    if (!editor.DomComponents.getType("map-component")) {
        editor.DomComponents.addType("map-component", {
            model: {
                defaults: {
                    name: "Mapa",
                    draggable: true,
                    droppable: false,
                    stylable: true,
                    script: function () {
                        // This script runs when the component is added to the canvas
                        const mapId = this.id;
                        const mapContainer = document.getElementById(mapId);
                        const lat =
                            mapContainer.getAttribute("data-lat") || 13.6929;
                        const lng =
                            mapContainer.getAttribute("data-lng") || -89.2182;
                        const zoom =
                            mapContainer.getAttribute("data-zoom") || 14;
                        const title =
                            mapContainer.getAttribute("data-marker-title") ||
                            "Ubicación";

                        // Load Leaflet CSS
                        if (!document.getElementById("leaflet-css")) {
                            const link = document.createElement("link");
                            link.id = "leaflet-css";
                            link.rel = "stylesheet";
                            link.href =
                                "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                            link.integrity =
                                "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
                            link.crossOrigin = "";
                            document.head.appendChild(link);
                        }

                        // Load Leaflet JS
                        if (typeof L === "undefined") {
                            const script = document.createElement("script");
                            script.src =
                                "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                            script.integrity =
                                "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
                            script.crossOrigin = "";
                            script.onload = function () {
                                initMap();
                            };
                            document.head.appendChild(script);
                        } else {
                            initMap();
                        }

                        function initMap() {
                            // Initialize the map
                            const map = L.map(mapId).setView([lat, lng], zoom);

                            // Add the OpenStreetMap tiles
                            L.tileLayer(
                                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                                {
                                    attribution:
                                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                },
                            ).addTo(map);

                            // Add a marker
                            L.marker([lat, lng])
                                .addTo(map)
                                .bindPopup(title)
                                .openPopup();

                            // Recalculate map size when container becomes visible
                            setTimeout(function () {
                                map.invalidateSize();
                            }, 100);
                        }
                    },
                    attributes: {
                        "data-lat": 13.6929,
                        "data-lng": -89.2182,
                        "data-zoom": 14,
                        "data-marker-title": "Nuestra ubicación",
                    },
                    traits: [
                        {
                            type: "number",
                            name: "data-lat",
                            label: "Latitud",
                            placeholder: "13.6929",
                        },
                        {
                            type: "number",
                            name: "data-lng",
                            label: "Longitud",
                            placeholder: "-89.2182",
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
            },
        });
    }

    // Add map block
    blockManager.add("basic-map", {
        label: "Mapa Básico",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-map-o" style="font-size: 30px; display: block; margin: 0 auto;"></i>',
        content: {
            type: "map-component",
            style: {
                width: "100%",
                height: "400px",
                margin: "0 auto",
                position: "relative",
                borderRadius: "1rem",
            },
        },
    });

    // Add Leaflet CSS to editor canvas
    editor.on("load", () => {
        // Get iframe
        const iframe = editor.Canvas.getFrameEl();

        if (iframe) {
            const head = iframe.contentDocument.head;

            // Add Leaflet CSS
            if (!head.querySelector("#leaflet-css")) {
                const leafletCSS = document.createElement("link");
                leafletCSS.id = "leaflet-css";
                leafletCSS.rel = "stylesheet";
                leafletCSS.href =
                    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                leafletCSS.integrity =
                    "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
                leafletCSS.crossOrigin = "";
                head.appendChild(leafletCSS);
            }

            // Add Custom CSS for map components
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
                        border-radius: 1rem;
                        overflow: hidden;
                    }
                `;
                head.appendChild(customCSS);
            }
        }
    });

    // BASIC ORDERED LIST BLOCK
    blockManager.add("basic-ordered-list", {
        label: "Lista Numerada",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-list-ol" style="font-size: 30px; display: block; margin: 0 auto;"></i>',
        content: `
            <div class="py-4">
                <div class="max-w-7xl mx-auto px-4">
                    <ol class="list-decimal pl-6 space-y-2 text-gray-500 text-base md:text-lg leading-relaxed">
                        <li>Primer elemento de la lista numerada</li>
                        <li>Segundo elemento de la lista numerada</li>
                        <li>Tercer elemento de la lista numerada</li>
                    </ol>
                </div>
            </div>
            `,
    });

    // BASIC UNORDERED LIST BLOCK
    blockManager.add("basic-unordered-list", {
        label: "Lista con Viñetas",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-list-ul" style="font-size: 30px; display: block; margin: 0 auto;"></i>',
        content: `
            <div class="py-4">
                <div class="max-w-7xl mx-auto px-4">
                    <ul class="list-disc pl-6 space-y-2 text-gray-500 text-base md:text-lg leading-relaxed">
                        <li>Primer elemento de la lista con viñetas</li>
                        <li>Segundo elemento de la lista con viñetas</li>
                        <li>Tercer elemento de la lista con viñetas</li>
                    </ul>
                </div>
            </div>
            `,
    });
}
