import Swal from "sweetalert2";
import { showAlert } from "../toast";

// Open icon editor modal for single icons
export function openIconEditor(editor) {
    const selected = editor.getSelected();
    if (!selected) return;

    const el = selected.view.el;
    if (!el || el.tagName !== "I") return;

    const iconOptions = [
        // Home & Buildings
        { value: "ri-home-fill", label: "Inicio" },
        { value: "ri-home-2-fill", label: "Inicio Alt" },
        { value: "ri-home-heart-fill", label: "Inicio Favorito" },
        { value: "ri-building-fill", label: "Edificio" },
        { value: "ri-community-fill", label: "Comunidad" },
        { value: "ri-hotel-fill", label: "Hotel" },
        { value: "ri-store-fill", label: "Tienda" },
        { value: "ri-hospital-fill", label: "Hospital" },
        { value: "ri-government-fill", label: "Gobierno" },
        { value: "ri-bank-fill", label: "Banco" },

        // Users & People
        { value: "ri-user-fill", label: "Usuario" },
        { value: "ri-user-add-fill", label: "Añadir Usuario" },
        { value: "ri-user-follow-fill", label: "Seguir Usuario" },
        { value: "ri-user-settings-fill", label: "Ajustes Usuario" },
        { value: "ri-user-smile-fill", label: "Usuario Sonriente" },
        { value: "ri-group-fill", label: "Grupo" },
        { value: "ri-team-fill", label: "Equipo" },
        { value: "ri-user-star-fill", label: "Usuario Estrella" },
        { value: "ri-user-heart-fill", label: "Usuario Favorito" },
        { value: "ri-account-box-fill", label: "Cuenta" },
        { value: "ri-contacts-fill", label: "Contactos" },
        { value: "ri-user-voice-fill", label: "Voz Usuario" },
        { value: "ri-user-location-fill", label: "Ubicación Usuario" },
        { value: "ri-admin-fill", label: "Administrador" },
        { value: "ri-account-circle-fill", label: "Perfil" },

        // Communication & Messages
        { value: "ri-chat-1-fill", label: "Chat" },
        { value: "ri-chat-3-fill", label: "Chat Burbuja" },
        { value: "ri-chat-smile-2-fill", label: "Chat Sonrisa" },
        { value: "ri-chat-heart-fill", label: "Chat Corazón" },
        { value: "ri-message-2-fill", label: "Mensaje" },
        { value: "ri-message-3-fill", label: "Mensaje Burbuja" },
        { value: "ri-mail-fill", label: "Correo" },
        { value: "ri-mail-send-fill", label: "Enviar Correo" },
        { value: "ri-mail-open-fill", label: "Correo Abierto" },
        { value: "ri-inbox-fill", label: "Bandeja Entrada" },
        { value: "ri-feedback-fill", label: "Comentarios" },
        { value: "ri-question-answer-fill", label: "Preguntas" },

        // Contact & Phone
        { value: "ri-phone-fill", label: "Teléfono" },
        { value: "ri-phone-find-fill", label: "Buscar Teléfono" },
        { value: "ri-smartphone-fill", label: "Smartphone" },
        { value: "ri-customer-service-fill", label: "Atención Cliente" },
        { value: "ri-headphone-fill", label: "Auriculares" },
        { value: "ri-whatsapp-fill", label: "WhatsApp" },

        // Devices & Technology
        { value: "ri-tablet-fill", label: "Tablet" },
        { value: "ri-computer-fill", label: "Computadora" },
        { value: "ri-device-fill", label: "Dispositivo" },
        { value: "ri-wifi-fill", label: "Wifi" },
        { value: "ri-bluetooth-fill", label: "Bluetooth" },
        { value: "ri-database-fill", label: "Base de Datos" },
        { value: "ri-cloud-fill", label: "Nube" },
        { value: "ri-server-fill", label: "Servidor" },

        // Money & Commerce
        { value: "ri-money-dollar-circle-fill", label: "Dólar" },
        { value: "ri-money-euro-circle-fill", label: "Euro" },
        { value: "ri-coin-fill", label: "Moneda" },
        { value: "ri-coins-fill", label: "Monedas" },
        { value: "ri-bank-card-fill", label: "Tarjeta" },
        { value: "ri-bank-card-2-fill", label: "Tarjeta Alt" },
        { value: "ri-secure-payment-fill", label: "Pago Seguro" },
        { value: "ri-wallet-fill", label: "Billetera" },
        { value: "ri-wallet-2-fill", label: "Billetera Alt" },
        { value: "ri-wallet-3-fill", label: "Billetera 3" },
        { value: "ri-refund-fill", label: "Reembolso" },
        { value: "ri-safe-3-fill", label: "Caja Fuerte" },
        { value: "ri-hand-coin-fill", label: "Mano Moneda" },
        { value: "ri-price-tag-fill", label: "Etiqueta Precio" },
        { value: "ri-coupon-fill", label: "Cupón" },

        // Shopping
        { value: "ri-shopping-cart-fill", label: "Carrito" },
        { value: "ri-shopping-bag-fill", label: "Bolsa Compras" },
        { value: "ri-shopping-basket-fill", label: "Cesta Compras" },
        { value: "ri-store-2-fill", label: "Tienda 2" },
        { value: "ri-gift-fill", label: "Regalo" },
        { value: "ri-box-3-fill", label: "Caja" },
        { value: "ri-archive-fill", label: "Archivo" },

        // Vehicles & Transport
        { value: "ri-car-fill", label: "Coche" },
        { value: "ri-taxi-fill", label: "Taxi" },
        { value: "ri-bus-fill", label: "Autobús" },
        { value: "ri-truck-fill", label: "Camión" },
        { value: "ri-bike-fill", label: "Bicicleta" },
        { value: "ri-motorbike-fill", label: "Motocicleta" },
        { value: "ri-train-fill", label: "Tren" },
        { value: "ri-plane-fill", label: "Avión" },
        { value: "ri-ship-fill", label: "Barco" },
        { value: "ri-rocket-fill", label: "Cohete" },
        { value: "ri-gas-station-fill", label: "Gasolinera" },
        { value: "ri-parking-box-fill", label: "Estacionamiento" },

        // Location & Maps
        { value: "ri-map-pin-fill", label: "Pin Mapa" },
        { value: "ri-map-pin-2-fill", label: "Pin Mapa 2" },
        { value: "ri-navigation-fill", label: "Navegación" },
        { value: "ri-compass-fill", label: "Brújula" },
        { value: "ri-route-fill", label: "Ruta" },
        { value: "ri-map-fill", label: "Mapa" },
        { value: "ri-earth-fill", label: "Tierra" },
        { value: "ri-global-fill", label: "Global" },

        // Web & Links
        { value: "ri-link", label: "Enlace" },
        { value: "ri-links-fill", label: "Enlaces" },
        { value: "ri-link-m", label: "Enlace M" },
        { value: "ri-link-unlink", label: "Desenlazar" },
        { value: "ri-attachment-fill", label: "Adjunto" },
        { value: "ri-attachment-2", label: "Adjunto 2" },
        { value: "ri-attachment-line", label: "Clip" },
        { value: "ri-external-link-fill", label: "Link Externo" },
        { value: "ri-share-fill", label: "Compartir" },
        { value: "ri-share-forward-fill", label: "Reenviar" },
        { value: "ri-share-box-fill", label: "Compartir Box" },
        { value: "ri-pages-fill", label: "Páginas" },
        { value: "ri-window-fill", label: "Ventana" },
        { value: "ri-window-2-fill", label: "Ventana 2" },
        { value: "ri-safari-fill", label: "Safari" },
        { value: "ri-chrome-fill", label: "Chrome" },
        { value: "ri-firefox-fill", label: "Firefox" },
        { value: "ri-edge-fill", label: "Edge" },
        { value: "ri-ie-fill", label: "Internet Explorer" },

        // Stars & Favorites
        { value: "ri-star-fill", label: "Estrella" },
        { value: "ri-star-half-fill", label: "Media Estrella" },
        { value: "ri-heart-fill", label: "Corazón" },
        { value: "ri-thumb-up-fill", label: "Me Gusta" },
        { value: "ri-thumb-down-fill", label: "No Me Gusta" },
        { value: "ri-bookmark-fill", label: "Marcador" },
        { value: "ri-bookmark-2-fill", label: "Marcador Alt" },
        { value: "ri-bookmark-3-fill", label: "Marcador 3" },
        { value: "ri-award-fill", label: "Premio" },
        { value: "ri-medal-fill", label: "Medalla" },
        { value: "ri-trophy-fill", label: "Trofeo" },

        // Media & Files
        { value: "ri-image-fill", label: "Imagen" },
        { value: "ri-image-2-fill", label: "Imagen Alt" },
        { value: "ri-gallery-fill", label: "Galería" },
        { value: "ri-video-fill", label: "Video" },
        { value: "ri-movie-fill", label: "Película" },
        { value: "ri-camera-fill", label: "Cámara" },
        { value: "ri-music-fill", label: "Música" },
        { value: "ri-file-fill", label: "Archivo" },
        { value: "ri-folder-fill", label: "Carpeta" },
        { value: "ri-file-text-fill", label: "Documento" },
        { value: "ri-file-pdf-2-fill", label: "PDF" },
        { value: "ri-file-word-fill", label: "Word" },
        { value: "ri-file-excel-fill", label: "Excel" },
        { value: "ri-file-ppt-fill", label: "PowerPoint" },
        { value: "ri-file-zip-fill", label: "ZIP" },
        { value: "ri-file-code-fill", label: "Código" },
        { value: "ri-file-copy-fill", label: "Copiar Archivo" },
        { value: "ri-file-download-fill", label: "Descargar Archivo" },
        { value: "ri-file-upload-fill", label: "Subir Archivo" },
        { value: "ri-folder-open-fill", label: "Carpeta Abierta" },
        { value: "ri-folder-zip-fill", label: "Carpeta ZIP" },
        { value: "ri-folder-download-fill", label: "Descargar Carpeta" },
        { value: "ri-folder-upload-fill", label: "Subir Carpeta" },

        // Social Networks
        { value: "ri-facebook-fill", label: "Facebook" },
        { value: "ri-facebook-circle-fill", label: "Facebook Circle" },
        { value: "ri-twitter-fill", label: "Twitter" },
        { value: "ri-twitter-x-fill", label: "X (Twitter)" },
        { value: "ri-instagram-fill", label: "Instagram" },
        { value: "ri-youtube-fill", label: "YouTube" },
        { value: "ri-linkedin-fill", label: "LinkedIn" },
        { value: "ri-linkedin-box-fill", label: "LinkedIn Box" },
        { value: "ri-pinterest-fill", label: "Pinterest" },
        { value: "ri-tiktok-fill", label: "TikTok" },
        { value: "ri-snapchat-fill", label: "Snapchat" },
        { value: "ri-telegram-fill", label: "Telegram" },
        { value: "ri-discord-fill", label: "Discord" },
        { value: "ri-slack-fill", label: "Slack" },
        { value: "ri-reddit-fill", label: "Reddit" },
        { value: "ri-spotify-fill", label: "Spotify" },
        { value: "ri-twitch-fill", label: "Twitch" },

        // Time & Calendar
        { value: "ri-calendar-fill", label: "Calendario" },
        { value: "ri-calendar-event-fill", label: "Evento" },
        { value: "ri-time-fill", label: "Tiempo" },
        { value: "ri-alarm-fill", label: "Alarma" },
        { value: "ri-timer-fill", label: "Temporizador" },
        { value: "ri-hourglass-fill", label: "Reloj Arena" },

        // Settings & System
        { value: "ri-settings-fill", label: "Ajustes" },
        { value: "ri-settings-2-fill", label: "Ajustes Alt" },
        { value: "ri-settings-3-fill", label: "Ajustes 3" },
        { value: "ri-tools-fill", label: "Herramientas" },
        { value: "ri-lock-fill", label: "Candado" },
        { value: "ri-lock-unlock-fill", label: "Desbloquear" },
        { value: "ri-key-fill", label: "Llave" },
        { value: "ri-eye-fill", label: "Ojo" },
        { value: "ri-eye-off-fill", label: "Ocultar" },
        { value: "ri-download-fill", label: "Descargar" },
        { value: "ri-upload-fill", label: "Subir" },

        // Notifications & Alerts
        { value: "ri-notification-fill", label: "Notificación" },
        { value: "ri-notification-2-fill", label: "Notificación Alt" },
        { value: "ri-notification-badge-fill", label: "Notificación Insignia" },
        { value: "ri-alarm-warning-fill", label: "Alarma Advertencia" },
        { value: "ri-error-warning-fill", label: "Advertencia" },
        { value: "ri-alert-fill", label: "Alerta" },
        { value: "ri-information-fill", label: "Información" },
        { value: "ri-question-fill", label: "Pregunta" },

        // Navigation & Menu
        { value: "ri-menu-fill", label: "Menú" },
        { value: "ri-menu-2-fill", label: "Menú Alt" },
        { value: "ri-menu-3-fill", label: "Menú 3" },
        { value: "ri-more-fill", label: "Más" },
        { value: "ri-more-2-fill", label: "Más Alt" },

        // Actions & Controls
        { value: "ri-close-circle-fill", label: "Cerrar Círculo" },
        { value: "ri-add-circle-fill", label: "Añadir Círculo" },
        { value: "ri-checkbox-circle-fill", label: "Checkbox Círculo" },
        { value: "ri-checkbox-fill", label: "Checkbox" },
        { value: "ri-checkbox-blank-circle-fill", label: "Checkbox Vacío" },
        { value: "ri-play-circle-fill", label: "Reproducir" },
        { value: "ri-pause-circle-fill", label: "Pausar" },
        { value: "ri-stop-circle-fill", label: "Detener" },

        // Arrows & Directions
        { value: "ri-arrow-right-circle-fill", label: "Flecha Derecha" },
        { value: "ri-arrow-left-circle-fill", label: "Flecha Izquierda" },
        { value: "ri-arrow-up-circle-fill", label: "Flecha Arriba" },
        { value: "ri-arrow-down-circle-fill", label: "Flecha Abajo" },
        { value: "ri-arrow-right-line", label: "Flecha Der" },
        { value: "ri-arrow-left-line", label: "Flecha Izq" },
        { value: "ri-arrow-up-line", label: "Flecha Arr" },
        { value: "ri-arrow-down-line", label: "Flecha Aba" },

        // Security & Protection
        { value: "ri-shield-fill", label: "Escudo" },
        { value: "ri-shield-check-fill", label: "Escudo Check" },
        { value: "ri-shield-user-fill", label: "Escudo Usuario" },
        { value: "ri-shield-star-fill", label: "Escudo Estrella" },
        { value: "ri-verified-badge-fill", label: "Verificado" },

        // Weather
        { value: "ri-sun-fill", label: "Sol" },
        { value: "ri-moon-fill", label: "Luna" },
        { value: "ri-cloudy-fill", label: "Nublado" },
        { value: "ri-rainy-fill", label: "Lluvioso" },
        { value: "ri-snowy-fill", label: "Nevado" },
        { value: "ri-thunderstorms-fill", label: "Tormenta" },

        // Food & Drink
        { value: "ri-restaurant-fill", label: "Restaurante" },
        { value: "ri-restaurant-2-fill", label: "Restaurante 2" },
        { value: "ri-cup-fill", label: "Taza" },
        { value: "ri-cake-fill", label: "Pastel" },
        { value: "ri-goblet-fill", label: "Copa" },

        // Health & Medical
        { value: "ri-heart-pulse-fill", label: "Pulso Cardíaco" },
        { value: "ri-mental-health-fill", label: "Salud Mental" },
        { value: "ri-medicine-bottle-fill", label: "Medicina" },
        { value: "ri-first-aid-kit-fill", label: "Botiquín" },
        { value: "ri-stethoscope-fill", label: "Estetoscopio" },

        // Business
        { value: "ri-briefcase-fill", label: "Maletín" },
        { value: "ri-bar-chart-fill", label: "Gráfico Barras" },
        { value: "ri-pie-chart-fill", label: "Gráfico Circular" },
        { value: "ri-line-chart-fill", label: "Gráfico Líneas" },
        { value: "ri-presentation-fill", label: "Presentación" },
    ];

    let currentIconClass = "";
    for (const cls of el.classList) {
        if (cls.startsWith("ri-")) {
            currentIconClass = cls;
            break;
        }
    }

    const computedStyle = window.getComputedStyle(el);
    const currentSize = parseInt(computedStyle.fontSize) || 24;
    const currentColor = computedStyle.color || "#23366A";

    // Convert RGB to Hex color
    function rgbToHex(rgb) {
        if (!rgb || !rgb.match(/^rgb/)) return rgb || "#23366A";

        const rgbArr = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!rgbArr) return "#23366A";

        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }

        return "#" + hex(rgbArr[1]) + hex(rgbArr[2]) + hex(rgbArr[3]);
    }

    const iconPreview = iconOptions
        .map(
            (icon) =>
                `<div class="icon-preview-item ${
                    currentIconClass === icon.value ? "selected" : ""
                }" data-icon="${icon.value}">
            <i class="${icon.value}" style="font-size: 24px; color: #23366A;"></i>
            <span>${icon.label}</span>
        </div>`,
        )
        .join("");

    Swal.fire({
        title: "Configurar Icono",
        html: `
            <style>
                .icon-selector-container {
                    margin-bottom: 20px;
                    text-align: left;
                }
                .icon-preview-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin-top: 10px;
                    max-height: 350px;
                    overflow-y: auto;
                    border: 1px solid #e2e8f0;
                    padding: 10px;
                    border-radius: 4px;
                }
                .icon-preview-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background-color 0.2s;
                }
                .icon-preview-item:hover {
                    background-color: #f1f5f9;
                }
                .icon-preview-item.selected {
                    background-color: #e2e8f0;
                }
                .icon-preview-item span {
                    font-size: 12px;
                    margin-top: 5px;
                    text-align: center;
                }
                .swal2-input-label {
                    text-align: left;
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                }
                .color-size-container {
                    display: flex;
                    gap: 10px;
                    margin-top: 20px;
                }
                .color-container, .size-container {
                    flex: 1;
                }
                input[type="number"], input[type="color"] {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                }
                input[type="color"] {
                    height: 40px;
                }
            </style>
            <div class="icon-selector-container">
                <input 
                    type="text" 
                    id="icon-search" 
                    placeholder="Buscar icono..." 
                    style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #e2e8f0; border-radius: 4px;"
                >
                <div class="icon-preview-grid" id="icon-preview-grid">
                    ${iconPreview}
                </div>
            </div>
            <div class="color-size-container">
                <div class="size-container">
                    <span class="swal2-input-label">Tamaño (px):</span>
                    <input type="number" id="icon-size" value="${currentSize}" min="12" max="96">
                </div>
                <div class="color-container">
                    <span class="swal2-input-label">Color:</span>
                    <input type="color" id="icon-color" value="${rgbToHex(
                        currentColor,
                    )}">
                </div>
            </div>
            <input type="hidden" id="selected-icon" value="${currentIconClass}">
        `,
        showCancelButton: true,
        confirmButtonText: "Aplicar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#23366A",
        cancelButtonColor: "#e74c3c",
        width: "500px",
        didOpen: () => {
            // Add search functionality
            const searchInput = document.getElementById("icon-search");
            const iconGrid = document.getElementById("icon-preview-grid");

            searchInput.addEventListener("input", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const iconItems =
                    iconGrid.querySelectorAll(".icon-preview-item");

                iconItems.forEach((item) => {
                    const label = item
                        .querySelector("span")
                        .textContent.toLowerCase();
                    const iconClass = item.dataset.icon.toLowerCase();

                    if (
                        label.includes(searchTerm) ||
                        iconClass.includes(searchTerm)
                    ) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                });
            });

            document.querySelectorAll(".icon-preview-item").forEach((item) => {
                item.addEventListener("click", () => {
                    document
                        .querySelectorAll(".icon-preview-item")
                        .forEach((i) => i.classList.remove("selected"));

                    item.classList.add("selected");

                    document.getElementById("selected-icon").value =
                        item.dataset.icon;
                });
            });
        },
        preConfirm: () => {
            const newIcon = document.getElementById("selected-icon").value;
            const newSize = document.getElementById("icon-size").value;
            const newColor = document.getElementById("icon-color").value;

            return { iconClass: newIcon, size: newSize, color: newColor };
        },
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                const { iconClass, size, color } = result.value;
                const classes = [...selected.getClasses()];

                const filteredClasses = classes.filter(
                    (cls) => !cls.startsWith("ri-"),
                );

                filteredClasses.push(iconClass);
                selected.setClass(filteredClasses);

                selected.addStyle({
                    "font-size": `${size}px`,
                });

                const parent = el.closest('button, a, [class*="hover:text"]');

                if (parent) {
                    selected.addStyle({ color: "currentColor" });
                    showAlert(
                        "Icono actualizado correctamente. Color heredado del elemento padre.",
                        "success",
                    );
                } else {
                    selected.addStyle({ color: color });
                    showAlert("Icono actualizado correctamente", "success");
                }

                editor.select(selected);
                selected.em.trigger("component:update", selected);
            } catch (error) {
                console.error("Error al actualizar icono:", error);
                showAlert("Error al actualizar el icono", "error");
            }
        }
    });
}

// Setup icon traits for selected components
export function setupIconTraits(editor) {
    // Check if component should have icon selector trait
    editor.on("component:selected", function (component) {
        const el = component.getEl();

        // Check for icon selector trait (only for <i> tags)
        if (
            el &&
            el.tagName === "I" &&
            Array.from(el.classList).some((cls) => cls.startsWith("ri-"))
        ) {
            if (!component.getTrait("icon-selector")) {
                component.addTrait(
                    {
                        type: "button",
                        name: "icon-selector",
                        label: "Editar Icono",
                        text: "Editar",
                        full: true,
                        command: (editor) => {
                            openIconEditor(editor);
                        },
                    },
                    { at: 0 },
                );
                editor.TraitManager.render();
            }
        }
    });
}

// Setup block drag stop notifications
export function setupIconBlockNotifications(editor) {
    editor.on("block:drag:stop", (component) => {
        if (
            component &&
            component.getEl &&
            component.getEl() &&
            component.getEl().tagName === "I" &&
            Array.from(component.getEl().classList).some((cls) =>
                cls.startsWith("ri-"),
            )
        ) {
            showAlert(
                "Icono insertado. Para editarlo busca el botón 'Editar Icono' en el panel de propiedades.",
                "info",
            );
        }
    });
}
