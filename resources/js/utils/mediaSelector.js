import Swal from "sweetalert2";
import { showAlert } from "../toast";

// Fetch media files from the server with proper type filtering
async function fetchMediaFiles(type = "image", searchTerm = "") {
    const url = new URL("/api/media/list", window.location.origin);

    // Always send type parameter
    url.searchParams.append("type", type);

    if (searchTerm) {
        url.searchParams.append("search", searchTerm);
    }

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error(`Error fetching ${type} files:`, error);
        showAlert(`Error al cargar archivos: ${error.message}`, "error");
        return [];
    }
}

// ! QUITAR ESTO
// ? HAY QUE CORREGIR UN MEDIA QUERY EN PROMOCIONES DONDE LOS BOTONES DE FILTRO Y LIMPIAR SE SALEN
// ? HAY QUE CORREGIR PARA QUE AL CREAR O EDITAR PROMOCION UTILICE EL SELECTOR DE MEDIOS EN LUGAR DE SUBIR IMAGEN
// ? HAY QUE CAMBIAR EL DE DIAS O FECHA LIMITE PARA QUE PUEDA YA SEA SELECCIONAR UNO U OTRO, ES DECIR SELECCIONAR POR DIAS O MOSTRAR HASTA UNA FECHA LIMITE
// ? HAY QUE REVISAR PARA VER SI SE HA GENERADO EL COMANDO CORRECTAMENTE PARA DESACTIVAR LA PROMOCION CON FECHA LIMITE O END DATE
// ? HAY QUE REVISAR PARA QUE AL SELECCIONAR UNA CATEGORIA BUSQUE SI HAY OTRAS Y LAS MUESTRE COMO OPCION EN SELECT MIENTRAS SE ESCRIBE

// ? HAY QUE AGREGAR UNA VISTA DE REVIEW PARA NOTICIAS Y QUITAR LOS BOTONES DE APROBAR Y RECHAZAR DEL INDEX, PARA QUE SEA SIMILAR AL DE MEDIOS

// ? EN EL BLOQUE DE PROMOCIONES, HACER FUNCIONAL LOS SCRIPTS YA QUE NO SE GUARDAN, SIMPLIFICAR EL BANNER PARA QUE MUESTRE TITULO Y DIAS
// ? EN EL BLOQUE DE PROMOCIONES, AGREGAR FILTROS POR TIPO Y POR DIAS

// ? HAY QUE IMPLEMENTAR EL CONTROLADOR Y LA FORMA DE RENDERIZAR LA PAGINA DE NOTICIAS PERO EN PUBLIC
// ? HAY QUE HACER QUE LOS BANNERS PRINCIPALES FUNCIONEN SIN EL BANNER SCRIPT SINO QUE LO GUARDEN DE UNA VEZ

// # HAY QUE ARREGLAR EL DISENO DE LOS MODALES CONFIGURABLES, PARA QUE SEA MAS VISUAL Y FUNCIONAL

// ? HAY QUE MODIFICAR CREATE Y EDIT DE BANNER PARA QUE UTILICEN BOTON PARA ABRIR MODAL DE MEDIOS EN LUGAR DE SUBIR ARCHIVO
// ? HAY QUE REVISAR PROMOCIONES SI NO TIENE SUBIR ARCHIVO, SI TIENE MODIFIAR A MODAL DE MEDIOS
// ? HAY QUE REVISAR LA PARTE DE SEGUROS Y DEMAS COSAS QUE HACEN FALTA, SOBRE TODO ARREGLARLO COMPARADO CON ACCOUNT TYPE PARA QUE SE CONFIGURE CORRECTAMENTE

// ? FALTA REVISAR LO DE IS LIGHT PARA EL HOVER EN EL CASO DEL MENU AZUL, PARA LE BLANCO FUNCIONA, ESTO ES PARA LOS BOTONES QUE SON DROPDOWN
// ? ARREGLAR LA ABRRA DE BUSQUEDA QUE SE PERDIO LA FUNCIONALIDAD EN EL SCRIPT Y YA NO FUNCIONA
// ? CORREGIR TEMA DE TIMEOUT ALTO AL CAMBIAR DE UN SUBMENU DE NIVEL 3 A OTRO QUE TARDA EN DESAPARECER EL ANTERIOR, TAL VEZ SEA MEJOR CON CLICK Y NO HOVER

// ! PUEDES VER LO QUE HAY EN EL TXT PROMT_ACTIVIDADES PARA EL CONTEXTO DEL PROYECTO

