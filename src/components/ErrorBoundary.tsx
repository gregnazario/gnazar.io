import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
	children: ReactNode;
	fallback?: ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
	error: Error | null;
};

export default class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// Log error to console in development
		console.error("Error caught by boundary:", error, errorInfo);

		// In production, you could send this to an error tracking service
		// e.g., Sentry, LogRocket, etc.
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
