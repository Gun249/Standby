// A very basic service worker to make the app installable and work offline.

const CACHE_NAME = 'standby-pwa-cache-v1';
// List of files to cache.
const urlsToCache = [
  '/',
  'index.html' 
  // We don't cache the script and manifest here as they are small and might change.
  // For a production app, you would cache all static assets.
];

// Install event: opens a cache and adds the core files to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves content from cache if available.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});
window.addEventListener('load', () => {
  handleOrientationChange(); // ตรวจสอบโหมดตอนโหลดหน้า
});