self.addEventListener('install', (e) => {
    console.log('service worker installed');
    self.skipWaiting();
});


self.addEventListener('activate', (e) => {
    console.log('service worker activated');
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            console.log('name', cacheNames);
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    if (cacheName !== 'v1') {
                        delete caches.delete(cacheName);
                    }
                })
            );
        })
    )
});

self.addEventListener('fetch', (e) => {
    console.log('fetching...');
    e.respondWith(fetch(e.request).then((resp) => {
        const respClone = resp.clone();
        caches.open('v2').then((cache) => {
            cache.put(e.request, respClone);
        });
        return resp;
    })
        .catch(() => {
            return caches.match(e.request);
        })

    );
});