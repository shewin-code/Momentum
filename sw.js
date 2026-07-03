// Bump CACHE on every deploy that changes precached assets (or just to force a
// refresh). The network-first handler below also keeps the live app current.
// All local paths are RELATIVE so the app works under any repo name / subpath
// (e.g. /Momentum/) and never breaks again if the repo is renamed.
const CACHE = 'momentum-v10';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // Cache assets individually so one failed cross-origin fetch doesn't
      // abort the whole install.
      .then(c => Promise.all(ASSETS.map(a => c.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for page navigations (the HTML document) so a fresh deploy
// shows up immediately when online; falls back to cache when offline.
// Cache-first for everything else (fonts, Chart.js, etc.) for speed + offline.
self.addEventListener('fetch', e => {
  const req = e.request;
  const isNav = req.mode === 'navigate' ||
    (req.method === 'GET' && (req.headers.get('accept') || '').includes('text/html'));

  if (isNav) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(req, clone));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
