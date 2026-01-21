import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/500")({
	component: Error500Page,
	head: () => ({
		meta: [
			{ title: "500 - Server Error | Greg Nazario" },
			{
				name: "description",
				content: "Something went wrong on our end.",
			},
		],
	}),
});

function Error500Page() {
	return (
		<section className="section">
			<div className="container">
				<div className="error-page">
					<div className="error-terminal">
						<div className="terminal-header">
							<span className="terminal-dot red" />
							<span className="terminal-dot yellow" />
							<span className="terminal-dot green" />
							<span className="terminal-title">server.log</span>
						</div>
						<div className="terminal-body">
							<div className="terminal-line">
								<span className="terminal-prompt">$</span>
								<span className="terminal-command">curl -I localhost:3000</span>
							</div>
							<div className="terminal-line error">
								<span className="terminal-output">
									HTTP/1.1 500 Internal Server Error
								</span>
							</div>
							<div className="terminal-line">
								<span className="terminal-output dim">
									Date: {new Date().toUTCString()}
								</span>
							</div>
							<div className="terminal-line">
								<span className="terminal-output dim">
									X-Error-Code: UNEXPECTED_FAILURE
								</span>
							</div>
							<div className="terminal-line blank" />
							<div className="terminal-line">
								<span className="terminal-prompt">$</span>
								<span className="terminal-command">
									cat /var/log/error.log | tail -1
								</span>
							</div>
							<div className="terminal-line error">
								<span className="terminal-output">
									[ERROR] Something broke. We're looking into it.
								</span>
							</div>
							<div className="terminal-line blank" />
							<div className="terminal-line">
								<span className="terminal-prompt">$</span>
								<span className="terminal-command">
									echo "Suggested actions:"
								</span>
							</div>
							<div className="terminal-line">
								<span className="terminal-output">1. Refresh the page</span>
							</div>
							<div className="terminal-line">
								<span className="terminal-output">
									2. Try again in a moment
								</span>
							</div>
							<div className="terminal-line">
								<span className="terminal-output">3. Return to safety</span>
							</div>
							<div className="terminal-line blank" />
							<div className="terminal-line">
								<span className="terminal-prompt">$</span>
								<span className="terminal-cursor">_</span>
							</div>
						</div>
					</div>

					<div className="error-actions">
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="button primary"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
							>
								<polyline points="23,4 23,10 17,10" />
								<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
							</svg>
							Refresh Page
						</button>
						<Link to="/" className="button ghost">
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
							>
								<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
								<polyline points="9,22 9,12 15,12 15,22" />
							</svg>
							Return Home
						</Link>
					</div>

					<p className="error-note">
						If this keeps happening, please{" "}
						<a href="https://github.com/gregnazario/gnazar.io/issues">
							open an issue
						</a>
						.
					</p>
				</div>
			</div>
		</section>
	);
}
