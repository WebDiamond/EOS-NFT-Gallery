var cacheName = 'eos-gallery-pwa';
var filesToCache = [
  '/index.html',
  '/css/style.css',
  '/css/all.css',
  '/css/solid.css',
  '/css/brands.css',
  '/js/app.js',
  '/js/waxjs.js',
  '/js/interactions.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
