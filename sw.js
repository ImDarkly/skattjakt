if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),u={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>u[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-f3e6b16a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-d1IEbAuS.js",revision:null},{url:"assets/index-dgptGWBo.js",revision:null},{url:"assets/index-F-QcZ8hz.css",revision:null},{url:"assets/index-Hvq_rv2E.js",revision:null},{url:"assets/mode-toggle-B6phtNFp.js",revision:null},{url:"index.html",revision:"3afcd715a2a670699cbe6bd8ec2dd39e"},{url:"registerSW.js",revision:"46a3c4ace4f1e5360145684cc95be2e5"},{url:"assets/favicon.svg",revision:"3178e5e6ef035a0326c5dc28983cbe37"},{url:"manifest.webmanifest",revision:"16df7b517f4f6281792a44e22053d72d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
