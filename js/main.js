if (navigator.serviceWorker) {
 // console.log('service worker available');
  window.addEventListener('load', () => {
    const sw = navigator.serviceWorker.register('../sw_site.js');
    sw.then((req) => {
      console.log(req);
   //   console.log('service worker registered');
    })
      .catch((err) => console.log('err',err));
  });
}