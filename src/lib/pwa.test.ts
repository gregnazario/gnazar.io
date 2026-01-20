import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { registerServiceWorker } from "./pwa";

describe("registerServiceWorker", () => {
	const originalServiceWorker = navigator.serviceWorker;
	const originalAddEventListener = window.addEventListener;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		Object.defineProperty(navigator, "serviceWorker", {
			value: originalServiceWorker,
			writable: true,
		});
		window.addEventListener = originalAddEventListener;
	});

	it("does nothing when serviceWorker is not supported", () => {
		// Delete serviceWorker from navigator to simulate unsupported browser
		const descriptor = Object.getOwnPropertyDescriptor(
			navigator,
			"serviceWorker",
		);
		delete (navigator as { serviceWorker?: unknown }).serviceWorker;

		const addEventListenerSpy = vi.spyOn(window, "addEventListener");

		registerServiceWorker();

		expect(addEventListenerSpy).not.toHaveBeenCalled();

		// Restore serviceWorker
		if (descriptor) {
			Object.defineProperty(navigator, "serviceWorker", descriptor);
		}
	});

	it("registers load event listener when serviceWorker is supported", () => {
		const mockRegister = vi.fn().mockResolvedValue({
			addEventListener: vi.fn(),
		});

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: mockRegister,
				controller: null,
			},
			writable: true,
		});

		const addEventListenerSpy = vi.spyOn(window, "addEventListener");

		registerServiceWorker();

		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"load",
			expect.any(Function),
		);
	});

	it("calls serviceWorker.register on load event", async () => {
		const mockAddEventListener = vi.fn();
		const mockRegister = vi.fn().mockResolvedValue({
			addEventListener: mockAddEventListener,
		});

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: mockRegister,
				controller: null,
			},
			writable: true,
		});

		let loadCallback: (() => void) | undefined;
		vi.spyOn(window, "addEventListener").mockImplementation(
			(event, callback) => {
				if (event === "load" && typeof callback === "function") {
					loadCallback = callback as () => void;
				}
			},
		);

		registerServiceWorker();

		// Simulate load event
		if (loadCallback) {
			await loadCallback();
		}

		expect(mockRegister).toHaveBeenCalledWith("/sw.js", { scope: "/" });
	});
});
