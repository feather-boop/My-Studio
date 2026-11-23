const C="my-studio-v1",F=["./","index.html","manifest.json","icon.svg","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(h=>{const n=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==="opaque"))caches.open(C).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>h);return h||n}))});
