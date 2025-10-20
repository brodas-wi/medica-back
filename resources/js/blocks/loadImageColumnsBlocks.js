/**
 * Image column blocks for GrapesJS
 * Collection of responsive image layouts with customizable options
 */
export default function loadImageColumnsBlocks(editor) {
    const blockManager = editor.BlockManager;

    // Apply primary color styling to editor frame
    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            const customStyles = frame.contentDocument.createElement("style");
            customStyles.textContent = `
              .text-primary { color: #23366A !important; }
              .bg-primary { background-color: #23366A !important; }
            `;
            frame.contentDocument.head.appendChild(customStyles);
        }
    });

    // Basic single image block
    blockManager.add("basic-image", {
        label: "Imagen Básica",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="20" height="18" rx="2" fill="#23366A"/>
            <rect x="6" y="7" width="12" height="10" rx="1" fill="white"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 object-cover rounded-2xl">
          </div>
        </div>
        `,
    });

    // Two equal columns with images
    blockManager.add("image-cols-equal", {
        label: "2 Imágenes Iguales",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="9" height="18" rx="1" fill="#23366A"/>
            <rect x="13" y="3" width="9" height="18" rx="1" fill="#23366A"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
              <div>
                <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
            </div>
          </div>
        </div>
        `,
    });

    // Two equal columns with images and buttons
    blockManager.add("image-cols-equal-button", {
        label: "2 Imágenes Iguales con Botón",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="9" height="14" rx="1" fill="#23366A"/>
            <rect x="13" y="3" width="9" height="14" rx="1" fill="#23366A"/>
            <circle cx="6.5" cy="15" r="1.5" fill="white"/>
            <circle cx="17.5" cy="15" r="1.5" fill="white"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div class="relative">
                <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
              <div class="relative">
                <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
    });

    // Left column wider with images
    blockManager.add("image-cols-left-wide", {
        label: "Imagen Izq Grande",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="12" height="18" rx="1" fill="#23366A"/>
            <rect x="16" y="3" width="6" height="18" rx="1" fill="#23366A"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
              <div>
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
            </div>
          </div>
        </div>
        `,
    });

    // Left column wider with images and buttons
    blockManager.add("image-cols-left-wide-button", {
        label: "Imagen Izq Grande con Botón",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="12" height="14" rx="1" fill="#23366A"/>
            <rect x="16" y="3" width="6" height="14" rx="1" fill="#23366A"/>
            <circle cx="8" cy="15" r="1.5" fill="white"/>
            <circle cx="19" cy="15" r="1.5" fill="white"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="relative md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
              <div class="relative">
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
    });

    // Right column wider with images
    blockManager.add("image-cols-right-wide", {
        label: "Imagen Der Grande",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="6" height="18" rx="1" fill="#23366A"/>
            <rect x="10" y="3" width="12" height="18" rx="1" fill="#23366A"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div>
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
              <div class="md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
            </div>
          </div>
        </div>
        `,
    });

    // Right column wider with images and buttons
    blockManager.add("image-cols-right-wide-button", {
        label: "Imagen Der Grande con Botón",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="6" height="14" rx="1" fill="#23366A"/>
            <rect x="10" y="3" width="12" height="14" rx="1" fill="#23366A"/>
            <circle cx="5" cy="15" r="1.5" fill="white"/>
            <circle cx="16" cy="15" r="1.5" fill="white"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="relative">
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
              <div class="relative md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
    });

    // Mixed image columns with one large image and two stacked images
    blockManager.add("image-mixed-columns", {
        label: "Imágenes Mixtas",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="10" height="18" rx="1" fill="#23366A"/>
            <rect x="14" y="3" width="8" height="8" rx="1" fill="#23366A"/>
            <rect x="14" y="13" width="8" height="8" rx="1" fill="#23366A"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div class="h-full">
                <img src="https://via.placeholder.com/800x800/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-full object-cover rounded-2xl">
              </div>
              <div class="grid grid-cols-1 gap-6 md:gap-8">
                <div>
                  <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+Superior" alt="Imagen Superior" class="w-full h-48 md:h-64 object-cover rounded-2xl">
                </div>
                <div>
                  <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+Inferior" alt="Imagen Inferior" class="w-full h-48 md:h-64 object-cover rounded-2xl">
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
    });

    // NEW BLOCKS

    // Left small with play button in corner
    blockManager.add("image-left-small-play", {
        label: "Izq Pequeña con Botón Play",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="6" height="18" rx="1" fill="#23366A"/>
            <rect x="10" y="3" width="12" height="18" rx="1" fill="#23366A"/>
            <circle cx="5" cy="17" r="2" fill="white"/>
            <polygon points="4.5,16 6,17 4.5,18" fill="#23366A"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="relative">
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute -bottom-2 -left-2">
                  <div class="bg-white rounded-full p-2 shadow-lg">
                    <a href="#" class="flex items-center justify-center bg-primary hover:bg-opacity-80 rounded-full w-12 h-12 transition-all duration-300 transform hover:scale-105">
                      <i class="ri-play-fill text-white text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
            </div>
          </div>
        </div>
        `,
    });

    // Right small with play button in corner
    blockManager.add("image-right-small-play", {
        label: "Der Pequeña con Botón Play",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="12" height="18" rx="1" fill="#23366A"/>
            <rect x="16" y="3" width="6" height="18" rx="1" fill="#23366A"/>
            <circle cx="19" cy="17" r="2" fill="white"/>
            <polygon points="18.5,16 20,17 18.5,18" fill="#23366A"/>
        </svg>`,
        content: `
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
              <div class="relative">
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute -bottom-2 -right-2">
                  <div class="bg-white rounded-full p-2 shadow-lg">
                    <a href="#" class="flex items-center justify-center bg-primary hover:bg-opacity-80 rounded-full w-12 h-12 transition-all duration-300 transform hover:scale-105">
                      <i class="ri-play-fill text-white text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
    });
}
