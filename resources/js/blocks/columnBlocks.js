// Column Blocks - Creates simple column sections with various layouts and content types
export default function loadColumnBlocks(editor) {
    const blockManager = editor.BlockManager;

    // White background column block
    blockManager.add("white-column-block", {
        label: "Columna Blanca",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
        </svg>`,
        content: `
        <section class="py-8 md:py-14 bg-white">
            <div class="max-w-7xl mx-auto px-4" style="min-height: 200px;">
                <!-- Contenido de la columna -->
                <div class="h-full flex items-center justify-center text-gray-400">
                    <p>Arrastra componentes aquí</p>
                </div>
            </div>
        </section>
        `,
    });

    // Primary (blue) background column block
    blockManager.add("primary-column-block", {
        label: "Columna Azul",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#23366A"/>
        </svg>`,
        content: `
        <section class="py-8 md:py-14 bg-primary">
            <div class="max-w-7xl mx-auto px-4" style="min-height: 200px;">
                <!-- Contenido de la columna -->
                <div class="h-full flex items-center justify-center text-white/70">
                    <p>Arrastra componentes aquí</p>
                </div>
            </div>
        </section>
        `,
    });

    // Two columns with text and bullet lists
    blockManager.add("two-columns-list-block", {
        label: "Dos Columnas con Listas",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="9" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
            <rect x="13" y="4" width="9" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
            <circle cx="3.5" cy="7" r="0.5" fill="#23366A"/>
            <rect x="4.5" y="6.5" width="5" height="1" rx="0.5" fill="#666666"/>
            <circle cx="3.5" cy="9" r="0.5" fill="#23366A"/>
            <rect x="4.5" y="8.5" width="5" height="1" rx="0.5" fill="#666666"/>
            <circle cx="14.5" cy="7" r="0.5" fill="#23366A"/>
            <rect x="15.5" y="6.5" width="5" height="1" rx="0.5" fill="#666666"/>
            <circle cx="14.5" cy="9" r="0.5" fill="#23366A"/>
            <rect x="15.5" y="8.5" width="5" height="1" rx="0.5" fill="#666666"/>
        </svg>`,
        content: `
        <section class="py-8 md:py-14 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-1/2">
                        <h3 class="text-2xl font-bold text-primary mb-4">Titulo</h3>
                        <ul class="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Lorem ipsum dolor sit amet, consectetur.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur.</li>
                        </ul>
                    </div>
                    <div class="w-full md:w-1/2">
                        <h3 class="text-2xl font-bold text-primary mb-4">Titulo</h3>
                        <ul class="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Lorem ipsum dolor sit amet, consectetur.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        `,
    });

    // Two columns with paragraphs
    blockManager.add("two-columns-text-block", {
        label: "Dos Columnas con Párrafos",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="9" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
            <rect x="13" y="4" width="9" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
            <rect x="3" y="6" width="7" height="1" fill="#23366A"/>
            <rect x="3" y="8" width="7" height="0.8" fill="#888888"/>
            <rect x="3" y="9.5" width="7" height="0.8" fill="#888888"/>
            <rect x="3" y="11" width="7" height="0.8" fill="#888888"/>
            <rect x="14" y="6" width="7" height="1" fill="#23366A"/>
            <rect x="14" y="8" width="7" height="0.8" fill="#888888"/>
            <rect x="14" y="9.5" width="7" height="0.8" fill="#888888"/>
            <rect x="14" y="11" width="7" height="0.8" fill="#888888"/>
        </svg>`,
        content: `
        <section class="py-8 md:py-14 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-1/2">
                        <h3 class="text-2xl font-bold text-primary mb-4">Titulo</h3>
                        <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
                        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
                    </div>
                    <div class="w-full md:w-1/2">
                        <h3 class="text-2xl font-bold text-primary mb-4">Titulo</h3>
                        <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
                        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
                    </div>
                </div>
            </div>
        </section>
        `,
    });

    // One column with title, subtitle and list
    blockManager.add("one-column-list-block", {
        label: "Una Columna con Lista",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
            <rect x="3" y="6" width="10" height="1.5" fill="#23366A"/>
            <rect x="3" y="8.5" width="8" height="1" fill="#666666"/>
            <circle cx="3.5" cy="11.5" r="0.5" fill="#23366A"/>
            <rect x="4.5" y="11" width="15" height="1" rx="0.5" fill="#888888"/>
            <circle cx="3.5" cy="13.5" r="0.5" fill="#23366A"/>
            <rect x="4.5" y="13" width="15" height="1" rx="0.5" fill="#888888"/>
            <circle cx="3.5" cy="15.5" r="0.5" fill="#23366A"/>
            <rect x="4.5" y="15" width="15" height="1" rx="0.5" fill="#888888"/>
        </svg>`,
        content: `
        <section class="py-8 md:py-14 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-primary mb-2">Titulo principal</h2>
                <h3 class="text-xl font-semibold text-gray-700 mb-6">Subtitulo*</h3>
                <ul class="list-disc pl-5 space-y-3 text-gray-600">
                    <li>Lorem ipsum dolor sit amet, consectetur.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur.</li>
                </ul>
                <p class="mt-6 text-gray-600 text-sm">* Para más información, términos y condiciones visita <a href="http://www.mastercad.com" class="text-primary hover:underline">www.mastercad.com</a></p>
            </div>
        </section>
        `,
    });

    // One column with title, subtitle and links
    blockManager.add("one-column-links-block", {
        label: "Una Columna con Enlaces",
        category: "Columnas",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
            <rect x="3" y="6" width="10" height="1.5" fill="#23366A"/>
            <rect x="3" y="8.5" width="8" height="1" fill="#666666"/>
            <rect x="4" y="11" width="8" height="1.2" rx="0.6" fill="#23366A"/>
            <rect x="4" y="13.5" width="10" height="1.2" rx="0.6" fill="#23366A"/>
            <rect x="4" y="16" width="9" height="1.2" rx="0.6" fill="#23366A"/>
        </svg>`,
        content: `
        <section class="py-8 md:py-14 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-primary mb-2">Título principal</h2>
                <h3 class="text-xl font-semibold text-gray-700 mb-6">Subtítulo informativo*</h3>
                <ul class="space-y-3">
                    <li>
                        Lorem ipsum dolor sit amet <a href="#" class="text-link">consectetur</a> adipiscing elit sed do eiusmod.
                    </li>
                    <li>
                        Ut enim ad minim veniam quis <a href="#" class="text-link">nostrud</a> exercitation ullamco laboris nisi.
                    </li>
                    <li>
                        Duis aute irure dolor in <a href="#" class="text-link">reprehenderit</a> in voluptate velit esse cillum.
                    </li>
                    <li>
                        Excepteur sint occaecat <a href="#" class="text-link">cupidatat</a> non proident sunt in culpa qui officia.
                    </li>
                    <li>
                        Sed ut perspiciatis unde omnis iste <a href="#" class="text-link">accusantium</a> doloremque laudantium.
                    </li>
                </ul>
                <style>
                    .text-link {
                        color: #23366A;
                        font-weight: 600;
                        text-decoration: none;
                        transition: all 0.2s ease;
                    }
                    .text-link:hover {
                        text-decoration: underline;
                    }
                </style>
            </div>
        </section>
        `,
    });
}
