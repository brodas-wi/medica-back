// Responsive banner slider with swipe support and dot navigation
import { showMediaSelector } from "../utils/mediaSelector";

export default function loadBannerSliderBlock(editor) {
    const blockId = "banner-slider";
    const componentType = "banner-slider-component";

    // Default configuration
    const defaultConfig = {
        slides: [
            {
                id: 1,
                image: "",
                title: "Primer Slide",
                subtitle: "Descripción opcional del primer slide",
            },
        ],
        autoplay: true,
        interval: 5000,
    };

    // Helper functions
    const createSliderStructure = (config) => {
        const slidesHtml = config.slides
            .map(
                (slide, index) => `
                <div class="banner-slide" data-slide-index="${index}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('${slide.image || ""}'); background-size: cover; background-position: center; display: ${index === 0 ? "flex" : "none"}; align-items: flex-end; padding: 2rem; border-radius: 1rem; ${!slide.image ? "background-color: #f3f4f6;" : ""}">
                    <div style="background-color: rgba(255, 255, 255, 0.85); padding: 0.25rem 1rem; border-radius: 0.5rem; backdrop-filter: blur(4px); max-width: 80%;">
                    <h2 style="color: #23366A; font-size: 2.5rem; font-weight: bold; margin: 0;">${slide.title}</h2>
                    ${slide.subtitle ? `<p style="color: #374151; font-size: 1.125rem; margin-top: -8px; margin-bottom: 0.5rem;">${slide.subtitle}</p>` : ""}
                    </div>
                </div>
                `,
            )
            .join("");

        const dotsHtml =
            config.slides.length > 1
                ? config.slides
                      .map(
                          (_, index) => `
                            <button class="banner-dot ${index === 0 ? "active" : ""}" data-index="${index}" aria-label="Ir a slide ${index + 1}"></button>
                            `,
                      )
                      .join("")
                : "";

        return `
            <div class="max-w-7xl mx-auto px-4">
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
                    transition: all 0.3s ease;
                }
                .banner-dot.active {
                    background-color: #23366A !important;
                }
                .banner-dot:hover {
                    transform: scale(1.15);
                }
                .banner-slide {
                    transition: opacity 0.5s ease-in-out;
                }
                .banner-slide.fadeOut {
                    opacity: 0;
                }
                .banner-slide.fadeIn {
                    opacity: 1;
                }
                </style>
                <div class="relative" style="height: 400px; margin-bottom: 2rem;">
                <div class="banner-slides-container" style="width: 100%; height: 100%; position: relative; overflow: hidden; border-radius: 1rem;">
                    ${slidesHtml}
                </div>
                </div>
                ${
                    config.slides.length > 1
                        ? `
                <div class="banner-dots-container" style="display: flex; justify-content: center; margin-top: -1rem; margin-bottom: 1rem;">
                    ${dotsHtml}
                </div>
                `
                        : ""
                }
            </div>
            `;
    };

    // Component definition with persistent type
    editor.DomComponents.addType(componentType, {
        isComponent: (el) => {
            if (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === componentType
            ) {
                return { type: componentType };
            }
        },
        model: {
            defaults: {
                tagName: "section",
                draggable: true,
                droppable: false,
                editable: false,
                stylable: true,
                resizable: false,

                attributes: {
                    class: "py-8 md:py-14 bg-white",
                    "data-gjs-type": componentType,
                    "data-slider-config": JSON.stringify(defaultConfig),
                },

                traits: [
                    {
                        type: "button",
                        label: false,
                        text: "Configurar Slider",
                        full: true,
                        command: (editor) => {
                            const component = editor.getSelected();
                            if (component) {
                                openConfigModal(editor, component);
                            }
                        },
                    },
                ],

                components: (model) => {
                    const configAttr =
                        model.getAttributes()["data-slider-config"];
                    let config = { ...defaultConfig };

                    if (configAttr) {
                        try {
                            config = {
                                ...defaultConfig,
                                ...JSON.parse(configAttr),
                            };
                        } catch (e) {
                            console.error("Error parsing slider config:", e);
                        }
                    }

                    return createSliderStructure(config);
                },

                script: function () {
                    const initSlider = () => {
                        const section = this;
                        const configAttr =
                            section.getAttribute("data-slider-config");

                        let config = {
                            slides: [
                                {
                                    id: 1,
                                    image: "",
                                    title: "Primer Slide",
                                    subtitle:
                                        "Descripción opcional del primer slide",
                                },
                            ],
                            autoplay: true,
                            interval: 5000,
                        };

                        if (configAttr) {
                            try {
                                config = JSON.parse(configAttr);
                            } catch (e) {
                                console.error("Error parsing config:", e);
                            }
                        }

                        const slidesContainer = section.querySelector(
                            ".banner-slides-container",
                        );
                        if (!slidesContainer) return;

                        const slides =
                            slidesContainer.querySelectorAll(".banner-slide");
                        const dots = section.querySelectorAll(".banner-dot");
                        const slidesCount = slides.length;

                        let currentSlide = 0;
                        let slideInterval = null;
                        let touchStartX = 0;
                        let touchEndX = 0;

                        function goToSlide(index) {
                            if (slideInterval) {
                                clearInterval(slideInterval);
                            }

                            slides.forEach((slide) => {
                                slide.classList.remove("active", "fadeIn");
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
                                slides[index].classList.remove("fadeOut");
                                slides[index].classList.add("active", "fadeIn");
                                if (dots[index]) {
                                    dots[index].classList.add("active");
                                }

                                currentSlide = index;

                                if (slidesCount > 1 && config.autoplay) {
                                    startSlideTimer();
                                }
                            }, 500);
                        }

                        function nextSlide() {
                            const next = (currentSlide + 1) % slidesCount;
                            goToSlide(next);
                        }

                        function prevSlide() {
                            const prev =
                                (currentSlide - 1 + slidesCount) % slidesCount;
                            goToSlide(prev);
                        }

                        function startSlideTimer() {
                            slideInterval = setInterval(() => {
                                nextSlide();
                            }, config.interval);
                        }

                        // Dot navigation
                        dots.forEach((dot, index) => {
                            dot.addEventListener("click", () => {
                                goToSlide(index);
                            });
                        });

                        // Swipe support
                        const handleTouchStart = (e) => {
                            touchStartX = e.touches[0].clientX;
                        };

                        const handleTouchMove = (e) => {
                            touchEndX = e.touches[0].clientX;
                        };

                        const handleTouchEnd = () => {
                            if (!touchStartX || !touchEndX) return;

                            const diff = touchStartX - touchEndX;
                            const threshold = 50;

                            if (Math.abs(diff) > threshold) {
                                if (diff > 0) {
                                    nextSlide();
                                } else {
                                    prevSlide();
                                }
                            }

                            touchStartX = 0;
                            touchEndX = 0;
                        };

                        slidesContainer.addEventListener(
                            "touchstart",
                            handleTouchStart,
                            { passive: true },
                        );
                        slidesContainer.addEventListener(
                            "touchmove",
                            handleTouchMove,
                            { passive: true },
                        );
                        slidesContainer.addEventListener(
                            "touchend",
                            handleTouchEnd,
                        );

                        // Mouse events for desktop swipe
                        let mouseDown = false;
                        let startX = 0;

                        slidesContainer.addEventListener("mousedown", (e) => {
                            mouseDown = true;
                            startX = e.pageX;
                        });

                        slidesContainer.addEventListener("mousemove", (e) => {
                            if (!mouseDown) return;
                            e.preventDefault();
                        });

                        slidesContainer.addEventListener("mouseup", (e) => {
                            if (!mouseDown) return;
                            mouseDown = false;

                            const diff = startX - e.pageX;
                            const threshold = 50;

                            if (Math.abs(diff) > threshold) {
                                if (diff > 0) {
                                    nextSlide();
                                } else {
                                    prevSlide();
                                }
                            }
                        });

                        slidesContainer.addEventListener("mouseleave", () => {
                            mouseDown = false;
                        });

                        // Start autoplay
                        if (slidesCount > 1 && config.autoplay) {
                            startSlideTimer();
                        }
                    };

                    if (document.readyState === "loading") {
                        document.addEventListener(
                            "DOMContentLoaded",
                            initSlider,
                        );
                    } else {
                        initSlider();
                    }
                },
            },

            init() {
                // Ensure type persistence
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },

            getConfig() {
                const configAttr = this.getAttributes()["data-slider-config"];
                if (configAttr) {
                    try {
                        return { ...defaultConfig, ...JSON.parse(configAttr) };
                    } catch (e) {
                        console.error("Error parsing slider config:", e);
                    }
                }
                return { ...defaultConfig };
            },

            setConfig(newConfig) {
                const merged = { ...this.getConfig(), ...newConfig };
                const attrs = {
                    ...this.getAttributes(),
                    "data-gjs-type": componentType,
                    "data-slider-config": JSON.stringify(merged),
                };
                this.setAttributes(attrs);
                this.components(createSliderStructure(merged));
                this.view.render();
            },
        },
    });

    // SVG icon
    const bannerSliderSvg = `<svg viewBox="0 0 32 32" width="32" height="32">
    <defs>
      <linearGradient id="sliderBannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#6b7280;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#4b5563;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" fill="#f9fafb"/>
    <rect x="2" y="5" width="28" height="18" rx="1.5" fill="url(#sliderBannerGrad)"/>
    <rect x="2" y="5" width="28" height="18" rx="1.5" fill="rgba(0,0,0,0.15)"/>
    <rect x="4" y="18" width="12" height="3.5" rx="0.5" fill="rgba(255,255,255,0.9)"/>
    <rect x="4.5" y="19" width="8" height="1" rx="0.3" fill="#4b5563"/>
    <circle cx="13" cy="27" r="1" fill="white" stroke="#4b5563" stroke-width="0.4"/>
    <circle cx="16" cy="27" r="1" fill="#4b5563"/>
    <circle cx="19" cy="27" r="1" fill="white" stroke="#4b5563" stroke-width="0.4"/>
  </svg>`;

    // Block definition
    editor.BlockManager.add(blockId, {
        label: "Banner Slider",
        category: "Banners",
        media: bannerSliderSvg,
        content: {
            type: componentType,
            attributes: {
                class: "py-8 md:py-14 bg-white",
                "data-gjs-type": componentType,
                "data-slider-config": JSON.stringify(defaultConfig),
            },
        },
    });

    // Modal configuration with white background
    function openConfigModal(editor, component) {
        const currentConfig = component.getConfig();

        const renderSlidesList = (slides) => {
            return slides
                .map(
                    (slide, index) => `
                        <div class="slide-item" data-slide-id="${slide.id}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e5e7eb'">
                        <div style="display: flex; gap: 20px; align-items: start;">
                            <div style="flex-shrink: 0;">
                            ${
                                slide.image
                                    ? `<img src="${slide.image}" alt="${slide.title}" style="width: 140px; height: 100px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb;">`
                                    : `<div style="width: 140px; height: 100px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 12px;">Sin imagen</div>`
                            }
                            </div>
                            
                            <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #111827;">Slide ${index + 1}</h4>
                                <button class="delete-slide-btn" data-slide-id="${slide.id}" style="background: #ef4444; color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                                Eliminar
                                </button>
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Título *</label>
                                <input type="text" class="slide-title" data-slide-id="${slide.id}" value="${slide.title}" placeholder="Ingrese el título del slide" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Subtítulo (opcional)</label>
                                <input type="text" class="slide-subtitle" data-slide-id="${slide.id}" value="${slide.subtitle || ""}" placeholder="Ingrese el subtítulo del slide" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <button class="change-image-btn" data-slide-id="${slide.id}" style="width: 100%; background: #23366A; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#1a2752'" onmouseout="this.style.background='#23366A'">
                                Seleccionar Imagen
                            </button>
                            </div>
                        </div>
                        </div>
                    `,
                )
                .join("");
        };

        const modalHtml = `
            <div class="slider-config-modal" style="font-family: system-ui, -apple-system, sans-serif; background: white; padding: 10px; border-radius: 8px;">
                <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 24px;">
                <h2 style="margin: 0; font-size: 22px; font-weight: 600; color: #111827;">Configurar Banner Slider</h2>
                </div>
                
                <div class="modal-body" style="max-height: 60vh; overflow-y: auto; padding-right: 8px;">
                <div id="slides-list">
                    ${renderSlidesList(currentConfig.slides)}
                </div>

                <button id="add-slide-btn" style="width: 100%; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
                    Nuevo Slide
                </button>

                <div style="margin-top: 24px; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <label style="display: flex; align-items: center; cursor: pointer; user-select: none;">
                    <input type="checkbox" id="autoplay-checkbox" ${currentConfig.autoplay ? "checked" : ""} style="width: 18px; height: 18px; margin-right: 10px; cursor: pointer; accent-color: #3b82f6;">
                    <span style="font-size: 14px; font-weight: 500; color: #374151;">Reproducción automática</span>
                    </label>
                </div>
                </div>

                <div class="modal-footer" style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb; display: flex; gap: 12px; justify-content: flex-end;">
                <button id="cancel-btn" style="padding: 10px 24px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
                    Cancelar
                </button>
                <button id="save-btn" style="padding: 10px 28px; border: none; background: #23366A; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#1a2752'" onmouseout="this.style.background='#23366A'">
                    Guardar Cambios
                </button>
                </div>
            </div>
            `;

        const modal = editor.Modal;
        modal.setTitle("");
        modal.setContent(modalHtml);
        modal.open({ attributes: { class: "banner-slider-modal" } });

        // Override modal styles
        setTimeout(() => {
            const modalContainer = document.querySelector(".gjs-mdl-dialog");
            if (modalContainer) {
                modalContainer.style.backgroundColor = "white";
            }

            const modalHeader = document.querySelector(".gjs-mdl-header");
            if (modalHeader) {
                modalHeader.style.padding = "0";
                modalHeader.style.border = "none";
                modalHeader.style.display = "none";
            }

            // Hide default close button
            const closeBtn = document.querySelector(".gjs-mdl-close");
            if (closeBtn) {
                closeBtn.style.display = "none";
            }
        }, 10);

        let slides = JSON.parse(JSON.stringify(currentConfig.slides));
        let nextId = Math.max(...slides.map((s) => s.id)) + 1;

        const updateSlidesList = () => {
            document.getElementById("slides-list").innerHTML =
                renderSlidesList(slides);
            attachSlideEvents();
        };

        const attachSlideEvents = () => {
            // Delete slide buttons
            document.querySelectorAll(".delete-slide-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const slideId = parseInt(e.target.dataset.slideId);
                    if (slides.length > 1) {
                        slides = slides.filter((s) => s.id !== slideId);
                        updateSlidesList();
                    } else {
                        alert("Debe haber al menos un slide");
                    }
                });
            });

            // Change image buttons
            document.querySelectorAll(".change-image-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const slideId = parseInt(e.target.dataset.slideId);

                    showMediaSelector("image", (mediaData) => {
                        const slide = slides.find((s) => s.id === slideId);
                        if (slide) {
                            slide.image = mediaData.src;
                            updateSlidesList();
                        }
                    });
                });
            });

            // Title inputs
            document.querySelectorAll(".slide-title").forEach((input) => {
                input.addEventListener("input", (e) => {
                    const slideId = parseInt(e.target.dataset.slideId);
                    const slide = slides.find((s) => s.id === slideId);
                    if (slide) {
                        slide.title = e.target.value;
                    }
                });
            });

            // Subtitle inputs
            document.querySelectorAll(".slide-subtitle").forEach((input) => {
                input.addEventListener("input", (e) => {
                    const slideId = parseInt(e.target.dataset.slideId);
                    const slide = slides.find((s) => s.id === slideId);
                    if (slide) {
                        slide.subtitle = e.target.value;
                    }
                });
            });
        };

        setTimeout(() => {
            attachSlideEvents();

            // Add slide button
            document
                .getElementById("add-slide-btn")
                ?.addEventListener("click", () => {
                    slides.push({
                        id: nextId++,
                        image: "",
                        title: `Slide ${slides.length + 1}`,
                        subtitle: "",
                    });
                    updateSlidesList();
                });

            // Save button
            document
                .getElementById("save-btn")
                ?.addEventListener("click", () => {
                    const hasEmptyTitles = slides.some((s) => !s.title.trim());
                    if (hasEmptyTitles) {
                        alert("Todos los slides deben tener un título");
                        return;
                    }

                    const newConfig = {
                        slides: slides,
                        autoplay:
                            document.getElementById("autoplay-checkbox")
                                .checked,
                        interval: 5000,
                    };

                    component.setConfig(newConfig);
                    modal.close();
                });

            // Cancel button
            document
                .getElementById("cancel-btn")
                ?.addEventListener("click", () => {
                    modal.close();
                });
        }, 100);
    }
}
