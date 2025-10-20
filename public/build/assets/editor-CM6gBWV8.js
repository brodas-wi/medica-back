import{s as P,l as O,a as V,_ as R,g as U,b as J,c as G,d as X}from"./buttonBlocks-DdDJieYB.js";import{s as E,S as D}from"./sweetalert2.esm.all-x82VjDyW.js";function Q(l){l.DomComponents.addType("pdf-viewer",{model:{defaults:{tagName:"div",attributes:{"data-gjs-type":"pdf-viewer"},traits:[{type:"button",label:"Seleccionar PDF",name:"selectPDF",text:"Seleccionar PDF",command:"open-pdf-selector"}]},init(){this.set("type","pdf-viewer");const a=this.getAttributes();if(a["data-pdf-src"]){const t=this.getView();t&&t.el&&r(t.el,a["data-pdf-src"],a["data-pdf-name"]||"Documento PDF")}this.on("change:attributes",this.handleAttrChange)},handleAttrChange(){const a=this.getAttributes(),t=this.getView();t&&t.el&&a["data-pdf-src"]&&r(t.el,a["data-pdf-src"],a["data-pdf-name"]||"Documento PDF")}},view:{events:{click:"onClick"},init(){const t=this.model.getAttributes();this.el.setAttribute("data-gjs-type","pdf-viewer"),t["data-pdf-src"]&&r(this.el,t["data-pdf-src"],t["data-pdf-name"]||"Documento PDF")},onClick(a){if(a.target.tagName==="OBJECT"||a.target.closest("object")){a.stopPropagation();return}l.select(this.model),l.runCommand("open-pdf-selector",{component:this.model})},onRender(){const a=this.model.getAttributes();a["data-pdf-src"]&&r(this.el,a["data-pdf-src"],a["data-pdf-name"]||"Documento PDF")}}});function r(a,t,e){try{const i=a.querySelector(".pdf-placeholder"),o=a.querySelector(".pdf-title");if(i){const s=document.createElement("object");s.setAttribute("data",t),s.setAttribute("type","application/pdf"),s.setAttribute("width","100%"),s.setAttribute("height","500"),s.classList.add("pdf-object"),s.style.minHeight="500px",s.innerHTML=`
                <div class="p-6 bg-gray-100 text-center">
                    <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                    <a href="${t}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                </div>
            `,i.classList.add("hidden");let c=a.querySelector(".pdf-object");c?c.setAttribute("data",t):i.parentNode.insertBefore(s,i.nextSibling),o&&(o.textContent=e)}}catch(i){console.error("Error displaying PDF:",i),E(`Error al mostrar el PDF: ${i.message}`,"error")}}l.Commands.add("open-pdf-selector",{run(a,t,e={}){const i=e.component||a.getSelected();if(i)try{P("pdf",o=>{const s=o.alt||o.name||"Documento PDF";i.set("attributes",{...i.getAttributes(),"data-pdf-src":o.src,"data-pdf-name":s})})}catch(o){console.error("Error selecting PDF:",o),E(`Error al seleccionar PDF: ${o.message}`,"error")}}}),l.on("load",function(){setTimeout(()=>{try{const a=l.Canvas.getFrameEl();a&&a.contentDocument&&a.contentDocument.querySelectorAll('[data-gjs-type="pdf-viewer"]').forEach(e=>{const i=e.getAttribute("data-pdf-src"),o=e.getAttribute("data-pdf-name")||"Documento PDF";i&&r(e,i,o)})}catch(a){console.error("Error initializing PDF viewers:",a),E(`Error al inicializar visores PDF: ${a.message}`,"error")}},1e3)}),l.on("component:add",function(a){if(a.get("type")==="pdf-viewer"||a.getAttributes()["data-gjs-type"]==="pdf-viewer"){const t=a.getAttributes();if(t["data-pdf-src"]){const e=a.getView();e&&e.el&&r(e.el,t["data-pdf-src"],t["data-pdf-name"]||"Documento PDF")}}}),l.on("component:selected",function(a){if(a.get("type")==="pdf-viewer"||a.getAttributes()["data-gjs-type"]==="pdf-viewer"){const t=a.getAttributes();if(t["data-pdf-src"]){const e=a.getView();e&&e.el&&r(e.el,t["data-pdf-src"],t["data-pdf-name"]||"Documento PDF")}}}),l.on("storage:start",function(a){l.DomComponents.getComponents().filter(e=>e.get("type")==="pdf-viewer"||e.getAttributes()&&e.getAttributes()["data-gjs-type"]==="pdf-viewer").forEach(e=>{const i=e.getAttributes();i["data-pdf-src"]&&e.set("html-output",`
                    <div class="pdf-viewer-container bg-white shadow-lg rounded-lg overflow-hidden" data-gjs-type="pdf-viewer" data-pdf-src="${i["data-pdf-src"]}" data-pdf-name="${i["data-pdf-name"]||"Documento PDF"}" style="min-height: 500px; width: 100%;">
                        <div class="p-4 bg-primary text-white font-semibold flex justify-between items-center">
                            <span class="pdf-title">${i["data-pdf-name"]||"Documento PDF"}</span>
                        </div>
                        <object data="${i["data-pdf-src"]}" type="application/pdf" width="100%" height="500" class="pdf-object" style="min-height: 500px;">
                            <div class="p-6 bg-gray-100 text-center">
                                <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                                <a href="${i["data-pdf-src"]}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                            </div>
                        </object>
                    </div>
                `)})})}function Z(l){const r=l.BlockManager;l.on("load",()=>{const a=l.Canvas.getFrameEl();if(a&&a.contentDocument){const t=a.contentDocument.createElement("style");t.textContent=`
              .text-primary { color: #23366A !important; }
              .text-secondary { color: #333333 !important; }
              .bg-primary { background-color: #23366A !important; }
              .rounded-2xl { border-radius: 1rem !important; }
            `,a.contentDocument.head.appendChild(t)}}),r.add("basic-heading",{label:"Título",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-header" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Título Principal</h2>
            </div>
        </div>
        `}),r.add("basic-subtitle",{label:"Subtítulo",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-font" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <h3 class="text-secondary text-xl md:text-2xl font-semibold">Subtítulo</h3>
            </div>
        </div>
        `}),r.add("basic-paragraph",{label:"Párrafo",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-paragraph" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
        </div>
        `}),r.add("basic-divider-gray",{label:"Separador Horizontal Gris",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-minus" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-8">
            <div class="max-w-7xl mx-auto px-4">
                <div class="bg-gray-400 w-full" style="height: 2px;"></div>
            </div>
        </div>
        `}),r.add("basic-divider-blue",{label:"Separador Horizontal Azul",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-minus" style="font-size: 30px; display: block; margin: 0 auto; color: #23366A;"></i>',content:`
        <div class="py-8">
            <div class="max-w-7xl mx-auto px-4">
                <div class="bg-primary w-full" style="height: 2px;"></div>
            </div>
        </div>
        `}),r.add("basic-image",{label:"Imagen Básica",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-image" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 object-cover rounded-2xl">
            </div>
        </div>
        `}),l.DomComponents.getType("map-component")||l.DomComponents.addType("map-component",{model:{defaults:{name:"Mapa",draggable:!0,droppable:!1,stylable:!0,script:function(){const a=this.id,t=document.getElementById(a),e=t.getAttribute("data-lat")||13.6929,i=t.getAttribute("data-lng")||-89.2182,o=t.getAttribute("data-zoom")||14,s=t.getAttribute("data-marker-title")||"Ubicación";if(!document.getElementById("leaflet-css")){const n=document.createElement("link");n.id="leaflet-css",n.rel="stylesheet",n.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",n.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",n.crossOrigin="",document.head.appendChild(n)}if(typeof L>"u"){const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",n.crossOrigin="",n.onload=function(){c()},document.head.appendChild(n)}else c();function c(){const n=L.map(a).setView([e,i],o);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(n),L.marker([e,i]).addTo(n).bindPopup(s).openPopup(),setTimeout(function(){n.invalidateSize()},100)}},attributes:{"data-lat":13.6929,"data-lng":-89.2182,"data-zoom":14,"data-marker-title":"Nuestra ubicación"},traits:[{type:"number",name:"data-lat",label:"Latitud",placeholder:"13.6929"},{type:"number",name:"data-lng",label:"Longitud",placeholder:"-89.2182"},{type:"number",name:"data-zoom",label:"Nivel de Zoom",min:1,max:18,placeholder:"14"},{type:"text",name:"data-marker-title",label:"Título Marcador",placeholder:"Nuestra ubicación"}]}}}),r.add("basic-map",{label:"Mapa Básico",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-map-o" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:{type:"map-component",style:{width:"100%",height:"400px",margin:"0 auto",position:"relative",borderRadius:"1rem"}}}),l.on("load",()=>{const a=l.Canvas.getFrameEl();if(a){const t=a.contentDocument.head;if(!t.querySelector("#leaflet-css")){const e=document.createElement("link");e.id="leaflet-css",e.rel="stylesheet",e.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",e.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",e.crossOrigin="",t.appendChild(e)}if(!t.querySelector("#map-custom-css")){const e=document.createElement("style");e.id="map-custom-css",e.innerHTML=`
                    .leaflet-container {
                        height: 100%;
                        width: 100%;
                        border-radius: inherit;
                    }
                    [data-gjs-type="map-component"] {
                        border-radius: 1rem;
                        overflow: hidden;
                    }
                `,t.appendChild(e)}}}),r.add("basic-ordered-list",{label:"Lista Numerada",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-list-ol" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
            <div class="py-4">
                <div class="max-w-7xl mx-auto px-4">
                    <ol class="list-decimal pl-6 space-y-2 text-gray-600 text-base md:text-lg leading-relaxed">
                        <li>Primer elemento de la lista numerada</li>
                        <li>Segundo elemento de la lista numerada</li>
                        <li>Tercer elemento de la lista numerada</li>
                    </ol>
                </div>
            </div>
            `}),r.add("basic-unordered-list",{label:"Lista con Viñetas",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-list-ul" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
            <div class="py-4">
                <div class="max-w-7xl mx-auto px-4">
                    <ul class="list-disc pl-6 space-y-2 text-gray-600 text-base md:text-lg leading-relaxed">
                        <li>Primer elemento de la lista con viñetas</li>
                        <li>Segundo elemento de la lista con viñetas</li>
                        <li>Tercer elemento de la lista con viñetas</li>
                    </ul>
                </div>
            </div>
            `})}function K(l){const r=l.BlockManager;l.on("load",()=>{const e=l.Canvas.getFrameEl();if(e&&e.contentDocument){const i=e.contentDocument.createElement("style");i.textContent=`
                .text-primary { color: #23366A !important; }
                .bg-primary { background-color: #23366A !important; }
                .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important; }
                .rounded-lg { border-radius: 0.5rem !important; }
                .transition-all { transition: all 0.3s ease !important; }
                .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; }
            `,e.contentDocument.head.appendChild(i)}}),r.add("contact-cards-grid",{label:"Tarjetas de Contacto",category:"Tarjetas",attributes:{class:"gjs-block-section"},media:`
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
        </svg>`,content:`
        <div class="py-8 md:py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-primary mb-8">Lorem ipsum</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
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
                    
                    <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
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
                    
                    <div class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
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
        `}),r.add("icon-cards-grid",{label:"Tarjetas con Icono",category:"Tarjetas",attributes:{class:"gjs-block-section"},media:`
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
        </svg>`,content:`
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
            `}),r.add("link-buttons-grid",{label:"Botones de Enlace",category:"Botones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="9" height="9" rx="1" fill="#23366A" />
      <rect x="13" y="2" width="9" height="9" rx="1" fill="#23366A" />
      <rect x="2" y="13" width="9" height="9" rx="1" fill="#23366A" />
      <rect x="13" y="13" width="9" height="9" rx="1" fill="#23366A" />
      <circle cx="6.5" cy="5.5" r="1.5" fill="white" />
      <circle cx="17.5" cy="5.5" r="1.5" fill="white" />
      <circle cx="6.5" cy="16.5" r="1.5" fill="white" />
      <circle cx="17.5" cy="16.5" r="1.5" fill="white" />
    </svg>`,content:`
    <section class="py-8 md:py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="#" class="link-button justify-center bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-primary hover:text-white shadow-md">
            <i class="ri-file-list-3-fill text-primary text-4xl mb-3 transition-all duration-300"></i>
            <span class="text-xl font-bold">Documentos</span>
          </a>
          
          <a href="#" class="link-button justify-center bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-primary hover:text-white shadow-md">
            <i class="ri-calendar-2-fill text-primary text-4xl mb-3 transition-all duration-300"></i>
            <span class="text-xl font-bold">Calendario</span>
          </a>
          
          <a href="#" class="link-button justify-center bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-primary hover:text-white shadow-md">
            <i class="ri-download-2-fill text-primary text-4xl mb-3 transition-all duration-300"></i>
            <span class="text-xl font-bold">Descargas</span>
          </a>
          
          <a href="#" class="link-button justify-center bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-primary hover:text-white shadow-md">
            <i class="ri-user-fill text-primary text-4xl mb-3 transition-all duration-300"></i>
            <span class="text-xl font-bold">Mi Cuenta</span>
          </a>
        </div>
      </div>
    </section>
    `}),l.DomComponents.addType("link-button",{isComponent:function(e){return e.classList&&e.classList.contains("link-button")},model:{defaults:{tagName:"a",droppable:!1,attributes:{class:"link-button"},traits:[{type:"text",name:"title",label:"Título",changeProp:!0},{type:"text",name:"href",label:"URL Enlace"},{type:"select",name:"target",label:"Comportamiento",options:[{id:"",name:"Misma ventana"},{id:"_blank",name:"Nueva ventana"}]},{type:"button",text:"Seleccionar PDF",full:!0,command:function(e){const i=e.getSelected();try{P("pdf",o=>{const s=o.alt||o.name||"Documento PDF";i.set("attributes",{...i.get("attributes"),href:o.src,target:"_blank","data-pdf-name":s}),i.get("title")||i.set("title",s),i.get("title")||i.set("title",s)})}catch(o){console.error("Error al seleccionar PDF:",o),E(`Error al seleccionar PDF: ${o.message}`,"error")}}}],script:function(){const e=this,i=e.querySelector("i");e.addEventListener("mouseenter",()=>{i&&(i.classList.remove("text-primary"),i.classList.add("text-white"))}),e.addEventListener("mouseleave",()=>{e.classList.contains("hover:bg-primary")&&i&&(i.classList.add("text-primary"),i.classList.remove("text-white"))})}},init(){this.on("change:title",this.updateTitle)},updateTitle(){const e=this.get("title"),i=this.view.el.querySelector("span");i&&e&&(i.textContent=e)}},view:{init(){const e=this.model.get("script"),i=this.el;e&&i&&e.call(i)}}}),l.DomComponents.addType("link",{model:{init(){this.getClasses().includes("link-button")&&this.set("type","link-button")}}})}function W(l){const r=l.BlockManager;r.add("white-column-block",{label:"Columna Blanca",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
            <div class="max-w-7xl mx-auto px-4" style="min-height: 200px;">
                <!-- Contenido de la columna -->
                <div class="h-full flex items-center justify-center text-gray-400">
                    <p>Arrastra componentes aquí</p>
                </div>
            </div>
        </section>
        `}),r.add("primary-column-block",{label:"Columna Azul",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-primary">
            <div class="max-w-7xl mx-auto px-4" style="min-height: 200px;">
                <!-- Contenido de la columna -->
                <div class="h-full flex items-center justify-center text-white/70">
                    <p>Arrastra componentes aquí</p>
                </div>
            </div>
        </section>
        `}),r.add("two-columns-list-block",{label:"Dos Columnas con Listas",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        </svg>`,content:`
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
        `}),r.add("two-columns-text-block",{label:"Dos Columnas con Párrafos",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        </svg>`,content:`
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
        `}),r.add("one-column-list-block",{label:"Una Columna con Lista",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
            <rect x="3" y="6" width="10" height="1.5" fill="#23366A"/>
            <rect x="3" y="8.5" width="8" height="1" fill="#666666"/>
            <circle cx="3.5" cy="11.5" r="0.5" fill="#23366A"/>
            <rect x="4.5" y="11" width="15" height="1" rx="0.5" fill="#888888"/>
            <circle cx="3.5" cy="13.5" r="0.5" fill="#23366A"/>
            <rect x="4.5" y="13" width="15" height="1" rx="0.5" fill="#888888"/>
            <circle cx="3.5" cy="15.5" r="0.5" fill="#23366A"/>
            <rect x="4.5" y="15" width="15" height="1" rx="0.5" fill="#888888"/>
        </svg>`,content:`
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
        `}),r.add("one-column-links-block",{label:"Una Columna con Enlaces",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#ffffff" stroke="#dddddd"/>
            <rect x="3" y="6" width="10" height="1.5" fill="#23366A"/>
            <rect x="3" y="8.5" width="8" height="1" fill="#666666"/>
            <rect x="4" y="11" width="8" height="1.2" rx="0.6" fill="#23366A"/>
            <rect x="4" y="13.5" width="10" height="1.2" rx="0.6" fill="#23366A"/>
            <rect x="4" y="16" width="9" height="1.2" rx="0.6" fill="#23366A"/>
        </svg>`,content:`
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
        `})}function Y(l){const r=l.BlockManager;r.add("pdf-viewer-block",{label:"Visor PDF",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-file-pdf-o" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="pdf-viewer-container bg-white shadow-lg rounded-lg overflow-hidden" data-gjs-type="pdf-viewer" style="min-height: 500px; width: 100%;">
            <div class="p-4 bg-primary text-white font-semibold flex justify-between items-center">
                <span class="pdf-title">Documento PDF</span>
            </div>
            <div class="pdf-placeholder flex flex-col items-center justify-center p-8 bg-gray-100 h-64">
                <i class="ri-file-pdf-line text-5xl text-gray-400 mb-3"></i>
                <p class="text-gray-500 text-center">Haga clic para seleccionar un archivo PDF</p>
            </div>
        </div>
        `}),r.add("pdf-with-text-block",{label:"PDF con Texto",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="9" height="16" fill="#e74c3c"/>
            <rect x="13" y="5" width="8" height="2" fill="#333"/>
            <rect x="13" y="9" width="7" height="1" fill="#777"/>
            <rect x="13" y="12" width="8" height="1" fill="#777"/>
            <rect x="13" y="15" width="6" height="1" fill="#777"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex flex-col md:flex-row items-stretch gap-8 md:gap-12">
                    <div class="w-full md:w-1/2 flex flex-col justify-center">
                        <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">Título del Documento</h2>
                        <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Descripción detallada del documento PDF. Puede incluir información sobre su contenido, propósito o instrucciones para el usuario.</p>
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="pdf-viewer-container bg-white shadow-lg rounded-lg overflow-hidden h-full" data-gjs-type="pdf-viewer">
                            <div class="p-4 bg-primary text-white font-semibold flex justify-between items-center">
                                <span class="pdf-title">Documento PDF</span>
                            </div>
                            <div class="pdf-placeholder flex flex-col items-center justify-center p-8 bg-gray-100 h-64">
                                <i class="ri-file-pdf-line text-5xl text-gray-400 mb-3"></i>
                                <p class="text-gray-500 text-center">Haga clic para seleccionar un archivo PDF</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `})}function tt(l){const r=l.BlockManager,a=13.6929,t=-89.2182,e=14;l.DomComponents.addType("map-component",{isComponent:function(i){return i.getAttribute&&i.getAttribute("data-gjs-type")==="map-component"?{type:"map-component"}:!1},model:{defaults:{name:"Mapa",tagName:"div",droppable:!1,removable:!0,copyable:!0,resizable:!1,highlightable:!0,hoverable:!0,layerable:!0,selectable:!0,type:"map-component",script:function(){this.id||(this.id="map-"+Math.floor(Math.random()*1e5));const i=this.getAttribute("data-lat")||13.6929,o=this.getAttribute("data-lng")||-89.2182,s=this.getAttribute("data-zoom")||14,c=this.getAttribute("data-marker-title")||"Ubicación",n=this;if(!document.getElementById("leaflet-css")){const d=document.createElement("link");d.id="leaflet-css",d.rel="stylesheet",d.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(d)}if(typeof window.L>"u"){const d=document.createElement("script");d.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",d.onload=function(){m()},document.head.appendChild(d)}else m();function m(){n._map&&(n._map.remove(),delete n._map,delete n._leaflet_id);try{if(n.style.height=n.style.height||"450px",n.style.width=n.style.width||"100%",!document.getElementById(n.id)){setTimeout(m,300);return}const d=n.getBoundingClientRect();if(d.width===0||d.height===0){setTimeout(m,300);return}setTimeout(()=>{try{if(!document.getElementById(n.id))return;window.L&&window.L.DomUtil&&n._leaflet_id&&(window.L.DomUtil.removeClass(n,"leaflet-container"),window.L.DomUtil.removeClass(n,"leaflet-touch"),window.L.DomUtil.removeClass(n,"leaflet-fade-anim"),delete n._leaflet_id);const u=window.L.map(n.id).setView([parseFloat(i),parseFloat(o)],parseInt(s));window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(u),window.L.marker([parseFloat(i),parseFloat(o)]).addTo(u).bindPopup(c).openPopup(),n._map=u,setTimeout(()=>{u&&u.invalidateSize()},300)}catch(u){console.error("Map creation error:",u)}},200)}catch(d){console.error("Map initialization error:",d)}}},attributes:{"data-gjs-type":"map-component","data-lat":a,"data-lng":t,"data-zoom":e,"data-marker-title":"Nuestra ubicación",style:"width:100%; height:450px; border-radius:0.5rem; overflow:hidden;"},traits:[{type:"number",name:"data-lat",label:"Latitud",placeholder:"13.6929",min:-90,max:90,step:1e-4},{type:"number",name:"data-lng",label:"Longitud",placeholder:"-89.2182",min:-180,max:180,step:1e-4},{type:"number",name:"data-zoom",label:"Nivel de Zoom",min:1,max:18,placeholder:"14"},{type:"text",name:"data-marker-title",label:"Título Marcador",placeholder:"Nuestra ubicación"}]},init(){this.on("change:attributes",this.updateScript),this.on("change:attributes:id",(i,o)=>{o||i.addAttributes({id:"map-"+Math.floor(Math.random()*1e5)})})},updateScript(){const i=this.get("script");if(i){const o=this.getEl();o&&i.call(o)}}}}),r.add("map-block",{label:"Mapa",category:"Elementos",content:{type:"map-component",attributes:{"data-gjs-type":"map-component"},style:{width:"100%",height:"400px"}},media:`<svg viewBox="0 0 24 24" width="24" height="24">
            <rect width="24" height="24" fill="#a8dadc" rx="2"/>
            <line x1="2" y1="8" x2="22" y2="8" stroke="#81c3c6" stroke-width="0.5"/>
            <line x1="2" y1="16" x2="22" y2="16" stroke="#81c3c6" stroke-width="0.5"/>
            <line x1="8" y1="2" x2="8" y2="22" stroke="#81c3c6" stroke-width="0.5"/>
            <line x1="16" y1="2" x2="16" y2="22" stroke="#81c3c6" stroke-width="0.5"/>
            <circle cx="12" cy="12" r="2" fill="#e74c3c" stroke="white" stroke-width="0.5"/>
        </svg>`}),r.add("contact-map-block",{label:"Contacto con Mapa",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="24" height="24">
            <rect width="24" height="24" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="4" width="8" height="16" fill="#e9ecef" rx="1"/>
            <rect x="12" y="4" width="10" height="16" fill="#a8dadc" rx="1"/>
            <circle cx="12" cy="12" r="1.5" fill="#e74c3c"/>
            <line x1="3" y1="8" x2="9" y2="8" stroke="#23366A" stroke-width="0.5"/>
            <line x1="3" y1="12" x2="9" y2="12" stroke="#23366A" stroke-width="0.5"/>
            <line x1="3" y1="16" x2="9" y2="16" stroke="#23366A" stroke-width="0.5"/>
        </svg>`,content:`
        <section class="py-10 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-1/3">
                        <h2 class="text-3xl font-bold text-primary mb-6">Contáctanos</h2>
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                                    <i class="ri-map-pin-fill text-primary text-xl"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Dirección</h3>
                                    <p class="mt-1 text-gray-600">San Salvador, El Salvador</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                                    <i class="ri-phone-fill text-primary text-xl"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Teléfono</h3>
                                    <p class="mt-1 text-gray-600">+503 0000-0000</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                                    <i class="ri-mail-fill text-primary text-xl"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Email</h3>
                                    <p class="mt-1 text-gray-600">info@ejemplo.com</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                                    <i class="ri-time-fill text-primary text-xl"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-800">Horario</h3>
                                    <p class="mt-1 text-gray-600">Lun - Vie: 8:00 AM - 5:00 PM</p>
                                    <p class="mt-1 text-gray-600">Sábado: 8:00 AM - 12:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-2/3">
                        <div data-gjs-type="map-component"
                            data-gjs-custom-name="Mapa Interactivo"
                            data-lat="${a}"
                            data-lng="${t}" 
                            data-zoom="${e}" 
                            data-marker-title="Nuestra ubicación"
                            style="width:100%; height:450px; border-radius:0.75rem; overflow:hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);"></div>
                    </div>
                </div>
            </div>
        </section>
        `}),l.on("load",()=>{const i=l.Canvas.getFrameEl();if(i){const o=i.contentDocument.head;if(!o.querySelector("#leaflet-css")){const s=document.createElement("link");s.id="leaflet-css",s.rel="stylesheet",s.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",o.appendChild(s)}if(!o.querySelector("#map-custom-css")){const s=document.createElement("style");s.id="map-custom-css",s.innerHTML=`
                    .leaflet-container {
                        height: 100%;
                        width: 100%;
                        border-radius: inherit;
                    }
                    [data-gjs-type="map-component"] {
                        border-radius: 0.75rem;
                        overflow: hidden;
                    }
                `,o.appendChild(s)}}}),l.on("storage:end:load",()=>{setTimeout(()=>{l.getWrapper().find('[data-gjs-type="map-component"]').forEach(s=>{s.set("type","map-component");const c=s.getEl();if(c){if(!c.id){const n="map-"+Date.now()+"-"+Math.floor(Math.random()*1e4);c.id=n,s.addAttributes({id:n})}setTimeout(()=>{const n=s.get("script");n&&typeof n=="function"&&n.call(c)},500)}})},1e3)}),l.on("storage:start:store",()=>{l.getWrapper().find('[data-gjs-type="map-component"]').forEach(s=>{s.set("type","map-component");const c=s.getEl();if(c){if(!c.id){const n="map-"+Date.now()+"-"+Math.floor(Math.random()*1e4);s.addAttributes({id:n})}s.addAttributes({"data-gjs-type":"map-component","data-lat":c.getAttribute("data-lat")||a,"data-lng":c.getAttribute("data-lng")||t,"data-zoom":c.getAttribute("data-zoom")||e,"data-marker-title":c.getAttribute("data-marker-title")||"Nuestra ubicación"})}})}),l.on("component:selected",i=>{if(i.get("type")==="map-component"){const o=i.getEl();o&&o._map&&setTimeout(()=>{o._map&&o._map.invalidateSize()},100)}}),l.on("canvas:render",()=>{setTimeout(()=>{l.getWrapper().find('[data-gjs-type="map-component"]').forEach(s=>{s.set("type","map-component");const c=s.getEl();if(c&&c.isConnected){c.id||(c.id="map-"+Date.now()+"-"+Math.floor(Math.random()*1e4));const n=s.get("script");n&&typeof n=="function"&&n.call(c)}})},800)}),l.on("component:mount",i=>{const o=i.getEl();if(o&&o.getAttribute&&o.getAttribute("data-gjs-type")==="map-component"){if(i.set("type","map-component"),!o.id){const s="map-"+Date.now()+"-"+Math.floor(Math.random()*1e4);i.addAttributes({id:s})}setTimeout(()=>{const s=i.get("script");s&&typeof s=="function"&&s.call(o)},500)}}),l.on("component:clone",i=>{if(i.get("type")==="map-component"){const o=i.getEl();if(o&&o._map){o._map.remove(),delete o._map,delete o._leaflet_id;const s="map-"+Date.now()+"-"+Math.floor(Math.random()*1e4);i.addAttributes({id:s}),setTimeout(()=>{const c=i.get("script");c&&typeof c=="function"&&c.call(o)},500)}}})}function et(l){const r=l.BlockManager;l.on("load",()=>{const c=l.Canvas.getFrameEl();if(c&&c.contentDocument){const n=c.contentDocument.createElement("style");n.textContent=`
              .text-primary { color: #23366A !important; }
              .text-secondary { color: #333333 !important; }
          `,c.contentDocument.head.appendChild(n)}}),r.add("text-centered-full",{label:"Texto Centrado Completo",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="6" y="4" width="12" height="2" fill="#23366A"/>
      <rect x="8" y="7" width="8" height="1" fill="#555"/>
      <rect x="4" y="10" width="16" height="1" fill="#888"/>
      <rect x="4" y="12" width="16" height="1" fill="#888"/>
    </svg>`,content:`
          <div class="py-4">
            <div class="max-w-4xl mx-auto px-4 text-center">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
          </div>
          `}),r.add("text-centered-no-subtitle",{label:"Texto Centrado Sin Subtítulo",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="6" y="5" width="12" height="2" fill="#23366A"/>
      <rect x="4" y="10" width="16" height="1" fill="#888"/>
      <rect x="4" y="12" width="16" height="1" fill="#888"/>
    </svg>`,content:`
          <div class="py-4">
            <div class="max-w-4xl mx-auto px-4 text-center">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
          </div>
          `}),r.add("text-two-cols-left",{label:"Texto 2 Columnas Izq",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="8" height="2" fill="#23366A"/>
      <rect x="2" y="7" width="6" height="1" fill="#555"/>
      <rect x="12" y="4" width="10" height="1" fill="#888"/>
      <rect x="12" y="6" width="10" height="1" fill="#888"/>
      <rect x="12" y="8" width="10" height="1" fill="#888"/>
    </svg>`,content:`
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
              <div class="flex flex-col md:flex-row gap-6 md:gap-12">
                <div class="w-full md:w-5/12">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
                  <h3 class="text-secondary text-xl md:text-2xl font-semibold">Subtítulo</h3>
                </div>
                <div class="w-full md:w-7/12">
                  <p class="text-gray-600 text-base md:text-lg leading-relaxed text-left md:text-right">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                </div>
              </div>
            </div>
          </div>
          `}),r.add("text-two-cols-left-no-subtitle",{label:"Texto 2 Columnas Izq Sin Sub",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="5" width="8" height="2" fill="#23366A"/>
      <rect x="12" y="4" width="10" height="1" fill="#888"/>
      <rect x="12" y="6" width="10" height="1" fill="#888"/>
      <rect x="12" y="8" width="10" height="1" fill="#888"/>
    </svg>`,content:`
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
              <div class="flex flex-col md:flex-row gap-6 md:gap-12">
                <div class="w-full md:w-5/12">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Título Principal</h2>
                </div>
                <div class="w-full md:w-7/12">
                  <p class="text-gray-600 text-base md:text-lg leading-relaxed text-left md:text-right">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                </div>
              </div>
            </div>
          </div>
          `}),r.add("text-two-cols-right",{label:"Texto 2 Columnas Der",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="10" height="1" fill="#888"/>
      <rect x="2" y="6" width="10" height="1" fill="#888"/>
      <rect x="2" y="8" width="10" height="1" fill="#888"/>
      <rect x="14" y="4" width="8" height="2" fill="#23366A"/>
      <rect x="14" y="7" width="6" height="1" fill="#555"/>
    </svg>`,content:`
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
              <div class="flex flex-col md:flex-row-reverse gap-6 md:gap-12">
                <div class="w-full md:w-5/12">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
                  <h3 class="text-secondary text-xl md:text-2xl font-semibold">Subtítulo</h3>
                </div>
                <div class="w-full md:w-7/12">
                  <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                </div>
              </div>
            </div>
          </div>
          `}),r.add("text-two-cols-right-no-subtitle",{label:"Texto 2 Columnas Der Sin Sub",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="10" height="1" fill="#888"/>
      <rect x="2" y="6" width="10" height="1" fill="#888"/>
      <rect x="2" y="8" width="10" height="1" fill="#888"/>
      <rect x="14" y="5" width="8" height="2" fill="#23366A"/>
    </svg>`,content:`
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
              <div class="flex flex-col md:flex-row-reverse gap-6 md:gap-12">
                <div class="w-full md:w-5/12">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Título Principal</h2>
                </div>
                <div class="w-full md:w-7/12">
                  <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                </div>
              </div>
            </div>
          </div>
          `})}function it(l){const r=l.BlockManager;l.on("load",()=>{const a=l.Canvas.getFrameEl();if(a&&a.contentDocument){const t=a.contentDocument.createElement("style");t.textContent=`
              .text-primary { color: #23366A !important; }
              .bg-primary { background-color: #23366A !important; }
            `,a.contentDocument.head.appendChild(t)}}),r.add("basic-image",{label:"Imagen Básica",category:"Basic",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="20" height="18" rx="2" fill="#23366A"/>
            <rect x="6" y="7" width="12" height="10" rx="1" fill="white"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 object-cover rounded-2xl">
          </div>
        </div>
        `}),r.add("image-cols-equal",{label:"2 Imágenes Iguales",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="9" height="18" rx="1" fill="#23366A"/>
            <rect x="13" y="3" width="9" height="18" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
              <div>
                <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
            </div>
          </div>
        </div>
        `}),r.add("image-cols-equal-button",{label:"2 Imágenes Iguales con Botón",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="9" height="14" rx="1" fill="#23366A"/>
            <rect x="13" y="3" width="9" height="14" rx="1" fill="#23366A"/>
            <circle cx="6.5" cy="15" r="1.5" fill="white"/>
            <circle cx="17.5" cy="15" r="1.5" fill="white"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div class="relative">
                <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
              <div class="relative">
                <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `}),r.add("image-cols-left-wide",{label:"Imagen Izq Grande",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="12" height="18" rx="1" fill="#23366A"/>
            <rect x="16" y="3" width="6" height="18" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
              <div>
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
            </div>
          </div>
        </div>
        `}),r.add("image-cols-left-wide-button",{label:"Imagen Izq Grande con Botón",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="12" height="14" rx="1" fill="#23366A"/>
            <rect x="16" y="3" width="6" height="14" rx="1" fill="#23366A"/>
            <circle cx="8" cy="15" r="1.5" fill="white"/>
            <circle cx="19" cy="15" r="1.5" fill="white"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="relative md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
              <div class="relative">
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `}),r.add("image-cols-right-wide",{label:"Imagen Der Grande",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="6" height="18" rx="1" fill="#23366A"/>
            <rect x="10" y="3" width="12" height="18" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div>
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
              <div class="md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
            </div>
          </div>
        </div>
        `}),r.add("image-cols-right-wide-button",{label:"Imagen Der Grande con Botón",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="6" height="14" rx="1" fill="#23366A"/>
            <rect x="10" y="3" width="12" height="14" rx="1" fill="#23366A"/>
            <circle cx="5" cy="15" r="1.5" fill="white"/>
            <circle cx="16" cy="15" r="1.5" fill="white"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="relative">
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
              <div class="relative md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-lg text-sm md:text-base">
                    Ver más
                    <i class="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `}),r.add("image-mixed-columns",{label:"Imágenes Mixtas",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="10" height="18" rx="1" fill="#23366A"/>
            <rect x="14" y="3" width="8" height="8" rx="1" fill="#23366A"/>
            <rect x="14" y="13" width="8" height="8" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div class="h-full">
                <img src="https://via.placeholder.com/800x800/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-full object-cover rounded-2xl">
              </div>
              <div class="grid grid-cols-1 gap-6 md:gap-8">
                <div>
                  <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+Superior" alt="Imagen Superior" class="w-full h-48 md:h-64 object-cover rounded-2xl">
                </div>
                <div>
                  <img src="https://via.placeholder.com/600x400/cccccc/666666?text=Imagen+Inferior" alt="Imagen Inferior" class="w-full h-48 md:h-64 object-cover rounded-2xl">
                </div>
              </div>
            </div>
          </div>
        </div>
        `}),r.add("image-left-small-play",{label:"Izq Pequeña con Botón Play",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="6" height="18" rx="1" fill="#23366A"/>
            <rect x="10" y="3" width="12" height="18" rx="1" fill="#23366A"/>
            <circle cx="5" cy="17" r="2" fill="white"/>
            <polygon points="4.5,16 6,17 4.5,18" fill="#23366A"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="relative">
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute -bottom-2 -left-2">
                  <div class="bg-white rounded-full p-2 shadow-lg">
                    <a href="#" class="flex items-center justify-center bg-primary hover:bg-opacity-80 rounded-full w-12 h-12 transition-all duration-300 transform hover:scale-105">
                      <i class="ri-play-fill text-white text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
            </div>
          </div>
        </div>
        `}),r.add("image-right-small-play",{label:"Der Pequeña con Botón Play",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="12" height="18" rx="1" fill="#23366A"/>
            <rect x="16" y="3" width="6" height="18" rx="1" fill="#23366A"/>
            <circle cx="19" cy="17" r="2" fill="white"/>
            <polygon points="18.5,16 20,17 18.5,18" fill="#23366A"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div class="md:col-span-2">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen+Principal" alt="Imagen Principal" class="w-full h-64 md:h-80 object-cover rounded-2xl">
              </div>
              <div class="relative">
                <img src="https://via.placeholder.com/400x500/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-80 object-cover rounded-2xl">
                <div class="absolute -bottom-2 -right-2">
                  <div class="bg-white rounded-full p-2 shadow-lg">
                    <a href="#" class="flex items-center justify-center bg-primary hover:bg-opacity-80 rounded-full w-12 h-12 transition-all duration-300 transform hover:scale-105">
                      <i class="ri-play-fill text-white text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `})}function at(l){const r=l.BlockManager;l.on("load",()=>{const w=l.Canvas.getFrameEl();if(w&&w.contentDocument){const h=w.contentDocument.createElement("style");h.textContent=`
              .bg-primary { background-color: #23366A !important; }
              .text-primary { color: #23366A !important; }
              .text-secondary { color: #333333 !important; }
              .border-primary { border-color: #23366A !important; }
              .hover\\:bg-primary:hover { background-color: #23366A !important; }
              .hover\\:text-white:hover { color: #ffffff !important; }
          `,w.contentDocument.head.appendChild(h)}}),r.add("section-asymmetric-images",{label:"Sección con Imágenes Mixtas",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="2" fill="#333"/>
      <rect x="2" y="7" width="9" height="1" fill="#666"/>
      <rect x="2" y="9" width="9" height="1" fill="#666"/>
      <rect x="2" y="11" width="9" height="1" fill="#666"/>
      <rect x="13" y="4" width="4" height="16" rx="1" fill="#23366A"/>
      <rect x="18" y="4" width="4" height="7.5" rx="1" fill="#23366A"/>
      <rect x="18" y="12.5" width="4" height="7.5" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
          <div class="max-w-7xl mx-auto px-4">
            <div class="flex flex-col md:flex-row gap-8 md:gap-12">
              <div class="w-full md:w-2/5 flex flex-col justify-center">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">Asistencias</h2>
                <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.</p>
              </div>
              
              <div class="w-full md:w-3/5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div class="h-full">
                    <img src="https://via.placeholder.com/400x600/cccccc/666666?text=Imagen+1" alt="Imagen 1" class="w-full h-full object-cover rounded-2xl">
                  </div>
                  <div class="grid grid-cols-1 gap-4 md:gap-6">
                    <div>
                      <img src="https://via.placeholder.com/400x300/cccccc/666666?text=Imagen+2" alt="Imagen 2" class="w-full h-48 object-cover rounded-2xl">
                    </div>
                    <div>
                      <img src="https://via.placeholder.com/400x300/cccccc/666666?text=Imagen+3" alt="Imagen 3" class="w-full h-48 object-cover rounded-2xl">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        `}),r.add("hero-left-full",{label:"Seccion Completa Izq",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="16" rx="1" fill="#23366A"/>
      <rect x="13" y="6" width="8" height="2" fill="#333"/>
      <rect x="13" y="10" width="7" height="1" fill="#666"/>
      <rect x="13" y="13" width="8" height="1" fill="#999"/>
      <rect x="13" y="16" width="5" height="2" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-left-no-button",{label:"Seccion Izq Sin Botón",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="16" rx="1" fill="#23366A"/>
      <rect x="13" y="6" width="8" height="2" fill="#333"/>
      <rect x="13" y="10" width="7" height="1" fill="#666"/>
      <rect x="13" y="13" width="8" height="1" fill="#999"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-left-no-subtitle",{label:"Seccion Izq Sin Subtítulo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="16" rx="1" fill="#23366A"/>
      <rect x="13" y="8" width="8" height="2" fill="#333"/>
      <rect x="13" y="12" width="8" height="1" fill="#999"/>
      <rect x="13" y="15" width="5" height="2" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-left-minimal",{label:"Seccion Izq Mínimo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="4" width="9" height="16" rx="1" fill="#23366A"/>
      <rect x="13" y="8" width="8" height="2" fill="#333"/>
      <rect x="13" y="12" width="8" height="1" fill="#999"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-right-full",{label:"Seccion Completa Der",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="6" width="8" height="2" fill="#333"/>
      <rect x="2" y="10" width="7" height="1" fill="#666"/>
      <rect x="2" y="13" width="8" height="1" fill="#999"/>
      <rect x="2" y="16" width="5" height="2" rx="1" fill="#23366A"/>
      <rect x="13" y="4" width="9" height="16" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-right-no-button",{label:"Seccion Der Sin Botón",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="6" width="8" height="2" fill="#333"/>
      <rect x="2" y="10" width="7" height="1" fill="#666"/>
      <rect x="2" y="13" width="8" height="1" fill="#999"/>
      <rect x="13" y="4" width="9" height="16" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-right-no-subtitle",{label:"Seccion Der Sin Subtítulo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="8" width="8" height="2" fill="#333"/>
      <rect x="2" y="12" width="8" height="1" fill="#999"/>
      <rect x="2" y="15" width="5" height="2" rx="1" fill="#23366A"/>
      <rect x="13" y="4" width="9" height="16" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-right-minimal",{label:"Seccion Der Mínimo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="8" width="8" height="2" fill="#333"/>
      <rect x="2" y="12" width="8" height="1" fill="#999"/>
      <rect x="13" y="4" width="9" height="16" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-vertical-full",{label:"Seccion Vertical Completa",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="6" y="5" width="12" height="1" fill="#666"/>
    <rect x="4" y="7" width="16" height="1" fill="#999"/>
    <rect x="2" y="9" width="20" height="10" rx="1" fill="#23366A"/>
    <rect x="9" y="20" width="6" height="2" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white flex">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
            <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
            <p class="text-gray-600 text-base md:text-lg mb-6 leading-relaxed mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
          </div>
          <div class="relative">
            <img src="https://via.placeholder.com/800x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            <div class="absolute bottom-6 left-6">
              <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-vertical-no-button",{label:"Seccion Vertical Sin Botón",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="6" y="5" width="12" height="1" fill="#666"/>
    <rect x="4" y="7" width="16" height="1" fill="#999"/>
    <rect x="2" y="9" width="20" height="12" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white flex">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
            <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
            <p class="text-gray-600 text-base md:text-lg leading-relaxed mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/800x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
          </div>
        </div>
        </section>
        `}),r.add("hero-vertical-no-subtitle",{label:"Seccion Vertical Sin Subtítulo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="4" y="5" width="16" height="1" fill="#999"/>
    <rect x="2" y="7" width="20" height="12" rx="1" fill="#23366A"/>
    <rect x="9" y="20" width="6" height="2" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white flex">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
            <p class="text-gray-600 text-base md:text-lg mb-6 leading-relaxed mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
          </div>
          <div class="relative">
            <img src="https://via.placeholder.com/800x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
            <div class="absolute bottom-6 left-6">
              <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                Ver más
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-vertical-minimal",{label:"Seccion Vertical Mínimo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="4" y="5" width="16" height="1" fill="#999"/>
    <rect x="2" y="7" width="20" height="15" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white flex">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
            <p class="text-gray-600 text-base md:text-lg leading-relaxed mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/800x400/123c69/ffffff?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl">
          </div>
        </div>
        </section>
        `}),r.add("hero-two-columns-full",{label:"Dos Columnas Completas",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="1" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="1" y="5" width="9" height="0.8" fill="#999"/>
        <rect x="1" y="7" width="10" height="8" rx="1" fill="#23366A"/>
        <rect x="13" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="13" y="5" width="9" height="0.8" fill="#999"/>
        <rect x="13" y="7" width="10" height="8" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <div class="absolute hidden md:block h-full w-1 bg-primary left-1/2 transform -translate-x-1/2" style="top: 0;"></div>
          <!-- Columna 1 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 1</h3>
            <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            <div class="relative w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
              <div class="absolute bottom-6 left-6">
                <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                  Ver más
                  <i class="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            </div>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 2</h3>
            <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            <div class="relative w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
              <div class="absolute bottom-6 left-6">
                <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                  Ver más
                  <i class="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section>
    `}),r.add("hero-two-columns-no-button",{label:"Dos Columnas Sin Botón",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="1" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="1" y="5" width="9" height="0.8" fill="#999"/>
        <rect x="1" y="7" width="10" height="10" rx="1" fill="#23366A"/>
        <rect x="13" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="13" y="5" width="9" height="0.8" fill="#999"/>
        <rect x="13" y="7" width="10" height="10" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <div class="absolute hidden md:block h-full w-1 bg-primary left-1/2 transform -translate-x-1/2" style="top: 0;"></div>
          <!-- Columna 1 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 1</h3>
            <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            <div class="w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 2</h3>
            <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.</p>
            <div class="w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
        </div>
        </div>
        </section>
    `}),r.add("hero-two-columns-no-paragraph",{label:"Dos Columnas Sin Párrafo",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="1" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="1" y="5.5" width="10" height="10" rx="1" fill="#23366A"/>
        <rect x="13" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="13" y="5.5" width="10" height="10" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <div class="absolute hidden md:block h-full w-1 bg-primary left-1/2 transform -translate-x-1/2" style="top: 0;"></div>
          <!-- Columna 1 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 1</h3>
            <div class="relative w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
              <div class="absolute bottom-6 left-6">
                <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                  Ver más
                  <i class="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            </div>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 2</h3>
            <div class="relative w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
              <div class="absolute bottom-6 left-6">
                <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                  Ver más
                  <i class="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section>
    `}),r.add("hero-two-columns-minimal",{label:"Dos Columnas Mínimo",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="1" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="1" y="5.5" width="10" height="12" rx="1" fill="#23366A"/>
        <rect x="13" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="13" y="5.5" width="10" height="12" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <div class="absolute hidden md:block h-full w-1 bg-primary left-1/2 transform -translate-x-1/2" style="top: 0;"></div>
          <!-- Columna 1 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 1</h3>
            <div class="w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 2</h3>
            <div class="w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
        </div>
        </div>
        </section>
    `}),r.add("hero-two-columns-with-list",{label:"Dos Columnas con Lista",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="1" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="1" y="5.5" width="10" height="8" rx="1" fill="#23366A"/>
        <rect x="1" y="14.5" width="1" height="1" rx="0.5" fill="#666"/>
        <rect x="3" y="14.5" width="7" height="1" fill="#666"/>
        <rect x="1" y="16.5" width="1" height="1" rx="0.5" fill="#666"/>
        <rect x="3" y="16.5" width="7" height="1" fill="#666"/>
        <rect x="13" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="13" y="5.5" width="10" height="8" rx="1" fill="#23366A"/>
        <rect x="13" y="14.5" width="1" height="1" rx="0.5" fill="#666"/>
        <rect x="15" y="14.5" width="7" height="1" fill="#666"/>
        <rect x="13" y="16.5" width="1" height="1" rx="0.5" fill="#666"/>
        <rect x="15" y="16.5" width="7" height="1" fill="#666"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <div class="absolute hidden md:block h-full w-1 bg-primary left-1/2 transform -translate-x-1/2" style="top: 0;"></div>
          <!-- Columna 1 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 1</h3>
            <div class="w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
            <ul class="list-disc pl-5 text-gray-600 space-y-2">
              <li>Característica 1: Descripción breve de la característica.</li>
              <li>Característica 2: Descripción breve de la característica.</li>
              <li>Característica 3: Descripción breve de la característica.</li>
              <li>Característica 4: Descripción breve de la característica.</li>
            </ul>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 2</h3>
            <div class="w-full">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
            <ul class="list-disc pl-5 text-gray-600 space-y-2">
              <li>Característica 1: Descripción breve de la característica.</li>
              <li>Característica 2: Descripción breve de la característica.</li>
              <li>Característica 3: Descripción breve de la característica.</li>
              <li>Característica 4: Descripción breve de la característica.</li>
            </ul>
          </div>
        </div>
        </div>
        </section>
    `}),r.add("hero-two-columns-overlay-buttons",{label:"Dos Columnas con Botón sobre Imagen",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="1" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="1" y="5.5" width="10" height="8" rx="1" fill="#23366A"/>
        <circle cx="6" cy="11" r="1.5" fill="white"/>
        <rect x="1" y="14.5" width="1" height="1" rx="0.5" fill="#666"/>
        <rect x="3" y="14.5" width="7" height="1" fill="#666"/>
        <rect x="13" y="3" width="10" height="1.5" fill="#333"/>
        <rect x="13" y="5.5" width="10" height="8" rx="1" fill="#23366A"/>
        <circle cx="18" cy="11" r="1.5" fill="white"/>
        <rect x="13" y="14.5" width="1" height="1" rx="0.5" fill="#666"/>
        <rect x="15" y="14.5" width="7" height="1" fill="#666"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <div class="absolute hidden md:block h-full w-1 bg-primary left-1/2 transform -translate-x-1/2" style="top: 0;"></div>
          <!-- Columna 1 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 1</h3>
            <div class="w-full relative">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
              <div class="absolute bottom-6 left-6">
                <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                  Ver más
                  <i class="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            </div>
            <ul class="list-disc pl-5 text-gray-600 space-y-2">
              <li>Característica 1: Descripción breve de la característica.</li>
              <li>Característica 2: Descripción breve de la característica.</li>
              <li>Característica 3: Descripción breve de la característica.</li>
              <li>Característica 4: Descripción breve de la característica.</li>
            </ul>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col items-start gap-4">
            <h3 class="text-2xl md:text-3xl font-bold text-primary">Título Columna 2</h3>
            <div class="w-full relative">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
              <div class="absolute bottom-6 left-6">
                <a href="#" class="inline-flex items-center bg-white text-primary hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
                  Ver más
                  <i class="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            </div>
            <ul class="list-disc pl-5 text-gray-600 space-y-2">
              <li>Característica 1: Descripción breve de la característica.</li>
              <li>Característica 2: Descripción breve de la característica.</li>
              <li>Característica 3: Descripción breve de la característica.</li>
              <li>Característica 4: Descripción breve de la característica.</li>
            </ul>
          </div>
        </div>
        </div>
        </section>
    `}),r.add("hero-two-columns-minimal",{label:"Dos Columnas Mínimo",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="1" y="3" width="10" height="1.5" fill="#333"/>
    <rect x="1" y="5.5" width="10" height="12" rx="1" fill="#23366A"/>
    <rect x="13" y="3" width="10" height="1.5" fill="#333"/>
    <rect x="13" y="5.5" width="10" height="12" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <div class="absolute hidden md:block h-full w-1 bg-primary left-1/2 transform -translate-x-1/2" style="top: 0;"></div>
          <!-- Columna 1 -->
          <div class="flex flex-col">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6">Título Columna 1</h3>
            <div class="mt-auto">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+1" alt="Imagen 1" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
          <!-- Columna 2 -->
          <div class="flex flex-col">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6">Título Columna 2</h3>
            <div class="mt-auto">
              <img src="https://via.placeholder.com/600x400/123c69/ffffff?text=Imagen+2" alt="Imagen 2" class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl">
            </div>
          </div>
        </div>
        </div>
        </section>
        `}),r.add("hero-left-credit-card",{label:"Tarjeta con boton Izquierda",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="2" y="8" width="9" height="8" rx="1" fill="#23366A"/>
          <rect x="13" y="8" width="8" height="2" fill="#333"/>
          <rect x="13" y="16" width="5" height="2" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2 flex justify-center">
              <div style="max-height: 300px; overflow: hidden; border-radius: 1rem;">
                <img src="https://via.placeholder.com/600x300/23366A/ffffff?text=Tarjeta+de+Credito" alt="Tarjeta de Crédito" class="w-full h-auto object-contain">
              </div>
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">Tarjeta de crédito clásica</h2>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Aplicar ahora
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `}),r.add("hero-right-credit-card",{label:"Tarjeta con boton Derecha",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="2" y="8" width="8" height="2" fill="#333"/>
          <rect x="2" y="16" width="5" height="2" rx="1" fill="#23366A"/>
          <rect x="13" y="8" width="9" height="8" rx="1" fill="#23366A"/>
        </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div class="w-full md:w-1/2 flex justify-center">
              <div style="max-height: 300px; overflow: hidden; border-radius: 1rem;">
                <img src="https://via.placeholder.com/600x300/23366A/ffffff?text=Tarjeta+de+Credito" alt="Tarjeta de Crédito" class="w-full h-auto object-contain">
              </div>
            </div>
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">Tarjeta de crédito clásica</h2>
              <a href="#" class="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Aplicar ahora
                <i class="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        </section>
        `})}function lt(l){const r=`<svg viewBox="0 0 32 32" width="32" height="32">
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
    </svg>`,a=`.main-banner-carousel-wrapper {
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
        }`,t=function(){var e=this;if(!e||e.hasAttribute("data-banner-initialized"))return;var i=e.querySelector(".main-banner-carousel-track"),o=e.querySelector(".main-banner-dots");if(!i||!o)return;e.setAttribute("data-banner-initialized","true");var s=0,c,n=0,m=0,d=!1,u=e.getAttribute("data-api-endpoint")||"/api/banners/active",f=e.getAttribute("data-filter-category")||"all";fetch(u).then(function(x){return x.json()}).then(function(x){var A=x;if(f.trim()!==""&&f!=="all"&&(A=x.filter(function(S){var j=S.category&&S.category.toLowerCase().trim()===f.toLowerCase().trim();return j})),A&&A.length>0)b(A);else{var B=f!=="all"?'No hay banners disponibles para la categoría "'+f+'"':"No hay banners disponibles";i.innerHTML='<div class="flex items-center justify-center w-full h-full"><div class="text-center text-gray-600"><p class="text-xl">'+B+"</p></div></div>"}}).catch(function(x){console.error("Error fetching banners:",x),i.innerHTML='<div class="flex items-center justify-center w-full h-full"><div class="text-center text-gray-600"><p class="text-xl">Error al cargar los banners</p></div></div>'});function b(x){i.innerHTML="",o.innerHTML="",x.forEach(function(A,B){var S=document.createElement("div");S.className="main-banner-carousel-slide",S.style.backgroundImage="linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("+A.image_url+")";var j=A.show_category&&A.category?'<div class="mb-3"><span class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border-2 border-white/30">'+A.category+"</span></div>":"",k=A.show_description&&A.description?'<p class="text-sm md:text-base lg:text-xl mb-4 drop-shadow-lg">'+A.description+"</p>":"",I=A.show_primary_button&&A.primary_button_text?'<a href="'+(A.primary_button_url||"#")+'" class="main-banner-primary-btn text-sm md:text-base font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 inline-flex items-center shadow-xl">'+A.primary_button_text+'<i class="ri-arrow-right-line ml-2"></i></a>':"",z=A.show_secondary_button&&A.secondary_button_text?'<a href="'+(A.secondary_button_url||"#")+'" class="main-banner-secondary-btn text-white text-sm md:text-base font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 inline-flex items-center">'+A.secondary_button_text+"</a>":"";S.innerHTML='<div class="absolute inset-0 flex items-center justify-center p-6 md:p-8 lg:p-12"><div class="text-left text-white max-w-3xl w-full"><div class="max-w-full space-y-3 md:space-y-4">'+j+'<h2 class="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight drop-shadow-2xl">'+A.title+"</h2>"+k+'<div class="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-6">'+I+z+"</div></div></div></div>",i.appendChild(S);var $=document.createElement("button");$.className="main-banner-dot",$.setAttribute("type","button"),$.setAttribute("aria-label","Ir al banner "+(B+1)),function(H){$.addEventListener("click",function(){p(H)})}(B),o.appendChild($)}),h(),C(),v()}function v(){e.addEventListener("touchstart",function(x){n=x.touches[0].clientX,m=n,d=!0,clearInterval(c)},{passive:!0}),e.addEventListener("touchmove",function(x){d&&(m=x.touches[0].clientX)},{passive:!0}),e.addEventListener("touchend",w),e.addEventListener("mousedown",function(x){n=x.clientX,m=n,d=!0,clearInterval(c),x.preventDefault()}),e.addEventListener("mousemove",function(x){d&&(m=x.clientX)}),e.addEventListener("mouseup",w),e.addEventListener("mouseleave",w)}function w(){if(d){d=!1;var x=n-m;Math.abs(x)>50&&(x>0?g():y()),T()}}function h(){var x=i.querySelectorAll(".main-banner-carousel-slide"),A=o.querySelectorAll(".main-banner-dot"),B=x.length;if(B!==0){for(var S=0;S<x.length;S++)x[S].classList.remove("active","prev","next"),S===s?x[S].classList.add("active"):S===(s-1+B)%B?x[S].classList.add("prev"):S===(s+1)%B&&x[S].classList.add("next");for(var j=0;j<A.length;j++)A[j].classList[j===s?"add":"remove"]("active")}}function p(x){var A=i.querySelectorAll(".main-banner-carousel-slide");A.length&&(s=(x+A.length)%A.length,h(),T())}function g(){var x=i.querySelectorAll(".main-banner-carousel-slide");x.length!==0&&(s=(s+1)%x.length,h())}function y(){var x=i.querySelectorAll(".main-banner-carousel-slide");x.length!==0&&(s=(s-1+x.length)%x.length,h())}function C(){clearInterval(c),c=setInterval(g,5e3)}function T(){clearInterval(c),C()}};l.DomComponents.addType("main-banner-style",{isComponent:e=>{if(e.tagName==="STYLE"){const i=e.parentElement;if(i&&i.getAttribute("data-gjs-type")==="main-banner-carousel")return{type:"main-banner-style"}}return!1},model:{defaults:{tagName:"style",removable:!1,draggable:!1,copyable:!1,highlightable:!1,selectable:!1,hoverable:!1,editable:!1,layerable:!1,void:!1,attributes:{"data-gjs-type":"main-banner-style"},content:a},toHTML(){return`<style>${a}</style>`}}}),l.DomComponents.addType("main-banner-carousel",{isComponent:function(e){return e.getAttribute&&e.getAttribute("data-gjs-type")==="main-banner-carousel"},model:{defaults:{tagName:"section",name:"Banner Principal",droppable:!1,attributes:{"data-gjs-type":"main-banner-carousel",class:"main-banner-carousel-wrapper relative w-full h-96 pt-4 mt-4 md:h-[500px] overflow-hidden bg-white","data-api-endpoint":"/api/banners/active","data-filter-category":"all"},traits:[{type:"text",name:"data-api-endpoint",label:"API Endpoint",placeholder:"/api/banners/active"},{type:"select",name:"data-filter-category",label:"Filtrar por Categoría",options:[{value:"all",name:"Todas las categorías"}]}],components:[{type:"main-banner-style"},{tagName:"div",attributes:{class:"main-banner-carousel-track flex items-center h-full"},components:[{tagName:"div",attributes:{class:"flex items-center justify-center w-full h-full"},components:[{tagName:"div",attributes:{class:"w-full max-w-4xl px-4"},components:[{tagName:"div",attributes:{class:"rounded-xl bg-gray-200 animate-pulse h-96 md:h-[450px] w-full"}},{tagName:"div",attributes:{class:"flex justify-center mt-4 space-x-3"},components:[{tagName:"div",attributes:{class:"w-3 h-3 rounded-full bg-gray-300 animate-pulse"}},{tagName:"div",attributes:{class:"w-3 h-3 rounded-full bg-gray-300 animate-pulse"}},{tagName:"div",attributes:{class:"w-3 h-3 rounded-full bg-gray-300 animate-pulse"}}]}]}]}]},{tagName:"div",attributes:{class:"main-banner-dots absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-3 z-50"}}],script:t,"script-props":["data-api-endpoint","data-filter-category"]},init(){this.on("change:attributes:data-filter-category",this.handleCategoryChange),this.on("change:attributes",this.onAttributeChange),this.loadCategories(),this.ensureStyleComponent()},onAttributeChange(){this.getAttributes()["data-filter-category"]!==void 0&&this.handleCategoryChange()},ensureStyleComponent(){const e=this.components();e.find(o=>o.get("type")==="main-banner-style")||e.add({type:"main-banner-style"},{at:0})},loadCategories(){const e=this;fetch("/api/banners/categories").then(i=>i.json()).then(i=>{const o=e.getTrait("data-filter-category");if(o){const s=[{value:"all",name:"Todas las categorías"},...i.map(c=>({value:c,name:c}))];o.set("options",s)}}).catch(i=>{console.error("Error loading categories:",i)})},handleCategoryChange(){console.log("Category changed!");const e=this.view;if(!e||!e.el){console.log("No view or element found");return}const i=e.el,o=this.getAttributes()["data-filter-category"];console.log("New category:",o);const s=i.querySelector(".main-banner-dots");s&&(s.innerHTML=""),i.removeAttribute("data-banner-initialized");const c=i.querySelector(".main-banner-carousel-track");c&&(c.innerHTML='<div class="flex items-center justify-center w-full h-full"><div class="w-full max-w-4xl px-4"><div class="rounded-xl bg-gray-200 animate-pulse h-96 md:h-[450px] w-full"></div><div class="flex justify-center mt-4 space-x-3"><div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div><div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div><div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div></div></div></div>'),setTimeout(()=>{console.log("Reinitializing banner with category:",o),typeof t=="function"&&t.call(i)},500)}},view:{onRender(){const e=this.el,i=this.model;e&&(i.ensureStyleComponent(),setTimeout(()=>{typeof t=="function"&&t.call(e)},500))}}}),l.on("load",()=>{const e=l.Canvas.getFrameEl();if(e&&e.contentDocument){let i=e.contentDocument.getElementById("main-banner-styles");i||(i=e.contentDocument.createElement("style"),i.id="main-banner-styles",i.innerHTML=a,e.contentDocument.head.appendChild(i))}}),l.on("canvas:render",()=>{const e=l.Canvas.getFrameEl();if(e&&e.contentDocument){let i=e.contentDocument.getElementById("main-banner-styles");i||(i=e.contentDocument.createElement("style"),i.id="main-banner-styles",i.innerHTML=a,e.contentDocument.head.appendChild(i))}}),l.BlockManager.add("main-banner-carousel",{label:"Banner Principal",category:"Banners",attributes:{class:"gjs-block-section"},media:r,content:{type:"main-banner-carousel"}}),l.on("component:add",function(e){e.get("type")==="main-banner-carousel"&&(e.ensureStyleComponent(),setTimeout(()=>{var o;const i=(o=e.view)==null?void 0:o.el;i&&!i.hasAttribute("data-banner-initialized")&&t.call(i)},800))}),l.on("canvas:load",function(){setTimeout(()=>{const e=l.Canvas.getFrameEl();if(e&&e.contentDocument){let i=e.contentDocument.getElementById("main-banner-styles");i||(i=e.contentDocument.createElement("style"),i.id="main-banner-styles",i.innerHTML=a,e.contentDocument.head.appendChild(i)),e.contentDocument.querySelectorAll('[data-gjs-type="main-banner-carousel"]').forEach(s=>{s.hasAttribute("data-banner-initialized")||t.call(s)})}},1200)}),l.on("component:update",function(e){e.get("type")==="main-banner-carousel"&&e.ensureStyleComponent()})}function st(l){const r="banner-slider",a="banner-slider-component",t={slides:[{id:1,image:"",title:"Primer Slide",subtitle:"Descripción opcional del primer slide"}],autoplay:!0,interval:5e3},e=s=>{const c=s.slides.map((m,d)=>`
                <div class="banner-slide" data-slide-index="${d}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('${m.image||""}'); background-size: cover; background-position: center; display: ${d===0?"flex":"none"}; align-items: flex-end; padding: 2rem; border-radius: 1rem; ${m.image?"":"background-color: #f3f4f6;"}">
                    <div style="background-color: rgba(255, 255, 255, 0.85); padding: 0.25rem 1rem; border-radius: 0.5rem; backdrop-filter: blur(4px); max-width: 80%;">
                    <h2 style="color: #23366A; font-size: 2.5rem; font-weight: bold; margin: 0;">${m.title}</h2>
                    ${m.subtitle?`<p style="color: #374151; font-size: 1.125rem; margin-top: -8px; margin-bottom: 0.5rem;">${m.subtitle}</p>`:""}
                    </div>
                </div>
                `).join(""),n=s.slides.length>1?s.slides.map((m,d)=>`
                            <button class="banner-dot ${d===0?"active":""}" data-index="${d}" aria-label="Ir a slide ${d+1}"></button>
                            `).join(""):"";return`
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
                    ${c}
                </div>
                </div>
                ${s.slides.length>1?`
                <div class="banner-dots-container" style="display: flex; justify-content: center; margin-top: -1rem; margin-bottom: 1rem;">
                    ${n}
                </div>
                `:""}
            </div>
            `};l.DomComponents.addType(a,{isComponent:s=>{if(s.getAttribute&&s.getAttribute("data-gjs-type")===a)return{type:a}},model:{defaults:{tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!0,resizable:!1,attributes:{class:"py-8 md:py-14 bg-white","data-gjs-type":a,"data-slider-config":JSON.stringify(t)},traits:[{type:"button",label:!1,text:"Configurar Slider",full:!0,command:s=>{const c=s.getSelected();c&&o(s,c)}}],components:s=>{const c=s.getAttributes()["data-slider-config"];let n={...t};if(c)try{n={...t,...JSON.parse(c)}}catch(m){console.error("Error parsing slider config:",m)}return e(n)},script:function(){const s=()=>{const c=this,n=c.getAttribute("data-slider-config");let m={slides:[{id:1,image:"",title:"Primer Slide",subtitle:"Descripción opcional del primer slide"}],autoplay:!0,interval:5e3};if(n)try{m=JSON.parse(n)}catch(k){console.error("Error parsing config:",k)}const d=c.querySelector(".banner-slides-container");if(!d)return;const u=d.querySelectorAll(".banner-slide"),f=c.querySelectorAll(".banner-dot"),b=u.length;let v=0,w=null,h=0,p=0;function g(k){w&&clearInterval(w),u.forEach(I=>{I.classList.remove("active","fadeIn"),I.classList.add("fadeOut"),setTimeout(()=>{I.style.display="none"},500)}),f.forEach(I=>{I.classList.remove("active")}),setTimeout(()=>{u[k].style.display="flex",u[k].classList.remove("fadeOut"),u[k].classList.add("active","fadeIn"),f[k]&&f[k].classList.add("active"),v=k,b>1&&m.autoplay&&T()},500)}function y(){const k=(v+1)%b;g(k)}function C(){const k=(v-1+b)%b;g(k)}function T(){w=setInterval(()=>{y()},m.interval)}f.forEach((k,I)=>{k.addEventListener("click",()=>{g(I)})});const x=k=>{h=k.touches[0].clientX},A=k=>{p=k.touches[0].clientX},B=()=>{if(!h||!p)return;const k=h-p;Math.abs(k)>50&&(k>0?y():C()),h=0,p=0};d.addEventListener("touchstart",x,{passive:!0}),d.addEventListener("touchmove",A,{passive:!0}),d.addEventListener("touchend",B);let S=!1,j=0;d.addEventListener("mousedown",k=>{S=!0,j=k.pageX}),d.addEventListener("mousemove",k=>{S&&k.preventDefault()}),d.addEventListener("mouseup",k=>{if(!S)return;S=!1;const I=j-k.pageX;Math.abs(I)>50&&(I>0?y():C())}),d.addEventListener("mouseleave",()=>{S=!1}),b>1&&m.autoplay&&T()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s):s()}},init(){this.set("type",a),this.addAttributes({"data-gjs-type":a})},getConfig(){const s=this.getAttributes()["data-slider-config"];if(s)try{return{...t,...JSON.parse(s)}}catch(c){console.error("Error parsing slider config:",c)}return{...t}},setConfig(s){const c={...this.getConfig(),...s},n={...this.getAttributes(),"data-gjs-type":a,"data-slider-config":JSON.stringify(c)};this.setAttributes(n),this.components(e(c)),this.view.render()}}}),l.BlockManager.add(r,{label:"Banner Slider",category:"Banners",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
  </svg>`,content:{type:a,attributes:{class:"py-8 md:py-14 bg-white","data-gjs-type":a,"data-slider-config":JSON.stringify(t)}}});function o(s,c){const n=c.getConfig(),m=h=>h.map((p,g)=>`
                        <div class="slide-item" data-slide-id="${p.id}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e5e7eb'">
                        <div style="display: flex; gap: 20px; align-items: start;">
                            <div style="flex-shrink: 0;">
                            ${p.image?`<img src="${p.image}" alt="${p.title}" style="width: 140px; height: 100px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb;">`:'<div style="width: 140px; height: 100px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 12px;">Sin imagen</div>'}
                            </div>
                            
                            <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #111827;">Slide ${g+1}</h4>
                                <button class="delete-slide-btn" data-slide-id="${p.id}" style="background: #ef4444; color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                                Eliminar
                                </button>
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Título *</label>
                                <input type="text" class="slide-title" data-slide-id="${p.id}" value="${p.title}" placeholder="Ingrese el título del slide" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Subtítulo (opcional)</label>
                                <input type="text" class="slide-subtitle" data-slide-id="${p.id}" value="${p.subtitle||""}" placeholder="Ingrese el subtítulo del slide" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <button class="change-image-btn" data-slide-id="${p.id}" style="width: 100%; background: #23366A; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#1a2752'" onmouseout="this.style.background='#23366A'">
                                Seleccionar Imagen
                            </button>
                            </div>
                        </div>
                        </div>
                    `).join(""),d=`
            <div class="slider-config-modal" style="font-family: system-ui, -apple-system, sans-serif; background: white; padding: 10px; border-radius: 8px;">
                <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 24px;">
                <h2 style="margin: 0; font-size: 22px; font-weight: 600; color: #111827;">Configurar Banner Slider</h2>
                </div>
                
                <div class="modal-body" style="max-height: 60vh; overflow-y: auto; padding-right: 8px;">
                <div id="slides-list">
                    ${m(n.slides)}
                </div>

                <button id="add-slide-btn" style="width: 100%; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
                    Nuevo Slide
                </button>

                <div style="margin-top: 24px; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <label style="display: flex; align-items: center; cursor: pointer; user-select: none;">
                    <input type="checkbox" id="autoplay-checkbox" ${n.autoplay?"checked":""} style="width: 18px; height: 18px; margin-right: 10px; cursor: pointer; accent-color: #3b82f6;">
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
            `,u=s.Modal;u.setTitle(""),u.setContent(d),u.open({attributes:{class:"banner-slider-modal"}}),setTimeout(()=>{const h=document.querySelector(".gjs-mdl-dialog");h&&(h.style.backgroundColor="white");const p=document.querySelector(".gjs-mdl-header");p&&(p.style.padding="0",p.style.border="none",p.style.display="none");const g=document.querySelector(".gjs-mdl-close");g&&(g.style.display="none")},10);let f=JSON.parse(JSON.stringify(n.slides)),b=Math.max(...f.map(h=>h.id))+1;const v=()=>{document.getElementById("slides-list").innerHTML=m(f),w()},w=()=>{document.querySelectorAll(".delete-slide-btn").forEach(h=>{h.addEventListener("click",p=>{const g=parseInt(p.target.dataset.slideId);f.length>1?(f=f.filter(y=>y.id!==g),v()):alert("Debe haber al menos un slide")})}),document.querySelectorAll(".change-image-btn").forEach(h=>{h.addEventListener("click",p=>{const g=parseInt(p.target.dataset.slideId);P("image",y=>{const C=f.find(T=>T.id===g);C&&(C.image=y.src,v())})})}),document.querySelectorAll(".slide-title").forEach(h=>{h.addEventListener("input",p=>{const g=parseInt(p.target.dataset.slideId),y=f.find(C=>C.id===g);y&&(y.title=p.target.value)})}),document.querySelectorAll(".slide-subtitle").forEach(h=>{h.addEventListener("input",p=>{const g=parseInt(p.target.dataset.slideId),y=f.find(C=>C.id===g);y&&(y.subtitle=p.target.value)})})};setTimeout(()=>{var h,p,g;w(),(h=document.getElementById("add-slide-btn"))==null||h.addEventListener("click",()=>{f.push({id:b++,image:"",title:`Slide ${f.length+1}`,subtitle:""}),v()}),(p=document.getElementById("save-btn"))==null||p.addEventListener("click",()=>{if(f.some(T=>!T.title.trim())){alert("Todos los slides deben tener un título");return}const C={slides:f,autoplay:document.getElementById("autoplay-checkbox").checked,interval:5e3};c.setConfig(C),u.close()}),(g=document.getElementById("cancel-btn"))==null||g.addEventListener("click",()=>{u.close()})},100)}}function rt(l){const r=`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="12" height="2" fill="white" />
      <rect x="4" y="7" width="16" height="1" fill="#cccccc" />
      <rect x="4" y="10" width="6" height="2" rx="1" fill="#ffffff" stroke="#23366A" stroke-width="1" />
      <rect x="11" y="10" width="6" height="2" rx="1" fill="#23366A" />
      <rect x="4" y="14" width="10" height="1" fill="white" />
      <rect x="4" y="16" width="8" height="1" fill="white" />
      <rect x="4" y="18" width="12" height="1" fill="white" />
    </svg>`,a=(t=5)=>{const e=["auto","vida","inmueble","equipo","atencion","tab6","tab7","tab8","tab9","tab10"],i=["Seguro de auto","Segura vida+","Seguro de inmueble","Seguro de equipo","Atención segura+","Tab adicional 1","Tab adicional 2","Tab adicional 3","Tab adicional 4","Tab adicional 5"];let o="",s="";for(let c=0;c<t&&c<10;c++){const n=c===0,m=e[c],d=i[c];o+=`
                <button class="insurance-tab-btn ${n?"bg-primary text-white":"bg-white text-primary"} py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="${m}">
                    <span data-gjs-type="text" class="tab-button-text">${d}</span>
                </button>
            `,s+=`
                <div class="insurance-panel-group ${n?"":"hidden"}" data-type="${m}">
                    <div class="flex flex-col md:flex-row gap-8 items-center py-8">
                        <div class="w-full md:w-1/3">
                            <img src="https://via.placeholder.com/500x700/f8f9fa/666666?text=${d.replace(/ /g,"+")}" class="max-h-[500px] w-auto mx-auto object-cover rounded-lg" alt="${d}">
                        </div>
                        <div class="w-full md:w-2/3">
                            <h2 class="text-4xl font-bold text-primary mb-2">${d}</h2>
                            <h3 class="text-2xl font-semibold text-primary italic mb-4">Subtítulo de ${d}</h3>
                            <p class="text-lg text-gray-600 mb-6">Descripción detallada del seguro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                        </div>
                    </div>
                    
                    <div class="w-full h-0.5 bg-primary my-8"></div>
                    
                    <div class="flex flex-col md:flex-row gap-8 py-8">
                        <div class="w-full md:w-1/2">
                            <h3 class="text-2xl font-bold text-primary mb-4">Coberturas</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-600 text-lg">
                                <li>Cobertura 1</li>
                                <li>Cobertura 2</li>
                                <li>Cobertura 3</li>
                            </ul>
                        </div>
                        <div class="w-full md:w-1/2">
                            <h3 class="text-2xl font-bold text-primary mb-4">Requisitos</h3>
                            <ul class="list-disc pl-5 space-y-2 text-gray-600 text-lg">
                                <li>Requisito 1</li>
                                <li>Requisito 2</li>
                                <li>Requisito 3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `}return{tabButtons:o,tabPanels:s}};l.BlockManager.add("insurance-tabs-block",{label:"Tipos de Seguro",category:"Seguros",attributes:{class:"gjs-block-section"},media:r,content:{type:"insurance-tabs",activeTab:"auto",tabCount:5}}),l.DomComponents.addType("insurance-tabs",{isComponent:function(t){return t.getAttribute&&t.getAttribute("data-gjs-type")==="insurance-tabs"},model:{defaults:{tagName:"section",draggable:!0,droppable:!0,attributes:{"data-gjs-type":"insurance-tabs",class:"insurance-tabs-container py-8 md:py-12 bg-white"},name:"Tipos de Seguro",traits:[{type:"select",name:"data-active",label:"Tab activo inicial",options:[{id:"auto",name:"Tab 1"},{id:"vida",name:"Tab 2"},{id:"inmueble",name:"Tab 3"},{id:"equipo",name:"Tab 4"},{id:"atencion",name:"Tab 5"},{id:"tab6",name:"Tab 6"},{id:"tab7",name:"Tab 7"},{id:"tab8",name:"Tab 8"},{id:"tab9",name:"Tab 9"},{id:"tab10",name:"Tab 10"}],default:"auto"},{type:"number",name:"tab-count",label:"Número de tabs",min:1,max:10,default:5,changeProp:!0}],"tab-count":5,script:function(){const t=this;if(!t.hasAttribute("data-initialized")){const e=t.querySelectorAll(".insurance-tab-btn"),i=t.querySelectorAll(".insurance-panel-group"),o=t.getAttribute("data-active")||"auto",s=typeof window.grapesjs<"u"||document.body.classList.contains("gjs-dmode")||window.location.href.includes("/editor/");e.forEach(n=>{n.addEventListener("click",function(m){if(s&&m.target.classList.contains("tab-button-text"))return;const d=this.getAttribute("data-type");e.forEach(u=>{u===this?(u.classList.remove("bg-white","text-primary"),u.classList.add("bg-primary","text-white")):(u.classList.remove("bg-primary","text-white"),u.classList.add("bg-white","text-primary"))}),i.forEach(u=>{u.getAttribute("data-type")===d?u.classList.remove("hidden"):u.classList.add("hidden")})})});const c=Array.from(e).find(n=>n.getAttribute("data-type")===o);c?c.click():e.length>0&&e[0].click(),t.setAttribute("data-initialized","true")}}},init(){this.on("change:tab-count",this.updateTabCount),this.on("change:attributes:data-active",this.updateActiveTab)},updateTabCount(){const t=this.get("tab-count");if(!t||t<1||t>10)return;const{tabButtons:e,tabPanels:i}=a(t),o=this.components();o.reset(),o.add(`
                    <div class="max-w-7xl mx-auto px-4">
                        <div class="insurance-tabs mb-6 flex flex-wrap gap-3">
                            ${e}
                        </div>
                        <div class="insurance-panels">
                            ${i}
                        </div>
                    </div>
                `),this.trigger("change:script")},updateActiveTab(){this.trigger("change:script")}},view:{init(){this.model.components().length===0&&this.model.updateTabCount()},onRender(){const t=this.model.get("script");t&&setTimeout(()=>{t.call(this.el)},100)}}}),l.BlockManager.add("insurance-image-text-section",{label:"Imagen con Texto Seguro",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="8" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
            <rect x="12" y="4" width="10" height="3" rx="0.5" fill="#23366A"/>
            <rect x="12" y="8" width="8" height="1" rx="0.5" fill="#666666"/>
            <rect x="12" y="10" width="10" height="1" rx="0.5" fill="#999999"/>
        </svg>`,content:`
            <div class="flex flex-col md:flex-row gap-8 items-center py-8">
                <div class="w-full md:w-1/3">
                    <img src="https://via.placeholder.com/500x700/f8f9fa/666666?text=Imagen+Seguro" class="max-h-[500px] w-auto mx-auto object-cover rounded-lg" alt="Imagen Seguro">
                </div>
                <div class="w-full md:w-2/3">
                    <h2 class="text-4xl font-bold text-primary mb-2">Titulo</h2>
                    <h3 class="text-2xl font-semibold text-primary italic mb-4">Subtítulo</h3>
                    <p class="text-lg text-gray-600 mb-6">Descripción detallada del seguro. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                </div>
            </div>
        `}),l.BlockManager.add("insurance-image-text-badge",{label:"Imagen con Texto y Badge",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="8" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
            <rect x="12" y="4" width="10" height="3" rx="0.5" fill="#23366A"/>
            <rect x="12" y="8" width="8" height="1" rx="0.5" fill="#666666"/>
            <rect x="12" y="10" width="10" height="1" rx="0.5" fill="#999999"/>
            <circle cx="18" cy="15" r="2" fill="#23366A" stroke="#ffffff" stroke-width="0.5"/>
        </svg>`,content:`
            <div class="flex flex-col md:flex-row gap-8 items-center py-8">
                <div class="w-full md:w-1/3">
                    <img src="https://via.placeholder.com/500x700/f8f9fa/666666?text=Imagen+Seguro" class="max-h-[500px] w-auto mx-auto object-cover rounded-lg" alt="Seguro de Auto">
                </div>
                <div class="w-full md:w-2/3">
                    <h2 class="text-4xl font-bold text-primary mb-2">Titulo</h2>
                    <h3 class="text-2xl font-semibold text-primary italic mb-4">Subtítulo</h3>
                    <p class="text-lg text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                    
                    <!-- Badge de cobertura -->
                    <div class="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-medium">
                        <i class="ri-earth-fill mr-2 text-xl"></i>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </div>
                </div>
            </div>
        `}),l.BlockManager.add("insurance-horizontal-basic",{label:"Imagen Horizontal con Texto",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
        <rect x="3" y="5" width="8" height="14" rx="0.5" fill="#cccccc"/>
        <rect x="12" y="6" width="9" height="2" rx="0.5" fill="#23366A"/>
        <rect x="12" y="9" width="7" height="1" rx="0.5" fill="#666666"/>
        <rect x="12" y="11" width="9" height="1" rx="0.5" fill="#999999"/>
        <rect x="12" y="13" width="9" height="1" rx="0.5" fill="#999999"/>
    </svg>`,content:`
        <div class="flex flex-col md:flex-row items-center gap-8 py-8">
            <div class="w-full md:w-2/5">
                <img src="https://via.placeholder.com/600x400/f8f9fa/666666?text=Imagen+Seguro" class="w-full h-auto object-cover rounded-lg" alt="Imagen Seguro">
            </div>
            <div class="w-full md:w-3/5 flex flex-col gap-3">
                <h2 class="text-3xl md:text-4xl font-bold text-primary">Titulo</h2>
                <h3 class="text-xl md:text-2xl font-semibold text-primary italic">Subtitulo</h3>
                <p class="text-gray-600 text-lg">(Lorem ipsum dolor sit amet.)</p>
                <p class="text-gray-700 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
            </div>
        </div>
    `}),l.BlockManager.add("insurance-horizontal-badge",{label:"Imagen Horizontal con Badge",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
        <rect x="3" y="5" width="8" height="14" rx="0.5" fill="#cccccc"/>
        <rect x="12" y="6" width="9" height="2" rx="0.5" fill="#23366A"/>
        <rect x="12" y="9" width="7" height="1" rx="0.5" fill="#666666"/>
        <rect x="12" y="11" width="9" height="1" rx="0.5" fill="#999999"/>
        <circle cx="16" cy="15" r="2" fill="#23366A" stroke="#ffffff" stroke-width="0.5"/>
    </svg>`,content:`
        <div class="flex flex-col md:flex-row items-center gap-8 py-8">
            <div class="w-full md:w-2/5">
                <img src="https://via.placeholder.com/600x400/f8f9fa/666666?text=Imagen+Seguro" class="w-full h-auto object-cover rounded-lg" alt="Imagen Seguro">
            </div>
            <div class="w-full md:w-3/5 flex flex-col gap-4">
                <h2 class="text-3xl md:text-4xl font-bold text-primary">Titulo</h2>
                <h3 class="text-xl md:text-2xl font-semibold text-primary italic">Subtitulo</h3>
                <p class="text-gray-600 text-lg">(Lorem ipsum dolor sit amet.)</p>
                <p class="text-gray-700 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                
                <!-- Badge -->
                <div class="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-medium">
                    <i class="ri-shield-check-line mr-2 text-xl"></i>
                    <span>Lorem ipsum dolor sit amet.</span>
                </div>
            </div>
        </div>
    `}),l.BlockManager.add("insurance-horizontal-list",{label:"Imagen Horizontal con Lista",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
        <rect x="3" y="5" width="8" height="14" rx="0.5" fill="#cccccc"/>
        <rect x="12" y="5" width="9" height="2" rx="0.5" fill="#23366A"/>
        <rect x="12" y="8" width="7" height="1" rx="0.5" fill="#666666"/>
        <circle cx="12.5" cy="11.5" r="0.5" fill="#23366A"/>
        <rect x="13.5" y="11" width="7" height="1" rx="0.5" fill="#999999"/>
        <circle cx="12.5" cy="13.5" r="0.5" fill="#23366A"/>
        <rect x="13.5" y="13" width="7" height="1" rx="0.5" fill="#999999"/>
        <rect x="12" y="16" width="9" height="1" rx="0.5" fill="#999999"/>
    </svg>`,content:`
        <div class="flex flex-col md:flex-row items-center gap-8 py-8">
            <div class="w-full md:w-2/5">
                <img src="https://via.placeholder.com/600x400/f8f9fa/666666?text=Imagen+Seguro" class="w-full h-auto object-cover rounded-lg" alt="Imagen Seguro">
            </div>
            <div class="w-full md:w-3/5 flex flex-col gap-4">
                <h2 class="text-3xl md:text-4xl font-bold text-primary">Titulo</h2>
                <h3 class="text-xl md:text-2xl font-semibold text-primary italic">Subtitulo</h3>
                <p class="text-gray-600 text-lg">(Lorem ipsum dolor sit amet.)</p>
                
                <h4 class="text-xl font-semibold text-primary">Lorem ipsum dolor:</h4>
                <ul class="list-none flex flex-col gap-2 text-gray-600 text-lg">
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor </span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                </ul>
                
                <p class="text-gray-600 text-lg">Lorem ipsum dolor sit amet. Ipsum dolor sit amet.</p>
            </div>
        </div>
    `}),l.BlockManager.add("insurance-two-columns-list",{label:"Dos Columnas Listas Seguros",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="1" y="3" width="10" height="2" rx="0.5" fill="#23366A"/>
            <circle cx="2" cy="7" r="0.5" fill="#23366A"/>
            <rect x="3" y="6.5" width="8" height="1" rx="0.25" fill="#666666"/>
            <circle cx="2" cy="9" r="0.5" fill="#23366A"/>
            <rect x="3" y="8.5" width="8" height="1" rx="0.25" fill="#666666"/>
            <rect x="13" y="3" width="10" height="2" rx="0.5" fill="#23366A"/>
            <circle cx="14" cy="7" r="0.5" fill="#23366A"/>
            <rect x="15" y="6.5" width="8" height="1" rx="0.25" fill="#666666"/>
            <circle cx="14" cy="9" r="0.5" fill="#23366A"/>
            <rect x="15" y="8.5" width="8" height="1" rx="0.25" fill="#666666"/>
        </svg>`,content:`
            <div class="flex flex-col md:flex-row gap-8 py-8">
                <div class="w-full md:w-1/2">
                    <h3 class="text-2xl font-bold text-primary mb-4">Titulo 1</h3>
                    <ul class="list-disc pl-5 space-y-2 text-gray-600 text-lg">
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div>
                <div class="w-full md:w-1/2">
                    <h3 class="text-2xl font-bold text-primary mb-4">Titulo 2</h3>
                    <ul class="list-disc pl-5 space-y-2 text-gray-600 text-lg">
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div>
            </div>
        `}),l.BlockManager.add("insurance-divider",{label:"Separador Seguros",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="11" width="20" height="2" rx="1" fill="#dddddd"/>
        </svg>`,content:'<div class="w-full h-0.5 bg-primary my-8"></div>'}),l.BlockManager.add("insurance-feature-card",{label:"Tarjeta de Característica",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="4" y="4" width="16" height="16" rx="1" fill="#f8f9fa" stroke="#dddddd"/>
            <circle cx="8" cy="8" r="2" fill="#23366A"/>
            <rect x="11" y="7" width="7" height="2" rx="0.5" fill="#23366A"/>
            <rect x="6" y="12" width="12" height="1" rx="0.5" fill="#666666"/>
            <rect x="6" y="14" width="12" height="1" rx="0.5" fill="#666666"/>
            <rect x="6" y="16" width="8" height="1" rx="0.5" fill="#666666"/>
        </svg>`,content:`
            <div class="bg-white shadow-lg rounded-xl p-5 border border-primary transition-all duration-300 hover:shadow-xl">
                <div class="flex items-center mb-3">
                    <i class="ri-shield-check-fill text-primary text-3xl mr-3"></i>
                    <h3 class="text-2xl font-bold text-primary">Característica</h3>
                </div>
                <p class="text-lg text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <ul class="list-disc pl-5 space-y-1 text-gray-700 text-lg">
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                </ul>
            </div>
        `}),l.BlockManager.add("insurance-cta",{label:"Llamado a la Acción Seguros",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="1" fill="#23366A"/>
            <rect x="4" y="8" width="16" height="2" fill="white"/>
            <rect x="4" y="11" width="12" height="1" fill="#cccccc"/>
            <rect x="8" y="14" width="8" height="3" rx="1.5" fill="white"/>
        </svg>`,content:`
            <div class="bg-primary text-white rounded-xl py-8 px-6 md:py-12 md:px-10 text-center shadow-lg">
                <h3 class="text-3xl md:text-4xl font-bold mb-4">Titulo</h3>
                <p class="text-white/80 text-lg mb-6 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <a href="#" class="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-white/90 text-lg">Solicitar información</a>
            </div>
        `})}function ot(l){const r=`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="1" y="1" width="22" height="22" rx="2" fill="white" stroke="#cccccc" />
        <g transform="translate(3, 9)">
            <rect x="0" y="0" width="3" height="3" rx="0.5" fill="#23366A" />
            <text x="0.5" y="2.3" font-family="Arial" font-size="2" fill="white">H</text>
            <path d="M3.5 1.5h2" stroke="#666" stroke-width="0.8" />
            <polygon points="5.5,1 6.5,1.5 5.5,2" fill="#666" />
            
            <rect x="7" y="0" width="3" height="3" rx="0.5" fill="#23366A" />
            <text x="7.5" y="2.3" font-family="Arial" font-size="2" fill="white">P</text>
            <path d="M10.5 1.5h2" stroke="#666" stroke-width="0.8" />
            <polygon points="12.5,1 13.5,1.5 12.5,2" fill="#666" />
            
            <rect x="14" y="0" width="5" height="3" rx="0.5" fill="#23366A" />
            <text x="14.5" y="2.3" font-family="Arial" font-size="2" fill="white">CUR</text>
        </g>
        <text x="4" y="17" font-family="Arial" font-size="2" fill="#666" text-anchor="middle">Breadcrumb Navigation</text>
        </svg>`;l.DomComponents.addType("breadcrumb",{isComponent:function(a){return a.getAttribute&&a.getAttribute("data-gjs-type")==="breadcrumb"},extend:"div",priority:10,model:{defaults:{tagName:"nav",droppable:!1,attributes:{"data-gjs-type":"breadcrumb",class:"py-4 bg-white","data-item-count":"3","data-item-1-text":"Inicio","data-item-1-link":"/","data-item-1-active":"","data-item-2-text":"Pagina 1","data-item-2-link":"#","data-item-2-active":"","data-item-3-text":"Pagina 2","data-item-3-link":"#","data-item-3-active":"true"},name:"Breadcrumb",traits:[],script:function(){if(window.grapesjs||document.querySelector(".gjs-frame"))return;this.querySelectorAll(".breadcrumb-item").forEach(e=>{if(e.classList.contains("active")){const i=e.querySelector("a");i&&i.addEventListener("click",o=>{o.preventDefault()})}})}},init(){this._updating=!1,this.normalizeAttributes(),this.buildTraits(),this.updateItems(),this.on("change:attributes",this.onAttributesChange)},normalizeAttributes(){const a=this.getAttributes(),t=parseInt(a["data-item-count"])||3,e={};a["data-item-count"]||(e["data-item-count"]="3");for(let i=1;i<=t;i++)a[`data-item-${i}-text`]||(e[`data-item-${i}-text`]=i===1?"Inicio":i===t?"Pagina actual":`Pagina ${i}`),a[`data-item-${i}-link`]||(e[`data-item-${i}-link`]=i===1?"/":i===t?"#":`/page-${i}`),a[`data-item-${i}-active`]===void 0&&(e[`data-item-${i}-active`]=i===t?"true":"");Object.keys(e).length>0&&this.addAttributes(e)},onAttributesChange(){var o;if(this._updating)return;const a=this.getAttributes(),t=((o=this.changed)==null?void 0:o.attributes)||{};if(Object.keys(t).filter(s=>s.startsWith("data-item-")).length===0)return;if(t.hasOwnProperty("data-item-count")){const s=parseInt(a["data-item-count"])||3,c=this._lastCount||3;if(s!==c){if(this._lastCount=s,s>c){const n={};for(let m=c+1;m<=s;m++){const d=m===s;n[`data-item-${m}-text`]=d?"Pagina actual":`Pagina ${m}`,n[`data-item-${m}-link`]=d?"#":`/page-${m}`,n[`data-item-${m}-active`]=d?"true":""}this._updating=!0,this.addAttributes(n),this._updating=!1}this.buildTraits()}}this.updateItems()},buildTraits(){const a=this.getAttributes(),t=parseInt(a["data-item-count"])||3;this._lastCount=t;const e=[{type:"number",name:"data-item-count",label:"Number of items",min:1,max:10}];for(let i=1;i<=t;i++)e.push({type:"text",name:`data-item-${i}-text`,label:`Item ${i} Text`},{type:"text",name:`data-item-${i}-link`,label:`Item ${i} Link`},{type:"checkbox",name:`data-item-${i}-active`,label:`Item ${i} Is Current`,valueTrue:"true",valueFalse:""});this.set("traits",e)},updateItems(){var i;const a=this.getAttributes(),t=parseInt(a["data-item-count"])||3;let e=`<div class="max-w-7xl mx-auto px-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-container">
                        <ol class="breadcrumb flex items-center flex-wrap text-sm">`;for(let o=1;o<=t;o++){const s=a[`data-item-${o}-text`]||`Item ${o}`,c=a[`data-item-${o}-link`]||"#",n=a[`data-item-${o}-active`],m=n==="true"||n===!0;e+=`<li class="breadcrumb-item${m?" active":""}"${m?' aria-current="page"':""}>
                                <a href="${c}" class="${m?"text-primary font-semibold":"text-gray-500 hover:text-primary hover:underline"}">${s}</a>
                            </li>`,o<t&&(e+=`<li class="breadcrumb-separator">
                                <i class="ri-arrow-right-s-line text-gray-500"></i>
                            </li>`)}e+=`</ol>
                        </nav>
                    </div>`,this.components(e),(i=this.view)==null||i.render()}},view:{init(){this.listenTo(this.model,"change:components",this.render)}}}),l.BlockManager.add("breadcrumb-block",{label:"Breadcrumb",category:"Botones",attributes:{class:"gjs-block-section"},media:r,content:{type:"breadcrumb"}}),l.on("load",()=>{const a=l.Canvas.getFrameEl();if(a&&a.contentDocument){const t=a.contentDocument.createElement("style");t.textContent=`
                .breadcrumb-container {
                    width: 100%;
                }
                .breadcrumb {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .breadcrumb-item {
                    display: inline-flex;
                    align-items: center;
                }
                .breadcrumb-item a {
                    color: #6B7280;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    font-weight: normal;
                }
                .breadcrumb-item a:hover {
                    color: #23366A;
                    text-decoration: underline;
                }
                .breadcrumb-item.active a {
                    color: #23366A;
                    font-weight: 600;
                    cursor: default;
                    pointer-events: none;
                }
                .breadcrumb-separator {
                    display: inline-flex;
                    margin: 0 0.5rem;
                    color: #9CA3AF;
                }
            `,a.contentDocument.head.appendChild(t)}})}function nt(l){const r=l.BlockManager;fetch("/api/custom-blocks/active").then(t=>t.json()).then(t=>{t.forEach(e=>{a(l,e)})}).catch(t=>{console.error("Error loading custom blocks:",t)});function a(t,e){r.add(`custom-block-${e.id}`,{label:e.name,category:e.category,content:{type:`custom-block-type-${e.id}`,content:e.html_content,attributes:{"data-custom-block-id":e.id,"data-custom-block":"true"}},media:e.icon_type==="remix"?`<i class="ri-${e.icon} text-2xl text-primary"></i>`:`<img src="${e.icon}" alt="${e.name}" class="w-6 h-6">`});const i=(o,s)=>{if(e.admin_js&&e.admin_js.trim()!=="")try{new Function("editor","model","Swal",e.admin_js)(o,s,window.Swal)}catch(c){console.error(`Error executing admin JavaScript for block ${e.id}:`,c)}};t.DomComponents.addType(`custom-block-type-${e.id}`,{isComponent:o=>{if(!o)return!1;if(o.getAttribute&&(o.getAttribute("data-custom-block-id")===String(e.id)||o.getAttribute("data-custom-block")==="true"))return!0;if(typeof o.outerHTML=="string")try{const s=e.html_content.trim().replace(/\s+/g," ");return o.outerHTML.trim().replace(/\s+/g," ").includes(s)}catch{return!1}return!1},model:{defaults:{name:e.name,tagName:"div",attributes:{"data-custom-block-id":e.id,"data-custom-block":"true"},traits:[]},init(){const o=this;if(this.on("change:attributes",this.handleAttrChange),e.settings)try{const s=typeof e.settings=="string"?JSON.parse(e.settings):e.settings;if(s.traits&&Array.isArray(s.traits)){const c=s.traits.map(n=>n.type==="cards-configurator"||n.name==="configure"?{type:"button",name:n.name||"configure",label:n.label||"Configurar",text:n.text||n.label||"Configurar Bloque",full:!0,command:()=>{const m=t.getSelected();m&&i(t,m)}}:n);this.set("traits",c)}if(s.attributes&&typeof s.attributes=="object"){const c=this.get("attributes")||{};this.set("attributes",{...c,...s.attributes})}}catch(s){console.error("Error processing block settings:",s)}i(t,o)},handleAttrChange(){}},view:{init(){this.listenTo(this.model,"change:attributes",this.handleAttrUpdate)},handleAttrUpdate(){this.render()},events:{dblclick:"handleDblClick"},handleDblClick(o){const s=this.model;i(t,s)}}})}}function ct(l){l.BlockManager.add("quick-access-carousel",{label:"Accesos Rápidos",category:"Componentes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="20" height="16" rx="3" fill="#ffffff" stroke="#dddddd"/>
            <rect x="4" y="7" width="16" height="2" rx="1" fill="#23366A"/>
            <rect x="6" y="10" width="12" height="1" fill="#999999"/>
            <rect x="5" y="14" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <rect x="9" y="14" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <rect x="13" y="14" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <rect x="17" y="14" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
            <circle cx="3.5" cy="15" r="1" fill="#23366A"/>
            <circle cx="20.5" cy="15" r="1" fill="#23366A"/>
        </svg>`,content:`
        <section class="py-12 px-4 md:px-8 lg:px-16">
            <div class="bg-white shadow-lg rounded-3xl p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold text-primary text-center mb-3 md:mb-4">Accesos rápidos</h2>
                <p class="text-gray-600 text-center mb-2 mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
                
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
        `})}function dt(l){const r=l.BlockManager;mt(l),r.add("account-selector-block",{label:"Selector de Cuentas",category:"Cuentas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="3" fill="#ffffff" stroke="#dddddd"/>
        <rect x="4" y="6" width="10" height="2" rx="1" fill="#23366A"/>
        <rect x="4" y="9" width="16" height="1" fill="#999999"/>
        <rect x="5" y="12" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
        <rect x="9" y="12" width="3" height="2" rx="1" fill="#23366A" stroke="#23366A"/>
        <rect x="13" y="12" width="3" height="2" rx="1" fill="none" stroke="#23366A"/>
        <rect x="5" y="16" width="14" height="3" rx="1" fill="#f0f0f0"/>
    </svg>`,content:`
    <section class="account-selector-container py-12 px-4 md:px-8 lg:px-16" data-gjs-type="account-selector" data-active="-1">
        <div class="bg-white shadow-lg rounded-3xl p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
            <div class="account-header transition-all duration-300 flex flex-col gap-3">
                <div class="flex justify-between items-center">
                    <h2 class="account-title text-4xl md:text-4xl font-bold text-primary text-center transition-all duration-300 flex-grow">Cuentas</h2>
                    <button class="close-btn opacity-0 invisible w-8 h-8 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center">
                        <i class="ri-close-line text-lg"></i>
                    </button>
                </div>
                <p class="account-description text-gray-600 text-center max-w-3xl mx-auto transition-all duration-300">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
            
            <div class="buttons-container flex flex-wrap justify-center gap-3 md:gap-4 mt-8">
                <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="0">Personal</button>
                <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="1">Infanto Juvenil</button>
                <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="2">Premium</button>
                <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="3">Diamante</button>
                <button class="account-type-btn bg-white text-primary border-2 border-primary rounded-full py-2 px-6 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" data-index="4">Depósito a Plazo</button>
            </div>
            
            <div class="account-panel hidden transition-all duration-300 mt-8 flex flex-col gap-6 pb-2">
                <div class="account-single-content flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <h3 class="text-3xl font-bold text-primary">Cuenta de ahorro personal</h3>
                        <p class="text-primary font-semibold uppercase text-xl">AHORRAR ES TU MEJOR OPCION</p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <h4 class="font-bold text-primary text-lg">Beneficios:</h4>
                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Tasa de interés competitivas</li>
                            <li>Seguro gratis en tu cuenta de ahorros hasta un monto de $1,500.00</li>
                            <li>Capitalización trimestral de intereses</li>
                            <li>Disponibilidad de fondos inmediatos</li>
                            <li>Sin recargos</li>
                            <li>Promociones y beneficios al estar al día</li>
                            <li>Puedes adquirirla con tarjeta de débito</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="account-panel hidden transition-all duration-300 mt-8 flex flex-col gap-6 pb-2">
                <div class="account-double-content flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <h3 class="text-3xl font-bold text-primary">Cuenta de ahorro infanto juvenil</h3>
                        <p class="text-primary font-semibold uppercase text-xl">INVIERTE EN SU FUTURO</p>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="flex-1 flex flex-col gap-3">
                            <h4 class="font-bold text-primary text-lg">Beneficios:</h4>
                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Tasa de interés competitivas</li>
                                <li>Capitalización trimestral de intereses</li>
                                <li>Disponibilidad de retiro a la vista</li>
                                <li>Se fomenta la disciplina del ahorro</li>
                                <li>Promociones y beneficios al estar al día</li>
                            </ul>
                        </div>
                        
                        <div class="flex-1 md:border-l-2 md:border-gray-400 md:pl-8 flex flex-col gap-3">
                            <h4 class="font-bold text-primary text-lg">Requisitos:</h4>
                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Beneficiario de la cuenta debe ser menor de 18 años</li>
                                <li>Completar y firmar declaración jurada del parentesco con el menor autenticada por notario</li>
                                <li>Monto mínimo de apertura $25.00</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="account-panel hidden transition-all duration-300 mt-8 flex flex-col gap-6 pb-2">
                <div class="account-single-content flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <h3 class="text-3xl font-bold text-primary">Cuenta de ahorro premium</h3>
                        <p class="text-primary font-semibold uppercase text-xl">HAZ TU MEJOR INVERSIÓN</p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <h4 class="font-bold text-primary text-lg">Beneficios:</h4>
                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Cuotas a la medida</li>
                            <li>Seguro de vida opcional hasta por el monto proyectado de ahorro</li>
                            <li>Créditos automáticos con plazos de 1 a 3 años, hasta un 50% de su saldo contractual</li>
                            <li>Si estás al día puedes adelantar cuotas de ahorro amortizando mayor cantidad de capital</li>
                            <li>Disponibilidad de fondos de saldo capital</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="account-panel hidden transition-all duration-300 mt-8 flex flex-col gap-6 pb-2">
                <div class="account-double-content flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <h3 class="text-3xl font-bold text-primary">Cuenta de ahorro diamante</h3>
                        <p class="text-primary font-semibold uppercase text-xl">MULTIPLICA TUS SUEÑOS</p>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="flex-1 flex flex-col gap-3">
                            <h4 class="font-bold text-primary text-lg">Beneficios:</h4>
                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                <li>La cuenta de ahorro que genera mayor rendimiento</li>
                                <li>Cinco planes disponibles con plazos de 3.5 o 6 años</li>
                                <li>Capitalización trimestral de intereses</li>
                                <li>Depósitos y retiros ilimitados siempre y cuando se mantenga el saldo mínimo pactado</li>
                                <li>Disponibilidad de apertura para personas naturales y jurídicas</li>
                            </ul>
                        </div>
                        
                        <div class="flex-1 md:border-l-2 md:border-gray-400 md:pl-8 flex flex-col gap-3">
                            <h4 class="font-bold text-primary text-lg">Requisitos:</h4>
                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Ser socio de COMEDICA</li>
                                <li>Seleccionar uno de los planes y depositar al menos el monto mínimo de acuerdo a dicho plan</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="account-panel hidden transition-all duration-300 mt-8 flex flex-col gap-6 pb-2">
                <div class="account-double-content flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <h3 class="text-3xl font-bold text-primary">Depósito a plazo fijo</h3>
                        <p class="text-primary font-semibold uppercase text-xl">INVIERTE EN TU FUTURO HOY</p>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="flex-1 flex flex-col gap-3">
                            <h4 class="font-bold text-primary text-lg">Beneficios:</h4>
                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Excelentes tasas de interés</li>
                                <li>Acceso a un crédito automático garantizado por el depósito</li>
                                <li>Sin cobro de comisiones por servicio</li>
                                <li>Plazos disponibles: (Desde 30 a 1800 días)</li>
                            </ul>
                        </div>
                        
                        <div class="flex-1 md:border-l-2 md:border-gray-400 md:pl-8 flex flex-col gap-3">
                            <h4 class="font-bold text-primary text-lg">Requisitos:</h4>
                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Ser asociado, mostrar y aperturar el depósito con un mínimo de $115.00</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `}),l.DomComponents.addType("account-selector",{model:{defaults:{name:"Selector de Cuentas",droppable:!0,attributes:{"data-gjs-type":"account-selector"},traits:[{type:"select",name:"data-active",label:"Cuenta activa inicial",options:[{id:"-1",name:"Ninguna"},{id:"0",name:"Personal"},{id:"1",name:"Infanto Juvenil"},{id:"2",name:"Premium"},{id:"3",name:"Diamante"},{id:"4",name:"Depósito a Plazo"}]}],script:function(){(function(){const a=this;a.classList.add("account-selector-initialized"),a.setAttribute("data-account-selector-init","true")}).bind(this)()}}},view:{init(){this.listenTo(this.model,"change:data-active",this.updateScript)},onRender(){setTimeout(()=>{M()},500)}}}),l.on("component:selected",a=>{if(a.get("type")==="account-selector"){const t=document.createElement("style");t.innerHTML=`
                .account-header.active h2 {
                    font-size: 1.75rem;
                    margin-bottom: 0.5rem;
                }
                
                .account-panel:not(.hidden) {
                    animation: accountPanelFadeIn 0.3s ease;
                }
                
                @keyframes accountPanelFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `,document.head.appendChild(t),l.once("component:deselected",()=>{document.head.removeChild(t)})}}),l.on("canvas:load",()=>{setTimeout(()=>{const a=l.Canvas.getFrameEl();if(a&&a.contentDocument){const t=a.contentDocument.createElement("script");t.textContent=`(${M.toString()})()`,a.contentDocument.body.appendChild(t)}},1e3)}),l.on("component:add",a=>{a.get("type")==="account-selector"&&setTimeout(()=>{const t=l.Canvas.getFrameEl();if(t&&t.contentDocument){const e=t.contentDocument.createElement("script");e.textContent=`(${M.toString()})()`,t.contentDocument.body.appendChild(e)}},500)}),r.add("account-single-block",{label:"Cuenta - Una Columna",category:"Cuentas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="3" fill="#ffffff" stroke="#dddddd"/>
        <rect x="4" y="6" width="16" height="2" rx="1" fill="#23366A"/>
        <rect x="4" y="9" width="10" height="1" rx="1" fill="#23366A"/>
        <rect x="4" y="11" width="16" height="1" fill="#999999"/>
        <rect x="4" y="13" width="16" height="6" rx="1" fill="#f0f0f0"/>
    </svg>`,content:`
    <div class="account-single-content">
        <h3 class="text-3xl font-bold text-primary">Título de Cuenta</h3>
        <p class="text-primary font-semibold uppercase text-xl mt-2">LOREM IPSUM DOLOR</p>
        <div class="mt-6">
            <h4 class="font-bold text-primary text-lg">Beneficios:</h4>
            <ul class="list-disc pl-5 space-y-2 text-gray-700 mt-3">
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Praesent tincidunt magna vel purus</li>
                <li>Vestibulum accumsan magna vitae</li>
                <li>Donec vehicula augue eget velit</li>
                <li>Cras vulputate lacus ac sem</li>
            </ul>
        </div>
    </div>
    `}),r.add("account-double-block",{label:"Cuenta - Dos Columnas",category:"Cuentas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="3" fill="#ffffff" stroke="#dddddd"/>
        <rect x="4" y="6" width="16" height="2" rx="1" fill="#23366A"/>
        <rect x="4" y="9" width="10" height="1" rx="1" fill="#23366A"/>
        <line x1="12" y1="11" x2="12" y2="19" stroke="#dddddd" stroke-width="1"/>
        <rect x="4" y="11" width="7" height="1" fill="#999999"/>
        <rect x="13" y="11" width="7" height="1" fill="#999999"/>
        <rect x="4" y="13" width="7" height="6" rx="1" fill="#f0f0f0"/>
        <rect x="13" y="13" width="7" height="6" rx="1" fill="#f0f0f0"/>
    </svg>`,content:`
    <div class="account-double-content">
        <div>
            <h3 class="text-3xl font-bold text-primary">Título de Cuenta</h3>
            <p class="text-primary font-semibold uppercase text-xl mt-2">LOREM IPSUM DOLOR</p>
        </div>
        
        <div class="flex flex-col md:flex-row gap-8 mt-6">
            <div class="flex-1">
                <h4 class="font-bold text-primary text-lg">Beneficios:</h4>
                <ul class="list-disc pl-5 space-y-2 text-gray-700 mt-3">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Praesent tincidunt magna vel</li>
                    <li>Vestibulum accumsan magna</li>
                    <li>Donec vehicula augue eget</li>
                </ul>
            </div>
            
            <div class="flex-1 md:border-l-2 md:border-gray-400 md:pl-8">
                <h4 class="font-bold text-primary text-lg">Requisitos:</h4>
                <ul class="list-disc pl-5 space-y-2 text-gray-700 mt-3">
                    <li>Maecenas nec felis vel neque</li>
                    <li>Fusce dictum nulla id augue</li>
                    <li>Etiam dignissim purus vel</li>
                </ul>
            </div>
        </div>
    </div>
    `}),r.add("account-featured-block",{label:"Cuenta - Características",category:"Cuentas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
        <rect x="2" y="4" width="20" height="16" rx="3" fill="#ffffff" stroke="#dddddd"/>
        <rect x="4" y="6" width="16" height="2" rx="1" fill="#23366A"/>
        <rect x="4" y="9" width="10" height="1" rx="1" fill="#23366A"/>
        <rect x="4" y="12" width="5" height="4" rx="1" fill="#f0f0f0"/>
        <rect x="10" y="12" width="5" height="4" rx="1" fill="#f0f0f0"/>
        <rect x="16" y="12" width="5" height="4" rx="1" fill="#f0f0f0"/>
        <circle cx="6.5" cy="13.5" r="1" fill="#23366A"/>
        <circle cx="12.5" cy="13.5" r="1" fill="#23366A"/>
        <circle cx="18.5" cy="13.5" r="1" fill="#23366A"/>
    </svg>`,content:`
    <div class="account-featured-content">
        <div class="text-center">
            <h3 class="text-3xl font-bold text-primary">Título de Cuenta</h3>
            <p class="text-primary font-semibold uppercase text-xl mt-2">LOREM IPSUM DOLOR</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div class="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div class="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white mb-4">
                    <i class="ri-money-dollar-circle-line text-2xl"></i>
                </div>
                <h4 class="text-xl font-bold text-primary">Característica 1</h4>
                <p class="mt-3 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
            </div>
            
            <div class="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div class="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white mb-4">
                    <i class="ri-shield-check-line text-2xl"></i>
                </div>
                <h4 class="text-xl font-bold text-primary">Característica 2</h4>
                <p class="mt-3 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
            </div>
            
            <div class="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div class="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white mb-4">
                    <i class="ri-customer-service-2-line text-2xl"></i>
                </div>
                <h4 class="text-xl font-bold text-primary">Característica 3</h4>
                <p class="mt-3 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
            </div>
        </div>
    </div>
    `})}function mt(l){const r=`
    function initializeAccountSelectors() {
        const containers = document.querySelectorAll('.account-selector-container');
        
        containers.forEach(container => {
            // Skip if already initialized
            if (container.hasAttribute('data-initialized')) return;
            
            const buttons = container.querySelectorAll('.account-type-btn');
            const panels = container.querySelectorAll('.account-panel');
            const header = container.querySelector('.account-header');
            const headerTitle = header ? header.querySelector('.account-title') : null;
            const headerDesc = header ? header.querySelector('.account-description') : null;
            const closeBtn = header ? header.querySelector('.close-btn') : null;
            const buttonsContainer = container.querySelector('.buttons-container');
            const defaultActive = parseInt(container.getAttribute('data-active') || '-1');
            
            // Add event listeners to all buttons
            buttons.forEach((btn, index) => {
                btn.addEventListener('click', function() {
                    activatePanel(index);
                });
            });
            
            // Add event listener to close button
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    activatePanel(-1);
                });
            }
            
            function activatePanel(index) {
                // Hide all panels and deactivate all buttons
                panels.forEach(panel => {
                    panel.classList.add('hidden');
                });
                
                buttons.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white');
                    btn.classList.add('bg-white', 'text-primary');
                });
                
                // If valid index, show selected panel and activate button
                if (index >= 0 && index < panels.length) {
                    panels[index].classList.remove('hidden');
                    buttons[index].classList.remove('bg-white', 'text-primary');
                    buttons[index].classList.add('bg-primary', 'text-white');
                    
                    if (header) header.classList.add('active');
                    if (headerTitle) {
                        headerTitle.classList.remove('text-center');
                        headerTitle.classList.add('text-left');
                    }
                    if (headerDesc) headerDesc.classList.add('hidden');
                    if (closeBtn) {
                        closeBtn.classList.remove('opacity-0', 'invisible');
                        closeBtn.classList.add('opacity-100', 'visible');
                    }
                    if (buttonsContainer) {
                        buttonsContainer.classList.remove('justify-center');
                        buttonsContainer.classList.add('justify-start');
                    }
                } else {
                    if (header) header.classList.remove('active');
                    if (headerTitle) {
                        headerTitle.classList.remove('text-left');
                        headerTitle.classList.add('text-center');
                    }
                    if (headerDesc) headerDesc.classList.remove('hidden');
                    if (closeBtn) {
                        closeBtn.classList.add('opacity-0', 'invisible');
                        closeBtn.classList.remove('opacity-100', 'visible');
                    }
                    if (buttonsContainer) {
                        buttonsContainer.classList.add('justify-center');
                        buttonsContainer.classList.remove('justify-start');
                    }
                }
            }
            
            // Set initial state
            if (defaultActive >= 0 && defaultActive < buttons.length) {
                activatePanel(defaultActive);
            }
            
            // Mark as initialized
            container.setAttribute('data-initialized', 'true');
        });
    }
    
    // Call the initialization function when DOM loads
    document.addEventListener('DOMContentLoaded', initializeAccountSelectors);
    
    // Also call it immediately in case DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initializeAccountSelectors, 100);
    }
    `;l.on("canvas:load",()=>{setTimeout(()=>{const a=l.Canvas.getFrameEl();if(a&&a.contentDocument){const t=a.contentDocument.createElement("script");t.textContent=r,a.contentDocument.body.appendChild(t)}},500)})}function M(){document.querySelectorAll(".account-selector-container").forEach(r=>{if(r.hasAttribute("data-initialized"))return;const a=r.querySelectorAll(".account-type-btn"),t=r.querySelectorAll(".account-panel"),e=r.querySelector(".account-header"),i=e?e.querySelector(".account-title"):null,o=e?e.querySelector(".account-description"):null,s=e?e.querySelector(".close-btn"):null,c=r.querySelector(".buttons-container"),n=parseInt(r.getAttribute("data-active")||"-1");a.forEach((d,u)=>{d.addEventListener("click",function(){m(u)})}),s&&s.addEventListener("click",function(){m(-1)});function m(d){t.forEach(u=>{u.classList.add("hidden")}),a.forEach(u=>{u.classList.remove("bg-primary","text-white"),u.classList.add("bg-white","text-primary")}),d>=0&&d<t.length?(t[d].classList.remove("hidden"),a[d].classList.remove("bg-white","text-primary"),a[d].classList.add("bg-primary","text-white"),e&&e.classList.add("active"),i&&(i.classList.remove("text-center"),i.classList.add("text-left")),o&&o.classList.add("hidden"),s&&(s.classList.remove("opacity-0","invisible"),s.classList.add("opacity-100","visible")),c&&(c.classList.remove("justify-center"),c.classList.add("justify-start"))):(e&&e.classList.remove("active"),i&&(i.classList.remove("text-left"),i.classList.add("text-center")),o&&o.classList.remove("hidden"),s&&(s.classList.add("opacity-0","invisible"),s.classList.remove("opacity-100","visible")),c&&(c.classList.add("justify-center"),c.classList.remove("justify-start")))}n>=0&&n<a.length&&m(n),r.setAttribute("data-initialized","true")})}function ut(l){l.BlockManager.add("account-types-block",{label:"Tipos de Cuenta",category:"Componentes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="16" height="3" fill="white" />
      <rect x="4" y="8" width="7" height="1" fill="#ffffff" />
      <rect x="12" y="8" width="8" height="1" fill="#ffffff" />
      <line x1="11.5" y1="8" x2="11.5" y2="20" stroke="#cccccc" stroke-width="0.5" />
      <rect x="4" y="10" width="6" height="1" fill="#ffffff" />
      <rect x="13" y="10" width="7" height="1" fill="#ffffff" />
      <rect x="4" y="12" width="5" height="1" fill="#ffffff" />
      <rect x="13" y="12" width="6" height="1" fill="#ffffff" />
      <rect x="4" y="15" width="16" height="0.5" fill="#cccccc" />
      <rect x="4" y="17" width="16" height="1" fill="#ffffff" />
    </svg>`,content:`
            <section class="account-types-container py-8 md:py-12 bg-white" data-gjs-type="account-types">
                <div class="max-w-7xl mx-auto px-4">
                    <h2 class="text-3xl font-bold text-primary mb-6">Conoce nuestros créditos</h2>
                    
                    <div class="account-tabs mb-6 flex flex-wrap gap-3">
                        <button class="account-tab-btn bg-primary text-white py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="personal">Personal</button>
                        <button class="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="infanto-juvenil">Infanto Juvenil</button>
                        <button class="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="premium">Premium</button>
                        <button class="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="diamante">Diamante</button>
                        <button class="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="deposito">Depósito a Plazo</button>
                    </div>
                    
                    <div class="account-panels">
                        <div class="account-panel-group" data-type="personal">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de aportaciones</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Seguro de vida gratis (por fallecimiento o incapacidad parcial o permanente).</li>
                                            <li>Puede pagar sus cuotas de aportaciones por medio de un cargo automático aplicado a su cuenta de ahorros.</li>
                                            <li>Sin recargos.</li>
                                            <li>Participe en promociones y goce de los beneficios por mantener su cuenta al día.</li>
                                            <li>Devolución de excedentes anuales.</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Ser asociado y aperturar la cuenta con un mínimo de $6.00.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="pt-8 border-t-4 border-gray-200">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ahorro personal</h3>
                                <p class="text-lg text-primary font-medium mb-3">AHORRAR ES TU MEJOR OPCIÓN</p>
                                <div>
                                    <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                        <li>Tasa de interés competitivas</li>
                                        <li>Seguro gratis en tu cuenta de ahorros hasta un monto de $1,500.00</li>
                                        <li>Capitalización trimestral de intereses</li>
                                        <li>Disponibilidad de fondos inmediatos.</li>
                                        <li>Sin recargos.</li>
                                        <li>Promociones y beneficios al estar al día.</li>
                                        <li>Puedes adquirirla con tarjeta de débito</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-panel-group hidden" data-type="infanto-juvenil">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ahorro infanto juvenil</h3>
                                <p class="text-lg text-primary font-medium mb-3">INVIERTE EN SU FUTURO</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Tasa de interés competitivas</li>
                                            <li>Capitalización trimestral de intereses.</li>
                                            <li>Disponibilidad de retiro a la vista.</li>
                                            <li>Se fomenta la disciplina del ahorro.</li>
                                            <li>Promociones y beneficios al estar al día.</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Beneficiario de la cuenta debe ser menor de 18 años.</li>
                                            <li>Completar y firmar declaración jurada del parentesco con el menor autenticada por notario.</li>
                                            <li>Monto mínimo de apertura $25.00</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-panel-group hidden" data-type="premium">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ahorro premium</h3>
                                <p class="text-lg text-primary font-medium mb-3">HAZ TU MEJOR INVERSIÓN</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Cuotas a la medida</li>
                                            <li>Seguro de vida opcional hasta por el monto proyectado de ahorro.</li>
                                            <li>Créditos automáticos con plazos de 1 a 3 años, hasta un 90% de su saldo contractual.</li>
                                            <li>Si estás al día puedes adelantar cuotas de ahorro amortizando mayor cantidad de capital.</li>
                                            <li>Disponibilidad de fondos de saldo capital.</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Ser asociado.</li>
                                            <li>Monto mínimo de apertura $10.00</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-panel-group hidden" data-type="diamante">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ahorro diamante</h3>
                                <p class="text-lg text-primary font-medium mb-3">MULTIPLICA TUS SUEÑOS</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>La cuenta de ahorro que genera mayor rendimiento.</li>
                                            <li>Cinco planes disponibles con plazos de 3.5 o 6 años.</li>
                                            <li>Capitalización trimestral de intereses</li>
                                            <li>Depósitos y retiros ilimitados siempre y cuando se mantenga el saldo mínimo pactado.</li>
                                            <li>Disponibilidad de apertura para personas naturales y jurídicas.</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Ser socio de COMEDICA.</li>
                                            <li>Seleccionar uno de los planes y depositar al menos el monto mínimo de acuerdo a dicho plan.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-panel-group hidden" data-type="deposito">
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-primary mb-4">Depósito a plazo fijo</h3>
                                <p class="text-lg text-primary font-medium mb-3">INVIERTE EN TU FUTURO HOY</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <div class="benefits-column">
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Excelentes tasas de interés</li>
                                            <li>Acceso a un crédito automático garantizado por el depósito.</li>
                                            <li>Sin cobro de comisiones por servicio.</li>
                                            <li>Plazos disponibles: (Desde 30 a 1800 días)</li>
                                        </ul>
                                    </div>
                                    <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                        <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Ser asociado, mostrar y aperturar el depósito con un mínimo de $115.00</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="pt-8 border-t-4 border-gray-200">
                                <h3 class="text-2xl font-bold text-primary mb-4">Cuenta corriente</h3>
                                <p class="text-lg text-primary font-medium mb-3">APERTURA TU CUENTA Y ASEGURATE DE LLEVAR EL CONTROL DE TUS FINANZAS</p>
                                <div>
                                    <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                        <li>Liberación de fondos con cheques propios al instante y cheques de otros bancos en 5 horas.</li>
                                        <li>Podrás hacer uso de tus fondos el mismo día</li>
                                        <li>Chequera personalizada</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `}),l.DomComponents.addType("account-types",{isComponent:function(a){return a.getAttribute&&a.getAttribute("data-gjs-type")==="account-types"},model:{defaults:{tagName:"section",draggable:!0,droppable:!1,attributes:{"data-gjs-type":"account-types",class:"account-types-container py-8 md:py-12 bg-white"},name:"Tipos de Cuenta",traits:[{type:"select",name:"data-active",label:"Tab activo inicial",options:[{id:"personal",name:"Personal"},{id:"infanto-juvenil",name:"Infanto Juvenil"},{id:"premium",name:"Premium"},{id:"diamante",name:"Diamante"},{id:"deposito",name:"Depósito a Plazo"}],default:"personal"},{type:"number",name:"tab-count",label:"Número de tabs",min:1,max:8,default:5},{type:"text",name:"tab-1-name",label:"Nombre Tab 1",default:"Personal"},{type:"text",name:"tab-2-name",label:"Nombre Tab 2",default:"Infanto Juvenil"},{type:"text",name:"tab-3-name",label:"Nombre Tab 3",default:"Premium"},{type:"text",name:"tab-4-name",label:"Nombre Tab 4",default:"Diamante"},{type:"text",name:"tab-5-name",label:"Nombre Tab 5",default:"Depósito a Plazo"},{type:"text",name:"tab-6-name",label:"Nombre Tab 6 (opcional)",default:"Tab 6"},{type:"text",name:"tab-7-name",label:"Nombre Tab 7 (opcional)",default:"Tab 7"},{type:"text",name:"tab-8-name",label:"Nombre Tab 8 (opcional)",default:"Tab 8"}],script:function(){const a=this,t=a.querySelectorAll(".account-tab-btn"),e=a.querySelectorAll(".account-panel-group"),i=a.getAttribute("data-active")||"personal";t.forEach(s=>{s.addEventListener("click",function(){const c=this.getAttribute("data-type");t.forEach(n=>{n===this?(n.classList.remove("bg-white","text-primary"),n.classList.add("bg-primary","text-white")):(n.classList.remove("bg-primary","text-white"),n.classList.add("bg-white","text-primary"))}),e.forEach(n=>{n.getAttribute("data-type")===c?n.classList.remove("hidden"):n.classList.add("hidden")})})});const o=Array.from(t).find(s=>s.getAttribute("data-type")===i);o?o.click():t.length>0&&t[0].click()}},init(){this.on("change:attributes:tab-count",this.updateTabs);for(let a=1;a<=8;a++)this.on(`change:attributes:tab-${a}-name`,this.updateTabNames);this.on("change:attributes:data-active",this.updateActiveTab),setTimeout(()=>this.initializeScript(),300)},initializeScript(){var e;const a=this.get("script"),t=(e=this.view)==null?void 0:e.el;a&&t&&a.call(t)},updateTabs(){const a=parseInt(this.get("attributes")["tab-count"]||5),t=this.view.el.querySelector(".account-tabs"),e=this.view.el.querySelector(".account-panels");if(!t||!e)return;const i=t.querySelectorAll(".account-tab-btn"),o=e.querySelectorAll(".account-panel-group"),s=["Personal","Infanto Juvenil","Premium","Diamante","Depósito a Plazo","Tab 6","Tab 7","Tab 8"],c=["personal","infanto-juvenil","premium","diamante","deposito","tab-6","tab-7","tab-8"],n=Array.from(i).map(m=>m.getAttribute("data-type"));t.innerHTML="";for(let m=0;m<a;m++){const d=this.get("attributes")[`tab-${m+1}-name`]||s[m],u=n[m]||c[m],f=document.createElement("button");f.className="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300",f.setAttribute("data-type",u),f.textContent=d,t.appendChild(f);let b=Array.from(o).find(v=>v.getAttribute("data-type")===u);if(!b){b=document.createElement("div"),b.className="account-panel-group hidden",b.setAttribute("data-type",u);let v;m<2?v=`
                                <div class="mb-8">
                                    <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ${d.toLowerCase()}</h3>
                                    <p class="text-lg text-primary font-medium mb-3">DESCRIPCIÓN DESTACADA</p>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        <div class="benefits-column">
                                            <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                                <li>Beneficio 1</li>
                                                <li>Beneficio 2</li>
                                                <li>Beneficio 3</li>
                                            </ul>
                                        </div>
                                        <div class="requirements-column border-l-4 border-gray-300 pl-6">
                                            <h4 class="text-lg font-bold text-primary mb-3">Requisitos:</h4>
                                            <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                                <li>Requisito 1</li>
                                                <li>Requisito 2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `:v=`
                                <div class="mb-8">
                                    <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ${d.toLowerCase()}</h3>
                                    <p class="text-lg text-primary font-medium mb-3">DESCRIPCIÓN DESTACADA</p>
                                    <div>
                                        <h4 class="text-lg font-bold text-primary mb-3">Beneficios:</h4>
                                        <ul class="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>Beneficio 1</li>
                                            <li>Beneficio 2</li>
                                            <li>Beneficio 3</li>
                                        </ul>
                                    </div>
                                </div>
                            `,b.innerHTML=v,e.appendChild(b)}}Array.from(o).forEach(m=>{const d=m.getAttribute("data-type");Array.from(t.querySelectorAll(".account-tab-btn")).some(f=>f.getAttribute("data-type")===d)||m.remove()}),this.get("attributes")["data-active"],setTimeout(()=>{const m=this.get("script"),d=this.view.el;m&&d&&m.call(d)},100)},updateTabNames(){const a=this.view.el.querySelector(".account-tabs");if(!a)return;const t=a.querySelectorAll(".account-tab-btn");for(let e=0;e<t.length;e++){const i=`tab-${e+1}-name`,o=this.get("attributes")[i];o&&t[e]&&(t[e].textContent=o)}},updateActiveTab(){if(!this.get("attributes")["data-active"])return;const t=this.view.el;if(t){const e=this.get("script");e&&e.call(t)}}},view:{onRender(){setTimeout(()=>{const a=this.el,t=this.model.get("script");t&&a&&t.call(a)},100)}}})}function pt(l){l.BlockManager.add("credit-types-block",{label:"Tipos de Crédito",category:"Componentes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="12" height="2" fill="white" />
      <rect x="4" y="7" width="16" height="1" fill="#cccccc" />
      <rect x="4" y="10" width="6" height="2" rx="1" fill="#ffffff" stroke="#23366A" stroke-width="1" />
      <rect x="11" y="10" width="6" height="2" rx="1" fill="#23366A" />
      <rect x="4" y="14" width="10" height="1" fill="white" />
      <rect x="4" y="16" width="8" height="1" fill="white" />
      <rect x="4" y="18" width="12" height="1" fill="white" />
    </svg>`,content:`
            <section class="credit-types-container py-8 md:py-12 bg-white" data-gjs-type="credit-types">
                <div class="max-w-7xl mx-auto px-4">
                    <h2 class="text-3xl font-bold text-primary mb-6">Conoce nuestros créditos</h2>
                    
                    <div class="credit-tabs mb-6 flex flex-wrap gap-3">
                        <button class="credit-tab-btn bg-primary text-white py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-1">Tab 1</button>
                        <button class="credit-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-2">Tab 2</button>
                        <button class="credit-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-3">Tab 3</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-4">Tab 4</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-5">Tab 5</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-6">Tab 6</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-7">Tab 7</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-8">Tab 8</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-9">Tab 9</button>
                        <button class="credit-tab-btn hidden bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="tab-10">Tab 10</button>
                    </div>
                    
                    <div class="credit-panels">
                        <div class="credit-panel-group" data-type="tab-1">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 1</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $10,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 8 años.</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-user-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Personal</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $50,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 12 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden" data-type="tab-2">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-car-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 2</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $70,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 8 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden" data-type="tab-3">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-home-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 3</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto desde $50,000.00 hasta $700,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 30 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden" data-type="tab-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 4</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $50,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 10 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden" data-type="tab-5">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 5</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $50,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 10 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden" data-type="tab-6">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 6</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $50,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 10 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden" data-type="tab-7">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 7</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $50,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 10 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden" data-type="tab-8">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 8</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $50,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 10 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden" data-type="tab-9">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 9</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $50,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 10 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="credit-panel-group hidden" data-type="tab-10">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="credit-panel bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300">
                                    <div class="flex items-center mb-3">
                                        <i class="ri-money-dollar-box-fill text-primary text-2xl mr-3"></i>
                                        <h3 class="text-xl font-bold text-primary">Crédito Tab 10</h3>
                                    </div>
                                    <ul class="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                        <li>
                                            <span class="font-medium">Monto hasta $50,000.00</span>
                                        </li>
                                        <li>
                                            <span>Plazo hasta 10 años</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `}),l.DomComponents.addType("credit-types",{isComponent:function(a){return a.tagName==="SECTION"&&a.classList.contains("credit-types-container")},model:{defaults:{tagName:"section",draggable:!0,droppable:!0,attributes:{"data-gjs-type":"credit-types",class:"credit-types-container py-8 md:py-12 bg-white"},name:"Tipos de Crédito",traits:[{type:"number",name:"tab-count",label:"Número de tabs",min:1,max:10,default:3},{type:"select",name:"data-active",label:"Tab activo inicial",options:[{id:"tab-1",name:"Tab 1"},{id:"tab-2",name:"Tab 2"},{id:"tab-3",name:"Tab 3"},{id:"tab-4",name:"Tab 4"},{id:"tab-5",name:"Tab 5"},{id:"tab-6",name:"Tab 6"},{id:"tab-7",name:"Tab 7"},{id:"tab-8",name:"Tab 8"},{id:"tab-9",name:"Tab 9"},{id:"tab-10",name:"Tab 10"}],default:"tab-1"},{type:"text",name:"tab-1-name",label:"Nombre Tab 1",default:"Tab 1"},{type:"text",name:"tab-2-name",label:"Nombre Tab 2",default:"Tab 2"},{type:"text",name:"tab-3-name",label:"Nombre Tab 3",default:"Tab 3"},{type:"text",name:"tab-4-name",label:"Nombre Tab 4",default:"Tab 4"},{type:"text",name:"tab-5-name",label:"Nombre Tab 5",default:"Tab 5"},{type:"text",name:"tab-6-name",label:"Nombre Tab 6",default:"Tab 6"},{type:"text",name:"tab-7-name",label:"Nombre Tab 7",default:"Tab 7"},{type:"text",name:"tab-8-name",label:"Nombre Tab 8",default:"Tab 8"},{type:"text",name:"tab-9-name",label:"Nombre Tab 9",default:"Tab 9"},{type:"text",name:"tab-10-name",label:"Nombre Tab 10",default:"Tab 10"}],script:function(){const a=this,t=a.querySelectorAll(".credit-tab-btn"),e=a.querySelectorAll(".credit-panel-group"),i=a.getAttribute("data-active")||"tab-1",o=parseInt(a.getAttribute("tab-count")||3);t.forEach((n,m)=>{if(m<o){n.classList.remove("hidden");const d=m+1,u=a.getAttribute(`tab-${d}-name`);u&&(n.textContent=u)}else n.classList.add("hidden");n.addEventListener("click",function(){const d=this.getAttribute("data-type");t.forEach(u=>{u===this?(u.classList.remove("bg-white","text-primary"),u.classList.add("bg-primary","text-white")):(u.classList.remove("bg-primary","text-white"),u.classList.add("bg-white","text-primary"))}),e.forEach(u=>{u.getAttribute("data-type")===d?u.classList.remove("hidden"):u.classList.add("hidden")})})});const s=Array.from(t).find(n=>n.getAttribute("data-type")===i&&!n.classList.contains("hidden"));s?s.click():t.length>0&&!t[0].classList.contains("hidden")&&t[0].click(),a.querySelectorAll('i[class*="ri-"]').forEach(n=>{const m=Array.from(n.classList).find(d=>d.startsWith("ri-"));m&&n.setAttribute("data-original-icon",m)})}},init(){this.on("change:attributes:tab-count",this.updateTabs),this.on("change:attributes:data-active",this.updateActiveTab);for(let a=1;a<=10;a++)this.on(`change:attributes:tab-${a}-name`,this.updateTabNames);this.listenTo(this.collection,"add",this.onAdd),this.updateActiveTabOptions()},onAdd(){setTimeout(()=>this.initializeScript(),300)},initializeScript(){var e;const a=this.get("script"),t=(e=this.view)==null?void 0:e.el;a&&t&&a.call(t)},updateActiveTabOptions(){const a=parseInt(this.get("attributes")["tab-count"]||3),t=[];for(let i=1;i<=a;i++)t.push({id:`tab-${i}`,name:`Tab ${i}`});const e=this.get("traits").where({name:"data-active"})[0];if(e){e.set("options",t);const i=this.get("attributes")["data-active"];t.map(s=>s.id).includes(i)||this.set("attributes",{...this.get("attributes"),"data-active":"tab-1"})}},updateTabs(){const a=parseInt(this.get("attributes")["tab-count"]||3);this.set("attributes",{...this.get("attributes"),"tab-count":a}),this.updateActiveTabOptions(),this.initializeScript()},updateTabNames(){const a={};for(let t=1;t<=10;t++){const e=`tab-${t}-name`,i=this.get("attributes")[e];i&&(a[`tab-${t}-name`]=i)}this.set("attributes",{...this.get("attributes"),...a}),this.initializeScript()},updateActiveTab(){this.initializeScript()}},view:{init(){this.listenTo(this.model,"change:attributes",this.updateScript)},updateScript(){this.onRender()},onRender(){setTimeout(()=>{const a=this.el,t=this.model.get("script");t&&a&&t.call(a)},100)}}})}function ht(l){const r=l.BlockManager;let a=null;r.add("basic-table",{label:"Tabla Básica",category:"Tablas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="0" y="0" width="24" height="24" fill="white" rx="2"/>
            <rect x="2" y="4" width="20" height="16" rx="1" stroke="#23366A" stroke-width="1" fill="none"/>
            <line x1="2" y1="8" x2="22" y2="8" stroke="#23366A" stroke-width="1"/>
            <line x1="12" y1="4" x2="12" y2="20" stroke="#23366A" stroke-width="1"/>
            <rect x="2" y="4" width="20" height="4" fill="#23366A"/>
        </svg>`,content:{type:"custom-table",rows:5,columns:2,padding:"md",layout:"auto",header:["Descripción","Valor por IVA"],headerAlign:["left","right"],data:[["Cargo mensual por servicio*","$1.00"],["Reposición por extravío, pérdida o robo","$3.25"],["Reposición por deterioro","$3.25"],["Por cada transacción en exceso","$1.25"],["Por cada retiro a nivel internacional en ATM","$3.00"]],dataAlign:[["left","right"],["left","right"],["left","right"],["left","right"],["left","right"]]}}),l.on("component:add",t=>{t.get("type")==="custom-table"&&(t.get("_tableInitialized")||(t.set("_tableInitialized",!0),setTimeout(()=>{E("Tabla agregada. Usa el botón 'Configurar Tabla' en el panel de ajustes para personalizar la estructura y contenido.","info",5e3)},500)))}),l.DomComponents.addType("custom-table",{isComponent:t=>t.tagName==="DIV"&&t.classList.contains("table-wrapper"),model:{defaults:{tagName:"div",droppable:!1,rows:3,columns:2,padding:"md",layout:"auto",header:["Header 1","Header 2"],headerAlign:["left","left"],data:[["Cell 1,1","Cell 1,2"],["Cell 2,1","Cell 2,2"],["Cell 3,1","Cell 3,2"]],dataAlign:[["left","left"],["left","left"],["left","left"]],traits:[{type:"button",label:"Tabla",text:"Configurar",full:!0,command:"open-table-config"}],classes:["table-wrapper","overflow-x-auto","my-8","rounded-2xl","shadow-md"]},toHTML(){const t=this.getTableData(),e=this.get("components").map(i=>i.toHTML()).join("");return`<div class="table-wrapper overflow-x-auto my-8 rounded-2xl shadow-md" 
                                data-gjs-type="custom-table"
                                data-table-json='${JSON.stringify(t).replace(/'/g,"&apos;")}'>
                            ${e}
                        </div>`},init(){this.listenTo(l,"component:selected",this.checkSelected),this.on("change:rows change:columns change:padding change:layout change:header change:data change:headerAlign change:dataAlign",this.updateHTML),this.on("change",this.handleChange),this.updateHTML()},updateHTML(){const t=this.get("rows"),e=this.get("columns"),i=this.get("padding"),o=this.get("layout"),s=this.get("header")||[],c=this.get("headerAlign")||[],n=this.get("data")||[],m=this.get("dataAlign")||[],d=[...s];for(;d.length<e;)d.push(`Header ${d.length+1}`);d.length>e&&(d.length=e);const u=[...c];for(;u.length<e;)u.push("left");u.length>e&&(u.length=e);const f=[],b=[];for(let p=0;p<t;p++){const g=n[p]?[...n[p]]:[],y=m[p]?[...m[p]]:[];for(;g.length<e;)g.push(`Cell ${p+1},${g.length+1}`);for(g.length>e&&(g.length=e);y.length<e;)y.push("left");y.length>e&&(y.length=e),f.push(g),b.push(y)}this.set("header",d,{silent:!0}),this.set("headerAlign",u,{silent:!0}),this.set("data",f,{silent:!0}),this.set("dataAlign",b,{silent:!0});const v={xs:"p-1",sm:"p-2",md:"p-3",lg:"p-4"}[i]||"p-3";let h=`<table class="w-full border-collapse border border-gray-200 ${o==="fixed"?"table-fixed":""}">
                                <thead>
                                    <tr>`;for(let p=0;p<e;p++){const g=d[p],y=u[p];h+=`<th class="bg-primary text-white font-semibold ${y==="center"?"text-center":y==="right"?"text-right":"text-left"} ${v} border-b border-r border-gray-200 border-opacity-20 last:border-r-0">${g}</th>`}h+=`</tr>
                    </thead>
                    <tbody>`;for(let p=0;p<t;p++){const g=p%2===1?"bg-gray-50":"";h+=`<tr class="${g}">`;for(let y=0;y<e;y++){const C=f[p][y],T=b[p][y];h+=`<td class="text-gray-600 ${T==="center"?"text-center":T==="right"?"text-right":"text-left"} ${v} border-b border-r border-gray-200 last:border-r-0">${C}</td>`}h+="</tr>"}h+=`</tbody>
                    </table>`,this.components(h)},handleChange(){},checkSelected(t){},getTableData(){return{rows:this.get("rows"),columns:this.get("columns"),padding:this.get("padding"),layout:this.get("layout"),header:this.get("header"),headerAlign:this.get("headerAlign"),data:this.get("data"),dataAlign:this.get("dataAlign")}},setTableData(t){this.set(t)}},view:{init(){this.listenTo(this.model,"change:rows change:columns change:padding change:layout change:header change:data change:headerAlign change:dataAlign",this.render),this.listenTo(this.model,"active",this.onActive)},events:{"dblclick td":"editCell","dblclick th":"editCell"},onRender(){this.el.classList.add("group","relative")},onActive(){},openConfigModal(t){t&&t.stopPropagation(),a=this.model,l.runCommand("open-table-config")},editCell(t){const e=t.target;e.contentEditable=!0,e.focus();const i=()=>{e.contentEditable=!1,e.removeEventListener("blur",i),this.updateCellContent(e)};e.addEventListener("blur",i),e.addEventListener("keydown",function(o){o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),e.blur())})},updateCellContent(t){const e=t.tagName.toLowerCase()==="th",i=this.model.getTableData();if(e){const o=this.el.querySelectorAll("th"),s=Array.from(o).indexOf(t);s!==-1&&i.header&&(i.header[s]=t.textContent,this.model.set("header",i.header))}else{const o=Array.from(this.el.querySelectorAll("tbody tr")).indexOf(t.parentNode),s=Array.from(t.parentNode.children).indexOf(t);o!==-1&&s!==-1&&i.data&&i.data[o]&&(i.data[o][s]=t.textContent,this.model.set("data",i.data))}}}}),l.on("component:selected",t=>{t.get("type")==="custom-table"&&(t.components().length||t.trigger("change:rows"))}),l.Commands.add("open-table-config",{run(t){if(!window.Swal){console.error("SweetAlert2 is required for table configuration modal");return}const e=t.getSelected();if(!e||e.get("type")!=="custom-table"){console.error("No table selected for editing");return}a=e;const i=a.getTableData();let o=`
            <div class="table-config-modal">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Filas</label>
                        <div class="flex items-center">
                            <input type="number" id="table-rows" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${i.rows}" min="1" max="50">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Columnas</label>
                        <div class="flex items-center">
                            <input type="number" id="table-columns" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${i.columns}" min="1" max="10">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Espaciado</label>
                        <div class="flex items-center">
                            <select id="table-padding" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="xs" ${i.padding==="xs"?"selected":""}>Muy pequeño</option>
                                <option value="sm" ${i.padding==="sm"?"selected":""}>Pequeño</option>
                                <option value="md" ${i.padding==="md"?"selected":""}>Medio</option>
                                <option value="lg" ${i.padding==="lg"?"selected":""}>Grande</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Diseño</label>
                        <div class="flex items-center">
                            <select id="table-layout" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="auto" ${i.layout==="auto"?"selected":""}>Automático</option>
                                <option value="fixed" ${i.layout==="fixed"?"selected":""}>Ancho fijo</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="mb-6">
                    <div class="flex items-center mb-2">
                        <label class="block text-sm font-medium text-gray-700">Encabezados</label>
                    </div>
                    <div class="grid grid-cols-1 gap-2" id="header-inputs">`;for(let s=0;s<i.columns;s++){const c=i.header[s]||`Header ${s+1}`,n=i.headerAlign[s]||"left";o+=`
                <div class="flex gap-2">
                    <input type="text" class="header-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${c}">
                    <select class="header-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="left" ${n==="left"?"selected":""}><i class="ri-align-left"></i> Izq</option>
                        <option value="center" ${n==="center"?"selected":""}><i class="ri-align-center"></i> Centro</option>
                        <option value="right" ${n==="right"?"selected":""}><i class="ri-align-right"></i> Der</option>
                    </select>
                </div>`}o+=`
                    </div>
                </div>
                
                <div class="mb-4">
                    <div class="flex items-center mb-2">
                        <label class="block text-sm font-medium text-gray-700">Contenido</label>
                    </div>
                    <div class="grid grid-cols-1 gap-4" id="rows-container">`;for(let s=0;s<i.rows;s++){o+=`
                <div class="border border-gray-200 p-3 rounded bg-gray-50">
                    <div class="flex items-center mb-2">
                        <p class="text-sm font-medium">Fila ${s+1}</p>
                        ${s%2===1?'<span class="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">Fila con fondo</span>':""}
                    </div>
                    <div class="grid grid-cols-1 gap-2 row-inputs">`;for(let c=0;c<i.columns;c++){const n=i.data[s]&&i.data[s][c]||`Cell ${s+1},${c+1}`,m=i.dataAlign[s]&&i.dataAlign[s][c]||"left";o+=`
                    <div class="flex gap-2">
                        <input type="text" class="cell-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${n}">
                        <select class="cell-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                            <option value="left" ${m==="left"?"selected":""}>Izq</option>
                            <option value="center" ${m==="center"?"selected":""}>Centro</option>
                            <option value="right" ${m==="right"?"selected":""}>Der</option>
                        </select>
                    </div>`}o+=`
                    </div>
                </div>`}o+=`
                    </div>
                </div>
            </div>`,Swal.fire({title:"Configurar Tabla",html:o,width:"800px",showCloseButton:!1,showCancelButton:!0,confirmButtonText:"Guardar",cancelButtonText:"Cancelar",confirmButtonColor:"#23366A",customClass:{title:"text-lg font-bold mb-0 pb-0",htmlContainer:"max-h-[70vh] overflow-y-auto",popup:"swal2-custom-popup",actions:"sticky bottom-0 bg-white py-3 shadow-inner"},didOpen:()=>{const s=document.createElement("style");s.textContent=`
                        .swal2-custom-popup {
                            padding-top: 0.5rem;
                            padding-bottom: 0px;
                            display: flex;
                            flex-direction: column;
                        }
                        .swal2-html-container {
                            margin-top: 0px;
                        }
                        .swal2-custom-popup .swal2-title {
                            margin-top: 0;
                        }
                        .swal2-title {
                            padding: 0px;
                        }
                        .swal2-actions {
                            margin-top: 0px;
                        }
                        .swal2-custom-popup .swal2-html-container {
                            margin-top: 0.5rem;
                            overflow-y: auto;
                            max-height: 70vh;
                        }
                    `,document.head.appendChild(s);const c=document.getElementById("table-rows"),n=document.getElementById("table-columns");c.addEventListener("change",()=>m()),n.addEventListener("change",()=>m());function m(){const d=parseInt(c.value)||1,u=parseInt(n.value)||1,f=document.getElementById("header-inputs");let b="";for(let h=0;h<u;h++){const p=h<i.header.length?i.header[h]:`Header ${h+1}`,g=h<i.headerAlign.length?i.headerAlign[h]:"left";b+=`
                            <div class="flex gap-2">
                                <input type="text" class="header-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${p}">
                                <select class="header-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                                    <option value="left" ${g==="left"?"selected":""}>Izq</option>
                                    <option value="center" ${g==="center"?"selected":""}>Centro</option>
                                    <option value="right" ${g==="right"?"selected":""}>Der</option>
                                </select>
                            </div>`}f.innerHTML=b;const v=document.getElementById("rows-container");let w="";for(let h=0;h<d;h++){w+=`
                            <div class="border border-gray-200 p-3 rounded bg-gray-50">
                                <div class="flex items-center mb-2">
                                    <p class="text-sm font-medium">Fila ${h+1}</p>
                                    ${h%2===1?'<span class="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">Fila con fondo</span>':""}
                                </div>
                                <div class="grid grid-cols-1 gap-2 row-inputs">`;for(let p=0;p<u;p++){const g=h<i.data.length&&p<i.data[h].length?i.data[h][p]:`Cell ${h+1},${p+1}`,y=h<i.dataAlign.length&&p<i.dataAlign[h].length?i.dataAlign[h][p]:"left";w+=`
                                <div class="flex gap-2">
                                    <input type="text" class="cell-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${g}">
                                    <select class="cell-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                                        <option value="left" ${y==="left"?"selected":""}>Izq</option>
                                        <option value="center" ${y==="center"?"selected":""}>Centro</option>
                                        <option value="right" ${y==="right"?"selected":""}>Der</option>
                                    </select>
                                </div>`}w+=`
                                </div>
                            </div>`}v.innerHTML=w}},preConfirm:()=>{const s=parseInt(document.getElementById("table-rows").value)||3,c=parseInt(document.getElementById("table-columns").value)||2,n=document.getElementById("table-padding").value,m=document.getElementById("table-layout").value,d=document.querySelectorAll("#header-inputs .header-content"),u=document.querySelectorAll("#header-inputs .header-align"),f=[],b=[];d.forEach(p=>{f.push(p.value)}),u.forEach(p=>{b.push(p.value)});const v=[],w=[];return document.querySelectorAll("#rows-container > div").forEach(p=>{const g=p.querySelectorAll(".cell-content"),y=p.querySelectorAll(".cell-align"),C=[],T=[];g.forEach(x=>{C.push(x.value)}),y.forEach(x=>{T.push(x.value)}),v.push(C),w.push(T)}),{rows:s,columns:c,padding:n,layout:m,header:f,headerAlign:b,data:v,dataAlign:w}}}).then(s=>{s.isConfirmed&&s.value&&a.setTableData(s.value)})}}),l.on("load",function(){const t=l.Canvas.getFrameEl();if(t&&t.contentDocument){const e=t.contentDocument.createElement("style");e.innerHTML=`
                .bg-primary { background-color: #23366A !important; }
                .text-primary { color: #23366A !important; }
                .border-primary { border-color: #23366A !important; }
                
                /* Add hover effect for the settings button */
                .table-wrapper:hover .config-table-button {
                    opacity: 1 !important;
                }
                
                /* Make cells with table-fixed layout handle overflow better */
                .table-fixed td, .table-fixed th { 
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                /* Style for editable cells */
                .table-wrapper th[contenteditable="true"], 
                .table-wrapper td[contenteditable="true"] {
                    outline: 2px solid #4F87FF;
                    outline-offset: -2px;
                }
            `,t.contentDocument.head.appendChild(e)}}),l.DomComponents.addType("div",{model:{defaults:{tagName:"div"},init(){if(this.getClasses().includes("table-wrapper")){this.set("type","custom-table");const t=this.getEl();if(t&&t.getAttribute)try{const e=t.getAttribute("data-table-json");if(e){const i=JSON.parse(e);this.set({rows:parseInt(i.rows)||3,columns:parseInt(i.columns)||2,padding:i.padding||"md",layout:i.layout||"auto",header:Array.isArray(i.header)?i.header:[],headerAlign:Array.isArray(i.headerAlign)?i.headerAlign:[],data:Array.isArray(i.data)?i.data:[],dataAlign:Array.isArray(i.dataAlign)?i.dataAlign:[]}),setTimeout(()=>{this.trigger("change:rows")},300)}}catch(e){console.error("Error loading table data:",e)}}}}}),l.on("storage:before",t=>{const e=[];l.getComponents().forEach(i=>{if(i.get("type")==="custom-table"){const o=i.getTableData();e.push({id:i.getId(),data:{rows:parseInt(o.rows)||3,columns:parseInt(o.columns)||2,padding:o.padding||"md",layout:o.layout||"auto",header:Array.isArray(o.header)?o.header:[],headerAlign:Array.isArray(o.headerAlign)?o.headerAlign:[],data:Array.isArray(o.data)?o.data:[],dataAlign:Array.isArray(o.dataAlign)?o.dataAlign:[]}});const s=JSON.stringify(e[e.length-1].data);i.set("attributes",{...i.get("attributes"),"data-table-json":s})}}),window.grapesJsCustomTableData=e}),l.on("load",()=>{setTimeout(()=>{l.getComponents().forEach(t=>{if(t.get("type")==="custom-table"){const e=t.getEl();if(e&&e.getAttribute)try{const i=e.getAttribute("data-table-json");if(i){const o=JSON.parse(i);t.set({rows:parseInt(o.rows)||3,columns:parseInt(o.columns)||2,padding:o.padding||"md",layout:o.layout||"auto",header:Array.isArray(o.header)?o.header:[],headerAlign:Array.isArray(o.headerAlign)?o.headerAlign:[],data:Array.isArray(o.data)?o.data:[],dataAlign:Array.isArray(o.dataAlign)?o.dataAlign:[]}),t.trigger("change:rows")}}catch(i){console.error("Error loading table data from attribute:",i)}}})},1e3)})}function ft(l){const r=`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="16" height="2" fill="white" />
      <rect x="4" y="8" width="16" height="2" fill="white" />
      <rect x="4" y="12" width="16" height="2" fill="white" />
      <rect x="4" y="16" width="10" height="2" fill="white" />
      <rect x="16" y="16" width="4" height="2" fill="white" />
    </svg>`,a=`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="2" fill="#333" />
      <rect x="2" y="5" width="20" height="17" rx="2" fill="#23366A" />
      <rect x="4" y="7" width="16" height="2" fill="white" />
      <rect x="4" y="11" width="16" height="2" fill="white" />
      <rect x="4" y="15" width="16" height="2" fill="white" />
      <rect x="4" y="19" width="10" height="1" fill="white" />
    </svg>`;l.DomComponents.addType("dynamic-form-basic",{model:{defaults:{name:"Formulario Simple",tagName:"div",droppable:!1,attributes:{class:"form-container bg-white p-6 rounded-2xl border border-gray-200","data-form-id":""}},init(){this.listenTo(this,"change:attributes",this.handleAttrChange),this.loadFormOptions(),this.on("change:attributes:data-form-id",this.updateFormHTML),setTimeout(()=>this.updateFormHTML(),100)},handleAttrChange(){const t=this.getAttributes();t["data-form-id"]!==this.get("attributes")["data-form-id"]&&this.set("attributes",{...t,"data-form-id":t["data-form-id"]||""})},async loadFormOptions(){try{const t=await fetch("/api/forms/active");if(!t.ok)throw new Error("Error loading forms");this.availableForms=await t.json()}catch(t){console.error("Error loading form options:",t),this.availableForms=[]}},updateFormHTML(){try{const t=this.getAttributes()["data-form-id"];if(!t){this.set("content",`
                            <div class="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                <i class="ri-file-list-3-line text-4xl text-gray-400 mb-2"></i>
                                <h3 class="text-lg font-medium text-gray-700 mb-1">Formulario no seleccionado</h3>
                                <p class="text-sm text-gray-500">Haga doble clic para seleccionar un formulario.</p>
                            </div>
                        `);return}fetch("/api/forms/active").then(e=>e.json()).then(e=>{const i=e.find(o=>o.id==t);if(!i)throw new Error("Formulario no encontrado");this.renderForm(i)}).catch(e=>{console.error("Error updating form HTML:",e),this.set("content",`
                                <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                                    <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                                    <h3 class="text-lg font-medium text-red-700 mb-1">Error al cargar el formulario</h3>
                                    <p class="text-sm text-red-500">No se pudo cargar el formulario seleccionado. Por favor, verifique que el formulario exista y esté activo.</p>
                                </div>
                            `)})}catch(t){console.error("Error in updateFormHTML:",t)}},renderForm(t){let e=[];if(t.fields&&!Array.isArray(t.fields))e=Object.keys(t.fields).map(s=>t.fields[s]);else if(Array.isArray(t.fields))e=t.fields;else{console.error("Invalid form fields format:",t.fields),this.set("content",`
                        <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                            <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                            <h3 class="text-lg font-medium text-red-700 mb-1">Error de formato</h3>
                            <p class="text-sm text-red-500">El formato de los campos del formulario es inválido. Por favor, verifique la estructura de datos.</p>
                        </div>
                    `);return}const i=e.map(s=>{const c=`form_${t.id}_${s.name}`,n=s.required?"required":"",m=s.required?'<span class="text-red-500">*</span>':"";let d="";switch(s.type){case"text":d=`
                                    <input type="text" id="${c}" name="${s.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                                `;break;case"email":d=`
                                    <input type="email" id="${c}" name="${s.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                                        ${n}>
                                `;break;case"tel":d=`
                                    <input type="tel" id="${c}" name="${s.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[0-9]{4}-?[0-9]{4}"
                                        placeholder="0000-0000"
                                        ${n}>
                                `;break;case"number":d=`
                                    <input type="number" id="${c}" name="${s.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        min="0"
                                        ${n}>
                                `;break;case"textarea":d=`
                                <textarea id="${c}" name="${s.name}" rows="4"
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-2xl" ${n}></textarea>
                            `;break;case"select":const u=s.options.map(f=>`<option value="${f}">${f}</option>`).join("");d=`
                                <select id="${c}" name="${s.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                                    <option value="">Seleccione una opción</option>
                                    ${u}
                                </select>
                            `;break;case"radio":d=`
                                <div class="space-y-2">
                                    ${s.options.map((f,b)=>`
                                        <div class="flex items-center">
                                            <input type="radio" id="${c}_${b}" name="${s.name}" value="${f}" 
                                                class="h-4 w-4 text-primary border-gray-300" ${b===0&&s.required?"required":""}>
                                            <label for="${c}_${b}" class="ml-2 text-gray-700">${f}</label>
                                        </div>
                                    `).join("")}
                                </div>
                            `;break;case"checkbox":return d=`
                                <div class="flex items-center">
                                    <input type="checkbox" id="${c}" name="${s.name}" value="1" 
                                        class="h-4 w-4 text-primary border-gray-300 rounded" ${n}>
                                    <label for="${c}" class="ml-2 text-gray-700">${s.label}</label>
                                </div>
                            `,d;default:d=`
                                <input type="text" id="${c}" name="${s.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                            `}return s.type==="checkbox"?d:`
                        <div class="mb-4">
                            <label for="${c}" class="block text-gray-700 text-sm font-bold mb-2">
                                ${s.label} ${m}
                            </label>
                            ${d}
                        </div>
                    `}).join(""),o=`
                    <h2 class="text-2xl font-bold text-primary mb-2">${t.title}</h2>
                    ${t.description?`<p class="text-gray-600 mb-4">${t.description}</p>`:""}
                    
                    <form id="dynamic_form_${t.id}" class="dynamic-form" data-form-id="${t.id}">
                        ${i}
                        
                        <div class="mt-6">
                            <button type="submit" class="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                ${t.submit_button_text}
                            </button>
                        </div>
                    </form>
                    
                    <div id="form_success_${t.id}" class="hidden mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        <p class="flex items-center"><i class="ri-check-line mr-2"></i> ${t.success_message}</p>
                    </div>
                    
                    <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            const formId = '${t.id}';
                            if (window['form_initialized_' + formId]) {
                                return;
                            }
                            
                            window['form_initialized_' + formId] = true;
                            
                            const form = document.getElementById('dynamic_form_' + formId);
                            if (form) {
                                const newForm = form.cloneNode(true);
                                form.parentNode.replaceChild(newForm, form);
                                
                                newForm.addEventListener('submit', function(e) {
                                    e.preventDefault();

                                    const submitButton = newForm.querySelector('button[type="submit"]');
                                    if (submitButton.disabled) return;
                                    
                                    submitButton.disabled = true;
                                    submitButton.innerHTML = 'Enviando...';
                                    
                                    // Get form data
                                    const formData = new FormData(newForm);
                                    const jsonData = {};
                                    formData.forEach((value, key) => {
                                        jsonData[key] = value;
                                    });
                                    
                                    // Submit form via AJAX
                                    fetch('/api/forms/' + formId + '/submit', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                                        },
                                        body: JSON.stringify(jsonData)
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        submitButton.disabled = false;
                                        submitButton.innerHTML = '${t.submit_button_text}';
                                        
                                        if (data.success) {
                                            // Show success message
                                            newForm.reset();
                                            const successMessage = document.getElementById('form_success_' + formId);
                                            if (successMessage) {
                                                successMessage.classList.remove('hidden');
                                                
                                                setTimeout(() => {
                                                    successMessage.classList.add('hidden');
                                                }, 5000);
                                            }
                                            
                                            // Redirect if URL is provided
                                            if (data.redirect_url) {
                                                setTimeout(() => {
                                                    window.location.href = data.redirect_url;
                                                }, 1000);
                                            }
                                        } else {
                                            // Show error messages
                                            alert('Error: ' + JSON.stringify(data.errors));
                                        }
                                    })
                                    .catch(error => {
                                        submitButton.disabled = false;
                                        submitButton.innerHTML = '${t.submit_button_text}';
                                        
                                        console.error('Error submitting form:', error);
                                        alert('Error al enviar el formulario. Inténtelo de nuevo más tarde.');
                                    });
                                });
                            }
                        });
                    <\/script>
                `;this.set("content",o)},showFormSelector(){if(!this.availableForms||this.availableForms.length===0){alert("No hay formularios disponibles. Por favor, cree un formulario primero.");return}const e=`
                    <div class="form-selector p-4">
                        <h3 class="text-lg font-medium mb-3">Seleccionar Formulario</h3>
                        <div class="form-options max-h-60 overflow-y-auto">
                            ${this.availableForms.map(i=>`<div class="form-option p-3 border rounded mb-2 cursor-pointer hover:bg-gray-50" data-form-id="${i.id}">
                        <div class="font-medium">${i.title}</div>
                        <div class="text-sm text-gray-500">${Object.keys(i.fields).length} campos</div>
                    </div>`).join("")}
                        </div>
                    </div>
                `;if(typeof Swal<"u")Swal.fire({title:"Seleccionar Formulario",html:e,showCancelButton:!0,cancelButtonText:"Cancelar",showConfirmButton:!1,width:"500px",didOpen:()=>{Swal.getPopup().querySelectorAll(".form-option").forEach(o=>{o.addEventListener("click",()=>{const s=o.getAttribute("data-form-id");this.set("attributes",{...this.getAttributes(),"data-form-id":s}),Swal.close()})})}});else{const i=prompt("Ingrese el ID del formulario:");i&&this.set("attributes",{...this.getAttributes(),"data-form-id":i})}}},view:{events:{dblclick:"onDblClick"},onDblClick(){this.model.showFormSelector()}}}),l.DomComponents.addType("dynamic-form-section",{model:{defaults:{name:"Sección con Formulario",tagName:"section",droppable:!1,attributes:{class:"py-8 md:py-14 bg-white","data-form-id":""}},init(){this.listenTo(this,"change:attributes",this.handleAttrChange),this.loadFormOptions(),this.on("change:attributes:data-form-id",this.updateFormHTML),setTimeout(()=>this.updateFormHTML(),100)},handleAttrChange(){const t=this.getAttributes();t["data-form-id"]!==this.get("attributes")["data-form-id"]&&this.set("attributes",{...t,"data-form-id":t["data-form-id"]||""})},async loadFormOptions(){try{const t=await fetch("/api/forms/active");if(!t.ok)throw new Error("Error loading forms");this.availableForms=await t.json()}catch(t){console.error("Error loading form options:",t),this.availableForms=[]}},updateFormHTML(){try{const t=this.getAttributes()["data-form-id"];if(!t){this.set("content",`
                            <div class="max-w-7xl mx-auto px-4">
                                <div class="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                    <i class="ri-file-list-3-line text-4xl text-gray-400 mb-2"></i>
                                    <h3 class="text-lg font-medium text-gray-700 mb-1">Formulario no seleccionado</h3>
                                    <p class="text-sm text-gray-500">Haga doble clic para seleccionar un formulario.</p>
                                </div>
                            </div>
                        `);return}fetch("/api/forms/active").then(e=>e.json()).then(e=>{const i=e.find(o=>o.id==t);if(!i)throw new Error("Formulario no encontrado");this.renderForm(i)}).catch(e=>{console.error("Error updating form HTML:",e),this.set("content",`
                                <div class="max-w-7xl mx-auto px-4">
                                    <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                                        <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                                        <h3 class="text-lg font-medium text-red-700 mb-1">Error al cargar el formulario</h3>
                                        <p class="text-sm text-red-500">No se pudo cargar el formulario seleccionado. Por favor, verifique que el formulario exista y esté activo.</p>
                                    </div>
                                </div>
                            `)})}catch(t){console.error("Error in updateFormHTML:",t)}},renderForm(t){let e=[];if(t.fields&&!Array.isArray(t.fields))e=Object.keys(t.fields).map(s=>t.fields[s]);else if(Array.isArray(t.fields))e=t.fields;else{console.error("Invalid form fields format:",t.fields),this.set("content",`
                        <div class="max-w-7xl mx-auto px-4">
                            <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                                <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                                <h3 class="text-lg font-medium text-red-700 mb-1">Error de formato</h3>
                                <p class="text-sm text-red-500">El formato de los campos del formulario es inválido. Por favor, verifique la estructura de datos.</p>
                            </div>
                        </div>
                    `);return}const i=e.map(s=>{const c=`form_${t.id}_${s.name}`,n=s.required?"required":"",m=s.required?'<span class="text-red-500">*</span>':"";let d="";switch(s.type){case"text":d=`
                                    <input type="text" id="${c}" name="${s.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                                `;break;case"email":d=`
                                    <input type="email" id="${c}" name="${s.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                                        ${n}>
                                `;break;case"tel":d=`
                                    <input type="tel" id="${c}" name="${s.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[0-9]{4}-?[0-9]{4}"
                                        placeholder="0000-0000"
                                        ${n}>
                                `;break;case"number":d=`
                                    <input type="number" id="${c}" name="${s.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        min="0"
                                        ${n}>
                                `;break;case"textarea":d=`
                                <textarea id="${c}" name="${s.name}" rows="4"
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-2xl" ${n}></textarea>
                            `;break;case"select":const u=s.options.map(f=>`<option value="${f}">${f}</option>`).join("");d=`
                                <select id="${c}" name="${s.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                                    <option value="">Seleccione una opción</option>
                                    ${u}
                                </select>
                            `;break;case"radio":d=`
                                <div class="space-y-2">
                                    ${s.options.map((f,b)=>`
                                        <div class="flex items-center">
                                            <input type="radio" id="${c}_${b}" name="${s.name}" value="${f}" 
                                                class="h-4 w-4 text-primary border-gray-300" ${b===0&&s.required?"required":""}>
                                            <label for="${c}_${b}" class="ml-2 text-gray-700">${f}</label>
                                        </div>
                                    `).join("")}
                                </div>
                            `;break;case"checkbox":return d=`
                                <div class="flex items-center">
                                    <input type="checkbox" id="${c}" name="${s.name}" value="1" 
                                        class="h-4 w-4 text-primary border-gray-300 rounded" ${n}>
                                    <label for="${c}" class="ml-2 text-gray-700">${s.label}</label>
                                </div>
                            `,d;default:d=`
                                <input type="text" id="${c}" name="${s.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                            `}return s.type==="checkbox"?d:`
                        <div class="mb-4">
                            <label for="${c}" class="block text-gray-700 text-sm font-bold mb-2">
                                ${s.label} ${m}
                            </label>
                            ${d}
                        </div>
                    `}).join(""),o=`
                    <div class="max-w-7xl mx-auto px-4">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-primary mb-2">${t.title}</h2>
                            ${t.description?`<p class="text-gray-600 mb-2 max-w-3xl mx-auto">${t.description}</p>`:""}
                        </div>
                        
                        <div class="max-w-2xl mx-auto">
                            <div class="bg-white p-6 rounded-2xl border border-gray-200">
                                <form id="dynamic_form_${t.id}" class="dynamic-form" data-form-id="${t.id}">
                                    ${i}
                                    
                                    <div class="mt-6">
                                        <button type="submit" class="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                            ${t.submit_button_text}
                                        </button>
                                    </div>
                                </form>
                                
                                <div id="form_success_${t.id}" class="hidden mt-6 p-4 bg-green-100 text-green-700 rounded-2xl">
                                    <p class="flex items-center"><i class="ri-check-line mr-2"></i> ${t.success_message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            const formId = '${t.id}';
                            if (window['form_initialized_' + formId]) {
                                return;
                            }
                            
                            window['form_initialized_' + formId] = true;
                            
                            const form = document.getElementById('dynamic_form_' + formId);
                            if (form) {
                                const newForm = form.cloneNode(true);
                                form.parentNode.replaceChild(newForm, form);
                                
                                newForm.addEventListener('submit', function(e) {
                                    e.preventDefault();

                                    const submitButton = newForm.querySelector('button[type="submit"]');
                                    if (submitButton.disabled) return; // Ya está en proceso
                                    
                                    submitButton.disabled = true;
                                    submitButton.innerHTML = 'Enviando...';
                                    
                                    // Get form data
                                    const formData = new FormData(newForm);
                                    const jsonData = {};
                                    formData.forEach((value, key) => {
                                        jsonData[key] = value;
                                    });
                                    
                                    // Submit form via AJAX
                                    fetch('/api/forms/' + formId + '/submit', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                                        },
                                        body: JSON.stringify(jsonData)
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        submitButton.disabled = false;
                                        submitButton.innerHTML = '${t.submit_button_text}';
                                        
                                        if (data.success) {
                                            // Show success message
                                            newForm.reset();
                                            const successMessage = document.getElementById('form_success_' + formId);
                                            if (successMessage) {
                                                successMessage.classList.remove('hidden');
                                                
                                                setTimeout(() => {
                                                    successMessage.classList.add('hidden');
                                                }, 5000);
                                            }
                                            
                                            // Redirect if URL is provided
                                            if (data.redirect_url) {
                                                setTimeout(() => {
                                                    window.location.href = data.redirect_url;
                                                }, 1000);
                                            }
                                        } else {
                                            // Show error messages
                                            alert('Error: ' + JSON.stringify(data.errors));
                                        }
                                    })
                                    .catch(error => {
                                        submitButton.disabled = false;
                                        submitButton.innerHTML = '${t.submit_button_text}';
                                        
                                        console.error('Error submitting form:', error);
                                        alert('Error al enviar el formulario. Inténtelo de nuevo más tarde.');
                                    });
                                });
                            }
                        });
                    <\/script>
                `;this.set("content",o)},showFormSelector(){if(!this.availableForms||this.availableForms.length===0){alert("No hay formularios disponibles. Por favor, cree un formulario primero.");return}const e=`
                    <div class="form-selector p-4">
                        <h3 class="text-lg font-medium mb-3">Seleccionar Formulario</h3>
                        <div class="form-options max-h-60 overflow-y-auto">
                            ${this.availableForms.map(i=>`<div class="form-option p-3 border rounded mb-2 cursor-pointer hover:bg-gray-50" data-form-id="${i.id}">
                        <div class="font-medium">${i.title}</div>
                        <div class="text-sm text-gray-500">${Object.keys(i.fields).length} campos</div>
                    </div>`).join("")}
                        </div>
                    </div>
                `;if(typeof Swal<"u")Swal.fire({title:"Seleccionar Formulario",html:e,showCancelButton:!0,cancelButtonText:"Cancelar",showConfirmButton:!1,width:"500px",didOpen:()=>{Swal.getPopup().querySelectorAll(".form-option").forEach(o=>{o.addEventListener("click",()=>{const s=o.getAttribute("data-form-id");this.set("attributes",{...this.getAttributes(),"data-form-id":s}),Swal.close()})})}});else{const i=prompt("Ingrese el ID del formulario:");i&&this.set("attributes",{...this.getAttributes(),"data-form-id":i})}}},view:{events:{dblclick:"onDblClick"},onDblClick(){this.model.showFormSelector()}}}),l.BlockManager.add("dynamic-form-basic",{label:"Formulario Simple",category:"Formularios",attributes:{class:"gjs-block-section"},media:r,content:{type:"dynamic-form-basic"}}),l.BlockManager.add("dynamic-form-section",{label:"Sección con Formulario",category:"Formularios",attributes:{class:"gjs-block-section"},media:a,content:{type:"dynamic-form-section"}})}function gt(l){const r=`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <circle cx="6" cy="8" r="2" fill="white" />
      <circle cx="12" cy="8" r="2" fill="white" />
      <circle cx="18" cy="8" r="2" fill="white" />
      <rect x="4" y="14" width="16" height="2" fill="white" />
      <rect x="4" y="18" width="10" height="2" fill="white" />
    </svg>`;l.DomComponents.addType("precalificador-form",{isComponent:function(a){return a.tagName==="SECTION"&&(a.getAttribute("data-gjs-type")==="precalificador-form"||a.querySelector(".precalificador-form"))},model:{defaults:{name:"Formulario Precalificador",tagName:"section",droppable:!1,attributes:{class:"py-8 md:py-14 bg-white","data-gjs-type":"precalificador-form"},traits:[{type:"text",name:"form-title",label:"Título del formulario",default:"Precalificador de créditos"},{type:"text",name:"form-subtitle",label:"Subtítulo",default:"Por favor llene los campos del formulario"},{type:"button",text:"Generar tabla",full:!0,command:"create-form-in-db"}]},init(){this.on("change:attributes",this.updateContent),setTimeout(()=>this.updateContent(),100)},updateContent(){const a=this.getAttributes(),t=a["form-title"]||"Precalificador de créditos",e=a["form-subtitle"]||"Por favor llene los campos del formulario",i=`
                    <div class="max-w-7xl mx-auto px-4" data-precalificador-container="${this.cid}">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-primary mb-2">${t}</h2>
                            <p class="text-gray-600">${e}</p>
                        </div>
                        
                        <div class="precalificador-form max-w-4xl mx-auto">
                            <div class="steps-progress mb-8">
                                <div class="flex justify-between items-center">
                                    <div class="step-indicator flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-1">
                                            <i class="ri-user-line"></i>
                                        </div>
                                        <span class="text-xs text-primary font-medium">Personal</span>
                                    </div>
                                    
                                    <div class="flex-1 h-1 bg-gray-200 relative top-[-10px]"></div>
                                    
                                    <div class="step-indicator flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-white text-primary border-2 border-primary flex items-center justify-center mb-1">
                                            <i class="ri-money-dollar-circle-line"></i>
                                        </div>
                                        <span class="text-xs text-gray-500">Perfil</span>
                                    </div>
                                    
                                    <div class="flex-1 h-1 bg-gray-200 relative top-[-10px]"></div>
                                    
                                    <div class="step-indicator flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-white text-primary border-2 border-primary flex items-center justify-center mb-1">
                                            <i class="ri-file-list-3-line"></i>
                                        </div>
                                        <span class="text-xs text-gray-500">Cuota</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Custom Alert Banner -->
                            <div id="form-alert-banner" class="hidden mb-6 p-4 rounded-lg bg-red-100 text-red-700 border border-red-400">
                                <div class="flex items-center">
                                    <i class="ri-error-warning-line mr-2 text-xl"></i>
                                    <span id="alert-message" class="font-semibold"></span>
                                </div>
                            </div>
                            
                            <form id="precalificador_form" class="steps-form">
                                <!-- Step 1: Personal Information -->
                                <div id="step-1" class="step-content">
                                    <h3 class="text-xl font-bold text-primary mb-6">Información personal</h3>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label for="nombres" class="block text-primary text-sm font-bold mb-2">
                                                Nombre según DUI <span class="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="nombres" name="nombres" required 
                                                placeholder="Nombres"
                                                class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                        
                                        <div>
                                            <label for="apellidos" class="block text-primary text-sm font-bold mb-2">
                                                Nombre según DUI <span class="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="apellidos" name="apellidos" required 
                                                placeholder="Apellidos"
                                                class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label for="dui" class="block text-primary text-sm font-bold mb-2">
                                                Número de DUI <span class="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="dui" name="dui" required 
                                                placeholder="00000000-0"
                                                class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                        
                                        <div>
                                            <label for="edad" class="block text-primary text-sm font-bold mb-2">
                                                Edad <span class="text-red-500">*</span>
                                            </label>
                                            <input type="number" id="edad" name="edad" min="18" required 
                                                class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-8">
                                        <label class="block text-primary text-sm font-bold mb-2">
                                            Datos de contacto <span class="text-red-500">*</span>
                                        </label>
                                        
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <input type="tel" id="telefono" name="telefono" placeholder="0000-0000" required 
                                                    class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                            </div>
                                            
                                            <div>
                                                <input type="email" id="correo" name="correo" placeholder="Correo electrónico" required 
                                                    class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex justify-end">
                                        <button type="button" class="next-step bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Step 2: Financial Profile -->
                                <div id="step-2" class="step-content hidden">
                                    <h3 class="text-xl font-bold text-primary mb-6">Perfil</h3>
                                    
                                    <div class="mb-6">
                                        <label for="ingreso_mensual" class="block text-primary text-sm font-bold mb-2">
                                            Ingreso mensual <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-700">$</span>
                                            <input type="text" id="ingreso_mensual" name="ingreso_mensual" required 
                                                placeholder="0.00"
                                                class="border-2 border-primary w-full py-2 pl-8 pr-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-6">
                                        <label for="tipo_empleo" class="block text-primary text-sm font-bold mb-2">
                                            Tipo de empleo <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <select id="tipo_empleo" name="tipo_empleo" required
                                                class="appearance-none border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                                <option value="">Seleccione una opción</option>
                                                <option value="Formal">Empleo Formal</option>
                                                <option value="Informal">Empleo Informal</option>
                                                <option value="Negocio propio">Negocio propio</option>
                                                <option value="Jubilado">Jubilado/a</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                                <i class="ri-arrow-down-s-line text-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-8">
                                        <label for="antiguedad_laboral" class="block text-primary text-sm font-bold mb-2">
                                            Antigüedad laboral (años) <span class="text-red-500">*</span>
                                        </label>
                                        <input type="number" id="antiguedad_laboral" name="antiguedad_laboral" min="0" required 
                                            class="border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                    </div>
                                    
                                    <div class="flex justify-between">
                                        <button type="button" class="prev-step border-2 border-primary bg-white hover:bg-gray-100 text-primary font-semibold py-3 px-8 rounded-full transition-colors">
                                            Anterior
                                        </button>
                                        
                                        <button type="button" class="next-step bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Step 3: Loan Information -->
                                <div id="step-3" class="step-content hidden">
                                    <h3 class="text-xl font-bold text-primary mb-6">Cuota</h3>
                                    
                                    <div class="mb-6">
                                        <label for="monto_solicitado" class="block text-primary text-sm font-bold mb-2">
                                            Monto solicitado <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-700">$</span>
                                            <input type="text" id="monto_solicitado" name="monto_solicitado" required 
                                                placeholder="0.00"
                                                class="border-2 border-primary w-full py-2 pl-8 pr-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-6">
                                        <label for="plazo_meses" class="block text-primary text-sm font-bold mb-2">
                                            Plazo en meses <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <select id="plazo_meses" name="plazo_meses" required
                                                class="appearance-none border-2 border-primary w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                                                <option value="">Seleccione una opción</option>
                                                <option value="12">12 meses</option>
                                                <option value="24">24 meses</option>
                                                <option value="36">36 meses</option>
                                                <option value="48">48 meses</option>
                                                <option value="60">60 meses</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                                <i class="ri-arrow-down-s-line text-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-8">
                                        <label class="flex items-center">
                                            <input type="checkbox" id="acepto_terminos" name="acepto_terminos" required
                                                class="h-4 w-4 text-primary border-primary rounded">
                                            <span class="ml-2 text-gray-700 text-sm">
                                                Acepto los <a href="#" class="text-primary hover:underline">términos y condiciones</a> <span class="text-red-500">*</span>
                                            </span>
                                        </label>
                                    </div>
                                    
                                    <div class="flex justify-between">
                                        <button type="button" class="prev-step border-2 border-primary bg-white hover:bg-gray-100 text-primary font-semibold py-3 px-8 rounded-full transition-colors">
                                            Anterior
                                        </button>
                                        
                                        <button type="submit" class="submit-form bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors">
                                            Enviar solicitud
                                        </button>
                                    </div>
                                </div>
                            </form>
                            
                            <div id="form_success" class="hidden mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
                                <p class="flex items-center"><i class="ri-check-line mr-2"></i> Su solicitud ha sido enviada correctamente. Nos pondremos en contacto con usted pronto.</p>
                            </div>
                        </div>
                    </div>
                    
                    <script>
                        (function() {
                            const containerId = this.id || 'precalificador-' + Math.random().toString(36).substr(2, 9);
                            this.id = containerId;
                            
                            if (window['precalificador_initialized_' + containerId]) {
                                return;
                            }
                            
                            window['precalificador_initialized_' + containerId] = true;
                            
                            const form = document.getElementById('precalificador_form');
                            const alertBanner = document.getElementById('form-alert-banner');
                            const alertMessage = document.getElementById('alert-message');
                            
                            if (form) {
                                const totalSteps = 3;
                                let currentStep = 1;
                                
                                const steps = Array.from({length: totalSteps}).map((_, i) => 
                                    document.getElementById('step-' + (i + 1))
                                );
                                
                                const indicators = document.querySelectorAll('.step-indicator');
                                const prevButtons = form.querySelectorAll('.prev-step');
                                const nextButtons = form.querySelectorAll('.next-step');
                                const submitButton = form.querySelector('.submit-form');
                                
                                // Initialize input masks and validations
                                const initInputMasks = function() {
                                    // DUI mask (00000000-0)
                                    const duiInput = document.getElementById('dui');
                                    if (duiInput) {
                                        duiInput.addEventListener('input', function(e) {
                                            let value = e.target.value.replace(/\\D/g, ''); // Remove non-digits
                                            
                                            if (value.length > 9) {
                                                value = value.substr(0, 9); // Limit to 9 digits
                                            }
                                            
                                            // Format: XXXXXXXX-X
                                            if (value.length > 8) {
                                                e.target.value = value.substr(0, 8) + '-' + value.substr(8);
                                            } else {
                                                e.target.value = value;
                                            }
                                        });
                                    }
                                    
                                    // Phone mask (0000-0000)
                                    const phoneInput = document.getElementById('telefono');
                                    if (phoneInput) {
                                        phoneInput.addEventListener('input', function(e) {
                                            let value = e.target.value.replace(/\\D/g, ''); // Remove non-digits
                                            
                                            if (value.length > 8) {
                                                value = value.substr(0, 8); // Limit to 8 digits
                                            }
                                            
                                            // Format: XXXX-XXXX
                                            if (value.length > 4) {
                                                e.target.value = value.substr(0, 4) + '-' + value.substr(4);
                                            } else {
                                                e.target.value = value;
                                            }
                                        });
                                    }
                                    
                                    // Currency inputs with 2 decimal places
                                    const moneyInputs = [
                                        document.getElementById('ingreso_mensual'),
                                        document.getElementById('monto_solicitado')
                                    ];
                                    
                                    moneyInputs.forEach(input => {
                                        if (input) {
                                            input.addEventListener('input', function(e) {
                                                let value = e.target.value.replace(/[^0-9.]/g, ''); // Allow only digits and dot
                                                
                                                // Check if there's already a decimal point
                                                const decimalIndex = value.indexOf('.');
                                                if (decimalIndex !== -1) {
                                                    // Limit to 2 decimal places
                                                    const integerPart = value.substring(0, decimalIndex);
                                                    let decimalPart = value.substring(decimalIndex + 1);
                                                    
                                                    if (decimalPart.length > 2) {
                                                        decimalPart = decimalPart.substring(0, 2);
                                                    }
                                                    
                                                    e.target.value = integerPart + '.' + decimalPart;
                                                } else {
                                                    e.target.value = value;
                                                }
                                            });
                                            
                                            // Format to 2 decimal places when losing focus
                                            input.addEventListener('blur', function(e) {
                                                if (e.target.value) {
                                                    const value = parseFloat(e.target.value);
                                                    if (!isNaN(value)) {
                                                        e.target.value = value.toFixed(2);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                    
                                    // Validate min age
                                    const ageInput = document.getElementById('edad');
                                    if (ageInput) {
                                        ageInput.addEventListener('input', function(e) {
                                            let value = parseInt(e.target.value);
                                            if (value < 18) {
                                                ageInput.setCustomValidity('La edad mínima es 18 años');
                                            } else {
                                                ageInput.setCustomValidity('');
                                            }
                                        });
                                    }
                                    
                                    // Email validation
                                    const emailInput = document.getElementById('correo');
                                    if (emailInput) {
                                        emailInput.addEventListener('input', function(e) {
                                            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/;
                                            
                                            if (e.target.value && !emailPattern.test(e.target.value)) {
                                                emailInput.setCustomValidity('Por favor ingrese un correo electrónico válido');
                                            } else {
                                                emailInput.setCustomValidity('');
                                            }
                                        });
                                    }
                                };
                                
                                // Show custom alert banner
                                const showAlert = function(message) {
                                    alertMessage.textContent = message;
                                    alertBanner.classList.remove('hidden');
                                    
                                    // Scroll to the alert banner
                                    alertBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                    
                                    // Auto hide after 5 seconds
                                    setTimeout(() => {
                                        alertBanner.classList.add('hidden');
                                    }, 5000);
                                };
                                
                                // Function to show a specific step
                                function showStep(stepNumber) {
                                    // Hide all steps
                                    steps.forEach(step => {
                                        if (step) step.classList.add('hidden');
                                    });
                                    
                                    // Show current step
                                    const currentStepEl = steps[stepNumber - 1];
                                    if (currentStepEl) currentStepEl.classList.remove('hidden');
                                    
                                    // Update indicators
                                    indicators.forEach((indicator, i) => {
                                        const numElement = indicator.querySelector('div:first-child');
                                        const textElement = indicator.querySelector('span');
                                        
                                        if (i < stepNumber - 1) {
                                            // Completed step
                                            numElement.classList.remove('bg-white', 'text-primary', 'border-primary', 'border-2');
                                            numElement.classList.add('bg-green-500', 'text-white');
                                            numElement.innerHTML = '<i class="ri-check-line"></i>';
                                            textElement.classList.remove('text-gray-500');
                                            textElement.classList.add('text-green-500', 'font-medium');
                                        } else if (i === stepNumber - 1) {
                                            // Current step
                                            numElement.classList.remove('bg-white', 'text-primary', 'border-primary', 'border-2', 'bg-green-500');
                                            numElement.classList.add('bg-primary', 'text-white');
                                            if (i === 0) numElement.innerHTML = '<i class="ri-user-line"></i>';
                                            if (i === 1) numElement.innerHTML = '<i class="ri-money-dollar-circle-line"></i>';
                                            if (i === 2) numElement.innerHTML = '<i class="ri-file-list-3-line"></i>';
                                            textElement.classList.remove('text-gray-500', 'text-green-500');
                                            textElement.classList.add('text-primary', 'font-medium');
                                        } else {
                                            // Future steps
                                            numElement.classList.remove('bg-primary', 'text-white', 'bg-green-500');
                                            numElement.classList.add('bg-white', 'text-primary', 'border-primary', 'border-2');
                                            if (i === 0) numElement.innerHTML = '<i class="ri-user-line"></i>';
                                            if (i === 1) numElement.innerHTML = '<i class="ri-money-dollar-circle-line"></i>';
                                            if (i === 2) numElement.innerHTML = '<i class="ri-file-list-3-line"></i>';
                                            textElement.classList.remove('text-primary', 'font-medium', 'text-green-500');
                                            textElement.classList.add('text-gray-500');
                                        }
                                    });
                                    
                                    // Hide alert banner when changing steps
                                    alertBanner.classList.add('hidden');
                                    
                                    currentStep = stepNumber;
                                }
                                
                                // Previous buttons event listeners
                                prevButtons.forEach(button => {
                                    button.addEventListener('click', function() {
                                        if (currentStep > 1) {
                                            showStep(currentStep - 1);
                                        }
                                    });
                                });
                                
                                // Next buttons event listeners
                                nextButtons.forEach(button => {
                                    button.addEventListener('click', function() {
                                        if (currentStep < totalSteps) {
                                            // Validate current step fields before proceeding
                                            const currentStepEl = steps[currentStep - 1];
                                            const requiredInputs = currentStepEl.querySelectorAll('input[required], select[required]');
                                            let isValid = true;
                                            let firstInvalidInput = null;
                                            
                                            requiredInputs.forEach(input => {
                                                // Check custom validity
                                                if (input.validity.customError) {
                                                    isValid = false;
                                                    input.classList.remove('border-primary');
                                                    input.classList.add('border-red-500');
                                                    
                                                    if (!firstInvalidInput) firstInvalidInput = input;
                                                    return;
                                                }
                                                
                                                // Check email format
                                                if (input.type === 'email' && input.value) {
                                                    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/;
                                                    if (!emailPattern.test(input.value)) {
                                                        isValid = false;
                                                        input.classList.remove('border-primary');
                                                        input.classList.add('border-red-500');
                                                        
                                                        if (!firstInvalidInput) firstInvalidInput = input;
                                                        return;
                                                    }
                                                }
                                                
                                                // Check if field is empty
                                                if (!input.value.trim()) {
                                                    isValid = false;
                                                    input.classList.remove('border-primary');
                                                    input.classList.add('border-red-500');
                                                    
                                                    if (!firstInvalidInput) firstInvalidInput = input;
                                                } else {
                                                    input.classList.remove('border-red-500');
                                                    input.classList.add('border-primary');
                                                }
                                            });
                                            
                                            if (isValid) {
                                                showStep(currentStep + 1);
                                            } else {
                                                showAlert('Por favor complete todos los campos obligatorios correctamente.');
                                                
                                                // Focus on first invalid input
                                                if (firstInvalidInput) {
                                                    firstInvalidInput.focus();
                                                }
                                            }
                                        }
                                    });
                                });
                                
                                // Form submission
                                form.addEventListener('submit', function(e) {
                                    e.preventDefault();
                                    
                                    // Validate final step fields
                                    const lastStepEl = steps[totalSteps - 1];
                                    const requiredInputs = lastStepEl.querySelectorAll('input[required], select[required]');
                                    let isValid = true;
                                    let firstInvalidInput = null;
                                    
                                    requiredInputs.forEach(input => {
                                        if (input.type === 'checkbox') {
                                            if (!input.checked) {
                                                isValid = false;
                                                if (!firstInvalidInput) firstInvalidInput = input;
                                            }
                                        } else if (!input.value.trim()) {
                                            isValid = false;
                                            input.classList.remove('border-primary');
                                            input.classList.add('border-red-500');
                                            
                                            if (!firstInvalidInput) firstInvalidInput = input;
                                        } else {
                                            input.classList.remove('border-red-500');
                                            input.classList.add('border-primary');
                                        }
                                    });
                                    
                                    if (!isValid) {
                                        showAlert('Por favor complete todos los campos obligatorios correctamente.');
                                        
                                        // Focus on first invalid input
                                        if (firstInvalidInput) {
                                            firstInvalidInput.focus();
                                        }
                                        
                                        return;
                                    }

                                    const submitBtn = submitButton;
                                    if (submitBtn.disabled) return;
                                    
                                    submitBtn.disabled = true;
                                    submitBtn.innerHTML = 'Enviando...';
                                    
                                    // Get form data
                                    const formData = new FormData(form);
                                    const jsonData = {};
                                    formData.forEach((value, key) => {
                                        jsonData[key] = value;
                                    });
                                    
                                    // Submit form via AJAX - using existing API endpoint
                                    fetch('/api/forms/' + (form.closest('.precalificador-form').getAttribute('data-form-id') || '1') + '/submit', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                                        },
                                        body: JSON.stringify(jsonData)
                                    })
                                    .then(response => {
                                        // First check if response is ok
                                        if (!response.ok) {
                                            throw new Error('Error ' + response.status + ': ' + response.statusText);
                                        }
                                        
                                        // Check content type to ensure it's JSON
                                        const contentType = response.headers.get('content-type');
                                        if (!contentType || !contentType.includes('application/json')) {
                                            throw new Error('La respuesta no es JSON válido. Tipo recibido: ' + contentType);
                                        }
                                        
                                        return response.json();
                                    })
                                    .then(data => {
                                        submitBtn.disabled = false;
                                        submitBtn.innerHTML = 'Enviar solicitud';
                                        
                                        if (data.success) {
                                            // Show success message
                                            form.reset();
                                            form.classList.add('hidden');
                                            const successMessage = document.getElementById('form_success');
                                            if (successMessage) {
                                                successMessage.classList.remove('hidden');
                                                
                                                // Optionally redirect after successful submission
                                                if (data.redirect_url) {
                                                    setTimeout(() => {
                                                        window.location.href = data.redirect_url;
                                                    }, 2000);
                                                }
                                            }
                                        } else {
                                            // Show error messages in banner
                                            let errorMessage = 'Ocurrió un error al procesar su solicitud.';
                                            
                                            if (data.errors) {
                                                if (typeof data.errors === 'string') {
                                                    errorMessage = data.errors;
                                                } else if (typeof data.errors === 'object') {
                                                    // Get first error message
                                                    const firstKey = Object.keys(data.errors)[0];
                                                    if (firstKey && data.errors[firstKey][0]) {
                                                        errorMessage = data.errors[firstKey][0];
                                                    }
                                                }
                                            }
                                            
                                            showAlert(errorMessage);
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error submitting form:', error);
                                        submitBtn.disabled = false;
                                        submitBtn.innerHTML = 'Enviar solicitud';
                                        
                                        showAlert('Error al enviar el formulario: ' + error.message);
                                    });
                                });
                                
                                // Initialize masks and validations
                                initInputMasks();
                                
                                // Initialize first step
                                showStep(1);
                            }
                        })();
                    <\/script>
                    `;this.set("content",i)}}}),l.Commands.add("create-form-in-db",{run:function(a,t){xt(a)}}),l.BlockManager.add("precalificador-form-block",{label:"Precalificador de Créditos",category:"Formularios",attributes:{class:"gjs-block-section"},media:r,content:{type:"precalificador-form"}}),l.on("component:add",a=>{a.get("type")==="precalificador-form"&&setTimeout(()=>{showAlert("Para que el formulario funcione correctamente, recuerda generar la tabla en base de datos usando el botón en el panel de propiedades.","info",8e3)},1e3)}),l.on("component:selected",function(a){a.get("type")==="precalificador-form"&&setTimeout(()=>{const t=a.get("script"),e=a.view.el;t&&e&&t.call(e)},300)}),l.on("component:mount",function(a){a.get("type")==="precalificador-form"&&setTimeout(()=>{const t=a.get("script"),e=a.view.el;t&&e&&t.call(e)},300)})}function xt(l){const r=l.getSelected(),a={title:"Creando formulario",text:"Por favor espere mientras se crea el formulario en la base de datos...",allowOutsideClick:!1,showConfirmButton:!1,willOpen:()=>{Swal.showLoading()}};Swal.fire(a);const t={title:"Precalificador de Créditos",description:"Formulario para precalificación de créditos",fields:[{type:"text",label:"Nombres",name:"nombres",required:!0},{type:"text",label:"Apellidos",name:"apellidos",required:!0},{type:"text",label:"Número de DUI",name:"dui",required:!0},{type:"number",label:"Edad",name:"edad",required:!0},{type:"tel",label:"Teléfono",name:"telefono",required:!0},{type:"email",label:"Correo Electrónico",name:"correo",required:!0},{type:"number",label:"Ingreso Mensual",name:"ingreso_mensual",required:!0},{type:"select",label:"Tipo de Empleo",name:"tipo_empleo",required:!0,options:["Formal","Informal","Negocio propio","Jubilado"]},{type:"number",label:"Antigüedad Laboral",name:"antiguedad_laboral",required:!0},{type:"number",label:"Monto Solicitado",name:"monto_solicitado",required:!0},{type:"select",label:"Plazo en Meses",name:"plazo_meses",required:!0,options:["12","24","36","48","60"]},{type:"checkbox",label:"Acepto términos y condiciones",name:"acepto_terminos",required:!0}],submit_button_text:"Enviar solicitud",success_message:"Su solicitud ha sido enviada correctamente. Nos pondremos en contacto con usted pronto.",status:"active"};fetch("/api/forms/create-precalificador",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:JSON.stringify(t)}).then(e=>{if(!e.ok)throw new Error("Error al crear formulario: "+e.statusText);return e.json()}).then(e=>{Swal.close(),e.success?(r.set("attributes",{...r.getAttributes(),"data-form-id":e.formId}),showAlert(`Formulario creado correctamente con ID: ${e.formId}`,"success",5e3)):showAlert(e.message||"Error desconocido al crear el formulario","error",5e3)}).catch(e=>{console.error("Error:",e),Swal.close(),showAlert("Error: "+e.message,"error",5e3)})}function bt(l){const r=l.BlockManager,a=`
    <svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#ffffff"/>
        
        <rect x="1" y="1" width="14" height="2" rx="1" fill="none" stroke="#23366A" stroke-width="0.4"/>
        <path d="M 13 2 L 14 2.5 L 13 3" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="17" y="1" width="14" height="2" rx="1" fill="none" stroke="#23366A" stroke-width="0.4"/>
        <path d="M 29 2 L 30 2.5 L 29 3" fill="none" stroke="#23366A" stroke-width="0.3"/>
        
        <rect x="1" y="5" width="14" height="12" rx="0.8" fill="#f3f4f6"/>
        <rect x="1" y="5" width="14" height="6" rx="0.8" fill="#3b82f6"/>
        <rect x="2" y="6" width="5" height="1" rx="0.5" fill="#23366A"/>
        <rect x="9" y="6" width="4" height="1" rx="0.5" fill="#ef4444"/>
        <rect x="2" y="12" width="11" height="0.8" rx="0.3" fill="#23366A"/>
        <rect x="2" y="13.2" width="8" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="2" y="14.5" width="11" height="1.2" rx="0.6" fill="none" stroke="#23366A" stroke-width="0.4"/>
        
        <rect x="17" y="5" width="14" height="12" rx="0.8" fill="#f3f4f6"/>
        <rect x="17" y="5" width="14" height="6" rx="0.8" fill="#2563eb"/>
        <rect x="18" y="6" width="5" height="1" rx="0.5" fill="#23366A"/>
        <rect x="25" y="6" width="4" height="1" rx="0.5" fill="#3b82f6"/>
        <rect x="18" y="12" width="11" height="0.8" rx="0.3" fill="#23366A"/>
        <rect x="18" y="13.2" width="8" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="18" y="14.5" width="11" height="1.2" rx="0.6" fill="none" stroke="#23366A" stroke-width="0.4"/>
        
        <rect x="1" y="19" width="14" height="12" rx="0.8" fill="#f3f4f6"/>
        <rect x="1" y="19" width="14" height="6" rx="0.8" fill="#1e40af"/>
        <rect x="2" y="20" width="5" height="1" rx="0.5" fill="#23366A"/>
        <rect x="9" y="20" width="4" height="1" rx="0.5" fill="#10b981"/>
        <rect x="2" y="26" width="11" height="0.8" rx="0.3" fill="#23366A"/>
        <rect x="2" y="27.2" width="8" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="2" y="28.5" width="11" height="1.2" rx="0.6" fill="none" stroke="#23366A" stroke-width="0.4"/>
        
        <rect x="17" y="19" width="14" height="12" rx="0.8" fill="#f3f4f6"/>
        <rect x="17" y="19" width="14" height="6" rx="0.8" fill="#23366A"/>
        <rect x="18" y="20" width="5" height="1" rx="0.5" fill="#23366A"/>
        <rect x="25" y="20" width="4" height="1" rx="0.5" fill="#ef4444"/>
        <rect x="18" y="26" width="11" height="0.8" rx="0.3" fill="#23366A"/>
        <rect x="18" y="27.2" width="8" height="0.6" rx="0.2" fill="#9ca3af"/>
        <rect x="18" y="28.5" width="11" height="1.2" rx="0.6" fill="none" stroke="#23366A" stroke-width="0.4"/>
        </svg>`;l.DomComponents.addType("promotion-viewer",{isComponent:t=>t.getAttribute&&t.getAttribute("data-promotion-component")==="true"?{type:"promotion-viewer"}:!1,model:{defaults:{name:"Visor de Promociones",tagName:"section",droppable:!1,editable:!1,selectable:!0,hoverable:!0,attributes:{class:"py-8 md:py-12 bg-white","data-promotion-component":"true"},script:function(){(function(){if(!window.Swal){var t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/sweetalert2@11",document.head.appendChild(t)}var e=function(){var i=document.querySelector('[data-promotion-component="true"]');if(!i){setTimeout(e,500);return}var o=i.querySelectorAll(".promotion-view-more");o.forEach(function(n){n.addEventListener("click",function(m){m.preventDefault();var d=n.getAttribute("data-promotion-title")||"Promoción",u=n.getAttribute("data-promotion-image")||"",f=n.getAttribute("data-promotion-description")||"",b=n.getAttribute("data-promotion-category")||"",v=n.getAttribute("data-promotion-days")||"",w=n.getAttribute("data-promotion-active-days")||"",h=function(){if(window.Swal){var g="";v&&v!==""?g='<p class="text-red-600 font-semibold mb-4"><i class="ri-time-line mr-1"></i> Quedan '+v+" días para aprovechar esta promoción</p>":w&&w!==""&&(g='<p class="text-blue-600 font-semibold mb-4"><i class="ri-calendar-line mr-1"></i> Disponible: '+w+"</p>"),window.Swal.fire({html:'<div class="text-left"><div class="mb-4 mt-4"><img src="'+u+'" alt="'+d+'" class="w-full h-64 object-cover rounded-lg"></div><span class="inline-block bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full mb-3">'+b+'</span><h2 class="text-2xl font-bold text-primary mb-4">'+d+"</h2>"+g+'<div class="text-gray-700 whitespace-pre-line">'+f+"</div></div>",width:"800px",showCloseButton:!0,showConfirmButton:!1,customClass:{popup:"promotion-modal",closeButton:"promotion-modal-close-button"}})}};if(window.Swal)h();else{var p=document.createElement("script");p.src="https://cdn.jsdelivr.net/npm/sweetalert2@11",p.onload=h,document.head.appendChild(p)}})});var s=i.querySelector("#promotion-category-filter"),c=i.querySelector("#promotion-day-filter");if(s&&c){let n=function(){var m=s.value,d=c.value,u=i.querySelectorAll(".promotion-card"),f=i.querySelector(".no-results-message"),b=0;u.forEach(function(v){var w=v.getAttribute("data-category"),h=v.getAttribute("data-days")||"",p=h.includes("días restantes"),g=m===""||w===m,y=!1;if(d==="")y=!0;else if(p)y=!0;else if(h.toLowerCase()==="todos los días")y=!0;else{var C={Lunes:"Lun",Martes:"Mar",Miércoles:"Mié",Jueves:"Jue",Viernes:"Vie",Sábado:"Sáb",Domingo:"Dom"},T=C[d];if(T){var x=new RegExp(T+"(?:,|$)","i");y=x.test(h)}}g&&y?(v.style.display="flex",b++):v.style.display="none"}),f&&(f.style.display=b===0?"block":"none")};s.addEventListener("change",n),c.addEventListener("change",n)}};setTimeout(e,500)})()}},init(){const t=this,e=()=>{const c=t.get("content")||"";return c.includes("promotion-card")||c.includes("Promociones vigentes")};if(e()){console.log("Promotions already loaded, skipping fetch");return}this.on("component:mount",this.loadPromotions);let i=0;const o=3,s=()=>{if(e()){console.log("Content detected, stopping load attempts");return}i++,console.log(`Attempt ${i} to load promotions`),t.loadPromotions(),setTimeout(()=>{var n;const c=(n=t.view)==null?void 0:n.el;c&&c.querySelector(".promotion-card")===null&&i<o&&!e()&&(console.log("Promotions not loaded, retrying..."),s())},1e3)};setTimeout(()=>s(),100)},loadPromotions(){fetch("/api/promotions/active").then(t=>{if(!t.ok)throw new Error(`Error ${t.status}: ${t.statusText}`);return t.json()}).then(t=>{this.updatePromotionsHTML(t)}).catch(t=>{this.set("content",'<div class="text-center p-8"><p class="text-gray-500">Error al cargar las promociones</p></div>')})},updatePromotionsHTML(t){if(!t||t.length===0){this.set("content",'<div class="text-center p-8"><p class="text-gray-500">No hay promociones disponibles en este momento</p></div>');return}const e=[...new Set(t.map(d=>d.category))],i={monday:{full:"Lunes",short:"Lun"},tuesday:{full:"Martes",short:"Mar"},wednesday:{full:"Miércoles",short:"Mié"},thursday:{full:"Jueves",short:"Jue"},friday:{full:"Viernes",short:"Vie"},saturday:{full:"Sábado",short:"Sáb"},sunday:{full:"Domingo",short:"Dom"}},o=Object.entries(i).map(([d,u])=>({key:d,full:u.full,short:u.short}));let s="";t.forEach(d=>{let u="",f="";if(d.remaining_days!==null&&d.remaining_days!==void 0)u=`${d.remaining_days} días restantes`,f=`<span class="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center"><i class="ri-time-line mr-1"></i>${d.remaining_days}d</span>`;else if(d.active_days&&d.active_days.length>0){const b=d.active_days.map(v=>i[v]?i[v].short:v).join(", ");u=b,f=`<span class="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center"><i class="ri-calendar-line mr-1"></i>${b}</span>`}else u="Todos los días",f='<span class="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center"><i class="ri-calendar-line mr-1"></i>Todos</span>';s+=`
                    <div class="promotion-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
                        data-category="${d.category}"
                        data-days="${u}">
                        <div class="relative h-48">
                            <img src="${d.image_url}" alt="${d.title}" class="w-full h-full object-cover">
                            <span class="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">${d.category}</span>
                            ${f}
                        </div>
                        <div class="p-5 flex-grow flex flex-col h-full">
                            <h3 class="text-lg font-bold text-primary mb-2">${d.title}</h3>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${d.short_description}</p>
                            <div class="mt-auto">
                                <button 
                                    class="promotion-view-more bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm w-full flex items-center justify-center"
                                    data-promotion-id="${d.id}"
                                    data-promotion-title="${d.title.replace(/"/g,"&quot;")}"
                                    data-promotion-image="${d.image_url}"
                                    data-promotion-description="${d.long_description.replace(/"/g,"&quot;")}"
                                    data-promotion-category="${d.category}"
                                    data-promotion-days="${d.remaining_days||""}"
                                    data-promotion-active-days="${u}"
                                >
                                    Ver más
                                    <i class="ri-arrow-right-line ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    `});let c=`
                <div class="relative inline-block w-full">
                    <select id="promotion-category-filter" class="appearance-none w-full bg-white border-2 border-primary text-primary rounded-full px-4 py-2 pr-8 focus:outline-none cursor-pointer">
                        <option value="">Todas las categorías</option>
                        ${e.map(d=>`<option value="${d}">${d}</option>`).join("")}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                        <i class="ri-arrow-down-s-line"></i>
                    </div>
                </div>
                `,n=`
                <div class="relative inline-block w-full">
                    <select id="promotion-day-filter" class="appearance-none w-full bg-white border-2 border-primary text-primary rounded-full px-4 py-2 pr-8 focus:outline-none cursor-pointer">
                        <option value="">Todos los días</option>
                        ${o.map(d=>`<option value="${d.full}">${d.full}</option>`).join("")}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                        <i class="ri-arrow-down-s-line"></i>
                    </div>
                </div>
                `;const m=`
                    <div class="max-w-7xl mx-auto px-4">
                        <h2 class="text-3xl font-bold text-primary mb-8">Promociones vigentes</h2>

                        <!-- Filters -->
                        <div class="mb-8 flex flex-wrap gap-4">
                            <div class="flex-1 min-w-[200px]">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por categoría</label>
                                <div class="relative">
                                    ${c}
                                </div>
                            </div>
                            <div class="flex-1 min-w-[200px]">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por día disponible</label>
                                <div class="relative">
                                    ${n}
                                </div>
                            </div>
                        </div>

                        <!-- Grid -->
                        <div class="mb-8">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                ${s}
                            </div>
                            <div class="no-results-message hidden mt-8 text-center py-8">
                                <p class="text-gray-500">No hay promociones que coincidan con los filtros seleccionados</p>
                            </div>
                        </div>
                    </div>
                `;this.set("content",m),setTimeout(()=>{this.view&&this.view.render&&this.view.render()},100)}},view:{events:{dblclick:"reloadPromotions"},reloadPromotions(){this.model.loadPromotions()}}}),l.on("load",()=>{const t=l.Canvas.getFrameEl();if(t&&t.contentDocument){let e=t.contentDocument.getElementById("promotion-styles");e||(e=t.contentDocument.createElement("style"),e.id="promotion-styles",e.innerHTML=`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .promotion-modal-close-button {
                    position: absolute !important;
                    top: 10px !important;
                    right: 10px !important;
                    z-index: 10 !important;
                    font-size: 1.5rem !important;
                    background-color: white !important;
                    color: #23366A !important;
                    border-radius: 50% !important;
                    border: 1px solid #23366A !important;
                    width: 32px !important;
                    height: 32px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                    padding: 0 !important;
                    line-height: 1 !important;
                }
                .promotion-modal-close-button:hover {
                    background-color: #23366A !important;
                    color: white !important;
                }
                .promotion-modal {
                    padding-top: 30px !important;
                    border-radius: 16px !important;
                    overflow: hidden !important;
                }
                .swal2-popup.promotion-modal {
                    border-radius: 16px !important;
                }
                .swal2-close.promotion-modal-close-button i,
                .swal2-close.promotion-modal-close-button svg {
                    position: absolute !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    margin: 0 !important;
                }
            `,t.contentDocument.head.appendChild(e))}}),l.on("canvas:render",()=>{const t=l.Canvas.getFrameEl();if(t&&t.contentDocument){let e=t.contentDocument.getElementById("promotion-styles");e||(e=t.contentDocument.createElement("style"),e.id="promotion-styles",e.innerHTML=`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .promotion-modal-close-button {
                    position: absolute !important;
                    top: 10px !important;
                    right: 10px !important;
                    z-index: 10 !important;
                    font-size: 1.5rem !important;
                    background-color: white !important;
                    color: #23366A !important;
                    border-radius: 50% !important;
                    border: 1px solid #23366A !important;
                    width: 32px !important;
                    height: 32px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                    padding: 0 !important;
                    line-height: 1 !important;
                }
                .promotion-modal-close-button:hover {
                    background-color: #23366A !important;
                    color: white !important;
                }
                .promotion-modal {
                    padding-top: 30px !important;
                    border-radius: 16px !important;
                    overflow: hidden !important;
                }
                .swal2-popup.promotion-modal {
                    border-radius: 16px !important;
                }
                .swal2-close.promotion-modal-close-button i,
                .swal2-close.promotion-modal-close-button svg {
                    position: absolute !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    margin: 0 !important;
                }
            `,t.contentDocument.head.appendChild(e))}}),r.add("promotion-viewer",{label:"Visor de Promociones",category:"Promociones",attributes:{class:"gjs-block-section"},media:a,content:{type:"promotion-viewer"}})}function yt(l){Z(l),et(l),W(l),at(l),lt(l),st(l),rt(l),K(l),Y(l),tt(l),it(l),ct(l),dt(l),ut(l),pt(l),ht(l),ft(l),gt(l),bt(l),O(l),V(l),ot(l),nt(l)}function q(l,r=""){const a=document.getElementById(l);return a?a.value:r}document.addEventListener("DOMContentLoaded",function(){const l=vt();Ot(l),Ht(l),Rt(l),Qt(l)});function vt(){const l=q("asset-upload-url","/upload-assets"),r=wt(l);return Lt(r),Bt(r),jt(r),Dt(r),Ft(r),It(r),r}function wt(l){return R.init({container:"#gjs",fromElement:!0,storageManager:At(),deviceManager:{devices:[{name:"Desktop",width:""},{name:"Tablet",width:"768px",widthMedia:"992px"},{name:"Mobile",width:"320px",widthMedia:"575px"}]},i18n:kt(),assetManager:St(l),canvas:{styles:["https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css","https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"],scripts:[]},styleManager:Ct(),plugins:[U,r=>yt(r),r=>_t(r),r=>J(r),r=>Q(r)],pluginsOpts:Tt()})}function At(){const l=q("page-id");return l?{type:"local",id:"gjs-",autosave:!0,autoload:!0,stepsBeforeSave:1,options:{local:{key:`gjs-page-${l}`}}}:!1}function kt(){return{locale:"es",messages:{es:{styleManager:{properties:"Propiedades",empty:"Selecciona un elemento para usar el Administrador de Estilos",sectors:{position:"Posición",display:"Visualización",flex:"Flex",dimension:"Dimensiones",typography:"Tipografía",decorations:"Decoraciones",extra:"Extra","flex-properties":"Propiedades Flex",background:"Fondo"}},traitManager:{traits:"Atributos",empty:"Selecciona un elemento para editarlo"},blockManager:{labels:{Secciones:"Secciones",Elementos:"Elementos",Botones:"Botones","link-block":"Bloque Enlace",quote:"Cita","text-section":"Sección de Texto",column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen",Basic:"Básico"},categories:{Basic:"Básico",Secciones:"Secciones",Elementos:"Elementos",Botones:"Botones",Typography:"Tipografía",Media:"Medios",Social:"Social",Layout:"Diseño"}},navigator:{navigate:"Navegar",component:"Componente",components:"Componentes",empty:"Sin componentes"},commands:{undo:"Deshacer",redo:"Rehacer",clear:"Limpiar",codeViewer:"Ver código",openAssets:"Abrir medios",openBlocks:"Abrir bloques",openStyle:"Abrir estilos",openTraits:"Abrir atributos"},assetManager:{addButton:"Añadir imagen",inputPlh:"http://ruta-a-tu-imagen.jpg",modalTitle:"Selecciona la imagen",uploadTitle:"Arrastra tus archivos aquí o haz clic para subir"},deviceManager:{device:"Dispositivo",devices:{desktop:"Escritorio",tablet:"Tablet",mobileLandscape:"Móvil Horizontal",mobilePortrait:"Móvil Vertical"}},panels:{buttons:{titles:{preview:"Vista previa",fullscreen:"Pantalla completa","sw-visibility":"Ver componentes","export-template":"Ver código","open-sm":"Abrir estilo","open-tm":"Configuraciones","open-layers":"Abrir capas","open-blocks":"Abrir bloques"}}},preset_webpage:{blocks:{"link-block":"Bloque Enlace",quote:"Cita","text-section":"Sección de Texto"},categoryLabel:{Basic:"Básico",Typography:"Tipografía",Media:"Medios"}}}}}}function St(l){return{upload:l,uploadName:"files",multiUpload:!0,assets:[],uploadFile:r=>{const a=r.dataTransfer?r.dataTransfer.files:r.target.files,t=new FormData;for(const e of a)t.append("files[]",e);fetch(l,{method:"POST",headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:t}).then(e=>e.json()).then(e=>{e.data&&(editor.AssetManager.add(e.data),E("Archivos subidos correctamente","success"))}).catch(e=>{console.error("Error:",e),E("Error al subir los archivos","error")})}}}function Ct(){return{sectors:[{name:"Dimensiones",open:!1,buildProps:["width","height","min-width","min-height","max-width","max-height","padding","margin"]},{name:"Tipografía",open:!1,buildProps:["font-family","font-size","font-weight","letter-spacing","color","line-height","text-align","text-shadow"]},{name:"Decoración",open:!1,buildProps:["background-color","border","border-radius","box-shadow"]},{name:"Extra",open:!1,buildProps:["opacity","transition","transform"]}]}}function Tt(){return{gjsPresetWebpage:{modalImportTitle:"Importar código",modalImportLabel:"Pega tu código HTML/CSS aquí:",modalImportContent:"",importViewerOptions:{},textCleanCanvas:"¿Estás seguro de limpiar el canvas?",showStylesOnChange:!0,textGeneral:"General",textLayout:"Diseño",textTypography:"Tipografía",textDecorations:"Decoraciones",textExtra:"Extra",buttonImport:"Importar",buttonCancel:"Cancelar",blocks:{link:{category:"Básico",label:"Enlace"},quote:{category:"Básico",label:"Cita"},"text-basic":{category:"Básico",label:"Texto"},"link-block":{category:"Básico",label:"Bloque Enlace"},"text-section":{category:"Básico",label:"Sección de Texto"}},categoryLabel:{Basic:"Básico",Typography:"Tipografía",Media:"Medios",Social:"Social",Layout:"Diseño",Sections:"Secciones",Elements:"Elementos"}},gjsBlocksBasic:{blocks:[],category:"Básicos",labels:{column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen",video:"Video",section:"Sección",paragraph:"Párrafo",default:"Predeterminado"},flexGrid:!0,stylePrefix:"gjs-"}}}function Lt(l){l.on("component:loaded",function(r){Et(r)}),l.on("component:selected",function(r){if(r){const a=r.getClasses();if(a.length){const t=a.join(" "),e=r.getName();r.set("custom-name",`${e} [${t}]`)}}})}function Et(l){const r=l.getAttributes();if(r&&r["data-gjs-type"]==="pdf-viewer"&&(l.set("type","pdf-viewer"),r["data-pdf-src"])){const a=l.view.el;if(a){const t=r["data-pdf-src"],e=r["data-pdf-name"]||"Documento PDF",i=a.querySelector(".pdf-placeholder"),o=a.querySelector(".pdf-title"),s=a.querySelector(".pdf-download-link");if(i){const c=document.createElement("object");c.setAttribute("data",t),c.setAttribute("type","application/pdf"),c.setAttribute("width","100%"),c.setAttribute("height","500"),c.classList.add("pdf-object"),c.style.minHeight="500px",c.innerHTML=`
                        <div class="p-6 bg-gray-100 text-center">
                            <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                            <a href="${t}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                        </div>
                    `,i.classList.add("hidden"),i.parentNode.insertBefore(c,i.nextSibling),o&&(o.textContent=e),s&&(s.href=t,s.classList.remove("hidden"))}}}}function It(l){l.on("canvas:load",function(){setTimeout(function(){const r=l.Canvas.getFrameEl();if(r&&r.contentDocument&&r.contentDocument.querySelectorAll(".account-selector-container").length>0){const t=r.contentDocument.createElement("script");t.textContent=`
                        (function() {
                            const containers = document.querySelectorAll('.account-selector-container');
                            
                            containers.forEach(container => {
                                if (container.hasAttribute('data-initialized')) return;
                                
                                const buttons = container.querySelectorAll('.account-type-btn');
                                const panels = container.querySelectorAll('.account-panel');
                                const header = container.querySelector('.account-header');
                                const headerTitle = header ? header.querySelector('.account-title') : null;
                                const headerDesc = header ? header.querySelector('.account-description') : null;
                                const closeBtn = header ? header.querySelector('.close-btn') : null;
                                const buttonsContainer = container.querySelector('.buttons-container');
                                const defaultActive = parseInt(container.getAttribute('data-active') || '-1');
                                
                                function activatePanel(index) {
                                    panels.forEach(panel => panel.classList.add('hidden'));
                                    
                                    buttons.forEach(btn => {
                                        btn.classList.remove('bg-primary', 'text-white');
                                        btn.classList.add('bg-white', 'text-primary');
                                    });
                                    
                                    if (index >= 0 && index < panels.length) {
                                        panels[index].classList.remove('hidden');
                                        buttons[index].classList.remove('bg-white', 'text-primary');
                                        buttons[index].classList.add('bg-primary', 'text-white');
                                        
                                        if (header) header.classList.add('active');
                                        if (headerTitle) {
                                            headerTitle.classList.remove('text-center');
                                            headerTitle.classList.add('text-left');
                                        }
                                        if (headerDesc) headerDesc.classList.add('hidden');
                                        if (closeBtn) {
                                            closeBtn.classList.remove('opacity-0', 'invisible');
                                            closeBtn.classList.add('opacity-100', 'visible');
                                        }
                                        if (buttonsContainer) {
                                            buttonsContainer.classList.remove('justify-center');
                                            buttonsContainer.classList.add('justify-start');
                                        }
                                    } else {
                                        if (header) header.classList.remove('active');
                                        if (headerTitle) {
                                            headerTitle.classList.remove('text-left');
                                            headerTitle.classList.add('text-center');
                                        }
                                        if (headerDesc) headerDesc.classList.remove('hidden');
                                        if (closeBtn) {
                                            closeBtn.classList.add('opacity-0', 'invisible');
                                            closeBtn.classList.remove('opacity-100', 'visible');
                                        }
                                        if (buttonsContainer) {
                                            buttonsContainer.classList.add('justify-center');
                                            buttonsContainer.classList.remove('justify-start');
                                        }
                                    }
                                }
                                
                                // Add click events
                                buttons.forEach((btn, index) => {
                                    btn.addEventListener('click', function() {
                                        activatePanel(index);
                                    });
                                });
                                
                                if (closeBtn) {
                                    closeBtn.addEventListener('click', function() {
                                        activatePanel(-1);
                                    });
                                }
                                
                                // Set initial state
                                if (defaultActive >= 0 && defaultActive < buttons.length) {
                                    activatePanel(defaultActive);
                                }
                                
                                container.setAttribute('data-initialized', 'true');
                            });
                        })();
                    `,r.contentDocument.body.appendChild(t)}},1e3)}),l.on("component:add",function(r){r.get("type")==="account-selector"&&setTimeout(function(){const a=l.Canvas.getFrameEl();if(a&&a.contentDocument&&a.contentDocument.querySelectorAll(".account-selector-container:not([data-initialized])").length>0){const e=a.contentDocument.createElement("script");e.textContent=`
                            (function() {
                                const containers = document.querySelectorAll('.account-selector-container:not([data-initialized])');
                                
                                containers.forEach(container => {
                                    const buttons = container.querySelectorAll('.account-type-btn');
                                    const panels = container.querySelectorAll('.account-panel');
                                    const header = container.querySelector('.account-header');
                                    const headerTitle = header ? header.querySelector('.account-title') : null;
                                    const headerDesc = header ? header.querySelector('.account-description') : null;
                                    const closeBtn = header ? header.querySelector('.close-btn') : null;
                                    const buttonsContainer = container.querySelector('.buttons-container');
                                    const defaultActive = parseInt(container.getAttribute('data-active') || '-1');
                                    
                                    function activatePanel(index) {
                                        panels.forEach(panel => panel.classList.add('hidden'));
                                        
                                        buttons.forEach(btn => {
                                            btn.classList.remove('bg-primary', 'text-white');
                                            btn.classList.add('bg-white', 'text-primary');
                                        });
                                        
                                        if (index >= 0 && index < panels.length) {
                                            panels[index].classList.remove('hidden');
                                            buttons[index].classList.remove('bg-white', 'text-primary');
                                            buttons[index].classList.add('bg-primary', 'text-white');
                                            
                                            if (header) header.classList.add('active');
                                            if (headerTitle) {
                                                headerTitle.classList.remove('text-center');
                                                headerTitle.classList.add('text-left');
                                            }
                                            if (headerDesc) headerDesc.classList.add('hidden');
                                            if (closeBtn) {
                                                closeBtn.classList.remove('opacity-0', 'invisible');
                                                closeBtn.classList.add('opacity-100', 'visible');
                                            }
                                            if (buttonsContainer) {
                                                buttonsContainer.classList.remove('justify-center');
                                                buttonsContainer.classList.add('justify-start');
                                            }
                                        } else {
                                            if (header) header.classList.remove('active');
                                            if (headerTitle) {
                                                headerTitle.classList.remove('text-left');
                                                headerTitle.classList.add('text-center');
                                            }
                                            if (headerDesc) headerDesc.classList.remove('hidden');
                                            if (closeBtn) {
                                                closeBtn.classList.add('opacity-0', 'invisible');
                                                closeBtn.classList.remove('opacity-100', 'visible');
                                            }
                                            if (buttonsContainer) {
                                                buttonsContainer.classList.add('justify-center');
                                                buttonsContainer.classList.remove('justify-start');
                                            }
                                        }
                                    }
                                    
                                    // Add click events
                                    buttons.forEach((btn, index) => {
                                        btn.addEventListener('click', function() {
                                            activatePanel(index);
                                        });
                                    });
                                    
                                    if (closeBtn) {
                                        closeBtn.addEventListener('click', function() {
                                            activatePanel(-1);
                                        });
                                    }
                                    
                                    // Set initial state
                                    if (defaultActive >= 0 && defaultActive < buttons.length) {
                                        activatePanel(defaultActive);
                                    }
                                    
                                    container.setAttribute('data-initialized', 'true');
                                });
                            })();
                        `,a.contentDocument.body.appendChild(e)}},500)})}function Bt(l){l.Panels.addPanel({id:"panel-preview",visible:!0,buttons:[{id:"preview",className:"ri-eye-line",command:{run:function(r){r.runCommand("core:preview"),E("Modo vista previa activado","info")},stop:function(r){r.stopCommand("core:preview"),E("Modo edición activado","info")}},attributes:{title:"Vista Previa"}}]}),l.Panels.addPanel({id:"panel-tailwind",visible:!0,buttons:[{id:"open-tailwind-classes",className:"ri-code-box-line",command:"open-tailwind",attributes:{title:"Clases Tailwind"}}]})}function jt(l){l.Commands.add("canvas-clear",{run:function(r){D.fire({title:"¿Estás seguro?",text:"¿Realmente deseas limpiar el canvas? Esta acción no se puede deshacer.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, limpiar",cancelButtonText:"Cancelar"}).then(a=>{a.isConfirmed&&(r.DomComponents.clear(),r.CssComposer.clear(),E("El canvas ha sido limpiado correctamente","success"))})}}),l.Commands.add("open-tailwind",{run:function(r){const a=r.getSelected();if(!a)return;const t=a.getClasses().join(" ");D.fire({title:"Clases Tailwind",input:"textarea",inputValue:t,inputPlaceholder:"Ingresa las clases separadas por espacios",showCancelButton:!0,confirmButtonText:"Aplicar",confirmButtonColor:"#23366A",cancelButtonText:"Cancelar",cancelButtonColor:"#e74c3c",preConfirm:e=>e.split(" ").filter(i=>i)}).then(e=>{e.isConfirmed&&(a.removeClass(a.getClasses()),a.addClass(e.value),E("Clases aplicadas correctamente","success"))})}})}function Dt(l){l.on("load",()=>{qt(),$t(l),Pt(l),Nt(l),zt(l)}),l.on("canvas:render",()=>{Mt(l)})}function qt(){const l=document.createElement("style");l.innerHTML=`
        :root {
            --color-primary: #ffffff;
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
        .gjs-block svg {
            display: block;
            margin: 0 auto;
            max-width: 100%;
        }
        .gjs-block-label {
            text-align: center;
            width: 100%;
        }
    `,document.head.appendChild(l)}function $t(l){const r=l.Canvas.getFrameEl();if(r&&r.contentDocument){const a=r.contentDocument.createElement("style");a.innerHTML=`
            body {
                margin-bottom: 1rem !important;
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
        `,r.contentDocument.head.appendChild(a)}}function Mt(l){const r=l.Canvas.getFrameEl();if(r&&r.contentDocument&&!r.contentDocument.getElementById("theme-custom-styles")){const a=r.contentDocument.createElement("style");a.id="theme-custom-styles",a.innerHTML=`
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
            `,r.contentDocument.head.appendChild(a)}}function Pt(l){["map","default","text-basic","quote","link-block","text-section"].forEach(a=>{l.BlockManager.get(a)&&l.BlockManager.remove(a)})}function Nt(l){l.BlockManager.getCategories().each(r=>{const a=r.get("id");a!=="Basic"&&a!=="Básico"?r.set("open",!1):r.set("open",!0)})}function zt(l){l.runCommand("sw-visibility");const r=l.Panels.getButton("options","sw-visibility");r&&r.set("active",!0)}function Ft(l){const r=l.BlockManager;Object.entries({"link-block":"Bloque Enlace",quote:"Cita","text-section":"Sección de Texto",column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen"}).forEach(([e,i])=>{const o=r.get(e);o&&o.set("label",i)});const t={Basic:"Básico",Typography:"Tipografía",Media:"Medios",Social:"Social",Layout:"Diseño",Sections:"Secciones",Elements:"Elementos"};r.getCategories().each(e=>{const i=e.get("id");t[i]&&e.set("label",t[i])})}function _t(l){l.BlockManager.add("icon-block",{label:"Icono",category:"Elementos",content:'<i class="ri-home-line" style="font-size: 24px; color: #23366A;"></i>',media:'<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#23366A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'}),G(l),X(l)}function Ht(l){l.Panels.addPanel({id:"panel-devices",visible:!0,buttons:[{id:"device-desktop",command:"set-device-desktop",className:"ri-computer-line",active:!0,attributes:{title:"Vista Escritorio"}},{id:"device-tablet",command:"set-device-tablet",className:"ri-tablet-line",attributes:{title:"Vista Tablet"}},{id:"device-mobile",command:"set-device-mobile",className:"ri-smartphone-line",attributes:{title:"Vista Móvil"}}]}),l.Commands.add("set-device-desktop",{run:r=>r.setDevice("Desktop")}),l.Commands.add("set-device-tablet",{run:r=>r.setDevice("Tablet")}),l.Commands.add("set-device-mobile",{run:r=>r.setDevice("Mobile")})}function Ot(l){const r=document.getElementById("save-button");if(!r)return;const a=Vt();r.parentNode.insertBefore(a,r);let t=!0;const e=()=>{t||(a.style.display="inline")},i=()=>{a.style.display="none"};setTimeout(()=>{t=!1},1e3),l.on("component:update",e),l.on("component:add",e),l.on("component:remove",e),l.on("style:update",e),r.addEventListener("click",function(){F(l)}),document.addEventListener("keydown",function(o){(o.ctrlKey||o.metaKey)&&o.key==="s"&&(o.preventDefault(),F(l))}),document.addEventListener("editor:saved",i)}function Vt(){const l=document.createElement("span");l.id="unsaved-changes-badge",l.textContent="●",l.style.cssText=`
        display: none;
        color: #e74c3c;
        font-size: 20px;
        margin-right: 6px;
        animation: pulse 1.5s ease-in-out infinite;
    `;const r=document.createElement("style");return r.textContent=`
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `,document.head.appendChild(r),l}function Rt(l){const r=q("page-id"),a=q("page-load-url");r&&a?fetch(a).then(t=>t.json()).then(t=>{l.setComponents(t.html||""),l.setStyle(t.css||""),E("Datos de la página cargados correctamente","success"),window.history.pushState({pageId:r},document.title,window.location.href)}).catch(t=>{console.error("Error loading page data:",t),E("Error al cargar los datos de la página","error")}):window.history.pushState({isNew:!0},document.title,window.location.href)}function F(l){const r=q("page-id"),a=q("page-store-url","/pages/store");Ut(l);const t=l.getHtml();let e=l.getCss()||"",i=l.getJs()||"";if(t.includes("account-selector-container")&&!i.includes("initializeAccountSelectors")&&(i+=`

`+`
        // Account Selector Initialization Script
        function initializeAccountSelectors() {
            const containers = document.querySelectorAll('.account-selector-container');
            
            containers.forEach(container => {
                // Skip if already initialized
                if (container.hasAttribute('data-initialized')) return;
                
                const buttons = container.querySelectorAll('.account-type-btn');
                const panels = container.querySelectorAll('.account-panel');
                const header = container.querySelector('.account-header');
                const headerTitle = header ? header.querySelector('.account-title') : null;
                const headerDesc = header ? header.querySelector('.account-description') : null;
                const closeBtn = header ? header.querySelector('.close-btn') : null;
                const buttonsContainer = container.querySelector('.buttons-container');
                const defaultActive = parseInt(container.getAttribute('data-active') || '-1');
                
                // Add event listeners to all buttons
                buttons.forEach((btn, index) => {
                    btn.addEventListener('click', function() {
                        activatePanel(index);
                    });
                });
                
                // Add event listener to close button
                if (closeBtn) {
                    closeBtn.addEventListener('click', function() {
                        activatePanel(-1);
                    });
                }
                
                function activatePanel(index) {
                    // Hide all panels and deactivate all buttons
                    panels.forEach(panel => {
                        panel.classList.add('hidden');
                    });
                    
                    buttons.forEach(btn => {
                        btn.classList.remove('bg-primary', 'text-white');
                        btn.classList.add('bg-white', 'text-primary');
                    });
                    
                    // If valid index, show selected panel and activate button
                    if (index >= 0 && index < panels.length) {
                        panels[index].classList.remove('hidden');
                        buttons[index].classList.remove('bg-white', 'text-primary');
                        buttons[index].classList.add('bg-primary', 'text-white');
                        
                        if (header) header.classList.add('active');
                        if (headerTitle) {
                            headerTitle.classList.remove('text-center');
                            headerTitle.classList.add('text-left');
                        }
                        if (headerDesc) headerDesc.classList.add('hidden');
                        if (closeBtn) {
                            closeBtn.classList.remove('opacity-0', 'invisible');
                            closeBtn.classList.add('opacity-100', 'visible');
                        }
                        if (buttonsContainer) {
                            buttonsContainer.classList.remove('justify-center');
                            buttonsContainer.classList.add('justify-start');
                        }
                    } else {
                        if (header) header.classList.remove('active');
                        if (headerTitle) {
                            headerTitle.classList.remove('text-left');
                            headerTitle.classList.add('text-center');
                        }
                        if (headerDesc) headerDesc.classList.remove('hidden');
                        if (closeBtn) {
                            closeBtn.classList.add('opacity-0', 'invisible');
                            closeBtn.classList.remove('opacity-100', 'visible');
                        }
                        if (buttonsContainer) {
                            buttonsContainer.classList.add('justify-center');
                            buttonsContainer.classList.remove('justify-start');
                        }
                    }
                }
                
                // Set initial state
                if (defaultActive >= 0 && defaultActive < buttons.length) {
                    activatePanel(defaultActive);
                }
                
                // Mark as initialized
                container.setAttribute('data-initialized', 'true');
            });
        }

        // Call on DOMContentLoaded
        document.addEventListener('DOMContentLoaded', initializeAccountSelectors);

        // Also run immediately if DOM is already ready
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(initializeAccountSelectors, 100);
        }
        `),t.includes("quick-access-carousel")&&(!i.includes("scrollBy")||!i.includes("quick-access-carousel"))&&(i+=`

`+`
            // Quick Access Carousel scrolling functionality
            (function() {
            if (!Element.prototype.scrollBy) {
                Element.prototype.scrollBy = function(options) {
                if (typeof options === 'object') {
                    var left = options.left || 0;
                    var top = options.top || 0;
                    this.scrollLeft += left;
                    this.scrollTop += top;
                }
                };
            }
            
            document.addEventListener('DOMContentLoaded', function() {
                var carousel = document.getElementById('quick-access-carousel');
                if (carousel) {
                var leftButtons = document.querySelectorAll('.ri-arrow-left-s-line, button:first-of-type');
                var rightButtons = document.querySelectorAll('.ri-arrow-right-s-line, button:last-of-type');
                
                leftButtons.forEach(function(btn) {
                    btn.addEventListener('click', function() {
                    carousel.scrollBy({left: -300, behavior: 'smooth'});
                    });
                });
                
                rightButtons.forEach(function(btn) {
                    btn.addEventListener('click', function() {
                    carousel.scrollBy({left: 300, behavior: 'smooth'});
                    });
                });
                }
            });
            })();`),t.includes("banner-slides-container")&&(!i.includes("banner-dot")||!i.includes("banner-slide"))){const s=`
            // Banner Slider functionality
            (function() {
            document.addEventListener('DOMContentLoaded', function() {
                var slidesContainers = document.querySelectorAll('.banner-slides-container');
                
                slidesContainers.forEach(function(container) {
                    var slides = container.querySelectorAll('.banner-slide');
                    var dotsContainer = container.closest('.max-w-7xl').querySelector('.banner-dots-container');
                    var dots = dotsContainer ? dotsContainer.querySelectorAll('.banner-dot') : [];
                    var slidesCount = slides.length;
                    var currentSlide = 0;
                    var slideInterval;
                    
                    function goToSlide(index) {
                        if (slideInterval) {
                            clearInterval(slideInterval);
                        }
                        
                        slides.forEach(function(slide) {
                            slide.classList.remove('active', 'fadeIn');
                            slide.classList.add('fadeOut');
                            setTimeout(function() {
                                slide.style.display = 'none';
                            }, 500);
                        });
                        
                        dots.forEach(function(dot) {
                            dot.classList.remove('active');
                        });
                        
                        setTimeout(function() {
                            slides[index].style.display = 'flex';
                            slides[index].classList.remove('fadeOut');
                            slides[index].classList.add('active', 'fadeIn');
                            
                            if(dots[index]) {
                                dots[index].classList.add('active');
                            }
                            
                            currentSlide = index;
                            
                            if (slidesCount > 1) {
                                startSlideTimer();
                            }
                        }, 500);
                    }
                    
                    function nextSlide() {
                        var next = (currentSlide + 1) % slidesCount;
                        goToSlide(next);
                    }
                    
                    function startSlideTimer() {
                        slideInterval = setInterval(function() {
                            nextSlide();
                        }, 5000);
                    }
                    
                    dots.forEach(function(dot, index) {
                        dot.addEventListener('click', function() {
                            goToSlide(index);
                        });
                    });
                    
                    if (slidesCount > 0) {
                        // Add initial classes
                        slides[0].classList.add('active', 'fadeIn');
                        if(dots[0]) dots[0].classList.add('active');
                        
                        if (slidesCount > 1) {
                            startSlideTimer();
                        }
                    }
                });
            });
            })();`,c=`
            /* Banner Animations */
            .banner-slide {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            .banner-slide.fadeIn {
                opacity: 1;
            }
            .banner-slide.fadeOut {
                opacity: 0;
            }
            .banner-slide.active {
                display: flex !important;
            }`;i+=`

`+s,e+=`

`+c}let o={html:t,css:e,js:i};r?(o.id=r,_(a,o),document.dispatchEvent(new CustomEvent("editor:saved"))):Jt(a,o)}function Ut(l){l.DomComponents.getComponents().filter(a=>a.get("type")==="pdf-viewer"||a.getAttributes&&a.getAttributes()["data-gjs-type"]==="pdf-viewer").forEach(a=>{const t=a.getAttributes();if(t&&t["data-pdf-src"]){const e=a.view.el,i=t["data-pdf-src"];t["data-pdf-name"];let o=e.querySelector(".pdf-object");if(!o){o=document.createElement("object"),o.setAttribute("data",i),o.setAttribute("type","application/pdf"),o.setAttribute("width","100%"),o.setAttribute("height","500"),o.classList.add("pdf-object"),o.style.minHeight="500px",o.innerHTML=`
                    <div class="p-6 bg-gray-100 text-center">
                        <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                        <a href="${i}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                    </div>
                `;const s=e.querySelector(".pdf-placeholder");s&&(s.classList.add("hidden"),s.parentNode.insertBefore(o,s.nextSibling))}}})}function Jt(l,r){D.fire({title:"Título de la página",input:"text",inputLabel:"Ingresa un título para la página",inputPlaceholder:"Título de la página",confirmButtonText:"Agregar",cancelButtonText:"Cancelar",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",inputValidator:a=>{if(!a)return"Debes ingresar un título para la página"}}).then(a=>{a.isConfirmed&&(r.title=a.value,_(l,r),document.dispatchEvent(new CustomEvent("editor:saved")))})}function _(l,r){D.fire({title:"Guardando...",html:"Por favor espera mientras se guarda la página",allowOutsideClick:!1,didOpen:()=>{D.showLoading()}}),fetch(l,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:JSON.stringify(r)}).then(a=>a.json()).then(a=>{D.close(),Gt(a,r)}).catch(a=>{D.close(),console.error("Error:",a),E("Error al guardar la página","error")})}function Gt(l,r){l.success?(E("Página guardada correctamente","success"),window.editorHasUnsavedChanges=!1,document.dispatchEvent(new CustomEvent("editor:saved")),!r.id&&l.id&&Xt(l.id,r.title)):E("Error al guardar la página: "+(l.message||"Error desconocido"),"error")}function Xt(l,r){const a=document.getElementById("page-id");a&&(a.value=l);const t=document.getElementById("page-load-url");t&&(t.value=t.value.replace("new",l));const e=document.querySelector(".editor-title");e&&r&&(e.textContent="Editando: "+r),window.history.pushState({},"Editando: "+r,"/editor/"+l)}function Qt(l){let r=!1,a=!1;const t=!q("page-id");t&&N(),l.on("component:update",()=>{r=!0}),l.on("component:add",()=>{r=!0}),l.on("component:remove",()=>{r=!0}),l.on("style:update",()=>{r=!0}),document.addEventListener("editor:saved",()=>{r=!1});const e=document.getElementById("save-button");e&&e.addEventListener("click",function(){setTimeout(()=>{r=!1},1e3)}),document.addEventListener("click",function(i){Zt(i,r,t,o=>{a=o})}),window.addEventListener("popstate",function(i){Wt(i,r,a,t,o=>{a=o})}),Yt()}function N(){for(let l=0;l<localStorage.length;l++){const r=localStorage.key(l);r&&r.startsWith("gjs-")&&!r.includes("page-")&&localStorage.removeItem(r)}}function Zt(l,r,a,t){const e=l.target.closest("a[href], button[data-nav]");if(e&&!e.closest("#gjs")&&!e.closest(".swal2-container")&&r){const i=e.getAttribute("href")||"",o=e.hasAttribute("data-nav");(i&&!i.startsWith("#")&&!i.startsWith("javascript:")||o)&&(l.preventDefault(),D.fire({title:"¿Estás seguro?",text:"Hay cambios sin guardar que se perderán si sales de esta página.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, salir",cancelButtonText:"Cancelar"}).then(s=>{s.isConfirmed&&(t(!0),a&&N(),i?window.location.href=i:o&&Kt(e))}))}}function Kt(l){const r=l.getAttribute("data-nav");r==="back"?window.history.back():r==="home"?window.location.href="/":r&&(window.location.href=r)}function Wt(l,r,a,t,e){r&&!a&&(l.preventDefault(),history.pushState(null,document.title,window.location.href),D.fire({title:"¿Estás seguro?",text:"Hay cambios sin guardar que se perderán si sales de esta página.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, salir",cancelButtonText:"Cancelar"}).then(i=>{i.isConfirmed&&(e(!0),t&&N(),window.history.back())}))}function Yt(){document.querySelectorAll(".back-button, .nav-back, .btn-back").forEach(a=>{!a.hasAttribute("href")&&!a.hasAttribute("data-nav")&&a.setAttribute("data-nav","back")}),document.querySelectorAll(".home-button, .nav-home, .btn-home").forEach(a=>{!a.hasAttribute("href")&&!a.hasAttribute("data-nav")&&a.setAttribute("data-nav","home")})}
