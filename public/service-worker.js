/* eslint-disable no-restricted-globals */
const CACHE_NAME = "dictionary-cache-v3";
const urlsToCache = [
  "/",
  "../src/words_output.json",
  "./index.html",
  "./words_output.json",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (
          !event.request.url.endsWith(".mp3") &&
          !event.request.url.endsWith(".json")
        ) {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }
        }
        if (response.status !== 200) return response;
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
/* eslint-enable no-restricted-globals */
