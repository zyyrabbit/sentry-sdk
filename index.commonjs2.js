module.exports=(()=>{"use strict";var e={581:(e,r,t)=>{t.r(r),t.d(r,{default:()=>s});const o=require("@sentry/browser");var n=t.n(o);const a=require("@sentry/integrations");var i=t.n(a);class s{install(e,r={}){r.Vue=e,s.init(r)}init(e={}){e.Vue&&(e.integrations=[new(i().Vue)({Vue:e.Vue,attachProps:!0,logErrors:!0})]),n().init(e),s.registerError()}registerError(){window.addEventListener("error",(e=>{if(!e.target||!e.target.tagName)return;const r=e.target.tagName.toLowerCase();if("link"===r||"script"===r){const r=e.target.href||e.target.src;s.log(e,{desc:`资源加载失败：${r}`,scoureUrl:r})}}),!0)}log(e,r={}){r.date=new Date,n().captureException(e,{level:n().Severity.Error,extra:r})}}}},r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={exports:{}};return e[o](n,n.exports,t),n.exports}return t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(581)})();