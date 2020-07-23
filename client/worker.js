console.log("Service Worker Loaded...");

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
      console.log('clone', respClone);
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

self.addEventListener("push",  event => {

  console.log('data_new',event.data.json());
  console.log("Push Recieved..");
  const data = event.data.json();
  console.log('data',data)
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});


