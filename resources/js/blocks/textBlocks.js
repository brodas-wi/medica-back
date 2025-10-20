// Text blocks for page builder with various layouts
export default function loadTextBlocks(editor) {
    const blockManager = editor.BlockManager;

    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            const customStyles = frame.contentDocument.createElement("style");
            customStyles.textContent = `
              .text-primary { color: #23366A !important; }
              .text-secondary { color: #333333 !important; }
          `;
            frame.contentDocument.head.appendChild(customStyles);
        }
    });

    // Centered text with title, subtitle and paragraph
    const textCenteredFullSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="6" y="4" width="12" height="2" fill="#23366A"/>
      <rect x="8" y="7" width="8" height="1" fill="#555"/>
      <rect x="4" y="10" width="16" height="1" fill="#888"/>
      <rect x="4" y="12" width="16" height="1" fill="#888"/>
    </svg>`;

    blockManager.add("text-centered-full", {
        label: "Texto Centrado Completo",
        category: "Texto",
        attributes: { class: "gjs-block-section" },
        media: textCenteredFullSvg,
        content: `
          <div class="py-4">
            <div class="max-w-4xl mx-auto px-4 text-center">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
          </div>
          `,
    });

    // Centered text with title and paragraph (no subtitle)
    const textCenteredNoSubtitleSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="6" y="5" width="12" height="2" fill="#23366A"/>
      <rect x="4" y="10" width="16" height="1" fill="#888"/>
      <rect x="4" y="12" width="16" height="1" fill="#888"/>
    </svg>`;

    blockManager.add("text-centered-no-subtitle", {
        label: "Texto Centrado Sin Subtítulo",
        category: "Texto",
        attributes: { class: "gjs-block-section" },
        media: textCenteredNoSubtitleSvg,
        content: `
          <div class="py-4">
            <div class="max-w-4xl mx-auto px-4 text-center">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
          </div>
          `,
    });

    // Two columns: title/subtitle left, paragraph right
    const textTwoColsLeftSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="8" height="2" fill="#23366A"/>
      <rect x="2" y="7" width="6" height="1" fill="#555"/>
      <rect x="12" y="4" width="10" height="1" fill="#888"/>
      <rect x="12" y="6" width="10" height="1" fill="#888"/>
      <rect x="12" y="8" width="10" height="1" fill="#888"/>
    </svg>`;

    blockManager.add("text-two-cols-left", {
        label: "Texto 2 Columnas Izq",
        category: "Texto",
        attributes: { class: "gjs-block-section" },
        media: textTwoColsLeftSvg,
        content: `
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
              <div class="flex flex-col md:flex-row gap-6 md:gap-12">
                <div class="w-full md:w-5/12">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
                  <h3 class="text-secondary text-xl md:text-2xl font-semibold">Subtítulo</h3>
                </div>
                <div class="w-full md:w-7/12">
                  <p class="text-gray-600 text-base md:text-lg leading-relaxed text-left md:text-right">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                </div>
              </div>
            </div>
          </div>
          `,
    });

    // Two columns: title left, paragraph right (no subtitle)
    const textTwoColsLeftNoSubtitleSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="5" width="8" height="2" fill="#23366A"/>
      <rect x="12" y="4" width="10" height="1" fill="#888"/>
      <rect x="12" y="6" width="10" height="1" fill="#888"/>
      <rect x="12" y="8" width="10" height="1" fill="#888"/>
    </svg>`;

    blockManager.add("text-two-cols-left-no-subtitle", {
        label: "Texto 2 Columnas Izq Sin Sub",
        category: "Texto",
        attributes: { class: "gjs-block-section" },
        media: textTwoColsLeftNoSubtitleSvg,
        content: `
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
              <div class="flex flex-col md:flex-row gap-6 md:gap-12">
                <div class="w-full md:w-5/12">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Título Principal</h2>
                </div>
                <div class="w-full md:w-7/12">
                  <p class="text-gray-600 text-base md:text-lg leading-relaxed text-left md:text-right">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                </div>
              </div>
            </div>
          </div>
          `,
    });

    // Two columns: paragraph left, title/subtitle right
    const textTwoColsRightSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="10" height="1" fill="#888"/>
      <rect x="2" y="6" width="10" height="1" fill="#888"/>
      <rect x="2" y="8" width="10" height="1" fill="#888"/>
      <rect x="14" y="4" width="8" height="2" fill="#23366A"/>
      <rect x="14" y="7" width="6" height="1" fill="#555"/>
    </svg>`;

    blockManager.add("text-two-cols-right", {
        label: "Texto 2 Columnas Der",
        category: "Texto",
        attributes: { class: "gjs-block-section" },
        media: textTwoColsRightSvg,
        content: `
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
              <div class="flex flex-col md:flex-row-reverse gap-6 md:gap-12">
                <div class="w-full md:w-5/12">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
                  <h3 class="text-secondary text-xl md:text-2xl font-semibold">Subtítulo</h3>
                </div>
                <div class="w-full md:w-7/12">
                  <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                </div>
              </div>
            </div>
          </div>
          `,
    });

    // Two columns: paragraph left, title right (no subtitle)
    const textTwoColsRightNoSubtitleSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="10" height="1" fill="#888"/>
      <rect x="2" y="6" width="10" height="1" fill="#888"/>
      <rect x="2" y="8" width="10" height="1" fill="#888"/>
      <rect x="14" y="5" width="8" height="2" fill="#23366A"/>
    </svg>`;

    blockManager.add("text-two-cols-right-no-subtitle", {
        label: "Texto 2 Columnas Der Sin Sub",
        category: "Texto",
        attributes: { class: "gjs-block-section" },
        media: textTwoColsRightNoSubtitleSvg,
        content: `
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
              <div class="flex flex-col md:flex-row-reverse gap-6 md:gap-12">
                <div class="w-full md:w-5/12">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Título Principal</h2>
                </div>
                <div class="w-full md:w-7/12">
                  <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                </div>
              </div>
            </div>
          </div>
          `,
    });
}
