import { showMediaSelector } from "../utils/mediaSelector";

export default function loadBannerBlocks(editor) {
    const blockManager = editor.BlockManager;

    const bannerSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="3" width="20" height="14" rx="2" fill="#23366A" />
      <circle cx="6" cy="6" r="1" fill="white" />
      <circle cx="12" cy="6" r="1" fill="white" />
      <circle cx="18" cy="6" r="1" fill="white" />
      <rect x="4" y="9" width="16" height="2" fill="white" />
      <rect x="6" y="12" wrap="12" height="1" fill="white" />
    </svg>`;

    const bannerSliderSvg = `<svg viewBox="0 0 32 32" width="32" height="32">
    <defs>
        <linearGradient id="simpleBannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#6b7280;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#4b5563;stop-opacity:1" />
        </linearGradient>
    </defs>
    
    <rect width="32" height="32" fill="#f9fafb"/>
    
    <rect x="2" y="5" width="28" height="18" rx="1.5" fill="url(#simpleBannerGrad)"/>
    
    <rect x="2" y="5" width="28" height="18" rx="1.5" fill="rgba(0,0,0,0.15)"/>
    
    <rect x="4" y="18" width="12" height="3.5" rx="0.5" fill="rgba(255,255,255,0.9)"/>
    <rect x="4.5" y="19" width="8" height="1" rx="0.3" fill="#4b5563"/>
    
    <circle cx="13" cy="27" r="1" fill="white" stroke="#4b5563" stroke-width="0.4"/>
    <circle cx="16" cy="27" r="1" fill="#4b5563"/>
    <circle cx="19" cy="27" r="1" fill="white" stroke="#4b5563" stroke-width="0.4"/>
    </svg>`;

    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            // Add the cards slider initialization script
            const cardsSliderScript =
                frame.contentDocument.createElement("script");
            cardsSliderScript.textContent = `
                function initCardsSliders() {
                    document.querySelectorAll('.cards-slider-container').forEach(container => {
                        const slider = container.querySelector('.cards-slider');
                        const slides = container.querySelectorAll('.cards-slide');
                        const dotsContainer = container.querySelector('.cards-slider-dots');
                        
                        let currentPage = 0;
                        let totalPages = 0;
                        
                        function getVisibleSlides() {
                            if (window.innerWidth >= 1280) return 4;
                            if (window.innerWidth >= 1024) return 3;
                            if (window.innerWidth >= 768) return 2;
                            return 1;
                        }
                        
                        function getTotalPages() {
                            return Math.ceil(slides.length / getVisibleSlides());
                        }
                        
                        function getSlideWidth() {
                            return 100 / getVisibleSlides();
                        }
                        
                        function generateDots() {
                            dotsContainer.innerHTML = '';
                            totalPages = getTotalPages();
                            
                            for (let i = 0; i < totalPages; i++) {
                                const dot = document.createElement('button');
                                dot.className = 'cards-slider-dot w-3 h-3 rounded-full mx-1 transition-all duration-300 ' + (i === currentPage ? 'active bg-primary' : 'bg-gray-300');
                                dot.setAttribute('data-index', i);
                                dot.setAttribute('aria-label', 'Página ' + (i + 1));
                                
                                dot.addEventListener('click', function() {
                                    goToPage(i);
                                });
                                
                                dotsContainer.appendChild(dot);
                            }
                            
                            if (totalPages <= 1) {
                                dotsContainer.style.display = 'none';
                            } else {
                                dotsContainer.style.display = 'flex';
                            }
                        }
                        
                        function setSlideWidths() {
                            const width = getSlideWidth();
                            slides.forEach(slide => {
                                slide.style.width = width + '%';
                            });
                        }
                        
                        function goToPage(pageIndex) {
                            if (pageIndex < 0 || pageIndex >= totalPages) return;
                            
                            currentPage = pageIndex;
                            const visibleSlides = getVisibleSlides();
                            const offset = pageIndex * visibleSlides * -100;
                            slider.style.transform = 'translateX(' + offset + '%)';
                            
                            const dots = container.querySelectorAll('.cards-slider-dot');
                            dots.forEach((dot, i) => {
                                if (i === pageIndex) {
                                    dot.classList.add('active', 'bg-primary');
                                    dot.classList.remove('bg-gray-300');
                                } else {
                                    dot.classList.remove('active', 'bg-primary');
                                    dot.classList.add('bg-gray-300');
                                }
                            });
                        }
                        
                        function init() {
                            setSlideWidths();
                            generateDots();
                            goToPage(0);
                        }
                        
                        init();
                        
                        window.addEventListener('resize', function() {
                            const oldVisibleSlides = getVisibleSlides();
                            setSlideWidths();
                            generateDots();
                            
                            const newPage = Math.floor((currentPage * oldVisibleSlides) / getVisibleSlides());
                            goToPage(Math.min(newPage, totalPages - 1));
                        });
                    });
                }
                
                document.addEventListener('DOMContentLoaded', function() {
                    initCardsSliders();
                });
                
                if (document.readyState === 'complete' || document.readyState === 'interactive') {
                    setTimeout(initCardsSliders, 100);
                }
            `;
            frame.contentDocument.body.appendChild(cardsSliderScript);
        }
    });

    editor.DomComponents.addType("configurable-banner", {
        model: {
            defaults: {
                name: "Banner Configurable",
                tagName: "section",
                droppable: false,
                traits: [
                    {
                        type: "button",
                        label: "Banner",
                        text: "Configurar",
                        command: "open-banner-config",
                        name: "configBanners",
                    },
                ],
                attributes: {
                    class: "py-8 md:py-14 bg-white",
                    "data-banners": "[]",
                },
            },
            init() {
                this.on(
                    "change:attributes:data-banners",
                    this.updateBannerHTML,
                );
                setTimeout(() => this.updateBannerHTML(), 50);
            },
            updateBannerHTML() {
                try {
                    const bannersAttr = this.getAttributes()["data-banners"];
                    const banners = bannersAttr ? JSON.parse(bannersAttr) : [];

                    if (banners.length === 0) {
                        banners.push({
                            title: "Educación financiera",
                            backgroundImage:
                                "https://via.placeholder.com/1200x400/cccccc/23366A?text=Banner+Configurable",
                        });
                    }

                    let slidesHTML = "";
                    let dotsHTML = "";

                    banners.forEach((banner, index) => {
                        slidesHTML += `
                        <div class="banner-slide" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('${banner.backgroundImage}'); background-size: cover; background-position: center; display: ${index === 0 ? "flex" : "none"}; align-items: flex-end; padding: 2rem; border-radius: 1rem;">
                            <div style="background-color: rgba(255, 255, 255, 0.85); padding: 0.25rem 1rem; border-radius: 0.5rem; backdrop-filter: blur(4px); max-width: 80%;">
                                <h2 style="color: #23366A; font-size: 2.5rem; font-weight: bold; margin: 0;">${banner.title}</h2>
                            </div>
                        </div>
                        `;
                    });

                    let dotStyles = `
                    <style>
                        .banner-dot {
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            background-color: white;
                            border: 2px solid #23366A;
                            margin: 0 5px;
                            cursor: pointer;
                            outline: none;
                        }
                        .banner-dot.active {
                            background-color: #23366A !important;
                        }
                    </style>
                    `;

                    banners.forEach((_, index) => {
                        dotsHTML += `
                        <button id="banner-dot-${index}" class="banner-dot ${index === 0 ? "active" : ""}" data-index="${index}"></button>
                        `;
                    });

                    const innerHTML = `
                    <div class="max-w-7xl mx-auto px-4">
                        ${dotStyles}
                        <div class="relative" style="height: 400px; margin-bottom: 2rem;">
                            <div class="banner-slides-container" style="width: 100%; height: 100%; position: relative; overflow: hidden; border-radius: 1rem;">
                                ${slidesHTML}
                            </div>
                        </div>
                        <div class="banner-dots-container" style="display: flex; justify-content: center; margin-top: -1rem; margin-bottom: 1rem;">
                            ${dotsHTML}
                        </div>
                    </div>
                    `;

                    this.set("content", innerHTML);

                    setTimeout(() => {
                        const view = this.getView();
                        if (view) {
                            const el = view.el;
                            if (el) {
                                const slides =
                                    el.querySelectorAll(".banner-slide");
                                const dots = el.querySelectorAll(".banner-dot");
                                const slidesCount = slides.length;
                                let currentSlide = 0;
                                let slideInterval;

                                function goToSlide(index) {
                                    if (slideInterval) {
                                        clearInterval(slideInterval);
                                    }

                                    slides.forEach((slide) => {
                                        slide.classList.remove(
                                            "active",
                                            "fadeIn",
                                        );
                                        slide.classList.add("fadeOut");
                                        setTimeout(() => {
                                            slide.style.display = "none";
                                        }, 500);
                                    });

                                    dots.forEach((dot) => {
                                        dot.classList.remove("active");
                                    });

                                    setTimeout(() => {
                                        slides[index].style.display = "flex";
                                        slides[index].classList.remove(
                                            "fadeOut",
                                        );
                                        slides[index].classList.add(
                                            "active",
                                            "fadeIn",
                                        );
                                        dots[index].classList.add("active");

                                        currentSlide = index;

                                        if (slidesCount > 1) {
                                            startSlideTimer();
                                        }
                                    }, 500);
                                }

                                function nextSlide() {
                                    const next =
                                        (currentSlide + 1) % slidesCount;
                                    goToSlide(next);
                                }

                                function startSlideTimer() {
                                    slideInterval = setInterval(() => {
                                        nextSlide();
                                    }, 5000);
                                }

                                dots.forEach((dot, index) => {
                                    dot.addEventListener("click", () => {
                                        goToSlide(index);
                                    });
                                });

                                if (slidesCount > 1) {
                                    startSlideTimer();
                                }
                            }
                        }
                    }, 300);
                } catch (error) {
                    console.error("Error updating banner HTML:", error);
                }
            },
        },
        view: {
            events: {
                dblclick: "openConfig",
            },
            openConfig() {
                editor.runCommand("open-banner-config", {
                    component: this.model,
                });
            },
        },
    });

    editor.Commands.add("open-banner-config", {
        run(editor, sender, options = {}) {
            const component = options.component || editor.getSelected();
            if (!component) return;

            try {
                const bannersAttr = component.getAttributes()["data-banners"];
                const banners = bannersAttr ? JSON.parse(bannersAttr) : [];
                openBannerConfigModal(component, banners);
            } catch (error) {
                console.error("Error opening banner config:", error);
            }
        },
    });

    function openBannerConfigModal(component, banners = []) {
        window.editor = editor;

        let bannersHTML = "";

        banners.forEach((banner, index) => {
            bannersHTML += `
            <div class="banner-item mb-4 p-3 border rounded" data-index="${index}">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-bold">Banner ${index + 1}</h3>
                    <button type="button" class="delete-banner text-red-500 hover:text-red-700" data-index="${index}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
                <div class="mb-2">
                    <label class="block text-sm font-medium mb-1">Título</label>
                    <input type="text" class="banner-title w-full px-3 py-2 border rounded" value="${banner.title}" placeholder="Título del banner">
                </div>
                <div class="mb-2">
                    <label class="block text-sm font-medium mb-1">Imagen de fondo</label>
                    <input type="text" class="banner-image w-full px-3 py-2 border rounded" value="${banner.backgroundImage}" placeholder="URL de la imagen de fondo">
                    <button type="button" class="select-image mt-2 px-4 py-2 bg-primary text-white rounded-full">
                        Seleccionar imagen
                    </button>
                </div>
            </div>
        `;
        });

        const modalContent = `
            <div class="banner-config-container">
                <div class="banners-list mb-4">
                    ${bannersHTML}
                </div>
                <button type="button" id="add-banner" class="px-4 py-2 bg-primary text-white rounded-full">
                    <i class="ri-add-line mr-1"></i> Agregar banner
                </button>
            </div>
        `;

        const Swal = window.Swal || require("sweetalert2").default;

        Swal.fire({
            title: "Configuración de Banners",
            html: modalContent,
            width: "800px",
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#23366A",
            cancelButtonColor: "#e74c3c",
            didOpen: () => {
                const addBannerBtn =
                    Swal.getPopup().querySelector("#add-banner");
                if (addBannerBtn) {
                    addBannerBtn.addEventListener("click", () => {
                        const bannersList =
                            Swal.getPopup().querySelector(".banners-list");
                        const newIndex =
                            bannersList.querySelectorAll(".banner-item").length;

                        const newBannerHTML = `
                        <div class="banner-item mb-4 p-3 border rounded" data-index="${newIndex}">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="text-lg font-bold">Banner ${newIndex + 1}</h3>
                                <button type="button" class="delete-banner text-red-500 hover:text-red-700" data-index="${newIndex}">
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium mb-1">Título</label>
                                <input type="text" class="banner-title w-full px-3 py-2 border rounded" value="" placeholder="Título del banner">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium mb-1">Imagen de fondo</label>
                                <input type="text" class="banner-image w-full px-3 py-2 border rounded" value="" placeholder="URL de la imagen de fondo">
                                <button type="button" class="select-image mt-2 px-4 py-2 bg-primary text-white rounded-full">
                                    Seleccionar imagen
                                </button>
                            </div>
                        </div>
                    `;

                        bannersList.insertAdjacentHTML(
                            "beforeend",
                            newBannerHTML,
                        );
                        attachImageSelectors();
                        attachDeleteHandlers();
                    });
                }

                attachImageSelectors();
                attachDeleteHandlers();

                function attachImageSelectors() {
                    const selectImageBtns =
                        Swal.getPopup().querySelectorAll(".select-image");
                    selectImageBtns.forEach((btn) => {
                        const newBtn = btn.cloneNode(true);
                        btn.parentNode.replaceChild(newBtn, btn);

                        newBtn.addEventListener("click", (e) => {
                            const bannerItem = e.target.closest(".banner-item");
                            const imageInput =
                                bannerItem.querySelector(".banner-image");
                            const currentBanners = collectCurrentBanners();

                            Swal.close();

                            setTimeout(() => {
                                showMediaSelector("image", (mediaData) => {
                                    setTimeout(() => {
                                        openBannerConfigModal(
                                            component,
                                            currentBanners,
                                        );

                                        setTimeout(() => {
                                            const popupBannerItems =
                                                Swal.getPopup().querySelectorAll(
                                                    ".banner-item",
                                                );
                                            const index = parseInt(
                                                bannerItem.getAttribute(
                                                    "data-index",
                                                ),
                                            );
                                            if (popupBannerItems[index]) {
                                                const newImageInput =
                                                    popupBannerItems[
                                                        index
                                                    ].querySelector(
                                                        ".banner-image",
                                                    );
                                                if (
                                                    newImageInput &&
                                                    mediaData &&
                                                    mediaData.src
                                                ) {
                                                    newImageInput.value =
                                                        mediaData.src;
                                                }
                                            }
                                        }, 300);
                                    }, 100);
                                });
                            }, 200);
                        });
                    });
                }

                function collectCurrentBanners() {
                    if (!Swal.getPopup()) return banners;

                    const bannerItems =
                        Swal.getPopup().querySelectorAll(".banner-item");
                    const currentBanners = [];

                    bannerItems.forEach((item) => {
                        const titleInput = item.querySelector(".banner-title");
                        const imageInput = item.querySelector(".banner-image");

                        currentBanners.push({
                            title: titleInput ? titleInput.value || "" : "",
                            backgroundImage: imageInput
                                ? imageInput.value || ""
                                : "",
                        });
                    });

                    return currentBanners;
                }

                function attachDeleteHandlers() {
                    const deleteBtns =
                        Swal.getPopup().querySelectorAll(".delete-banner");
                    deleteBtns.forEach((btn) => {
                        const newBtn = btn.cloneNode(true);
                        btn.parentNode.replaceChild(newBtn, btn);

                        newBtn.addEventListener("click", (e) => {
                            const bannerItem = e.target.closest(".banner-item");
                            bannerItem.remove();
                            updateBannerIndices();
                        });
                    });
                }

                function updateBannerIndices() {
                    const bannerItems =
                        Swal.getPopup().querySelectorAll(".banner-item");
                    bannerItems.forEach((item, index) => {
                        item.setAttribute("data-index", index);
                        const title = item.querySelector("h3");
                        if (title) {
                            title.textContent = `Banner ${index + 1}`;
                        }
                        const deleteBtn = item.querySelector(".delete-banner");
                        if (deleteBtn) {
                            deleteBtn.setAttribute("data-index", index);
                        }
                    });
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const bannerItems =
                    Swal.getPopup().querySelectorAll(".banner-item");
                const updatedBanners = [];

                bannerItems.forEach((item) => {
                    const titleInput = item.querySelector(".banner-title");
                    const imageInput = item.querySelector(".banner-image");

                    if (titleInput && imageInput && imageInput.value) {
                        updatedBanners.push({
                            title: titleInput.value || "",
                            backgroundImage: imageInput.value || "",
                        });
                    }
                });

                component.set("attributes", {
                    ...component.getAttributes(),
                    "data-banners": JSON.stringify(updatedBanners),
                });

                window.showAlert &&
                    window.showAlert(
                        "Configuración de banners guardada",
                        "success",
                    );
            }
        });
    }

    blockManager.add("configurable-banner", {
        label: "Banner Simple",
        category: "Banners",
        attributes: { class: "gjs-block-section" },
        media: bannerSliderSvg,
        content: {
            type: "configurable-banner",
            attributes: {
                class: "py-8 md:py-14 bg-white",
                "data-banners": JSON.stringify([
                    {
                        title: "Educación financiera",
                        backgroundImage:
                            "https://via.placeholder.com/1200x400/cccccc/23366A?text=Banner+Configurable",
                    },
                ]),
            },
        },
    });

    // Credit cards horizontal slider with custom scrollbar and styled buttons
    const creditCardsSliderSvg = `
    <svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#ffffff"/>
        
        <rect x="2" y="7" width="6" height="8" rx="0.8" fill="#e5e7eb"/>
        <rect x="2" y="7" width="6" height="4" rx="0.8" fill="#23366A"/>
        <rect x="2.5" y="12" width="5" height="0.8" rx="0.2" fill="#9ca3af"/>
        <rect x="2.5" y="13.2" width="3" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="2.5" y="14.5" width="2.5" height="1" rx="0.5" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="9" y="7" width="6" height="8" rx="0.8" fill="#e5e7eb"/>
        <rect x="9" y="7" width="6" height="4" rx="0.8" fill="#23366A"/>
        <rect x="9.5" y="12" width="5" height="0.8" rx="0.2" fill="#9ca3af"/>
        <rect x="9.5" y="13.2" width="3" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="9.5" y="14.5" width="2.5" height="1" rx="0.5" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="16" y="7" width="6" height="8" rx="0.8" fill="#e5e7eb"/>
        <rect x="16" y="7" width="6" height="4" rx="0.8" fill="#23366A"/>
        <rect x="16.5" y="12" width="5" height="0.8" rx="0.2" fill="#9ca3af"/>
        <rect x="16.5" y="13.2" width="3" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="16.5" y="14.5" width="2.5" height="1" rx="0.5" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="23" y="7" width="6" height="8" rx="0.8" fill="#e5e7eb" opacity="0.5"/>
        <rect x="23" y="7" width="6" height="4" rx="0.8" fill="#23366A" opacity="0.5"/>
        
        <rect x="2" y="17" width="28" height="1.5" rx="0.75" fill="#f0f0f0"/>
        <rect x="2" y="17" width="12" height="1.5" rx="0.75" fill="#23366A"/>
    </svg>`;

    blockManager.add("credit-cards-slider", {
        label: "Slider de tarjetas",
        category: "Tarjetas",
        attributes: { class: "gjs-block-section" },
        media: creditCardsSliderSvg,
        content: `
        <div class="py-8 md:py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-primary mb-8">Lorem ipsum</h2>
                
                <div class="relative cards-slider-container">
                    <div class="overflow-hidden">
                        <div class="cards-slider flex transition-transform duration-300 ease-in-out">
                            <div class="cards-slide w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3 mb-4 flex-shrink-0">
                                <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                                    <img src="https://via.placeholder.com/600x350/23366A/ffffff?text=Tarjeta+de+Crédito" alt="Tarjeta de Crédito" class="w-full h-44 object-cover">
                                </div>
                                <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                                <p class="text-gray-600 mb-4 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                                <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm">
                                    Ver más
                                    <i class="ri-arrow-right-line text-xl"></i>
                                </a>
                            </div>
                            
                            <div class="cards-slide w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3 mb-4 flex-shrink-0">
                                <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                                    <img src="https://via.placeholder.com/600x350/23366A/ffffff?text=Tarjeta+de+Crédito" alt="Tarjeta de Crédito" class="w-full h-44 object-cover">
                                </div>
                                <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                                <p class="text-gray-600 mb-4 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                                <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm">
                                    Ver más
                                    <i class="ri-arrow-right-line text-xl"></i>
                                </a>
                            </div>
                            
                            <div class="cards-slide w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3 mb-4 flex-shrink-0">
                                <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                                    <img src="https://via.placeholder.com/600x350/23366A/ffffff?text=Tarjeta+de+Crédito" alt="Tarjeta de Crédito" class="w-full h-44 object-cover">
                                </div>
                                <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                                <p class="text-gray-600 mb-4 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                                <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm">
                                    Ver más
                                    <i class="ri-arrow-right-line text-xl"></i>
                                </a>
                            </div>
                            
                            <div class="cards-slide w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3 mb-4 flex-shrink-0">
                                <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                                    <img src="https://via.placeholder.com/600x350/23366A/ffffff?text=Tarjeta+de+Crédito" alt="Tarjeta de Crédito" class="w-full h-44 object-cover">
                                </div>
                                <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                                <p class="text-gray-600 mb-4 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                                <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm">
                                    Ver más
                                    <i class="ri-arrow-right-line text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cards-slider-dots flex justify-center mt-8"></div>
                    
                    <style>
                    .cards-slider-dot.active {
                        background-color: #23366A;
                        width: 14px;
                        border-radius: 7px;
                    }
                    </style>
                </div>
            </div>
        </div>
        
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            initCardsSliders();
        });
        
        function initCardsSliders() {
            document.querySelectorAll('.cards-slider-container').forEach(container => {
                const slider = container.querySelector('.cards-slider');
                const slides = container.querySelectorAll('.cards-slide');
                const dotsContainer = container.querySelector('.cards-slider-dots');
                
                let currentPage = 0;
                let totalPages = 0;
                
                function getVisibleSlides() {
                    if (window.innerWidth >= 1280) return 4;
                    if (window.innerWidth >= 1024) return 3;
                    if (window.innerWidth >= 768) return 2;
                    return 1;
                }
                
                function getTotalPages() {
                    return Math.ceil(slides.length / getVisibleSlides());
                }
                
                function getSlideWidth() {
                    return 100 / getVisibleSlides();
                }
                
                function generateDots() {
                    dotsContainer.innerHTML = '';
                    totalPages = getTotalPages();
                    
                    for (let i = 0; i < totalPages; i++) {
                        const dot = document.createElement('button');
                        dot.className = 'cards-slider-dot w-3 h-3 rounded-full mx-1 transition-all duration-300 ' + (i === currentPage ? 'active bg-primary' : 'bg-gray-300');
                        dot.setAttribute('data-index', i);
                        dot.setAttribute('aria-label', 'Página ' + (i + 1));
                        
                        dot.addEventListener('click', function() {
                            goToPage(i);
                        });
                        
                        dotsContainer.appendChild(dot);
                    }
                    
                    if (totalPages <= 1) {
                        dotsContainer.style.display = 'none';
                    } else {
                        dotsContainer.style.display = 'flex';
                    }
                }
                
                function setSlideWidths() {
                    const width = getSlideWidth();
                    slides.forEach(slide => {
                        slide.style.width = width + '%';
                    });
                }
                
                function goToPage(pageIndex) {
                    if (pageIndex < 0 || pageIndex >= totalPages) return;
                    
                    currentPage = pageIndex;
                    const visibleSlides = getVisibleSlides();
                    const offset = pageIndex * visibleSlides * -100;
                    slider.style.transform = 'translateX(' + offset + '%)';
                    
                    const dots = container.querySelectorAll('.cards-slider-dot');
                    dots.forEach((dot, i) => {
                        if (i === pageIndex) {
                            dot.classList.add('active', 'bg-primary');
                            dot.classList.remove('bg-gray-300');
                        } else {
                            dot.classList.remove('active', 'bg-primary');
                            dot.classList.add('bg-gray-300');
                        }
                    });
                }
                
                function init() {
                    setSlideWidths();
                    generateDots();
                    goToPage(0);
                }
                
                init();
                
                window.addEventListener('resize', function() {
                    const oldVisibleSlides = getVisibleSlides();
                    setSlideWidths();
                    generateDots();
                    
                    const newPage = Math.floor((currentPage * oldVisibleSlides) / getVisibleSlides());
                    goToPage(Math.min(newPage, totalPages - 1));
                });
            });
        }
        </script>
        `,
    });

    // Cards slider with top button
    const creditCardsWithTopButtonSvg = `
    <svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#ffffff"/>
        
        <rect x="23" y="1.5" width="7" height="2" rx="1" fill="#23366A"/>
        
        <rect x="2" y="7" width="6" height="8" rx="0.8" fill="#e5e7eb"/>
        <rect x="2" y="7" width="6" height="4" rx="0.8" fill="#23366A"/>
        <rect x="2.5" y="12" width="5" height="0.8" rx="0.2" fill="#9ca3af"/>
        <rect x="2.5" y="13.2" width="3" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="2.5" y="14.5" width="2.5" height="1" rx="0.5" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="9" y="7" width="6" height="8" rx="0.8" fill="#e5e7eb"/>
        <rect x="9" y="7" width="6" height="4" rx="0.8" fill="#23366A"/>
        <rect x="9.5" y="12" width="5" height="0.8" rx="0.2" fill="#9ca3af"/>
        <rect x="9.5" y="13.2" width="3" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="9.5" y="14.5" width="2.5" height="1" rx="0.5" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="16" y="7" width="6" height="8" rx="0.8" fill="#e5e7eb"/>
        <rect x="16" y="7" width="6" height="4" rx="0.8" fill="#23366A"/>
        <rect x="16.5" y="12" width="5" height="0.8" rx="0.2" fill="#9ca3af"/>
        <rect x="16.5" y="13.2" width="3" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="16.5" y="14.5" width="2.5" height="1" rx="0.5" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="23" y="7" width="6" height="8" rx="0.8" fill="#e5e7eb" opacity="0.5"/>
        <rect x="23" y="7" width="6" height="4" rx="0.8" fill="#23366A" opacity="0.5"/>
        
        <rect x="2" y="17" width="28" height="1.5" rx="0.75" fill="#f0f0f0"/>
        <rect x="2" y="17" width="12" height="1.5" rx="0.75" fill="#23366A"/>
        </svg>`;

    blockManager.add("credit-cards-top-button", {
        label: "Tarjetas con botón superior",
        category: "Tarjetas",
        attributes: { class: "gjs-block-section" },
        media: creditCardsWithTopButtonSvg,
        content: `
        <div class="py-8 md:py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-3xl font-bold text-primary">Lorem ipsum</h2>
                    <a href="#" class="bg-white border-2 border-primary text-primary font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm">
                        Ver más
                    </a>
                </div>
                
                <div class="relative">
                    <div class="overflow-x-auto pb-4" style="scrollbar-width: thin; scrollbar-color: #23366A #f0f0f0;">
                        <div class="flex space-x-5 lg:space-x-6 min-w-max">
                            <div class="w-80 flex-shrink-0">
                                <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                                    <img src="https://via.placeholder.com/600x350/1e3a8a/ffffff?text=Card+Type" alt="Tarjeta de Crédito" class="w-full h-48 object-cover">
                                </div>
                                <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                                <p class="text-gray-600 mb-4 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                                <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm">
                                    Ver más
                                    <i class="ri-arrow-right-line text-xl"></i>
                                </a>
                            </div>
                            
                            <div class="w-80 flex-shrink-0">
                                <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                                    <img src="https://via.placeholder.com/600x350/1e3a8a/ffffff?text=Card+Type" alt="Tarjeta de Crédito" class="w-full h-48 object-cover">
                                </div>
                                <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                                <p class="text-gray-600 mb-4 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                                <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm">
                                    Ver más
                                    <i class="ri-arrow-right-line text-xl"></i>
                                </a>
                            </div>
                            
                            <div class="w-80 flex-shrink-0">
                                <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                                    <img src="https://via.placeholder.com/600x350/1e3a8a/ffffff?text=Card+Type" alt="Tarjeta de Crédito" class="w-full h-48 object-cover">
                                </div>
                                <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                                <p class="text-gray-600 mb-4 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                                <a href="#" class="inline-block bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm">
                                    Ver más
                                    <i class="ri-arrow-right-line text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <style>
                    .overflow-x-auto::-webkit-scrollbar {
                        height: 6px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-track {
                        background: #f0f0f0;
                        border-radius: 3px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-thumb {
                        background-color: #23366A;
                        border-radius: 3px;
                    }
                    </style>
                </div>
            </div>
        </div>
    `,
    });

    // Cards in grid layout without top button
    const creditCardsGridSvg = `
    <svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#ffffff"/>
        
        <rect x="2" y="2" width="13" height="13" rx="0.8" fill="#e5e7eb"/>
        <rect x="2" y="2" width="13" height="6" rx="0.8" fill="#3b82f6"/>
        <rect x="2.5" y="9" width="12" height="1" rx="0.3" fill="#9ca3af"/>
        <rect x="2.5" y="10.5" width="8" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="2.5" y="12" width="5" height="1.5" rx="0.75" fill="none" stroke="#3b82f6" stroke-width="0.4"/>
        
        <rect x="17" y="2" width="13" height="13" rx="0.8" fill="#e5e7eb"/>
        <rect x="17" y="2" width="13" height="6" rx="0.8" fill="#2563eb"/>
        <rect x="17.5" y="9" width="12" height="1" rx="0.3" fill="#9ca3af"/>
        <rect x="17.5" y="10.5" width="8" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="17.5" y="12" width="5" height="1.5" rx="0.75" fill="none" stroke="#2563eb" stroke-width="0.4"/>
        
        <rect x="2" y="17" width="13" height="13" rx="0.8" fill="#e5e7eb"/>
        <rect x="2" y="17" width="13" height="6" rx="0.8" fill="#1e40af"/>
        <rect x="2.5" y="24" width="12" height="1" rx="0.3" fill="#9ca3af"/>
        <rect x="2.5" y="25.5" width="8" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="2.5" y="27" width="5" height="1.5" rx="0.75" fill="none" stroke="#1e40af" stroke-width="0.4"/>
        
        <rect x="17" y="17" width="13" height="13" rx="0.8" fill="#e5e7eb"/>
        <rect x="17" y="17" width="13" height="6" rx="0.8" fill="#23366A"/>
        <rect x="17.5" y="24" width="12" height="1" rx="0.3" fill="#9ca3af"/>
        <rect x="17.5" y="25.5" width="8" height="0.8" rx="0.2" fill="#d1d5db"/>
        <rect x="17.5" y="27" width="5" height="1.5" rx="0.75" fill="none" stroke="#23366A" stroke-width="0.4"/>
        </svg>`;

    blockManager.add("credit-cards-grid", {
        label: "Tarjetas en Grid",
        category: "Tarjetas",
        attributes: { class: "gjs-block-section" },
        media: creditCardsGridSvg,
        content: `
        <div class="py-8 md:py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-primary mb-8">Lorem ipsum</h2>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div class="flex flex-col h-full">
                        <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                            <img src="https://via.placeholder.com/600x350/23366A/ffffff?text=Tarjeta" alt="Tarjeta" class="w-full h-44 object-cover">
                        </div>
                        <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                        <p class="text-gray-600 mb-4 text-sm flex-grow">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                        <a href="#" class="inline-flex items-center bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm mt-auto self-start">
                            Ver más
                            <i class="ri-arrow-right-line ml-1 text-xl"></i>
                        </a>
                    </div>
                    
                    <div class="flex flex-col h-full">
                        <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                            <img src="https://via.placeholder.com/600x350/23366A/ffffff?text=Tarjeta" alt="Tarjeta" class="w-full h-44 object-cover">
                        </div>
                        <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                        <p class="text-gray-600 mb-4 text-sm flex-grow">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                        <a href="#" class="inline-flex items-center bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm mt-auto self-start">
                            Ver más
                            <i class="ri-arrow-right-line ml-1 text-xl"></i>
                        </a>
                    </div>
                    
                    <div class="flex flex-col h-full">
                        <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                            <img src="https://via.placeholder.com/600x350/23366A/ffffff?text=Tarjeta" alt="Tarjeta" class="w-full h-44 object-cover">
                        </div>
                        <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                        <p class="text-gray-600 mb-4 text-sm flex-grow">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                        <a href="#" class="inline-flex items-center bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm mt-auto self-start">
                            Ver más
                            <i class="ri-arrow-right-line ml-1 text-xl"></i>
                        </a>
                    </div>
                    
                    <div class="flex flex-col h-full">
                        <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                            <img src="https://via.placeholder.com/600x350/23366A/ffffff?text=Tarjeta" alt="Tarjeta" class="w-full h-44 object-cover">
                        </div>
                        <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                        <p class="text-gray-600 mb-4 text-sm flex-grow">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                        <a href="#" class="inline-flex items-center bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm mt-auto self-start">
                            Ver más
                            <i class="ri-arrow-right-line ml-1 text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `,
    });

    // Cards in grid layout with top button
    const creditCardsGridTopButtonSvg = `
    <svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#ffffff"/>
        
        <rect x="24" y="0.5" width="6" height="2" rx="1" fill="#23366A"/>
        
        <rect x="2" y="4" width="13" height="12" rx="0.8" fill="#e5e7eb"/>
        <rect x="2" y="4" width="13" height="5.5" rx="0.8" fill="#3b82f6"/>
        <rect x="2.5" y="10.5" width="12" height="0.9" rx="0.3" fill="#9ca3af"/>
        <rect x="2.5" y="11.8" width="8" height="0.7" rx="0.2" fill="#d1d5db"/>
        <rect x="2.5" y="13" width="5" height="1.4" rx="0.7" fill="none" stroke="#3b82f6" stroke-width="0.4"/>
        
        <rect x="17" y="4" width="13" height="12" rx="0.8" fill="#e5e7eb"/>
        <rect x="17" y="4" width="13" height="5.5" rx="0.8" fill="#2563eb"/>
        <rect x="17.5" y="10.5" width="12" height="0.9" rx="0.3" fill="#9ca3af"/>
        <rect x="17.5" y="11.8" width="8" height="0.7" rx="0.2" fill="#d1d5db"/>
        <rect x="17.5" y="13" width="5" height="1.4" rx="0.7" fill="none" stroke="#2563eb" stroke-width="0.4"/>
        
        <rect x="2" y="18" width="13" height="12" rx="0.8" fill="#e5e7eb"/>
        <rect x="2" y="18" width="13" height="5.5" rx="0.8" fill="#1e40af"/>
        <rect x="2.5" y="24.5" width="12" height="0.9" rx="0.3" fill="#9ca3af"/>
        <rect x="2.5" y="25.8" width="8" height="0.7" rx="0.2" fill="#d1d5db"/>
        <rect x="2.5" y="27" width="5" height="1.4" rx="0.7" fill="none" stroke="#1e40af" stroke-width="0.4"/>
        
        <rect x="17" y="18" width="13" height="12" rx="0.8" fill="#e5e7eb"/>
        <rect x="17" y="18" width="13" height="5.5" rx="0.8" fill="#23366A"/>
        <rect x="17.5" y="24.5" width="12" height="0.9" rx="0.3" fill="#9ca3af"/>
        <rect x="17.5" y="25.8" width="8" height="0.7" rx="0.2" fill="#d1d5db"/>
        <rect x="17.5" y="27" width="5" height="1.4" rx="0.7" fill="none" stroke="#23366A" stroke-width="0.4"/>
        </svg>`;

    blockManager.add("credit-cards-grid-top-button", {
        label: "Tarjetas en Grid con botón superior",
        category: "Tarjetas",
        attributes: { class: "gjs-block-section" },
        media: creditCardsGridTopButtonSvg,
        content: `
        <div class="py-8 md:py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-3xl font-bold text-primary">Lorem ipsum</h2>
                    <a href="#" class="bg-white border-2 border-primary text-primary font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm">
                        Ver más
                    </a>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div class="flex flex-col h-full">
                        <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                            <img src="https://via.placeholder.com/600x350/1e3a8a/ffffff?text=Tarjeta" alt="Tarjeta" class="w-full h-44 object-cover">
                        </div>
                        <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                        <p class="text-gray-600 mb-4 text-sm flex-grow">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                        <a href="#" class="inline-flex items-center bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm mt-auto self-start">
                            Ver más
                            <i class="ri-arrow-right-line ml-1 text-xl"></i>
                        </a>
                    </div>
                    
                    <div class="flex flex-col h-full">
                        <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                            <img src="https://via.placeholder.com/600x350/1e3a8a/ffffff?text=Tarjeta" alt="Tarjeta" class="w-full h-44 object-cover">
                        </div>
                        <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                        <p class="text-gray-600 mb-4 text-sm flex-grow">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                        <a href="#" class="inline-flex items-center bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm mt-auto self-start">
                            Ver más
                            <i class="ri-arrow-right-line ml-1 text-xl"></i>
                        </a>
                    </div>
                    
                    <div class="flex flex-col h-full">
                        <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                            <img src="https://via.placeholder.com/600x350/1e3a8a/ffffff?text=Tarjeta" alt="Tarjeta" class="w-full h-44 object-cover">
                        </div>
                        <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                        <p class="text-gray-600 mb-4 text-sm flex-grow">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                        <a href="#" class="inline-flex items-center bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm mt-auto self-start">
                            Ver más
                            <i class="ri-arrow-right-line ml-1 text-xl"></i>
                        </a>
                    </div>
                    
                    <div class="flex flex-col h-full">
                        <div class="rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg mb-4">
                            <img src="https://via.placeholder.com/600x350/1e3a8a/ffffff?text=Tarjeta" alt="Tarjeta" class="w-full h-44 object-cover">
                        </div>
                        <h3 class="text-lg font-bold text-primary mb-2">Lorem ipsum dolor</h3>
                        <p class="text-gray-600 mb-4 text-sm flex-grow">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                        <a href="#" class="inline-flex items-center bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm mt-auto self-start">
                            Ver más
                            <i class="ri-arrow-right-line ml-1 text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `,
    });

    if (typeof window.showMediaSelector === "function") {
    } else {
        try {
            window.showMediaSelector = showMediaSelector;
        } catch (e) {
            console.error("Media selector module not found");
        }
    }
}
