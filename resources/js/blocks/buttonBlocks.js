export default function loadButtonBlocks(editor) {
    const blockManager = editor.BlockManager;

    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            const customStyles = frame.contentDocument.createElement("style");
            customStyles.textContent = `
            .bg-primary { background-color: #23366A !important; }
            .text-primary { color: #23366A !important; }
            .border-primary { border-color: #23366A !important; }
            .hover\\:bg-primary:hover { background-color: #23366A !important; }
            .hover\\:text-white:hover { color: #ffffff !important; }
        `;
            frame.contentDocument.head.appendChild(customStyles);
        }
    });

    // Primary/Fill button - blue background with white text
    blockManager.add("btn-primary", {
        label: "Botón Primario",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32"><rect x="2" y="8" width="20" height="8" rx="4" fill="#23366A"/></svg>`,
        content: `<a href="#" class="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:opacity-90">Botón Primario</a>`,
    });

    // White button with blue text
    blockManager.add("btn-white", {
        label: "Botón Blanco",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32"><rect x="2" y="8" width="20" height="8" rx="4" fill="white" stroke="#ddd"/></svg>`,
        content: `<a href="#" class="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:opacity-90 shadow-lg">Botón Blanco</a>`,
    });

    // Outline button blue - white with blue border and text, turns blue on hover
    blockManager.add("btn-outline-blue", {
        label: "Botón Outline Azul",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32"><rect x="2" y="8" width="20" height="8" rx="4" fill="white" stroke="#23366A" stroke-width="2"/></svg>`,
        content: `<a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">Botón Outline</a>`,
    });

    // Outline button white - transparent with white border and text, turns white on hover
    blockManager.add("btn-outline-white", {
        label: "Botón Outline Blanco",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32"><rect x="2" y="8" width="20" height="8" rx="4" fill="none" stroke="white" stroke-width="2"/></svg>`,
        content: `<a href="#" class="inline-block bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-white hover:text-primary">Botón Outline</a>`,
    });

    // Primary button with icon
    blockManager.add("btn-primary-icon", {
        label: "Botón Primario con Icono",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="8" width="20" height="8" rx="4" fill="#23366A"/>
        <text x="8" y="13.5" text-anchor="middle" fill="white" font-size="4" font-weight="bold">BTN</text>
        <path d="M16 10l2 2-2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
        content: `<a href="#" class="inline-flex items-center bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:opacity-90">
        Botón Primario
        <i class="ri-arrow-right-line ml-2"></i>
      </a>`,
    });

    // White button with icon
    blockManager.add("btn-white-icon", {
        label: "Botón Blanco con Icono",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="8" width="20" height="8" rx="4" fill="white" stroke="#ddd"/>
        <text x="8" y="13.5" text-anchor="middle" fill="#23366A" font-size="4" font-weight="bold">BTN</text>
        <path d="M16 10l2 2-2 2" stroke="#23366A" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
        content: `<a href="#" class="inline-flex items-center bg-white text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:opacity-90 shadow-lg">
        Botón Blanco
        <i class="ri-arrow-right-line ml-2"></i>
      </a>`,
    });

    // Outline blue button with icon
    blockManager.add("btn-outline-blue-icon", {
        label: "Botón Outline Azul con Icono",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="8" width="20" height="8" rx="4" fill="white" stroke="#23366A" stroke-width="2"/>
        <text x="8" y="13.5" text-anchor="middle" fill="#23366A" font-size="4" font-weight="bold">BTN</text>
        <path d="M16 10l2 2-2 2" stroke="#23366A" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
        content: `<a href="#" class="inline-flex items-center bg-white border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">
        Botón Outline
        <i class="ri-arrow-right-line ml-2"></i>
      </a>`,
    });

    // Outline white button with icon
    blockManager.add("btn-outline-white-icon", {
        label: "Botón Outline Blanco con Icono",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="8" width="20" height="8" rx="4" fill="none" stroke="white" stroke-width="2"/>
        <text x="8" y="13.5" text-anchor="middle" fill="white" font-size="4" font-weight="bold">BTN</text>
        <path d="M16 10l2 2-2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
        content: `<a href="#" class="inline-flex items-center bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-white hover:text-primary">
        Botón Outline
        <i class="ri-arrow-right-line ml-2"></i>
      </a>`,
    });

    // Icon only button - primary
    blockManager.add("btn-icon-only-primary", {
        label: "Botón Icono Primario",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <circle cx="12" cy="12" r="8" fill="#23366A"/>
        <path d="M10 12l2 2 4-4" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
        content: `<a href="#" class="inline-flex items-center justify-center bg-primary text-white w-12 h-12 rounded-full transition-all duration-300 hover:opacity-90">
        <i class="ri-arrow-right-line text-xl"></i>
      </a>`,
    });

    // Icon only button - white
    blockManager.add("btn-icon-only-white", {
        label: "Botón Icono Blanco",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <circle cx="12" cy="12" r="8" fill="white" stroke="#ddd"/>
        <path d="M10 12l2 2 4-4" stroke="#23366A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
        content: `<a href="#" class="inline-flex items-center justify-center bg-white text-primary w-12 h-12 rounded-full transition-all duration-300 hover:opacity-90 shadow-lg">
        <i class="ri-arrow-right-line text-xl"></i>
      </a>`,
    });

    // Icon only button - outline blue
    blockManager.add("btn-icon-only-outline-blue", {
        label: "Botón Icono Outline Azul",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <circle cx="12" cy="12" r="8" fill="white" stroke="#23366A" stroke-width="2"/>
        <path d="M10 12l2 2 4-4" stroke="#23366A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
        content: `<a href="#" class="inline-flex items-center justify-center bg-white border-2 border-primary text-primary w-12 h-12 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">
        <i class="ri-arrow-right-line text-xl"></i>
      </a>`,
    });

    // Icon only button - outline white
    blockManager.add("btn-icon-only-outline-white", {
        label: "Botón Icono Outline Blanco",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
        <circle cx="12" cy="12" r="8" fill="none" stroke="white" stroke-width="2"/>
        <path d="M10 12l2 2 4-4" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
        content: `<a href="#" class="inline-flex items-center justify-center bg-transparent border-2 border-white text-white w-12 h-12 rounded-full transition-all duration-300 hover:bg-white hover:text-primary">
        <i class="ri-arrow-right-line text-xl"></i>
      </a>`,
    });

    // Button group - grid section
    blockManager.add("btn-group-section", {
        label: "Sección de Botones",
        category: "Secciones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="1" y="8" width="7" height="8" rx="4" fill="#23366A"/>
          <rect x="9" y="8" width="7" height="8" rx="4" fill="white" stroke="#23366A" stroke-width="1.5"/>
          <rect x="17" y="8" width="6" height="8" rx="4" fill="white" stroke="#23366A" stroke-width="1.5"/>
        </svg>`,
        content: `
        <div class="py-8 md:py-12 bg-white">
          <div class="max-w-7xl mx-auto px-4">
            <div class="flex flex-wrap justify-center gap-3">
              <a href="#" class="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:opacity-90">Botón Primario</a>
              <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">Botón Outline</a>
              <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">Botón Outline</a>
              <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">Botón Outline</a>
            </div>
          </div>
        </div>`,
    });

    // Button group - simple line grid
    blockManager.add("btn-group", {
        label: "Grupo de Botones",
        category: "Botones",
        attributes: { class: "gjs-block-button" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="1" y="8" width="7" height="8" rx="4" fill="#23366A"/>
          <rect x="9" y="8" width="7" height="8" rx="4" fill="white" stroke="#23366A" stroke-width="1.5"/>
          <rect x="17" y="8" width="6" height="8" rx="4" fill="white" stroke="#23366A" stroke-width="1.5"/>
        </svg>`,
        content: `<div class="px-4">
          <div class="flex flex-wrap justify-center gap-3">
            <a href="#" class="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:opacity-90">Botón Primario</a>
            <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">Botón Outline</a>
            <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">Botón Outline</a>
          </div>
        </div>`,
    });
}
