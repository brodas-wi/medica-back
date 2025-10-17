import { showMediaSelector } from "../utils/mediaSelector";

// Navbar Block Loader
export default function loadNavbarBlocks(editor) {
    const blockManager = editor.BlockManager;

    editor.DomComponents.addType("configurable-navbar", {
        model: {
            defaults: {
                tagName: "header",
                attributes: { class: "bg-white text-gray-800" },
                draggable: true,
                droppable: true,
                traits: [
                    {
                        type: "button",
                        name: "configure-navbar",
                        label: "Navbar",
                        text: "Configurar",
                        full: true,
                        command: (editor) => {
                            const component = editor.getSelected();
                            openNavbarConfigModal(editor, component);
                        },
                    },
                ],
                "navbar-config": {
                    theme: "light",
                    logoUrl: "https://via.placeholder.com/150x50?text=LOGO",
                    topBarButtons: [
                        {
                            text: "Solicitudes en línea",
                            url: "#",
                            type: "primary",
                        },
                        {
                            text: "Banca en línea",
                            url: "#",
                            type: "primary",
                        },
                    ],
                    showSearch: true,
                    mainMenuItems: [
                        {
                            text: "Asociados",
                            url: "#",
                            type: "internal",
                            isDropdown: true,
                            children: [
                                {
                                    text: "Tarjetas",
                                    url: "#",
                                    type: "internal",
                                    isDropdown: true,
                                    children: [
                                        {
                                            text: "Crédito",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Débito",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    text: "Créditos",
                                    url: "#",
                                    type: "internal",
                                    isDropdown: true,
                                    children: [
                                        {
                                            text: "Personal",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Vivienda",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Vehículo",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Calcula tu cuota",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    text: "Cuentas",
                                    url: "#",
                                    type: "internal",
                                    isDropdown: true,
                                    children: [
                                        {
                                            text: "Personal",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Infanto Juvenil",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Premium",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Diamante",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Depósito a Plazo",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    text: "Seguros",
                                    url: "#",
                                    type: "internal",
                                    isDropdown: true,
                                    children: [
                                        {
                                            text: "Pólizas de seguro",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Seguros Ventanilla",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                        {
                                            text: "Asistencias",
                                            url: "#",
                                            type: "internal",
                                            isDropdown: false,
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    text: "Afiliación",
                                    url: "#",
                                    type: "internal",
                                    isDropdown: false,
                                    children: [],
                                },
                            ],
                        },
                        {
                            text: "Clientes",
                            url: "#",
                            type: "internal",
                            isDropdown: true,
                            children: [
                                {
                                    text: "Créditos",
                                    url: "#",
                                    type: "internal",
                                    isDropdown: false,
                                    children: [],
                                },
                                {
                                    text: "Ahorros",
                                    url: "#",
                                    type: "internal",
                                    isDropdown: false,
                                    children: [],
                                },
                            ],
                        },
                        {
                            text: "Noticias",
                            url: "#",
                            type: "internal",
                            isDropdown: false,
                            children: [],
                        },
                        {
                            text: "Promociones",
                            url: "#",
                            type: "internal",
                            isDropdown: false,
                            children: [],
                        },
                        {
                            text: "Educación",
                            url: "#",
                            type: "internal",
                            isDropdown: false,
                            children: [],
                        },
                        {
                            text: "Contáctanos",
                            url: "#",
                            type: "internal",
                            isDropdown: false,
                            children: [],
                        },
                    ],
                },
            },

            init() {
                if (!this.get("navbar-config")) {
                    const defaults = this.get("defaults");
                    if (defaults && defaults["navbar-config"]) {
                        this.set("navbar-config", defaults["navbar-config"]);
                    }
                }

                this.on("change:navbar-config", this.updateNavbarHTML);
                setTimeout(() => this.updateNavbarHTML(), 0);
            },

            generateSubmenuHTML(
                children,
                level = 1,
                theme = "light",
                currentUrl = window.location.pathname,
            ) {
                if (!children || children.length === 0) return "";
                const maxLevel = 3;
                if (level > maxLevel) return "";

                return children
                    .map((child) => {
                        const hasChildren =
                            child.isDropdown &&
                            child.children &&
                            child.children.length > 0;
                        const isActive =
                            child.url &&
                            (child.url === currentUrl ||
                                (child.url !== "#" &&
                                    currentUrl.startsWith(child.url)));

                        if (hasChildren && level === 1) {
                            return `
                            <div class="navbar-nested-dropdown ${isActive ? "active" : ""}">
                                <button class="navbar-nested-toggle flex items-center" type="button">
                                    <span>${child.text}</span>
                                    <i class="ri-arrow-down-s-line ml-1"></i>
                                </button>
                                <div class="navbar-nested-menu" style="display: none;">
                                    <div class="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0">
                                        ${this.generateSubmenuHTML(child.children, level + 1, theme, currentUrl)}
                                    </div>
                                </div>
                            </div>
                            `;
                        } else if (hasChildren && level === 2) {
                            return `
                            <div class="navbar-nested-dropdown level-2 relative ${isActive ? "active" : ""}" data-has-children="true">
                                <div class="submenu-container">
                                    <button type="button" class="submenu-toggle level2-btn flex justify-between items-center w-full text-left px-4 py-2 hover:bg-primary hover:text-white rounded transition-colors">
                                        <span>${child.text}</span>
                                        <i class="ri-arrow-down-s-line ml-1"></i>
                                    </button>
                                    <ul class="submenu-level3 hidden bg-white shadow-lg p-2 absolute left-0 top-full" style="width: 200px; z-index: 1003; border-top: 2px solid #23366A;">
                                        ${child.children
                                            .map(
                                                (l3Item) => `
                                            <li>
                                                <a href="${l3Item.url}" class="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors ${l3Item.url === currentUrl ? "bg-primary text-white" : ""}">
                                                    ${l3Item.text}
                                                </a>
                                            </li>
                                        `,
                                            )
                                            .join("")}
                                    </ul>
                                </div>
                            </div>
                            `;
                        } else {
                            return `
                            <a href="${child.url}" class="${level === 1 ? "navbar-menu-item" : "block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors"} ${isActive ? (level === 1 ? "bg-primary text-white" : "bg-primary text-white") : ""}">
                                ${child.text}
                            </a>
                            `;
                        }
                    })
                    .join("");
            },

            generateMobileSubmenuHTML(
                children,
                level = 1,
                theme = "light",
                textClass = "text-gray-800",
                hoverBgClass = "hover:bg-gray-100",
            ) {
                if (!children || children.length === 0) return "";
                const maxLevel = 3;
                if (level > maxLevel) return "";

                const paddingLeft = level * 1;

                return children
                    .map((child) => {
                        if (
                            child.isDropdown &&
                            child.children &&
                            child.children.length > 0
                        ) {
                            return `
                            <div class="mobile-dropdown-nested" data-level="${level}">
                                <button class="w-full text-left flex justify-between items-center px-4 py-2 ${textClass} bg-gray-100 ${hoverBgClass} rounded-full mobile-dropdown-toggle-nested" style="padding-left: ${paddingLeft + 1}rem;">
                                    ${child.text}
                                    <i class="ri-arrow-down-s-line transition-transform duration-200"></i>
                                </button>
                                <div class="navbar-hidden space-y-1 mt-1" style="padding-left: ${paddingLeft}rem;">
                                    ${this.generateMobileSubmenuHTML(child.children, level + 1, theme, textClass, hoverBgClass)}
                                </div>
                            </div>
                            `;
                        } else {
                            return `
                            <a href="${child.url}" class="block px-4 py-2 ${textClass} bg-gray-100 ${hoverBgClass} rounded-full" style="padding-left: ${paddingLeft + 1}rem;">
                                ${child.text}
                            </a>
                            `;
                        }
                    })
                    .join("");
            },

            updateNavbarHTML() {
                let config;

                if (this.get("navbar-config")) {
                    config = this.get("navbar-config");
                } else if (
                    this.get("defaults") &&
                    this.get("defaults")["navbar-config"]
                ) {
                    config = this.get("defaults")["navbar-config"];
                } else {
                    config = {
                        theme: "light",
                        logoUrl: "https://via.placeholder.com/150x50?text=LOGO",
                        topBarButtons: [],
                        showSearch: true,
                        mainMenuItems: [],
                    };
                }

                const theme = config.theme || "light";
                const isLight = theme === "light";
                const isPrimary = theme === "primary";

                const bgClass = isLight ? "bg-white" : "bg-primary";
                const textClass = isLight ? "text-gray-800" : "text-white";
                const textMutedClass = isLight
                    ? "text-gray-600"
                    : "text-gray-200";
                const borderClass = isLight ? "border-primary" : "border-white";
                const borderWidth = "border-2";
                const hoverBgClass = isLight
                    ? "hover:bg-gray-100"
                    : "hover:bg-blue-800";
                const btnPrimaryClass = isLight
                    ? "bg-primary text-white hover:bg-blue-800"
                    : "bg-white text-primary hover:bg-gray-100";

                const navbarHTML = `
                    <style>
                        .navbar-btn-primary-hover:hover {
                            background-color: white !important;
                            color: #23366A !important;
                        }
                        .navbar-btn-primary-hover:hover,
                        .navbar-btn-primary-hover.active,
                        .navbar-dropdown.active .navbar-btn-primary-hover {
                            background-color: white !important;
                            color: #23366A !important;
                        }
                        .navbar-dropdown.active .navbar-btn-primary-hover i {
                            color: #23366A !important;
                        }
                        .navbar-dropdown {
                            position: static;
                            display: inline-block;
                        }
                        .navbar-dropdown-menu {
                            display: none;
                            border: none;
                            position: absolute;
                            background-color: white;
                            width: 100%;
                            z-index: 1000;
                            top: 100%;
                            left: 0;
                            right: 0;
                            border-bottom-left-radius: 18px;
                            border-bottom-right-radius: 18px;
                            border-top: 1px solid #e5e7eb;
                        }
                        .navbar-dropdown-menu.show {
                            display: block;
                            width: calc(100% + 2px) !important;
                            left: -1px !important;
                            right: -1px !important;
                        }
                        .navbar-nested-dropdown {
                            position: relative;
                        }
                        .navbar-nested-menu {
                            background-color: white;
                            min-width: 200px;
                            z-index: 1002;
                            border-radius: 8px;
                        }
                        .navbar-menu-item {
                            display: inline-block;
                            padding: 8px 14px;
                            text-decoration: none;
                            color: #374151;
                            transition: all 0.2s;
                            margin: 0 1px;
                            white-space: nowrap;
                            font-weight: 600;
                        }
                        .navbar-dropdown-menu .navbar-menu-item,
                        .navbar-nested-menu .navbar-menu-item {
                            font-weight: normal !important;
                        }
                        .navbar-menu-item:hover {
                            background-color: #23366A;
                            color: white;
                        }
                        .navbar-nested-toggle {
                            padding: 8px 14px;
                            background: none;
                            border: none;
                            text-align: left;
                            color: #374151;
                            transition: all 0.2s;
                            cursor: pointer;
                            margin: 0 1px;
                            white-space: nowrap;
                        }
                        .navbar-nested-toggle:hover {
                            background-color: #23366A;
                            color: white;
                        }
                        .navbar-l3-menu {
                            display: none;
                            padding-top: 0 !important;
                            padding-bottom: 0 !important;
                            transition: opacity 0.2s ease-in-out;
                            opacity: 0;
                        }
                        .navbar-l3-menu.show-l3 {
                            display: block !important;
                            opacity: 1;
                        }
                        .navbar-nested-toggle-l2 {
                            cursor: pointer;
                            transition: all 0.2s ease;
                        }
                        .navbar-hidden {
                            display: none !important;
                        }
                        @media (min-width: 768px) {
                            .navbar-md-hidden {
                                display: none !important;
                            }
                        }
                        @media (max-width: 767px) {
                            .navbar-md-flex {
                                display: flex !important;
                            }
                        }
                        .navbar-dropdown-menu > div {
                            display: flex;
                            justify-content: center;
                            flex-wrap: wrap;
                            width: 100%;
                            max-width: 1200px;
                            margin: 0 auto;
                            padding: 0;
                        }
                        .navbar-dropdown-menu > div::-webkit-scrollbar {
                            display: none;
                        }
                    </style>
                    <div class="w-full ${isLight ? "text-gray-800" : "text-white"}" style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000;">
                        <div class="${bgClass} ${textClass} py-2">
                            <div class="container mx-auto px-4">
                                <div class="flex justify-between items-center">
                                    <div class="flex-shrink-0 pr-4">
                                        <a href="/">
                                            <img src="${config.logoUrl || "https://via.placeholder.com/150x50?text=LOGO"}" 
                                                alt="Logo" style="max-height: 50px; width: auto;">
                                        </a>
                                    </div>
                                    
                                    <div class="flex items-center">
                                        <div class="hidden md:flex items-center space-x-4">
                                            <div class="flex gap-3">
                                                ${(config.topBarButtons || [])
                                                    .map(
                                                        (btn) => `
                                                    <a href="${btn.url}" class="${btn.type === "primary" ? btnPrimaryClass : "text-" + textClass} px-6 py-2 rounded-full whitespace-nowrap">
                                                        ${btn.text}
                                                    </a>
                                                `,
                                                    )
                                                    .join("")}
                                            </div>
                                            
                                            ${
                                                config.showSearch
                                                    ? `
                                                <div class="relative min-w-[120px] max-w-[300px]">
                                                    <input type="text" class="navbar-search-input w-full border-2 ${borderClass} rounded-full py-1.5 px-4 pl-10 ${isLight ? "bg-white" : "bg-opacity-10 bg-white"} ${isLight ? "text-gray-800" : "text-white"} placeholder-${textMutedClass}" placeholder="Buscar...">
                                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <i class="ri-search-line ${textClass}"></i>
                                                    </div>
                                                </div>
                                            `
                                                    : ""
                                            }
                                        </div>
                                        
                                        <button class="md:hidden mobile-menu-button p-2 ${textClass} rounded hover:${hoverBgClass}">
                                            <i class="ri-menu-line text-xl text-primary"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="${bgClass} ${textClass}">
                            <div class="container mx-auto px-4">
                                <nav class="hidden md:flex justify-center py-2 z-20">
                                    <div class="inline-flex rounded-full" style="position: relative;">
                                        ${(config.mainMenuItems || [])
                                            .map((item, index) => {
                                                if (
                                                    item.isDropdown &&
                                                    item.children &&
                                                    item.children.length > 0
                                                ) {
                                                    return `
                                                    <div class="navbar-dropdown">
                                                        <button type="button" class="dropdown-toggle block py-2 px-4 ${textClass} ${bgClass} font-semibold ${index === 0 ? "rounded-l-full" : index === config.mainMenuItems.length - 1 ? "rounded-r-full" : ""} menu-trigger transition-all duration-200 ${isLight ? "hover:bg-primary hover:text-white" : "navbar-btn-primary-hover"}" data-navbar-theme="${theme}">
                                                            ${item.text}
                                                            <i class="ri-arrow-down-s-line ml-1"></i>
                                                        </button>
                                                        <div class="navbar-dropdown-menu shadow-md">
                                                            <div class="flex-wrap">
                                                                ${this.generateSubmenuHTML(item.children, 1, theme)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                `;
                                                } else {
                                                    return `
                                                    <a href="${item.url}" class="block py-2 px-4 ${textClass} ${bgClass} font-semibold ${index === 0 ? "rounded-l-full" : index === config.mainMenuItems.length - 1 ? "rounded-r-full" : "mx-0"} transition-all duration-200 ${isLight ? "hover:bg-primary hover:text-white" : "navbar-btn-primary-hover"}">
                                                        ${item.text}
                                                    </a>
                                                `;
                                                }
                                            })
                                            .join("")}
                                    </div>
                                </nav>
                            </div>
                        </div>

                        <div class="navbar-mobile-menu navbar-hidden navbar-md-hidden ${bgClass} ${textClass}">
                            <div class="px-4 py-3 space-y-2">
                                ${
                                    config.showSearch
                                        ? `
                                    <div class="relative mb-3">
                                        <input type="text" class="navbar-search-input w-full border-2 ${borderClass} rounded-full py-1.5 px-4 pl-10 ${isLight ? "bg-white" : "bg-opacity-10 bg-white"} ${isLight ? "text-gray-800" : "text-white"} placeholder-${textMutedClass}" placeholder="Buscar...">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="ri-search-line ${textClass}"></i>
                                        </div>
                                    </div>
                                `
                                        : ""
                                }
                                
                                ${(config.topBarButtons || [])
                                    .map(
                                        (btn) => `
                                    <a href="${btn.url}" class="block w-full text-center ${btn.type === "primary" ? btnPrimaryClass : "text-" + textClass} px-4 py-2 rounded-full mb-2">
                                        ${btn.text}
                                    </a>
                                `,
                                    )
                                    .join("")}
                                
                                ${(config.mainMenuItems || [])
                                    .map((item) => {
                                        if (
                                            item.isDropdown &&
                                            item.children &&
                                            item.children.length > 0
                                        ) {
                                            return `
                                            <div class="mobile-dropdown">
                                                <button class="w-full text-left flex justify-between items-center px-4 py-2 ${textClass} bg-gray-100 hover:${hoverBgClass} rounded-full mobile-dropdown-toggle">
                                                    ${item.text}
                                                    <i class="ri-arrow-down-s-line transition-transform duration-200"></i>
                                                </button>
                                                <div class="navbar-hidden space-y-1 mt-1" style="padding-left: 1rem;">
                                                    ${this.generateMobileSubmenuHTML(item.children, 1, theme, textClass, hoverBgClass)}
                                                </div>
                                            </div>
                                        `;
                                        } else {
                                            return `
                                            <a href="${item.url}"<a href="${item.url}" class="block px-4 py-2 ${textClass} bg-gray-100 hover:${hoverBgClass} rounded-full">
                                                ${item.text}
                                            </a>
                                        `;
                                        }
                                    })
                                    .join("")}
                            </div>
                        </div>
                    </div>

                    <div class="navbar-spacer md:h-[110px] h-[70px]"></div>
                `;

                this.components(navbarHTML);
            },
        },
    });

    blockManager.add("navbar-light-config", {
        label: "Navbar Blanco Configurable",
        category: "navbars",
        content: {
            type: "configurable-navbar",
            "navbar-config": {
                theme: "light",
                logoUrl: "https://via.placeholder.com/150x50?text=LOGO",
                topBarButtons: [
                    {
                        text: "Solicitudes en línea",
                        url: "#",
                        type: "primary",
                    },
                    {
                        text: "Banca en línea",
                        url: "#",
                        type: "primary",
                    },
                ],
                showSearch: true,
                mainMenuItems: [
                    {
                        text: "Asociados",
                        url: "#",
                        type: "internal",
                        isDropdown: true,
                        children: [
                            {
                                text: "Tarjetas",
                                url: "#",
                                type: "internal",
                                isDropdown: true,
                                children: [
                                    {
                                        text: "Crédito",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Débito",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                ],
                            },
                            {
                                text: "Créditos",
                                url: "#",
                                type: "internal",
                                isDropdown: true,
                                children: [
                                    {
                                        text: "Personal",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Vivienda",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Vehículo",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Calcula tu cuota",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                ],
                            },
                            {
                                text: "Cuentas",
                                url: "#",
                                type: "internal",
                                isDropdown: true,
                                children: [
                                    {
                                        text: "Personal",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Infanto Juvenil",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Premium",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Diamante",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Depósito a Plazo",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                ],
                            },
                            {
                                text: "Seguros",
                                url: "#",
                                type: "internal",
                                isDropdown: true,
                                children: [
                                    {
                                        text: "Pólizas de seguro",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Seguros Ventanilla",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Asistencias",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                ],
                            },
                            {
                                text: "Afiliación",
                                url: "#",
                                type: "internal",
                                isDropdown: false,
                                children: [],
                            },
                        ],
                    },
                    {
                        text: "Clientes",
                        url: "#",
                        type: "internal",
                        isDropdown: true,
                        children: [
                            {
                                text: "Créditos",
                                url: "#",
                                type: "internal",
                                isDropdown: false,
                                children: [],
                            },
                            {
                                text: "Ahorros",
                                url: "#",
                                type: "internal",
                                isDropdown: false,
                                children: [],
                            },
                        ],
                    },
                    {
                        text: "Noticias",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                    {
                        text: "Promociones",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                    {
                        text: "Educación",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                    {
                        text: "Contáctanos",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                ],
            },
        },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect width="24" height="4" fill="#ffffff" stroke="#23366A" stroke-width="1"></rect>
            <rect y="4" width="24" height="3" fill="#ffffff" stroke="#23366A" stroke-width="1"></rect>
            <line x1="2" y1="2" x2="6" y2="2" stroke="#23366A" stroke-width="1.5"></line>
            <line x1="18" y1="2" x2="22" y2="2" stroke="#23366A" stroke-width="1.5"></line>
            <circle cx="14" cy="2" r="1" fill="#23366A"></circle>
            <line x1="2" y1="5.5" x2="5" y2="5.5" stroke="#23366A" stroke-width="0.8"></line>
            <line x1="7" y1="5.5" x2="10" y2="5.5" stroke="#23366A" stroke-width="0.8"></line>
            <line x1="12" y1="5.5" x2="15" y2="5.5" stroke="#23366A" stroke-width="0.8"></line>
            <line x1="17" y1="5.5" x2="20" y2="5.5" stroke="#23366A" stroke-width="0.8"></line>
        </svg>`,
    });

    blockManager.add("navbar-primary-config", {
        label: "Navbar Azul Configurable",
        category: "navbars",
        content: {
            type: "configurable-navbar",
            "navbar-config": {
                theme: "primary",
                logoUrl: "https://via.placeholder.com/150x50?text=LOGO",
                topBarButtons: [
                    {
                        text: "Solicitudes en línea",
                        url: "#",
                        type: "primary",
                    },
                    {
                        text: "Banca en línea",
                        url: "#",
                        type: "primary",
                    },
                ],
                showSearch: true,
                mainMenuItems: [
                    {
                        text: "Asociados",
                        url: "#",
                        type: "internal",
                        isDropdown: true,
                        children: [
                            {
                                text: "Tarjetas",
                                url: "#",
                                type: "internal",
                                isDropdown: true,
                                children: [
                                    {
                                        text: "Crédito",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Débito",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                ],
                            },
                            {
                                text: "Créditos",
                                url: "#",
                                type: "internal",
                                isDropdown: true,
                                children: [
                                    {
                                        text: "Personal",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Vivienda",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Vehículo",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Calcula tu cuota",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                ],
                            },
                            {
                                text: "Cuentas",
                                url: "#",
                                type: "internal",
                                isDropdown: true,
                                children: [
                                    {
                                        text: "Personal",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Infanto Juvenil",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Premium",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Diamante",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Depósito a Plazo",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                ],
                            },
                            {
                                text: "Seguros",
                                url: "#",
                                type: "internal",
                                isDropdown: true,
                                children: [
                                    {
                                        text: "Pólizas de seguro",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Seguros Ventanilla",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                    {
                                        text: "Asistencias",
                                        url: "#",
                                        type: "internal",
                                        isDropdown: false,
                                        children: [],
                                    },
                                ],
                            },
                            {
                                text: "Afiliación",
                                url: "#",
                                type: "internal",
                                isDropdown: false,
                                children: [],
                            },
                        ],
                    },
                    {
                        text: "Clientes",
                        url: "#",
                        type: "internal",
                        isDropdown: true,
                        children: [
                            {
                                text: "Créditos",
                                url: "#",
                                type: "internal",
                                isDropdown: false,
                                children: [],
                            },
                            {
                                text: "Ahorros",
                                url: "#",
                                type: "internal",
                                isDropdown: false,
                                children: [],
                            },
                        ],
                    },
                    {
                        text: "Noticias",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                    {
                        text: "Promociones",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                    {
                        text: "Educación",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                    {
                        text: "Contáctanos",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                ],
            },
        },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect width="24" height="4" fill="#23366A"></rect>
            <rect y="4" width="24" height="3" fill="#23366A"></rect>
            <line x1="2" y1="2" x2="6" y2="2" stroke="#ffffff" stroke-width="1.5"></line>
            <line x1="18" y1="2" x2="22" y2="2" stroke="#ffffff" stroke-width="1.5"></line>
            <circle cx="14" cy="2" r="1" fill="#ffffff"></circle>
            <line x1="2" y1="5.5" x2="5" y2="5.5" stroke="#ffffff" stroke-width="0.8"></line>
            <line x1="7" y1="5.5" x2="10" y2="5.5" stroke="#ffffff" stroke-width="0.8"></line>
            <line x1="12" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" stroke-width="0.8"></line>
            <line x1="17" y1="5.5" x2="20" y2="5.5" stroke="#ffffff" stroke-width="0.8"></line>
        </svg>`,
    });

    function openNavbarConfigModal(editor, component) {
        window.editor = editor;
        const config = component.get("navbar-config");

        Swal.fire({
            title: "Configurar Barra de Navegación",
            html: createConfigModalHTML(config),
            width: "95%",
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#23366A",
            cancelButtonColor: "#e74c3c",
            customClass: {
                container: "navbar-config-modal",
                popup: "navbar-config-popup",
                htmlContainer: "navbar-config-content",
            },
            didOpen: () => {
                document
                    .querySelector(".navbar-config-modal")
                    .setAttribute("data-theme", config.theme || "light");
                setupModalEventListeners(config);
            },
            preConfirm: () => {
                return collectModalData();
            },
        }).then((result) => {
            if (result.isConfirmed) {
                component.set("navbar-config", result.value);
                component.trigger("change:navbar-config");
            }
        });
    }

    function createConfigModalHTML(config) {
        return `
        <style>
            .navbar-config-popup {
                max-height: 90vh;
                overflow-y: auto;
            }
            .navbar-config-content {
                max-height: 70vh;
                overflow-y: auto;
            }
            .config-section {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
            }
            .config-section h4 {
                color: #23366A;
                font-weight: 600;
                margin-bottom: 0.75rem;
                font-size: 1rem;
            }
            .menu-item {
                background: white;
                padding: 1rem;
                border-radius: 6px;
                margin-bottom: 0.75rem;
                border: 1px solid #dee2e6;
            }
            .submenu-item {
                background: #f1f3f5;
                padding: 0.75rem;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                border: 1px solid #e2e8f0;
            }
            .nested-submenu-item {
                background: #e8f2ff;
                padding: 0.5rem;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                margin-left: 1rem;
                border: 1px solid #cbd5e0;
            }
            .submenu-header {
                display: grid;
                grid-template-columns: 1fr 1fr auto auto auto;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.75rem;
            }
            .nested-submenu-header {
                display: grid;
                grid-template-columns: 1fr 1fr auto;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            .submenu-item input, .submenu-item select, 
            .nested-submenu-item input, .nested-submenu-item select {
                padding: 0.375rem;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 0.875rem;
                width: 100%;
            }
            .btn-icon {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                color: #6c757d;
                font-size: 1.25rem;
                border-radius: 9999px !important;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 32px;
                height: 32px;
            }
            .btn-icon:hover {
                color: #23366A;
                background-color: rgba(35, 54, 106, 0.1);
            }
            .btn-add {
                background: #23366A;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 9999px !important;
                cursor: pointer;
                font-size: 0.875rem;
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
                margin-bottom: 0.5rem;
            }
            .btn-add:hover {
                background: #0f2d54;
            }
            .btn-add-small {
                background: #17a2b8;
                color: white;
                border: none;
                padding: 0.25rem 0.75rem;
                border-radius: 9999px !important;
                cursor: pointer;
                font-size: 0.75rem;
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
                margin-left: 1rem;
                margin-bottom: 0.5rem;
            }
            .btn-add-small:hover {
                background: #138496;
            }
            .button-item {
                display: flex;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.5rem;
                background: #f1f3f5;
                padding: 0.5rem;
                border-radius: 4px;
            }
            .button-item input, .button-item select {
                flex: 1;
                padding: 0.375rem;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 0.875rem;
            }
            .image-selector-wrapper {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .image-selector-button {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: #23366A;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 9999px !important;
                cursor: pointer;
                font-size: 0.875rem;
                white-space: nowrap;
            }
            .image-selector-button:hover {
                background: #0f2d54;
            }
            .submenu-level-indicator {
                font-size: 0.75rem;
                color: #6c757d;
                background: #e9ecef;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                margin-bottom: 0.5rem;
                display: inline-block;
            }
            .submenu-container {
                position: relative;
            }
            .submenu-level3 {
                position: absolute;
                top: 100%;
                left: 0;
                z-index: 1003;
                background-color: white;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                min-width: 200px;
                display: none;
            }
            .level-2:hover .submenu-level3 {
                display: none;
            }
            @media (max-width: 768px) {
                .submenu-header, .nested-submenu-header {
                    grid-template-columns: 1fr;
                    gap: 0.25rem;
                }
            }
        </style>

        <div id="navbar-config-content">
            <!-- Theme and Logo section -->
            <div class="config-section">
                <h4>Estilo y Logo</h4>
                <div class="mb-3">
                    <label class="form-label" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Tema del Navbar</label>
                    <select id="navbar-theme" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                        <option value="light" ${config.theme === "light" || !config.theme ? "selected" : ""}>Blanco</option>
                        <option value="primary" ${config.theme === "primary" ? "selected" : ""}>Azul</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">URL del Logo</label>
                    <div class="image-selector-wrapper">
                        <input type="text" id="logo-url" class="form-control" value="${config.logoUrl || ""}" placeholder="https://ejemplo.com/logo.png" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                        <button type="button" id="select-logo-image" class="image-selector-button">
                            <i class="ri-image-line"></i> Seleccionar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Top Bar Buttons -->
            <div class="config-section">
                <h4>Botones de Barra Superior</h4>
                <div class="mb-3">
                    <label class="form-check-label" style="display: inline-flex; align-items: center; margin-bottom: 0.5rem;">
                        <input type="checkbox" id="show-search" class="form-check-input" ${config.showSearch ? "checked" : ""} style="margin-right: 0.5rem;">
                        Mostrar buscador
                    </label>
                </div>
                <div id="buttons-container">
                    ${(config.topBarButtons || []).map((btn, btnIndex) => createButtonItemHTML(btn, btnIndex)).join("")}
                </div>
                <button class="btn-add" id="add-button">
                    <i class="ri-add-line"></i> Agregar botón
                </button>
            </div>

            <!-- Main Menu -->
            <div class="config-section">
                <h4>Menú Principal</h4>
                <div id="menu-items-container">
                    ${(config.mainMenuItems || []).map((item, itemIndex) => createMenuItemHTML(item, itemIndex)).join("")}
                </div>
                <button class="btn-add" id="add-menu-item">
                    <i class="ri-add-line"></i> Agregar elemento de menú
                </button>
            </div>
        </div>
    `;
    }

    function createButtonItemHTML(btn, btnIndex) {
        return `
            <div class="button-item" data-button-index="${btnIndex}">
                <input type="text" class="button-text" value="${btn.text}" placeholder="Texto del botón">
                <div style="position: relative; flex: 1;">
                    <input type="text" class="button-url page-search-input" value="${btn.url}" placeholder="URL o buscar página">
                    <div class="page-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ced4da; border-radius: 4px; max-height: 200px; overflow-y: auto; z-index: 1000; margin-top: 2px;"></div>
                </div>
                <select class="button-type">
                    <option value="primary" ${btn.type === "primary" ? "selected" : ""}>Primario</option>
                    <option value="secondary" ${btn.type === "secondary" ? "selected" : ""}>Secundario</option>
                </select>
                <button class="btn-icon remove-button" data-button-index="${btnIndex}">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `;
    }

    function createMenuItemHTML(item, itemIndex) {
        return `
            <div class="menu-item" data-item-index="${itemIndex}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <input type="text" class="menu-item-text" value="${item.text}" placeholder="Texto del menú" style="flex: 1; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px; font-weight: 600;">
                    <div style="position: relative; flex: 1; margin-left: 0.5rem;">
                        <input type="text" class="menu-item-url page-search-input" value="${item.url}" placeholder="URL o buscar página" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                        <div class="page-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ced4da; border-radius: 4px; max-height: 200px; overflow-y: auto; z-index: 1000; margin-top: 2px;"></div>
                    </div>
                    <label style="margin-left: 0.5rem; display: flex; align-items: center; white-space: nowrap;">
                        <input type="checkbox" class="menu-item-dropdown" ${item.isDropdown ? "checked" : ""} style="margin-right: 0.25rem;">
                        Dropdown
                    </label>
                    <button class="btn-icon remove-menu-item" data-item-index="${itemIndex}" style="margin-left: 0.5rem;">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
                
                <div class="submenu-section" style="display: ${item.isDropdown ? "block" : "none"};">
                    <h5 style="font-size: 0.875rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">Submenús</h5>
                    <div class="submenu-container">
                        ${(item.children || []).map((subitem, subIndex) => createSubmenuItemHTML(subitem, itemIndex, subIndex)).join("")}
                    </div>
                    <button class="btn-add add-submenu" data-item-index="${itemIndex}">
                        <i class="ri-add-line"></i> Agregar submenú
                    </button>
                </div>
            </div>
        `;
    }

    function createSubmenuItemHTML(subitem, itemIndex, subIndex) {
        const hasNestedChildren =
            subitem.children && subitem.children.length > 0;

        return `
            <div class="submenu-item" data-submenu-index="${subIndex}">
                <div class="submenu-header">
                    <input type="text" class="submenu-text" value="${subitem.text}" placeholder="Texto del submenú">
                    <div style="position: relative;">
                        <input type="text" class="submenu-url page-search-input" value="${subitem.url}" placeholder="URL o buscar página">
                        <div class="page-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ced4da; border-radius: 4px; max-height: 200px; overflow-y: auto; z-index: 1000; margin-top: 2px;"></div>
                    </div>
                    <label style="display: flex; align-items: center; white-space: nowrap; font-size: 0.75rem;">
                        <input type="checkbox" class="submenu-dropdown" ${subitem.isDropdown ? "checked" : ""} style="margin-right: 0.25rem;">
                        Sub-dropdown
                    </label>
                    <button class="btn-icon add-nested-submenu" data-item-index="${itemIndex}" data-submenu-index="${subIndex}" title="Agregar sub-submenú">
                        <i class="ri-add-circle-line"></i>
                    </button>
                    <button class="btn-icon remove-submenu" data-item-index="${itemIndex}" data-submenu-index="${subIndex}">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
                
                <div class="nested-submenu-container" style="display: ${subitem.isDropdown ? "block" : "none"};">
                    ${hasNestedChildren ? '<div class="submenu-level-indicator">Nivel 3 - Sub-submenús</div>' : ""}
                    ${(subitem.children || []).map((nestedItem, nestedIndex) => createNestedSubmenuItemHTML(nestedItem, itemIndex, subIndex, nestedIndex)).join("")}
                </div>
            </div>
        `;
    }

    function createNestedSubmenuItemHTML(
        nestedItem,
        itemIndex,
        subIndex,
        nestedIndex,
    ) {
        return `
            <div class="nested-submenu-item" data-nested-index="${nestedIndex}">
                <div class="nested-submenu-header">
                    <input type="text" class="nested-submenu-text" value="${nestedItem.text}" placeholder="Texto del sub-submenú">
                    <div style="position: relative;">
                        <input type="text" class="nested-submenu-url page-search-input" value="${nestedItem.url}" placeholder="URL o buscar página">
                        <div class="page-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ced4da; border-radius: 4px; max-height: 200px; overflow-y: auto; z-index: 1000; margin-top: 2px;"></div>
                    </div>
                    <button class="btn-icon remove-nested-submenu" data-item-index="${itemIndex}" data-submenu-index="${subIndex}" data-nested-index="${nestedIndex}">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
            </div>
        `;
    }

    function setupModalEventListeners(config) {
        const selectLogoBtn = document.getElementById("select-logo-image");
        if (selectLogoBtn) {
            selectLogoBtn.addEventListener("click", () => {
                const tempConfig = collectModalData();
                Swal.close();

                setTimeout(() => {
                    showMediaSelector("image", (mediaData) => {
                        const selectedComponent = editor.getSelected();
                        if (selectedComponent) {
                            setTimeout(() => {
                                openNavbarConfigModal(
                                    editor,
                                    selectedComponent,
                                );
                                setTimeout(() => {
                                    const logoUrlInput =
                                        document.getElementById("logo-url");
                                    if (
                                        logoUrlInput &&
                                        mediaData &&
                                        mediaData.src
                                    ) {
                                        logoUrlInput.value = mediaData.src;
                                    }
                                    if (tempConfig) {
                                        restoreModalData(tempConfig);
                                    }
                                }, 300);
                            }, 100);
                        }
                    });
                }, 200);
            });
        }

        document.getElementById("add-button").addEventListener("click", () => {
            const container = document.getElementById("buttons-container");
            const btnIndex = container.children.length;
            const newButton = document.createElement("div");
            newButton.innerHTML = createButtonItemHTML(
                { text: "Nuevo Botón", url: "#", type: "primary" },
                btnIndex,
            );
            container.appendChild(newButton.firstElementChild);
            attachButtonEventListeners(newButton.firstElementChild);
        });

        document
            .getElementById("add-menu-item")
            .addEventListener("click", () => {
                const container = document.getElementById(
                    "menu-items-container",
                );
                const itemIndex = container.children.length;
                const newItem = document.createElement("div");
                newItem.innerHTML = createMenuItemHTML(
                    {
                        text: "Nuevo Elemento",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                    itemIndex,
                );
                container.appendChild(newItem.firstElementChild);
                attachMenuItemEventListeners(newItem.firstElementChild);
            });

        document
            .querySelectorAll(".button-item")
            .forEach(attachButtonEventListeners);
        document
            .querySelectorAll(".menu-item")
            .forEach(attachMenuItemEventListeners);
        setupPageSearch();
    }

    function restoreModalData(tempConfig) {
        const themeSelect = document.getElementById("navbar-theme");
        if (themeSelect) themeSelect.value = tempConfig.theme;

        const showSearchCheck = document.getElementById("show-search");
        if (showSearchCheck) showSearchCheck.checked = tempConfig.showSearch;
    }

    function setupPageSearch() {
        const searchInputs = document.querySelectorAll(".page-search-input");

        searchInputs.forEach((input) => {
            let searchTimeout;
            const resultsDiv = input.nextElementSibling;

            if (
                !resultsDiv ||
                !resultsDiv.classList.contains("page-search-results")
            ) {
                return;
            }

            // Evento de input con debounce para evitar búsquedas constantes
            input.addEventListener("input", function (e) {
                const query = e.target.value.trim();

                // Limpiar cualquier timeout previo
                clearTimeout(searchTimeout);

                // No buscar si la entrada es una URL o muy corta
                if (
                    query.startsWith("/") ||
                    query.startsWith("#") ||
                    query.startsWith("http") ||
                    query.length < 2
                ) {
                    resultsDiv.style.display = "none";
                    return;
                }

                // Esperar 300ms antes de realizar la búsqueda
                searchTimeout = setTimeout(() => {
                    fetch("/api/pages/search?q=" + encodeURIComponent(query))
                        .then((response) => response.json())
                        .then((pages) => {
                            if (pages.length === 0) {
                                resultsDiv.innerHTML =
                                    '<div style="padding: 0.5rem; text-align: center; color: #6c757d;">No se encontraron páginas</div>';
                            } else {
                                resultsDiv.innerHTML = pages
                                    .map(
                                        (page) =>
                                            '<div class="page-search-item" data-slug="' +
                                            page.slug +
                                            '" style="padding: 0.5rem; cursor: pointer; border-bottom: 1px solid #e9ecef;">' +
                                            '<div style="font-weight: 600; color: #23366A;">' +
                                            page.title +
                                            "</div>" +
                                            '<div style="font-size: 0.75rem; color: #6c757d;">/' +
                                            page.slug +
                                            "</div>" +
                                            "</div>",
                                    )
                                    .join("");
                            }
                            resultsDiv.style.display = "block";
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            resultsDiv.style.display = "none";
                        });
                }, 300);
            });

            // Usar delegación de eventos para manejar clics en los resultados
            resultsDiv.addEventListener("mousedown", function (e) {
                e.preventDefault(); // Evitar que se pierda el foco del input

                const item = e.target.closest(".page-search-item");
                if (item) {
                    const slug = item.getAttribute("data-slug");
                    input.value = "/" + slug;

                    // Cerrar inmediatamente el menú
                    resultsDiv.style.display = "none";
                }
            });

            // Cerrar resultados cuando el input pierde el foco
            input.addEventListener("blur", function (e) {
                // Pequeño retraso para permitir que el clic se procese primero
                setTimeout(() => {
                    resultsDiv.style.display = "none";
                }, 150);
            });

            // Mostrar resultados cuando el input recibe el foco y cumple con los criterios
            input.addEventListener("focus", function () {
                if (
                    this.value.trim().length >= 2 &&
                    !this.value.startsWith("/") &&
                    !this.value.startsWith("#") &&
                    !this.value.startsWith("http")
                ) {
                    this.dispatchEvent(new Event("input"));
                }
            });
        });
    }

    function attachButtonEventListeners(buttonItem) {
        const removeBtn = buttonItem.querySelector(".remove-button");
        if (removeBtn) {
            removeBtn.addEventListener("click", () => buttonItem.remove());
        }
        setupPageSearch();
    }

    function attachMenuItemEventListeners(menuItem) {
        const removeBtn = menuItem.querySelector(".remove-menu-item");
        if (removeBtn) {
            removeBtn.addEventListener("click", () => menuItem.remove());
        }

        const dropdownCheckbox = menuItem.querySelector(".menu-item-dropdown");
        const submenuSection = menuItem.querySelector(".submenu-section");
        if (dropdownCheckbox && submenuSection) {
            dropdownCheckbox.addEventListener("change", function () {
                submenuSection.style.display = this.checked ? "block" : "none";
            });
        }

        const addSubmenuBtn = menuItem.querySelector(".add-submenu");
        if (addSubmenuBtn) {
            addSubmenuBtn.addEventListener("click", () => {
                const submenuContainer =
                    menuItem.querySelector(".submenu-container");
                const itemIndex = menuItem.getAttribute("data-item-index");
                const submenuIndex = submenuContainer.children.length;

                const newSubmenu = document.createElement("div");
                newSubmenu.innerHTML = createSubmenuItemHTML(
                    {
                        text: "Nuevo Submenú",
                        url: "#",
                        type: "internal",
                        isDropdown: false,
                        children: [],
                    },
                    itemIndex,
                    submenuIndex,
                );
                const submenuElement = newSubmenu.firstElementChild;
                submenuContainer.appendChild(submenuElement);
                attachSubmenuEventListeners(submenuElement, itemIndex);
            });
        }

        menuItem.querySelectorAll(".submenu-item").forEach((submenuItem) => {
            attachSubmenuEventListeners(
                submenuItem,
                menuItem.getAttribute("data-item-index"),
            );
        });

        setupPageSearch();
    }

    function attachSubmenuEventListeners(submenuItem, itemIndex) {
        const removeSubmenuBtn = submenuItem.querySelector(".remove-submenu");
        if (removeSubmenuBtn) {
            removeSubmenuBtn.addEventListener("click", () =>
                submenuItem.remove(),
            );
        }

        const submenuDropdownCheckbox =
            submenuItem.querySelector(".submenu-dropdown");
        const nestedSubmenuContainer = submenuItem.querySelector(
            ".nested-submenu-container",
        );
        if (submenuDropdownCheckbox && nestedSubmenuContainer) {
            submenuDropdownCheckbox.addEventListener("change", function () {
                nestedSubmenuContainer.style.display = this.checked
                    ? "block"
                    : "none";
            });
        }

        const addNestedBtn = submenuItem.querySelector(".add-nested-submenu");
        if (addNestedBtn) {
            addNestedBtn.addEventListener("click", () => {
                const nestedContainer = submenuItem.querySelector(
                    ".nested-submenu-container",
                );
                const submenuIndex =
                    submenuItem.getAttribute("data-submenu-index");
                const nestedIndex = nestedContainer.querySelectorAll(
                    ".nested-submenu-item",
                ).length;

                if (nestedIndex === 0) {
                    const indicator = document.createElement("div");
                    indicator.className = "submenu-level-indicator";
                    indicator.textContent = "Nivel 3 - Sub-submenús";
                    nestedContainer.insertBefore(
                        indicator,
                        nestedContainer.firstChild,
                    );
                }

                const nestedHTML = createNestedSubmenuItemHTML(
                    {
                        text: "Nuevo Sub-submenú",
                        url: "#",
                        type: "internal",
                    },
                    itemIndex,
                    submenuIndex,
                    nestedIndex,
                );

                const tempContainer = document.createElement("div");
                tempContainer.innerHTML = nestedHTML;
                const newNestedSubmenu = tempContainer.firstElementChild;

                nestedContainer.appendChild(newNestedSubmenu);
                attachNestedSubmenuEventListeners(newNestedSubmenu);
            });
        }

        submenuItem
            .querySelectorAll(".nested-submenu-item")
            .forEach((nestedItem) => {
                attachNestedSubmenuEventListeners(nestedItem);
            });

        setupPageSearch();
    }

    function attachNestedSubmenuEventListeners(nestedSubmenuItem) {
        const removeBtn = nestedSubmenuItem.querySelector(
            ".remove-nested-submenu",
        );
        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                const container = nestedSubmenuItem.parentElement;
                nestedSubmenuItem.remove();

                if (
                    container.querySelectorAll(".nested-submenu-item")
                        .length === 0
                ) {
                    const indicator = container.querySelector(
                        ".submenu-level-indicator",
                    );
                    if (indicator) indicator.remove();
                }
            });
        }
        setupPageSearch();
    }

    function collectModalData() {
        const theme = document.getElementById("navbar-theme").value;
        const logoUrl = document.getElementById("logo-url").value;
        const showSearch = document.getElementById("show-search").checked;

        const topBarButtons = Array.from(
            document.querySelectorAll(".button-item"),
        ).map((button) => ({
            text: button.querySelector(".button-text").value,
            url: button.querySelector(".button-url").value,
            type: button.querySelector(".button-type").value,
        }));

        const mainMenuItems = Array.from(
            document.querySelectorAll(".menu-item"),
        ).map((item) => {
            const isDropdown = item.querySelector(
                ".menu-item-dropdown",
            ).checked;

            const children = Array.from(
                item.querySelectorAll(".submenu-item"),
            ).map((subitem) => {
                const isSubmenuDropdown =
                    subitem.querySelector(".submenu-dropdown").checked;

                const nestedChildren = Array.from(
                    subitem.querySelectorAll(".nested-submenu-item"),
                ).map((nestedItem) => ({
                    text: nestedItem.querySelector(".nested-submenu-text")
                        .value,
                    url: nestedItem.querySelector(".nested-submenu-url").value,
                    type: "internal",
                    isDropdown: false,
                    children: [],
                }));

                return {
                    text: subitem.querySelector(".submenu-text").value,
                    url: subitem.querySelector(".submenu-url").value,
                    type: "internal",
                    isDropdown: isSubmenuDropdown,
                    children: nestedChildren,
                };
            });

            return {
                text: item.querySelector(".menu-item-text").value,
                url: item.querySelector(".menu-item-url").value,
                type: "internal",
                isDropdown: isDropdown,
                children: children,
            };
        });

        return {
            theme,
            logoUrl,
            showSearch,
            topBarButtons,
            mainMenuItems,
        };
    }
}
