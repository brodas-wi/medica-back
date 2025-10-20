import{g as E}from"./sweetalert2.esm.all-x82VjDyW.js";var x={exports:{}};/*! grapesjs-blocks-basic - 1.0.2 */var F=x.exports,O;function G(){return O||(O=1,function(A,R){(function(g,p){A.exports=p()})(typeof globalThis<"u"?globalThis:typeof window<"u"?window:F,()=>(()=>{var g={d:(l,e)=>{for(var o in e)g.o(e,o)&&!g.o(l,o)&&Object.defineProperty(l,o,{enumerable:!0,get:e[o]})},o:(l,e)=>Object.prototype.hasOwnProperty.call(l,e),r:l=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(l,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(l,"__esModule",{value:!0})}},p={};g.r(p),g.d(p,{default:()=>P});var n=function(){return n=Object.assign||function(l){for(var e,o=1,t=arguments.length;o<t;o++)for(var a in e=arguments[o])Object.prototype.hasOwnProperty.call(e,a)&&(l[a]=e[a]);return l},n.apply(this,arguments)},V=function(){return V=Object.assign||function(l){for(var e,o=1,t=arguments.length;o<t;o++)for(var a in e=arguments[o])Object.prototype.hasOwnProperty.call(e,a)&&(l[a]=e[a]);return l},V.apply(this,arguments)};const P=function(l,e){e===void 0&&(e={}),function(o,t){var a=o.BlockManager,S=t.category,T=t.blocks,d=t.stylePrefix,v=t.flexGrid,H=t.rowHeight,b=t.addBasicStyle,u="".concat(d,"row"),h="".concat(d,"cell"),f=v?`
    .`.concat(u,` {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 10px;
    }
    @media (max-width: 768px) {
      .`).concat(u,` {
        flex-wrap: wrap;
      }
    }`):`
    .`.concat(u,` {
      display: table;
      padding: 10px;
      width: 100%;
    }
    @media (max-width: 768px) {
      .`).concat(d,"cell, .").concat(d,"cell30, .").concat(d,`cell70 {
        width: 100%;
        display: block;
      }
    }`),C=v?`
    .`.concat(h,` {
      min-height: `).concat(H,`px;
      flex-grow: 1;
      flex-basis: 100%;
    }`):`
    .`.concat(h,` {
      width: 8%;
      display: table-cell;
      height: `).concat(H,`px;
    }`),D=`
  .`.concat(d,`cell30 {
    width: 30%;
  }`),I=`
  .`.concat(d,`cell70 {
    width: 70%;
  }`),M=1,j={tl:0,tc:0,tr:0,cl:0,cr:0,bl:0,br:0,minDim:M},Z=n(n({},j),{cr:1,bc:0,currentUnit:1,minDim:M,step:.2});v&&(Z.keyWidth="flex-basis");var q={class:u,"data-gjs-droppable":".".concat(h),"data-gjs-resizable":j,"data-gjs-name":"Row"},w={class:h,"data-gjs-draggable":".".concat(u),"data-gjs-resizable":Z,"data-gjs-name":"Cell"};v&&(w["data-gjs-unstylable"]=["width"],w["data-gjs-stylable-require"]=["flex-basis"]);var z=[".".concat(u),".".concat(h)];o.on("selector:add",function(s){return z.indexOf(s.getFullName())>=0&&s.set("private",1)});var k=function(s){var L=[];for(var B in s){var m=s[B];m=m instanceof Array||m instanceof Object?JSON.stringify(m):m,L.push("".concat(B,"=").concat("'".concat(m,"'")))}return L.length?" ".concat(L.join(" ")):""},c=function(s){return T.indexOf(s)>=0},y=k(q),r=k(w),i={category:S,select:!0};c("column1")&&a.add("column1",n(n({},i),{label:t.labelColumn1,media:`<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"/>
      </svg>`,content:"<div ".concat(y,`>
        <div `).concat(r,`></div>
      </div>
      `).concat(b?`<style>
          `.concat(f,`
          `).concat(C,`
        </style>`):"")})),c("column2")&&a.add("column2",n(n({},i),{label:t.labelColumn2,media:`<svg viewBox="0 0 23 24">
        <path fill="currentColor" d="M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z"/>
      </svg>`,content:"<div ".concat(y,`>
        <div `).concat(r,`></div>
        <div `).concat(r,`></div>
      </div>
      `).concat(b?`<style>
          `.concat(f,`
          `).concat(C,`
        </style>`):"")})),c("column3")&&a.add("column3",n(n({},i),{label:t.labelColumn3,media:`<svg viewBox="0 0 23 24">
        <path fill="currentColor" d="M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"/>
      </svg>`,content:"<div ".concat(y,`>
        <div `).concat(r,`></div>
        <div `).concat(r,`></div>
        <div `).concat(r,`></div>
      </div>
      `).concat(b?`<style>
          `.concat(f,`
          `).concat(C,`
        </style>`):"")})),c("column3-7")&&a.add("column3-7",n(n({},i),{label:t.labelColumn37,media:`<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z"/>
      </svg>`,content:"<div ".concat(y,`>
        <div `).concat(r," style='").concat(v?"flex-basis":"width",`: 30%;'></div>
        <div `).concat(r," style='").concat(v?"flex-basis":"width",`: 70%;'></div>
      </div>
      `).concat(b?`<style>
          `.concat(f,`
          `).concat(C,`
          `).concat(D,`
          `).concat(I,`
        </style>`):"")})),c("text")&&a.add("text",n(n({},i),{activate:!0,label:t.labelText,media:`<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
      </svg>`,content:{type:"text",content:"Insert your text here",style:{padding:"10px"}}})),c("link")&&a.add("link",n(n({},i),{label:t.labelLink,media:`<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
      </svg>`,content:{type:"link",content:"Link",style:{color:"#d983a6"}}})),c("image")&&a.add("image",n(n({},i),{activate:!0,label:t.labelImage,media:`<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" />
      </svg>`,content:{style:{color:"black"},type:"image"}})),c("video")&&a.add("video",n(n({},i),{label:t.labelVideo,media:`<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
      </svg>`,content:{type:"video",src:"img/video2.webm",style:{height:"350px",width:"615px"}}})),c("map")&&a.add("map",n(n({},i),{label:t.labelMap,media:`<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M20.5,3L20.34,3.03L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3M10,5.47L14,6.87V18.53L10,17.13V5.47M5,6.46L8,5.45V17.15L5,18.31V6.46M19,17.54L16,18.55V6.86L19,5.7V17.54Z" />
      </svg>`,content:{type:"map",style:{height:"350px"}}}))}(l,V({blocks:["column1","column2","column3","column3-7","text","link","image","video","map"],flexGrid:!1,stylePrefix:"gjs-",addBasicStyle:!0,category:"Basic",labelColumn1:"1 Column",labelColumn2:"2 Columns",labelColumn3:"3 Columns",labelColumn37:"2 Columns 3/7",labelText:"Text",labelLink:"Link",labelImage:"Image",labelVideo:"Video",labelMap:"Map",rowHeight:75},e))};return p})())}(x)),x.exports}var N=G();const J=E(N);export{J as g};
