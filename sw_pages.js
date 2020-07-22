self.addEventListener('install', (e) => {
    console.log('service worker installed');
    e.waitUntil(
        caches.open('v1').then((cache) => {
            cache.addAll(['index.html','about.html', '/css/style.css']);
        }).then(() => {
            self.skipWaiting();
        })
    );
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
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));

});

