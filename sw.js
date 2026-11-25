const CACHE_NAME = "luna-stories-static-v12";
const CORE_ASSETS = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest", "./icon.svg"];
const NETWORK_FIRST = new Set(["/", "/index.html", "/styles.css", "/app.js", "/manifest.webmanifest", "/sw.js", "/icon.svg"]);

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;
  const isNavigation = request.mode === "navigate";
  const isAppAsset = NETWORK_FIRST.has(path) || /\/(index\.html|styles\.css|app\.js|manifest\.webmanifest|sw\.js|icon\.svg)$/.test(path);
  const networkFirst = isNavigation || isAppAsset;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    if (networkFirst) {
      try {
        const response = await fetch(request, { cache: "no-cache" });
        if (response && response.ok) {
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (isNavigation) {
          const home = await caches.match("./index.html");
          if (home) return home;
        }
        return new Response("Luna Stories est hors ligne. Reconnecte-toi pour actualiser cette ressource.", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
    }

    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && response.ok) await cache.put(request, response.clone());
      return response;
    } catch {
      return new Response("Ressource indisponible hors ligne.", {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  })());
});
