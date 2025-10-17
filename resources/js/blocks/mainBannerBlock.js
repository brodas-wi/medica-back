export default function loadMainBannerBlock(editor) {
    const bannerSvg = `<svg viewBox="0 0 32 32" width="32" height="32">
    <defs>
        <linearGradient id="mainBannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#23366A;stop-opacity:1" />
        </linearGradient>
    </defs>
    
    <rect width="32" height="32" fill="#f3f4f6"/>
    
    <rect x="2" y="4" width="28" height="20" rx="2" fill="url(#mainBannerGrad)"/>
    
    <rect x="2" y="4" width="28" height="20" rx="2" fill="rgba(0,0,0,0.2)"/>
    
    <rect x="4" y="6" width="8" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
    
    <rect x="4" y="9" width="16" height="2.5" rx="0.5" fill="white"/>
    <rect x="4" y="12" width="12" height="1.2" rx="0.3" fill="rgba(255,255,255,0.8)"/>
    
    <rect x="4" y="16" width="6" height="2" rx="1" fill="white"/>
    <rect x="11" y="16" width="6" height="2" rx="1" fill="rgba(255,255,255,0)" stroke="white" stroke-width="0.5"/>
    
    <circle cx="14" cy="27" r="1" fill="white"/>
    <circle cx="16" cy="27" r="1" fill="#23366A" stroke="white" stroke-width="0.5"/>
    <circle cx="18" cy="27" r="1" fill="white"/>
    
    <path d="M 1 4 L 4 8 L 1 12" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <path d="M 31 4 L 28 8 L 31 12" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    </svg>`;

    const bannerCss = `.main-banner-carousel-wrapper {
            perspective: 1000px;
            background-color: #fff !important;
            position: relative;
            min-height: 500px;
            padding-bottom: 60px;
        }

        .main-banner-carousel-track {
            display: flex;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
            width: 100%;
            height: 100%;
            position: relative;
        }

        .main-banner-carousel-slide {
            position: absolute;
            width: 90%;
            max-width: 1200px;
            height: 450px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0.85);
            opacity: 0.3;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 1rem;
            overflow: hidden;
            background-size: cover;
            background-position: center;
            pointer-events: none;
        }

        .main-banner-carousel-slide.active {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            z-index: 10;
            pointer-events: auto;
        }

        .main-banner-carousel-slide.prev {
            transform: translate(-130%, -50%) scale(0.85);
            opacity: 0.5;
            z-index: 5;
        }

        .main-banner-carousel-slide.next {
            transform: translate(30%, -50%) scale(0.85);
            opacity: 0.5;
            z-index: 5;
        }

        .main-banner-dot {
            width: 14px !important;
            height: 14px !important;
            border-radius: 50% !important;
            background-color: #ffffff !important;
            border: 2px solid #23366A !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            pointer-events: auto !important;
            flex-shrink: 0 !important;
            padding: 0 !important;
        }

        .main-banner-dot:hover {
            transform: scale(1.2) !important;
        }

        .main-banner-dot.active {
            background-color: #23366A !important;
            border-color: #23366A !important;
        }

        .main-banner-primary-btn {
            background-color: white !important;
            color: #23366A !important;
        }

        .main-banner-primary-btn:hover {
            background-color: #23366A !important;
            color: white !important;
        }

        .main-banner-secondary-btn {
            transition: all 0.3s ease !important;
            background-color: transparent !important;
        }

        .main-banner-secondary-btn:hover {
            background-color: white !important;
            color: #23366A !important;
        }

        @media (max-width: 768px) {
            .main-banner-carousel-wrapper {
                min-height: 400px;
                padding-bottom: 50px;
            }

            .main-banner-carousel-slide {
                width: 95%;
                height: 350px;
            }

            .main-banner-carousel-slide.active {
                width: 95%;
            }

            .main-banner-dot {
                width: 12px !important;
                height: 12px !important;
            }
        }

        @media (max-width: 480px) {
            .main-banner-carousel-wrapper {
                min-height: 450px;
            }

            .main-banner-carousel-slide {
                height: 400px;
            }
        }`;

    const bannerScriptFunction = function () {
        var wrapper = this;
        if (!wrapper || wrapper.hasAttribute("data-banner-initialized")) return;

        var track = wrapper.querySelector(".main-banner-carousel-track");
        var dotsContainer = wrapper.querySelector(".main-banner-dots");

        if (!track || !dotsContainer) return;

        wrapper.setAttribute("data-banner-initialized", "true");

        var currentIndex = 0;
        var autoplayInterval;
        var startX = 0;
        var currentX = 0;
        var isSwiping = false;

        var apiEndpoint =
            wrapper.getAttribute("data-api-endpoint") || "/api/banners/active";
        var filterCategory =
            wrapper.getAttribute("data-filter-category") || "all";

        fetch(apiEndpoint)
            .then(function (response) {
                return response.json();
            })
            .then(function (banners) {
                var filteredBanners = banners;

                if (
                    filterCategory &&
                    filterCategory.trim() !== "" &&
                    filterCategory !== "all"
                ) {
                    filteredBanners = banners.filter(function (banner) {
                        var match =
                            banner.category &&
                            banner.category.toLowerCase().trim() ===
                                filterCategory.toLowerCase().trim();
                        return match;
                    });
                }

                if (filteredBanners && filteredBanners.length > 0) {
                    buildCarousel(filteredBanners);
                } else {
                    var message =
                        filterCategory && filterCategory !== "all"
                            ? 'No hay banners disponibles para la categoría "' +
                              filterCategory +
                              '"'
                            : "No hay banners disponibles";
                    track.innerHTML =
                        '<div class="flex items-center justify-center w-full h-full"><div class="text-center text-gray-600"><p class="text-xl">' +
                        message +
                        "</p></div></div>";
                }
            })
            .catch(function (error) {
                console.error("Error fetching banners:", error);
                track.innerHTML =
                    '<div class="flex items-center justify-center w-full h-full"><div class="text-center text-gray-600"><p class="text-xl">Error al cargar los banners</p></div></div>';
            });

        function buildCarousel(banners) {
            track.innerHTML = "";
            dotsContainer.innerHTML = "";

            banners.forEach(function (banner, index) {
                var slide = document.createElement("div");
                slide.className = "main-banner-carousel-slide";
                slide.style.backgroundImage =
                    "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(" +
                    banner.image_url +
                    ")";

                var categoryHtml =
                    banner.show_category && banner.category
                        ? '<div class="mb-3"><span class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border-2 border-white/30">' +
                          banner.category +
                          "</span></div>"
                        : "";

                var descriptionHtml =
                    banner.show_description && banner.description
                        ? '<p class="text-sm md:text-base lg:text-xl mb-4 drop-shadow-lg">' +
                          banner.description +
                          "</p>"
                        : "";

                var primaryBtnHtml =
                    banner.show_primary_button && banner.primary_button_text
                        ? '<a href="' +
                          (banner.primary_button_url || "#") +
                          '" class="main-banner-primary-btn text-sm md:text-base font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 inline-flex items-center shadow-xl">' +
                          banner.primary_button_text +
                          '<i class="ri-arrow-right-line ml-2"></i></a>'
                        : "";

                var secondaryBtnHtml =
                    banner.show_secondary_button && banner.secondary_button_text
                        ? '<a href="' +
                          (banner.secondary_button_url || "#") +
                          '" class="main-banner-secondary-btn text-white text-sm md:text-base font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 inline-flex items-center">' +
                          banner.secondary_button_text +
                          "</a>"
                        : "";

                slide.innerHTML =
                    '<div class="absolute inset-0 flex items-center justify-center p-6 md:p-8 lg:p-12"><div class="text-left text-white max-w-3xl w-full"><div class="max-w-full space-y-3 md:space-y-4">' +
                    categoryHtml +
                    '<h2 class="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight drop-shadow-2xl">' +
                    banner.title +
                    "</h2>" +
                    descriptionHtml +
                    '<div class="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-6">' +
                    primaryBtnHtml +
                    secondaryBtnHtml +
                    "</div></div></div></div>";

                track.appendChild(slide);

                var dot = document.createElement("button");
                dot.className = "main-banner-dot";
                dot.setAttribute("type", "button");
                dot.setAttribute("aria-label", "Ir al banner " + (index + 1));
                (function (i) {
                    dot.addEventListener("click", function () {
                        goToSlide(i);
                    });
                })(index);
                dotsContainer.appendChild(dot);
            });

            updateCarousel();
            startAutoplay();
            initSwipeEvents();
        }

        function initSwipeEvents() {
            wrapper.addEventListener(
                "touchstart",
                function (e) {
                    startX = e.touches[0].clientX;
                    currentX = startX;
                    isSwiping = true;
                    clearInterval(autoplayInterval);
                },
                { passive: true },
            );

            wrapper.addEventListener(
                "touchmove",
                function (e) {
                    if (!isSwiping) return;
                    currentX = e.touches[0].clientX;
                },
                { passive: true },
            );

            wrapper.addEventListener("touchend", handleTouchEnd);

            wrapper.addEventListener("mousedown", function (e) {
                startX = e.clientX;
                currentX = startX;
                isSwiping = true;
                clearInterval(autoplayInterval);
                e.preventDefault();
            });

            wrapper.addEventListener("mousemove", function (e) {
                if (!isSwiping) return;
                currentX = e.clientX;
            });

            wrapper.addEventListener("mouseup", handleTouchEnd);
            wrapper.addEventListener("mouseleave", handleTouchEnd);
        }

        function handleTouchEnd() {
            if (!isSwiping) return;
            isSwiping = false;

            var diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
            }
            resetAutoplay();
        }

        function updateCarousel() {
            var slides = track.querySelectorAll(".main-banner-carousel-slide");
            var dots = dotsContainer.querySelectorAll(".main-banner-dot");
            var total = slides.length;

            if (total === 0) return;

            for (var i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active", "prev", "next");
                if (i === currentIndex) {
                    slides[i].classList.add("active");
                } else if (i === (currentIndex - 1 + total) % total) {
                    slides[i].classList.add("prev");
                } else if (i === (currentIndex + 1) % total) {
                    slides[i].classList.add("next");
                }
            }

            for (var j = 0; j < dots.length; j++) {
                dots[j].classList[j === currentIndex ? "add" : "remove"](
                    "active",
                );
            }
        }

        function goToSlide(index) {
            var slides = track.querySelectorAll(".main-banner-carousel-slide");
            if (!slides.length) return;
            currentIndex = (index + slides.length) % slides.length;
            updateCarousel();
            resetAutoplay();
        }

        function nextSlide() {
            var slides = track.querySelectorAll(".main-banner-carousel-slide");
            if (slides.length === 0) return;
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            var slides = track.querySelectorAll(".main-banner-carousel-slide");
            if (slides.length === 0) return;
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        function startAutoplay() {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
    };

    editor.DomComponents.addType("main-banner-style", {
        isComponent: (el) => {
            if (el.tagName === "STYLE") {
                const parent = el.parentElement;
                if (
                    parent &&
                    parent.getAttribute("data-gjs-type") ===
                        "main-banner-carousel"
                ) {
                    return { type: "main-banner-style" };
                }
            }
            return false;
        },
        model: {
            defaults: {
                tagName: "style",
                removable: false,
                draggable: false,
                copyable: false,
                highlightable: false,
                selectable: false,
                hoverable: false,
                editable: false,
                layerable: false,
                void: false,
                attributes: { "data-gjs-type": "main-banner-style" },
                content: bannerCss,
            },
            toHTML() {
                return `<style>${bannerCss}</style>`;
            },
        },
    });

    editor.DomComponents.addType("main-banner-carousel", {
        isComponent: function (el) {
            return (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === "main-banner-carousel"
            );
        },
        model: {
            defaults: {
                tagName: "section",
                name: "Banner Principal",
                droppable: false,
                attributes: {
                    "data-gjs-type": "main-banner-carousel",
                    class: "main-banner-carousel-wrapper relative w-full h-96 pt-4 mt-4 md:h-[500px] overflow-hidden bg-white",
                    "data-api-endpoint": "/api/banners/active",
                    "data-filter-category": "all",
                },
                traits: [
                    {
                        type: "text",
                        name: "data-api-endpoint",
                        label: "API Endpoint",
                        placeholder: "/api/banners/active",
                    },
                    {
                        type: "select",
                        name: "data-filter-category",
                        label: "Filtrar por Categoría",
                        options: [
                            { value: "all", name: "Todas las categorías" },
                        ],
                    },
                ],
                components: [
                    {
                        type: "main-banner-style",
                    },
                    {
                        tagName: "div",
                        attributes: {
                            class: "main-banner-carousel-track flex items-center h-full",
                        },
                        components: [
                            {
                                tagName: "div",
                                attributes: {
                                    class: "flex items-center justify-center w-full h-full",
                                },
                                components: [
                                    {
                                        tagName: "div",
                                        attributes: {
                                            class: "w-full max-w-4xl px-4",
                                        },
                                        components: [
                                            {
                                                tagName: "div",
                                                attributes: {
                                                    class: "rounded-xl bg-gray-200 animate-pulse h-96 md:h-[450px] w-full",
                                                },
                                            },
                                            {
                                                tagName: "div",
                                                attributes: {
                                                    class: "flex justify-center mt-4 space-x-3",
                                                },
                                                components: [
                                                    {
                                                        tagName: "div",
                                                        attributes: {
                                                            class: "w-3 h-3 rounded-full bg-gray-300 animate-pulse",
                                                        },
                                                    },
                                                    {
                                                        tagName: "div",
                                                        attributes: {
                                                            class: "w-3 h-3 rounded-full bg-gray-300 animate-pulse",
                                                        },
                                                    },
                                                    {
                                                        tagName: "div",
                                                        attributes: {
                                                            class: "w-3 h-3 rounded-full bg-gray-300 animate-pulse",
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        tagName: "div",
                        attributes: {
                            class: "main-banner-dots absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-3 z-50",
                        },
                    },
                ],
                script: bannerScriptFunction,
                "script-props": ["data-api-endpoint", "data-filter-category"],
            },
            init() {
                this.on(
                    "change:attributes:data-filter-category",
                    this.handleCategoryChange,
                );
                this.on("change:attributes", this.onAttributeChange);
                this.loadCategories();
                this.ensureStyleComponent();
            },
            onAttributeChange() {
                const attrs = this.getAttributes();
                if (attrs["data-filter-category"] !== undefined) {
                    this.handleCategoryChange();
                }
            },
            ensureStyleComponent() {
                const components = this.components();
                const hasStyle = components.find(
                    (c) => c.get("type") === "main-banner-style",
                );

                if (!hasStyle) {
                    components.add({ type: "main-banner-style" }, { at: 0 });
                }
            },
            loadCategories() {
                const model = this;
                fetch("/api/banners/categories")
                    .then((response) => response.json())
                    .then((categories) => {
                        const trait = model.getTrait("data-filter-category");
                        if (trait) {
                            const options = [
                                { value: "all", name: "Todas las categorías" },
                                ...categories.map((cat) => ({
                                    value: cat,
                                    name: cat,
                                })),
                            ];
                            trait.set("options", options);
                        }
                    })
                    .catch((error) => {
                        console.error("Error loading categories:", error);
                    });
            },
            handleCategoryChange() {
                console.log("Category changed!");
                const view = this.view;
                if (!view || !view.el) {
                    console.log("No view or element found");
                    return;
                }

                const el = view.el;
                const currentCategory =
                    this.getAttributes()["data-filter-category"];
                console.log("New category:", currentCategory);

                const dotsContainer = el.querySelector(".main-banner-dots");
                if (dotsContainer) {
                    dotsContainer.innerHTML = "";
                }

                el.removeAttribute("data-banner-initialized");

                const track = el.querySelector(".main-banner-carousel-track");
                if (track) {
                    track.innerHTML =
                        '<div class="flex items-center justify-center w-full h-full"><div class="w-full max-w-4xl px-4"><div class="rounded-xl bg-gray-200 animate-pulse h-96 md:h-[450px] w-full"></div><div class="flex justify-center mt-4 space-x-3"><div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div><div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div><div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div></div></div></div>';
                }

                setTimeout(() => {
                    console.log(
                        "Reinitializing banner with category:",
                        currentCategory,
                    );
                    if (typeof bannerScriptFunction === "function") {
                        bannerScriptFunction.call(el);
                    }
                }, 500);
            },
        },
        view: {
            onRender() {
                const el = this.el;
                const model = this.model;

                if (!el) return;

                model.ensureStyleComponent();

                setTimeout(() => {
                    if (typeof bannerScriptFunction === "function") {
                        bannerScriptFunction.call(el);
                    }
                }, 500);
            },
        },
    });

    editor.on("load", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            let styleEl =
                frame.contentDocument.getElementById("main-banner-styles");
            if (!styleEl) {
                styleEl = frame.contentDocument.createElement("style");
                styleEl.id = "main-banner-styles";
                styleEl.innerHTML = bannerCss;
                frame.contentDocument.head.appendChild(styleEl);
            }
        }
    });

    editor.on("canvas:render", () => {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            let styleEl =
                frame.contentDocument.getElementById("main-banner-styles");
            if (!styleEl) {
                styleEl = frame.contentDocument.createElement("style");
                styleEl.id = "main-banner-styles";
                styleEl.innerHTML = bannerCss;
                frame.contentDocument.head.appendChild(styleEl);
            }
        }
    });

    editor.BlockManager.add("main-banner-carousel", {
        label: "Banner Principal",
        category: "Banners",
        attributes: { class: "gjs-block-section" },
        media: bannerSvg,
        content: { type: "main-banner-carousel" },
    });

    editor.on("component:add", function (component) {
        if (component.get("type") === "main-banner-carousel") {
            component.ensureStyleComponent();

            setTimeout(() => {
                const el = component.view?.el;
                if (el && !el.hasAttribute("data-banner-initialized")) {
                    bannerScriptFunction.call(el);
                }
            }, 800);
        }
    });

    editor.on("canvas:load", function () {
        setTimeout(() => {
            const frame = editor.Canvas.getFrameEl();
            if (frame && frame.contentDocument) {
                let styleEl =
                    frame.contentDocument.getElementById("main-banner-styles");
                if (!styleEl) {
                    styleEl = frame.contentDocument.createElement("style");
                    styleEl.id = "main-banner-styles";
                    styleEl.innerHTML = bannerCss;
                    frame.contentDocument.head.appendChild(styleEl);
                }

                const wrappers = frame.contentDocument.querySelectorAll(
                    '[data-gjs-type="main-banner-carousel"]',
                );
                wrappers.forEach((wrapper) => {
                    if (!wrapper.hasAttribute("data-banner-initialized")) {
                        bannerScriptFunction.call(wrapper);
                    }
                });
            }
        }, 1200);
    });

    editor.on("component:update", function (component) {
        if (component.get("type") === "main-banner-carousel") {
            component.ensureStyleComponent();
        }
    });
}
