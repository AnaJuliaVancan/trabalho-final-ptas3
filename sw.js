// let cacheName = "trabalho-final";
// let filesToCache = ["/", "/index.html", "/visualizar.html",
//                 "/css/style.css", "/js/main.js", "https://fonts.googleapis.com/css?family=Poppins&display=swap",
//                 "/pages/fallback.html"];
// let OFFLINE_URL = "/offline.html"

// /* inicializando a service worker e fazendo o 
// download do conteúdo da aplicação */
// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches.open(cacheName).then(function (cache) {
//       return cache.addAll(filesToCache, OFFLINE_URL);
//     })
//   );
// });

// /* disponibilizando o conteudo quando estiver offline */
// self.addEventListener("fetch", (e) => {
//     const req = e.request;
//     const url = new URL(req.url);
//     if(url.origin === location.origin) {
//         e.respondWith(cacheFirst(req));
//       }else {
//         e.respondWith(networkFirst(req));
//       }
// });

// async function cacheFirst(req) {
//     const cachedResponse = await caches.match(req);
//     return cachedResponse || fetch(req);
//   }
  
//   async function networkFirst(req) {
//     const cache = await caches.open('trabalho-final');
//     try {
//       const res = await fetch(req);
//       cache.put(req, res.clone());
//       return res;
//     } catch(error) {
//       return await cache.match(req);
//     }
//   }

const staticCacheName = 'site-static-v12';
const dynamicCacheName = 'site-dynamic-v1';
const assets = ["/", "/index.html", "/css/style.css", "/js/main.js", "https://fonts.googleapis.com/css?family=Poppins&display=swap", "/offline", "/offline/index.html"];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets)
        })
    );
})

//active service worker
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cachesRes => {
            return cachesRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone())
                    return fetchRes;
                })
            });
        }).catch(() => caches.match('/offline/index.html'))
    );
});