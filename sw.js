var cacheName = 'cyber-gems-pwa';
var filesToCache = [
  '/cybergems/',
  '/cybergems/index.html',
  '/cybergems/css/style.css',
  '/cybergems/css/all.css',
  '/cybergems/css/solid.css',
  '/cybergems/css/brands.css',
  '/cybergems/js/app.js',
  '/cybergems/js/waxjs.js',
  '/cybergems/js/interactions.js'
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
