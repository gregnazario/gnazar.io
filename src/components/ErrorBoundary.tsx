import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
	children: ReactNode;
	fallback?: ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
};

export default class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		// Don't store the error object to avoid exposing sensitive data
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// Only log in development to avoid exposing stack traces in production
		if (process.env.NODE_ENV === "development") {
			console.error("Error caught by boundary:", error.message, errorInfo);
		}
		// In production, send sanitized error info to an error tracking service
		// e.g., Sentry, LogRocket, etc. - but only the message, not the stack
	}

	render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="error-boundary">
					<div className="container">
						<div className="card">
							<h2>Something went wrong</h2>
							<p>
								An unexpected error occurred. Please try refreshing the page.
							</p>
							<button
								type="button"
								className="button"
								onClick={() => window.location.reload()}
							>
								Refresh page
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
