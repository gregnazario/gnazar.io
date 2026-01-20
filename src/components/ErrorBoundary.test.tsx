import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

// Component that throws an error
function ThrowError(): never {
	throw new Error("Test error");
}

// Component that renders normally
function NormalComponent() {
	return <div>Normal content</div>;
}

describe("ErrorBoundary", () => {
	// Suppress console.error for these tests since we're testing error handling
	const originalError = console.error;
	beforeAll(() => {
		console.error = vi.fn();
	});
	afterAll(() => {
		console.error = originalError;
	});

	it("renders children when there is no error", () => {
		render(
			<ErrorBoundary>
				<NormalComponent />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Normal content")).toBeInTheDocument();
	});

	it("renders fallback UI when there is an error", () => {
		render(
			<ErrorBoundary>
				<ThrowError />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
		expect(
			screen.getByText(/an unexpected error occurred/i),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /refresh page/i }),
		).toBeInTheDocument();
	});

	it("renders custom fallback when provided", () => {
		render(
			<ErrorBoundary fallback={<div>Custom error message</div>}>
				<ThrowError />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Custom error message")).toBeInTheDocument();
	});
});
