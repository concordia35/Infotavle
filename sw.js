const CACHE_NAME = "of-slagelse-pwa-v3";
const PRECACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./display.js",
  "./manifest.webmanifest",
  "./kaedeled.png",
  "./qr-folder.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./slideshow/billeder.json",
  "./slideshow/01.png",
  "./slideshow/02.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

async function updateImageCacheFromList(response) {
  try {
    const clone = response.clone();
    const names = await clone.json();
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(
      names.map(name =>
        fetch("./slideshow/" + name, {cache:"no-store"})
          .then(r => r.ok ? cache.put("./slideshow/" + name, r.clone()) : null)
          .catch(() => null)
      )
    );
  } catch(e) {}
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  if (url.pathname.endsWith("/slideshow/billeder.json")) {
    event.respondWith(
      fetch(request, {cache:"no-store"})
        .then(async response => {
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
            updateImageCacheFromList(response.clone());
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(async response => {
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
