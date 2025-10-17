export default function loadImageColumnsBlocks(editor) {
    const blockManager = editor.BlockManager;

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

    // Single rounded image block
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

    // Mixed image columns with one large image and two stacked images
    const imageMixedColumnsSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="10" height="16" rx="1" fill="#23366A"/>
      <rect x="14" y="4" width="8" height="7.5" rx="1" fill="#23366A"/>
      <rect x="14" y="12.5" width="8" height="7.5" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("image-mixed-columns", {
        label: "Imágenes Mixtas",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: imageMixedColumnsSvg,
        content: `
        <div class="py-4">
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

    // Two equal columns with images and buttons
    const imageColsEqualButtonSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="12" rx="1" fill="#23366A"/>
      <rect x="13" y="4" width="9" height="12" rx="1" fill="#23366A"/>
      <circle cx="6" cy="14" r="1.5" fill="white"/>
      <circle cx="17" cy="14" r="1.5" fill="white"/>
    </svg>`;

    blockManager.add("image-cols-equal-button", {
        label: "2 Imágenes Iguales con Botón",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: imageColsEqualButtonSvg,
        content: `
<div class="py-4">
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

    // Two equal columns with images (no button)
    const imageColsEqualSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="16" rx="1" fill="#23366A"/>
      <rect x="13" y="4" width="9" height="16" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("image-cols-equal", {
        label: "2 Imágenes Iguales",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: imageColsEqualSvg,
        content: `
<div class="py-4">
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

    // First column wider with images and buttons
    const imageColsLeftWideButtonSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="12" height="12" rx="1" fill="#23366A"/>
      <rect x="16" y="4" width="6" height="12" rx="1" fill="#23366A"/>
      <circle cx="7" cy="14" r="1.5" fill="white"/>
      <circle cx="19" cy="14" r="1.5" fill="white"/>
    </svg>`;

    blockManager.add("image-cols-left-wide-button", {
        label: "Imagen Izq Grande con Botón",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: imageColsLeftWideButtonSvg,
        content: `
<div class="py-4">
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

    // First column wider with images (no button)
    const imageColsLeftWideSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="12" height="16" rx="1" fill="#23366A"/>
      <rect x="16" y="4" width="6" height="16" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("image-cols-left-wide", {
        label: "Imagen Izq Grande",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: imageColsLeftWideSvg,
        content: `
<div class="py-4">
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

    // Second column wider with images and buttons
    const imageColsRightWideButtonSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="6" height="12" rx="1" fill="#23366A"/>
      <rect x="10" y="4" width="12" height="12" rx="1" fill="#23366A"/>
      <circle cx="5" cy="14" r="1.5" fill="white"/>
      <circle cx="15" cy="14" r="1.5" fill="white"/>
    </svg>`;

    blockManager.add("image-cols-right-wide-button", {
        label: "Imagen Der Grande con Botón",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: imageColsRightWideButtonSvg,
        content: `
<div class="py-4">
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

    // Second column wider with images (no button)
    const imageColsRightWideSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="6" height="16" rx="1" fill="#23366A"/>
      <rect x="10" y="4" width="12" height="16" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("image-cols-right-wide", {
        label: "Imagen Der Grande",
        category: "Imagenes",
        attributes: { class: "gjs-block-section" },
        media: imageColsRightWideSvg,
        content: `
<div class="py-4">
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
}
