export default function loadIconBlocks(editor) {
    const blockManager = editor.BlockManager;

    // Basic Icon Block - Simple icon without container
    blockManager.add("icon-block", {
        label: "Icono",
        category: "Elementos",
        content: '<i class="ri-home-line text-2xl text-primary"></i>',
        media: `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#23366A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
    });

    // Square Icon Container Block - Primary background with white icon
    blockManager.add("icon-container-primary", {
        label: "Icono en Azul",
        category: "Elementos",
        content: `
          <div class="flex items-center justify-center w-12 h-12 bg-primary rounded-full border-2 border-primary">
            <i class="ri-star-line text-2xl text-white"></i>
          </div>
        `,
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="2" y="2" width="20" height="20" rx="10" fill="#23366A"/>
          <path d="M12 7l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="white"/>
        </svg>`,
    });

    // White Icon Container Block - White background with primary icon and border
    blockManager.add("icon-container-white", {
        label: "Icono en Blanco",
        category: "Elementos",
        content: `
          <div class="flex items-center justify-center w-10 h-10 bg-white rounded-full border-2 border-primary">
            <i class="ri-star-line text-xl text-primary"></i>
          </div>
        `,
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="2" y="2" width="20" height="20" rx="10" fill="white" stroke="#23366A" stroke-width="2"/>
          <path d="M12 7l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="#23366A"/>
        </svg>`,
    });

    // Badge with icon and text - Primary version
    blockManager.add("icon-badge-primary", {
        label: "Badge con Icono Azul",
        category: "Elementos",
        content: `
          <div class="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full border-2 border-primary">
            <i class="ri-shield-check-line mr-2 text-lg"></i>
            <span>Texto del Badge</span>
          </div>
        `,
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="2" y="8" width="20" height="8" rx="4" fill="#23366A"/>
          <circle cx="7" cy="12" r="2" fill="white"/>
          <rect x="10" y="11" width="8" height="2" rx="1" fill="white"/>
        </svg>`,
    });

    // Badge with icon and text - White version with border
    blockManager.add("icon-badge-white", {
        label: "Badge con Icono Blanco",
        category: "Elementos",
        content: `
          <div class="inline-flex items-center justify-center px-4 py-2 bg-white text-primary rounded-full border-2 border-primary">
            <i class="ri-shield-check-line mr-2 text-lg"></i>
            <span>Texto del Badge</span>
          </div>
        `,
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="2" y="8" width="20" height="8" rx="4" fill="white" stroke="#23366A" stroke-width="2"/>
          <circle cx="7" cy="12" r="2" fill="#23366A"/>
          <rect x="10" y="11" width="8" height="2" rx="1" fill="#23366A"/>
        </svg>`,
    });
}
