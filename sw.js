if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),c={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-f3e6b16a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-AWUAx7Xq.js",revision:null},{url:"assets/index-JgI5HXc0.js",revision:null},{url:"assets/index-MKTBsUm9.css",revision:null},{url:"assets/index-nc6j2vUt.js",revision:null},{url:"assets/mode-toggle-oP95aK2W.js",revision:null},{url:"index.html",revision:"7fd36c9a5e76c38ba098b55b45cf904a"},{url:"registerSW.js",revision:"46a3c4ace4f1e5360145684cc95be2e5"},{url:"assets/favicon.svg",revision:"3178e5e6ef035a0326c5dc28983cbe37"},{url:"manifest.webmanifest",revision:"16df7b517f4f6281792a44e22053d72d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
