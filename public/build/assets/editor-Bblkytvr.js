import{s as V,l as W,a as K,_ as Z,g as Y,b as tt,c as et,d as it}from"./buttonBlocks-Nuf9loky.js";import{s as q,S as N}from"./sweetalert2.esm.all-x82VjDyW.js";function at(i){i.Panels.addButton("options",{id:"tailwind-spacing",className:"fa fa-th-large",command:{run:function(l){st(l)}},attributes:{title:"Espaciado y alineación"}}),ut()}function st(i){const l=i.getSelected();if(!l)return;const s=l.getClasses()||[],t=lt(s),e=ot(s);i.Modal.open({title:"Espaciado y Alineación Tailwind",content:rt(t,e)}).onceClose(()=>{i.refresh()}),setTimeout(()=>{nt(i,l,s)},100)}function lt(i){const l={};return["p","pt","pr","pb","pl","px","py","m","mt","mr","mb","ml","mx","my"].forEach(t=>{const e=new RegExp(`^${t}-([0-9]+|auto)$`),a=i.find(d=>e.test(d));if(a){const d=a.replace(`${t}-`,"");l[t]=d}}),l}function ot(i){const l=["text-left","text-center","text-right","text-justify"];return i.find(s=>l.includes(s))||""}function rt(i,l){const s=[{value:"",label:"Ninguno"},{value:"0",label:"0"},{value:"1",label:"0.25rem (1)"},{value:"2",label:"0.5rem (2)"},{value:"3",label:"0.75rem (3)"},{value:"4",label:"1rem (4)"},{value:"5",label:"1.25rem (5)"},{value:"6",label:"1.5rem (6)"},{value:"8",label:"2rem (8)"},{value:"10",label:"2.5rem (10)"},{value:"12",label:"3rem (12)"},{value:"16",label:"4rem (16)"},{value:"20",label:"5rem (20)"},{value:"24",label:"6rem (24)"},{value:"32",label:"8rem (32)"},{value:"auto",label:"Auto"}],t=(e,a)=>{const d=s.map(c=>`<option value="${c.value}" ${i[e]===c.value?"selected":""}>${c.label}</option>`).join("");return`
      <div class="tw-spacing-field">
        <label for="tw-${e}">${a}</label>
        <select id="tw-${e}" data-spacing="${e}">
          ${d}
        </select>
      </div>
    `};return`
    <div class="tw-spacing-editor">
      <!-- Padding Section -->
      <div class="tw-spacing-section">
        <h3><i class="fa fa-expand"></i> Padding (relleno)</h3>
        
        <div class="tw-spacing-row tw-spacing-cols-3">
          ${t("p","Todos")}
          ${t("px","Horizontal")}
          ${t("py","Vertical")}
        </div>
        
        <div class="tw-spacing-row tw-spacing-cols-4">
          ${t("pt","Superior")}
          ${t("pr","Derecho")}
          ${t("pb","Inferior")}
          ${t("pl","Izquierdo")}
        </div>
      </div>
      
      <!-- Margin Section -->
      <div class="tw-spacing-section">
        <h3><i class="fa fa-arrows-alt"></i> Margin (margen)</h3>
        
        <div class="tw-spacing-row tw-spacing-cols-3">
          ${t("m","Todos")}
          ${t("mx","Horizontal")}
          ${t("my","Vertical")}
        </div>
        
        <div class="tw-spacing-row tw-spacing-cols-4">
          ${t("mt","Superior")}
          ${t("mr","Derecho")}
          ${t("mb","Inferior")}
          ${t("ml","Izquierdo")}
        </div>
      </div>
      
      <!-- Text Alignment Section -->
      <div class="tw-spacing-section" id="tw-text-section">
        <h3><i class="fa fa-align-left"></i> Alineación de Texto</h3>
        
        <div class="tw-text-align-controls">
          <div class="tw-text-align-options">
            <div class="tw-text-align-option ${l==="text-left"?"active":""}" data-value="text-left">
              <i class="fa fa-align-left"></i>
              <span>Izquierda</span>
            </div>
            <div class="tw-text-align-option ${l==="text-center"?"active":""}" data-value="text-center">
              <i class="fa fa-align-center"></i>
              <span>Centro</span>
            </div>
            <div class="tw-text-align-option ${l==="text-right"?"active":""}" data-value="text-right">
              <i class="fa fa-align-right"></i>
              <span>Derecha</span>
            </div>
            <div class="tw-text-align-option ${l==="text-justify"?"active":""}" data-value="text-justify">
              <i class="fa fa-align-justify"></i>
              <span>Justificado</span>
            </div>
          </div>
        </div>
        
        <input type="hidden" id="tw-text-align" value="${l}">
      </div>
      
      <div class="tw-spacing-actions">
        <button id="tw-spacing-cancel" class="tw-spacing-btn tw-spacing-btn-cancel">Cancelar</button>
        <button id="tw-spacing-apply" class="tw-spacing-btn tw-spacing-btn-apply">Aplicar</button>
      </div>
    </div>
  `}function nt(i,l,s){const t=s.join(" "),e=document.getElementById("tw-text-section"),a=document.querySelectorAll(".tw-text-align-option"),d=document.getElementById("tw-text-align");pt(l)||(e.style.display="none"),a.forEach(m=>{m.addEventListener("click",()=>{a.forEach(o=>o.classList.remove("active")),m.classList.add("active"),d.value=m.getAttribute("data-value"),U(i,l)})}),document.querySelectorAll("select[data-spacing]").forEach(m=>{m.addEventListener("change",()=>{U(i,l)})});const r=document.getElementById("tw-spacing-cancel");r&&r.addEventListener("click",()=>{l.setClass(s),i.select(l),i.Modal.close()});const n=document.getElementById("tw-spacing-apply");n&&n.addEventListener("click",()=>{ct(i,l),i.select(l),i.Modal.close(),console.log("Applied spacing changes. Original:",t,"New:",l.getClasses().join(" "))})}function U(i,l){const s=X(l);l.setClass(s),i.select(l)}function ct(i,l){const s=X(l);try{const t=l.view.el;t&&t.classList?(t.className="",s.forEach(e=>{t.classList.add(e)}),l.setClass(Array.from(t.classList))):l.setClass(s),l.trigger("change:classes"),i.select(l)}catch(t){console.error("Error updating classes:",t),l.setClass(s),i.select(l)}}function X(i){const l=i.getClasses()||[],s=dt(l),t=mt(),e=document.getElementById("tw-text-align"),a=e&&e.value?e.value:"",d=[...s,...t];return a&&d.push(a),d}function dt(i){const l=["p","pt","pr","pb","pl","px","py","m","mt","mr","mb","ml","mx","my"],s=["text-left","text-center","text-right","text-justify"];return i.filter(t=>{const e=l.some(d=>new RegExp(`^${d}-(\\d+|auto)$`).test(t)),a=s.includes(t);return!e&&!a})}function mt(){const i=[];return document.querySelectorAll("select[data-spacing]").forEach(s=>{const t=s.getAttribute("data-spacing"),e=s.value;e&&i.push(`${t}-${e}`)}),i}function pt(i){const l=["p","h1","h2","h3","h4","h5","h6","span","div","a","button","label","li","td","th"],s=i.get("tagName");return s&&l.includes(s.toLowerCase())}function ut(){if(document.getElementById("tw-spacing-styles"))return;const i=document.createElement("style");i.id="tw-spacing-styles",i.textContent=`
    /* Override GrapesJS modal styles for a clean white design */
    .gjs-mdl-dialog {
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1) !important;
      border-radius: 8px !important;
      background-color: #ffffff !important;
      color: #333333 !important;
    }
    
    .gjs-mdl-header {
      background-color: #ffffff !important;
      border-bottom: 1px solid #f0f0f0 !important;
      padding: 15px 20px !important;
      border-radius: 8px 8px 0 0 !important;
    }
    
    .gjs-mdl-title {
      font-size: 18px !important;
      font-weight: 600 !important;
      color: #333333 !important;
    }
    
    .gjs-mdl-btn-close {
      color: #999 !important;
      font-size: 20px !important;
    }
    
    .gjs-mdl-btn-close:hover {
      color: #333 !important;
    }
    
    .gjs-mdl-content {
      padding: 0 !important;
      background-color: #ffffff !important;
      border-radius: 0 0 8px 8px !important;
    }
    
    /* Tailwind spacing editor styles */
    .tw-spacing-editor {
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    
    .tw-spacing-section {
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .tw-spacing-section:last-of-type {
      margin-bottom: 10px;
      border-bottom: none;
    }
    
    .tw-spacing-section h3 {
      margin: 0 0 15px 0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .tw-spacing-section h3 i {
      color: #757575;
      font-size: 14px;
    }
    
    .tw-spacing-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 12px;
    }
    
    .tw-spacing-row:last-child {
      margin-bottom: 0;
    }
    
    .tw-spacing-cols-3 .tw-spacing-field {
      flex: 1;
      min-width: calc(33.333% - 10px);
    }
    
    .tw-spacing-cols-4 .tw-spacing-field {
      flex: 1;
      min-width: calc(25% - 10px);
    }
    
    .tw-spacing-field {
      display: flex;
      flex-direction: column;
    }
    
    .tw-spacing-field label {
      display: block;
      margin-bottom: 6px;
      font-size: 13px;
      color: #666;
      font-weight: 500;
    }
    
    .tw-spacing-field select {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      background-color: white;
      color: #333;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      transition: all 0.2s;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555555'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 8px center;
      background-size: 16px;
      padding-right: 30px;
    }
    
    .tw-spacing-field select:focus {
      border-color: #23366A;
      outline: none;
      box-shadow: 0 0 0 3px rgba(35, 54, 106, 0.1);
    }
    
    .tw-spacing-field select:hover {
      border-color: #ccc;
    }
    
    /* Text alignment styles */
    .tw-text-align-controls {
      margin-top: 10px;
    }
    
    .tw-text-align-options {
      display: flex;
      gap: 8px;
    }
    
    .tw-text-align-option {
      flex: 1;
      padding: 12px 8px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
      background-color: #fff;
    }
    
    .tw-text-align-option:hover {
      background-color: #f9f9f9;
      border-color: #d0d0d0;
    }
    
    .tw-text-align-option.active {
      background-color: #f0f7ff;
      border-color: #23366A;
    }
    
    .tw-text-align-option i {
      display: block;
      font-size: 18px;
      margin-bottom: 6px;
      color: #666;
    }
    
    .tw-text-align-option.active i {
      color: #23366A;
    }
    
    .tw-text-align-option span {
      display: block;
      font-size: 13px;
      color: #555;
    }
    
    .tw-text-align-option.active span {
      color: #23366A;
      font-weight: 500;
    }
    
    /* Action buttons */
    .tw-spacing-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
    }
    
    .tw-spacing-btn {
      padding: 10px 18px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    
    .tw-spacing-btn-cancel {
      background-color: #f5f5f5;
      color: #555;
      border: 1px solid #e0e0e0;
    }
    
    .tw-spacing-btn-cancel:hover {
      background-color: #ebebeb;
    }
    
    .tw-spacing-btn-apply {
      background-color: #23366A;
      color: white;
    }
    
    .tw-spacing-btn-apply:hover {
      background-color: #1a2b4e;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    /* Responsive adjustments */
    @media (max-width: 480px) {
      .tw-spacing-cols-3 .tw-spacing-field,
      .tw-spacing-cols-4 .tw-spacing-field {
        min-width: 100%;
      }
      
      .tw-spacing-row {
        flex-direction: column;
        gap: 10px;
      }
      
      .tw-spacing-editor {
        padding: 15px;
      }
      
      .tw-text-align-option {
        padding: 8px 5px;
      }
      
      .tw-text-align-option i {
        font-size: 16px;
        margin-bottom: 4px;
      }
      
      .tw-text-align-option span {
        font-size: 11px;
      }
    }
  `,document.head.appendChild(i)}function gt(i){i.DomComponents.addType("pdf-viewer",{model:{defaults:{tagName:"div",attributes:{"data-gjs-type":"pdf-viewer"},traits:[{type:"button",label:"Seleccionar PDF",name:"selectPDF",text:"Seleccionar PDF",command:"open-pdf-selector"}]},init(){this.set("type","pdf-viewer");const s=this.getAttributes();if(s["data-pdf-src"]){const t=this.getView();t&&t.el&&l(t.el,s["data-pdf-src"],s["data-pdf-name"]||"Documento PDF")}this.on("change:attributes",this.handleAttrChange)},handleAttrChange(){const s=this.getAttributes(),t=this.getView();t&&t.el&&s["data-pdf-src"]&&l(t.el,s["data-pdf-src"],s["data-pdf-name"]||"Documento PDF")}},view:{events:{click:"onClick"},init(){const t=this.model.getAttributes();this.el.setAttribute("data-gjs-type","pdf-viewer"),t["data-pdf-src"]&&l(this.el,t["data-pdf-src"],t["data-pdf-name"]||"Documento PDF")},onClick(s){if(s.target.tagName==="OBJECT"||s.target.closest("object")){s.stopPropagation();return}i.select(this.model),i.runCommand("open-pdf-selector",{component:this.model})},onRender(){const s=this.model.getAttributes();s["data-pdf-src"]&&l(this.el,s["data-pdf-src"],s["data-pdf-name"]||"Documento PDF")}}});function l(s,t,e){try{const a=s.querySelector(".pdf-placeholder"),d=s.querySelector(".pdf-title");if(a){const c=document.createElement("object");c.setAttribute("data",t),c.setAttribute("type","application/pdf"),c.setAttribute("width","100%"),c.setAttribute("height","500"),c.classList.add("pdf-object"),c.style.minHeight="500px",c.innerHTML=`
                <div class="p-6 bg-gray-100 text-center">
                    <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                    <a href="${t}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                </div>
            `,a.classList.add("hidden");let r=s.querySelector(".pdf-object");r?r.setAttribute("data",t):a.parentNode.insertBefore(c,a.nextSibling),d&&(d.textContent=e)}}catch(a){console.error("Error displaying PDF:",a),q(`Error al mostrar el PDF: ${a.message}`,"error")}}i.Commands.add("open-pdf-selector",{run(s,t,e={}){const a=e.component||s.getSelected();if(a)try{V("pdf",d=>{const c=d.alt||d.name||"Documento PDF";a.set("attributes",{...a.getAttributes(),"data-pdf-src":d.src,"data-pdf-name":c})})}catch(d){console.error("Error selecting PDF:",d),q(`Error al seleccionar PDF: ${d.message}`,"error")}}}),i.on("load",function(){setTimeout(()=>{try{const s=i.Canvas.getFrameEl();s&&s.contentDocument&&s.contentDocument.querySelectorAll('[data-gjs-type="pdf-viewer"]').forEach(e=>{const a=e.getAttribute("data-pdf-src"),d=e.getAttribute("data-pdf-name")||"Documento PDF";a&&l(e,a,d)})}catch(s){console.error("Error initializing PDF viewers:",s),q(`Error al inicializar visores PDF: ${s.message}`,"error")}},1e3)}),i.on("component:add",function(s){if(s.get("type")==="pdf-viewer"||s.getAttributes()["data-gjs-type"]==="pdf-viewer"){const t=s.getAttributes();if(t["data-pdf-src"]){const e=s.getView();e&&e.el&&l(e.el,t["data-pdf-src"],t["data-pdf-name"]||"Documento PDF")}}}),i.on("component:selected",function(s){if(s.get("type")==="pdf-viewer"||s.getAttributes()["data-gjs-type"]==="pdf-viewer"){const t=s.getAttributes();if(t["data-pdf-src"]){const e=s.getView();e&&e.el&&l(e.el,t["data-pdf-src"],t["data-pdf-name"]||"Documento PDF")}}}),i.on("storage:start",function(s){i.DomComponents.getComponents().filter(e=>e.get("type")==="pdf-viewer"||e.getAttributes()&&e.getAttributes()["data-gjs-type"]==="pdf-viewer").forEach(e=>{const a=e.getAttributes();a["data-pdf-src"]&&e.set("html-output",`
                    <div class="pdf-viewer-container bg-white shadow-lg rounded-lg overflow-hidden" data-gjs-type="pdf-viewer" data-pdf-src="${a["data-pdf-src"]}" data-pdf-name="${a["data-pdf-name"]||"Documento PDF"}" style="min-height: 500px; width: 100%;">
                        <div class="p-4 bg-primary text-white font-semibold flex justify-between items-center">
                            <span class="pdf-title">${a["data-pdf-name"]||"Documento PDF"}</span>
                        </div>
                        <object data="${a["data-pdf-src"]}" type="application/pdf" width="100%" height="500" class="pdf-object" style="min-height: 500px;">
                            <div class="p-6 bg-gray-100 text-center">
                                <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                                <a href="${a["data-pdf-src"]}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                            </div>
                        </object>
                    </div>
                `)})})}function ft(i){const l=i.BlockManager;i.on("load",()=>{const s=i.Canvas.getFrameEl();if(s&&s.contentDocument){const t=s.contentDocument.createElement("style");t.textContent=`
              .text-primary { color: #23366A !important; }
              .text-secondary { color: #333333 !important; }
              .bg-primary { background-color: #23366A !important; }
              .rounded-2xl { border-radius: 1rem !important; }
            `,s.contentDocument.head.appendChild(t)}}),l.add("basic-heading",{label:"Título",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-header" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Título Principal</h2>
            </div>
        </div>
        `}),l.add("basic-subtitle",{label:"Subtítulo",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-font" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <h3 class="text-secondary text-xl md:text-2xl font-semibold">Subtítulo</h3>
            </div>
        </div>
        `}),l.add("basic-paragraph",{label:"Párrafo",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-paragraph" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
        </div>
        `}),l.add("basic-divider-gray",{label:"Separador Horizontal Gris",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-minus" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-8">
            <div class="max-w-7xl mx-auto px-4">
                <div class="bg-gray-400 w-full" style="height: 2px;"></div>
            </div>
        </div>
        `}),l.add("basic-divider-blue",{label:"Separador Horizontal Azul",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-minus" style="font-size: 30px; display: block; margin: 0 auto; color: #23366A;"></i>',content:`
        <div class="py-8">
            <div class="max-w-7xl mx-auto px-4">
                <div class="bg-primary w-full" style="height: 2px;"></div>
            </div>
        </div>
        `}),l.add("basic-image",{label:"Imagen Básica",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-image" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="py-4">
            <div class="max-w-7xl mx-auto px-4">
                <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 object-cover rounded-2xl">
            </div>
        </div>
        `}),i.DomComponents.getType("map-component")||i.DomComponents.addType("map-component",{model:{defaults:{name:"Mapa",draggable:!0,droppable:!1,stylable:!0,script:function(){const s=this.id,t=document.getElementById(s),e=t.getAttribute("data-lat")||13.6929,a=t.getAttribute("data-lng")||-89.2182,d=t.getAttribute("data-zoom")||14,c=t.getAttribute("data-marker-title")||"Ubicación";if(!document.getElementById("leaflet-css")){const n=document.createElement("link");n.id="leaflet-css",n.rel="stylesheet",n.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",n.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",n.crossOrigin="",document.head.appendChild(n)}if(typeof L>"u"){const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",n.crossOrigin="",n.onload=function(){r()},document.head.appendChild(n)}else r();function r(){const n=L.map(s).setView([e,a],d);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(n),L.marker([e,a]).addTo(n).bindPopup(c).openPopup(),setTimeout(function(){n.invalidateSize()},100)}},attributes:{"data-lat":13.6929,"data-lng":-89.2182,"data-zoom":14,"data-marker-title":"Nuestra ubicación"},traits:[{type:"number",name:"data-lat",label:"Latitud",placeholder:"13.6929"},{type:"number",name:"data-lng",label:"Longitud",placeholder:"-89.2182"},{type:"number",name:"data-zoom",label:"Nivel de Zoom",min:1,max:18,placeholder:"14"},{type:"text",name:"data-marker-title",label:"Título Marcador",placeholder:"Nuestra ubicación"}]}}}),l.add("basic-map",{label:"Mapa Básico",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-map-o" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:{type:"map-component",style:{width:"100%",height:"400px",margin:"0 auto",position:"relative",borderRadius:"1rem"}}}),i.on("load",()=>{const s=i.Canvas.getFrameEl();if(s){const t=s.contentDocument.head;if(!t.querySelector("#leaflet-css")){const e=document.createElement("link");e.id="leaflet-css",e.rel="stylesheet",e.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",e.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",e.crossOrigin="",t.appendChild(e)}if(!t.querySelector("#map-custom-css")){const e=document.createElement("style");e.id="map-custom-css",e.innerHTML=`
                    .leaflet-container {
                        height: 100%;
                        width: 100%;
                        border-radius: inherit;
                    }
                    [data-gjs-type="map-component"] {
                        border-radius: 1rem;
                        overflow: hidden;
                    }
                `,t.appendChild(e)}}}),l.add("basic-ordered-list",{label:"Lista Numerada",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-list-ol" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
            <div class="py-4">
                <div class="max-w-7xl mx-auto px-4">
                    <ol class="list-decimal pl-6 space-y-2 text-gray-600 text-base md:text-lg leading-relaxed">
                        <li>Primer elemento de la lista numerada</li>
                        <li>Segundo elemento de la lista numerada</li>
                        <li>Tercer elemento de la lista numerada</li>
                    </ol>
                </div>
            </div>
            `}),l.add("basic-unordered-list",{label:"Lista con Viñetas",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-list-ul" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
            <div class="py-4">
                <div class="max-w-7xl mx-auto px-4">
                    <ul class="list-disc pl-6 space-y-2 text-gray-600 text-base md:text-lg leading-relaxed">
                        <li>Primer elemento de la lista con viñetas</li>
                        <li>Segundo elemento de la lista con viñetas</li>
                        <li>Tercer elemento de la lista con viñetas</li>
                    </ul>
                </div>
            </div>
            `})}function ht(i){const l=i.BlockManager;i.on("load",()=>{const e=i.Canvas.getFrameEl();if(e&&e.contentDocument){const a=e.contentDocument.createElement("style");a.textContent=`
                .text-primary { color: #23366A !important; }
                .bg-primary { background-color: #23366A !important; }
                .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important; }
                .rounded-lg { border-radius: 0.5rem !important; }
                .transition-all { transition: all 0.3s ease !important; }
                .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; }
            `,e.contentDocument.head.appendChild(a)}}),l.add("contact-cards-grid",{label:"Tarjetas de Contacto",category:"Tarjetas",attributes:{class:"gjs-block-section"},media:`
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
        `}),l.add("icon-cards-grid",{label:"Tarjetas con Icono",category:"Tarjetas",attributes:{class:"gjs-block-section"},media:`
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
            `}),l.add("link-buttons-grid",{label:"Botones de Enlace",category:"Botones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),i.DomComponents.addType("link-button",{isComponent:function(e){return e.classList&&e.classList.contains("link-button")},model:{defaults:{tagName:"a",droppable:!1,attributes:{class:"link-button"},traits:[{type:"text",name:"title",label:"Título",changeProp:!0},{type:"text",name:"href",label:"URL Enlace"},{type:"select",name:"target",label:"Comportamiento",options:[{id:"",name:"Misma ventana"},{id:"_blank",name:"Nueva ventana"}]},{type:"button",text:"Seleccionar PDF",full:!0,command:function(e){const a=e.getSelected();try{V("pdf",d=>{const c=d.alt||d.name||"Documento PDF";a.set("attributes",{...a.get("attributes"),href:d.src,target:"_blank","data-pdf-name":c}),a.get("title")||a.set("title",c),a.get("title")||a.set("title",c)})}catch(d){console.error("Error al seleccionar PDF:",d),q(`Error al seleccionar PDF: ${d.message}`,"error")}}}],script:function(){const e=this,a=e.querySelector("i");e.addEventListener("mouseenter",()=>{a&&(a.classList.remove("text-primary"),a.classList.add("text-white"))}),e.addEventListener("mouseleave",()=>{e.classList.contains("hover:bg-primary")&&a&&(a.classList.add("text-primary"),a.classList.remove("text-white"))})}},init(){this.on("change:title",this.updateTitle)},updateTitle(){const e=this.get("title"),a=this.view.el.querySelector("span");a&&e&&(a.textContent=e)}},view:{init(){const e=this.model.get("script"),a=this.el;e&&a&&e.call(a)}}}),i.DomComponents.addType("link",{model:{init(){this.getClasses().includes("link-button")&&this.set("type","link-button")}}})}function xt(i){const l=i.BlockManager;l.add("white-column-block",{label:"Columna Blanca",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("primary-column-block",{label:"Columna Azul",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("two-columns-list-block",{label:"Dos Columnas con Listas",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("two-columns-text-block",{label:"Dos Columnas con Párrafos",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("one-column-list-block",{label:"Una Columna con Lista",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("one-column-links-block",{label:"Una Columna con Enlaces",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `})}function bt(i){const l=i.BlockManager;l.add("pdf-viewer-block",{label:"Visor PDF",category:"Basic",attributes:{class:"gjs-block-section"},media:'<i class="fa fa-file-pdf-o" style="font-size: 30px; display: block; margin: 0 auto;"></i>',content:`
        <div class="pdf-viewer-container bg-white shadow-lg rounded-lg overflow-hidden" data-gjs-type="pdf-viewer" style="min-height: 500px; width: 100%;">
            <div class="p-4 bg-primary text-white font-semibold flex justify-between items-center">
                <span class="pdf-title">Documento PDF</span>
            </div>
            <div class="pdf-placeholder flex flex-col items-center justify-center p-8 bg-gray-100 h-64">
                <i class="ri-file-pdf-line text-5xl text-gray-400 mb-3"></i>
                <p class="text-gray-500 text-center">Haga clic para seleccionar un archivo PDF</p>
            </div>
        </div>
        `}),l.add("pdf-with-text-block",{label:"PDF con Texto",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `})}function yt(i){const l=i.BlockManager,s=13.6929,t=-89.2182,e={mapTitle:"Contáctanos",contactCards:[{id:1,title:"Whatsapp Institucional",iconClass:"ri-whatsapp-fill",items:[{text:"7988-8080",link:"tel:79888080",type:"phone"}]},{id:2,title:"Tarjeta de Crédito",iconClass:"ri-bank-card-fill",items:[{text:"2209-6857",link:"tel:22096857",type:"phone"},{text:"2209-6828",link:"tel:22096828",type:"phone"},{text:"2209-6837 (Horarios no hábiles)",link:"tel:22096837",type:"phone"}]}],locations:[{id:1,name:"Oficina Central",address:"San Salvador, El Salvador",lat:13.6929,lng:-89.2182}]},a=r=>{const n=r.contactCards.map(o=>{const u=o.items.map(h=>{let f="";return h.type==="phone"?f=`<a href="${h.link}" class="text-gray-600 hover:text-primary block mt-1">${h.text}</a>`:h.type==="email"?f=`<a href="${h.link}" class="text-gray-600 hover:text-primary block mt-1">${h.text}</a>`:h.type==="address"?f=`<p class="text-gray-600 mt-1">${h.text}</p>`:h.type==="hours"?f=`<p class="text-gray-600 mt-1">${h.text}</p>`:f=`<p class="text-gray-600 mt-1">${h.text}</p>`,f}).join("");return`
            <div class="contact-card mb-6 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0 h-14 w-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                        <i class="${o.iconClass} text-primary text-2xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-medium text-primary">${o.title}</h3>
                        <div class="mt-1">
                            ${u}
                        </div>
                    </div>
                </div>
            </div>
            `}).join(""),m=r.locations.map(o=>({lat:o.lat,lng:o.lng,title:o.name,info:`
                    <h4 style="font-weight: bold; margin-bottom: 5px;">${o.name}</h4>
                    ${o.address?`<p style="margin: 0;">${o.address}</p>`:""}
                `}));return`
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-left mb-8">
                <h2 class="text-4xl font-bold text-primary">${r.mapTitle||"Contáctanos"}</h2>
            </div>
            <div class="flex flex-col lg:flex-row gap-6">
                <div class="lg:w-1/3 order-2 lg:order-1">
                    <div class="contact-cards" style="max-height: 500px; overflow-y: auto; padding-right: 8px; scrollbar-width: thin;">
                        ${n}
                    </div>
                </div>
                <div class="lg:w-2/3 order-1 lg:order-2">
                    <div class="contact-map-container" style="height: 500px; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        <div class="contact-map" data-markers='${JSON.stringify(m)}' style="width:100%; height:100%; border-radius: 0.75rem;"></div>
                    </div>
                </div>
            </div>
        </div>
        `};i.DomComponents.addType("contact-map-component",{isComponent:function(r){return r.getAttribute&&r.getAttribute("data-gjs-type")==="contact-map-component"?{type:"contact-map-component"}:!1},model:{defaults:{name:"Mapa de Contacto",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!0,resizable:!1,attributes:{class:"py-10 bg-white","data-gjs-type":"contact-map-component","data-map-config":JSON.stringify(e)},traits:[{type:"button",label:!1,text:"Configurar Mapa",full:!0,command:r=>{const n=r.getSelected();n&&d(r,n)}}],components:r=>{const n=r.getAttributes()["data-map-config"];let m={...e};if(n)try{m={...e,...JSON.parse(n)}}catch(o){console.error("Error parsing map config:",o)}return a(m)},script:function(){const r=()=>{const n=this,m=n.getAttribute("data-map-config"),o=n.querySelector(".contact-map");if(!o)return;let u={mapTitle:"Contáctanos",contactCards:[{id:1,title:"Whatsapp Institucional",iconClass:"ri-whatsapp-fill",items:[{text:"7988-8080",link:"tel:79888080",type:"phone"}]}],locations:[{id:1,name:"Oficina Central",address:"San Salvador, El Salvador",lat:13.6929,lng:-89.2182}]};if(m)try{u=JSON.parse(m)}catch(f){console.error("Error parsing map config:",f)}if(!document.getElementById("leaflet-css")){const f=document.createElement("link");f.id="leaflet-css",f.rel="stylesheet",f.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(f)}if(typeof window.L>"u"){const f=document.createElement("script");f.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",f.onload=function(){h()},document.head.appendChild(f)}else h();function h(){try{o._leaflet_id&&o._map.remove();let f=[];try{o.getAttribute("data-markers")?f=JSON.parse(o.getAttribute("data-markers")):u.locations&&u.locations.length>0&&(f=u.locations.map(p=>({lat:p.lat,lng:p.lng,title:p.name,info:`
                                                <h4 style="font-weight: bold; margin-bottom: 5px;">${p.name}</h4>
                                                ${p.address?`<p style="margin: 0;">${p.address}</p>`:""}
                                            `})))}catch(p){console.error("Error parsing markers:",p)}let S=f.length>0?f[0].lat:13.6929,T=f.length>0?f[0].lng:-89.2182;const x=window.L.map(o).setView([S,T],12);if(window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(x),f.length>0){const p=[];f.forEach(g=>{if(g.lat&&g.lng){p.push([g.lat,g.lng]);const b=window.L.marker([g.lat,g.lng]).addTo(x);g.info?b.bindPopup(g.info):g.title&&b.bindPopup(g.title)}}),p.length>1&&x.fitBounds(p,{padding:[30,30]})}setTimeout(()=>{document.querySelectorAll(".leaflet-control-container, .leaflet-top, .leaflet-bottom, .leaflet-control").forEach(g=>{g.style.zIndex="999"})},100),setTimeout(()=>{x.invalidateSize()},300),o._map=x}catch(f){console.error("Error rendering map:",f)}}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}},init(){this.set("type","contact-map-component"),this.addAttributes({"data-gjs-type":"contact-map-component"})},getConfig(){const r=this.getAttributes()["data-map-config"];if(r)try{return{...e,...JSON.parse(r)}}catch(n){console.error("Error parsing map config:",n)}return{...e}},setConfig(r){const n={...this.getConfig(),...r},m={...this.getAttributes(),"data-gjs-type":"contact-map-component","data-map-config":JSON.stringify(n)};this.setAttributes(m),this.components(a(n)),this.view.render()},exportConfig(){return JSON.stringify(this.getConfig(),null,2)},importConfig(r){try{const n=JSON.parse(r);return this.setConfig(n),!0}catch(n){return console.error("Error importing configuration:",n),!1}}}});function d(r,n){const m=n.getConfig(),o=[...m.contactCards],u=[...m.locations];let h="contactCards";const f=()=>o.length===0?'<div style="text-align: center; padding: 20px; color: #6b7280;">No hay tarjetas de contacto. Haz clic en "Agregar Tarjeta" para crear una.</div>':o.map((C,w)=>{const v=C.items.map((y,k)=>`
                                <div class="contact-item-row" style="display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start;">
                                    <div style="flex: 1;">
                                        <input type="text" class="card-item-text" data-card-id="${C.id}" data-item-index="${k}" value="${y.text}" placeholder="Texto" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                    </div>
                                    <div style="flex: 1;">
                                        <input type="text" class="card-item-link" data-card-id="${C.id}" data-item-index="${k}" value="${y.link||""}" placeholder="Enlace (opcional)" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                    </div>
                                    <div>
                                        <select class="card-item-type" data-card-id="${C.id}" data-item-index="${k}" style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                            <option value="phone" ${y.type==="phone"?"selected":""}>Teléfono</option>
                                            <option value="email" ${y.type==="email"?"selected":""}>Email</option>
                                            <option value="address" ${y.type==="address"?"selected":""}>Dirección</option>
                                            <option value="hours" ${y.type==="hours"?"selected":""}>Horario</option>
                                            <option value="text" ${y.type==="text"||!y.type?"selected":""}>Texto</option>
                                        </select>
                                    </div>
                                    <button class="delete-card-item-btn" data-card-id="${C.id}" data-item-index="${k}" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                                        ✕
                                    </button>
                                </div>
                                `).join("");return`
                        <div class="contact-card-item" data-card-id="${C.id}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #111827;">Tarjeta ${w+1}</h4>
                                <button class="delete-card-btn" data-card-id="${C.id}" style="background: #ef4444; color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                                    Eliminar
                                </button>
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Título *</label>
                                <input type="text" class="card-title" data-card-id="${C.id}" value="${C.title||""}" placeholder="Título de la tarjeta" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Icono *</label>
                                <select class="card-icon" data-card-id="${C.id}" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                    <option value="ri-whatsapp-fill" ${C.iconClass==="ri-whatsapp-fill"?"selected":""}>WhatsApp</option>
                                    <option value="ri-phone-fill" ${C.iconClass==="ri-phone-fill"?"selected":""}>Teléfono</option>
                                    <option value="ri-mail-fill" ${C.iconClass==="ri-mail-fill"?"selected":""}>Email</option>
                                    <option value="ri-map-pin-fill" ${C.iconClass==="ri-map-pin-fill"?"selected":""}>Ubicación</option>
                                    <option value="ri-time-fill" ${C.iconClass==="ri-time-fill"?"selected":""}>Horario</option>
                                    <option value="ri-bank-card-fill" ${C.iconClass==="ri-bank-card-fill"?"selected":""}>Tarjeta</option>
                                    <option value="ri-building-fill" ${C.iconClass==="ri-building-fill"?"selected":""}>Edificio</option>
                                    <option value="ri-customer-service-fill" ${C.iconClass==="ri-customer-service-fill"?"selected":""}>Atención al cliente</option>
                                </select>
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Elementos</label>
                                <div class="card-items-container">
                                    ${v}
                                </div>
                                <button class="add-card-item-btn" data-card-id="${C.id}" style="width: 100%; background: #4f46e5; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s; margin-top: 10px;" onmouseover="this.style.background='#4338ca'" onmouseout="this.style.background='#4f46e5'">
                                    + Agregar Elemento
                                </button>
                            </div>
                        </div>
                        `}).join(""),S=()=>u.length===0?'<div style="text-align: center; padding: 20px; color: #6b7280;">No hay ubicaciones. Haz clic en "Agregar Ubicación" para crear una.</div>':u.map((C,w)=>`
                        <div class="location-item" data-location-id="${C.id}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #111827;">Ubicación ${w+1}</h4>
                                <button class="delete-location-btn" data-location-id="${C.id}" style="background: #ef4444; color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                                    Eliminar
                                </button>
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Nombre de la Ubicación *</label>
                                <input type="text" class="location-name" data-location-id="${C.id}" value="${C.name||""}" placeholder="Nombre de la ubicación" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Dirección (opcional)</label>
                                <input type="text" class="location-address" data-location-id="${C.id}" value="${C.address||""}" placeholder="Dirección de la ubicación" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                            </div>

                            <div style="display: flex; gap: 10px; margin-bottom: 14px;">
                                <div style="flex: 1;">
                                    <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Latitud *</label>
                                    <input type="number" step="0.0001" class="location-lat" data-location-id="${C.id}" value="${C.lat||""}" placeholder="Ej: 13.6929" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                </div>
                                <div style="flex: 1;">
                                    <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Longitud *</label>
                                    <input type="number" step="0.0001" class="location-lng" data-location-id="${C.id}" value="${C.lng||""}" placeholder="Ej: -89.2182" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                                </div>
                            </div>

                            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; font-size: 13px;">
                                <p style="margin: 0; color: #6b7280;">Puedes obtener las coordenadas buscando la ubicación en <a href="https://www.google.com/maps" target="_blank" style="color: #3b82f6; text-decoration: none;">Google Maps</a>, luego haz clic derecho y selecciona "¿Qué hay aquí?". Las coordenadas aparecerán en la parte inferior.</p>
                            </div>
                        </div>
                    `).join(""),T=()=>h==="contactCards"?`
                <div id="contact-cards-tab" class="tab-content">
                    <div id="contact-cards-list" style="margin-bottom: 16px;">
                        ${f()}
                    </div>
                    <button id="add-card-btn" style="width: 100%; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
                        Agregar Nueva Tarjeta
                    </button>
                </div>
                `:`
                <div id="locations-tab" class="tab-content">
                    <div id="locations-list" style="margin-bottom: 16px;">
                        ${S()}
                    </div>
                    <button id="add-location-btn" style="width: 100%; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
                        Agregar Nueva Ubicación
                    </button>
                </div>
                `,x=`
            <div class="contact-map-config-modal" style="font-family: system-ui, -apple-system, sans-serif; background: white; padding: 10px; border-radius: 8px; max-height: 90vh; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 24px;">
                    <h2 style="margin: 0; font-size: 22px; font-weight: 600; color: #111827;">Configurar Mapa de Contacto</h2>
                    <div>
                        <button id="export-btn" style="padding: 6px 16px; border: none; background: #4f46e5; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-right: 8px;" onmouseover="this.style.background='#4338ca'" onmouseout="this.style.background='#4f46e5'">
                            <span style="display: flex; align-items: center; justify-content: center;"><svg style="width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>Exportar</span>
                        </button>
                        <button id="import-btn" style="padding: 6px 16px; border: none; background: #0891b2; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#0e7490'" onmouseout="this.style.background='#0891b2'">
                            <span style="display: flex; align-items: center; justify-content: center;"><svg style="width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Importar</span>
                        </button>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Título del Mapa</label>
                    <input type="text" id="map-title-input" value="${m.mapTitle||"Contáctanos"}" placeholder="Título para la sección de mapa" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                </div>
                
                <div class="tabs-container" style="margin-bottom: 20px;">
                    <div class="tabs-header" style="display: flex; border-bottom: 1px solid #e5e7eb; margin-bottom: 16px;">
                        <button id="contact-cards-tab-btn" class="tab-btn ${h==="contactCards"?"active":""}" style="flex: 1; padding: 12px; background: ${h==="contactCards"?"#f9fafb":"transparent"}; border: none; border-bottom: ${h==="contactCards"?"2px solid #23366A":"2px solid transparent"}; color: ${h==="contactCards"?"#23366A":"#6b7280"}; font-weight: ${h==="contactCards"?"600":"500"}; cursor: pointer; transition: all 0.2s;">
                            Tarjetas de Contacto
                        </button>
                        <button id="locations-tab-btn" class="tab-btn ${h==="locations"?"active":""}" style="flex: 1; padding: 12px; background: ${h==="locations"?"#f9fafb":"transparent"}; border: none; border-bottom: ${h==="locations"?"2px solid #23366A":"2px solid transparent"}; color: ${h==="locations"?"#23366A":"#6b7280"}; font-weight: ${h==="locations"?"600":"500"}; cursor: pointer; transition: all 0.2s;">
                            Ubicaciones en Mapa
                        </button>
                    </div>
                </div>
                
                <div class="modal-body" style="max-height: calc(90vh - 240px); overflow-y: auto; padding-right: 8px; flex: 1;">
                    <div id="tab-content">
                        ${T()}
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
        `,p=r.Modal;p.setTitle(""),p.setContent(x),p.open({attributes:{class:"contact-map-modal"}}),setTimeout(()=>{const C=document.querySelector(".gjs-mdl-dialog");C&&(C.style.backgroundColor="white");const w=document.querySelector(".gjs-mdl-header");w&&(w.style.padding="0",w.style.border="none",w.style.display="none");const v=document.querySelector(".gjs-mdl-close");v&&(v.style.display="none")},10);let g=1;o.length>0&&(g=Math.max(...o.map(C=>C.id))+1);let b=1;u.length>0&&(b=Math.max(...u.map(C=>C.id))+1);const E=()=>{document.getElementById("tab-content").innerHTML=T(),h==="contactCards"?A():j()},I=C=>{h=C,document.querySelectorAll(".tab-btn").forEach(w=>{w.id===`${C}-tab-btn`?(w.style.background="#f9fafb",w.style.borderBottom="2px solid #23366A",w.style.color="#23366A",w.style.fontWeight="600"):(w.style.background="transparent",w.style.borderBottom="2px solid transparent",w.style.color="#6b7280",w.style.fontWeight="500")}),E()},A=()=>{var C;document.querySelectorAll(".delete-card-btn").forEach(w=>{w.addEventListener("click",v=>{const y=parseInt(v.target.dataset.cardId);if(o.length>1){const k=o.findIndex(B=>B.id===y);k!==-1&&(o.splice(k,1),E())}else alert("Debe haber al menos una tarjeta de contacto")})}),document.querySelectorAll(".add-card-item-btn").forEach(w=>{w.addEventListener("click",v=>{const y=parseInt(v.target.dataset.cardId),k=o.find(B=>B.id===y);k&&(k.items.push({text:"Nuevo elemento",link:"",type:"text"}),E())})}),document.querySelectorAll(".delete-card-item-btn").forEach(w=>{w.addEventListener("click",v=>{const y=parseInt(v.target.dataset.cardId),k=parseInt(v.target.dataset.itemIndex),B=o.find($=>$.id===y);B&&B.items.length>1?(B.items.splice(k,1),E()):alert("Cada tarjeta debe tener al menos un elemento")})}),document.querySelectorAll(".card-title").forEach(w=>{w.addEventListener("input",v=>{const y=parseInt(v.target.dataset.cardId),k=o.find(B=>B.id===y);k&&(k.title=v.target.value)})}),document.querySelectorAll(".card-icon").forEach(w=>{w.addEventListener("change",v=>{const y=parseInt(v.target.dataset.cardId),k=o.find(B=>B.id===y);k&&(k.iconClass=v.target.value)})}),document.querySelectorAll(".card-item-text").forEach(w=>{w.addEventListener("input",v=>{const y=parseInt(v.target.dataset.cardId),k=parseInt(v.target.dataset.itemIndex),B=o.find($=>$.id===y);B&&B.items[k]&&(B.items[k].text=v.target.value)})}),document.querySelectorAll(".card-item-link").forEach(w=>{w.addEventListener("input",v=>{const y=parseInt(v.target.dataset.cardId),k=parseInt(v.target.dataset.itemIndex),B=o.find($=>$.id===y);B&&B.items[k]&&(B.items[k].link=v.target.value)})}),document.querySelectorAll(".card-item-type").forEach(w=>{w.addEventListener("change",v=>{const y=parseInt(v.target.dataset.cardId),k=parseInt(v.target.dataset.itemIndex),B=o.find($=>$.id===y);if(B&&B.items[k]){if(B.items[k].type=v.target.value,v.target.value==="phone"){const $=B.items[k].text||"";B.items[k].link=`tel:${$.replace(/\D/g,"")}`}else v.target.value==="email"&&(B.items[k].link=`mailto:${B.items[k].text||""}`);E()}})}),(C=document.getElementById("add-card-btn"))==null||C.addEventListener("click",()=>{o.push({id:g++,title:`Nueva Tarjeta ${o.length+1}`,iconClass:"ri-phone-fill",items:[{text:"Elemento 1",link:"",type:"text"}]}),E()})},j=()=>{var w;document.querySelectorAll(".delete-location-btn").forEach(v=>{v.addEventListener("click",y=>{const k=parseInt(y.target.dataset.locationId);if(u.length>1){const B=u.findIndex($=>$.id===k);B!==-1&&(u.splice(B,1),E())}else alert("Debe haber al menos una ubicación")})});const C=(v,y)=>{const k=parseInt(v.target.dataset.locationId),B=u.find($=>$.id===k);B&&(B[y]=v.target.value)};document.querySelectorAll(".location-name").forEach(v=>{v.addEventListener("input",y=>C(y,"name"))}),document.querySelectorAll(".location-address").forEach(v=>{v.addEventListener("input",y=>C(y,"address"))}),document.querySelectorAll(".location-lat").forEach(v=>{v.addEventListener("input",y=>C(y,"lat"))}),document.querySelectorAll(".location-lng").forEach(v=>{v.addEventListener("input",y=>C(y,"lng"))}),(w=document.getElementById("add-location-btn"))==null||w.addEventListener("click",()=>{u.push({id:b++,name:`Nueva Ubicación ${u.length+1}`,address:"",lat:s,lng:t}),E()})};setTimeout(()=>{var C,w,v,y,k,B;(C=document.getElementById("contact-cards-tab-btn"))==null||C.addEventListener("click",()=>{I("contactCards")}),(w=document.getElementById("locations-tab-btn"))==null||w.addEventListener("click",()=>{I("locations")}),h==="contactCards"?A():j(),(v=document.getElementById("export-btn"))==null||v.addEventListener("click",()=>{const $={mapTitle:document.getElementById("map-title-input").value.trim()||"Contáctanos",contactCards:o,locations:u},z=JSON.stringify($,null,2),H="data:application/json;charset=utf-8,"+encodeURIComponent(z),_="mapa-contacto-config.json",P=document.createElement("a");P.setAttribute("href",H),P.setAttribute("download",_),P.style.display="none",document.body.appendChild(P),P.click(),document.body.removeChild(P)}),(y=document.getElementById("import-btn"))==null||y.addEventListener("click",()=>{const $=document.createElement("input");$.type="file",$.accept="application/json",$.onchange=z=>{const H=z.target.files[0],_=new FileReader;_.onload=P=>{try{const M=JSON.parse(P.target.result);M?(M.mapTitle&&(document.getElementById("map-title-input").value=M.mapTitle),M.contactCards&&Array.isArray(M.contactCards)&&M.contactCards.length>0&&(o.length=0,M.contactCards.forEach(D=>{o.push({id:D.id||g++,title:D.title||"",iconClass:D.iconClass||"ri-phone-fill",items:Array.isArray(D.items)?D.items.map(O=>({text:O.text||"",link:O.link||"",type:O.type||"text"})):[{text:"Elemento",link:"",type:"text"}]})})),M.locations&&Array.isArray(M.locations)&&M.locations.length>0&&(u.length=0,M.locations.forEach(D=>{u.push({id:D.id||b++,name:D.name||"",address:D.address||"",lat:D.lat||s,lng:D.lng||t})})),E(),alert("Configuración importada con éxito")):alert("Formato de archivo no válido")}catch(M){alert("Error al procesar el archivo: "+M.message)}},_.readAsText(H)},$.click()}),(k=document.getElementById("save-btn"))==null||k.addEventListener("click",()=>{const $=o.some(D=>!D.title||D.title.trim()===""),z=o.some(D=>D.items.some(O=>!O.text||O.text.trim()==="")),H=u.some(D=>!D.name||D.name.trim()===""),_=u.some(D=>!D.lat||!D.lng||isNaN(D.lat)||isNaN(D.lng));if($){alert("Todas las tarjetas deben tener un título"),I("contactCards");return}if(z){alert("Todos los elementos de las tarjetas deben tener texto"),I("contactCards");return}if(H){alert("Todas las ubicaciones deben tener un nombre"),I("locations");return}if(_){alert("Todas las ubicaciones deben tener coordenadas válidas"),I("locations");return}const M={mapTitle:document.getElementById("map-title-input").value.trim()||"Contáctanos",contactCards:o,locations:u};n.setConfig(M),p.close()}),(B=document.getElementById("cancel-btn"))==null||B.addEventListener("click",()=>{p.close()})},100)}l.add("contact-map-block",{label:"Mapa de Contacto",category:"Mapas",content:{type:"contact-map-component",attributes:{class:"py-10 bg-white","data-gjs-type":"contact-map-component","data-map-config":JSON.stringify(e)}},media:`<svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
        <rect x="2" y="2" width="9" height="28" fill="#e9ecef" rx="1"/>
        <rect x="13" y="2" width="17" height="28" fill="#a8dadc" rx="1"/>
        <circle cx="22" cy="15" r="5" fill="#f8e7d8" stroke="#e34234" stroke-width="0.7"/>
        <circle cx="22" cy="15" r="1" fill="#e34234"/>
        <line x1="3" y1="7" x2="10" y2="7" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="11" x2="10" y2="11" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="15" x2="10" y2="15" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="19" x2="10" y2="19" stroke="#23366A" stroke-width="0.8"/>
    </svg>`}),i.on("load",()=>{const r=i.Canvas.getFrameEl();if(r){const n=r.contentDocument.head;if(!n.querySelector("#leaflet-css")){const m=document.createElement("link");m.id="leaflet-css",m.rel="stylesheet",m.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",n.appendChild(m)}if(!n.querySelector("#contact-map-css")){const m=document.createElement("style");m.id="contact-map-css",m.innerHTML=`
                .leaflet-container {
                    height: 100%;
                    width: 100%;
                    border-radius: inherit;
                }
                .contact-card {
                    transition: background-color 0.2s;
                }
                .contact-card:hover {
                    background-color: #f9fafb;
                }
                .leaflet-control-zoom, 
                .leaflet-control-attribution,
                .leaflet-control-container .leaflet-control,
                .leaflet-popup-pane,
                .leaflet-tooltip-pane,
                .leaflet-top, 
                .leaflet-bottom {
                    z-index: 999 !important;
                }
            `,n.appendChild(m)}}}),i.on("component:selected",r=>{if(r.get("type")==="contact-map-component"){const n=r.getEl();if(n){const m=n.querySelector(".contact-map");m&&m._map&&setTimeout(()=>{m._map.invalidateSize()},100)}}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find('[data-gjs-type="contact-map-component"]').forEach(m=>{m.set("type","contact-map-component");const o=m.getEl();if(o){const u=m.get("script");u&&typeof u=="function"&&u.call(o)}})},1e3)}),i.on("component:mount",r=>{const n=r.getEl();n&&n.getAttribute&&n.getAttribute("data-gjs-type")==="contact-map-component"&&(r.set("type","contact-map-component"),setTimeout(()=>{const m=r.get("script");m&&typeof m=="function"&&m.call(n)},500))}),i.on("component:clone",r=>{if(r.get("type")==="contact-map-component"){const n=r.getEl();if(n){const m=n.querySelector(".contact-map");m&&m._map&&(m._map.remove(),delete m._map),setTimeout(()=>{const o=r.get("script");o&&typeof o=="function"&&o.call(n)},500)}}}),i.on("canvas:render",()=>{setTimeout(()=>{i.getWrapper().find('[data-gjs-type="contact-map-component"]').forEach(m=>{m.set("type","contact-map-component");const o=m.getEl();if(o&&o.isConnected){const u=m.get("script");u&&typeof u=="function"&&u.call(o)}})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find('[data-gjs-type="contact-map-component"]').forEach(m=>{m.set("type","contact-map-component"),m.addAttributes({"data-gjs-type":"contact-map-component"});const o=m.getConfig();m.addAttributes({"data-map-config":JSON.stringify(o)})})})}function vt(i){const l=i.BlockManager,s=13.6929,t=-89.2182,e={mapTitle:"Nuestras Agencias",agencies:[{id:1,name:"Agencia Central",address:"San Salvador, El Salvador",phone:"+503 2209-6800",lat:13.6929,lng:-89.2182}]},a=r=>{const n=r.agencies.map(o=>`
            <div class="agency-item mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 class="text-lg font-medium text-primary">${o.name}</h3>
                ${o.address?`<p class="text-gray-600 flex items-center gap-2 mt-1"><i class="ri-map-pin-line text-primary"></i> ${o.address}</p>`:""}
                ${o.phone?`<p class="text-gray-600 flex items-center gap-2 mt-1"><i class="ri-phone-line text-primary"></i> <a href="tel:${o.phone.replace(/\s+/g,"")}" class="hover:text-primary transition-colors">${o.phone}</a></p>`:""}
            </div>
        `).join(""),m=r.agencies.map(o=>({lat:o.lat,lng:o.lng,title:o.name,info:`
                    <h4 style="font-weight: bold; margin-bottom: 5px;">${o.name}</h4>
                    ${o.address?`<p style="margin: 0 0 3px 0;"><i class="ri-map-pin-line"></i> ${o.address}</p>`:""}
                    ${o.phone?`<p style="margin: 0;"><i class="ri-phone-line"></i> <a href="tel:${o.phone.replace(/\s+/g,"")}" style="color: #23366A; text-decoration: none;">${o.phone}</a></p>`:""}
                `}));return`
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-left mb-8">
                <h2 class="text-4xl font-bold text-primary">${r.mapTitle||"Nuestras Agencias"}</h2>
            </div>
            <div class="flex flex-col lg:flex-row gap-6">
                <div class="lg:w-1/3 order-2 lg:order-1">
                    <div class="agencies-list" style="max-height: 500px; overflow-y: auto; padding-right: 8px; scrollbar-width: thin;">
                        ${n}
                    </div>
                </div>
                <div class="lg:w-2/3 order-1 lg:order-2">
                    <div class="agencies-map-container" style="height: 500px; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        <div class="agencies-map" data-markers='${JSON.stringify(m)}' style="width:100%; height:100%; border-radius: 0.75rem;"></div>
                    </div>
                </div>
            </div>
        </div>
        `};i.DomComponents.addType("agencies-map-component",{isComponent:function(r){return r.getAttribute&&r.getAttribute("data-gjs-type")==="agencies-map-component"?{type:"agencies-map-component"}:!1},model:{defaults:{name:"Mapa de Agencias",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!0,resizable:!1,attributes:{class:"py-10 bg-white","data-gjs-type":"agencies-map-component","data-map-config":JSON.stringify(e)},traits:[{type:"button",label:!1,text:"Configurar Mapa",full:!0,command:r=>{const n=r.getSelected();n&&d(r,n)}}],components:r=>{const n=r.getAttributes()["data-map-config"];let m={...e};if(n)try{m={...e,...JSON.parse(n)}}catch(o){console.error("Error parsing map config:",o)}return a(m)},script:function(){const r=()=>{const n=this,m=n.getAttribute("data-map-config"),o=n.querySelector(".agencies-map");if(!o)return;let u={mapTitle:"Nuestras Agencias",agencies:[{id:1,name:"Agencia Central",address:"San Salvador, El Salvador",phone:"+503 2209-6800",lat:13.6929,lng:-89.2182}]};if(m)try{u=JSON.parse(m)}catch(f){console.error("Error parsing map config:",f)}if(!document.getElementById("leaflet-css")){const f=document.createElement("link");f.id="leaflet-css",f.rel="stylesheet",f.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(f)}if(typeof window.L>"u"){const f=document.createElement("script");f.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",f.onload=function(){h()},document.head.appendChild(f)}else h();function h(){try{o._leaflet_id&&o._map.remove();let f=[];try{o.getAttribute("data-markers")?f=JSON.parse(o.getAttribute("data-markers")):u.agencies&&u.agencies.length>0&&(f=u.agencies.map(g=>({lat:g.lat,lng:g.lng,title:g.name,info:`
                                                <h4 style="font-weight: bold; margin-bottom: 5px;">${g.name}</h4>
                                                ${g.address?`<p style="margin: 0 0 3px 0;"><i class="ri-map-pin-line"></i> ${g.address}</p>`:""}
                                                ${g.phone?`<p style="margin: 0;"><i class="ri-phone-line"></i> <a href="tel:${g.phone.replace(/\s+/g,"")}" style="color: #23366A; text-decoration: none;">${g.phone}</a></p>`:""}
                                            `})))}catch(g){console.error("Error parsing markers:",g)}let S=f.length>0?f[0].lat:13.6929,T=f.length>0?f[0].lng:-89.2182;const x=window.L.map(o).setView([S,T],12);if(window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(x),f.length>0){const g=[];f.forEach(b=>{if(b.lat&&b.lng){g.push([b.lat,b.lng]);const E=window.L.marker([b.lat,b.lng]).addTo(x);b.info?E.bindPopup(b.info):b.title&&E.bindPopup(b.title)}}),g.length>1&&x.fitBounds(g,{padding:[30,30]})}const p=n.querySelectorAll(".agency-item");p&&p.length>0&&p.forEach((g,b)=>{b<f.length&&(g.addEventListener("click",()=>{const E=f[b];x.setView([E.lat,E.lng],15),x.eachLayer(I=>{I._latlng&&I._latlng.lat===E.lat&&I._latlng.lng===E.lng&&I.openPopup()})}),g.style.cursor="pointer")}),setTimeout(()=>{x.invalidateSize()},300),o._map=x}catch(f){console.error("Error rendering map:",f)}}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}},init(){this.set("type","agencies-map-component"),this.addAttributes({"data-gjs-type":"agencies-map-component"})},getConfig(){const r=this.getAttributes()["data-map-config"];if(r)try{return{...e,...JSON.parse(r)}}catch(n){console.error("Error parsing map config:",n)}return{...e}},setConfig(r){const n={...this.getConfig(),...r},m={...this.getAttributes(),"data-gjs-type":"agencies-map-component","data-map-config":JSON.stringify(n)};this.setAttributes(m),this.components(a(n)),this.view.render()},exportConfig(){return JSON.stringify(this.getConfig(),null,2)},importConfig(r){try{const n=JSON.parse(r);return this.setConfig(n),!0}catch(n){return console.error("Error importing configuration:",n),!1}}}});function d(r,n){const m=n.getConfig(),o=[...m.agencies],u=()=>o.map((p,g)=>`
                <div class="agency-item" data-agency-id="${p.id}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e5e7eb'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #111827;">Agencia ${g+1}</h4>
                        <button class="delete-agency-btn" data-agency-id="${p.id}" style="background: #ef4444; color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                            Eliminar
                        </button>
                    </div>

                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Nombre de la Agencia *</label>
                        <input type="text" class="agency-name" data-agency-id="${p.id}" value="${p.name||""}" placeholder="Nombre de la agencia" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                    </div>

                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Dirección (opcional)</label>
                        <input type="text" class="agency-address" data-agency-id="${p.id}" value="${p.address||""}" placeholder="Dirección de la agencia" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                    </div>

                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Teléfono (opcional)</label>
                        <input type="text" class="agency-phone" data-agency-id="${p.id}" value="${p.phone||""}" placeholder="Número de teléfono" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                    </div>

                    <div style="display: flex; gap: 10px; margin-bottom: 14px;">
                        <div style="flex: 1;">
                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Latitud *</label>
                            <input type="number" step="0.0001" class="agency-lat" data-agency-id="${p.id}" value="${p.lat||""}" placeholder="Ej: 13.6929" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 6px;">Longitud *</label>
                            <input type="number" step="0.0001" class="agency-lng" data-agency-id="${p.id}" value="${p.lng||""}" placeholder="Ej: -89.2182" style="width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                        </div>
                    </div>

                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; font-size: 13px;">
                        <p style="margin: 0; color: #6b7280;">Puedes obtener las coordenadas buscando la ubicación en <a href="https://www.google.com/maps" target="_blank" style="color: #3b82f6; text-decoration: none;">Google Maps</a>, luego haz clic derecho y selecciona "¿Qué hay aquí?". Las coordenadas aparecerán en la parte inferior.</p>
                    </div>
                </div>
            `).join(""),h=`
            <div class="agencies-map-config-modal" style="font-family: system-ui, -apple-system, sans-serif; background: white; padding: 10px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 24px;">
                    <h2 style="margin: 0; font-size: 22px; font-weight: 600; color: #111827;">Configurar Mapa de Agencias</h2>
                    <div>
                        <button id="export-btn" style="padding: 6px 16px; border: none; background: #4f46e5; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-right: auto;" onmouseover="this.style.background='#4338ca'" onmouseout="this.style.background='#4f46e5'">
                            <span style="display: flex; align-items: center; justify-content: center;"><svg style="width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>Exportar</span>
                        </button>
                        <button id="import-btn" style="padding: 6px 16px; border: none; background: #0891b2; color: white; border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#0e7490'" onmouseout="this.style.background='#0891b2'">
                            <span style="display: flex; align-items: center; justify-content: center;"><svg style="width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Importar</span>
                        </button>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Título del Mapa</label>
                    <input type="text" id="map-title-input" value="${m.mapTitle||"Nuestras Agencias"}" placeholder="Título para la sección de mapa" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#d1d5db'">
                </div>
                
                <div class="modal-body" style="max-height: 60vh; overflow-y: auto; padding-right: 8px;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin-top: 0; margin-bottom: 16px;">Agencias</h3>
                    
                    <div id="agencies-list">
                        ${u()}
                    </div>

                    <button id="add-agency-btn" style="width: 100%; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
                        Agregar Nueva Agencia
                    </button>
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
        `,f=r.Modal;f.setTitle(""),f.setContent(h),f.open({attributes:{class:"agencies-map-modal"}}),setTimeout(()=>{const p=document.querySelector(".gjs-mdl-dialog");p&&(p.style.backgroundColor="white");const g=document.querySelector(".gjs-mdl-header");g&&(g.style.padding="0",g.style.border="none",g.style.display="none");const b=document.querySelector(".gjs-mdl-close");b&&(b.style.display="none")},10);let S=1;o.length>0&&(S=Math.max(...o.map(p=>p.id))+1);const T=()=>{document.getElementById("agencies-list").innerHTML=u(),x()},x=()=>{document.querySelectorAll(".delete-agency-btn").forEach(g=>{g.addEventListener("click",b=>{const E=parseInt(b.target.dataset.agencyId);if(o.length>1){const I=o.findIndex(A=>A.id===E);I!==-1&&(o.splice(I,1),T())}else alert("Debe haber al menos una agencia")})});const p=(g,b)=>{const E=parseInt(g.target.dataset.agencyId),I=o.find(A=>A.id===E);I&&(I[b]=g.target.value)};document.querySelectorAll(".agency-name").forEach(g=>{g.addEventListener("input",b=>p(b,"name"))}),document.querySelectorAll(".agency-address").forEach(g=>{g.addEventListener("input",b=>p(b,"address"))}),document.querySelectorAll(".agency-phone").forEach(g=>{g.addEventListener("input",b=>p(b,"phone"))}),document.querySelectorAll(".agency-lat").forEach(g=>{g.addEventListener("input",b=>p(b,"lat"))}),document.querySelectorAll(".agency-lng").forEach(g=>{g.addEventListener("input",b=>p(b,"lng"))})};setTimeout(()=>{var p,g,b,E,I;x(),(p=document.getElementById("add-agency-btn"))==null||p.addEventListener("click",()=>{o.push({id:S++,name:`Nueva Agencia ${o.length+1}`,address:"",phone:"",lat:s,lng:t}),T()}),(g=document.getElementById("export-btn"))==null||g.addEventListener("click",()=>{const A={mapTitle:document.getElementById("map-title-input").value.trim()||"Nuestras Agencias",agencies:o},j=JSON.stringify(A,null,2),C="data:application/json;charset=utf-8,"+encodeURIComponent(j),w="mapa-agencias-config.json",v=document.createElement("a");v.setAttribute("href",C),v.setAttribute("download",w),v.style.display="none",document.body.appendChild(v),v.click(),document.body.removeChild(v)}),(b=document.getElementById("import-btn"))==null||b.addEventListener("click",()=>{const A=document.createElement("input");A.type="file",A.accept="application/json",A.onchange=j=>{const C=j.target.files[0],w=new FileReader;w.onload=v=>{try{const y=JSON.parse(v.target.result);y&&y.agencies&&Array.isArray(y.agencies)?(y.mapTitle&&(document.getElementById("map-title-input").value=y.mapTitle),y.agencies.length>0?(o.length=0,y.agencies.forEach(k=>{o.push({id:k.id||S++,name:k.name||"",address:k.address||"",phone:k.phone||"",lat:k.lat||s,lng:k.lng||t})}),T(),alert("Configuración importada con éxito")):alert("El archivo no contiene ninguna agencia")):alert("Formato de archivo no válido")}catch(y){alert("Error al procesar el archivo: "+y.message)}},w.readAsText(C)},A.click()}),(E=document.getElementById("save-btn"))==null||E.addEventListener("click",()=>{const A=o.some(v=>!v.name||v.name.trim()===""),j=o.some(v=>!v.lat||!v.lng||isNaN(v.lat)||isNaN(v.lng));if(A){alert("Todas las agencias deben tener un nombre");return}if(j){alert("Todas las agencias deben tener coordenadas válidas");return}const w={mapTitle:document.getElementById("map-title-input").value.trim()||"Nuestras Agencias",agencies:o};n.setConfig(w),f.close()}),(I=document.getElementById("cancel-btn"))==null||I.addEventListener("click",()=>{f.close()})},100)}l.add("agencies-map-block",{label:"Mapa de Agencias",category:"Mapas",content:{type:"agencies-map-component",attributes:{class:"py-10 bg-white","data-gjs-type":"agencies-map-component","data-map-config":JSON.stringify(e)}},media:`<svg viewBox="0 0 32 32" width="32" height="32">
        <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
        <rect x="2" y="2" width="9" height="28" fill="#e9ecef" rx="1"/>
        <rect x="13" y="2" width="17" height="28" fill="#a8dadc" rx="1"/>
        <rect x="14" y="3" width="15" height="26" fill="#ebf4fa" rx="1"/>
        <circle cx="21.5" cy="15" r="4" fill="#f8e7d8" stroke="#e34234" stroke-width="0.7"/>
        <circle cx="21.5" cy="15" r="1" fill="#e34234"/>
        <line x1="3" y1="7" x2="10" y2="7" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="11" x2="10" y2="11" stroke="#23366A" stroke-width="0.8"/>
        <line x1="3" y1="15" x2="10" y2="15" stroke="#23366A" stroke-width="0.8"/>
    </svg>`}),i.on("load",()=>{const r=i.Canvas.getFrameEl();if(r){const n=r.contentDocument.head;if(!n.querySelector("#leaflet-css")){const m=document.createElement("link");m.id="leaflet-css",m.rel="stylesheet",m.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",n.appendChild(m)}if(!n.querySelector("#agencies-map-css")){const m=document.createElement("style");m.id="agencies-map-css",m.innerHTML=`
                    .leaflet-container {
                        height: 100%;
                        width: 100%;
                        border-radius: inherit;
                    }
                    .agency-item {
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    .agency-item:hover {
                        background-color: #f9fafb;
                    }
                `,n.appendChild(m)}}}),i.on("component:selected",r=>{if(r.get("type")==="agencies-map-component"){const n=r.getEl();if(n){const m=n.querySelector(".agencies-map");m&&m._map&&setTimeout(()=>{m._map.invalidateSize()},100)}}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find('[data-gjs-type="agencies-map-component"]').forEach(m=>{m.set("type","agencies-map-component");const o=m.getEl();if(o){const u=m.get("script");u&&typeof u=="function"&&u.call(o)}})},1e3)}),i.on("component:mount",r=>{const n=r.getEl();n&&n.getAttribute&&n.getAttribute("data-gjs-type")==="agencies-map-component"&&(r.set("type","agencies-map-component"),setTimeout(()=>{const m=r.get("script");m&&typeof m=="function"&&m.call(n)},500))}),i.on("component:clone",r=>{if(r.get("type")==="agencies-map-component"){const n=r.getEl();if(n){const m=n.querySelector(".agencies-map");m&&m._map&&(m._map.remove(),delete m._map),setTimeout(()=>{const o=r.get("script");o&&typeof o=="function"&&o.call(n)},500)}}}),i.on("canvas:render",()=>{setTimeout(()=>{i.getWrapper().find('[data-gjs-type="agencies-map-component"]').forEach(m=>{m.set("type","agencies-map-component");const o=m.getEl();if(o&&o.isConnected){const u=m.get("script");u&&typeof u=="function"&&u.call(o)}})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find('[data-gjs-type="agencies-map-component"]').forEach(m=>{m.set("type","agencies-map-component"),m.addAttributes({"data-gjs-type":"agencies-map-component"});const o=m.getConfig();m.addAttributes({"data-map-config":JSON.stringify(o)})})})}function wt(i){const l=i.BlockManager;i.on("load",()=>{const r=i.Canvas.getFrameEl();if(r&&r.contentDocument){const n=r.contentDocument.createElement("style");n.textContent=`
              .text-primary { color: #23366A !important; }
              .text-secondary { color: #333333 !important; }
          `,r.contentDocument.head.appendChild(n)}}),l.add("text-centered-full",{label:"Texto Centrado Completo",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="6" y="4" width="12" height="2" fill="#23366A"/>
      <rect x="8" y="7" width="8" height="1" fill="#555"/>
      <rect x="4" y="10" width="16" height="1" fill="#888"/>
      <rect x="4" y="12" width="16" height="1" fill="#888"/>
    </svg>`,content:`
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4 text-center">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">Título Principal</h2>
              <h3 class="text-secondary text-xl md:text-2xl font-semibold mb-4">Subtítulo</h3>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
          </div>
          `}),l.add("text-centered-no-subtitle",{label:"Texto Centrado Sin Subtítulo",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="6" y="5" width="12" height="2" fill="#23366A"/>
      <rect x="4" y="10" width="16" height="1" fill="#888"/>
      <rect x="4" y="12" width="16" height="1" fill="#888"/>
    </svg>`,content:`
          <div class="py-4">
            <div class="max-w-7xl mx-auto px-4 text-center">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Título Principal</h2>
              <p class="text-gray-600 text-base md:text-lg leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.</p>
            </div>
          </div>
          `}),l.add("text-two-cols-left",{label:"Texto 2 Columnas Izq",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
          `}),l.add("text-two-cols-left-no-subtitle",{label:"Texto 2 Columnas Izq Sin Sub",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
          `}),l.add("text-two-cols-right",{label:"Texto 2 Columnas Der",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
          `}),l.add("text-two-cols-right-no-subtitle",{label:"Texto 2 Columnas Der Sin Sub",category:"Texto",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
          `})}function Ct(i){const l=i.BlockManager;i.on("load",()=>{const s=i.Canvas.getFrameEl();if(s&&s.contentDocument){const t=s.contentDocument.createElement("style");t.textContent=`
              .text-primary { color: #23366A !important; }
              .bg-primary { background-color: #23366A !important; }
            `,s.contentDocument.head.appendChild(t)}}),l.add("basic-image",{label:"Imagen Básica",category:"Basic",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="3" width="20" height="18" rx="2" fill="#23366A"/>
            <rect x="6" y="7" width="12" height="10" rx="1" fill="white"/>
        </svg>`,content:`
        <div class="py-8">
          <div class="max-w-7xl mx-auto px-4">
            <img src="https://via.placeholder.com/800x500/cccccc/666666?text=Imagen" alt="Imagen" class="w-full h-64 md:h-80 object-cover rounded-2xl">
          </div>
        </div>
        `}),l.add("image-cols-equal",{label:"2 Imágenes Iguales",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("image-cols-equal-button",{label:"2 Imágenes Iguales con Botón",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("image-cols-left-wide",{label:"Imagen Izq Grande",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("image-cols-left-wide-button",{label:"Imagen Izq Grande con Botón",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("image-cols-right-wide",{label:"Imagen Der Grande",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("image-cols-right-wide-button",{label:"Imagen Der Grande con Botón",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("image-mixed-columns",{label:"Imágenes Mixtas",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("image-left-small-play",{label:"Izq Pequeña con Botón Play",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("image-right-small-play",{label:"Der Pequeña con Botón Play",category:"Imagenes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `})}function At(i){const l=i.BlockManager;i.on("load",()=>{const T=i.Canvas.getFrameEl();if(T&&T.contentDocument){const x=T.contentDocument.createElement("style");x.textContent=`
              .bg-primary { background-color: #23366A !important; }
              .text-primary { color: #23366A !important; }
              .text-secondary { color: #333333 !important; }
              .border-primary { border-color: #23366A !important; }
              .hover\\:bg-primary:hover { background-color: #23366A !important; }
              .hover\\:text-white:hover { color: #ffffff !important; }
          `,T.contentDocument.head.appendChild(x)}}),l.add("section-asymmetric-images",{label:"Sección con Imágenes Mixtas",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-left-full",{label:"Seccion Completa Izq",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-left-no-button",{label:"Seccion Izq Sin Botón",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-left-no-subtitle",{label:"Seccion Izq Sin Subtítulo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-left-minimal",{label:"Seccion Izq Mínimo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-right-full",{label:"Seccion Completa Der",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-right-no-button",{label:"Seccion Der Sin Botón",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-right-no-subtitle",{label:"Seccion Der Sin Subtítulo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-right-minimal",{label:"Seccion Der Mínimo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-vertical-full",{label:"Seccion Vertical Completa",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="6" y="5" width="12" height="1" fill="#666"/>
    <rect x="4" y="7" width="16" height="1" fill="#999"/>
    <rect x="2" y="9" width="20" height="10" rx="1" fill="#23366A"/>
    <rect x="9" y="20" width="6" height="2" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
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
        `}),l.add("hero-vertical-no-button",{label:"Seccion Vertical Sin Botón",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="6" y="5" width="12" height="1" fill="#666"/>
    <rect x="4" y="7" width="16" height="1" fill="#999"/>
    <rect x="2" y="9" width="20" height="12" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
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
        `}),l.add("hero-vertical-no-subtitle",{label:"Seccion Vertical Sin Subtítulo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="4" y="5" width="16" height="1" fill="#999"/>
    <rect x="2" y="7" width="20" height="12" rx="1" fill="#23366A"/>
    <rect x="9" y="20" width="6" height="2" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
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
        `}),l.add("hero-vertical-minimal",{label:"Seccion Vertical Mínimo",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="2" fill="#333"/>
    <rect x="4" y="5" width="16" height="1" fill="#999"/>
    <rect x="2" y="7" width="20" height="15" rx="1" fill="#23366A"/>
    </svg>`,content:`
        <section class="py-8 md:py-14 bg-white">
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
        `}),l.add("hero-two-columns-full",{label:"Dos Columnas Completas",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),l.add("hero-two-columns-no-button",{label:"Dos Columnas Sin Botón",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),l.add("hero-two-columns-no-paragraph",{label:"Dos Columnas Sin Párrafo",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),l.add("hero-two-columns-minimal",{label:"Dos Columnas Mínimo",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),l.add("hero-two-columns-with-list",{label:"Dos Columnas con Lista",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),l.add("hero-two-columns-overlay-buttons",{label:"Dos Columnas con Botón sobre Imagen",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),l.add("hero-two-columns-minimal",{label:"Dos Columnas Mínimo",category:"Columnas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-left-credit-card",{label:"Tarjeta con boton Izquierda",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),l.add("hero-right-credit-card",{label:"Tarjeta con boton Derecha",category:"Secciones",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `})}function kt(i){const l=`<svg viewBox="0 0 32 32" width="32" height="32">
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
    </svg>`,s=`.main-banner-carousel-wrapper {
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
        }`,t=function(){var e=this;if(!e||e.hasAttribute("data-banner-initialized"))return;var a=e.querySelector(".main-banner-carousel-track"),d=e.querySelector(".main-banner-dots");if(!a||!d)return;e.setAttribute("data-banner-initialized","true");var c=0,r,n=0,m=0,o=!1,u=e.getAttribute("data-api-endpoint")||"/api/banners/active",h=e.getAttribute("data-filter-category")||"all";fetch(u).then(function(A){return A.json()}).then(function(A){var j=A;if(h.trim()!==""&&h!=="all"&&(j=A.filter(function(w){var v=w.category&&w.category.toLowerCase().trim()===h.toLowerCase().trim();return v})),j&&j.length>0)f(j);else{var C=h!=="all"?'No hay banners disponibles para la categoría "'+h+'"':"No hay banners disponibles";a.innerHTML='<div class="flex items-center justify-center w-full h-full"><div class="text-center text-gray-600"><p class="text-xl">'+C+"</p></div></div>"}}).catch(function(A){console.error("Error fetching banners:",A),a.innerHTML='<div class="flex items-center justify-center w-full h-full"><div class="text-center text-gray-600"><p class="text-xl">Error al cargar los banners</p></div></div>'});function f(A){a.innerHTML="",d.innerHTML="",A.forEach(function(j,C){var w=document.createElement("div");w.className="main-banner-carousel-slide",w.style.backgroundImage="linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("+j.image_url+")";var v=j.show_category&&j.category?'<div class="mb-3"><span class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border-2 border-white/30">'+j.category+"</span></div>":"",y=j.show_description&&j.description?'<p class="text-sm md:text-base lg:text-xl mb-4 drop-shadow-lg">'+j.description+"</p>":"",k=j.show_primary_button&&j.primary_button_text?'<a href="'+(j.primary_button_url||"#")+'" class="main-banner-primary-btn text-sm md:text-base font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 inline-flex items-center shadow-xl">'+j.primary_button_text+'<i class="ri-arrow-right-line ml-2"></i></a>':"",B=j.show_secondary_button&&j.secondary_button_text?'<a href="'+(j.secondary_button_url||"#")+'" class="main-banner-secondary-btn text-white text-sm md:text-base font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 inline-flex items-center">'+j.secondary_button_text+"</a>":"";w.innerHTML='<div class="absolute inset-0 flex items-center justify-center p-6 md:p-8 lg:p-12"><div class="text-left text-white max-w-3xl w-full"><div class="max-w-full space-y-3 md:space-y-4">'+v+'<h2 class="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight drop-shadow-2xl">'+j.title+"</h2>"+y+'<div class="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-6">'+k+B+"</div></div></div></div>",a.appendChild(w);var $=document.createElement("button");$.className="main-banner-dot",$.setAttribute("type","button"),$.setAttribute("aria-label","Ir al banner "+(C+1)),function(z){$.addEventListener("click",function(){p(z)})}(C),d.appendChild($)}),x(),E(),S()}function S(){e.addEventListener("touchstart",function(A){n=A.touches[0].clientX,m=n,o=!0,clearInterval(r)},{passive:!0}),e.addEventListener("touchmove",function(A){o&&(m=A.touches[0].clientX)},{passive:!0}),e.addEventListener("touchend",T),e.addEventListener("mousedown",function(A){n=A.clientX,m=n,o=!0,clearInterval(r),A.preventDefault()}),e.addEventListener("mousemove",function(A){o&&(m=A.clientX)}),e.addEventListener("mouseup",T),e.addEventListener("mouseleave",T)}function T(){if(o){o=!1;var A=n-m;Math.abs(A)>50&&(A>0?g():b()),I()}}function x(){var A=a.querySelectorAll(".main-banner-carousel-slide"),j=d.querySelectorAll(".main-banner-dot"),C=A.length;if(C!==0){for(var w=0;w<A.length;w++)A[w].classList.remove("active","prev","next"),w===c?A[w].classList.add("active"):w===(c-1+C)%C?A[w].classList.add("prev"):w===(c+1)%C&&A[w].classList.add("next");for(var v=0;v<j.length;v++)j[v].classList[v===c?"add":"remove"]("active")}}function p(A){var j=a.querySelectorAll(".main-banner-carousel-slide");j.length&&(c=(A+j.length)%j.length,x(),I())}function g(){var A=a.querySelectorAll(".main-banner-carousel-slide");A.length!==0&&(c=(c+1)%A.length,x())}function b(){var A=a.querySelectorAll(".main-banner-carousel-slide");A.length!==0&&(c=(c-1+A.length)%A.length,x())}function E(){clearInterval(r),r=setInterval(g,5e3)}function I(){clearInterval(r),E()}};i.DomComponents.addType("main-banner-style",{isComponent:e=>{if(e.tagName==="STYLE"){const a=e.parentElement;if(a&&a.getAttribute("data-gjs-type")==="main-banner-carousel")return{type:"main-banner-style"}}return!1},model:{defaults:{tagName:"style",removable:!1,draggable:!1,copyable:!1,highlightable:!1,selectable:!1,hoverable:!1,editable:!1,layerable:!1,void:!1,attributes:{"data-gjs-type":"main-banner-style"},content:s},toHTML(){return`<style>${s}</style>`}}}),i.DomComponents.addType("main-banner-carousel",{isComponent:function(e){return e.getAttribute&&e.getAttribute("data-gjs-type")==="main-banner-carousel"},model:{defaults:{tagName:"section",name:"Banner Principal",droppable:!1,attributes:{"data-gjs-type":"main-banner-carousel",class:"main-banner-carousel-wrapper relative w-full h-96 pt-4 mt-4 md:h-[500px] overflow-hidden bg-white","data-api-endpoint":"/api/banners/active","data-filter-category":"all"},traits:[{type:"text",name:"data-api-endpoint",label:"API Endpoint",placeholder:"/api/banners/active"},{type:"select",name:"data-filter-category",label:"Filtrar por Categoría",options:[{value:"all",name:"Todas las categorías"}]}],components:[{type:"main-banner-style"},{tagName:"div",attributes:{class:"main-banner-carousel-track flex items-center h-full"},components:[{tagName:"div",attributes:{class:"flex items-center justify-center w-full h-full"},components:[{tagName:"div",attributes:{class:"w-full max-w-4xl px-4"},components:[{tagName:"div",attributes:{class:"rounded-xl bg-gray-200 animate-pulse h-96 md:h-[450px] w-full"}},{tagName:"div",attributes:{class:"flex justify-center mt-4 space-x-3"},components:[{tagName:"div",attributes:{class:"w-3 h-3 rounded-full bg-gray-300 animate-pulse"}},{tagName:"div",attributes:{class:"w-3 h-3 rounded-full bg-gray-300 animate-pulse"}},{tagName:"div",attributes:{class:"w-3 h-3 rounded-full bg-gray-300 animate-pulse"}}]}]}]}]},{tagName:"div",attributes:{class:"main-banner-dots absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-3 z-50"}}],script:t,"script-props":["data-api-endpoint","data-filter-category"]},init(){this.on("change:attributes:data-filter-category",this.handleCategoryChange),this.on("change:attributes",this.onAttributeChange),this.loadCategories(),this.ensureStyleComponent()},onAttributeChange(){this.getAttributes()["data-filter-category"]!==void 0&&this.handleCategoryChange()},ensureStyleComponent(){const e=this.components();e.find(d=>d.get("type")==="main-banner-style")||e.add({type:"main-banner-style"},{at:0})},loadCategories(){const e=this;fetch("/api/banners/categories").then(a=>a.json()).then(a=>{const d=e.getTrait("data-filter-category");if(d){const c=[{value:"all",name:"Todas las categorías"},...a.map(r=>({value:r,name:r}))];d.set("options",c)}}).catch(a=>{console.error("Error loading categories:",a)})},handleCategoryChange(){console.log("Category changed!");const e=this.view;if(!e||!e.el){console.log("No view or element found");return}const a=e.el,d=this.getAttributes()["data-filter-category"];console.log("New category:",d);const c=a.querySelector(".main-banner-dots");c&&(c.innerHTML=""),a.removeAttribute("data-banner-initialized");const r=a.querySelector(".main-banner-carousel-track");r&&(r.innerHTML='<div class="flex items-center justify-center w-full h-full"><div class="w-full max-w-4xl px-4"><div class="rounded-xl bg-gray-200 animate-pulse h-96 md:h-[450px] w-full"></div><div class="flex justify-center mt-4 space-x-3"><div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div><div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div><div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div></div></div></div>'),setTimeout(()=>{console.log("Reinitializing banner with category:",d),typeof t=="function"&&t.call(a)},500)}},view:{onRender(){const e=this.el,a=this.model;e&&(a.ensureStyleComponent(),setTimeout(()=>{typeof t=="function"&&t.call(e)},500))}}}),i.on("load",()=>{const e=i.Canvas.getFrameEl();if(e&&e.contentDocument){let a=e.contentDocument.getElementById("main-banner-styles");a||(a=e.contentDocument.createElement("style"),a.id="main-banner-styles",a.innerHTML=s,e.contentDocument.head.appendChild(a))}}),i.on("canvas:render",()=>{const e=i.Canvas.getFrameEl();if(e&&e.contentDocument){let a=e.contentDocument.getElementById("main-banner-styles");a||(a=e.contentDocument.createElement("style"),a.id="main-banner-styles",a.innerHTML=s,e.contentDocument.head.appendChild(a))}}),i.BlockManager.add("main-banner-carousel",{label:"Banner Principal",category:"Banners",attributes:{class:"gjs-block-section"},media:l,content:{type:"main-banner-carousel"}}),i.on("component:add",function(e){e.get("type")==="main-banner-carousel"&&(e.ensureStyleComponent(),setTimeout(()=>{var d;const a=(d=e.view)==null?void 0:d.el;a&&!a.hasAttribute("data-banner-initialized")&&t.call(a)},800))}),i.on("canvas:load",function(){setTimeout(()=>{const e=i.Canvas.getFrameEl();if(e&&e.contentDocument){let a=e.contentDocument.getElementById("main-banner-styles");a||(a=e.contentDocument.createElement("style"),a.id="main-banner-styles",a.innerHTML=s,e.contentDocument.head.appendChild(a)),e.contentDocument.querySelectorAll('[data-gjs-type="main-banner-carousel"]').forEach(c=>{c.hasAttribute("data-banner-initialized")||t.call(c)})}},1200)}),i.on("component:update",function(e){e.get("type")==="main-banner-carousel"&&e.ensureStyleComponent()})}function St(i){const l="banner-slider",s="banner-slider-component",t={slides:[{id:1,image:"",title:"Primer Slide",subtitle:"Descripción opcional del primer slide"}],autoplay:!0,interval:5e3},e=c=>{const r=c.slides.map((m,o)=>`
                <div class="banner-slide" data-slide-index="${o}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('${m.image||""}'); background-size: cover; background-position: center; display: ${o===0?"flex":"none"}; align-items: flex-end; padding: 2rem; border-radius: 1rem; ${m.image?"":"background-color: #f3f4f6;"}">
                    <div style="background-color: rgba(255, 255, 255, 0.85); padding: 0.25rem 1rem; border-radius: 0.5rem; backdrop-filter: blur(4px); max-width: 80%;">
                    <h2 style="color: #23366A; font-size: 2.5rem; font-weight: bold; margin: 0;">${m.title}</h2>
                    ${m.subtitle?`<p style="color: #374151; font-size: 1.125rem; margin-top: -8px; margin-bottom: 0.5rem;">${m.subtitle}</p>`:""}
                    </div>
                </div>
                `).join(""),n=c.slides.length>1?c.slides.map((m,o)=>`
                            <button class="banner-dot ${o===0?"active":""}" data-index="${o}" aria-label="Ir a slide ${o+1}"></button>
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
                    ${r}
                </div>
                </div>
                ${c.slides.length>1?`
                <div class="banner-dots-container" style="display: flex; justify-content: center; margin-top: -1rem; margin-bottom: 1rem;">
                    ${n}
                </div>
                `:""}
            </div>
            `};i.DomComponents.addType(s,{isComponent:c=>{if(c.getAttribute&&c.getAttribute("data-gjs-type")===s)return{type:s}},model:{defaults:{tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!0,resizable:!1,attributes:{class:"py-8 md:py-14 bg-white","data-gjs-type":s,"data-slider-config":JSON.stringify(t)},traits:[{type:"button",label:!1,text:"Configurar Slider",full:!0,command:c=>{const r=c.getSelected();r&&d(c,r)}}],components:c=>{const r=c.getAttributes()["data-slider-config"];let n={...t};if(r)try{n={...t,...JSON.parse(r)}}catch(m){console.error("Error parsing slider config:",m)}return e(n)},script:function(){const c=()=>{const r=this,n=r.getAttribute("data-slider-config");let m={slides:[{id:1,image:"",title:"Primer Slide",subtitle:"Descripción opcional del primer slide"}],autoplay:!0,interval:5e3};if(n)try{m=JSON.parse(n)}catch(y){console.error("Error parsing config:",y)}const o=r.querySelector(".banner-slides-container");if(!o)return;const u=o.querySelectorAll(".banner-slide"),h=r.querySelectorAll(".banner-dot"),f=u.length;let S=0,T=null,x=0,p=0;function g(y){T&&clearInterval(T),u.forEach(k=>{k.classList.remove("active","fadeIn"),k.classList.add("fadeOut"),setTimeout(()=>{k.style.display="none"},500)}),h.forEach(k=>{k.classList.remove("active")}),setTimeout(()=>{u[y].style.display="flex",u[y].classList.remove("fadeOut"),u[y].classList.add("active","fadeIn"),h[y]&&h[y].classList.add("active"),S=y,f>1&&m.autoplay&&I()},500)}function b(){const y=(S+1)%f;g(y)}function E(){const y=(S-1+f)%f;g(y)}function I(){T=setInterval(()=>{b()},m.interval)}h.forEach((y,k)=>{y.addEventListener("click",()=>{g(k)})});const A=y=>{x=y.touches[0].clientX},j=y=>{p=y.touches[0].clientX},C=()=>{if(!x||!p)return;const y=x-p;Math.abs(y)>50&&(y>0?b():E()),x=0,p=0};o.addEventListener("touchstart",A,{passive:!0}),o.addEventListener("touchmove",j,{passive:!0}),o.addEventListener("touchend",C);let w=!1,v=0;o.addEventListener("mousedown",y=>{w=!0,v=y.pageX}),o.addEventListener("mousemove",y=>{w&&y.preventDefault()}),o.addEventListener("mouseup",y=>{if(!w)return;w=!1;const k=v-y.pageX;Math.abs(k)>50&&(k>0?b():E())}),o.addEventListener("mouseleave",()=>{w=!1}),f>1&&m.autoplay&&I()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c()}},init(){this.set("type",s),this.addAttributes({"data-gjs-type":s})},getConfig(){const c=this.getAttributes()["data-slider-config"];if(c)try{return{...t,...JSON.parse(c)}}catch(r){console.error("Error parsing slider config:",r)}return{...t}},setConfig(c){const r={...this.getConfig(),...c},n={...this.getAttributes(),"data-gjs-type":s,"data-slider-config":JSON.stringify(r)};this.setAttributes(n),this.components(e(r)),this.view.render()}}}),i.BlockManager.add(l,{label:"Banner Slider",category:"Banners",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
  </svg>`,content:{type:s,attributes:{class:"py-8 md:py-14 bg-white","data-gjs-type":s,"data-slider-config":JSON.stringify(t)}}});function d(c,r){const n=r.getConfig(),m=x=>x.map((p,g)=>`
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
                    `).join(""),o=`
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
            `,u=c.Modal;u.setTitle(""),u.setContent(o),u.open({attributes:{class:"banner-slider-modal"}}),setTimeout(()=>{const x=document.querySelector(".gjs-mdl-dialog");x&&(x.style.backgroundColor="white");const p=document.querySelector(".gjs-mdl-header");p&&(p.style.padding="0",p.style.border="none",p.style.display="none");const g=document.querySelector(".gjs-mdl-close");g&&(g.style.display="none")},10);let h=JSON.parse(JSON.stringify(n.slides)),f=Math.max(...h.map(x=>x.id))+1;const S=()=>{document.getElementById("slides-list").innerHTML=m(h),T()},T=()=>{document.querySelectorAll(".delete-slide-btn").forEach(x=>{x.addEventListener("click",p=>{const g=parseInt(p.target.dataset.slideId);h.length>1?(h=h.filter(b=>b.id!==g),S()):alert("Debe haber al menos un slide")})}),document.querySelectorAll(".change-image-btn").forEach(x=>{x.addEventListener("click",p=>{const g=parseInt(p.target.dataset.slideId);V("image",b=>{const E=h.find(I=>I.id===g);E&&(E.image=b.src,S())})})}),document.querySelectorAll(".slide-title").forEach(x=>{x.addEventListener("input",p=>{const g=parseInt(p.target.dataset.slideId),b=h.find(E=>E.id===g);b&&(b.title=p.target.value)})}),document.querySelectorAll(".slide-subtitle").forEach(x=>{x.addEventListener("input",p=>{const g=parseInt(p.target.dataset.slideId),b=h.find(E=>E.id===g);b&&(b.subtitle=p.target.value)})})};setTimeout(()=>{var x,p,g;T(),(x=document.getElementById("add-slide-btn"))==null||x.addEventListener("click",()=>{h.push({id:f++,image:"",title:`Slide ${h.length+1}`,subtitle:""}),S()}),(p=document.getElementById("save-btn"))==null||p.addEventListener("click",()=>{if(h.some(I=>!I.title.trim())){alert("Todos los slides deben tener un título");return}const E={slides:h,autoplay:document.getElementById("autoplay-checkbox").checked,interval:5e3};r.setConfig(E),u.close()}),(g=document.getElementById("cancel-btn"))==null||g.addEventListener("click",()=>{u.close()})},100)}}function Et(i){const l=`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="12" height="2" fill="white" />
      <rect x="4" y="7" width="16" height="1" fill="#cccccc" />
      <rect x="4" y="10" width="6" height="2" rx="1" fill="#ffffff" stroke="#23366A" stroke-width="1" />
      <rect x="11" y="10" width="6" height="2" rx="1" fill="#23366A" />
      <rect x="4" y="14" width="10" height="1" fill="white" />
      <rect x="4" y="16" width="8" height="1" fill="white" />
      <rect x="4" y="18" width="12" height="1" fill="white" />
    </svg>`,s=(t=5)=>{const e=["auto","vida","inmueble","equipo","atencion","tab6","tab7","tab8","tab9","tab10"],a=["Seguro de auto","Segura vida+","Seguro de inmueble","Seguro de equipo","Atención segura+","Tab adicional 1","Tab adicional 2","Tab adicional 3","Tab adicional 4","Tab adicional 5"];let d="",c="";for(let r=0;r<t&&r<10;r++){const n=r===0,m=e[r],o=a[r];d+=`
                <button class="insurance-tab-btn ${n?"bg-primary text-white":"bg-white text-primary"} py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300" data-type="${m}">
                    <span data-gjs-type="text" class="tab-button-text">${o}</span>
                </button>
            `,c+=`
                <div class="insurance-panel-group ${n?"":"hidden"}" data-type="${m}">
                    <div class="flex flex-col md:flex-row gap-8 items-center py-8">
                        <div class="w-full md:w-1/3">
                            <img src="https://via.placeholder.com/500x700/f8f9fa/666666?text=${o.replace(/ /g,"+")}" class="max-h-[500px] w-auto mx-auto object-cover rounded-lg" alt="${o}">
                        </div>
                        <div class="w-full md:w-2/3">
                            <h2 class="text-4xl font-bold text-primary mb-2">${o}</h2>
                            <h3 class="text-2xl font-semibold text-primary italic mb-4">Subtítulo de ${o}</h3>
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
            `}return{tabButtons:d,tabPanels:c}};i.BlockManager.add("insurance-tabs-block",{label:"Tipos de Seguro",category:"Seguros",attributes:{class:"gjs-block-section"},media:l,content:{type:"insurance-tabs",activeTab:"auto",tabCount:5}}),i.DomComponents.addType("insurance-tabs",{isComponent:function(t){return t.getAttribute&&t.getAttribute("data-gjs-type")==="insurance-tabs"},model:{defaults:{tagName:"section",draggable:!0,droppable:!0,attributes:{"data-gjs-type":"insurance-tabs",class:"insurance-tabs-container py-8 md:py-12 bg-white"},name:"Tipos de Seguro",traits:[{type:"select",name:"data-active",label:"Tab activo inicial",options:[{id:"auto",name:"Tab 1"},{id:"vida",name:"Tab 2"},{id:"inmueble",name:"Tab 3"},{id:"equipo",name:"Tab 4"},{id:"atencion",name:"Tab 5"},{id:"tab6",name:"Tab 6"},{id:"tab7",name:"Tab 7"},{id:"tab8",name:"Tab 8"},{id:"tab9",name:"Tab 9"},{id:"tab10",name:"Tab 10"}],default:"auto"},{type:"number",name:"tab-count",label:"Número de tabs",min:1,max:10,default:5,changeProp:!0}],"tab-count":5,script:function(){const t=this;if(!t.hasAttribute("data-initialized")){const e=t.querySelectorAll(".insurance-tab-btn"),a=t.querySelectorAll(".insurance-panel-group"),d=t.getAttribute("data-active")||"auto",c=typeof window.grapesjs<"u"||document.body.classList.contains("gjs-dmode")||window.location.href.includes("/editor/");e.forEach(n=>{n.addEventListener("click",function(m){if(c&&m.target.classList.contains("tab-button-text"))return;const o=this.getAttribute("data-type");e.forEach(u=>{u===this?(u.classList.remove("bg-white","text-primary"),u.classList.add("bg-primary","text-white")):(u.classList.remove("bg-primary","text-white"),u.classList.add("bg-white","text-primary"))}),a.forEach(u=>{u.getAttribute("data-type")===o?u.classList.remove("hidden"):u.classList.add("hidden")})})});const r=Array.from(e).find(n=>n.getAttribute("data-type")===d);r?r.click():e.length>0&&e[0].click(),t.setAttribute("data-initialized","true")}}},init(){this.on("change:tab-count",this.updateTabCount),this.on("change:attributes:data-active",this.updateActiveTab)},updateTabCount(){const t=this.get("tab-count");if(!t||t<1||t>10)return;const{tabButtons:e,tabPanels:a}=s(t),d=this.components();d.reset(),d.add(`
                    <div class="max-w-7xl mx-auto px-4">
                        <div class="insurance-tabs mb-6 flex flex-wrap gap-3">
                            ${e}
                        </div>
                        <div class="insurance-panels">
                            ${a}
                        </div>
                    </div>
                `),this.trigger("change:script")},updateActiveTab(){this.trigger("change:script")}},view:{init(){this.model.components().length===0&&this.model.updateTabCount()},onRender(){const t=this.model.get("script");t&&setTimeout(()=>{t.call(this.el)},100)}}}),i.BlockManager.add("insurance-image-text-section",{label:"Imagen con Texto Seguro",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),i.BlockManager.add("insurance-image-text-badge",{label:"Imagen con Texto y Badge",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),i.BlockManager.add("insurance-horizontal-basic",{label:"Imagen Horizontal con Texto",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),i.BlockManager.add("insurance-horizontal-badge",{label:"Imagen Horizontal con Badge",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),i.BlockManager.add("insurance-horizontal-list",{label:"Imagen Horizontal con Lista",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),i.BlockManager.add("insurance-two-columns-list",{label:"Dos Columnas Listas Seguros",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),i.BlockManager.add("insurance-divider",{label:"Separador Seguros",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="11" width="20" height="2" rx="1" fill="#dddddd"/>
        </svg>`,content:'<div class="w-full h-0.5 bg-primary my-8"></div>'}),i.BlockManager.add("insurance-feature-card",{label:"Tarjeta de Característica",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),i.BlockManager.add("insurance-cta",{label:"Llamado a la Acción Seguros",category:"Seguros",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `})}function Tt(i){const l=`<svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="10" width="4" height="4" rx="0.5" fill="#23366A" />
        
        <path d="M7,11 L8,12 L7,13" stroke="#666" stroke-width="1" fill="none" />
        
        <rect x="9" y="10" width="4" height="4" rx="0.5" fill="#23366A" />

        <path d="M14,11 L15,12 L14,13" stroke="#666" stroke-width="1" fill="none" />
        
        <rect x="16" y="10" width="6" height="4" rx="0.5" fill="#23366A" />
        </svg>`;i.DomComponents.addType("breadcrumb",{isComponent:function(s){return s.getAttribute&&s.getAttribute("data-gjs-type")==="breadcrumb"},extend:"div",priority:10,model:{defaults:{tagName:"nav",droppable:!1,attributes:{"data-gjs-type":"breadcrumb",class:"py-4 bg-white","data-item-count":"3","data-item-1-text":"Inicio","data-item-1-link":"/","data-item-1-active":"","data-item-2-text":"Pagina 1","data-item-2-link":"#","data-item-2-active":"","data-item-3-text":"Pagina 2","data-item-3-link":"#","data-item-3-active":"true"},name:"Breadcrumb",traits:[],script:function(){if(window.grapesjs||document.querySelector(".gjs-frame"))return;this.querySelectorAll(".breadcrumb-item").forEach(e=>{if(e.classList.contains("active")){const a=e.querySelector("a");a&&a.addEventListener("click",d=>{d.preventDefault()})}})}},init(){this._updating=!1,this.normalizeAttributes(),this.buildTraits(),this.updateItems(),this.on("change:attributes",this.onAttributesChange)},normalizeAttributes(){const s=this.getAttributes(),t=parseInt(s["data-item-count"])||3,e={};s["data-item-count"]||(e["data-item-count"]="3");for(let a=1;a<=t;a++)s[`data-item-${a}-text`]||(e[`data-item-${a}-text`]=a===1?"Inicio":a===t?"Pagina actual":`Pagina ${a}`),s[`data-item-${a}-link`]||(e[`data-item-${a}-link`]=a===1?"/":a===t?"#":`/page-${a}`),s[`data-item-${a}-active`]===void 0&&(e[`data-item-${a}-active`]=a===t?"true":"");Object.keys(e).length>0&&this.addAttributes(e)},onAttributesChange(){var d;if(this._updating)return;const s=this.getAttributes(),t=((d=this.changed)==null?void 0:d.attributes)||{};if(Object.keys(t).filter(c=>c.startsWith("data-item-")).length===0)return;if(t.hasOwnProperty("data-item-count")){const c=parseInt(s["data-item-count"])||3,r=this._lastCount||3;if(c!==r){if(this._lastCount=c,c>r){const n={};for(let m=r+1;m<=c;m++){const o=m===c;n[`data-item-${m}-text`]=o?"Pagina actual":`Pagina ${m}`,n[`data-item-${m}-link`]=o?"#":`/page-${m}`,n[`data-item-${m}-active`]=o?"true":""}this._updating=!0,this.addAttributes(n),this._updating=!1}this.buildTraits()}}this.updateItems()},buildTraits(){const s=this.getAttributes(),t=parseInt(s["data-item-count"])||3;this._lastCount=t;const e=[{type:"number",name:"data-item-count",label:"Number of items",min:1,max:10}];for(let a=1;a<=t;a++)e.push({type:"text",name:`data-item-${a}-text`,label:`Item ${a} Text`},{type:"text",name:`data-item-${a}-link`,label:`Item ${a} Link`},{type:"checkbox",name:`data-item-${a}-active`,label:`Item ${a} Is Current`,valueTrue:"true",valueFalse:""});this.set("traits",e)},updateItems(){var a;const s=this.getAttributes(),t=parseInt(s["data-item-count"])||3;let e=`<div class="max-w-7xl mx-auto px-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-container">
                        <ol class="breadcrumb flex items-center flex-wrap text-sm">`;for(let d=1;d<=t;d++){const c=s[`data-item-${d}-text`]||`Item ${d}`,r=s[`data-item-${d}-link`]||"#",n=s[`data-item-${d}-active`],m=n==="true"||n===!0;e+=`<li class="breadcrumb-item${m?" active":""}"${m?' aria-current="page"':""}>
                                <a href="${r}" class="${m?"text-primary font-semibold":"text-gray-500 hover:text-primary hover:underline"}">${c}</a>
                            </li>`,d<t&&(e+=`<li class="breadcrumb-separator">
                                <i class="ri-arrow-right-s-line text-gray-500"></i>
                            </li>`)}e+=`</ol>
                        </nav>
                    </div>`,this.components(e),(a=this.view)==null||a.render()}},view:{init(){this.listenTo(this.model,"change:components",this.render)}}}),i.BlockManager.add("breadcrumb-block",{label:"Ruta de Navegación",category:"Botones",attributes:{class:"gjs-block-section"},media:l,content:{type:"breadcrumb"}}),i.on("load",()=>{const s=i.Canvas.getFrameEl();if(s&&s.contentDocument){const t=s.contentDocument.createElement("style");t.textContent=`
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
            `,s.contentDocument.head.appendChild(t)}})}function Lt(i){const l=i.BlockManager;fetch("/api/custom-blocks/active").then(t=>t.json()).then(t=>{t.forEach(e=>{s(i,e)})}).catch(t=>{console.error("Error loading custom blocks:",t)});function s(t,e){l.add(`custom-block-${e.id}`,{label:e.name,category:e.category,content:{type:`custom-block-type-${e.id}`,content:e.html_content,attributes:{"data-custom-block-id":e.id,"data-custom-block":"true"}},media:e.icon_type==="remix"?`<i class="ri-${e.icon} text-2xl text-primary"></i>`:`<img src="${e.icon}" alt="${e.name}" class="w-6 h-6">`});const a=(d,c)=>{if(e.admin_js&&e.admin_js.trim()!=="")try{new Function("editor","model","Swal",e.admin_js)(d,c,window.Swal)}catch(r){console.error(`Error executing admin JavaScript for block ${e.id}:`,r)}};t.DomComponents.addType(`custom-block-type-${e.id}`,{isComponent:d=>{if(!d)return!1;if(d.getAttribute&&(d.getAttribute("data-custom-block-id")===String(e.id)||d.getAttribute("data-custom-block")==="true"))return!0;if(typeof d.outerHTML=="string")try{const c=e.html_content.trim().replace(/\s+/g," ");return d.outerHTML.trim().replace(/\s+/g," ").includes(c)}catch{return!1}return!1},model:{defaults:{name:e.name,tagName:"div",attributes:{"data-custom-block-id":e.id,"data-custom-block":"true"},traits:[]},init(){const d=this;if(this.on("change:attributes",this.handleAttrChange),e.settings)try{const c=typeof e.settings=="string"?JSON.parse(e.settings):e.settings;if(c.traits&&Array.isArray(c.traits)){const r=c.traits.map(n=>n.type==="cards-configurator"||n.name==="configure"?{type:"button",name:n.name||"configure",label:n.label||"Configurar",text:n.text||n.label||"Configurar Bloque",full:!0,command:()=>{const m=t.getSelected();m&&a(t,m)}}:n);this.set("traits",r)}if(c.attributes&&typeof c.attributes=="object"){const r=this.get("attributes")||{};this.set("attributes",{...r,...c.attributes})}}catch(c){console.error("Error processing block settings:",c)}a(t,d)},handleAttrChange(){}},view:{init(){this.listenTo(this.model,"change:attributes",this.handleAttrUpdate)},handleAttrUpdate(){this.render()},events:{dblclick:"handleDblClick"},handleDblClick(d){const c=this.model;a(t,c)}}})}}function It(i){i.BlockManager.add("quick-access-carousel",{label:"Accesos Rápidos",category:"Componentes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `})}function jt(i){const l=i.BlockManager;Bt(i),l.add("account-selector-block",{label:"Selector de Cuentas",category:"Cuentas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),i.DomComponents.addType("account-selector",{model:{defaults:{name:"Selector de Cuentas",droppable:!0,attributes:{"data-gjs-type":"account-selector"},traits:[{type:"select",name:"data-active",label:"Cuenta activa inicial",options:[{id:"-1",name:"Ninguna"},{id:"0",name:"Personal"},{id:"1",name:"Infanto Juvenil"},{id:"2",name:"Premium"},{id:"3",name:"Diamante"},{id:"4",name:"Depósito a Plazo"}]}],script:function(){(function(){const s=this;s.classList.add("account-selector-initialized"),s.setAttribute("data-account-selector-init","true")}).bind(this)()}}},view:{init(){this.listenTo(this.model,"change:data-active",this.updateScript)},onRender(){setTimeout(()=>{R()},500)}}}),i.on("component:selected",s=>{if(s.get("type")==="account-selector"){const t=document.createElement("style");t.innerHTML=`
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
            `,document.head.appendChild(t),i.once("component:deselected",()=>{document.head.removeChild(t)})}}),i.on("canvas:load",()=>{setTimeout(()=>{const s=i.Canvas.getFrameEl();if(s&&s.contentDocument){const t=s.contentDocument.createElement("script");t.textContent=`(${R.toString()})()`,s.contentDocument.body.appendChild(t)}},1e3)}),i.on("component:add",s=>{s.get("type")==="account-selector"&&setTimeout(()=>{const t=i.Canvas.getFrameEl();if(t&&t.contentDocument){const e=t.contentDocument.createElement("script");e.textContent=`(${R.toString()})()`,t.contentDocument.body.appendChild(e)}},500)}),l.add("account-single-block",{label:"Cuenta - Una Columna",category:"Cuentas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),l.add("account-double-block",{label:"Cuenta - Dos Columnas",category:"Cuentas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `}),l.add("account-featured-block",{label:"Cuenta - Características",category:"Cuentas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
    `})}function Bt(i){const l=`
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
    `;i.on("canvas:load",()=>{setTimeout(()=>{const s=i.Canvas.getFrameEl();if(s&&s.contentDocument){const t=s.contentDocument.createElement("script");t.textContent=l,s.contentDocument.body.appendChild(t)}},500)})}function R(){document.querySelectorAll(".account-selector-container").forEach(l=>{if(l.hasAttribute("data-initialized"))return;const s=l.querySelectorAll(".account-type-btn"),t=l.querySelectorAll(".account-panel"),e=l.querySelector(".account-header"),a=e?e.querySelector(".account-title"):null,d=e?e.querySelector(".account-description"):null,c=e?e.querySelector(".close-btn"):null,r=l.querySelector(".buttons-container"),n=parseInt(l.getAttribute("data-active")||"-1");s.forEach((o,u)=>{o.addEventListener("click",function(){m(u)})}),c&&c.addEventListener("click",function(){m(-1)});function m(o){t.forEach(u=>{u.classList.add("hidden")}),s.forEach(u=>{u.classList.remove("bg-primary","text-white"),u.classList.add("bg-white","text-primary")}),o>=0&&o<t.length?(t[o].classList.remove("hidden"),s[o].classList.remove("bg-white","text-primary"),s[o].classList.add("bg-primary","text-white"),e&&e.classList.add("active"),a&&(a.classList.remove("text-center"),a.classList.add("text-left")),d&&d.classList.add("hidden"),c&&(c.classList.remove("opacity-0","invisible"),c.classList.add("opacity-100","visible")),r&&(r.classList.remove("justify-center"),r.classList.add("justify-start"))):(e&&e.classList.remove("active"),a&&(a.classList.remove("text-left"),a.classList.add("text-center")),d&&d.classList.remove("hidden"),c&&(c.classList.add("opacity-0","invisible"),c.classList.remove("opacity-100","visible")),r&&(r.classList.add("justify-center"),r.classList.remove("justify-start")))}n>=0&&n<s.length&&m(n),l.setAttribute("data-initialized","true")})}function $t(i){i.BlockManager.add("account-types-block",{label:"Tipos de Cuenta",category:"Componentes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),i.DomComponents.addType("account-types",{isComponent:function(s){return s.getAttribute&&s.getAttribute("data-gjs-type")==="account-types"},model:{defaults:{tagName:"section",draggable:!0,droppable:!1,attributes:{"data-gjs-type":"account-types",class:"account-types-container py-8 md:py-12 bg-white"},name:"Tipos de Cuenta",traits:[{type:"select",name:"data-active",label:"Tab activo inicial",options:[{id:"personal",name:"Personal"},{id:"infanto-juvenil",name:"Infanto Juvenil"},{id:"premium",name:"Premium"},{id:"diamante",name:"Diamante"},{id:"deposito",name:"Depósito a Plazo"}],default:"personal"},{type:"number",name:"tab-count",label:"Número de tabs",min:1,max:8,default:5},{type:"text",name:"tab-1-name",label:"Nombre Tab 1",default:"Personal"},{type:"text",name:"tab-2-name",label:"Nombre Tab 2",default:"Infanto Juvenil"},{type:"text",name:"tab-3-name",label:"Nombre Tab 3",default:"Premium"},{type:"text",name:"tab-4-name",label:"Nombre Tab 4",default:"Diamante"},{type:"text",name:"tab-5-name",label:"Nombre Tab 5",default:"Depósito a Plazo"},{type:"text",name:"tab-6-name",label:"Nombre Tab 6 (opcional)",default:"Tab 6"},{type:"text",name:"tab-7-name",label:"Nombre Tab 7 (opcional)",default:"Tab 7"},{type:"text",name:"tab-8-name",label:"Nombre Tab 8 (opcional)",default:"Tab 8"}],script:function(){const s=this,t=s.querySelectorAll(".account-tab-btn"),e=s.querySelectorAll(".account-panel-group"),a=s.getAttribute("data-active")||"personal";t.forEach(c=>{c.addEventListener("click",function(){const r=this.getAttribute("data-type");t.forEach(n=>{n===this?(n.classList.remove("bg-white","text-primary"),n.classList.add("bg-primary","text-white")):(n.classList.remove("bg-primary","text-white"),n.classList.add("bg-white","text-primary"))}),e.forEach(n=>{n.getAttribute("data-type")===r?n.classList.remove("hidden"):n.classList.add("hidden")})})});const d=Array.from(t).find(c=>c.getAttribute("data-type")===a);d?d.click():t.length>0&&t[0].click()}},init(){this.on("change:attributes:tab-count",this.updateTabs);for(let s=1;s<=8;s++)this.on(`change:attributes:tab-${s}-name`,this.updateTabNames);this.on("change:attributes:data-active",this.updateActiveTab),setTimeout(()=>this.initializeScript(),300)},initializeScript(){var e;const s=this.get("script"),t=(e=this.view)==null?void 0:e.el;s&&t&&s.call(t)},updateTabs(){const s=parseInt(this.get("attributes")["tab-count"]||5),t=this.view.el.querySelector(".account-tabs"),e=this.view.el.querySelector(".account-panels");if(!t||!e)return;const a=t.querySelectorAll(".account-tab-btn"),d=e.querySelectorAll(".account-panel-group"),c=["Personal","Infanto Juvenil","Premium","Diamante","Depósito a Plazo","Tab 6","Tab 7","Tab 8"],r=["personal","infanto-juvenil","premium","diamante","deposito","tab-6","tab-7","tab-8"],n=Array.from(a).map(m=>m.getAttribute("data-type"));t.innerHTML="";for(let m=0;m<s;m++){const o=this.get("attributes")[`tab-${m+1}-name`]||c[m],u=n[m]||r[m],h=document.createElement("button");h.className="account-tab-btn bg-white text-primary py-2 px-6 md:px-8 font-medium rounded-full border-2 border-primary transition-all duration-300",h.setAttribute("data-type",u),h.textContent=o,t.appendChild(h);let f=Array.from(d).find(S=>S.getAttribute("data-type")===u);if(!f){f=document.createElement("div"),f.className="account-panel-group hidden",f.setAttribute("data-type",u);let S;m<2?S=`
                                <div class="mb-8">
                                    <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ${o.toLowerCase()}</h3>
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
                            `:S=`
                                <div class="mb-8">
                                    <h3 class="text-2xl font-bold text-primary mb-4">Cuenta de ${o.toLowerCase()}</h3>
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
                            `,f.innerHTML=S,e.appendChild(f)}}Array.from(d).forEach(m=>{const o=m.getAttribute("data-type");Array.from(t.querySelectorAll(".account-tab-btn")).some(h=>h.getAttribute("data-type")===o)||m.remove()}),this.get("attributes")["data-active"],setTimeout(()=>{const m=this.get("script"),o=this.view.el;m&&o&&m.call(o)},100)},updateTabNames(){const s=this.view.el.querySelector(".account-tabs");if(!s)return;const t=s.querySelectorAll(".account-tab-btn");for(let e=0;e<t.length;e++){const a=`tab-${e+1}-name`,d=this.get("attributes")[a];d&&t[e]&&(t[e].textContent=d)}},updateActiveTab(){if(!this.get("attributes")["data-active"])return;const t=this.view.el;if(t){const e=this.get("script");e&&e.call(t)}}},view:{onRender(){setTimeout(()=>{const s=this.el,t=this.model.get("script");t&&s&&t.call(s)},100)}}})}function Dt(i){i.BlockManager.add("credit-types-block",{label:"Tipos de Crédito",category:"Componentes",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
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
        `}),i.DomComponents.addType("credit-types",{isComponent:function(s){return s.tagName==="SECTION"&&s.classList.contains("credit-types-container")},model:{defaults:{tagName:"section",draggable:!0,droppable:!0,attributes:{"data-gjs-type":"credit-types",class:"credit-types-container py-8 md:py-12 bg-white"},name:"Tipos de Crédito",traits:[{type:"number",name:"tab-count",label:"Número de tabs",min:1,max:10,default:3},{type:"select",name:"data-active",label:"Tab activo inicial",options:[{id:"tab-1",name:"Tab 1"},{id:"tab-2",name:"Tab 2"},{id:"tab-3",name:"Tab 3"},{id:"tab-4",name:"Tab 4"},{id:"tab-5",name:"Tab 5"},{id:"tab-6",name:"Tab 6"},{id:"tab-7",name:"Tab 7"},{id:"tab-8",name:"Tab 8"},{id:"tab-9",name:"Tab 9"},{id:"tab-10",name:"Tab 10"}],default:"tab-1"},{type:"text",name:"tab-1-name",label:"Nombre Tab 1",default:"Tab 1"},{type:"text",name:"tab-2-name",label:"Nombre Tab 2",default:"Tab 2"},{type:"text",name:"tab-3-name",label:"Nombre Tab 3",default:"Tab 3"},{type:"text",name:"tab-4-name",label:"Nombre Tab 4",default:"Tab 4"},{type:"text",name:"tab-5-name",label:"Nombre Tab 5",default:"Tab 5"},{type:"text",name:"tab-6-name",label:"Nombre Tab 6",default:"Tab 6"},{type:"text",name:"tab-7-name",label:"Nombre Tab 7",default:"Tab 7"},{type:"text",name:"tab-8-name",label:"Nombre Tab 8",default:"Tab 8"},{type:"text",name:"tab-9-name",label:"Nombre Tab 9",default:"Tab 9"},{type:"text",name:"tab-10-name",label:"Nombre Tab 10",default:"Tab 10"}],script:function(){const s=this,t=s.querySelectorAll(".credit-tab-btn"),e=s.querySelectorAll(".credit-panel-group"),a=s.getAttribute("data-active")||"tab-1",d=parseInt(s.getAttribute("tab-count")||3);t.forEach((n,m)=>{if(m<d){n.classList.remove("hidden");const o=m+1,u=s.getAttribute(`tab-${o}-name`);u&&(n.textContent=u)}else n.classList.add("hidden");n.addEventListener("click",function(){const o=this.getAttribute("data-type");t.forEach(u=>{u===this?(u.classList.remove("bg-white","text-primary"),u.classList.add("bg-primary","text-white")):(u.classList.remove("bg-primary","text-white"),u.classList.add("bg-white","text-primary"))}),e.forEach(u=>{u.getAttribute("data-type")===o?u.classList.remove("hidden"):u.classList.add("hidden")})})});const c=Array.from(t).find(n=>n.getAttribute("data-type")===a&&!n.classList.contains("hidden"));c?c.click():t.length>0&&!t[0].classList.contains("hidden")&&t[0].click(),s.querySelectorAll('i[class*="ri-"]').forEach(n=>{const m=Array.from(n.classList).find(o=>o.startsWith("ri-"));m&&n.setAttribute("data-original-icon",m)})}},init(){this.on("change:attributes:tab-count",this.updateTabs),this.on("change:attributes:data-active",this.updateActiveTab);for(let s=1;s<=10;s++)this.on(`change:attributes:tab-${s}-name`,this.updateTabNames);this.listenTo(this.collection,"add",this.onAdd),this.updateActiveTabOptions()},onAdd(){setTimeout(()=>this.initializeScript(),300)},initializeScript(){var e;const s=this.get("script"),t=(e=this.view)==null?void 0:e.el;s&&t&&s.call(t)},updateActiveTabOptions(){const s=parseInt(this.get("attributes")["tab-count"]||3),t=[];for(let a=1;a<=s;a++)t.push({id:`tab-${a}`,name:`Tab ${a}`});const e=this.get("traits").where({name:"data-active"})[0];if(e){e.set("options",t);const a=this.get("attributes")["data-active"];t.map(c=>c.id).includes(a)||this.set("attributes",{...this.get("attributes"),"data-active":"tab-1"})}},updateTabs(){const s=parseInt(this.get("attributes")["tab-count"]||3);this.set("attributes",{...this.get("attributes"),"tab-count":s}),this.updateActiveTabOptions(),this.initializeScript()},updateTabNames(){const s={};for(let t=1;t<=10;t++){const e=`tab-${t}-name`,a=this.get("attributes")[e];a&&(s[`tab-${t}-name`]=a)}this.set("attributes",{...this.get("attributes"),...s}),this.initializeScript()},updateActiveTab(){this.initializeScript()}},view:{init(){this.listenTo(this.model,"change:attributes",this.updateScript)},updateScript(){this.onRender()},onRender(){setTimeout(()=>{const s=this.el,t=this.model.get("script");t&&s&&t.call(s)},100)}}})}function qt(i){const l=i.BlockManager;let s=null;l.add("basic-table",{label:"Tabla Básica",category:"Tablas",attributes:{class:"gjs-block-section"},media:`<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="0" y="0" width="24" height="24" fill="white" rx="2"/>
            <rect x="2" y="4" width="20" height="16" rx="1" stroke="#23366A" stroke-width="1" fill="none"/>
            <line x1="2" y1="8" x2="22" y2="8" stroke="#23366A" stroke-width="1"/>
            <line x1="12" y1="4" x2="12" y2="20" stroke="#23366A" stroke-width="1"/>
            <rect x="2" y="4" width="20" height="4" fill="#23366A"/>
        </svg>`,content:{type:"custom-table",rows:5,columns:2,padding:"md",layout:"auto",header:["Descripción","Valor por IVA"],headerAlign:["left","right"],data:[["Cargo mensual por servicio*","$1.00"],["Reposición por extravío, pérdida o robo","$3.25"],["Reposición por deterioro","$3.25"],["Por cada transacción en exceso","$1.25"],["Por cada retiro a nivel internacional en ATM","$3.00"]],dataAlign:[["left","right"],["left","right"],["left","right"],["left","right"],["left","right"]]}}),i.on("component:add",t=>{t.get("type")==="custom-table"&&(t.get("_tableInitialized")||(t.set("_tableInitialized",!0),setTimeout(()=>{q("Tabla agregada. Usa el botón 'Configurar Tabla' en el panel de ajustes para personalizar la estructura y contenido.","info",5e3)},500)))}),i.DomComponents.addType("custom-table",{isComponent:t=>t.tagName==="DIV"&&t.classList.contains("table-wrapper"),model:{defaults:{tagName:"div",droppable:!1,rows:3,columns:2,padding:"md",layout:"auto",header:["Header 1","Header 2"],headerAlign:["left","left"],data:[["Cell 1,1","Cell 1,2"],["Cell 2,1","Cell 2,2"],["Cell 3,1","Cell 3,2"]],dataAlign:[["left","left"],["left","left"],["left","left"]],traits:[{type:"button",label:"Tabla",text:"Configurar",full:!0,command:"open-table-config"}],classes:["table-wrapper","overflow-x-auto","my-8","rounded-2xl","shadow-md"]},toHTML(){const t=this.getTableData(),e=this.get("components").map(a=>a.toHTML()).join("");return`<div class="table-wrapper overflow-x-auto my-8 rounded-2xl shadow-md" 
                                data-gjs-type="custom-table"
                                data-table-json='${JSON.stringify(t).replace(/'/g,"&apos;")}'>
                            ${e}
                        </div>`},init(){this.listenTo(i,"component:selected",this.checkSelected),this.on("change:rows change:columns change:padding change:layout change:header change:data change:headerAlign change:dataAlign",this.updateHTML),this.on("change",this.handleChange),this.updateHTML()},updateHTML(){const t=this.get("rows"),e=this.get("columns"),a=this.get("padding"),d=this.get("layout"),c=this.get("header")||[],r=this.get("headerAlign")||[],n=this.get("data")||[],m=this.get("dataAlign")||[],o=[...c];for(;o.length<e;)o.push(`Header ${o.length+1}`);o.length>e&&(o.length=e);const u=[...r];for(;u.length<e;)u.push("left");u.length>e&&(u.length=e);const h=[],f=[];for(let p=0;p<t;p++){const g=n[p]?[...n[p]]:[],b=m[p]?[...m[p]]:[];for(;g.length<e;)g.push(`Cell ${p+1},${g.length+1}`);for(g.length>e&&(g.length=e);b.length<e;)b.push("left");b.length>e&&(b.length=e),h.push(g),f.push(b)}this.set("header",o,{silent:!0}),this.set("headerAlign",u,{silent:!0}),this.set("data",h,{silent:!0}),this.set("dataAlign",f,{silent:!0});const S={xs:"p-1",sm:"p-2",md:"p-3",lg:"p-4"}[a]||"p-3";let x=`<table class="w-full border-collapse border border-gray-200 ${d==="fixed"?"table-fixed":""}">
                                <thead>
                                    <tr>`;for(let p=0;p<e;p++){const g=o[p],b=u[p];x+=`<th class="bg-primary text-white font-semibold ${b==="center"?"text-center":b==="right"?"text-right":"text-left"} ${S} border-b border-r border-gray-200 border-opacity-20 last:border-r-0">${g}</th>`}x+=`</tr>
                    </thead>
                    <tbody>`;for(let p=0;p<t;p++){const g=p%2===1?"bg-gray-50":"";x+=`<tr class="${g}">`;for(let b=0;b<e;b++){const E=h[p][b],I=f[p][b];x+=`<td class="text-gray-600 ${I==="center"?"text-center":I==="right"?"text-right":"text-left"} ${S} border-b border-r border-gray-200 last:border-r-0">${E}</td>`}x+="</tr>"}x+=`</tbody>
                    </table>`,this.components(x)},handleChange(){},checkSelected(t){},getTableData(){return{rows:this.get("rows"),columns:this.get("columns"),padding:this.get("padding"),layout:this.get("layout"),header:this.get("header"),headerAlign:this.get("headerAlign"),data:this.get("data"),dataAlign:this.get("dataAlign")}},setTableData(t){this.set(t)}},view:{init(){this.listenTo(this.model,"change:rows change:columns change:padding change:layout change:header change:data change:headerAlign change:dataAlign",this.render),this.listenTo(this.model,"active",this.onActive)},events:{"dblclick td":"editCell","dblclick th":"editCell"},onRender(){this.el.classList.add("group","relative")},onActive(){},openConfigModal(t){t&&t.stopPropagation(),s=this.model,i.runCommand("open-table-config")},editCell(t){const e=t.target;e.contentEditable=!0,e.focus();const a=()=>{e.contentEditable=!1,e.removeEventListener("blur",a),this.updateCellContent(e)};e.addEventListener("blur",a),e.addEventListener("keydown",function(d){d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),e.blur())})},updateCellContent(t){const e=t.tagName.toLowerCase()==="th",a=this.model.getTableData();if(e){const d=this.el.querySelectorAll("th"),c=Array.from(d).indexOf(t);c!==-1&&a.header&&(a.header[c]=t.textContent,this.model.set("header",a.header))}else{const d=Array.from(this.el.querySelectorAll("tbody tr")).indexOf(t.parentNode),c=Array.from(t.parentNode.children).indexOf(t);d!==-1&&c!==-1&&a.data&&a.data[d]&&(a.data[d][c]=t.textContent,this.model.set("data",a.data))}}}}),i.on("component:selected",t=>{t.get("type")==="custom-table"&&(t.components().length||t.trigger("change:rows"))}),i.Commands.add("open-table-config",{run(t){if(!window.Swal){console.error("SweetAlert2 is required for table configuration modal");return}const e=t.getSelected();if(!e||e.get("type")!=="custom-table"){console.error("No table selected for editing");return}s=e;const a=s.getTableData();let d=`
            <div class="table-config-modal">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Filas</label>
                        <div class="flex items-center">
                            <input type="number" id="table-rows" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${a.rows}" min="1" max="50">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Columnas</label>
                        <div class="flex items-center">
                            <input type="number" id="table-columns" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${a.columns}" min="1" max="10">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Espaciado</label>
                        <div class="flex items-center">
                            <select id="table-padding" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="xs" ${a.padding==="xs"?"selected":""}>Muy pequeño</option>
                                <option value="sm" ${a.padding==="sm"?"selected":""}>Pequeño</option>
                                <option value="md" ${a.padding==="md"?"selected":""}>Medio</option>
                                <option value="lg" ${a.padding==="lg"?"selected":""}>Grande</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Diseño</label>
                        <div class="flex items-center">
                            <select id="table-layout" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="auto" ${a.layout==="auto"?"selected":""}>Automático</option>
                                <option value="fixed" ${a.layout==="fixed"?"selected":""}>Ancho fijo</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="mb-6">
                    <div class="flex items-center mb-2">
                        <label class="block text-sm font-medium text-gray-700">Encabezados</label>
                    </div>
                    <div class="grid grid-cols-1 gap-2" id="header-inputs">`;for(let c=0;c<a.columns;c++){const r=a.header[c]||`Header ${c+1}`,n=a.headerAlign[c]||"left";d+=`
                <div class="flex gap-2">
                    <input type="text" class="header-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${r}">
                    <select class="header-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="left" ${n==="left"?"selected":""}><i class="ri-align-left"></i> Izq</option>
                        <option value="center" ${n==="center"?"selected":""}><i class="ri-align-center"></i> Centro</option>
                        <option value="right" ${n==="right"?"selected":""}><i class="ri-align-right"></i> Der</option>
                    </select>
                </div>`}d+=`
                    </div>
                </div>
                
                <div class="mb-4">
                    <div class="flex items-center mb-2">
                        <label class="block text-sm font-medium text-gray-700">Contenido</label>
                    </div>
                    <div class="grid grid-cols-1 gap-4" id="rows-container">`;for(let c=0;c<a.rows;c++){d+=`
                <div class="border border-gray-200 p-3 rounded bg-gray-50">
                    <div class="flex items-center mb-2">
                        <p class="text-sm font-medium">Fila ${c+1}</p>
                        ${c%2===1?'<span class="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">Fila con fondo</span>':""}
                    </div>
                    <div class="grid grid-cols-1 gap-2 row-inputs">`;for(let r=0;r<a.columns;r++){const n=a.data[c]&&a.data[c][r]||`Cell ${c+1},${r+1}`,m=a.dataAlign[c]&&a.dataAlign[c][r]||"left";d+=`
                    <div class="flex gap-2">
                        <input type="text" class="cell-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${n}">
                        <select class="cell-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                            <option value="left" ${m==="left"?"selected":""}>Izq</option>
                            <option value="center" ${m==="center"?"selected":""}>Centro</option>
                            <option value="right" ${m==="right"?"selected":""}>Der</option>
                        </select>
                    </div>`}d+=`
                    </div>
                </div>`}d+=`
                    </div>
                </div>
            </div>`,Swal.fire({title:"Configurar Tabla",html:d,width:"800px",showCloseButton:!1,showCancelButton:!0,confirmButtonText:"Guardar",cancelButtonText:"Cancelar",confirmButtonColor:"#23366A",customClass:{title:"text-lg font-bold mb-0 pb-0",htmlContainer:"max-h-[70vh] overflow-y-auto",popup:"swal2-custom-popup",actions:"sticky bottom-0 bg-white py-3 shadow-inner"},didOpen:()=>{const c=document.createElement("style");c.textContent=`
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
                    `,document.head.appendChild(c);const r=document.getElementById("table-rows"),n=document.getElementById("table-columns");r.addEventListener("change",()=>m()),n.addEventListener("change",()=>m());function m(){const o=parseInt(r.value)||1,u=parseInt(n.value)||1,h=document.getElementById("header-inputs");let f="";for(let x=0;x<u;x++){const p=x<a.header.length?a.header[x]:`Header ${x+1}`,g=x<a.headerAlign.length?a.headerAlign[x]:"left";f+=`
                            <div class="flex gap-2">
                                <input type="text" class="header-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${p}">
                                <select class="header-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                                    <option value="left" ${g==="left"?"selected":""}>Izq</option>
                                    <option value="center" ${g==="center"?"selected":""}>Centro</option>
                                    <option value="right" ${g==="right"?"selected":""}>Der</option>
                                </select>
                            </div>`}h.innerHTML=f;const S=document.getElementById("rows-container");let T="";for(let x=0;x<o;x++){T+=`
                            <div class="border border-gray-200 p-3 rounded bg-gray-50">
                                <div class="flex items-center mb-2">
                                    <p class="text-sm font-medium">Fila ${x+1}</p>
                                    ${x%2===1?'<span class="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">Fila con fondo</span>':""}
                                </div>
                                <div class="grid grid-cols-1 gap-2 row-inputs">`;for(let p=0;p<u;p++){const g=x<a.data.length&&p<a.data[x].length?a.data[x][p]:`Cell ${x+1},${p+1}`,b=x<a.dataAlign.length&&p<a.dataAlign[x].length?a.dataAlign[x][p]:"left";T+=`
                                <div class="flex gap-2">
                                    <input type="text" class="cell-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${g}">
                                    <select class="cell-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                                        <option value="left" ${b==="left"?"selected":""}>Izq</option>
                                        <option value="center" ${b==="center"?"selected":""}>Centro</option>
                                        <option value="right" ${b==="right"?"selected":""}>Der</option>
                                    </select>
                                </div>`}T+=`
                                </div>
                            </div>`}S.innerHTML=T}},preConfirm:()=>{const c=parseInt(document.getElementById("table-rows").value)||3,r=parseInt(document.getElementById("table-columns").value)||2,n=document.getElementById("table-padding").value,m=document.getElementById("table-layout").value,o=document.querySelectorAll("#header-inputs .header-content"),u=document.querySelectorAll("#header-inputs .header-align"),h=[],f=[];o.forEach(p=>{h.push(p.value)}),u.forEach(p=>{f.push(p.value)});const S=[],T=[];return document.querySelectorAll("#rows-container > div").forEach(p=>{const g=p.querySelectorAll(".cell-content"),b=p.querySelectorAll(".cell-align"),E=[],I=[];g.forEach(A=>{E.push(A.value)}),b.forEach(A=>{I.push(A.value)}),S.push(E),T.push(I)}),{rows:c,columns:r,padding:n,layout:m,header:h,headerAlign:f,data:S,dataAlign:T}}}).then(c=>{c.isConfirmed&&c.value&&s.setTableData(c.value)})}}),i.on("load",function(){const t=i.Canvas.getFrameEl();if(t&&t.contentDocument){const e=t.contentDocument.createElement("style");e.innerHTML=`
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
            `,t.contentDocument.head.appendChild(e)}}),i.DomComponents.addType("div",{model:{defaults:{tagName:"div"},init(){if(this.getClasses().includes("table-wrapper")){this.set("type","custom-table");const t=this.getEl();if(t&&t.getAttribute)try{const e=t.getAttribute("data-table-json");if(e){const a=JSON.parse(e);this.set({rows:parseInt(a.rows)||3,columns:parseInt(a.columns)||2,padding:a.padding||"md",layout:a.layout||"auto",header:Array.isArray(a.header)?a.header:[],headerAlign:Array.isArray(a.headerAlign)?a.headerAlign:[],data:Array.isArray(a.data)?a.data:[],dataAlign:Array.isArray(a.dataAlign)?a.dataAlign:[]}),setTimeout(()=>{this.trigger("change:rows")},300)}}catch(e){console.error("Error loading table data:",e)}}}}}),i.on("storage:before",t=>{const e=[];i.getComponents().forEach(a=>{if(a.get("type")==="custom-table"){const d=a.getTableData();e.push({id:a.getId(),data:{rows:parseInt(d.rows)||3,columns:parseInt(d.columns)||2,padding:d.padding||"md",layout:d.layout||"auto",header:Array.isArray(d.header)?d.header:[],headerAlign:Array.isArray(d.headerAlign)?d.headerAlign:[],data:Array.isArray(d.data)?d.data:[],dataAlign:Array.isArray(d.dataAlign)?d.dataAlign:[]}});const c=JSON.stringify(e[e.length-1].data);a.set("attributes",{...a.get("attributes"),"data-table-json":c})}}),window.grapesJsCustomTableData=e}),i.on("load",()=>{setTimeout(()=>{i.getComponents().forEach(t=>{if(t.get("type")==="custom-table"){const e=t.getEl();if(e&&e.getAttribute)try{const a=e.getAttribute("data-table-json");if(a){const d=JSON.parse(a);t.set({rows:parseInt(d.rows)||3,columns:parseInt(d.columns)||2,padding:d.padding||"md",layout:d.layout||"auto",header:Array.isArray(d.header)?d.header:[],headerAlign:Array.isArray(d.headerAlign)?d.headerAlign:[],data:Array.isArray(d.data)?d.data:[],dataAlign:Array.isArray(d.dataAlign)?d.dataAlign:[]}),t.trigger("change:rows")}}catch(a){console.error("Error loading table data from attribute:",a)}}})},1e3)})}function Mt(i){const l=`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <rect x="4" y="4" width="16" height="2" fill="white" />
      <rect x="4" y="8" width="16" height="2" fill="white" />
      <rect x="4" y="12" width="16" height="2" fill="white" />
      <rect x="4" y="16" width="10" height="2" fill="white" />
      <rect x="16" y="16" width="4" height="2" fill="white" />
    </svg>`,s=`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="2" fill="#333" />
      <rect x="2" y="5" width="20" height="17" rx="2" fill="#23366A" />
      <rect x="4" y="7" width="16" height="2" fill="white" />
      <rect x="4" y="11" width="16" height="2" fill="white" />
      <rect x="4" y="15" width="16" height="2" fill="white" />
      <rect x="4" y="19" width="10" height="1" fill="white" />
    </svg>`;i.DomComponents.addType("dynamic-form-basic",{model:{defaults:{name:"Formulario Simple",tagName:"div",droppable:!1,attributes:{class:"form-container bg-white p-6 rounded-2xl border border-gray-200","data-form-id":""}},init(){this.listenTo(this,"change:attributes",this.handleAttrChange),this.loadFormOptions(),this.on("change:attributes:data-form-id",this.updateFormHTML),setTimeout(()=>this.updateFormHTML(),100)},handleAttrChange(){const t=this.getAttributes();t["data-form-id"]!==this.get("attributes")["data-form-id"]&&this.set("attributes",{...t,"data-form-id":t["data-form-id"]||""})},async loadFormOptions(){try{const t=await fetch("/api/forms/active");if(!t.ok)throw new Error("Error loading forms");this.availableForms=await t.json()}catch(t){console.error("Error loading form options:",t),this.availableForms=[]}},updateFormHTML(){try{const t=this.getAttributes()["data-form-id"];if(!t){this.set("content",`
                            <div class="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                <i class="ri-file-list-3-line text-4xl text-gray-400 mb-2"></i>
                                <h3 class="text-lg font-medium text-gray-700 mb-1">Formulario no seleccionado</h3>
                                <p class="text-sm text-gray-500">Haga doble clic para seleccionar un formulario.</p>
                            </div>
                        `);return}fetch("/api/forms/active").then(e=>e.json()).then(e=>{const a=e.find(d=>d.id==t);if(!a)throw new Error("Formulario no encontrado");this.renderForm(a)}).catch(e=>{console.error("Error updating form HTML:",e),this.set("content",`
                                <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                                    <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                                    <h3 class="text-lg font-medium text-red-700 mb-1">Error al cargar el formulario</h3>
                                    <p class="text-sm text-red-500">No se pudo cargar el formulario seleccionado. Por favor, verifique que el formulario exista y esté activo.</p>
                                </div>
                            `)})}catch(t){console.error("Error in updateFormHTML:",t)}},renderForm(t){let e=[];if(t.fields&&!Array.isArray(t.fields))e=Object.keys(t.fields).map(c=>t.fields[c]);else if(Array.isArray(t.fields))e=t.fields;else{console.error("Invalid form fields format:",t.fields),this.set("content",`
                        <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                            <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                            <h3 class="text-lg font-medium text-red-700 mb-1">Error de formato</h3>
                            <p class="text-sm text-red-500">El formato de los campos del formulario es inválido. Por favor, verifique la estructura de datos.</p>
                        </div>
                    `);return}const a=e.map(c=>{const r=`form_${t.id}_${c.name}`,n=c.required?"required":"",m=c.required?'<span class="text-red-500">*</span>':"";let o="";switch(c.type){case"text":o=`
                                    <input type="text" id="${r}" name="${c.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                                `;break;case"email":o=`
                                    <input type="email" id="${r}" name="${c.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                                        ${n}>
                                `;break;case"tel":o=`
                                    <input type="tel" id="${r}" name="${c.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[0-9]{4}-?[0-9]{4}"
                                        placeholder="0000-0000"
                                        ${n}>
                                `;break;case"number":o=`
                                    <input type="number" id="${r}" name="${c.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        min="0"
                                        ${n}>
                                `;break;case"textarea":o=`
                                <textarea id="${r}" name="${c.name}" rows="4"
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-2xl" ${n}></textarea>
                            `;break;case"select":const u=c.options.map(h=>`<option value="${h}">${h}</option>`).join("");o=`
                                <select id="${r}" name="${c.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                                    <option value="">Seleccione una opción</option>
                                    ${u}
                                </select>
                            `;break;case"radio":o=`
                                <div class="space-y-2">
                                    ${c.options.map((h,f)=>`
                                        <div class="flex items-center">
                                            <input type="radio" id="${r}_${f}" name="${c.name}" value="${h}" 
                                                class="h-4 w-4 text-primary border-gray-300" ${f===0&&c.required?"required":""}>
                                            <label for="${r}_${f}" class="ml-2 text-gray-700">${h}</label>
                                        </div>
                                    `).join("")}
                                </div>
                            `;break;case"checkbox":return o=`
                                <div class="flex items-center">
                                    <input type="checkbox" id="${r}" name="${c.name}" value="1" 
                                        class="h-4 w-4 text-primary border-gray-300 rounded" ${n}>
                                    <label for="${r}" class="ml-2 text-gray-700">${c.label}</label>
                                </div>
                            `,o;default:o=`
                                <input type="text" id="${r}" name="${c.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                            `}return c.type==="checkbox"?o:`
                        <div class="mb-4">
                            <label for="${r}" class="block text-gray-700 text-sm font-bold mb-2">
                                ${c.label} ${m}
                            </label>
                            ${o}
                        </div>
                    `}).join(""),d=`
                    <h2 class="text-2xl font-bold text-primary mb-2">${t.title}</h2>
                    ${t.description?`<p class="text-gray-600 mb-4">${t.description}</p>`:""}
                    
                    <form id="dynamic_form_${t.id}" class="dynamic-form" data-form-id="${t.id}">
                        ${a}
                        
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
                `;this.set("content",d)},showFormSelector(){if(!this.availableForms||this.availableForms.length===0){alert("No hay formularios disponibles. Por favor, cree un formulario primero.");return}const e=`
                    <div class="form-selector p-4">
                        <h3 class="text-lg font-medium mb-3">Seleccionar Formulario</h3>
                        <div class="form-options max-h-60 overflow-y-auto">
                            ${this.availableForms.map(a=>`<div class="form-option p-3 border rounded mb-2 cursor-pointer hover:bg-gray-50" data-form-id="${a.id}">
                        <div class="font-medium">${a.title}</div>
                        <div class="text-sm text-gray-500">${Object.keys(a.fields).length} campos</div>
                    </div>`).join("")}
                        </div>
                    </div>
                `;if(typeof Swal<"u")Swal.fire({title:"Seleccionar Formulario",html:e,showCancelButton:!0,cancelButtonText:"Cancelar",showConfirmButton:!1,width:"500px",didOpen:()=>{Swal.getPopup().querySelectorAll(".form-option").forEach(d=>{d.addEventListener("click",()=>{const c=d.getAttribute("data-form-id");this.set("attributes",{...this.getAttributes(),"data-form-id":c}),Swal.close()})})}});else{const a=prompt("Ingrese el ID del formulario:");a&&this.set("attributes",{...this.getAttributes(),"data-form-id":a})}}},view:{events:{dblclick:"onDblClick"},onDblClick(){this.model.showFormSelector()}}}),i.DomComponents.addType("dynamic-form-section",{model:{defaults:{name:"Sección con Formulario",tagName:"section",droppable:!1,attributes:{class:"py-8 md:py-14 bg-white","data-form-id":""}},init(){this.listenTo(this,"change:attributes",this.handleAttrChange),this.loadFormOptions(),this.on("change:attributes:data-form-id",this.updateFormHTML),setTimeout(()=>this.updateFormHTML(),100)},handleAttrChange(){const t=this.getAttributes();t["data-form-id"]!==this.get("attributes")["data-form-id"]&&this.set("attributes",{...t,"data-form-id":t["data-form-id"]||""})},async loadFormOptions(){try{const t=await fetch("/api/forms/active");if(!t.ok)throw new Error("Error loading forms");this.availableForms=await t.json()}catch(t){console.error("Error loading form options:",t),this.availableForms=[]}},updateFormHTML(){try{const t=this.getAttributes()["data-form-id"];if(!t){this.set("content",`
                            <div class="max-w-7xl mx-auto px-4">
                                <div class="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                    <i class="ri-file-list-3-line text-4xl text-gray-400 mb-2"></i>
                                    <h3 class="text-lg font-medium text-gray-700 mb-1">Formulario no seleccionado</h3>
                                    <p class="text-sm text-gray-500">Haga doble clic para seleccionar un formulario.</p>
                                </div>
                            </div>
                        `);return}fetch("/api/forms/active").then(e=>e.json()).then(e=>{const a=e.find(d=>d.id==t);if(!a)throw new Error("Formulario no encontrado");this.renderForm(a)}).catch(e=>{console.error("Error updating form HTML:",e),this.set("content",`
                                <div class="max-w-7xl mx-auto px-4">
                                    <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                                        <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                                        <h3 class="text-lg font-medium text-red-700 mb-1">Error al cargar el formulario</h3>
                                        <p class="text-sm text-red-500">No se pudo cargar el formulario seleccionado. Por favor, verifique que el formulario exista y esté activo.</p>
                                    </div>
                                </div>
                            `)})}catch(t){console.error("Error in updateFormHTML:",t)}},renderForm(t){let e=[];if(t.fields&&!Array.isArray(t.fields))e=Object.keys(t.fields).map(c=>t.fields[c]);else if(Array.isArray(t.fields))e=t.fields;else{console.error("Invalid form fields format:",t.fields),this.set("content",`
                        <div class="max-w-7xl mx-auto px-4">
                            <div class="text-center p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                                <i class="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                                <h3 class="text-lg font-medium text-red-700 mb-1">Error de formato</h3>
                                <p class="text-sm text-red-500">El formato de los campos del formulario es inválido. Por favor, verifique la estructura de datos.</p>
                            </div>
                        </div>
                    `);return}const a=e.map(c=>{const r=`form_${t.id}_${c.name}`,n=c.required?"required":"",m=c.required?'<span class="text-red-500">*</span>':"";let o="";switch(c.type){case"text":o=`
                                    <input type="text" id="${r}" name="${c.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                                `;break;case"email":o=`
                                    <input type="email" id="${r}" name="${c.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                                        ${n}>
                                `;break;case"tel":o=`
                                    <input type="tel" id="${r}" name="${c.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        pattern="[0-9]{4}-?[0-9]{4}"
                                        placeholder="0000-0000"
                                        ${n}>
                                `;break;case"number":o=`
                                    <input type="number" id="${r}" name="${c.name}" 
                                        class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" 
                                        min="0"
                                        ${n}>
                                `;break;case"textarea":o=`
                                <textarea id="${r}" name="${c.name}" rows="4"
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-2xl" ${n}></textarea>
                            `;break;case"select":const u=c.options.map(h=>`<option value="${h}">${h}</option>`).join("");o=`
                                <select id="${r}" name="${c.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                                    <option value="">Seleccione una opción</option>
                                    ${u}
                                </select>
                            `;break;case"radio":o=`
                                <div class="space-y-2">
                                    ${c.options.map((h,f)=>`
                                        <div class="flex items-center">
                                            <input type="radio" id="${r}_${f}" name="${c.name}" value="${h}" 
                                                class="h-4 w-4 text-primary border-gray-300" ${f===0&&c.required?"required":""}>
                                            <label for="${r}_${f}" class="ml-2 text-gray-700">${h}</label>
                                        </div>
                                    `).join("")}
                                </div>
                            `;break;case"checkbox":return o=`
                                <div class="flex items-center">
                                    <input type="checkbox" id="${r}" name="${c.name}" value="1" 
                                        class="h-4 w-4 text-primary border-gray-300 rounded" ${n}>
                                    <label for="${r}" class="ml-2 text-gray-700">${c.label}</label>
                                </div>
                            `,o;default:o=`
                                <input type="text" id="${r}" name="${c.name}" 
                                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full" ${n}>
                            `}return c.type==="checkbox"?o:`
                        <div class="mb-4">
                            <label for="${r}" class="block text-gray-700 text-sm font-bold mb-2">
                                ${c.label} ${m}
                            </label>
                            ${o}
                        </div>
                    `}).join(""),d=`
                    <div class="max-w-7xl mx-auto px-4">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-primary mb-2">${t.title}</h2>
                            ${t.description?`<p class="text-gray-600 mb-2 max-w-3xl mx-auto">${t.description}</p>`:""}
                        </div>
                        
                        <div class="max-w-2xl mx-auto">
                            <div class="bg-white p-6 rounded-2xl border border-gray-200">
                                <form id="dynamic_form_${t.id}" class="dynamic-form" data-form-id="${t.id}">
                                    ${a}
                                    
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
                `;this.set("content",d)},showFormSelector(){if(!this.availableForms||this.availableForms.length===0){alert("No hay formularios disponibles. Por favor, cree un formulario primero.");return}const e=`
                    <div class="form-selector p-4">
                        <h3 class="text-lg font-medium mb-3">Seleccionar Formulario</h3>
                        <div class="form-options max-h-60 overflow-y-auto">
                            ${this.availableForms.map(a=>`<div class="form-option p-3 border rounded mb-2 cursor-pointer hover:bg-gray-50" data-form-id="${a.id}">
                        <div class="font-medium">${a.title}</div>
                        <div class="text-sm text-gray-500">${Object.keys(a.fields).length} campos</div>
                    </div>`).join("")}
                        </div>
                    </div>
                `;if(typeof Swal<"u")Swal.fire({title:"Seleccionar Formulario",html:e,showCancelButton:!0,cancelButtonText:"Cancelar",showConfirmButton:!1,width:"500px",didOpen:()=>{Swal.getPopup().querySelectorAll(".form-option").forEach(d=>{d.addEventListener("click",()=>{const c=d.getAttribute("data-form-id");this.set("attributes",{...this.getAttributes(),"data-form-id":c}),Swal.close()})})}});else{const a=prompt("Ingrese el ID del formulario:");a&&this.set("attributes",{...this.getAttributes(),"data-form-id":a})}}},view:{events:{dblclick:"onDblClick"},onDblClick(){this.model.showFormSelector()}}}),i.BlockManager.add("dynamic-form-basic",{label:"Formulario Simple",category:"Formularios",attributes:{class:"gjs-block-section"},media:l,content:{type:"dynamic-form-basic"}}),i.BlockManager.add("dynamic-form-section",{label:"Sección con Formulario",category:"Formularios",attributes:{class:"gjs-block-section"},media:s,content:{type:"dynamic-form-section"}})}function Pt(i){const l=`<svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#23366A" />
      <circle cx="6" cy="8" r="2" fill="white" />
      <circle cx="12" cy="8" r="2" fill="white" />
      <circle cx="18" cy="8" r="2" fill="white" />
      <rect x="4" y="14" width="16" height="2" fill="white" />
      <rect x="4" y="18" width="10" height="2" fill="white" />
    </svg>`;i.DomComponents.addType("precalificador-form",{isComponent:function(s){return s.tagName==="SECTION"&&(s.getAttribute("data-gjs-type")==="precalificador-form"||s.querySelector(".precalificador-form"))},model:{defaults:{name:"Formulario Precalificador",tagName:"section",droppable:!1,attributes:{class:"py-8 md:py-14 bg-white","data-gjs-type":"precalificador-form"},traits:[{type:"text",name:"form-title",label:"Título del formulario",default:"Precalificador de créditos"},{type:"text",name:"form-subtitle",label:"Subtítulo",default:"Por favor llene los campos del formulario"},{type:"button",text:"Generar tabla",full:!0,command:"create-form-in-db"}]},init(){this.on("change:attributes",this.updateContent),setTimeout(()=>this.updateContent(),100)},updateContent(){const s=this.getAttributes(),t=s["form-title"]||"Precalificador de créditos",e=s["form-subtitle"]||"Por favor llene los campos del formulario",a=`
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
                    `;this.set("content",a)}}}),i.Commands.add("create-form-in-db",{run:function(s,t){Nt(s)}}),i.BlockManager.add("precalificador-form-block",{label:"Precalificador de Créditos",category:"Formularios",attributes:{class:"gjs-block-section"},media:l,content:{type:"precalificador-form"}}),i.on("component:add",s=>{s.get("type")==="precalificador-form"&&setTimeout(()=>{showAlert("Para que el formulario funcione correctamente, recuerda generar la tabla en base de datos usando el botón en el panel de propiedades.","info",8e3)},1e3)}),i.on("component:selected",function(s){s.get("type")==="precalificador-form"&&setTimeout(()=>{const t=s.get("script"),e=s.view.el;t&&e&&t.call(e)},300)}),i.on("component:mount",function(s){s.get("type")==="precalificador-form"&&setTimeout(()=>{const t=s.get("script"),e=s.view.el;t&&e&&t.call(e)},300)})}function Nt(i){const l=i.getSelected(),s={title:"Creando formulario",text:"Por favor espere mientras se crea el formulario en la base de datos...",allowOutsideClick:!1,showConfirmButton:!1,willOpen:()=>{Swal.showLoading()}};Swal.fire(s);const t={title:"Precalificador de Créditos",description:"Formulario para precalificación de créditos",fields:[{type:"text",label:"Nombres",name:"nombres",required:!0},{type:"text",label:"Apellidos",name:"apellidos",required:!0},{type:"text",label:"Número de DUI",name:"dui",required:!0},{type:"number",label:"Edad",name:"edad",required:!0},{type:"tel",label:"Teléfono",name:"telefono",required:!0},{type:"email",label:"Correo Electrónico",name:"correo",required:!0},{type:"number",label:"Ingreso Mensual",name:"ingreso_mensual",required:!0},{type:"select",label:"Tipo de Empleo",name:"tipo_empleo",required:!0,options:["Formal","Informal","Negocio propio","Jubilado"]},{type:"number",label:"Antigüedad Laboral",name:"antiguedad_laboral",required:!0},{type:"number",label:"Monto Solicitado",name:"monto_solicitado",required:!0},{type:"select",label:"Plazo en Meses",name:"plazo_meses",required:!0,options:["12","24","36","48","60"]},{type:"checkbox",label:"Acepto términos y condiciones",name:"acepto_terminos",required:!0}],submit_button_text:"Enviar solicitud",success_message:"Su solicitud ha sido enviada correctamente. Nos pondremos en contacto con usted pronto.",status:"active"};fetch("/api/forms/create-precalificador",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:JSON.stringify(t)}).then(e=>{if(!e.ok)throw new Error("Error al crear formulario: "+e.statusText);return e.json()}).then(e=>{Swal.close(),e.success?(l.set("attributes",{...l.getAttributes(),"data-form-id":e.formId}),showAlert(`Formulario creado correctamente con ID: ${e.formId}`,"success",5e3)):showAlert(e.message||"Error desconocido al crear el formulario","error",5e3)}).catch(e=>{console.error("Error:",e),Swal.close(),showAlert("Error: "+e.message,"error",5e3)})}function zt(i){const l=i.BlockManager,s=`
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
        </svg>`;i.DomComponents.addType("promotion-viewer",{isComponent:t=>t.getAttribute&&t.getAttribute("data-promotion-component")==="true"?{type:"promotion-viewer"}:!1,model:{defaults:{name:"Visor de Promociones",tagName:"section",droppable:!1,editable:!1,selectable:!0,hoverable:!0,attributes:{class:"py-8 md:py-12 bg-white","data-promotion-component":"true"},script:function(){(function(){if(!window.Swal){var t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/sweetalert2@11",document.head.appendChild(t)}var e=function(){var a=document.querySelector('[data-promotion-component="true"]');if(!a){setTimeout(e,500);return}var d=a.querySelectorAll(".promotion-view-more");d.forEach(function(n){n.addEventListener("click",function(m){m.preventDefault();var o=n.getAttribute("data-promotion-title")||"Promoción",u=n.getAttribute("data-promotion-image")||"",h=n.getAttribute("data-promotion-description")||"",f=n.getAttribute("data-promotion-category")||"",S=n.getAttribute("data-promotion-days")||"",T=n.getAttribute("data-promotion-active-days")||"",x=function(){if(window.Swal){var g="";S&&S!==""?g='<p class="text-red-600 font-semibold mb-4"><i class="ri-time-line mr-1"></i> Quedan '+S+" días para aprovechar esta promoción</p>":T&&T!==""&&(g='<p class="text-blue-600 font-semibold mb-4"><i class="ri-calendar-line mr-1"></i> Disponible: '+T+"</p>"),window.Swal.fire({html:'<div class="text-left"><div class="mb-4 mt-4"><img src="'+u+'" alt="'+o+'" class="w-full h-64 object-cover rounded-lg"></div><span class="inline-block bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full mb-3">'+f+'</span><h2 class="text-2xl font-bold text-primary mb-4">'+o+"</h2>"+g+'<div class="text-gray-700 whitespace-pre-line">'+h+"</div></div>",width:"800px",showCloseButton:!0,showConfirmButton:!1,customClass:{popup:"promotion-modal",closeButton:"promotion-modal-close-button"}})}};if(window.Swal)x();else{var p=document.createElement("script");p.src="https://cdn.jsdelivr.net/npm/sweetalert2@11",p.onload=x,document.head.appendChild(p)}})});var c=a.querySelector("#promotion-category-filter"),r=a.querySelector("#promotion-day-filter");if(c&&r){let n=function(){var m=c.value,o=r.value,u=a.querySelectorAll(".promotion-card"),h=a.querySelector(".no-results-message"),f=0;u.forEach(function(S){var T=S.getAttribute("data-category"),x=S.getAttribute("data-days")||"",p=x.includes("días restantes"),g=m===""||T===m,b=!1;if(o==="")b=!0;else if(p)b=!0;else if(x.toLowerCase()==="todos los días")b=!0;else{var E={Lunes:"Lun",Martes:"Mar",Miércoles:"Mié",Jueves:"Jue",Viernes:"Vie",Sábado:"Sáb",Domingo:"Dom"},I=E[o];if(I){var A=new RegExp(I+"(?:,|$)","i");b=A.test(x)}}g&&b?(S.style.display="flex",f++):S.style.display="none"}),h&&(h.style.display=f===0?"block":"none")};c.addEventListener("change",n),r.addEventListener("change",n)}};setTimeout(e,500)})()}},init(){const t=this,e=()=>{const r=t.get("content")||"";return r.includes("promotion-card")||r.includes("Promociones vigentes")};if(e()){console.log("Promotions already loaded, skipping fetch");return}this.on("component:mount",this.loadPromotions);let a=0;const d=3,c=()=>{if(e()){console.log("Content detected, stopping load attempts");return}a++,console.log(`Attempt ${a} to load promotions`),t.loadPromotions(),setTimeout(()=>{var n;const r=(n=t.view)==null?void 0:n.el;r&&r.querySelector(".promotion-card")===null&&a<d&&!e()&&(console.log("Promotions not loaded, retrying..."),c())},1e3)};setTimeout(()=>c(),100)},loadPromotions(){fetch("/api/promotions/active").then(t=>{if(!t.ok)throw new Error(`Error ${t.status}: ${t.statusText}`);return t.json()}).then(t=>{this.updatePromotionsHTML(t)}).catch(t=>{this.set("content",'<div class="text-center p-8"><p class="text-gray-500">Error al cargar las promociones</p></div>')})},updatePromotionsHTML(t){if(!t||t.length===0){this.set("content",'<div class="text-center p-8"><p class="text-gray-500">No hay promociones disponibles en este momento</p></div>');return}const e=[...new Set(t.map(o=>o.category))],a={monday:{full:"Lunes",short:"Lun"},tuesday:{full:"Martes",short:"Mar"},wednesday:{full:"Miércoles",short:"Mié"},thursday:{full:"Jueves",short:"Jue"},friday:{full:"Viernes",short:"Vie"},saturday:{full:"Sábado",short:"Sáb"},sunday:{full:"Domingo",short:"Dom"}},d=Object.entries(a).map(([o,u])=>({key:o,full:u.full,short:u.short}));let c="";t.forEach(o=>{let u="",h="";if(o.remaining_days!==null&&o.remaining_days!==void 0)u=`${o.remaining_days} días restantes`,h=`<span class="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center"><i class="ri-time-line mr-1"></i>${o.remaining_days}d</span>`;else if(o.active_days&&o.active_days.length>0){const f=o.active_days.map(S=>a[S]?a[S].short:S).join(", ");u=f,h=`<span class="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center"><i class="ri-calendar-line mr-1"></i>${f}</span>`}else u="Todos los días",h='<span class="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center"><i class="ri-calendar-line mr-1"></i>Todos</span>';c+=`
                    <div class="promotion-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
                        data-category="${o.category}"
                        data-days="${u}">
                        <div class="relative h-48">
                            <img src="${o.image_url}" alt="${o.title}" class="w-full h-full object-cover">
                            <span class="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">${o.category}</span>
                            ${h}
                        </div>
                        <div class="p-5 flex-grow flex flex-col h-full">
                            <h3 class="text-lg font-bold text-primary mb-2">${o.title}</h3>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${o.short_description}</p>
                            <div class="mt-auto">
                                <button 
                                    class="promotion-view-more bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:bg-primary hover:text-white text-sm w-full flex items-center justify-center"
                                    data-promotion-id="${o.id}"
                                    data-promotion-title="${o.title.replace(/"/g,"&quot;")}"
                                    data-promotion-image="${o.image_url}"
                                    data-promotion-description="${o.long_description.replace(/"/g,"&quot;")}"
                                    data-promotion-category="${o.category}"
                                    data-promotion-days="${o.remaining_days||""}"
                                    data-promotion-active-days="${u}"
                                >
                                    Ver más
                                    <i class="ri-arrow-right-line ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    `});let r=`
                <div class="relative inline-block w-full">
                    <select id="promotion-category-filter" class="appearance-none w-full bg-white border-2 border-primary text-primary rounded-full px-4 py-2 pr-8 focus:outline-none cursor-pointer">
                        <option value="">Todas las categorías</option>
                        ${e.map(o=>`<option value="${o}">${o}</option>`).join("")}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                        <i class="ri-arrow-down-s-line"></i>
                    </div>
                </div>
                `,n=`
                <div class="relative inline-block w-full">
                    <select id="promotion-day-filter" class="appearance-none w-full bg-white border-2 border-primary text-primary rounded-full px-4 py-2 pr-8 focus:outline-none cursor-pointer">
                        <option value="">Todos los días</option>
                        ${d.map(o=>`<option value="${o.full}">${o.full}</option>`).join("")}
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
                                    ${r}
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
                                ${c}
                            </div>
                            <div class="no-results-message hidden mt-8 text-center py-8">
                                <p class="text-gray-500">No hay promociones que coincidan con los filtros seleccionados</p>
                            </div>
                        </div>
                    </div>
                `;this.set("content",m),setTimeout(()=>{this.view&&this.view.render&&this.view.render()},100)}},view:{events:{dblclick:"reloadPromotions"},reloadPromotions(){this.model.loadPromotions()}}}),i.on("load",()=>{const t=i.Canvas.getFrameEl();if(t&&t.contentDocument){let e=t.contentDocument.getElementById("promotion-styles");e||(e=t.contentDocument.createElement("style"),e.id="promotion-styles",e.innerHTML=`
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
            `,t.contentDocument.head.appendChild(e))}}),i.on("canvas:render",()=>{const t=i.Canvas.getFrameEl();if(t&&t.contentDocument){let e=t.contentDocument.getElementById("promotion-styles");e||(e=t.contentDocument.createElement("style"),e.id="promotion-styles",e.innerHTML=`
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
            `,t.contentDocument.head.appendChild(e))}}),l.add("promotion-viewer",{label:"Visor de Promociones",category:"Promociones",attributes:{class:"gjs-block-section"},media:s,content:{type:"promotion-viewer"}})}function Ft(i){ft(i),wt(i),xt(i),At(i),kt(i),St(i),Et(i),ht(i),bt(i),yt(i),vt(i),Ct(i),It(i),jt(i),$t(i),Dt(i),qt(i),Mt(i),Pt(i),zt(i),W(i),K(i),Tt(i),Lt(i)}function F(i,l=""){const s=document.getElementById(i);return s?s.value:l}document.addEventListener("DOMContentLoaded",function(){const i=_t();ne(i),re(i),de(i),fe(i)});function _t(){const i=F("asset-upload-url","/upload-assets"),l=Ot(i);return Gt(l),Wt(l),Kt(l),Zt(l),le(l),Qt(l),at(l),l}function Ot(i){return Z.init({container:"#gjs",fromElement:!0,storageManager:Ht(),deviceManager:{devices:[{name:"Desktop",width:""},{name:"Tablet",width:"768px",widthMedia:"992px"},{name:"Mobile",width:"320px",widthMedia:"575px"}]},i18n:Rt(),assetManager:Vt(i),canvas:{styles:["https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css","https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"],scripts:[]},styleManager:Jt(),plugins:[Y,l=>Ft(l),l=>oe(l),l=>tt(l),l=>gt(l)],pluginsOpts:Ut()})}function Ht(){const i=F("page-id");return i?{type:"local",id:"gjs-",autosave:!0,autoload:!0,stepsBeforeSave:1,options:{local:{key:`gjs-page-${i}`}}}:!1}function Rt(){return{locale:"es",messages:{es:{styleManager:{properties:"Propiedades",empty:"Selecciona un elemento para usar el Administrador de Estilos",sectors:{position:"Posición",display:"Visualización",flex:"Flex",dimension:"Dimensiones",typography:"Tipografía",decorations:"Decoraciones",extra:"Extra","flex-properties":"Propiedades Flex",background:"Fondo"}},traitManager:{traits:"Atributos",empty:"Selecciona un elemento para editarlo"},blockManager:{labels:{Secciones:"Secciones",Elementos:"Elementos",Botones:"Botones","link-block":"Bloque Enlace",quote:"Cita","text-section":"Sección de Texto",column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen",Basic:"Básico"},categories:{Basic:"Básico",Secciones:"Secciones",Elementos:"Elementos",Botones:"Botones",Typography:"Tipografía",Media:"Medios",Social:"Social",Layout:"Diseño"}},navigator:{navigate:"Navegar",component:"Componente",components:"Componentes",empty:"Sin componentes"},commands:{undo:"Deshacer",redo:"Rehacer",clear:"Limpiar",codeViewer:"Ver código",openAssets:"Abrir medios",openBlocks:"Abrir bloques",openStyle:"Abrir estilos",openTraits:"Abrir atributos"},assetManager:{addButton:"Añadir imagen",inputPlh:"http://ruta-a-tu-imagen.jpg",modalTitle:"Selecciona la imagen",uploadTitle:"Arrastra tus archivos aquí o haz clic para subir"},deviceManager:{device:"Dispositivo",devices:{desktop:"Escritorio",tablet:"Tablet",mobileLandscape:"Móvil Horizontal",mobilePortrait:"Móvil Vertical"}},panels:{buttons:{titles:{preview:"Vista previa",fullscreen:"Pantalla completa","sw-visibility":"Ver componentes","export-template":"Ver código","open-sm":"Abrir estilo","open-tm":"Configuraciones","open-layers":"Abrir capas","open-blocks":"Abrir bloques"}}},preset_webpage:{blocks:{"link-block":"Bloque Enlace",quote:"Cita","text-section":"Sección de Texto"},categoryLabel:{Basic:"Básico",Typography:"Tipografía",Media:"Medios"}}}}}}function Vt(i){return{upload:i,uploadName:"files",multiUpload:!0,assets:[],uploadFile:l=>{const s=l.dataTransfer?l.dataTransfer.files:l.target.files,t=new FormData;for(const e of s)t.append("files[]",e);fetch(i,{method:"POST",headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:t}).then(e=>e.json()).then(e=>{e.data&&(editor.AssetManager.add(e.data),q("Archivos subidos correctamente","success"))}).catch(e=>{console.error("Error:",e),q("Error al subir los archivos","error")})}}}function Jt(){return{sectors:[{name:"Dimensiones",open:!1,buildProps:["width","height","min-width","min-height","max-width","max-height","padding","margin"]},{name:"Tipografía",open:!1,buildProps:["font-family","font-size","font-weight","letter-spacing","color","line-height","text-align","text-shadow"]},{name:"Decoración",open:!1,buildProps:["background-color","border","border-radius","box-shadow"]},{name:"Extra",open:!1,buildProps:["opacity","transition","transform"]}]}}function Ut(){return{gjsPresetWebpage:{modalImportTitle:"Importar código",modalImportLabel:"Pega tu código HTML/CSS aquí:",modalImportContent:"",importViewerOptions:{},textCleanCanvas:"¿Estás seguro de limpiar el canvas?",showStylesOnChange:!0,textGeneral:"General",textLayout:"Diseño",textTypography:"Tipografía",textDecorations:"Decoraciones",textExtra:"Extra",buttonImport:"Importar",buttonCancel:"Cancelar",blocks:{link:{category:"Básico",label:"Enlace"},quote:{category:"Básico",label:"Cita"},"text-basic":{category:"Básico",label:"Texto"},"link-block":{category:"Básico",label:"Bloque Enlace"},"text-section":{category:"Básico",label:"Sección de Texto"}},categoryLabel:{Basic:"Básico",Typography:"Tipografía",Media:"Medios",Social:"Social",Layout:"Diseño",Sections:"Secciones",Elements:"Elementos"}},gjsBlocksBasic:{blocks:[],category:"Básicos",labels:{column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen",video:"Video",section:"Sección",paragraph:"Párrafo",default:"Predeterminado"},flexGrid:!0,stylePrefix:"gjs-"}}}function Gt(i){i.on("load",function(){const l=document.createElement("style");l.innerHTML=`
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
        `,document.head.appendChild(l);const s=i.Canvas.getFrameEl();s&&s.contentDocument.head.appendChild(l.cloneNode(!0))}),i.on("component:loaded",function(l){Xt(l)}),i.on("component:selected",function(l){if(l){const s=l.getClasses();if(s.length){const t=s.join(" "),e=l.getName();l.set("custom-name",`${e} [${t}]`)}}})}function Xt(i){const l=i.getAttributes();if(l&&l["data-gjs-type"]==="pdf-viewer"&&(i.set("type","pdf-viewer"),l["data-pdf-src"])){const s=i.view.el;if(s){const t=l["data-pdf-src"],e=l["data-pdf-name"]||"Documento PDF",a=s.querySelector(".pdf-placeholder"),d=s.querySelector(".pdf-title"),c=s.querySelector(".pdf-download-link");if(a){const r=document.createElement("object");r.setAttribute("data",t),r.setAttribute("type","application/pdf"),r.setAttribute("width","100%"),r.setAttribute("height","500"),r.classList.add("pdf-object"),r.style.minHeight="500px",r.innerHTML=`
                        <div class="p-6 bg-gray-100 text-center">
                            <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                            <a href="${t}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                        </div>
                    `,a.classList.add("hidden"),a.parentNode.insertBefore(r,a.nextSibling),d&&(d.textContent=e),c&&(c.href=t,c.classList.remove("hidden"))}}}}function Qt(i){i.on("canvas:load",function(){setTimeout(function(){const l=i.Canvas.getFrameEl();if(l&&l.contentDocument&&l.contentDocument.querySelectorAll(".account-selector-container").length>0){const t=l.contentDocument.createElement("script");t.textContent=`
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
                    `,l.contentDocument.body.appendChild(t)}},1e3)}),i.on("component:add",function(l){l.get("type")==="account-selector"&&setTimeout(function(){const s=i.Canvas.getFrameEl();if(s&&s.contentDocument&&s.contentDocument.querySelectorAll(".account-selector-container:not([data-initialized])").length>0){const e=s.contentDocument.createElement("script");e.textContent=`
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
                        `,s.contentDocument.body.appendChild(e)}},500)})}function Wt(i){i.Panels.addPanel({id:"panel-preview",visible:!0,buttons:[{id:"preview",className:"ri-eye-line",command:{run:function(l){l.runCommand("core:preview"),q("Modo vista previa activado","info")},stop:function(l){l.stopCommand("core:preview"),q("Modo edición activado","info")}},attributes:{title:"Vista Previa"}}]}),i.Panels.addPanel({id:"panel-tailwind",visible:!0,buttons:[{id:"open-tailwind-classes",className:"ri-code-box-line",command:"open-tailwind",attributes:{title:"Clases Tailwind"}}]})}function Kt(i){i.Commands.add("canvas-clear",{run:function(l){N.fire({title:"¿Estás seguro?",text:"¿Realmente deseas limpiar el canvas? Esta acción no se puede deshacer.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, limpiar",cancelButtonText:"Cancelar"}).then(s=>{s.isConfirmed&&(l.DomComponents.clear(),l.CssComposer.clear(),q("El canvas ha sido limpiado correctamente","success"))})}}),i.Commands.add("open-tailwind",{run:function(l){const s=l.getSelected();if(!s)return;const t=s.getClasses().join(" ");N.fire({title:"Clases Tailwind",input:"textarea",inputValue:t,inputPlaceholder:"Ingresa las clases separadas por espacios",showCancelButton:!0,confirmButtonText:"Aplicar",confirmButtonColor:"#23366A",cancelButtonText:"Cancelar",cancelButtonColor:"#e74c3c",preConfirm:e=>e.split(" ").filter(a=>a)}).then(e=>{e.isConfirmed&&(s.removeClass(s.getClasses()),s.addClass(e.value),q("Clases aplicadas correctamente","success"))})}})}function Zt(i){i.on("load",()=>{Yt(),te(i),ie(i),ae(i),se(i)}),i.on("canvas:render",()=>{ee(i)})}function Yt(){const i=document.createElement("style");i.innerHTML=`
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
    `,document.head.appendChild(i)}function te(i){const l=i.Canvas.getFrameEl();if(l&&l.contentDocument){const s=l.contentDocument.createElement("style");s.innerHTML=`
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
        `,l.contentDocument.head.appendChild(s)}}function ee(i){const l=i.Canvas.getFrameEl();if(l&&l.contentDocument&&!l.contentDocument.getElementById("theme-custom-styles")){const s=l.contentDocument.createElement("style");s.id="theme-custom-styles",s.innerHTML=`
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
            `,l.contentDocument.head.appendChild(s)}}function ie(i){["map","default","text-basic","quote","link-block","text-section"].forEach(s=>{i.BlockManager.get(s)&&i.BlockManager.remove(s)})}function ae(i){i.BlockManager.getCategories().each(l=>{const s=l.get("id");s!=="Basic"&&s!=="Básico"?l.set("open",!1):l.set("open",!0)})}function se(i){i.runCommand("sw-visibility");const l=i.Panels.getButton("options","sw-visibility");l&&l.set("active",!0)}function le(i){const l=i.BlockManager;Object.entries({"link-block":"Bloque Enlace",quote:"Cita","text-section":"Sección de Texto",column1:"Una columna",column2:"Dos columnas",column3:"Tres columnas","column3-7":"Dos columnas 3/7",text:"Texto",link:"Enlace",image:"Imagen"}).forEach(([e,a])=>{const d=l.get(e);d&&d.set("label",a)});const t={Basic:"Básico",Typography:"Tipografía",Media:"Medios",Social:"Social",Layout:"Diseño",Sections:"Secciones",Elements:"Elementos"};l.getCategories().each(e=>{const a=e.get("id");t[a]&&e.set("label",t[a])})}function oe(i){i.BlockManager.add("icon-block",{label:"Icono",category:"Elementos",content:'<i class="ri-home-line" style="font-size: 24px; color: #23366A;"></i>',media:'<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#23366A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'}),et(i),it(i)}function re(i){i.Panels.addPanel({id:"panel-devices",visible:!0,buttons:[{id:"device-desktop",command:"set-device-desktop",className:"ri-computer-line",active:!0,attributes:{title:"Vista Escritorio"}},{id:"device-tablet",command:"set-device-tablet",className:"ri-tablet-line",attributes:{title:"Vista Tablet"}},{id:"device-mobile",command:"set-device-mobile",className:"ri-smartphone-line",attributes:{title:"Vista Móvil"}}]}),i.Commands.add("set-device-desktop",{run:l=>l.setDevice("Desktop")}),i.Commands.add("set-device-tablet",{run:l=>l.setDevice("Tablet")}),i.Commands.add("set-device-mobile",{run:l=>l.setDevice("Mobile")})}function ne(i){const l=document.getElementById("save-button");if(!l)return;const s=ce();l.parentNode.insertBefore(s,l);let t=!0;const e=()=>{t||(s.style.display="inline")},a=()=>{s.style.display="none"};setTimeout(()=>{t=!1},1e3),i.on("component:update",e),i.on("component:add",e),i.on("component:remove",e),i.on("style:update",e),l.addEventListener("click",function(){G(i)}),document.addEventListener("keydown",function(d){(d.ctrlKey||d.metaKey)&&d.key==="s"&&(d.preventDefault(),G(i))}),document.addEventListener("editor:saved",a)}function ce(){const i=document.createElement("span");i.id="unsaved-changes-badge",i.textContent="●",i.style.cssText=`
        display: none;
        color: #e74c3c;
        font-size: 20px;
        margin-right: 6px;
        animation: pulse 1.5s ease-in-out infinite;
    `;const l=document.createElement("style");return l.textContent=`
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `,document.head.appendChild(l),i}function de(i){const l=F("page-id"),s=F("page-load-url");l&&s?fetch(s).then(t=>t.json()).then(t=>{i.setComponents(t.html||""),i.setStyle(t.css||""),q("Datos de la página cargados correctamente","success"),window.history.pushState({pageId:l},document.title,window.location.href)}).catch(t=>{console.error("Error loading page data:",t),q("Error al cargar los datos de la página","error")}):window.history.pushState({isNew:!0},document.title,window.location.href)}function G(i){const l=F("page-id"),s=F("page-store-url","/pages/store");me(i);const t=i.getHtml();let e=i.getCss()||"",a=i.getJs()||"";if(t.includes("account-selector-container")&&!a.includes("initializeAccountSelectors")&&(a+=`

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
        `),t.includes("quick-access-carousel")&&(!a.includes("scrollBy")||!a.includes("quick-access-carousel"))&&(a+=`

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
            })();`),t.includes("banner-slides-container")&&(!a.includes("banner-dot")||!a.includes("banner-slide"))){const c=`
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
            })();`,r=`
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
            }`;a+=`

`+c,e+=`

`+r}let d={html:t,css:e,js:a};l?(d.id=l,Q(s,d),document.dispatchEvent(new CustomEvent("editor:saved"))):pe(s,d)}function me(i){i.DomComponents.getComponents().filter(s=>s.get("type")==="pdf-viewer"||s.getAttributes&&s.getAttributes()["data-gjs-type"]==="pdf-viewer").forEach(s=>{const t=s.getAttributes();if(t&&t["data-pdf-src"]){const e=s.view.el,a=t["data-pdf-src"];t["data-pdf-name"];let d=e.querySelector(".pdf-object");if(!d){d=document.createElement("object"),d.setAttribute("data",a),d.setAttribute("type","application/pdf"),d.setAttribute("width","100%"),d.setAttribute("height","500"),d.classList.add("pdf-object"),d.style.minHeight="500px",d.innerHTML=`
                    <div class="p-6 bg-gray-100 text-center">
                        <p class="mb-3">No se puede mostrar el PDF. Su navegador no soporta PDFs incrustados.</p>
                        <a href="${a}" target="_blank" class="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-full">Abrir PDF</a>
                    </div>
                `;const c=e.querySelector(".pdf-placeholder");c&&(c.classList.add("hidden"),c.parentNode.insertBefore(d,c.nextSibling))}}})}function pe(i,l){N.fire({title:"Título de la página",input:"text",inputLabel:"Ingresa un título para la página",inputPlaceholder:"Título de la página",confirmButtonText:"Agregar",cancelButtonText:"Cancelar",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",inputValidator:s=>{if(!s)return"Debes ingresar un título para la página"}}).then(s=>{s.isConfirmed&&(l.title=s.value,Q(i,l),document.dispatchEvent(new CustomEvent("editor:saved")))})}function Q(i,l){N.fire({title:"Guardando...",html:"Por favor espera mientras se guarda la página",allowOutsideClick:!1,didOpen:()=>{N.showLoading()}}),fetch(i,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:JSON.stringify(l)}).then(s=>s.json()).then(s=>{N.close(),ue(s,l)}).catch(s=>{N.close(),console.error("Error:",s),q("Error al guardar la página","error")})}function ue(i,l){i.success?(q("Página guardada correctamente","success"),window.editorHasUnsavedChanges=!1,document.dispatchEvent(new CustomEvent("editor:saved")),!l.id&&i.id&&ge(i.id,l.title)):q("Error al guardar la página: "+(i.message||"Error desconocido"),"error")}function ge(i,l){const s=document.getElementById("page-id");s&&(s.value=i);const t=document.getElementById("page-load-url");t&&(t.value=t.value.replace("new",i));const e=document.querySelector(".editor-title");e&&l&&(e.textContent="Editando: "+l),window.history.pushState({},"Editando: "+l,"/editor/"+i)}function fe(i){let l=!1,s=!1;const t=!F("page-id");t&&J(),i.on("component:update",()=>{l=!0}),i.on("component:add",()=>{l=!0}),i.on("component:remove",()=>{l=!0}),i.on("style:update",()=>{l=!0}),document.addEventListener("editor:saved",()=>{l=!1});const e=document.getElementById("save-button");e&&e.addEventListener("click",function(){setTimeout(()=>{l=!1},1e3)}),document.addEventListener("click",function(a){he(a,l,t,d=>{s=d})}),window.addEventListener("popstate",function(a){be(a,l,s,t,d=>{s=d})}),ye()}function J(){for(let i=0;i<localStorage.length;i++){const l=localStorage.key(i);l&&l.startsWith("gjs-")&&!l.includes("page-")&&localStorage.removeItem(l)}}function he(i,l,s,t){const e=i.target.closest("a[href], button[data-nav]");if(e&&!e.closest("#gjs")&&!e.closest(".swal2-container")&&l){const a=e.getAttribute("href")||"",d=e.hasAttribute("data-nav");(a&&!a.startsWith("#")&&!a.startsWith("javascript:")||d)&&(i.preventDefault(),N.fire({title:"¿Estás seguro?",text:"Hay cambios sin guardar que se perderán si sales de esta página.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, salir",cancelButtonText:"Cancelar"}).then(c=>{c.isConfirmed&&(t(!0),s&&J(),a?window.location.href=a:d&&xe(e))}))}}function xe(i){const l=i.getAttribute("data-nav");l==="back"?window.history.back():l==="home"?window.location.href="/":l&&(window.location.href=l)}function be(i,l,s,t,e){l&&!s&&(i.preventDefault(),history.pushState(null,document.title,window.location.href),N.fire({title:"¿Estás seguro?",text:"Hay cambios sin guardar que se perderán si sales de esta página.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#23366A",cancelButtonColor:"#e74c3c",confirmButtonText:"Sí, salir",cancelButtonText:"Cancelar"}).then(a=>{a.isConfirmed&&(e(!0),t&&J(),window.history.back())}))}function ye(){document.querySelectorAll(".back-button, .nav-back, .btn-back").forEach(s=>{!s.hasAttribute("href")&&!s.hasAttribute("data-nav")&&s.setAttribute("data-nav","back")}),document.querySelectorAll(".home-button, .nav-home, .btn-home").forEach(s=>{!s.hasAttribute("href")&&!s.hasAttribute("data-nav")&&s.setAttribute("data-nav","home")})}
