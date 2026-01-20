/**
 * Register the service worker for PWA functionality
 */
export function registerServiceWorker(): void {
	if (typeof window === "undefined") {
		return;
	}

	if (!("serviceWorker" in navigator)) {
		return;
	}

	window.addEventListener("load", async () => {
		try {
			const registration = await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			});

			registration.addEventListener("updatefound", () => {
				const newWorker = registration.installing;
				if (newWorker) {
					newWorker.addEventListener("statechange", () => {
						if (
							newWorker.state === "installed" &&
							navigator.serviceWorker.controller
						) {
							// New content is available, you could show a notification here
							console.log("New content available, refresh to update.");
						}
					});
				}
			});
		} catch (error) {
			console.error("Service worker registration failed:", error);
		}
	});
}
