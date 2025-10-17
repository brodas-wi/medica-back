export default function loadGridBlock(editor) {
    const blockManager = editor.BlockManager;

    // Adds custom styles to the editor frame
    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            const customStyles = frame.contentDocument.createElement("style");
            customStyles.textContent = `
                .text-primary { color: #23366A !important; }
                .bg-primary { background-color: #23366A !important; }
                .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important; }
                .rounded-lg { border-radius: 0.5rem !important; }
                .transition-all { transition: all 0.3s ease !important; }
                .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; }
            `;
            frame.contentDocument.head.appendChild(customStyles);
        }
    });

    // Creates a contact card grid icon for the block panel
    const contactCardsGridSvg = `
    <svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#ffffff"/>
        
        <rect x="1" y="2" width="9" height="28" rx="0.8" fill="#f3f4f6"/>
        <rect x="1" y="2" width="9" height="12" rx="0.8" fill="#3b82f6"/>
        <circle cx="5.5" cy="18" r="2" fill="#ffffff" stroke="#3b82f6" stroke-width="0.4"/>
        <rect x="2" y="21" width="7" height="0.8" rx="0.2" fill="#9ca3af"/>
        <rect x="2" y="22.5" width="5" height="0.6" rx="0.2" fill="#d1d5db"/>
        <rect x="2" y="24.5" width="7" height="1.5" rx="0.4" fill="#3b82f6"/>
        <circle cx="3.5" cy="25.2" r="0.5" fill="#ffffff"/>
        
        <rect x="11.5" y="2" width="9" height="28" rx="0.8" fill="#f3f4f6"/>
        <rect x="11.5" y="2" width="9" height="12" rx="0.8" fill="#2563eb"/>
        <circle cx="16" cy="18" r="2" fill="#ffffff" stroke="#2563eb" stroke-width="0.4"/>
        <rect x="12.5" y="21" width="7" height="0.8" rx="0.2" fill="#9ca3af"/>
        <rect x="12.5" y="22.5" width="5" height="0.6" rx="0.2" fill="#d1d5db"/>
        <rect x="12.5" y="24.5" width="7" height="1.5" rx="0.4" fill="#2563eb"/>
        <circle cx="14" cy="25.2" r="0.5" fill="#ffffff"/>
        
        <rect x="22" y="2" width="9" height="28" rx="0.8" fill="#f3f4f6"/>
        <rect x="22" y="2" width="9" height="12" rx="0.8" fill="#23366A"/>
        <circle cx="26.5" cy="18" r="2" fill="#ffffff" stroke="#23366A" stroke-width="0.4"/>
        <rect x="23" y="21" width="7" height="0.8" rx="0.2" fill="#9ca3af"/>
        <rect x="23" y="22.5" width="5" height="0.6" rx="0.2" fill="#d1d5db"/>
        <rect x="23" y="24.5" width="7" height="1.5" rx="0.4" fill="#23366A"/>
        <circle cx="24.5" cy="25.2" r="0.5" fill="#ffffff"/>
        </svg>`;

    // Adds the contact cards grid block to the editor
    blockManager.add("contact-cards-grid", {
        label: "Tarjetas de Contacto",
        category: "Tarjetas",
        attributes: { class: "gjs-block-section" },
        media: contactCardsGridSvg,
        content: `
        <div class="py-8 md:py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-primary mb-8">Lorem ipsum</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white rounded-xl shadow-md overflow-hidden">
                        <img src="https://via.placeholder.com/400x300/cccccc/666666?text=Persona" alt="Contacto" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-primary mb-3">Soluciones</h3>
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-phone-fill text-primary text-xl bg-white rounded-full border-2 border-primary w-10 h-10 flex items-center justify-center"></i>
                                </div>
                                <div class="ml-4">
                                    <p class="text-sm font-medium text-gray-700">Lorem ipsum dolor:</p>
                                    <p class="text-gray-600">+503 0000-0000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-md overflow-hidden">
                        <img src="https://via.placeholder.com/400x300/cccccc/666666?text=Persona" alt="Contacto" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-primary mb-3">Canales</h3>
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-phone-fill text-primary text-xl bg-white rounded-full border-2 border-primary w-10 h-10 flex items-center justify-center"></i>
                                </div>
                                <div class="ml-4">
                                    <p class="text-sm font-medium text-gray-700">Lorem ipsum dolor:</p>
                                    <p class="text-gray-600">+503 0000-0000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-md overflow-hidden">
                        <img src="https://via.placeholder.com/400x300/cccccc/666666?text=Persona" alt="Contacto" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-primary mb-3">Educación</h3>
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <i class="ri-phone-fill text-primary text-xl bg-white rounded-full border-2 border-primary w-10 h-10 flex items-center justify-center"></i>
                                </div>
                                <div class="ml-4">
                                    <p class="text-sm font-medium text-gray-700">Lorem ipsum dolor:</p>
                                    <p class="text-gray-600">+503 0000-0000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
    });

    // Icon Cards Grid Block
    const iconCardsGridSvg = `
    <svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#ffffff"/>
        
        <rect x="1" y="2" width="14" height="13" rx="0.8" fill="#f9fafb" stroke="#e5e7eb" stroke-width="0.3"/>
        <circle cx="5" cy="6.5" r="2" fill="#3b82f6"/>
        <path d="M 4 6.5 L 6 6.5 M 5 5.5 L 5 7.5" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"/>
        <rect x="8" y="5" width="6" height="1" rx="0.3" fill="#23366A"/>
        <rect x="8" y="6.5" width="5" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="2" y="9" width="11" height="0.5" rx="0.2" fill="#d1d5db"/>
        <rect x="2" y="10" width="11" height="0.5" rx="0.2" fill="#d1d5db"/>
        <rect x="2" y="11" width="9" height="0.5" rx="0.2" fill="#d1d5db"/>
        
        <rect x="17" y="2" width="14" height="13" rx="0.8" fill="#f9fafb" stroke="#e5e7eb" stroke-width="0.3"/>
        <circle cx="21" cy="6.5" r="2" fill="#2563eb"/>
        <path d="M 20 6.5 L 22 6.5 M 21 5.5 L 21 7.5" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"/>
        <rect x="24" y="5" width="6" height="1" rx="0.3" fill="#23366A"/>
        <rect x="24" y="6.5" width="5" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="18" y="9" width="11" height="0.5" rx="0.2" fill="#d1d5db"/>
        <rect x="18" y="10" width="11" height="0.5" rx="0.2" fill="#d1d5db"/>
        <rect x="18" y="11" width="9" height="0.5" rx="0.2" fill="#d1d5db"/>
        
        <rect x="1" y="17" width="14" height="13" rx="0.8" fill="#f9fafb" stroke="#e5e7eb" stroke-width="0.3"/>
        <circle cx="5" cy="21.5" r="2" fill="#1e40af"/>
        <path d="M 4 21.5 L 6 21.5 M 5 20.5 L 5 22.5" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"/>
        <rect x="8" y="20" width="6" height="1" rx="0.3" fill="#23366A"/>
        <rect x="8" y="21.5" width="5" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="2" y="24" width="11" height="0.5" rx="0.2" fill="#d1d5db"/>
        <rect x="2" y="25" width="11" height="0.5" rx="0.2" fill="#d1d5db"/>
        <rect x="2" y="26" width="9" height="0.5" rx="0.2" fill="#d1d5db"/>
        
        <rect x="17" y="17" width="14" height="13" rx="0.8" fill="#f9fafb" stroke="#e5e7eb" stroke-width="0.3"/>
        <circle cx="21" cy="21.5" r="2" fill="#23366A"/>
        <path d="M 20 21.5 L 22 21.5 M 21 20.5 L 21 22.5" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"/>
        <rect x="24" y="20" width="6" height="1" rx="0.3" fill="#23366A"/>
        <rect x="24" y="21.5" width="5" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="18" y="24" width="11" height="0.5" rx="0.2" fill="#d1d5db"/>
        <rect x="18" y="25" width="11" height="0.5" rx="0.2" fill="#d1d5db"/>
        <rect x="18" y="26" width="9" height="0.5" rx="0.2" fill="#d1d5db"/>
        </svg>`;

    blockManager.add("icon-cards-grid", {
        label: "Tarjetas con Icono",
        category: "Tarjetas",
        attributes: { class: "gjs-block-section" },
        media: iconCardsGridSvg,
        content: `
            <div class="py-8 md:py-12 bg-white">
                <div class="max-w-7xl mx-auto px-4">
                    <h2 class="text-3xl font-bold text-primary mb-8">Lorem ipsum</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                        <div class="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 mr-4">
                                    <i class="ri-home-4-fill text-primary text-3xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor sit amet</h3>
                                    <p class="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 mr-4">
                                    <i class="ri-home-4-fill text-primary text-3xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor sit amet</h3>
                                    <p class="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 mr-4">
                                    <i class="ri-home-4-fill text-primary text-3xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor sit amet</h3>
                                    <p class="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 mr-4">
                                    <i class="ri-home-4-fill text-primary text-3xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor sit amet</h3>
                                    <p class="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `,
    });
}
