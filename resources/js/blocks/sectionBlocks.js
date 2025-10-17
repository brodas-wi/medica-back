export default function loadHeroBlocks(editor) {
    const blockManager = editor.BlockManager;

    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            const customStyles = frame.contentDocument.createElement("style");
            customStyles.textContent = `
              .bg-primary { background-color: #23366A !important; }
              .text-primary { color: #23366A !important; }
              .text-secondary { color: #333333 !important; }
              .border-primary { border-color: #23366A !important; }
              .hover\\:bg-primary:hover { background-color: #23366A !important; }
              .hover\\:text-white:hover { color: #ffffff !important; }
          `;
            frame.contentDocument.head.appendChild(customStyles);
        }
    });

    // Mixed section with text and asymmetric image layout
    const sectionAsymmetricImagesSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="2" fill="#333"/>
      <rect x="2" y="7" width="9" height="1" fill="#666"/>
      <rect x="2" y="9" width="9" height="1" fill="#666"/>
      <rect x="2" y="11" width="9" height="1" fill="#666"/>
      <rect x="13" y="4" width="4" height="16" rx="1" fill="#23366A"/>
      <rect x="18" y="4" width="4" height="7.5" rx="1" fill="#23366A"/>
      <rect x="18" y="12.5" width="4" height="7.5" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("section-asymmetric-images", {
        label: "Sección con Imágenes Mixtas",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: sectionAsymmetricImagesSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
          <div class="max-w-7xl mx-auto px-4">
            <div class="flex flex-col md:flex-row gap-8 md:gap-12">
              <div class="w-full md:w-2/5 flex flex-col justify-center">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">Asistencias</h2>
                <p class="text-gray-500 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.</p>
              </div>
              
              <div class="w-full md:w-3/5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div class="h-full">
                    <img src="https://via.placeholder.com/400x600/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-full object-cover rounded-2xl">
                  </div>
                  <div class="grid grid-cols-1 gap-4 md:gap-6">
                    <div>
                      <img src="https://via.placeholder.com/400x300/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-48 object-cover rounded-2xl">
                    </div>
                    <div>
                      <img src="https://via.placeholder.com/400x300/cccccc/666666?text=Imagen+3" alt="Imagen 3" class="w-full h-48 object-cover rounded-2xl">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        `,
    });

    // Image left with title, subtitle, paragraph and button
    const heroLeftFullSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="16" rx="1" fill="#23366A"/>
      <rect x="13" y="6" width="8" height="2" fill="#333"/>
      <rect x="13" y="10" width="7" height="1" fill="#666"/>
      <rect x="13" y="13" width="8" height="1" fill="#999"/>
      <rect x="13" y="16" width="5" height="2" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-left-full", {
        label: "Seccion Completa Izq",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroLeftFullSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Image left with title, subtitle and paragraph (no button)
    const heroLeftNoButtonSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="16" rx="1" fill="#23366A"/>
      <rect x="13" y="6" width="8" height="2" fill="#333"/>
      <rect x="13" y="10" width="7" height="1" fill="#666"/>
      <rect x="13" y="13" width="8" height="1" fill="#999"/>
    </svg>`;

    blockManager.add("hero-left-no-button", {
        label: "Seccion Izq Sin Botón",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroLeftNoButtonSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-500 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Image left with title, paragraph and button (no subtitle)
    const heroLeftNoSubtitleSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="16" rx="1" fill="#23366A"/>
      <rect x="13" y="8" width="8" height="2" fill="#333"/>
      <rect x="13" y="12" width="8" height="1" fill="#999"/>
      <rect x="13" y="15" width="5" height="2" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-left-no-subtitle", {
        label: "Seccion Izq Sin Subtítulo",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroLeftNoSubtitleSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Image left with title and paragraph (no subtitle, no button)
    const heroLeftMinimalSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="16" rx="1" fill="#23366A"/>
      <rect x="13" y="8" width="8" height="2" fill="#333"/>
      <rect x="13" y="12" width="8" height="1" fill="#999"/>
    </svg>`;

    blockManager.add("hero-left-minimal", {
        label: "Seccion Izq Mínimo",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroLeftMinimalSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-500 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Image right with title, subtitle, paragraph and button
    const heroRightFullSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="6" width="8" height="2" fill="#333"/>
      <rect x="2" y="10" width="7" height="1" fill="#666"/>
      <rect x="2" y="13" width="8" height="1" fill="#999"/>
      <rect x="2" y="16" width="5" height="2" rx="1" fill="#23366A"/>
      <rect x="13" y="4" width="9" height="16" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-right-full", {
        label: "Seccion Completa Der",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroRightFullSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Image right with title, subtitle and paragraph (no button)
    const heroRightNoButtonSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="6" width="8" height="2" fill="#333"/>
      <rect x="2" y="10" width="7" height="1" fill="#666"/>
      <rect x="2" y="13" width="8" height="1" fill="#999"/>
      <rect x="13" y="4" width="9" height="16" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-right-no-button", {
        label: "Seccion Der Sin Botón",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroRightNoButtonSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-500 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Image right with title, paragraph and button (no subtitle)
    const heroRightNoSubtitleSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="8" width="8" height="2" fill="#333"/>
      <rect x="2" y="12" width="8" height="1" fill="#999"/>
      <rect x="2" y="15" width="5" height="2" rx="1" fill="#23366A"/>
      <rect x="13" y="4" width="9" height="16" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-right-no-subtitle", {
        label: "Seccion Der Sin Subtítulo",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroRightNoSubtitleSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Image right with title and paragraph (no subtitle, no button)
    const heroRightMinimalSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="8" width="8" height="2" fill="#333"/>
      <rect x="2" y="12" width="8" height="1" fill="#999"/>
      <rect x="13" y="4" width="9" height="16" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-right-minimal", {
        label: "Seccion Der Mínimo",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroRightMinimalSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-500 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Full vertical with title, subtitle, paragraph, image and button
    const heroVerticalFullSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="6" y="5" width="12" height="1" fill="#666"/>
    <rect x="4" y="7" width="16" height="1" fill="#999"/>
    <rect x="2" y="9" width="20" height="10" rx="1" fill="#23366A"/>
    <rect x="9" y="20" width="6" height="2" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-vertical-full", {
        label: "Seccion Vertical Completa",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroVerticalFullSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-4xl mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
            <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
            <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed max-w-3xl mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
          </div>
          <div class="relative">
            <img src="https://via.placeholder.com/800x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            <div class="absolute bottom-6 left-6">
              <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Vertical with title, subtitle, paragraph and image (no button)
    const heroVerticalNoButtonSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="6" y="5" width="12" height="1" fill="#666"/>
    <rect x="4" y="7" width="16" height="1" fill="#999"/>
    <rect x="2" y="9" width="20" height="12" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-vertical-no-button", {
        label: "Seccion Vertical Sin Botón",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroVerticalNoButtonSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-4xl mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
            <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
            <p class="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/800x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
          </div>
        </div>
        </section>
        `,
    });

    // Vertical with title, paragraph, image and button (no subtitle)
    const heroVerticalNoSubtitleSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="4" y="5" width="16" height="1" fill="#999"/>
    <rect x="2" y="7" width="20" height="12" rx="1" fill="#23366A"/>
    <rect x="9" y="20" width="6" height="2" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-vertical-no-subtitle", {
        label: "Seccion Vertical Sin Subtítulo",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroVerticalNoSubtitleSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-4xl mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
            <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed max-w-3xl mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
          </div>
          <div class="relative">
            <img src="https://via.placeholder.com/800x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            <div class="absolute bottom-6 left-6">
              <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Vertical minimal with title, paragraph and image (no subtitle, no button)
    const heroVerticalMinimalSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="4" y="5" width="16" height="1" fill="#999"/>
    <rect x="2" y="7" width="20" height="15" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-vertical-minimal", {
        label: "Seccion Vertical Mínimo",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: heroVerticalMinimalSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-4xl mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
            <p class="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/800x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
          </div>
        </div>
        </section>
        `,
    });

    // Two columns with title, paragraph, image and button
    const heroTwoColumnsFullSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
<rect x="1" y="3" width="10" height="1.5" fill="#333"/>
<rect x="1" y="5" width="9" height="0.8" fill="#999"/>
<rect x="1" y="7" width="10" height="8" rx="1" fill="#23366A"/>
<rect x="13" y="3" width="10" height="1.5" fill="#333"/>
<rect x="13" y="5" width="9" height="0.8" fill="#999"/>
<rect x="13" y="7" width="10" height="8" rx="1" fill="#23366A"/>
</svg>`;

    blockManager.add("hero-two-columns-full", {
        label: "Dos Columnas Completas",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: heroTwoColumnsFullSvg,
        content: `
<section class="py-8 md:py-14 bg-white">
<div class="max-w-7xl mx-auto px-4">
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
  <!-- Columna 1 -->
  <div class="flex flex-col">
    <h3 class="text-2xl md:text-3xl font-bold text-primary mb-3">Título Columna 1</h3>
    <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
    <div class="relative mt-auto">
      <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
      <div class="absolute bottom-6 left-6">
        <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
          Ver más
          <i class="ri-arrow-right-line ml-2"></i>
        </a>
      </div>
    </div>
  </div>
  <!-- Columna 2 -->
  <div class="flex flex-col">
    <h3 class="text-2xl md:text-3xl font-bold text-primary mb-3">Título Columna 2</h3>
    <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
    <div class="relative mt-auto">
      <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
      <div class="absolute bottom-6 left-6">
        <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
          Ver más
          <i class="ri-arrow-right-line ml-2"></i>
        </a>
      </div>
    </div>
  </div>
</div>
</div>
</section>
`,
    });

    // Two columns with title, paragraph and image (no button)
    const heroTwoColumnsNoButtonSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
<rect x="1" y="3" width="10" height="1.5" fill="#333"/>
<rect x="1" y="5" width="9" height="0.8" fill="#999"/>
<rect x="1" y="7" width="10" height="10" rx="1" fill="#23366A"/>
<rect x="13" y="3" width="10" height="1.5" fill="#333"/>
<rect x="13" y="5" width="9" height="0.8" fill="#999"/>
<rect x="13" y="7" width="10" height="10" rx="1" fill="#23366A"/>
</svg>`;

    blockManager.add("hero-two-columns-no-button", {
        label: "Dos Columnas Sin Botón",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: heroTwoColumnsNoButtonSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <!-- Columna 1 -->
          <div class="flex flex-col">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-3">Título Columna 1</h3>
            <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            <div class="mt-auto">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-3">Título Columna 2</h3>
            <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            <div class="mt-auto">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
        </div>
        </div>
        </section>
        `,
    });

    // Two columns with title, image and button (no paragraph)
    const heroTwoColumnsNoParagraphSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="1" y="3" width="10" height="1.5" fill="#333"/>
    <rect x="1" y="5.5" width="10" height="10" rx="1" fill="#23366A"/>
    <rect x="13" y="3" width="10" height="1.5" fill="#333"/>
    <rect x="13" y="5.5" width="10" height="10" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-two-columns-no-paragraph", {
        label: "Dos Columnas Sin Párrafo",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: heroTwoColumnsNoParagraphSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <!-- Columna 1 -->
          <div class="flex flex-col">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6">Título Columna 1</h3>
            <div class="relative mt-auto">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
              <div class="absolute bottom-6 left-6">
                <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                  Ver más
                  <i class="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            </div>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6">Título Columna 2</h3>
            <div class="relative mt-auto">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
              <div class="absolute bottom-6 left-6">
                <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                  Ver más
                  <i class="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section>
        `,
    });

    // Two columns with title and image only (no paragraph, no button)
    const heroTwoColumnsMinimalSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="1" y="3" width="10" height="1.5" fill="#333"/>
    <rect x="1" y="5.5" width="10" height="12" rx="1" fill="#23366A"/>
    <rect x="13" y="3" width="10" height="1.5" fill="#333"/>
    <rect x="13" y="5.5" width="10" height="12" rx="1" fill="#23366A"/>
    </svg>`;

    blockManager.add("hero-two-columns-minimal", {
        label: "Dos Columnas Mínimo",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: heroTwoColumnsMinimalSvg,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <!-- Columna 1 -->
          <div class="flex flex-col">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6">Título Columna 1</h3>
            <div class="mt-auto">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6">Título Columna 2</h3>
            <div class="mt-auto">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
        </div>
        </div>
        </section>
        `,
    });

    // Credit card section with image on left side
    blockManager.add("hero-left-credit-card", {
        label: "Tarjeta con boton Izquierda",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="2" y="8" width="9" height="8" rx="1" fill="#23366A"/>
          <rect x="13" y="8" width="8" height="2" fill="#333"/>
          <rect x="13" y="16" width="5" height="2" rx="1" fill="#23366A"/>
        </svg>`,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2 flex justify-center">
              <div style="max-height: 300px; overflow: hidden; border-radius: 1rem;">
                <img src="https://via.placeholder.com/600x300/23366A/ffffff?text=Tarjeta+de+Credito" alt="Tarjeta de Crédito" class="w-full h-auto object-contain">
              </div>
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">Tarjeta de crédito clásica</h2>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Aplicar ahora
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `,
    });

    // Credit card section with image on right side
    blockManager.add("hero-right-credit-card", {
        label: "Tarjeta con boton Derecha",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="2" y="8" width="8" height="2" fill="#333"/>
          <rect x="2" y="16" width="5" height="2" rx="1" fill="#23366A"/>
          <rect x="13" y="8" width="9" height="8" rx="1" fill="#23366A"/>
        </svg>`,
        content: `
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2 flex justify-center">
              <div style="max-height: 300px; overflow: hidden; border-radius: 1rem;">
                <img src="https://via.placeholder.com/600x300/23366A/ffffff?text=Tarjeta+de+Credito" alt="Tarjeta de Crédito" class="w-full h-auto object-contain">
              </div>
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">Tarjeta de crédito clásica</h2>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Aplicar ahora
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `,
    });
}
