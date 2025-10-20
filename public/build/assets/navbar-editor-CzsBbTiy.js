import{s as N,_ as j,g as P,l as I,a as z,b as U,c as H,d as O}from"./buttonBlocks-DdDJieYB.js";import{g as V}from"./index-BasNPDJC.js";import{s as A,S as D}from"./sweetalert2.esm.all-x82VjDyW.js";function W(u){const r=u.BlockManager;u.DomComponents.addType("configurable-navbar",{model:{defaults:{tagName:"header",attributes:{class:"bg-white text-gray-800"},draggable:!0,droppable:!0,traits:[{type:"button",name:"configure-navbar",label:"Navbar",text:"Configurar",full:!0,command:e=>{const n=e.getSelected();t(e,n)}}],"navbar-config":{theme:"light",logoUrl:"https://via.placeholder.com/150x50?text=LOGO",topBarButtons:[{text:"Solicitudes en línea",url:"#",type:"primary"},{text:"Banca en línea",url:"#",type:"primary"}],showSearch:!0,mainMenuItems:[{text:"Asociados",url:"#",type:"internal",isDropdown:!0,children:[{text:"Tarjetas",url:"#",type:"internal",isDropdown:!0,children:[{text:"Crédito",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Débito",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Créditos",url:"#",type:"internal",isDropdown:!0,children:[{text:"Personal",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Vivienda",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Vehículo",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Calcula tu cuota",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Cuentas",url:"#",type:"internal",isDropdown:!0,children:[{text:"Personal",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Infanto Juvenil",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Premium",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Diamante",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Depósito a Plazo",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Seguros",url:"#",type:"internal",isDropdown:!0,children:[{text:"Pólizas de seguro",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Seguros Ventanilla",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Asistencias",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Afiliación",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Clientes",url:"#",type:"internal",isDropdown:!0,children:[{text:"Créditos",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Ahorros",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Noticias",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Promociones",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Educación",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Contáctanos",url:"#",type:"internal",isDropdown:!1,children:[]}]}},init(){if(!this.get("navbar-config")){const e=this.get("defaults");e&&e["navbar-config"]&&this.set("navbar-config",e["navbar-config"])}this.on("change:navbar-config",this.updateNavbarHTML),setTimeout(()=>this.updateNavbarHTML(),0)},generateSubmenuHTML(e,n=1,o="light",i=window.location.pathname){return!e||e.length===0||n>3?"":e.map(d=>{const m=d.isDropdown&&d.children&&d.children.length>0,s=d.url&&(d.url===i||d.url!=="#"&&i.startsWith(d.url));return m&&n===1?`
                            <div class="navbar-nested-dropdown ${s?"active":""}">
                                <button class="navbar-nested-toggle flex items-center" type="button">
                                    <span>${d.text}</span>
                                    <i class="ri-arrow-down-s-line ml-1"></i>
                                </button>
                                <div class="navbar-nested-menu" style="display: none;">
                                    <div class="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0">
                                        ${this.generateSubmenuHTML(d.children,n+1,o,i)}
                                    </div>
                                </div>
                            </div>
                            `:m&&n===2?`
                            <div class="navbar-nested-dropdown level-2 relative ${s?"active":""}" data-has-children="true">
                                <div class="submenu-container">
                                    <button type="button" class="submenu-toggle level2-btn flex justify-between items-center w-full text-left px-4 py-2 hover:bg-primary hover:text-white rounded transition-colors">
                                        <span>${d.text}</span>
                                        <i class="ri-arrow-down-s-line ml-1"></i>
                                    </button>
                                    <ul class="submenu-level3 hidden bg-white shadow-lg p-2 absolute left-0 top-full" style="width: 200px; z-index: 1003; border-top: 2px solid #23366A;">
                                        ${d.children.map(f=>`
                                            <li>
                                                <a href="${f.url}" class="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors ${f.url===i?"bg-primary text-white":""}">
                                                    ${f.text}
                                                </a>
                                            </li>
                                        `).join("")}
                                    </ul>
                                </div>
                            </div>
                            `:`
                            <a href="${d.url}" class="${n===1?"navbar-menu-item":"block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors"} ${s?"bg-primary text-white":""}">
                                ${d.text}
                            </a>
                            `}).join("")},generateMobileSubmenuHTML(e,n=1,o="light",i="text-gray-800",c="hover:bg-gray-100"){if(!e||e.length===0||n>3)return"";const m=n*1;return e.map(s=>s.isDropdown&&s.children&&s.children.length>0?`
                            <div class="mobile-dropdown-nested" data-level="${n}">
                                <button class="w-full text-left flex justify-between items-center px-4 py-2 ${i} bg-gray-100 ${c} rounded-full mobile-dropdown-toggle-nested" style="padding-left: ${m+1}rem;">
                                    ${s.text}
                                    <i class="ri-arrow-down-s-line transition-transform duration-200"></i>
                                </button>
                                <div class="navbar-hidden space-y-1 mt-1" style="padding-left: ${m}rem;">
                                    ${this.generateMobileSubmenuHTML(s.children,n+1,o,i,c)}
                                </div>
                            </div>
                            `:`
                            <a href="${s.url}" class="block px-4 py-2 ${i} bg-gray-100 ${c} rounded-full" style="padding-left: ${m+1}rem;">
                                ${s.text}
                            </a>
                            `).join("")},updateNavbarHTML(){let e;this.get("navbar-config")?e=this.get("navbar-config"):this.get("defaults")&&this.get("defaults")["navbar-config"]?e=this.get("defaults")["navbar-config"]:e={theme:"light",logoUrl:"https://via.placeholder.com/150x50?text=LOGO",topBarButtons:[],showSearch:!0,mainMenuItems:[]};const n=e.theme||"light",o=n==="light",i=o?"bg-white":"bg-primary",c=o?"text-gray-800":"text-white",d=o?"text-gray-600":"text-gray-200",m=o?"border-primary":"border-white",s=o?"hover:bg-gray-100":"hover:bg-blue-800",f=o?"bg-primary text-white hover:bg-blue-800":"bg-white text-primary hover:bg-gray-100",k=`
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
                    <div class="w-full ${o?"text-gray-800":"text-white"}" style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000;">
                        <div class="${i} ${c} py-2">
                            <div class="container mx-auto px-4">
                                <div class="flex justify-between items-center">
                                    <div class="flex-shrink-0 pr-4">
                                        <a href="/">
                                            <img src="${e.logoUrl||"https://via.placeholder.com/150x50?text=LOGO"}" 
                                                alt="Logo" style="max-height: 50px; width: auto;">
                                        </a>
                                    </div>
                                    
                                    <div class="flex items-center">
                                        <div class="hidden md:flex items-center space-x-4">
                                            <div class="flex gap-3">
                                                ${(e.topBarButtons||[]).map(b=>`
                                                    <a href="${b.url}" class="${b.type==="primary"?f:"text-"+c} px-6 py-2 rounded-full whitespace-nowrap">
                                                        ${b.text}
                                                    </a>
                                                `).join("")}
                                            </div>
                                            
                                            ${e.showSearch?`
                                                <div class="relative min-w-[120px] max-w-[300px]">
                                                    <input type="text" class="navbar-search-input w-full border-2 ${m} rounded-full py-1.5 px-4 pl-10 ${o?"bg-white":"bg-opacity-10 bg-white"} ${o?"text-gray-800":"text-white"} placeholder-${d}" placeholder="Buscar...">
                                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <i class="ri-search-line ${c}"></i>
                                                    </div>
                                                </div>
                                            `:""}
                                        </div>
                                        
                                        <button class="md:hidden mobile-menu-button p-2 ${c} rounded hover:${s}">
                                            <i class="ri-menu-line text-xl text-primary"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="${i} ${c}">
                            <div class="container mx-auto px-4">
                                <nav class="hidden md:flex justify-center py-2 z-20">
                                    <div class="inline-flex rounded-full" style="position: relative;">
                                        ${(e.mainMenuItems||[]).map((b,v)=>b.isDropdown&&b.children&&b.children.length>0?`
                                                    <div class="navbar-dropdown">
                                                        <button type="button" class="dropdown-toggle block py-2 px-4 ${c} ${i} font-semibold ${v===0?"rounded-l-full":v===e.mainMenuItems.length-1?"rounded-r-full":""} menu-trigger transition-all duration-200 ${o?"hover:bg-primary hover:text-white":"navbar-btn-primary-hover"}" data-navbar-theme="${n}">
                                                            ${b.text}
                                                            <i class="ri-arrow-down-s-line ml-1"></i>
                                                        </button>
                                                        <div class="navbar-dropdown-menu shadow-md">
                                                            <div class="flex-wrap">
                                                                ${this.generateSubmenuHTML(b.children,1,n)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                `:`
                                                    <a href="${b.url}" class="block py-2 px-4 ${c} ${i} font-semibold ${v===0?"rounded-l-full":v===e.mainMenuItems.length-1?"rounded-r-full":"mx-0"} transition-all duration-200 ${o?"hover:bg-primary hover:text-white":"navbar-btn-primary-hover"}">
                                                        ${b.text}
                                                    </a>
                                                `).join("")}
                                    </div>
                                </nav>
                            </div>
                        </div>

                        <div class="navbar-mobile-menu navbar-hidden navbar-md-hidden ${i} ${c}">
                            <div class="px-4 py-3 space-y-2">
                                ${e.showSearch?`
                                    <div class="relative mb-3">
                                        <input type="text" class="navbar-search-input w-full border-2 ${m} rounded-full py-1.5 px-4 pl-10 ${o?"bg-white":"bg-opacity-10 bg-white"} ${o?"text-gray-800":"text-white"} placeholder-${d}" placeholder="Buscar...">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="ri-search-line ${c}"></i>
                                        </div>
                                    </div>
                                `:""}
                                
                                ${(e.topBarButtons||[]).map(b=>`
                                    <a href="${b.url}" class="block w-full text-center ${b.type==="primary"?f:"text-"+c} px-4 py-2 rounded-full mb-2">
                                        ${b.text}
                                    </a>
                                `).join("")}
                                
                                ${(e.mainMenuItems||[]).map(b=>b.isDropdown&&b.children&&b.children.length>0?`
                                            <div class="mobile-dropdown">
                                                <button class="w-full text-left flex justify-between items-center px-4 py-2 ${c} bg-gray-100 hover:${s} rounded-full mobile-dropdown-toggle">
                                                    ${b.text}
                                                    <i class="ri-arrow-down-s-line transition-transform duration-200"></i>
                                                </button>
                                                <div class="navbar-hidden space-y-1 mt-1" style="padding-left: 1rem;">
                                                    ${this.generateMobileSubmenuHTML(b.children,1,n,c,s)}
                                                </div>
                                            </div>
                                        `:`
                                            <a href="${b.url}"<a href="${b.url}" class="block px-4 py-2 ${c} bg-gray-100 hover:${s} rounded-full">
                                                ${b.text}
                                            </a>
                                        `).join("")}
                            </div>
                        </div>
                    </div>

                    <div class="navbar-spacer md:h-[110px] h-[70px]"></div>
                `;this.components(k)}}}),r.add("navbar-light-config",{label:"Navbar Blanco Configurable",category:"navbars",content:{type:"configurable-navbar","navbar-config":{theme:"light",logoUrl:"https://via.placeholder.com/150x50?text=LOGO",topBarButtons:[{text:"Solicitudes en línea",url:"#",type:"primary"},{text:"Banca en línea",url:"#",type:"primary"}],showSearch:!0,mainMenuItems:[{text:"Asociados",url:"#",type:"internal",isDropdown:!0,children:[{text:"Tarjetas",url:"#",type:"internal",isDropdown:!0,children:[{text:"Crédito",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Débito",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Créditos",url:"#",type:"internal",isDropdown:!0,children:[{text:"Personal",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Vivienda",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Vehículo",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Calcula tu cuota",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Cuentas",url:"#",type:"internal",isDropdown:!0,children:[{text:"Personal",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Infanto Juvenil",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Premium",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Diamante",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Depósito a Plazo",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Seguros",url:"#",type:"internal",isDropdown:!0,children:[{text:"Pólizas de seguro",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Seguros Ventanilla",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Asistencias",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Afiliación",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Clientes",url:"#",type:"internal",isDropdown:!0,children:[{text:"Créditos",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Ahorros",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Noticias",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Promociones",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Educación",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Contáctanos",url:"#",type:"internal",isDropdown:!1,children:[]}]}},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect width="24" height="4" fill="#ffffff" stroke="#23366A" stroke-width="1"></rect>
            <rect y="4" width="24" height="3" fill="#ffffff" stroke="#23366A" stroke-width="1"></rect>
            <line x1="2" y1="2" x2="6" y2="2" stroke="#23366A" stroke-width="1.5"></line>
            <line x1="18" y1="2" x2="22" y2="2" stroke="#23366A" stroke-width="1.5"></line>
            <circle cx="14" cy="2" r="1" fill="#23366A"></circle>
            <line x1="2" y1="5.5" x2="5" y2="5.5" stroke="#23366A" stroke-width="0.8"></line>
            <line x1="7" y1="5.5" x2="10" y2="5.5" stroke="#23366A" stroke-width="0.8"></line>
            <line x1="12" y1="5.5" x2="15" y2="5.5" stroke="#23366A" stroke-width="0.8"></line>
            <line x1="17" y1="5.5" x2="20" y2="5.5" stroke="#23366A" stroke-width="0.8"></line>
        </svg>`}),r.add("navbar-primary-config",{label:"Navbar Azul Configurable",category:"navbars",content:{type:"configurable-navbar","navbar-config":{theme:"primary",logoUrl:"https://via.placeholder.com/150x50?text=LOGO",topBarButtons:[{text:"Solicitudes en línea",url:"#",type:"primary"},{text:"Banca en línea",url:"#",type:"primary"}],showSearch:!0,mainMenuItems:[{text:"Asociados",url:"#",type:"internal",isDropdown:!0,children:[{text:"Tarjetas",url:"#",type:"internal",isDropdown:!0,children:[{text:"Crédito",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Débito",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Créditos",url:"#",type:"internal",isDropdown:!0,children:[{text:"Personal",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Vivienda",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Vehículo",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Calcula tu cuota",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Cuentas",url:"#",type:"internal",isDropdown:!0,children:[{text:"Personal",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Infanto Juvenil",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Premium",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Diamante",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Depósito a Plazo",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Seguros",url:"#",type:"internal",isDropdown:!0,children:[{text:"Pólizas de seguro",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Seguros Ventanilla",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Asistencias",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Afiliación",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Clientes",url:"#",type:"internal",isDropdown:!0,children:[{text:"Créditos",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Ahorros",url:"#",type:"internal",isDropdown:!1,children:[]}]},{text:"Noticias",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Promociones",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Educación",url:"#",type:"internal",isDropdown:!1,children:[]},{text:"Contáctanos",url:"#",type:"internal",isDropdown:!1,children:[]}]}},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect width="24" height="4" fill="#23366A"></rect>
            <rect y="4" width="24" height="3" fill="#23366A"></rect>
            <line x1="2" y1="2" x2="6" y2="2" stroke="#ffffff" stroke-width="1.5"></line>
            <line x1="18" y1="2" x2="22" y2="2" stroke="#ffffff" stroke-width="1.5"></line>
            <circle cx="14" cy="2" r="1" fill="#ffffff"></circle>
            <line x1="2" y1="5.5" x2="5" y2="5.5" stroke="#ffffff" stroke-width="0.8"></line>
            <line x1="7" y1="5.5" x2="10" y2="5.5" stroke="#ffffff" stroke-width="0.8"></line>
            <line x1="12" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" stroke-width="0.8"></line>
            <line x1="17" y1="5.5" x2="20" y2="5.5" stroke="#ffffff" stroke-width="0.8"></line>
        </svg>`});function t(e,n){window.editor=e;const o=n.get("navbar-config");Swal.fire({title:"Configurar Barra de Navegación",html:a(o),width:"95%",showCancelButton:!0,confirmButtonText:"Guardar",cancelButtonText:"Cancelar",confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",customClass:{container:"navbar-config-modal",popup:"navbar-config-popup",htmlContainer:"navbar-config-content"},didOpen:()=>{document.querySelector(".navbar-config-modal").setAttribute("data-theme",o.theme||"light"),w()},preConfirm:()=>x()}).then(i=>{i.isConfirmed&&(n.set("navbar-config",i.value),n.trigger("change:navbar-config"))})}function a(e){return`
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
                        <option value="light" ${e.theme==="light"||!e.theme?"selected":""}>Blanco</option>
                        <option value="primary" ${e.theme==="primary"?"selected":""}>Azul</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">URL del Logo</label>
                    <div class="image-selector-wrapper">
                        <input type="text" id="logo-url" class="form-control" value="${e.logoUrl||""}" placeholder="https://ejemplo.com/logo.png" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
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
                        <input type="checkbox" id="show-search" class="form-check-input" ${e.showSearch?"checked":""} style="margin-right: 0.5rem;">
                        Mostrar buscador
                    </label>
                </div>
                <div id="buttons-container">
                    ${(e.topBarButtons||[]).map((n,o)=>l(n,o)).join("")}
                </div>
                <button class="btn-add" id="add-button">
                    <i class="ri-add-line"></i> Agregar botón
                </button>
            </div>

            <!-- Main Menu -->
            <div class="config-section">
                <h4>Menú Principal</h4>
                <div id="menu-items-container">
                    ${(e.mainMenuItems||[]).map((n,o)=>g(n,o)).join("")}
                </div>
                <button class="btn-add" id="add-menu-item">
                    <i class="ri-add-line"></i> Agregar elemento de menú
                </button>
            </div>
        </div>
    `}function l(e,n){return`
            <div class="button-item" data-button-index="${n}">
                <input type="text" class="button-text" value="${e.text}" placeholder="Texto del botón">
                <div style="position: relative; flex: 1;">
                    <input type="text" class="button-url page-search-input" value="${e.url}" placeholder="URL o buscar página">
                    <div class="page-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ced4da; border-radius: 4px; max-height: 200px; overflow-y: auto; z-index: 1000; margin-top: 2px;"></div>
                </div>
                <select class="button-type">
                    <option value="primary" ${e.type==="primary"?"selected":""}>Primario</option>
                    <option value="secondary" ${e.type==="secondary"?"selected":""}>Secundario</option>
                </select>
                <button class="btn-icon remove-button" data-button-index="${n}">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `}function g(e,n){return`
            <div class="menu-item" data-item-index="${n}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <input type="text" class="menu-item-text" value="${e.text}" placeholder="Texto del menú" style="flex: 1; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px; font-weight: 600;">
                    <div style="position: relative; flex: 1; margin-left: 0.5rem;">
                        <input type="text" class="menu-item-url page-search-input" value="${e.url}" placeholder="URL o buscar página" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                        <div class="page-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ced4da; border-radius: 4px; max-height: 200px; overflow-y: auto; z-index: 1000; margin-top: 2px;"></div>
                    </div>
                    <label style="margin-left: 0.5rem; display: flex; align-items: center; white-space: nowrap;">
                        <input type="checkbox" class="menu-item-dropdown" ${e.isDropdown?"checked":""} style="margin-right: 0.25rem;">
                        Dropdown
                    </label>
                    <button class="btn-icon remove-menu-item" data-item-index="${n}" style="margin-left: 0.5rem;">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
                
                <div class="submenu-section" style="display: ${e.isDropdown?"block":"none"};">
                    <h5 style="font-size: 0.875rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">Submenús</h5>
                    <div class="submenu-container">
                        ${(e.children||[]).map((o,i)=>E(o,n,i)).join("")}
                    </div>
                    <button class="btn-add add-submenu" data-item-index="${n}">
                        <i class="ri-add-line"></i> Agregar submenú
                    </button>
                </div>
            </div>
        `}function E(e,n,o){const i=e.children&&e.children.length>0;return`
            <div class="submenu-item" data-submenu-index="${o}">
                <div class="submenu-header">
                    <input type="text" class="submenu-text" value="${e.text}" placeholder="Texto del submenú">
                    <div style="position: relative;">
                        <input type="text" class="submenu-url page-search-input" value="${e.url}" placeholder="URL o buscar página">
                        <div class="page-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ced4da; border-radius: 4px; max-height: 200px; overflow-y: auto; z-index: 1000; margin-top: 2px;"></div>
                    </div>
                    <label style="display: flex; align-items: center; white-space: nowrap; font-size: 0.75rem;">
                        <input type="checkbox" class="submenu-dropdown" ${e.isDropdown?"checked":""} style="margin-right: 0.25rem;">
                        Sub-dropdown
                    </label>
                    <button class="btn-icon add-nested-submenu" data-item-index="${n}" data-submenu-index="${o}" title="Agregar sub-submenú">
                        <i class="ri-add-circle-line"></i>
                    </button>
                    <button class="btn-icon remove-submenu" data-item-index="${n}" data-submenu-index="${o}">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
                
                <div class="nested-submenu-container" style="display: ${e.isDropdown?"block":"none"};">
                    ${i?'<div class="submenu-level-indicator">Nivel 3 - Sub-submenús</div>':""}
                    ${(e.children||[]).map((c,d)=>h(c,n,o,d)).join("")}
                </div>
            </div>
        `}function h(e,n,o,i){return`
            <div class="nested-submenu-item" data-nested-index="${i}">
                <div class="nested-submenu-header">
                    <input type="text" class="nested-submenu-text" value="${e.text}" placeholder="Texto del sub-submenú">
                    <div style="position: relative;">
                        <input type="text" class="nested-submenu-url page-search-input" value="${e.url}" placeholder="URL o buscar página">
                        <div class="page-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ced4da; border-radius: 4px; max-height: 200px; overflow-y: auto; z-index: 1000; margin-top: 2px;"></div>
                    </div>
                    <button class="btn-icon remove-nested-submenu" data-item-index="${n}" data-submenu-index="${o}" data-nested-index="${i}">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
            </div>
        `}function w(e){const n=document.getElementById("select-logo-image");n&&n.addEventListener("click",()=>{const o=x();Swal.close(),setTimeout(()=>{N("image",i=>{const c=u.getSelected();c&&setTimeout(()=>{t(u,c),setTimeout(()=>{const d=document.getElementById("logo-url");d&&i&&i.src&&(d.value=i.src),o&&L(o)},300)},100)})},200)}),document.getElementById("add-button").addEventListener("click",()=>{const o=document.getElementById("buttons-container"),i=o.children.length,c=document.createElement("div");c.innerHTML=l({text:"Nuevo Botón",url:"#",type:"primary"},i),o.appendChild(c.firstElementChild),M(c.firstElementChild)}),document.getElementById("add-menu-item").addEventListener("click",()=>{const o=document.getElementById("menu-items-container"),i=o.children.length,c=document.createElement("div");c.innerHTML=g({text:"Nuevo Elemento",url:"#",isDropdown:!1,children:[]},i),o.appendChild(c.firstElementChild),S(c.firstElementChild)}),document.querySelectorAll(".button-item").forEach(M),document.querySelectorAll(".menu-item").forEach(S),C()}function L(e){const n=document.getElementById("navbar-theme");n&&(n.value=e.theme);const o=document.getElementById("show-search");o&&(o.checked=e.showSearch)}function C(){document.querySelectorAll(".page-search-input").forEach(n=>{let o;const i=n.nextElementSibling;!i||!i.classList.contains("page-search-results")||(n.addEventListener("input",function(c){const d=c.target.value.trim();if(clearTimeout(o),d.startsWith("/")||d.startsWith("#")||d.startsWith("http")||d.length<2){i.style.display="none";return}o=setTimeout(()=>{fetch("/api/pages/search?q="+encodeURIComponent(d)).then(m=>m.json()).then(m=>{m.length===0?i.innerHTML='<div style="padding: 0.5rem; text-align: center; color: #6c757d;">No se encontraron páginas</div>':i.innerHTML=m.map(s=>'<div class="page-search-item" data-slug="'+s.slug+'" style="padding: 0.5rem; cursor: pointer; border-bottom: 1px solid #e9ecef;"><div style="font-weight: 600; color: #23366A;">'+s.title+'</div><div style="font-size: 0.75rem; color: #6c757d;">/'+s.slug+"</div></div>").join(""),i.style.display="block"}).catch(m=>{console.error("Error:",m),i.style.display="none"})},300)}),i.addEventListener("mousedown",function(c){c.preventDefault();const d=c.target.closest(".page-search-item");if(d){const m=d.getAttribute("data-slug");n.value="/"+m,i.style.display="none"}}),n.addEventListener("blur",function(c){setTimeout(()=>{i.style.display="none"},150)}),n.addEventListener("focus",function(){this.value.trim().length>=2&&!this.value.startsWith("/")&&!this.value.startsWith("#")&&!this.value.startsWith("http")&&this.dispatchEvent(new Event("input"))}))})}function M(e){const n=e.querySelector(".remove-button");n&&n.addEventListener("click",()=>e.remove()),C()}function S(e){const n=e.querySelector(".remove-menu-item");n&&n.addEventListener("click",()=>e.remove());const o=e.querySelector(".menu-item-dropdown"),i=e.querySelector(".submenu-section");o&&i&&o.addEventListener("change",function(){i.style.display=this.checked?"block":"none"});const c=e.querySelector(".add-submenu");c&&c.addEventListener("click",()=>{const d=e.querySelector(".submenu-container"),m=e.getAttribute("data-item-index"),s=d.children.length,f=document.createElement("div");f.innerHTML=E({text:"Nuevo Submenú",url:"#",isDropdown:!1,children:[]},m,s);const k=f.firstElementChild;d.appendChild(k),p(k,m)}),e.querySelectorAll(".submenu-item").forEach(d=>{p(d,e.getAttribute("data-item-index"))}),C()}function p(e,n){const o=e.querySelector(".remove-submenu");o&&o.addEventListener("click",()=>e.remove());const i=e.querySelector(".submenu-dropdown"),c=e.querySelector(".nested-submenu-container");i&&c&&i.addEventListener("change",function(){c.style.display=this.checked?"block":"none"});const d=e.querySelector(".add-nested-submenu");d&&d.addEventListener("click",()=>{const m=e.querySelector(".nested-submenu-container"),s=e.getAttribute("data-submenu-index"),f=m.querySelectorAll(".nested-submenu-item").length;if(f===0){const T=document.createElement("div");T.className="submenu-level-indicator",T.textContent="Nivel 3 - Sub-submenús",m.insertBefore(T,m.firstChild)}const k=h({text:"Nuevo Sub-submenú",url:"#"},n,s,f),b=document.createElement("div");b.innerHTML=k;const v=b.firstElementChild;m.appendChild(v),y(v)}),e.querySelectorAll(".nested-submenu-item").forEach(m=>{y(m)}),C()}function y(e){const n=e.querySelector(".remove-nested-submenu");n&&n.addEventListener("click",()=>{const o=e.parentElement;if(e.remove(),o.querySelectorAll(".nested-submenu-item").length===0){const i=o.querySelector(".submenu-level-indicator");i&&i.remove()}}),C()}function x(){const e=document.getElementById("navbar-theme").value,n=document.getElementById("logo-url").value,o=document.getElementById("show-search").checked,i=Array.from(document.querySelectorAll(".button-item")).map(d=>({text:d.querySelector(".button-text").value,url:d.querySelector(".button-url").value,type:d.querySelector(".button-type").value})),c=Array.from(document.querySelectorAll(".menu-item")).map(d=>{const m=d.querySelector(".menu-item-dropdown").checked,s=Array.from(d.querySelectorAll(".submenu-item")).map(f=>{const k=f.querySelector(".submenu-dropdown").checked,b=Array.from(f.querySelectorAll(".nested-submenu-item")).map(v=>({text:v.querySelector(".nested-submenu-text").value,url:v.querySelector(".nested-submenu-url").value,type:"internal",isDropdown:!1,children:[]}));return{text:f.querySelector(".submenu-text").value,url:f.querySelector(".submenu-url").value,type:"internal",isDropdown:k,children:b}});return{text:d.querySelector(".menu-item-text").value,url:d.querySelector(".menu-item-url").value,type:"internal",isDropdown:m,children:s}});return{theme:e,logoUrl:n,showSearch:o,topBarButtons:i,mainMenuItems:c}}}function R(u,r=""){const t=document.getElementById(u);return t?t.value:r}document.addEventListener("DOMContentLoaded",function(){const u=F();_(u),G(u),K(u),X(u),u.on("load",()=>{u.runCommand("sw-visibility");const r=u.Panels.getButton("options","sw-visibility");r&&r.set("active",!0)})});function F(){const u=R("asset-upload-url","/upload-assets"),r=j.init({container:"#gjs",fromElement:!0,storageManager:(()=>{const t=R("page-id");return t?{type:"local",id:"gjs-navbar-",autosave:!0,autoload:!0,stepsBeforeSave:1,options:{local:{key:`gjs-navbar-${t}`}}}:!1})(),deviceManager:{devices:[{name:"Desktop",width:""},{name:"Tablet",width:"768px",widthMedia:"992px"},{name:"Mobile",width:"320px",widthMedia:"575px"}]},i18n:{locale:"es",messages:{es:{styleManager:{properties:"Propiedades",empty:"Selecciona un elemento para usar el Administrador de Estilos",sectors:{position:"Posición",display:"Visualización",flex:"Flex",dimension:"Dimensiones",typography:"Tipografía",decorations:"Decoraciones",extra:"Extra","flex-properties":"Propiedades Flex",background:"Fondo"}},traitManager:{traits:"Atributos",empty:"Selecciona un elemento para editarlo"},blockManager:{labels:{Secciones:"Secciones",Elementos:"Elementos",Botones:"Botones","link-block":"Bloque Enlace",quote:"Cita","text-section":"Sección de Texto",column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen",map:"Mapa",Basic:"Básico",navbars:"Barras de Navegación"},categories:{Basic:"Básico",Secciones:"Secciones",Elementos:"Elementos",Botones:"Botones",Typography:"Tipografía",Media:"Medios",Social:"Social",Layout:"Diseño",navbars:"Barras de Navegación"}},navigator:{navigate:"Navegar",component:"Componente",components:"Componentes",empty:"Sin componentes"},commands:{undo:"Deshacer",redo:"Rehacer",clear:"Limpiar",codeViewer:"Ver código",openAssets:"Abrir medios",openBlocks:"Abrir bloques",openStyle:"Abrir estilos",openTraits:"Abrir atributos"},assetManager:{addButton:"Añadir imagen",inputPlh:"http://ruta-a-tu-imagen.jpg",modalTitle:"Selecciona la imagen",uploadTitle:"Arrastra tus archivos aquí o haz clic para subir"},deviceManager:{device:"Dispositivo",devices:{desktop:"Escritorio",tablet:"Tablet",mobileLandscape:"Móvil Horizontal",mobilePortrait:"Móvil Vertical"}},panels:{buttons:{titles:{preview:"Vista previa",fullscreen:"Pantalla completa","sw-visibility":"Ver componentes","export-template":"Ver código","open-sm":"Abrir estilo","open-tm":"Configuraciones","open-layers":"Abrir capas","open-blocks":"Abrir bloques"}}}}}},assetManager:{upload:u,uploadName:"files",multiUpload:!0,assets:[],uploadFile:t=>{const a=t.dataTransfer?t.dataTransfer.files:t.target.files,l=new FormData;for(const g of a)l.append("files[]",g);fetch(u,{method:"POST",headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:l}).then(g=>g.json()).then(g=>{g.data&&(r.AssetManager.add(g.data),A("Archivos subidos correctamente","success"))}).catch(g=>{console.error("Error:",g),A("Error al subir los archivos","error")})}},canvas:{styles:["https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css","https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"],scripts:[]},styleManager:{sectors:[{name:"Dimensiones",open:!1,buildProps:["width","height","min-width","min-height","max-width","max-height","padding","margin"]},{name:"Tipografía",open:!1,buildProps:["font-family","font-size","font-weight","letter-spacing","color","line-height","text-align","text-shadow"]},{name:"Decoración",open:!1,buildProps:["background-color","border","border-radius","box-shadow"]},{name:"Extra",open:!1,buildProps:["opacity","transition","transform"]},{name:"Flex",open:!1,buildProps:["display","flex-direction","flex-wrap","justify-content","align-items","align-content","order","flex-basis","flex-grow","flex-shrink","align-self"]},{name:"Responsive",open:!1,buildProps:["responsive-hidden","responsive-visible"],properties:[{name:"responsive-hidden",label:"Ocultar en",type:"select",options:[{id:"",name:"Ninguno"},{id:"hidden md:block",name:"Móvil"},{id:"md:hidden",name:"Desktop"}]},{name:"responsive-visible",label:"Mostrar en",type:"select",options:[{id:"",name:"Siempre"},{id:"md:flex",name:"Solo Desktop"},{id:"flex md:hidden",name:"Solo Móvil"}]}]}]},plugins:[P,V,t=>W(t),t=>I(t),t=>z(t),t=>J(t),t=>U(t)],pluginsOpts:{gjsPresetWebpage:{modalImportTitle:"Importar código",modalImportLabel:"Pega tu código HTML/CSS aquí:",modalImportContent:"",importViewerOptions:{},textCleanCanvas:"¿Estás seguro de limpiar el canvas?",showStylesOnChange:!0,textGeneral:"General",textLayout:"Diseño",textTypography:"Tipografía",textDecorations:"Decoraciones",textExtra:"Extra",buttonImport:"Importar",buttonCancel:"Cancelar"},gjsBlocksBasic:{blocks:["column1","column2","column3","column3-7","text","link","image"],category:"Básicos",labels:{column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen",default:"Predeterminado"},flexGrid:!0,stylePrefix:"gjs-"}}});return r.Panels.addPanel({id:"panel-preview",visible:!0,buttons:[{id:"preview",className:"ri-eye-line",command:{run:function(t){t.runCommand("core:preview"),A("Modo vista previa activado","info")},stop:function(t){t.stopCommand("core:preview"),A("Modo edición activado","info")}},attributes:{title:"Vista Previa"}}]}),r.Commands.add("canvas-clear",{run:function(t){D.fire({title:"¿Estás seguro?",text:"¿Realmente deseas limpiar el canvas? Esta acción no se puede deshacer.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, limpiar",cancelButtonText:"Cancelar"}).then(a=>{a.isConfirmed&&(t.DomComponents.clear(),t.CssComposer.clear(),A("El canvas ha sido limpiado correctamente","success"))})}}),r.Commands.add("activate-navbar-scripts",{run:function(t){const a=t.Canvas.getFrameEl();if(!a)return;const l=a.contentDocument||a.contentWindow.document;if(!l)return;const g=window.location.pathname;setTimeout(()=>{try{const E=l.querySelectorAll("[href]");let h=null,w=!1;if(E.forEach(p=>{const y=p.getAttribute("href");if(y&&(y===g||y!=="#"&&g.startsWith(y))){p.classList.add("active"),w=!0;const x=p.closest(".navbar-dropdown");x&&(h=x)}}),!w&&(g==="/"||g==="/inicio"||g==="/asociados"||g==="/tarjetas-asociados")){const p=l.querySelector(".navbar-dropdown");p&&(h=p)}if(h){const p=h.querySelector(".dropdown-toggle"),y=h.querySelector(".navbar-dropdown-menu");if(p&&y){if(y.classList.add("show"),h.classList.add("active"),p.classList.add("active"),(p.getAttribute("data-navbar-theme")||"light")==="light"){p.style.backgroundColor="#23366A",p.style.color="white";const n=p.querySelector("i");n&&(n.style.color="white")}else{p.style.backgroundColor="white",p.style.color="#23366A";const n=p.querySelector("i");n&&(n.style.color="#23366A")}const e=h.closest(".rounded-full");if(e){e.style.borderBottomLeftRadius="0",e.style.borderBottomRightRadius="0",e.style.borderTopLeftRadius="18px",e.style.borderTopRightRadius="18px",e.style.borderBottom="none";const n=e.querySelectorAll("button.dropdown-toggle, a.block");if(n.length>0){const o=n[0];o.style.borderTopLeftRadius="16px",o.style.borderBottomLeftRadius="0px";const i=n[n.length-1];i.style.borderTopRightRadius="16px",i.style.borderBottomRightRadius="0px"}}}}l.querySelectorAll(".navbar-dropdown").forEach(p=>{const y=p.querySelector(".dropdown-toggle"),x=p.querySelector(".navbar-dropdown-menu"),e=p.closest(".rounded-full");if(!y||!x||!e)return;const n=y.cloneNode(!0);y.parentNode.replaceChild(n,y);const o=n.getAttribute("data-navbar-theme")||"light";n.addEventListener("click",function(c){c.preventDefault(),c.stopPropagation();const d=x.classList.contains("show");if(l.querySelectorAll(".navbar-dropdown-menu").forEach(s=>s.classList.remove("show")),l.querySelectorAll(".navbar-nested-menu").forEach(s=>s.style.display="none"),l.querySelectorAll(".dropdown-toggle").forEach(s=>{s.style.backgroundColor="",s.style.color="";const f=s.querySelector("i");f&&(f.style.color="")}),l.querySelectorAll(".navbar-dropdown").forEach(s=>s.classList.remove("active")),l.querySelectorAll(".dropdown-toggle").forEach(s=>s.classList.remove("active")),l.querySelectorAll(".rounded-full").forEach(s=>{s.style.borderBottomLeftRadius="9999px",s.style.borderBottomRightRadius="9999px",s.style.borderTopLeftRadius="9999px",s.style.borderTopRightRadius="9999px"}),d)x.classList.remove("show"),p.classList.remove("active"),n.classList.remove("active"),e&&(e.style.borderBottomLeftRadius="9999px",e.style.borderBottomRightRadius="9999px",e.style.borderTopLeftRadius="9999px",e.style.borderTopRightRadius="9999px",e.style.borderBottom="",e.querySelectorAll("button.dropdown-toggle, a.block").forEach(f=>{f.style.borderTopLeftRadius="",f.style.borderTopRightRadius="",f.style.borderBottomLeftRadius="",f.style.borderBottomRightRadius=""}));else{if(x.classList.add("show"),p.classList.add("active"),n.classList.add("active"),e){e.style.borderBottomLeftRadius="0",e.style.borderBottomRightRadius="0",e.style.borderTopLeftRadius="18px",e.style.borderTopRightRadius="18px",e.style.borderBottom="none";const s=e.querySelectorAll("button.dropdown-toggle, a.block");if(s.length>0){const f=s[0];f.style.borderTopLeftRadius="16px",f.style.borderBottomLeftRadius="0px";const k=s[s.length-1];k.style.borderTopRightRadius="16px",k.style.borderBottomRightRadius="0px"}}if(o==="light"){n.style.backgroundColor="#23366A",n.style.color="white";const s=n.querySelector("i");s&&(s.style.color="white")}else{n.style.backgroundColor="white",n.style.color="#23366A";const s=n.querySelector("i");s&&(s.style.color="#23366A")}}x.style.position="absolute",x.style.top="100%",x.style.left="0",x.style.right="0",x.style.width="100%",x.style.borderBottomLeftRadius="18px",x.style.borderBottomRightRadius="18px",x.style.border="none",x.style.borderTop="2px solid #23366A",x.style.textAlign="center"});const i=p.querySelectorAll(".navbar-nested-toggle");console.log("Menús nivel 2 encontrados:",i.length),i.forEach(function(c){const d=c.cloneNode(!0);c.parentNode.replaceChild(d,c);const m=d.nextElementSibling;if(!m||!m.classList.contains("navbar-nested-menu")){console.log("No se encontró menú anidado");return}d.addEventListener("click",function(s){s.preventDefault(),s.stopPropagation();const f=m.style.display==="block";if(l.querySelectorAll(".navbar-nested-menu").forEach(k=>{k.style.display="none"}),f){const k=this.parentNode.querySelector(".custom-submenu");k&&k.parentNode.removeChild(k)}else{console.log("Mostrando menú nivel 2");const k=m.querySelectorAll("a"),b=[];k.forEach(T=>{b.push({href:T.getAttribute("href"),text:T.textContent.trim()})});const v=l.createElement("div");v.className="custom-submenu",v.style.position="absolute",v.style.left="0",v.style.top="100%",v.style.width=this.offsetWidth+"px",v.style.backgroundColor="white",v.style.zIndex="1002",v.style.borderTopLeftRadius="0",v.style.borderTopRightRadius="0",v.style.borderBottomLeftRadius="18px",v.style.borderBottomRightRadius="18px",v.style.border="none",v.style.borderTop="2px solid #23366A",v.style.overflow="hidden",v.style.boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)",b.forEach(T=>{const B=l.createElement("a");B.href=T.href,B.textContent=T.text,B.style.display="block",B.style.width="100%",B.style.padding="10px 15px",B.style.textAlign="left",B.style.borderBottom="1px solid rgba(35, 54, 106, 0.1)",B.style.textDecoration="none",B.style.color="#374151",B.style.transition="background-color 0.2s, color 0.2s",B.addEventListener("mouseover",function(){this.style.backgroundColor="#23366A",this.style.color="white"}),B.addEventListener("mouseout",function(){this.style.backgroundColor="",this.style.color="#374151"}),v.appendChild(B)}),v.lastChild&&(v.lastChild.style.borderBottom="none"),m.parentNode&&(m.style.display="none",m.parentNode.appendChild(v))}})})});const C=l.querySelector(".mobile-menu-button"),M=l.querySelector(".navbar-mobile-menu");C&&M&&(C.onclick=function(){M.classList.toggle("navbar-hidden");const p=this.querySelector("i");p&&(M.classList.contains("navbar-hidden")?p.className="ri-menu-line text-xl text-primary":p.className="ri-close-line text-xl text-primary")}),l.querySelectorAll(".mobile-dropdown-toggle").forEach(function(p){p.onclick=function(){var y=this.nextElementSibling,x=this.querySelector("i");y&&y.classList.toggle("navbar-hidden"),x&&(x.style.transform=y&&y.classList.contains("navbar-hidden")?"rotate(0deg)":"rotate(180deg)")}}),l.querySelectorAll(".mobile-dropdown-toggle-nested").forEach(function(p){p.onclick=function(){var y=this.nextElementSibling,x=this.querySelector("i");y&&y.classList.toggle("navbar-hidden"),x&&(x.style.transform=y&&y.classList.contains("navbar-hidden")?"rotate(0deg)":"rotate(180deg)")}}),l.addEventListener("click",function(p){!p.target.closest('.w-full[style*="fixed"]')&&!p.target.closest(".account-selector-container")?l.querySelectorAll(".navbar-nested-menu, .custom-submenu").forEach(y=>{y.style.display="none"}):p.target.closest(".navbar-nested-dropdown")||l.querySelectorAll(".navbar-nested-menu, .custom-submenu").forEach(y=>{y.style.display="none"})});const S=l.createElement("style");S.textContent=`
                        .navbar-nested-menu {
                            display: none;
                            padding: 0 !important;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            background-color: white;
                        }
                        
                        .navbar-nested-menu a {
                            display: block;
                            width: 100%;
                            padding: 10px 15px;
                            text-align: left;
                            border-radius: 0 !important;
                            margin: 0;
                            border-bottom: 1px solid rgba(35, 54, 106, 0.1);
                            transition: background-color 0.2s;
                        }
                        
                        .navbar-nested-menu a:last-child {
                            border-bottom: none;
                        }
                        
                        .navbar-nested-menu a:hover {
                            background-color: #23366A;
                            color: white;
                        }
                        
                        .navbar-nested-menu .grid {
                            display: block !important;
                            grid-template-columns: 1fr !important;
                            gap: 0 !important;
                            padding: 0 !important;
                        }
                    `,l.head.appendChild(S)}catch(E){console.error("Error activating navbar scripts:",E)}},300)}}),r.Panels.addPanel({id:"panel-tailwind",visible:!0,buttons:[{id:"open-tailwind-classes",className:"ri-code-box-line",command:"open-tailwind",attributes:{title:"Clases Tailwind"}}]}),r.on("load",()=>{const t=document.createElement("style");t.innerHTML=`
    :root {
        --color-primary: #23366A;
        --color-primary-dark: #0f2d54;
        --color-dark: #333333;
        --color-danger: #e74c3c;
        --color-light: #f8f9fa;
    }
    .swal2-styled.swal2-confirm {
        background-color: #23366A !important;
    }
    .swal2-styled.swal2-cancel {
        background-color: #e74c3c !important;
    }
    .swal2-popup {
        border-radius: 0.5rem;
    }
    .swal2-styled {
        border-radius: 0 !important;
        font-weight: 500 !important;
    }
    .swal2-title {
        color: #333333 !important;
    }

    .gjs-block {
        padding: 10px;
        min-height: 90px;
        font-size: 12px;
        text-align: center;
        border-radius: 0 !important;
    }
    .gjs-block:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .gjs-block svg {
        margin: 0 auto 5px;
    }

    button {
        border-radius: 0 !important;
    }
    .gjs-pn-btn.gjs-pn-active {
        background-color: #23366A !important;
        color: white !important;
    }

    .gjs-block-category-navbars .gjs-block {
        border-left: 3px solid #23366A;
    }

    .gjs-category-open .gjs-title.gjs-block-category-navbars {
        background-color: rgba(18, 60, 105, 0.1);
    }
`,document.head.appendChild(t)}),r.Commands.add("open-tailwind",{run:function(t){const a=t.getSelected();if(!a)return;const l=a.getClasses().join(" ");D.fire({title:"Clases Tailwind",input:"textarea",inputValue:l,inputPlaceholder:"Ingresa las clases separadas por espacios",showCancelButton:!0,confirmButtonText:"Aplicar",confirmButtonColor:"#23366A",cancelButtonText:"Cancelar",cancelButtonColor:"#e74c3c",preConfirm:g=>g.split(" ").filter(E=>E)}).then(g=>{g.isConfirmed&&(a.removeClass(a.getClasses()),a.addClass(g.value),A("Clases aplicadas correctamente","success"))})}}),r.on("component:selected",function(t){if(t){const a=t.getClasses();if(a.length){const l=a.join(" "),g=t.getName();t.set("custom-name",`${g} [${l}]`)}}}),r.on("storage:load",()=>{setTimeout(()=>r.runCommand("activate-navbar-scripts"),300)}),r.on("component:update",t=>{t&&t.getEl&&t.getEl()&&(t.getEl().classList.contains("mobile-menu-button")||t.getEl().classList.contains("mobile-dropdown")||t.getEl().classList.contains("mobile-menu"))&&setTimeout(()=>r.runCommand("activate-navbar-scripts"),300)}),r.DomComponents.addType("nav",{model:{defaults:{traits:[{type:"select",name:"navbar-style",label:"Estilo de Navbar",options:[{id:"light",name:"Claro"},{id:"dark",name:"Oscuro"},{id:"primary",name:"Color Primario"},{id:"transparent",name:"Transparente"}],changeProp:1},{type:"checkbox",name:"sticky",label:"Fijar en tope"},{type:"checkbox",name:"with-shadow",label:"Con sombra"}]},init(){this.on("change:navbar-style",this.handleNavbarStyle),this.on("change:sticky",this.handleSticky),this.on("change:with-shadow",this.handleShadow),this.listenTo(this,"change:attributes",this.handleAttrChange)},handleNavbarStyle(){const t=this.get("navbar-style");let a=this.getClasses();a=a.filter(l=>!["bg-white","bg-gray-900","bg-primary","bg-transparent","text-white","text-gray-900"].includes(l)),t==="light"?a.push("bg-white","text-gray-900"):t==="dark"?a.push("bg-gray-900","text-white"):t==="primary"?a.push("bg-primary","text-white"):t==="transparent"&&a.push("bg-transparent"),this.setClass(a)},handleSticky(){const t=this.get("sticky");let a=this.getClasses();t?a.push("fixed","top-0","left-0","right-0","z-50"):a=a.filter(l=>!["fixed","top-0","left-0","right-0","z-50"].includes(l)),this.setClass(a)},handleShadow(){const t=this.get("with-shadow");let a=this.getClasses();t?a.push("shadow-md"):a=a.filter(l=>l!=="shadow-md"),this.setClass(a)},handleAttrChange(){const t=this.getAttributes();t.sticky&&this.set("sticky",t.sticky),t["with-shadow"]&&this.set("with-shadow",t["with-shadow"])}}}),r.Commands.add("insert-mobile-toggle",{run:function(t){t.getSelected().append(`
            <div class="md:hidden">
                <button class="mobile-menu-button p-2">
                    <i class="ri-menu-line text-xl"></i>
                </button>
            </div>
            <div class="mobile-menu hidden md:hidden">
                <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Elemento 1</a>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Elemento 2</a>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Elemento 3</a>
            </div>
        `),A("Menú móvil agregado","success"),setTimeout(()=>t.runCommand("activate-navbar-scripts"),300)}}),r.on("canvas:load",()=>{setTimeout(()=>r.runCommand("activate-navbar-scripts"),500)}),setTimeout(()=>r.runCommand("activate-navbar-scripts"),1e3),window.activateNavbarScripts=function(){r&&(r.runCommand("activate-navbar-scripts"),console.log("Scripts de navbar activados manualmente"))},r}function G(u){u.Panels.addPanel({id:"panel-devices",visible:!0,buttons:[{id:"device-desktop",command:"set-device-desktop",className:"ri-computer-line",active:!0,attributes:{title:"Vista Escritorio"}},{id:"device-tablet",command:"set-device-tablet",className:"ri-tablet-line",attributes:{title:"Vista Tablet"}},{id:"device-mobile",command:"set-device-mobile",className:"ri-smartphone-line",attributes:{title:"Vista Móvil"}}]}),u.Commands.add("set-device-desktop",{run:r=>r.setDevice("Desktop")}),u.Commands.add("set-device-tablet",{run:r=>r.setDevice("Tablet")}),u.Commands.add("set-device-mobile",{run:r=>r.setDevice("Mobile")})}function J(u){u.BlockManager.add("icon-block",{label:"Icono",category:"Elementos",content:'<i class="ri-home-line" style="font-size: 24px; color: #23366A;"></i>',media:'<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#23366A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'}),H(u),O(u)}function _(u){const r=document.getElementById("save-button");if(!r)return;const t=document.createElement("span");t.id="unsaved-changes-badge",t.textContent="●",t.style.cssText=`
        display: none;
        color: #e74c3c;
        font-size: 20px;
        margin-right: 6px;
        animation: pulse 1.5s ease-in-out infinite;
    `;const a=document.createElement("style");a.textContent=`
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `,document.head.appendChild(a),r.parentNode.insertBefore(t,r);let l=!0;const g=()=>{l||(t.style.display="inline")},E=()=>{t.style.display="none"};setTimeout(()=>{l=!1},1e3),u.on("component:update",g),u.on("component:add",g),u.on("component:remove",g),u.on("style:update",g),r.addEventListener("click",function(){q(u)}),document.addEventListener("keydown",function(h){(h.ctrlKey||h.metaKey)&&h.key==="s"&&(h.preventDefault(),q(u))}),document.addEventListener("editor:saved",E)}function K(u){const r=R("page-id"),t=R("page-load-url");r&&t?fetch(t).then(a=>a.json()).then(a=>{if(a.components)try{const l=typeof a.components=="string"?JSON.parse(a.components):a.components;u.setComponents(l)}catch(l){console.error("Error parsing components:",l),u.setComponents(a.html||"")}else u.setComponents(a.html||"");u.setStyle(a.css||""),setTimeout(()=>u.runCommand("activate-navbar-scripts"),500),A("Datos de la barra de navegación cargados correctamente","success"),window.history.pushState({pageId:r},document.title,window.location.href)}).catch(a=>{console.error("Error loading navbar data:",a),A("Error al cargar los datos de la barra de navegación","error")}):window.history.pushState({isNew:!0},document.title,window.location.href)}function q(u){const r=R("page-id"),t=R("page-store-url","/api/navbars/store"),a=u.getHtml(),l=u.getCss(),g=JSON.stringify(u.getComponents());let h={html:a,css:l,js:`
        (function() {
            function initNavbar() {
                var dropdowns = document.querySelectorAll('.navbar-dropdown');
                const currentUrl = window.location.pathname;

                let foundMatchingUrl = false;
                let activeTopLevelItem = null;

                document.querySelectorAll('[href]').forEach(function(link) {
                    var href = link.getAttribute('href');
                    if (href && (href === currentUrl || (href !== '#' && currentUrl.startsWith(href)))) {
                        link.classList.add('active');
                        
                        var level1Container = link.closest('.navbar-dropdown');
                        if (level1Container) {
                            var mainToggle = level1Container.querySelector('.dropdown-toggle');
                            var mainMenu = level1Container.querySelector('.navbar-dropdown-menu');
                            var mainNavContainer = level1Container.closest('.rounded-full');
                            
                            if (mainToggle) mainToggle.classList.add('active');
                            if (mainMenu) mainMenu.classList.add('show');
                            level1Container.classList.add('active');
                            
                            if (mainToggle && mainMenu) {
                                var currentTheme = mainToggle.getAttribute('data-navbar-theme') || 'light';
                                if (currentTheme === 'light') {
                                    mainToggle.style.backgroundColor = '#23366A';
                                    mainToggle.style.color = 'white';
                                    var icon = mainToggle.querySelector('i');
                                    if (icon) icon.style.color = 'white';
                                } else {
                                    mainToggle.style.backgroundColor = 'white';
                                    mainToggle.style.color = '#23366A';
                                    var icon = mainToggle.querySelector('i');
                                    if (icon) icon.style.color = '#23366A';
                                }
                                
                                if (mainNavContainer) {
                                    mainNavContainer.style.borderBottomLeftRadius = '0';
                                    mainNavContainer.style.borderBottomRightRadius = '0';
                                    mainNavContainer.style.borderTopLeftRadius = '18px';
                                    mainNavContainer.style.borderTopRightRadius = '18px';
                                    mainNavContainer.style.borderBottom = 'none';
                                    
                                    var allButtons = mainNavContainer.querySelectorAll('button.dropdown-toggle, a.block');
                                    if (allButtons.length > 0) {
                                        var firstButton = allButtons[0];
                                        firstButton.style.borderTopLeftRadius = '16px';
                                        firstButton.style.borderBottomLeftRadius = '0px';
                                        
                                        var lastButton = allButtons[allButtons.length - 1];
                                        lastButton.style.borderTopRightRadius = '16px';
                                        lastButton.style.borderBottomRightRadius = '0px';
                                    }
                                }
                            }
                        } else {
                            if (link.classList.contains('block') && !link.classList.contains('dropdown-toggle')) {
                                var navbarContainer = link.closest('.w-full');
                                var theme = 'light';
                                
                                if (navbarContainer && navbarContainer.classList.contains('text-white')) {
                                    theme = 'primary';
                                }
                                
                                if (theme === 'light') {
                                    link.style.backgroundColor = '#23366A';
                                    link.style.color = 'white';
                                } else {
                                    link.style.backgroundColor = 'white';
                                    link.style.color = '#23366A';
                                }
                            }
                        }
                    }
                });

                if (!foundMatchingUrl && (currentUrl === "/" || currentUrl === "/inicio" || currentUrl === "/asociados" || currentUrl === "/tarjetas-asociados")) {
                    var defaultDropdown = document.querySelector('.navbar-dropdown');
                    if (defaultDropdown) {
                        activeTopLevelItem = defaultDropdown;
                        
                        var mainToggle = defaultDropdown.querySelector('.dropdown-toggle');
                        var mainMenu = defaultDropdown.querySelector('.navbar-dropdown-menu');
                        var mainNavContainer = defaultDropdown.closest('.rounded-full');
                        
                        if (mainToggle) mainToggle.classList.add('active');
                        if (mainMenu) mainMenu.classList.add('show');
                        defaultDropdown.classList.add('active');
                        
                        if (mainToggle && mainMenu) {
                            var currentTheme = mainToggle.getAttribute('data-navbar-theme') || 'light';
                            if (currentTheme === 'light') {
                                mainToggle.style.backgroundColor = '#23366A';
                                mainToggle.style.color = 'white';
                                var icon = mainToggle.querySelector('i');
                                if (icon) icon.style.color = 'white';
                            } else {
                                mainToggle.style.backgroundColor = 'white';
                                mainToggle.style.color = '#23366A';
                                var icon = mainToggle.querySelector('i');
                                if (icon) icon.style.color = '#23366A';
                            }
                            
                            if (mainNavContainer) {
                                mainNavContainer.style.borderBottomLeftRadius = '0';
                                mainNavContainer.style.borderBottomRightRadius = '0';
                                mainNavContainer.style.borderTopLeftRadius = '18px';
                                mainNavContainer.style.borderTopRightRadius = '18px';
                                mainNavContainer.style.borderBottom = 'none';
                                
                                var allButtons = mainNavContainer.querySelectorAll('button.dropdown-toggle, a.block');
                                if (allButtons.length > 0) {
                                    var firstButton = allButtons[0];
                                    firstButton.style.borderTopLeftRadius = '16px';
                                    firstButton.style.borderBottomLeftRadius = '0px';
                                    
                                    var lastButton = allButtons[allButtons.length - 1];
                                    lastButton.style.borderTopRightRadius = '16px';
                                    lastButton.style.borderBottomRightRadius = '0px';
                                }
                            }
                        }
                    }
                }
                
                dropdowns.forEach(function(dropdown) {
                    var toggle = dropdown.querySelector('.dropdown-toggle');
                    var menu = dropdown.querySelector('.navbar-dropdown-menu');
                    var mainNavContainer = dropdown.closest('.rounded-full');
                    
                    if (!toggle || !menu || !mainNavContainer) return;
                    
                    var currentTheme = toggle.getAttribute('data-navbar-theme') || 'light';
                    
                    toggle.onclick = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        var isOpen = menu.classList.contains('show');
                        
                        document.querySelectorAll('.navbar-dropdown-menu').forEach(function(m) {
                            m.classList.remove('show');
                        });
                        document.querySelectorAll('.navbar-nested-menu').forEach(function(m) {
                            m.style.display = 'none';
                        });
                        
                        document.querySelectorAll('.dropdown-toggle').forEach(function(t) {
                            t.style.backgroundColor = '';
                            t.style.color = '';
                            var icon = t.querySelector('i');
                            if (icon) icon.style.color = '';
                        });
                        
                        document.querySelectorAll('.navbar-dropdown').forEach(function(d) {
                            d.classList.remove('active');
                        });
                        document.querySelectorAll('.dropdown-toggle').forEach(function(t) {
                            t.classList.remove('active');
                        });
                        
                        if (!isOpen) {
                            menu.classList.add('show');
                            dropdown.classList.add('active');
                            toggle.classList.add('active');
                            
                            if (mainNavContainer) {
                                mainNavContainer.style.borderBottomLeftRadius = '0';
                                mainNavContainer.style.borderBottomRightRadius = '0';
                                mainNavContainer.style.borderTopLeftRadius = '18px';
                                mainNavContainer.style.borderTopRightRadius = '18px';
                                mainNavContainer.style.borderBottom = 'none';
                                
                                var allButtons = mainNavContainer.querySelectorAll('button.dropdown-toggle, a.block');
                                
                                if (allButtons.length > 0) {
                                    var firstButton = allButtons[0];
                                    firstButton.style.borderTopLeftRadius = '16px';
                                    firstButton.style.borderBottomLeftRadius = '0px';
                                    
                                    var lastButton = allButtons[allButtons.length - 1];
                                    lastButton.style.borderTopRightRadius = '16px';
                                    lastButton.style.borderBottomRightRadius = '0px';
                                }
                            }
                            
                            if (currentTheme === 'light') {
                                toggle.style.backgroundColor = '#23366A';
                                toggle.style.color = 'white';
                                var icon = toggle.querySelector('i');
                                if (icon) icon.style.color = 'white';
                            } else {
                                toggle.style.backgroundColor = 'white';
                                toggle.style.color = '#23366A';
                                var icon = toggle.querySelector('i');
                                if (icon) icon.style.color = '#23366A';
                            }
                        } else {
                            menu.classList.remove('show');
                            dropdown.classList.remove('active');
                            toggle.classList.remove('active');
                            
                            if (mainNavContainer) {
                                mainNavContainer.style.borderBottomLeftRadius = '9999px';
                                mainNavContainer.style.borderBottomRightRadius = '9999px';
                                mainNavContainer.style.borderTopLeftRadius = '9999px';
                                mainNavContainer.style.borderTopRightRadius = '9999px';
                                mainNavContainer.style.borderBottom = '';
                                
                                var allButtons = mainNavContainer.querySelectorAll('button.dropdown-toggle, a.block');
                                allButtons.forEach(function(btn) {
                                    btn.style.borderTopLeftRadius = '';
                                    btn.style.borderTopRightRadius = '';
                                    btn.style.borderBottomLeftRadius = '';
                                    btn.style.borderBottomRightRadius = '';
                                });
                            }
                        }
                        
                        var innerContainer = menu.querySelector('div');
                        if (innerContainer) {
                            innerContainer.className = 'flex flex-wrap justify-center';
                            innerContainer.style.width = '100%';
                            innerContainer.style.padding = '0';
                        }
                        
                        menu.style.position = 'absolute';
                        menu.style.top = '100%';
                        menu.style.left = '0';
                        menu.style.right = '0';
                        menu.style.width = '100%';
                        menu.style.borderBottomLeftRadius = '18px';
                        menu.style.borderBottomRightRadius = '18px';
                        menu.style.border = 'none';
                        menu.style.borderTop = '2px solid #23366A';
                        menu.style.textAlign = 'center';
                    };
                    
                    var nestedToggles = dropdown.querySelectorAll('.navbar-nested-toggle');
                    
                    nestedToggles.forEach(function(nestedToggle) {
                        var nestedMenu = nestedToggle.nextElementSibling;
                        if (!nestedMenu || !nestedMenu.classList.contains('navbar-nested-menu')) {
                            return;
                        }
                        
                        nestedToggle.onclick = function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            var customMenu = this.parentNode.querySelector('.custom-submenu');
                            var isVisible = customMenu ? true : false;
                            
                            document.querySelectorAll('.navbar-nested-menu, .custom-submenu').forEach(function(m) {
                                if (m.parentNode) {
                                    m.parentNode.removeChild(m);
                                }
                            });
                            
                            if (!isVisible) {
                                var links = nestedMenu.querySelectorAll('a');
                                var linkData = [];
                                links.forEach(function(link) {
                                    linkData.push({
                                        href: link.getAttribute('href'),
                                        text: link.textContent.trim()
                                    });
                                });
                                
                                var newMenu = document.createElement('div');
                                newMenu.className = 'custom-submenu';
                                newMenu.style.position = 'absolute';
                                newMenu.style.left = '0';
                                newMenu.style.top = '100%';
                                newMenu.style.width = this.offsetWidth + 'px';
                                newMenu.style.backgroundColor = 'white';
                                newMenu.style.zIndex = '1002';
                                newMenu.style.borderTopLeftRadius = '0';
                                newMenu.style.borderTopRightRadius = '0';
                                newMenu.style.borderBottomLeftRadius = '18px';
                                newMenu.style.borderBottomRightRadius = '18px';
                                newMenu.style.border = 'none';
                                newMenu.style.borderTop = '2px solid #23366A';
                                newMenu.style.overflow = 'hidden';
                                newMenu.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                                
                                linkData.forEach(function(item) {
                                    var link = document.createElement('a');
                                    link.href = item.href;
                                    link.textContent = item.text;
                                    link.style.display = 'block';
                                    link.style.width = '100%';
                                    link.style.padding = '10px 15px';
                                    link.style.textAlign = 'left';
                                    link.style.borderBottom = '1px solid rgba(35, 54, 106, 0.1)';
                                    link.style.textDecoration = 'none';
                                    link.style.color = '#374151';
                                    link.style.transition = 'background-color 0.2s, color 0.2s';
                                    
                                    link.onmouseover = function() {
                                        this.style.backgroundColor = '#23366A';
                                        this.style.color = 'white';
                                    };
                                    
                                    link.onmouseout = function() {
                                        this.style.backgroundColor = '';
                                        this.style.color = '#374151';
                                    };
                                    
                                    newMenu.appendChild(link);
                                });
                                
                                if (newMenu.lastChild) {
                                    newMenu.lastChild.style.borderBottom = 'none';
                                }
                                
                                this.parentNode.appendChild(newMenu);
                            }
                        };
                    });
                });
                
                var searchInputs = document.querySelectorAll('.navbar-search-input');
                searchInputs.forEach(function(searchInput) {
                    var searchTimeout;
                    
                    var searchResults = searchInput.parentElement.querySelector('.navbar-search-results');
                    
                    if (!searchResults) {
                        searchResults = document.createElement('div');
                        searchResults.className = 'navbar-search-results absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto hidden z-50';
                        searchInput.parentElement.style.position = 'relative';
                        searchInput.parentElement.appendChild(searchResults);
                    }
                    
                    searchInput.addEventListener('input', function(e) {
                        var query = e.target.value.trim();
                        clearTimeout(searchTimeout);
                        
                        if (query.length < 2) {
                            searchResults.classList.add('hidden');
                            return;
                        }
                        
                        searchTimeout = setTimeout(function() {
                            fetch('/api/pages/search?q=' + encodeURIComponent(query))
                                .then(function(response) { return response.json(); })
                                .then(function(pages) {
                                    if (pages.length === 0) {
                                        searchResults.innerHTML = '<div class="p-4 text-gray-500 text-center">No se encontraron resultados</div>';
                                    } else {
                                        searchResults.innerHTML = pages.map(function(page) {
                                            return '<a href="' + page.url + '" class="block px-4 py-2 hover:bg-gray-100 border-b last:border-b-0">' +
                                                '<div class="font-semibold text-gray-900">' + page.title + '</div>' +
                                                '</a>';
                                        }).join('');
                                    }
                                    searchResults.classList.remove('hidden');
                                })
                                .catch(function(error) {
                                    console.error('Error:', error);
                                    searchResults.classList.add('hidden');
                                });
                        }, 300);
                    });
                    
                    document.addEventListener('click', function(e) {
                        if (!searchInput.parentElement.contains(e.target)) {
                            searchResults.classList.add('hidden');
                        }
                    });
                });
                
                var mobileBtn = document.querySelector('.mobile-menu-button');
                var mobileMenu = document.querySelector('.navbar-mobile-menu');

                if (mobileBtn && mobileMenu) {
                    mobileBtn.onclick = function() {
                        mobileMenu.classList.toggle('navbar-hidden');
                        
                        var icon = this.querySelector('i');
                        if (icon) {
                            if (mobileMenu.classList.contains('navbar-hidden')) {
                                icon.className = 'ri-menu-line text-xl text-primary';
                            } else {
                                icon.className = 'ri-close-line text-xl text-primary';
                            }
                        }
                    };
                }
                
                document.querySelectorAll('.mobile-dropdown-toggle').forEach(function(btn) {
                    btn.onclick = function() {
                        var submenu = this.nextElementSibling;
                        var icon = this.querySelector('i');
                        if (submenu) submenu.classList.toggle('navbar-hidden');
                        if (icon) {
                            icon.style.transform = submenu && submenu.classList.contains('navbar-hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                        }
                    };
                });
                
                document.querySelectorAll('.mobile-dropdown-toggle-nested').forEach(function(btn) {
                    btn.onclick = function() {
                        var submenu = this.nextElementSibling;
                        var icon = this.querySelector('i');
                        if (submenu) submenu.classList.toggle('navbar-hidden');
                        if (icon) {
                            icon.style.transform = submenu && submenu.classList.contains('navbar-hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                        }
                    };
                });
                
                document.addEventListener('click', function(e) {
                    if (!e.target.closest('.w-full[style*="fixed"]') && !e.target.closest('.account-selector-container')) {
                        document.querySelectorAll('.navbar-nested-menu, .custom-submenu').forEach(function(m) {
                            m.style.display = 'none';
                        });
                    } else if (!e.target.closest('.navbar-nested-dropdown')) {
                        document.querySelectorAll('.navbar-nested-menu, .custom-submenu').forEach(function(m) {
                            m.style.display = 'none';
                        });
                    }
                });
                
                var styleEl = document.createElement('style');
                styleEl.textContent = \`
                    .navbar-nested-menu {
                        display: none;
                        padding: 0 !important;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        background-color: white;
                    }
                    .navbar-nested-menu a {
                        display: block;
                        width: 100%;
                        padding: 10px 15px;
                        text-align: left;
                        border-radius: 0 !important;
                        margin: 0;
                        border-bottom: 1px solid rgba(35, 54, 106, 0.1);
                        transition: background-color 0.2s;
                    }
                    .navbar-nested-menu a:last-child {
                        border-bottom: none;
                    }
                    .navbar-nested-menu a:hover {
                        background-color: #23366A;
                        color: white;
                    }
                    .navbar-nested-menu .grid {
                        display: block !important;
                        grid-template-columns: 1fr !important;
                        gap: 0 !important;
                        padding: 0 !important;
                    }
                \`;
                document.head.appendChild(styleEl);
            }
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initNavbar);
            } else {
                initNavbar();
            }
        })();
        `,components:g};r?(h.id=r,$(t,h),document.dispatchEvent(new CustomEvent("editor:saved"))):D.fire({title:"Nombre de la barra de navegación",input:"text",inputLabel:"Ingresa un nombre para la barra de navegación",inputPlaceholder:"Ej: Navbar Principal, Menú Superior, etc.",confirmButtonText:"Agregar",cancelButtonText:"Cancelar",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",inputValidator:w=>{if(!w)return"Debes ingresar un nombre para la barra de navegación"}}).then(w=>{w.isConfirmed&&(h.name=w.value,$(t,h),document.dispatchEvent(new CustomEvent("editor:saved")))})}function $(u,r){D.fire({title:"Guardando...",html:"Por favor espera mientras se guarda la barra de navegación",allowOutsideClick:!1,didOpen:()=>{D.showLoading()}}),fetch(u,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:JSON.stringify(r)}).then(t=>t.json()).then(t=>{if(D.close(),t.success){if(A("Barra de navegación guardada correctamente","success"),window.editorHasUnsavedChanges=!1,document.dispatchEvent(new CustomEvent("editor:saved")),!r.id&&t.id){const a=document.getElementById("page-id");a&&(a.value=t.id);const l=document.getElementById("page-load-url");l&&(l.value=l.value.replace("new",t.id));const g=document.querySelector(".editor-title");g&&r.name&&(g.textContent="Editando: "+r.name),window.history.pushState({},"Editando: "+r.name,"/navbar-editor/"+t.id)}}else A("Error al guardar la barra de navegación: "+(t.message||"Error desconocido"),"error")}).catch(t=>{D.close(),console.error("Error:",t),A("Error al guardar la barra de navegación","error")})}function X(u){let r=!1,t=!1;const a=!R("page-id");if(a)for(let h=0;h<localStorage.length;h++){const w=localStorage.key(h);w&&w.startsWith("gjs-navbar-")&&!w.includes("page-")&&localStorage.removeItem(w)}u.on("component:update",()=>{r=!0}),u.on("component:add",()=>{r=!0}),u.on("component:remove",()=>{r=!0}),u.on("style:update",()=>{r=!0}),document.addEventListener("editor:saved",()=>{r=!1});const l=document.getElementById("save-button");l&&l.addEventListener("click",function(){setTimeout(()=>{r=!1},1e3)}),document.addEventListener("click",function(h){const w=h.target.closest("a[href], button[data-nav]");if(w&&!w.closest("#gjs")&&!w.closest(".swal2-container")&&r){const L=w.getAttribute("href")||"",C=w.hasAttribute("data-nav");(L&&!L.startsWith("#")&&!L.startsWith("javascript:")||C)&&(h.preventDefault(),D.fire({title:"¿Estás seguro?",text:"Hay cambios sin guardar que se perderán si sales de esta página.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, salir",cancelButtonText:"Cancelar"}).then(M=>{if(M.isConfirmed){if(t=!0,a)for(let S=0;S<localStorage.length;S++){const p=localStorage.key(S);p&&p.startsWith("gjs-")&&!p.includes("page-")&&localStorage.removeItem(p)}if(L)window.location.href=L;else if(C){const S=w.getAttribute("data-nav");S==="back"?window.history.back():S==="home"?window.location.href="/":S&&(window.location.href=S)}}}))}}),window.addEventListener("popstate",function(h){r&&!t&&(h.preventDefault(),history.pushState(null,document.title,window.location.href),D.fire({title:"¿Estás seguro?",text:"Hay cambios sin guardar que se perderán si sales de esta página.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, salir",cancelButtonText:"Cancelar"}).then(w=>{if(w.isConfirmed){if(t=!0,a)for(let L=0;L<localStorage.length;L++){const C=localStorage.key(L);C&&C.startsWith("gjs-")&&!C.includes("page-")&&localStorage.removeItem(C)}window.history.back()}}))}),document.querySelectorAll(".back-button, .nav-back, .btn-back").forEach(h=>{!h.hasAttribute("href")&&!h.hasAttribute("data-nav")&&h.setAttribute("data-nav","back")}),document.querySelectorAll(".home-button, .nav-home, .btn-home").forEach(h=>{!h.hasAttribute("href")&&!h.hasAttribute("data-nav")&&h.setAttribute("data-nav","home")})}
