if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const t=e=>n(e,o),c={module:{uri:o},exports:d,require:t};i[o]=Promise.all(r.map((e=>c[e]||t(e)))).then((e=>(s(...e),d)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/App-CRmiNQ3J.js",revision:null},{url:"assets/index-B5lnfdlB.js",revision:null},{url:"assets/index-wQzxxwo9.css",revision:null},{url:"index.html",revision:"0735baeceaaec0a98452ed678e88017c"},{url:"registerSW.js",revision:"b3e95930fd3ec76f36230c446ad6331d"},{url:"android-chrome-144x144.png",revision:"3711ecf4c35393d9460bdfc526c43232"},{url:"android-chrome-192x192.png",revision:"32fe3b01ec89331f502f2d5c1a506dca"},{url:"android-chrome-512x512.png",revision:"4b6e357c019f80b6199aa6833b7bd553"},{url:"apple-touch-icon.png",revision:"63dad381ea3f724d47a200fef13980ac"},{url:"manifest.webmanifest",revision:"ff3a2b59255944ef39dbf1e493845719"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
