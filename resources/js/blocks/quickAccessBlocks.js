/**
 * Quick Access Carousel Block with direct inline onclick handlers to ensure script functionality persists after edits
 */
export default function loadQuickAccessBlocks(editor) {
    const blockManager = editor.BlockManager;

    // Register the block
    blockManager.add("quick-access-carousel", {
        label: "Accesos Rápidos",
        category: "Componentes",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="3" fill="#ffffff" stroke="#dddddd"/>
            <rect x="4" y="7" width="16" height="2" rx="1" fill="#23366A"/>
            <rect x="6" y="10" width="12" height="1" fill="#999999"/>
            <rect x="5" y="14" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <rect x="9" y="14" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <rect x="13" y="14" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <rect x="17" y="14" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <circle cx="3.5" cy="15" r="1" fill="#23366A"/>
            <circle cx="20.5" cy="15" r="1" fill="#23366A"/>
        </svg>`,
        content: `
        <section class="py-12 px-4 md:px-8 lg:px-16">
            <div class="bg-white shadow-lg rounded-3xl p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold text-primary text-center mb-3 md:mb-4">Accesos rápidos</h2>
                <p class="text-gray-500 text-center mb-2 max-w-3xl mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                
                <div class="relative max-w-6xl mx-auto px-6">
                    <div class="flex flex-nowrap gap-4 overflow-x-hidden whitespace-nowrap py-4 scroll-smooth justify-center" id="quick-access-carousel">
                        <a href="#" class="items-center gap-2 flex-shrink-0 inline-block whitespace-nowrap bg-white border-2 border-primary text-primary font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">
                            <i class="ri-megaphone-fill text-lg"></i>
                            Inscripción a promos
                        </a>

                        <a href="#" class="items-center gap-2 flex-shrink-0 inline-block whitespace-nowrap bg-white border-2 border-primary text-primary font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">
                            <i class="ri-shake-hands-fill text-lg"></i>
                            Afiliaciones
                        </a>

                        <a href="#" class="items-center gap-2 flex-shrink-0 inline-block whitespace-nowrap bg-white border-2 border-primary text-primary font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">
                            <i class="ri-calendar-event-fill text-lg"></i>
                            Inscripción eventos
                        </a>

                        <a href="#" class="items-center gap-2 flex-shrink-0 inline-block whitespace-nowrap bg-white border-2 border-primary text-primary font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">
                            <i class="ri-map-pin-fill text-lg"></i>
                            Ubicaciones
                        </a>

                        <a href="#" class="items-center gap-2 flex-shrink-0 inline-block whitespace-nowrap bg-white border-2 border-primary text-primary font-semibold py-3 px-6 md:px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-white">
                            <i class="ri-whatsapp-fill text-lg"></i>
                            WhatsApp
                        </a>
                    </div>
                    
                    <button onclick="document.getElementById('quick-access-carousel').scrollBy({left: -300, behavior: 'smooth'})" class="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-primary text-primary z-10 -ml-5 cursor-pointer">
                        <i class="ri-arrow-left-s-line text-xl"></i>
                    </button>
                    <button onclick="document.getElementById('quick-access-carousel').scrollBy({left: 300, behavior: 'smooth'})" class="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-primary text-primary z-10 -mr-5 cursor-pointer">
                        <i class="ri-arrow-right-s-line text-xl"></i>
                    </button>
                </div>
            </div>
        </section>
        `,
    });
}