// Generate HTML for media grid
function generateMediaGrid(mediaFiles, selectedCallback, type = "image") {
    if (mediaFiles.length === 0) {
        return `
            <div class="text-center py-8">
                <i class="ri-folder-2-line text-5xl text-gray-400 mb-3"></i>
                <p class="text-gray-500">No hay ${type === "pdf" ? "PDFs" : "imágenes"} disponibles</p>
            </div>
        `;
    }

    return `
        <div class="media-grid grid grid-cols-3 gap-4">
            ${mediaFiles
                .map(
                    (media) => `
                <div class="media-item border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                     data-media-id="${media.id}"
                     data-media-src="${media.src}"
                     data-media-alt="${media.alt}">
                    <div class="relative h-32 bg-gray-100">
                        ${
                            type === "pdf" || media.type === "document"
                                ? `<div class="w-full h-full flex items-center justify-center">
                                <i class="ri-file-pdf-line text-5xl text-red-500"></i>
                              </div>`
                                : `<img src="${media.src}" alt="${media.alt}" class="w-full h-full object-cover">`
                        }
                    </div>
                    <div class="p-2">
                        <p class="text-xs text-gray-700 truncate" title="${media.name}">${media.name}</p>
                        <p class="text-xs text-gray-500">${media.size}</p>
                    </div>
                </div>
            `,
                )
                .join("")}
        </div>
    `;
}

// Show media selector modal with custom header
export async function showMediaSelector(type = "image", onSelect) {
    let currentSearch = "";
    const modalTitle =
        type === "pdf" ? "Seleccionar archivo PDF" : "Seleccionar imagen";

    try {
        let mediaFiles = await fetchMediaFiles(type, currentSearch);

        const modalContent = `
            <div class="media-selector-container">
                <div class="mb-4">
                    <input 
                        type="text" 
                        id="media-search" 
                        placeholder="Buscar archivos..." 
                        class="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-primary"
                    />
                </div>
                <div id="media-grid-container" style="max-height: 400px; overflow-y: auto;">
                    ${generateMediaGrid(mediaFiles, onSelect, type)}
                </div>
            </div>
        `;

        await Swal.fire({
            html: `
            <div class="custom-modal-header flex justify-between items-center mb-4 pb-3 border-b border-gray-400">
                <h3 class="text-lg font-semibold text-gray-800">${modalTitle}</h3>
                <button type="button" class="swal2-close-custom text-gray-500 hover:text-gray-700 text-2xl" style="background: none; border: none; cursor: pointer; outline: none;">
                    <i class="ri-close-line"></i>
                </button>
            </div>
            ${modalContent}
        `,
            width: "800px",
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            customClass: {
                popup: "custom-media-modal",
                htmlContainer: "custom-media-container",
            },
            didOpen: () => {
                const searchInput = document.getElementById("media-search");
                const gridContainer = document.getElementById(
                    "media-grid-container",
                );
                const closeButton = document.querySelector(
                    ".swal2-close-custom",
                );

                // Close button handler
                closeButton.addEventListener("click", () => {
                    Swal.close();
                });

                // Handle search with debounce
                let searchTimeout;
                searchInput.addEventListener("input", async (e) => {
                    clearTimeout(searchTimeout);
                    currentSearch = e.target.value;

                    searchTimeout = setTimeout(async () => {
                        mediaFiles = await fetchMediaFiles(type, currentSearch);
                        gridContainer.innerHTML = generateMediaGrid(
                            mediaFiles,
                            onSelect,
                            type,
                        );
                        attachMediaClickHandlers();
                    }, 300);
                });

                // Attach click handlers to media items
                attachMediaClickHandlers();

                // Attach click handlers for media selection
                function attachMediaClickHandlers() {
                    const mediaItems =
                        gridContainer.querySelectorAll(".media-item");
                    mediaItems.forEach((item) => {
                        item.addEventListener("click", () => {
                            const mediaData = {
                                id: item.dataset.mediaId,
                                src: item.dataset.mediaSrc,
                                alt: item.dataset.mediaAlt,
                            };

                            Swal.close();
                            if (onSelect) {
                                onSelect(mediaData);
                            }
                        });
                    });
                }
            },
        });
    } catch (error) {
        console.error(`Error in media selector:`, error);
        showAlert(`Error al abrir selector de medios: ${error.message}`, "error");
    }
}

// Setup media selector for image components
export function setupMediaSelectorForImages(editor) {
    // Add custom command for opening media selector
    editor.Commands.add("open-media-selector", {
        run(editor, sender, options = {}) {
            const component = options.component || editor.getSelected();
            if (!component) return;

            // Force "image" type for the image selector
            showMediaSelector("image", (mediaData) => {

                // Update src using set method for proper reactivity
                component.set("src", mediaData.src);

                // Update alt attribute using addAttributes
                if (mediaData.alt) {
                    component.addAttributes({ alt: mediaData.alt });
                }

                // Force view update
                component.view.render();
                editor.trigger("component:update", component);
            });
        },
    });

    // Add button to toolbar when image is selected
    editor.on("component:selected", (component) => {
        if (component.get("type") === "image") {
            const toolbar = component.get("toolbar");

            // Check if button already exists
            const hasMediaButton = toolbar.some(
                (btn) => btn.command === "open-media-selector",
            );

            if (!hasMediaButton) {
                toolbar.unshift({
                    attributes: {
                        class: "fa fa-picture-o",
                        title: "Seleccionar Medios",
                    },
                    command: "open-media-selector",
                });

                component.set("toolbar", toolbar);
            }
        }
    });
}
