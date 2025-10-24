import{s as C,_ as B,g as j,l as q,a as $,b as I,c as M,d as P}from"./buttonBlocks-Nuf9loky.js";import{g as U}from"./index-BasNPDJC.js";import{s as y,S as w}from"./sweetalert2.esm.all-x82VjDyW.js";function D(s){const r=s.BlockManager;s.DomComponents.addType("configurable-footer",{model:{defaults:{tagName:"footer",attributes:{class:"bg-gray-50"},draggable:!0,droppable:!0,traits:[{type:"button",name:"configure-footer",label:"Footer",text:"Configurar",full:!0,command:n=>{const o=n.getSelected();e(n,o)}}],"footer-config":{logoUrl:"https://via.placeholder.com/150x50?text=LOGO",columns:[{id:"col1",title:"Información institucional",hasSubmenu:!0,links:[{text:"Acerca de COMÉDICA",url:"#",type:"internal"},{text:"Gobierno corporativo",url:"#",type:"internal"},{text:"Activos extraordinarios",url:"#",type:"internal"},{text:"Estados Financieros",url:"#",type:"internal"}]},{id:"col2",title:"Puntos de Servicio",hasSubmenu:!0,links:[{text:"Agencias",url:"#",type:"internal"},{text:"Corresponsales financieros",url:"#",type:"internal"},{text:"Banca en Línea",url:"#",type:"internal"},{text:"WhatsApp",url:"#",type:"external"}]},{id:"col3",title:"Quejas y sugerencias",hasSubmenu:!0,links:[{text:"Estadísticas",url:"#",type:"internal"}]},{id:"col4",title:"Preguntas frecuentes",hasSubmenu:!1,links:[{text:"Preguntas frecuentes",url:"#",type:"internal"}]},{id:"col5",title:"Tasas y comisiones",hasSubmenu:!1,links:[{text:"Tasas y comisiones",url:"#",type:"internal"}]},{id:"col6",title:"Términos y condiciones",hasSubmenu:!1,links:[{text:"Términos y condiciones",url:"#",type:"internal"}]},{id:"col7",title:"Política de seguridad",hasSubmenu:!1,links:[{text:"Política de seguridad",url:"#",type:"internal"}]},{id:"col8",title:"Bolsa de Empleo",hasSubmenu:!1,links:[{text:"Bolsa de Empleo",url:"#",type:"internal"}]},{id:"col9",title:"Contactos",hasSubmenu:!1,links:[{text:"Contactos",url:"#",type:"internal"}]}],badges:[{imageUrl:"https://via.placeholder.com/80x80?text=Badge1",altText:"Badge 1",url:"#"},{imageUrl:"https://via.placeholder.com/80x80?text=Badge2",altText:"Badge 2",url:"#"},{imageUrl:"https://via.placeholder.com/80x80?text=Badge3",altText:"Badge 3",url:"#"}],socialLinks:[{icon:"ri-facebook-fill",url:"https://facebook.com",platform:"facebook"},{icon:"ri-instagram-fill",url:"https://instagram.com",platform:"instagram"},{icon:"ri-twitter-x-line",url:"https://twitter.com",platform:"twitter"}]}},init(){if(!this.get("footer-config")){const n=this.get("defaults");n&&n["footer-config"]&&this.set("footer-config",n["footer-config"])}this.on("change:footer-config",this.updateFooterHTML),setTimeout(()=>this.updateFooterHTML(),0)},updateFooterHTML(){let n;this.get("footer-config")?n=this.get("footer-config"):this.get("defaults")&&this.get("defaults")["footer-config"]?n=this.get("defaults")["footer-config"]:n={logoUrl:"https://via.placeholder.com/150x50?text=LOGO",columns:[],badges:[],socialLinks:[]};const o=this.generateColumnsHTML(n.columns),t=`<img src="${n.logoUrl||"https://via.placeholder.com/150x50?text=LOGO"}" alt="Logo" class="h-10 md:h-12">`,l=(n.badges||[]).map(c=>`
                    <a href="${c.url}" target="_blank" rel="noopener" class="inline-block">
                        <img src="${c.imageUrl}" alt="${c.altText}" class="h-12 w-auto">
                    </a>
                `).join(""),i=(n.socialLinks||[]).map(c=>`
                    <a href="${c.url}" 
                       target="_blank" 
                       rel="noopener"
                       class="footer-social-link inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary transition-colors">
                        <i class="${c.icon}"></i>
                    </a>
                `).join(""),d=`
                    <div class="footer-container bg-gray-50 text-gray-800">
                        <div class="footer-links-section py-4">
                            <div class="container mx-auto px-4">
                                <div class="footer-columns grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                                    ${o}
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer-bottom bg-primary py-4">
                            <div class="container mx-auto px-4">
                                <div class="flex flex-col md:flex-row justify-between items-center">
                                    <div class="mb-4 md:mb-0">
                                        ${t}
                                    </div>
                                    
                                    <div class="flex flex-wrap items-center gap-4">
                                        <div class="flex items-center gap-4">
                                            ${l}
                                        </div>
                                        <div class="flex items-center gap-3">
                                            ${i}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script>
                        (function() {
                            // Initialize footer dropdowns
                            document.querySelectorAll('.footer-dropdown-toggle').forEach(toggle => {
                                toggle.addEventListener('click', function(e) {
                                    const parent = this.closest('.footer-column');
                                    const content = parent.querySelector('.footer-dropdown-content');
                                    const icon = this.querySelector('i');
                                    
                                    // Close all other dropdowns
                                    document.querySelectorAll('.footer-dropdown-content.block').forEach(openContent => {
                                        if (openContent !== content) {
                                            openContent.classList.remove('block');
                                            openContent.classList.add('hidden');
                                            
                                            const openToggle = openContent.parentElement.querySelector('.footer-dropdown-toggle');
                                            if (openToggle) {
                                                openToggle.classList.remove('bg-primary');
                                                openToggle.classList.remove('text-white');
                                                
                                                const openIcon = openToggle.querySelector('i');
                                                if (openIcon) {
                                                    openIcon.classList.remove('ri-arrow-up-s-line');
                                                    openIcon.classList.add('ri-arrow-down-s-line');
                                                }
                                            }
                                        }
                                    });
                                    
                                    // Toggle current dropdown
                                    if (content.classList.contains('hidden')) {
                                        content.classList.remove('hidden');
                                        content.classList.add('block');
                                        
                                        this.classList.add('bg-primary');
                                        this.classList.add('text-white');
                                        this.classList.remove('text-primary');
                                        
                                        if (icon) {
                                            icon.classList.remove('ri-arrow-down-s-line');
                                            icon.classList.add('ri-arrow-up-s-line');
                                            icon.style.color = 'white';
                                        }
                                    } else {
                                        content.classList.remove('block');
                                        content.classList.add('hidden');
                                        
                                        this.classList.remove('bg-primary');
                                        this.classList.remove('text-white');
                                        this.classList.add('text-primary');
                                        
                                        if (icon) {
                                            icon.classList.remove('ri-arrow-up-s-line');
                                            icon.classList.add('ri-arrow-down-s-line');
                                            icon.style.color = '';
                                        }
                                    }
                                });
                            });
                        })();
                    <\/script>
                `;this.components(d)},generateColumnsHTML(n){return(n||[]).map(o=>{if(o.hasSubmenu&&o.links&&o.links.length>1)return`
                            <div class="footer-column mb-1">
                                <div class="footer-dropdown">
                                    <button class="footer-dropdown-toggle flex items-center justify-between w-full text-left font-semibold text-md text-primary py-2 px-4 rounded-xl hover:bg-primary hover:text-white transition-colors">
                                        ${o.title}
                                        <i class="ri-arrow-down-s-line ml-2 transition-transform"></i>
                                    </button>
                                    <div class="footer-dropdown-content hidden mt-2 pl-2">
                                        ${o.links.map(t=>`
                                            <a href="${t.url}" 
                                               ${t.type==="external"?'target="_blank" rel="noopener"':""}
                                               class="block py-2 px-4 rounded-xl hover:bg-primary hover:text-white transition-colors">
                                                ${t.text}
                                            </a>
                                        `).join("")}
                                    </div>
                                </div>
                            </div>
                        `;{const t=o.links&&o.links.length>0?o.links[0]:{url:"#",text:o.title};return`
                            <div class="footer-column mb-1">
                                <a href="${t.url}" 
                                   ${t.type==="external"?'target="_blank" rel="noopener"':""}
                                   class="font-semibold text-md text-primary py-2 px-4 rounded-xl block hover:bg-primary hover:text-white transition-colors">
                                    ${o.title}
                                </a>
                            </div>
                        `}}).join("")}}}),r.add("footer-modern-config",{label:"Footer Configurable",category:"footers",content:{type:"configurable-footer","footer-config":{logoUrl:"https://via.placeholder.com/150x50?text=LOGO",columns:[{id:"col1",title:"Información institucional",hasSubmenu:!0,links:[{text:"Acerca de COMÉDICA",url:"#",type:"internal"},{text:"Gobierno corporativo",url:"#",type:"internal"},{text:"Activos extraordinarios",url:"#",type:"internal"},{text:"Estados Financieros",url:"#",type:"internal"}]},{id:"col2",title:"Puntos de Servicio",hasSubmenu:!0,links:[{text:"Agencias",url:"#",type:"internal"},{text:"Corresponsales financieros",url:"#",type:"internal"},{text:"Banca en Línea",url:"#",type:"internal"},{text:"WhatsApp",url:"#",type:"external"}]},{id:"col3",title:"Quejas y sugerencias",hasSubmenu:!0,links:[{text:"Estadísticas",url:"#",type:"internal"}]},{id:"col4",title:"Preguntas frecuentes",hasSubmenu:!1,links:[{text:"Preguntas frecuentes",url:"#",type:"internal"}]},{id:"col5",title:"Tasas y comisiones",hasSubmenu:!1,links:[{text:"Tasas y comisiones",url:"#",type:"internal"}]},{id:"col6",title:"Términos y condiciones",hasSubmenu:!1,links:[{text:"Términos y condiciones",url:"#",type:"internal"}]},{id:"col7",title:"Política de seguridad",hasSubmenu:!1,links:[{text:"Política de seguridad",url:"#",type:"internal"}]},{id:"col8",title:"Bolsa de Empleo",hasSubmenu:!1,links:[{text:"Bolsa de Empleo",url:"#",type:"internal"}]},{id:"col9",title:"Contactos",hasSubmenu:!1,links:[{text:"Contactos",url:"#",type:"internal"}]}],badges:[{imageUrl:"https://via.placeholder.com/80x80?text=Badge1",altText:"Badge 1",url:"#"},{imageUrl:"https://via.placeholder.com/80x80?text=Badge2",altText:"Badge 2",url:"#"},{imageUrl:"https://via.placeholder.com/80x80?text=Badge3",altText:"Badge 3",url:"#"}],socialLinks:[{icon:"ri-facebook-fill",url:"https://facebook.com",platform:"facebook"},{icon:"ri-instagram-fill",url:"https://instagram.com",platform:"instagram"},{icon:"ri-twitter-x-line",url:"https://twitter.com",platform:"twitter"}]}},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect width="24" height="20" y="2" fill="#f3f4f6" rx="2"></rect>
            <rect width="24" height="4" y="18" fill="#23366A" rx="1"></rect>
            <rect x="2" y="4" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="7" y="4" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="12" y="4" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="17" y="4" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="2" y="8" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="7" y="8" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="12" y="8" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="17" y="8" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="2" y="12" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="7" y="12" width="4" height="3" fill="#23366A" opacity="0.2" rx="0.5"></rect>
            <rect x="2" y="19" width="5" height="2" fill="#fff" opacity="0.7" rx="0.5"></rect>
            <circle cx="19" cy="20" r="1" fill="#fff" opacity="0.7"></circle>
            <circle cx="16" cy="20" r="1" fill="#fff" opacity="0.7"></circle>
            <circle cx="22" cy="20" r="1" fill="#fff" opacity="0.7"></circle>
        </svg>`});function e(n,o){window.editor=n;const t=o.get("footer-config");Swal.fire({title:"Configurar Footer",html:u(t),width:"95%",padding:0,showCancelButton:!0,confirmButtonText:"Guardar",cancelButtonText:"Cancelar",confirmButtonColor:"#23366A",cancelButtonColor:"#7e7e7e",customClass:{container:"footer-config-modal",popup:"footer-config-popup",header:"footer-config-header",title:"footer-config-title",content:"footer-config-content",actions:"footer-config-actions"},allowOutsideClick:!1,allowEscapeKey:!0,didOpen:()=>{document.querySelector(".swal2-popup").style.padding="0",g()},preConfirm:()=>E()}).then(l=>{l.isConfirmed&&(o.set("footer-config",l.value),o.trigger("change:footer-config"))})}function a(){document.querySelectorAll(".page-search-input").forEach(o=>{let t=o.nextElementSibling;(!t||!t.classList.contains("page-search-results"))&&(t=document.createElement("div"),t.className="page-search-results",t.style.cssText=`
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #ced4da;
                border-radius: 4px;
                max-height: 250px;
                overflow-y: auto;
                z-index: 1010;
                margin-top: 2px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            `,o.parentNode.style.position="relative",o.insertAdjacentElement("afterend",t));let l;const i=d=>{t.innerHTML=`
                <div class="page-search-loading" style="padding: 10px; text-align: center; color: #6c757d;">
                    <i class="ri-search-line" style="margin-right: 5px;"></i> Buscando...
                </div>
            `,t.style.display="block",fetch(`/api/pages/search?q=${encodeURIComponent(d)}`).then(c=>c.json()).then(c=>{if(c.length===0)t.innerHTML=`
                            <div class="page-search-empty" style="padding: 10px; text-align: center; color: #6c757d;">
                                No se encontraron páginas
                            </div>
                        `;else{const m=c.map(b=>`
                            <div class="page-search-item" data-slug="/${b.slug}" data-title="${b.title}" 
                                 style="padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #e9ecef; transition: background-color 0.2s;">
                                <div style="font-weight: 600; color: #23366A; margin-bottom: 2px;">
                                    ${b.title}
                                </div>
                                <div style="font-size: 0.75rem; color: #6c757d; display: flex; align-items: center;">
                                    <i class="ri-link" style="margin-right: 4px; font-size: 12px;"></i>
                                    /${b.slug}
                                </div>
                            </div>
                        `).join("");t.innerHTML=m,t.querySelectorAll(".page-search-item").forEach(b=>{b.addEventListener("mouseenter",()=>{b.style.backgroundColor="#f8f9fa"}),b.addEventListener("mouseleave",()=>{b.style.backgroundColor="transparent"})})}}).catch(c=>{console.error("Error al buscar páginas:",c),t.innerHTML=`
                        <div class="page-search-error" style="padding: 10px; text-align: center; color: #dc3545;">
                            Error al buscar páginas
                        </div>
                    `})};o.addEventListener("input",d=>{const c=d.target.value.trim();if(clearTimeout(l),c.startsWith("http")||c.length<2){t.style.display="none";return}if(c.startsWith("/")){const m=c.substring(1);m.length>1?l=setTimeout(()=>i(m),300):t.style.display="none";return}l=setTimeout(()=>i(c),300)}),t.addEventListener("mousedown",d=>{d.preventDefault();const c=d.target.closest(".page-search-item");if(c){const m=c.getAttribute("data-slug");o.value=m,t.style.display="none",o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}}),document.addEventListener("click",d=>{!o.contains(d.target)&&!t.contains(d.target)&&(t.style.display="none")}),o.addEventListener("focus",function(){this.value.trim().length>=2&&!this.value.startsWith("http")&&this.dispatchEvent(new Event("input"))}),o.addEventListener("keydown",d=>{if(t.style.display==="none")return;const c=Array.from(t.querySelectorAll(".page-search-item"));if(c.length===0)return;const m=t.querySelector(".page-search-item.active");let f=m?c.indexOf(m):-1;switch(d.key){case"ArrowDown":d.preventDefault(),m&&(m.style.backgroundColor="transparent",m.classList.remove("active")),f=(f+1)%c.length,c[f].classList.add("active"),c[f].style.backgroundColor="#e9ecef",c[f].scrollIntoView({block:"nearest"});break;case"ArrowUp":d.preventDefault(),m&&(m.style.backgroundColor="transparent",m.classList.remove("active")),f=(f-1+c.length)%c.length,c[f].classList.add("active"),c[f].style.backgroundColor="#e9ecef",c[f].scrollIntoView({block:"nearest"});break;case"Enter":if(m){d.preventDefault();const b=m.getAttribute("data-slug");o.value=b,t.style.display="none",o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}break;case"Escape":d.preventDefault(),t.style.display="none";break}})})}function u(n){return`
        <style>
            .footer-config-popup {
                display: flex;
                flex-direction: column;
                max-height: 90vh;
                max-width: 90vw;
                padding: 0 !important;
                margin: 0 !important;
                border-radius: 8px;
                overflow: hidden;
                width: 100% !important;
            }
            .footer-config-header {
                background-color: #23366A;
                color: white;
                padding: 1rem;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            .footer-config-title {
                font-size: 1.25rem !important;
                margin: 0 !important;
            }
            .footer-config-content {
                padding: 0 !important;
                margin: 0 !important;
                overflow: visible !important;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .footer-config-actions {
                background-color: #f8f9fa;
                border-top: 1px solid #dee2e6;
                padding: 1rem;
                position: sticky;
                bottom: 0;
                z-index: 10;
            }
            #footer-config-inner {
                padding: 0;
                overflow-y: auto;
                flex: 1;
                height: calc(90vh - 110px);
            }
            .footer-config-tabs {
                display: flex;
                overflow-x: auto;
                overflow-y: hidden;
                background-color: #fff;
                border-bottom: 1px solid #dee2e6;
                position: sticky;
                top: 0;
                z-index: 5;
                width: 100%;
                padding: 0;
            }
            .footer-config-tab {
                padding: 0.75rem 1.5rem;
                cursor: pointer;
                border: none;
                background: none;
                font-weight: 500;
                color: #495057;
                white-space: nowrap;
                position: relative;
            }
            .footer-config-tab.active {
                color: #23366A;
                font-weight: 600;
            }
            .footer-config-tab.active::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 2px;
                background-color: #23366A;
            }
            .footer-config-panel {
                display: none;
                padding: 1rem;
                overflow-y: auto;
                height: 100%;
            }
            .footer-config-panel.active {
                display: block;
            }
            .config-section {
                background: #ffffff;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                border: 1px solid #eee;
            }
            .config-section h4 {
                color: #23366A;
                font-weight: 600;
                margin-bottom: 0.75rem;
                font-size: 1rem;
            }
            .column-item {
                background: white;
                padding: 1rem;
                border-radius: 6px;
                margin-bottom: 0.75rem;
                border: 1px solid #dee2e6;
            }
            .link-item {
                background: #f8f9fa;
                padding: 0.5rem;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                display: grid;
                grid-template-columns: 1fr 1fr auto auto;
                gap: 0.5rem;
                align-items: center;
            }
            .link-item input, .link-item select {
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
                font-weight: 600;
                background: #23366A;
                color: white;
                border: none;
                padding: 0.65rem 1rem;
                cursor: pointer;
                font-size: 0.875rem;
                white-space: nowrap;
                flex-shrink: 0;
            }
            .image-selector-button:hover {
                background: #0f2d54;
            }
            .btn-icon {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                color: #6c757d;
                font-size: 1.25rem;
            }
            .btn-icon:hover {
                color: #23366A;
            }
            .remove-column:hover, .remove-link:hover, .remove-badge:hover, .remove-social:hover {
                color: #cf010b !important;
            }
            .btn-add {
                background: #23366A;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
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
            .badge-item {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.5rem;
                background: white;
                padding: 0.75rem;
                border-radius: 4px;
                border: 1px solid #dee2e6;
            }
            .badge-preview {
                width: 60px;
                height: 60px;
                object-fit: contain;
                background-color: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 4px;
                cursor: pointer;
            }
            .badge-inputs {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .badge-inputs input {
                padding: 0.375rem;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 0.875rem;
            }
            .has-submenu-checkbox {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
            }
            .social-item {
                display: flex;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.5rem;
                background: white;
                padding: 0.75rem;
                border-radius: 4px;
                border: 1px solid #dee2e6;
            }
            .social-item input, .social-item select {
                flex: 1;
                padding: 0.375rem;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 0.875rem;
            }
            .swal2-html-container {
                padding: 0 !important;
                margin: 0 !important;
                overflow-y: hidden !important;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .swal2-actions {
                margin: 0 !important;
                padding: 1rem !important;
                background-color: #f8f9fa;
                border-top: 1px solid #dee2e6;
                width: 100%;
                justify-content: flex-end !important;
                z-index: 5;
            }
            @media (max-width: 768px) {
                .link-item {
                    grid-template-columns: 1fr;
                }
                .badge-item {
                    grid-template-columns: 1fr;
                }
                .footer-config-panel {
                    padding: 0.5rem;
                }
                .footer-config-tab {
                    padding: 0.5rem 1rem;
                }
                #footer-config-inner {
                    height: calc(90vh - 140px);
                }
            }
        </style>

        <div id="footer-config-container">
            <div class="footer-config-tabs">
                <button class="footer-config-tab active" data-target="general">General</button>
                <button class="footer-config-tab" data-target="columns">Columnas</button>
                <button class="footer-config-tab" data-target="badges">Badges</button>
                <button class="footer-config-tab" data-target="social">Redes</button>
            </div>
            
            <div id="footer-config-inner">
                <div id="panel-general" class="footer-config-panel active">
                    <div class="config-section">
                        <h4>Logo</h4>
                        <div class="mb-3">
                            <label class="form-label" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">URL del Logo</label>
                            <div class="image-selector-wrapper">
                                <input type="text" id="logo-url" class="form-control" value="${n.logoUrl||""}" placeholder="https://ejemplo.com/logo.png" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                                <button type="button" id="select-logo-image" class="image-selector-button">
                                    <i class="ri-image-line"></i> Seleccionar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="panel-columns" class="footer-config-panel">
                    <div class="config-section">
                        <h4>Columnas de Enlaces</h4>
                        <div id="columns-container">
                            ${n.columns.map((o,t)=>`
                                    <div class="column-item" data-column-index="${t}">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                                            <input type="text" class="column-title" value="${o.title}" placeholder="Título de la columna" style="flex: 1; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px; font-weight: 600;">
                                            <button class="btn-icon remove-column" data-column-index="${t}">
                                                <i class="ri-delete-bin-line"></i>
                                            </button>
                                        </div>
                                        <div class="has-submenu-checkbox">
                                            <input type="checkbox" id="has-submenu-${t}" class="has-submenu" ${o.hasSubmenu?"checked":""}>
                                            <label for="has-submenu-${t}" style="font-size: 0.875rem; margin: 0;">Tiene submenú desplegable</label>
                                        </div>
                                        <div class="single-link-container" style="display: ${o.hasSubmenu?"none":"block"}; margin-top: 0.75rem;">
                                            <div style="position: relative;">
                                                <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem;">URL del enlace:</label>
                                                <input type="text" class="single-link-url page-search-input" value="${o.links&&o.links.length>0?o.links[0].url:"#"}" placeholder="URL del enlace" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                                            </div>
                                        </div>
                                        <div class="links-container" ${o.hasSubmenu?"":'style="display:none"'}>
                                            ${(o.links||[]).map((l,i)=>`
                                                <div class="link-item" data-link-index="${i}">
                                                    <input type="text" class="link-text" value="${l.text}" placeholder="Texto del enlace">
                                                    <input type="text" class="link-url page-search-input" value="${l.url}" placeholder="URL">
                                                    <select class="link-type">
                                                        <option value="internal" ${l.type==="internal"?"selected":""}>Interno</option>
                                                        <option value="external" ${l.type==="external"?"selected":""}>Externo</option>
                                                    </select>
                                                    <button class="btn-icon remove-link" data-column-index="${t}" data-link-index="${i}">
                                                        <i class="ri-close-line"></i>
                                                    </button>
                                                </div>
                                            `).join("")}
                                            <button class="btn-add add-link" data-column-index="${t}">
                                                <i class="ri-add-line"></i> Agregar enlace
                                            </button>
                                        </div>
                                    </div>
                            `).join("")}
                        </div>
                        <button class="btn-add" id="add-column">
                            <i class="ri-add-line"></i> Agregar columna
                        </button>
                    </div>
                </div>
                
                <div id="panel-badges" class="footer-config-panel">
                    <div class="config-section">
                        <h4>Badges e Insignias</h4>
                        <div id="badges-container">
                            ${(n.badges||[]).map((o,t)=>`
                                <div class="badge-item" data-badge-index="${t}">
                                    <img src="${o.imageUrl}" alt="${o.altText}" class="badge-preview">
                                    <div class="badge-inputs">
                                        <input type="text" class="badge-url" value="${o.imageUrl}" placeholder="URL de la imagen">
                                        <input type="text" class="badge-alt" value="${o.altText}" placeholder="Texto alternativo">
                                        <input type="text" class="badge-link page-search-input" value="${o.url}" placeholder="Enlace (opcional)">
                                    </div>
                                    <button class="btn-icon remove-badge" data-badge-index="${t}">
                                        <i class="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            `).join("")}
                        </div>
                        <button class="btn-add" id="add-badge">
                            <i class="ri-add-line"></i> Agregar badge
                        </button>
                    </div>
                </div>
                
                <div id="panel-social" class="footer-config-panel">
                    <div class="config-section">
                        <h4>Enlaces de Redes</h4>
                        <div id="social-container">
                            ${(n.socialLinks||[]).map((o,t)=>`
                                <div class="social-item" data-social-index="${t}">
                                    <select class="social-icon">
                                        <option value="ri-facebook-fill" ${o.icon==="ri-facebook-fill"?"selected":""}>Facebook</option>
                                        <option value="ri-instagram-fill" ${o.icon==="ri-instagram-fill"?"selected":""}>Instagram</option>
                                        <option value="ri-twitter-x-line" ${o.icon==="ri-twitter-x-line"?"selected":""}>Twitter/X</option>
                                        <option value="ri-linkedin-fill" ${o.icon==="ri-linkedin-fill"?"selected":""}>LinkedIn</option>
                                        <option value="ri-youtube-fill" ${o.icon==="ri-youtube-fill"?"selected":""}>YouTube</option>
                                    </select>
                                    <input type="text" class="social-url" value="${o.url}" placeholder="URL">
                                    <button class="btn-icon remove-social" data-social-index="${t}">
                                        <i class="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            `).join("")}
                        </div>
                        <button class="btn-add" id="add-social">
                            <i class="ri-add-line"></i> Agregar red social
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `}function g(n){document.querySelectorAll(".footer-config-tab").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".footer-config-tab").forEach(i=>{i.classList.remove("active")}),document.querySelectorAll(".footer-config-panel").forEach(i=>{i.classList.remove("active")}),t.classList.add("active");const l=`panel-${t.getAttribute("data-target")}`;document.getElementById(l).classList.add("active")})});const o=document.getElementById("select-logo-image");o&&o.addEventListener("click",()=>{const t=E();Swal.close(),setTimeout(()=>{C("image",l=>{l&&l.src&&(t.logoUrl=l.src);const i=s.getSelected();i&&setTimeout(()=>{e(s,i),setTimeout(()=>{x(t);const d=document.getElementById("logo-url");d&&t.logoUrl&&(d.value=t.logoUrl)},300)},100)})},200)}),document.getElementById("add-column").addEventListener("click",()=>{const t=document.getElementById("columns-container"),l=t.children.length,i=document.createElement("div");i.className="column-item",i.setAttribute("data-column-index",l),i.innerHTML=`
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <input type="text" class="column-title" value="Nueva Columna" placeholder="Título de la columna" style="flex: 1; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px; font-weight: 600;">
                    <button class="btn-icon remove-column" data-column-index="${l}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
                <div class="has-submenu-checkbox">
                    <input type="checkbox" id="has-submenu-${l}" class="has-submenu">
                    <label for="has-submenu-${l}" style="font-size: 0.875rem; margin: 0;">Tiene submenú desplegable</label>
                </div>
                <div class="single-link-container" style="display: block; margin-top: 0.75rem;">
                    <div style="position: relative;">
                        <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem;">URL del enlace:</label>
                        <input type="text" class="single-link-url page-search-input" value="#" placeholder="URL del enlace" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;">
                    </div>
                </div>
                <div class="links-container" style="display:none">
                    <button class="btn-add add-link" data-column-index="${l}">
                        <i class="ri-add-line"></i> Agregar enlace
                    </button>
                </div>
            `,t.appendChild(i),k(i)}),document.getElementById("add-badge").addEventListener("click",()=>{const t=document.getElementById("badges-container"),l=t.children.length,i=document.createElement("div");i.className="badge-item",i.setAttribute("data-badge-index",l),i.innerHTML=`
                    <img src="https://via.placeholder.com/80x80?text=New+Badge" alt="Nueva Badge" class="badge-preview">
                    <div class="badge-inputs">
                        <input type="text" class="badge-url" value="https://via.placeholder.com/80x80?text=New+Badge" placeholder="URL de la imagen">
                        <input type="text" class="badge-alt" value="Nueva Badge" placeholder="Texto alternativo">
                        <input type="text" class="badge-link" value="#" placeholder="Enlace (opcional)">
                    </div>
                    <button class="btn-icon remove-badge" data-badge-index="${l}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                `,t.appendChild(i),h(i)}),document.getElementById("add-social").addEventListener("click",()=>{const t=document.getElementById("social-container"),l=t.children.length,i=document.createElement("div");i.className="social-item",i.setAttribute("data-social-index",l),i.innerHTML=`
                    <select class="social-icon">
                        <option value="ri-facebook-fill">Facebook</option>
                        <option value="ri-instagram-fill">Instagram</option>
                        <option value="ri-twitter-x-line">Twitter/X</option>
                        <option value="ri-linkedin-fill">LinkedIn</option>
                        <option value="ri-youtube-fill">YouTube</option>
                    </select>
                    <input type="text" class="social-url" value="#" placeholder="URL">
                    <button class="btn-icon remove-social" data-social-index="${l}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                `,t.appendChild(i),v(i)}),document.querySelectorAll(".column-item").forEach(k),document.querySelectorAll(".badge-item").forEach(h),document.querySelectorAll(".social-item").forEach(v),a()}function k(n){const o=n.querySelector(".remove-column");o&&o.addEventListener("click",()=>n.remove());const t=n.querySelector(".has-submenu"),l=n.querySelector(".links-container"),i=n.querySelector(".single-link-container");t&&l&&i&&t.addEventListener("change",function(){if(l.style.display=this.checked?"block":"none",i.style.display=this.checked?"none":"block",this.checked&&!l.querySelector(".link-item")){const c=l.querySelector(".add-link");c&&c.click()}});const d=n.querySelector(".add-link");d&&d.addEventListener("click",()=>{const c=n.querySelector(".links-container"),m=n.getAttribute("data-column-index"),f=c.querySelectorAll(".link-item").length,b=document.createElement("div");b.className="link-item",b.setAttribute("data-link-index",f),b.innerHTML=`
                    <input type="text" class="link-text" value="Nuevo enlace" placeholder="Texto del enlace">
                    <input type="text" class="link-url page-search-input" value="#" placeholder="URL">
                    <select class="link-type">
                        <option value="internal">Interno</option>
                        <option value="external">Externo</option>
                    </select>
                    <button class="btn-icon remove-link" data-column-index="${m}" data-link-index="${f}">
                        <i class="ri-close-line"></i>
                    </button>
                `,c.insertBefore(b,d),p(b)}),n.querySelectorAll(".link-item").forEach(p)}function p(n){const o=n.querySelector(".remove-link");o&&o.addEventListener("click",()=>n.remove())}function h(n){const o=n.querySelector(".remove-badge");o&&o.addEventListener("click",()=>n.remove());const t=n.querySelector(".badge-url"),l=n.querySelector(".badge-preview");t&&l&&(t.addEventListener("change",()=>{l.src=t.value}),l.addEventListener("click",()=>{const i=E();Swal.close(),setTimeout(()=>{C("image",d=>{const c=s.getSelected();c&&setTimeout(()=>{e(s,c),setTimeout(()=>{if(i){x(i);const m=n.getAttribute("data-badge-index"),f=document.querySelectorAll(".badge-item");if(f[m]){const b=f[m].querySelector(".badge-url"),L=f[m].querySelector(".badge-preview");b&&L&&d&&d.src&&(b.value=d.src,L.src=d.src)}}},300)},100)})},200)}))}function v(n){const o=n.querySelector(".remove-social");o&&o.addEventListener("click",()=>n.remove())}function x(n){const o=document.getElementById("logo-url");o&&n.logoUrl&&(o.value=n.logoUrl),n.badges&&n.badges.length>0&&n.badges.forEach((t,l)=>{const i=document.querySelectorAll(".badge-item");if(i[l]){const d=i[l].querySelector(".badge-url"),c=i[l].querySelector(".badge-alt"),m=i[l].querySelector(".badge-link"),f=i[l].querySelector(".badge-preview");d&&(d.value=t.imageUrl),c&&(c.value=t.altText),m&&(m.value=t.url),f&&(f.src=t.imageUrl)}}),n.socialLinks&&n.socialLinks.length>0&&n.socialLinks.forEach((t,l)=>{const i=document.querySelectorAll(".social-item");if(i[l]){const d=i[l].querySelector(".social-icon"),c=i[l].querySelector(".social-url");d&&(d.value=t.icon),c&&(c.value=t.url)}})}function E(){const n=document.getElementById("logo-url").value,o=Array.from(document.querySelectorAll(".column-item")).map((i,d)=>{var m;if(i.querySelector(".has-submenu").checked)return{id:`col${d+1}`,title:i.querySelector(".column-title").value,hasSubmenu:!0,links:Array.from(i.querySelectorAll(".link-item")).map(f=>({text:f.querySelector(".link-text").value,url:f.querySelector(".link-url").value,type:f.querySelector(".link-type").value}))};{const f=((m=i.querySelector(".single-link-url"))==null?void 0:m.value)||"#";return{id:`col${d+1}`,title:i.querySelector(".column-title").value,hasSubmenu:!1,links:[{text:i.querySelector(".column-title").value,url:f,type:"internal"}]}}}),t=Array.from(document.querySelectorAll(".badge-item")).map(i=>({imageUrl:i.querySelector(".badge-url").value,altText:i.querySelector(".badge-alt").value,url:i.querySelector(".badge-link").value})),l=Array.from(document.querySelectorAll(".social-item")).map(i=>({icon:i.querySelector(".social-icon").value,url:i.querySelector(".social-url").value,platform:i.querySelector(".social-icon").value.replace("ri-","").replace("-fill","").replace("-line","")}));return{logoUrl:n,columns:o,badges:t,socialLinks:l}}}function S(s,r=""){const e=document.getElementById(s);return e?e.value:r}document.addEventListener("DOMContentLoaded",function(){const s=N();V(s),O(s),z(s),F(s),R(s)});function N(){const s=S("asset-upload-url","/upload-assets"),r=B.init({container:"#gjs",fromElement:!0,storageManager:(()=>{const e=S("page-id");return e?{type:"local",id:"gjs-footer-",autosave:!0,autoload:!0,stepsBeforeSave:1,options:{local:{key:`gjs-footer-${e}`}}}:!1})(),deviceManager:{devices:[{name:"Desktop",width:""},{name:"Tablet",width:"768px",widthMedia:"992px"},{name:"Mobile",width:"320px",widthMedia:"575px"}]},i18n:{locale:"es",messages:{es:{styleManager:{properties:"Propiedades",empty:"Selecciona un elemento para usar el Administrador de Estilos",sectors:{position:"Posición",display:"Visualización",flex:"Flex",dimension:"Dimensiones",typography:"Tipografía",decorations:"Decoraciones",extra:"Extra","flex-properties":"Propiedades Flex",background:"Fondo"}},traitManager:{traits:"Atributos",empty:"Selecciona un elemento para editarlo"},blockManager:{labels:{Secciones:"Secciones",Elementos:"Elementos",Botones:"Botones","link-block":"Bloque Enlace",quote:"Cita","text-section":"Sección de Texto",column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen",map:"Mapa",Basic:"Básico",footers:"Pies de Página"},categories:{Basic:"Básico",Secciones:"Secciones",Elementos:"Elementos",Botones:"Botones",Typography:"Tipografía",Media:"Medios",Social:"Social",Layout:"Diseño",footers:"Pies de Página"}},navigator:{navigate:"Navegar",component:"Componente",components:"Componentes",empty:"Sin componentes"},commands:{undo:"Deshacer",redo:"Rehacer",clear:"Limpiar",codeViewer:"Ver código",openAssets:"Abrir medios",openBlocks:"Abrir bloques",openStyle:"Abrir estilos",openTraits:"Abrir atributos"},assetManager:{addButton:"Añadir imagen",inputPlh:"http://ruta-a-tu-imagen.jpg",modalTitle:"Selecciona la imagen",uploadTitle:"Arrastra tus archivos aquí o haz clic para subir"},deviceManager:{device:"Dispositivo",devices:{desktop:"Escritorio",tablet:"Tablet",mobileLandscape:"Móvil Horizontal",mobilePortrait:"Móvil Vertical"}},panels:{buttons:{titles:{preview:"Vista previa",fullscreen:"Pantalla completa","sw-visibility":"Ver componentes","export-template":"Ver código","open-sm":"Abrir estilo","open-tm":"Configuraciones","open-layers":"Abrir capas","open-blocks":"Abrir bloques"}}}}}},assetManager:{upload:s,uploadName:"files",multiUpload:!0,assets:[],uploadFile:e=>{const a=e.dataTransfer?e.dataTransfer.files:e.target.files,u=new FormData;for(const g of a)u.append("files[]",g);fetch(s,{method:"POST",headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:u}).then(g=>g.json()).then(g=>{g.data&&(r.AssetManager.add(g.data),y("Archivos subidos correctamente","success"))}).catch(g=>{console.error("Error:",g),y("Error al subir los archivos","error")})}},canvas:{styles:["https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css","https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"],scripts:[]},styleManager:{sectors:[{name:"Dimensiones",open:!1,buildProps:["width","height","min-width","min-height","max-width","max-height","padding","margin"]},{name:"Tipografía",open:!1,buildProps:["font-family","font-size","font-weight","letter-spacing","color","line-height","text-align","text-shadow"]},{name:"Decoración",open:!1,buildProps:["background-color","border","border-radius","box-shadow"]},{name:"Extra",open:!1,buildProps:["opacity","transition","transform"]},{name:"Flex",open:!1,buildProps:["display","flex-direction","flex-wrap","justify-content","align-items","align-content","order","flex-basis","flex-grow","flex-shrink","align-self"]},{name:"Responsive",open:!1,buildProps:["responsive-hidden","responsive-visible"],properties:[{name:"responsive-hidden",label:"Ocultar en",type:"select",options:[{id:"",name:"Ninguno"},{id:"hidden md:block",name:"Móvil"},{id:"md:hidden",name:"Desktop"}]},{name:"responsive-visible",label:"Mostrar en",type:"select",options:[{id:"",name:"Siempre"},{id:"md:flex",name:"Solo Desktop"},{id:"flex md:hidden",name:"Solo Móvil"}]}]}]},plugins:[j,U,e=>D(e),e=>q(e),e=>$(e),e=>H(e),e=>I(e)],pluginsOpts:{gjsPresetWebpage:{modalImportTitle:"Importar código",modalImportLabel:"Pega tu código HTML/CSS aquí:",modalImportContent:"",importViewerOptions:{},textCleanCanvas:"¿Estás seguro de limpiar el canvas?",showStylesOnChange:!0,textGeneral:"General",textLayout:"Diseño",textTypography:"Tipografía",textDecorations:"Decoraciones",textExtra:"Extra",buttonImport:"Importar",buttonCancel:"Cancelar"},gjsBlocksBasic:{blocks:["column1","column2","column3","column3-7","text","link","image"],category:"Básicos",labels:{column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen",default:"Predeterminado"},flexGrid:!0,stylePrefix:"gjs-"}}});return r.Panels.addPanel({id:"panel-preview",visible:!0,buttons:[{id:"preview",className:"ri-eye-line",command:{run:function(e){e.runCommand("core:preview"),y("Modo vista previa activado","info")},stop:function(e){e.stopCommand("core:preview"),y("Modo edición activado","info")}},attributes:{title:"Vista Previa"}}]}),r.Commands.add("canvas-clear",{run:function(e){w.fire({title:"¿Estás seguro?",text:"¿Realmente deseas limpiar el canvas? Esta acción no se puede deshacer.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, limpiar",cancelButtonText:"Cancelar"}).then(a=>{a.isConfirmed&&(e.DomComponents.clear(),e.CssComposer.clear(),y("El canvas ha sido limpiado correctamente","success"))})}}),r.Panels.addPanel({id:"panel-tailwind",visible:!0,buttons:[{id:"open-tailwind-classes",className:"ri-code-box-line",command:"open-tailwind",attributes:{title:"Clases Tailwind"}}]}),r.on("load",()=>{const e=document.createElement("style");e.innerHTML=`
        :root {
            --color-primary: #23366A;
            --color-primary-dark: #0f2d54;
            --color-dark: #333333;
            --color-danger: #e74c3c;
            --color-light: #f8f9fa;
        }
        .bg-primary {
            background-color: #23366A !important;
        }
        .bg-primary\\/90 {
            background-color: rgba(18, 60, 105, 0.9) !important;
        }
        .bg-secondary {
            background-color: #333333 !important;
        }
        .text-primary {
            color: #23366A !important;
        }
        .text-secondary {
            color: #333333 !important;
        }
        .hover\\:bg-primary:hover {
            background-color: #23366A !important;
        }
        .hover\\:bg-primary\\/90:hover {
            background-color: rgba(18, 60, 105, 0.9) !important;
        }
        .hover\\:text-primary:hover {
            color: #23366A !important;
        }
        .focus\\:border-primary:focus {
            border-color: #23366A !important;
        }
        .from-primary {
            --tw-gradient-from: #23366A !important;
            --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(18, 60, 105, 0)) !important;
        }
        .to-secondary {
            --tw-gradient-to: #0f2d54 !important;
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
        .gjs-block-category-footers .gjs-block {
            border-left: 3px solid #23366A;
        }
        .gjs-category-open .gjs-title.gjs-block-category-footers {
            background-color: rgba(18, 60, 105, 0.1);
        }
    `,document.head.appendChild(e),r.runCommand("sw-visibility");const a=r.Panels.getButton("options","sw-visibility");a&&a.set("active",!0)}),r.on("canvas:render",()=>{const e=r.Canvas.getFrameEl();if(e){const a=e.contentDocument;if(a&&!a.getElementById("theme-custom-styles")){const u=a.createElement("style");u.id="theme-custom-styles",u.innerHTML=`
                        .bg-primary {
                            background-color: #23366A !important;
                        }
                        .bg-primary\\/90 {
                            background-color: rgba(18, 60, 105, 0.9) !important;
                        }
                        .bg-secondary {
                            background-color: #333333 !important;
                        }
                        .text-primary {
                            color: #23366A !important;
                        }
                        .text-secondary {
                            color: #333333 !important;
                        }
                        .hover\\:bg-primary:hover {
                            background-color: #23366A !important;
                        }
                        .hover\\:text-primary:hover {
                            color: #23366A !important;
                        }
                        .focus\\:border-primary:focus {
                            border-color: #23366A !important;
                        }
                        .from-primary {
                            --tw-gradient-from: #23366A !important;
                            --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(18, 60, 105, 0)) !important;
                        }
                        .to-secondary {
                            --tw-gradient-to: #0f2d54 !important;
                        }
                    `,a.head.appendChild(u)}}}),r.Commands.add("open-tailwind",{run:function(e){const a=e.getSelected();if(!a)return;const u=a.getClasses().join(" ");w.fire({title:"Clases Tailwind",input:"textarea",inputValue:u,inputPlaceholder:"Ingresa las clases separadas por espacios",showCancelButton:!0,confirmButtonText:"Aplicar",confirmButtonColor:"#23366A",cancelButtonText:"Cancelar",cancelButtonColor:"#e74c3c",preConfirm:g=>g.split(" ").filter(k=>k)}).then(g=>{g.isConfirmed&&(a.removeClass(a.getClasses()),a.addClass(g.value),y("Clases aplicadas correctamente","success"))})}}),r.on("component:selected",function(e){if(e){const a=e.getClasses();if(a.length){const u=a.join(" "),g=e.getName();e.set("custom-name",`${g} [${u}]`)}}}),r.DomComponents.addType("footer",{model:{defaults:{traits:[{type:"select",name:"footer-style",label:"Estilo de Pie de Página",options:[{id:"light",name:"Claro"},{id:"dark",name:"Oscuro"},{id:"primary",name:"Color Primario"},{id:"transparent",name:"Transparente"}],changeProp:1},{type:"checkbox",name:"with-shadow",label:"Con sombra"}]},init(){this.on("change:footer-style",this.handleFooterStyle),this.on("change:with-shadow",this.handleShadow),this.listenTo(this,"change:attributes",this.handleAttrChange)},handleFooterStyle(){const e=this.get("footer-style");let a=this.getClasses();a=a.filter(u=>!["bg-white","bg-gray-900","bg-primary","bg-transparent","text-white","text-gray-900"].includes(u)),e==="light"?a.push("bg-white","text-gray-900"):e==="dark"?a.push("bg-gray-900","text-white"):e==="primary"?a.push("bg-primary","text-white"):e==="transparent"&&a.push("bg-transparent"),this.setClass(a)},handleShadow(){const e=this.get("with-shadow");let a=this.getClasses();e?a.push("shadow-md"):a=a.filter(u=>u!=="shadow-md"),this.setClass(a)},handleAttrChange(){const e=this.getAttributes();e["with-shadow"]&&this.set("with-shadow",e["with-shadow"])}}}),r}function z(s){s.Panels.addPanel({id:"panel-devices",visible:!0,buttons:[{id:"device-desktop",command:"set-device-desktop",className:"ri-computer-line",active:!0,attributes:{title:"Vista Escritorio"}},{id:"device-tablet",command:"set-device-tablet",className:"ri-tablet-line",attributes:{title:"Vista Tablet"}},{id:"device-mobile",command:"set-device-mobile",className:"ri-smartphone-line",attributes:{title:"Vista Móvil"}}]}),s.Commands.add("set-device-desktop",{run:r=>r.setDevice("Desktop")}),s.Commands.add("set-device-tablet",{run:r=>r.setDevice("Tablet")}),s.Commands.add("set-device-mobile",{run:r=>r.setDevice("Mobile")})}function H(s){s.BlockManager.add("icon-block",{label:"Icono",category:"Elementos",content:'<i class="ri-home-line" style="font-size: 24px; color: #23366A;"></i>',media:'<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#23366A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'}),M(s),P(s)}function O(s){const r=document.getElementById("save-button");if(!r)return;const e=document.createElement("span");e.id="unsaved-changes-badge",e.textContent="●",e.style.cssText=`
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
    `,document.head.appendChild(a),r.parentNode.insertBefore(e,r);let u=!0;const g=()=>{u||(e.style.display="inline")},k=()=>{e.style.display="none"};setTimeout(()=>{u=!1},1e3),s.on("component:update",g),s.on("component:add",g),s.on("component:remove",g),s.on("style:update",g),r.addEventListener("click",function(){A(s)}),document.addEventListener("keydown",function(p){(p.ctrlKey||p.metaKey)&&p.key==="s"&&(p.preventDefault(),A(s))}),document.addEventListener("editor:saved",k)}function F(s){const r=S("page-id"),e=S("page-load-url");r&&e?fetch(e).then(a=>a.json()).then(a=>{if(a.components)try{const u=typeof a.components=="string"?JSON.parse(a.components):a.components;s.setComponents(u)}catch(u){console.error("Error parsing components:",u),s.setComponents(a.html||"")}else s.setComponents(a.html||"");s.setStyle(a.css||""),y("Datos del pie de página cargados correctamente","success"),window.history.pushState({pageId:r},document.title,window.location.href)}).catch(a=>{console.error("Error loading footer data:",a),y("Error al cargar los datos del pie de página","error")}):window.history.pushState({isNew:!0},document.title,window.location.href)}function A(s){const r=S("page-id"),e=S("page-store-url","/api/footers/store"),a=s.getHtml(),u=s.getCss(),g=JSON.stringify(s.getComponents());let p={html:a,css:u,js:`
        // Footer column dropdown functionality
        (function() {
            // Initialize footer dropdowns
            document.addEventListener('DOMContentLoaded', function() {
                document.querySelectorAll('.footer-dropdown-toggle').forEach(toggle => {
                    toggle.addEventListener('click', function(e) {
                        const parent = this.closest('.footer-column');
                        const content = parent.querySelector('.footer-dropdown-content');
                        const icon = this.querySelector('i');
                        
                        // Close all other dropdowns
                        document.querySelectorAll('.footer-dropdown-content.block').forEach(openContent => {
                            if (openContent !== content) {
                                openContent.classList.remove('block');
                                openContent.classList.add('hidden');
                                
                                const openToggle = openContent.parentElement.querySelector('.footer-dropdown-toggle');
                                if (openToggle) {
                                    openToggle.classList.remove('bg-primary');
                                    openToggle.classList.remove('text-white');
                                    
                                    const openIcon = openToggle.querySelector('i');
                                    if (openIcon) {
                                        openIcon.classList.remove('ri-arrow-up-s-line');
                                        openIcon.classList.add('ri-arrow-down-s-line');
                                    }
                                }
                            }
                        });
                        
                        // Toggle current dropdown
                        if (content.classList.contains('hidden')) {
                            content.classList.remove('hidden');
                            content.classList.add('block');
                            
                            this.classList.add('bg-primary');
                            this.classList.add('text-white');
                            this.classList.remove('text-primary');
                            
                            if (icon) {
                                icon.classList.remove('ri-arrow-down-s-line');
                                icon.classList.add('ri-arrow-up-s-line');
                                icon.style.color = 'white';
                            }
                        } else {
                            content.classList.remove('block');
                            content.classList.add('hidden');
                            
                            this.classList.remove('bg-primary');
                            this.classList.remove('text-white');
                            this.classList.add('text-primary');
                            
                            if (icon) {
                                icon.classList.remove('ri-arrow-up-s-line');
                                icon.classList.add('ri-arrow-down-s-line');
                                icon.style.color = '';
                            }
                        }
                    });
                });
            });
        })();
        `,components:g};r?(p.id=r,T(e,p),document.dispatchEvent(new CustomEvent("editor:saved"))):w.fire({title:"Nombre del pie de página",input:"text",inputLabel:"Ingresa un nombre para el pie de página",inputPlaceholder:"Ej: Footer Principal, Footer Enlaces, etc.",confirmButtonText:"Agregar",cancelButtonText:"Cancelar",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",inputValidator:h=>{if(!h)return"Debes ingresar un nombre para el pie de página"}}).then(h=>{h.isConfirmed&&(p.name=h.value,T(e,p),document.dispatchEvent(new CustomEvent("editor:saved")))})}function T(s,r){w.fire({title:"Guardando...",html:"Por favor espera mientras se guarda el pie de página",allowOutsideClick:!1,didOpen:()=>{w.showLoading()}}),fetch(s,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:JSON.stringify(r)}).then(e=>e.json()).then(e=>{if(w.close(),e.success){if(y("Pie de página guardado correctamente","success"),window.editorHasUnsavedChanges=!1,document.dispatchEvent(new CustomEvent("editor:saved")),!r.id&&e.id){const a=document.getElementById("page-id");a&&(a.value=e.id);const u=document.getElementById("page-load-url");u&&(u.value=u.value.replace("new",e.id));const g=document.querySelector(".editor-title");g&&r.name&&(g.textContent="Editando: "+r.name),window.history.pushState({},"Editando: "+r.name,"/footer-editor/"+e.id)}}else y("Error al guardar el pie de página: "+(e.message||"Error desconocido"),"error")}).catch(e=>{w.close(),console.error("Error:",e),y("Error al guardar el pie de página","error")})}function R(s){let r=!1,e=!1;const a=!S("page-id");if(a)for(let p=0;p<localStorage.length;p++){const h=localStorage.key(p);h&&h.startsWith("gjs-footer-")&&!h.includes("page-")&&localStorage.removeItem(h)}s.on("component:update",()=>{r=!0}),s.on("component:add",()=>{r=!0}),s.on("component:remove",()=>{r=!0}),s.on("style:update",()=>{r=!0}),document.addEventListener("editor:saved",()=>{r=!1});const u=document.getElementById("save-button");u&&u.addEventListener("click",function(){setTimeout(()=>{r=!1},1e3)}),document.addEventListener("click",function(p){const h=p.target.closest("a[href], button[data-nav]");if(h&&!h.closest("#gjs")&&!h.closest(".swal2-container")&&r){const v=h.getAttribute("href")||"",x=h.hasAttribute("data-nav");(v&&!v.startsWith("#")&&!v.startsWith("javascript:")||x)&&(p.preventDefault(),w.fire({title:"¿Estás seguro?",text:"Hay cambios sin guardar que se perderán si sales de esta página.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, salir",cancelButtonText:"Cancelar"}).then(E=>{if(E.isConfirmed){if(e=!0,a)for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);o&&o.startsWith("gjs-")&&!o.includes("page-")&&localStorage.removeItem(o)}if(v)window.location.href=v;else if(x){const n=h.getAttribute("data-nav");n==="back"?window.history.back():n==="home"?window.location.href="/":n&&(window.location.href=n)}}}))}}),window.addEventListener("popstate",function(p){r&&!e&&(p.preventDefault(),history.pushState(null,document.title,window.location.href),w.fire({title:"¿Estás seguro?",text:"Hay cambios sin guardar que se perderán si sales de esta página.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, salir",cancelButtonText:"Cancelar"}).then(h=>{if(h.isConfirmed){if(e=!0,a)for(let v=0;v<localStorage.length;v++){const x=localStorage.key(v);x&&x.startsWith("gjs-")&&!x.includes("page-")&&localStorage.removeItem(x)}window.history.back()}}))}),document.querySelectorAll(".back-button, .nav-back, .btn-back").forEach(p=>{!p.hasAttribute("href")&&!p.hasAttribute("data-nav")&&p.setAttribute("data-nav","back")}),document.querySelectorAll(".home-button, .nav-home, .btn-home").forEach(p=>{!p.hasAttribute("href")&&!p.hasAttribute("data-nav")&&p.setAttribute("data-nav","home")})}function V(s){s.on("load",function(){const r=document.createElement("style");r.innerHTML=`
            .gjs-btn, .gjs-btn-prim, .gjs-btn--full, .gjs-btn-alt, 
            .gjs-layer-title, .gjs-block-category .gjs-title, .gjs-title,
            .gjs-sm-title, .gjs-pn-buttons, .gjs-field-units, 
            .gjs-trt-trait .gjs-label, .gjs-traits-label, .gjs-mdl-dialog .gjs-mdl-btn,
            .gjs-mdl-title, .gjs-label, .gjs-field input, .gjs-field select {
                font-weight: 600 !important;
            }
            .gjs-block-label, .gjs-sm-header, .gjs-trt-header {
                font-weight: 500 !important;
            }
            .gjs-pn-panel, .gjs-pn-views-container, .gjs-block-categories {
                font-weight: 500 !important;
            }
            .gjs-mdl-content, .gjs-mdl-dialog, .gjs-blocks-c {
                font-weight: 600 !important;
            }
            .gjs-sm-sector-title, .gjs-sm-property {
                font-weight: 500 !important;
            }
        `,document.head.appendChild(r);const e=s.Canvas.getFrameEl();e&&e.contentDocument.head.appendChild(r.cloneNode(!0))})}
