/// <reference lib="webworker" />

const CACHE_NAME = "gnazario-v1";
const STATIC_ASSETS = [
	"/",
	"/blog",
	"/projects",
	"/favicon.svg",
	"/manifest.json",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(STATIC_ASSETS);
		}),
	);
	self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames
					.filter((name) => name !== CACHE_NAME)
					.map((name) => caches.delete(name)),
			);
		}),
	);
	self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip non-GET requests
	if (request.method !== "GET") {
		return;
	}

	// Skip external requests
	if (url.origin !== self.location.origin) {
		return;
	}

	// Skip API routes and server functions
	if (url.pathname.startsWith("/_server") || url.pathname.startsWith("/api")) {
		return;
	}

	event.respondWith(
		// Network first strategy for HTML pages
		fetch(request)
			.then((response) => {
				// Don't cache non-successful responses
				if (!response.ok) {
					return response;
				}

				// Clone the response before caching
				const responseToCache = response.clone();

				caches.open(CACHE_NAME).then((cache) => {
					// Only cache same-origin requests
					if (url.origin === self.location.origin) {
						cache.put(request, responseToCache);
					}
				});

				return response;
			})
			.catch(() => {
				// Fallback to cache if network fails
				return caches.match(request).then((cachedResponse) => {
					if (cachedResponse) {
						return cachedResponse;
					}

					// Return offline page for navigation requests
					if (request.mode === "navigate") {
						return caches.match("/");
					}

					return new Response("Offline", {
						status: 503,
						statusText: "Service Unavailable",
					});
				});
			}),
	);
});
