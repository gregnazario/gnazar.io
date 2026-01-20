import { Link, useRouterState } from "@tanstack/react-router";

import { defaultLocale, getLocaleFromPath } from "@/lib/i18n";

export default function NotFound() {
	const routerState = useRouterState();
	const locale = getLocaleFromPath(routerState.location.pathname);
	const homePath = locale === defaultLocale ? "/" : `/${locale}`;
	const requestedPath = routerState.location.pathname;

	return (
		<section className="section terminal-error">
			<div className="container">
				<div className="terminal-window">
					<div className="terminal-header">
						<span className="terminal-dot red" />
						<span className="terminal-dot yellow" />
						<span className="terminal-dot green" />
						<span className="terminal-title">bash — 404</span>
					</div>
					<div className="terminal-body">
						<div className="terminal-line">
							<span className="terminal-prompt">$</span>
							<span className="terminal-command">cd {requestedPath}</span>
						</div>
						<div className="terminal-line error">
							<span className="terminal-output">
								bash: cd: {requestedPath}: No such file or directory
							</span>
						</div>
						<div className="terminal-line">
							<span className="terminal-prompt">$</span>
							<span className="terminal-command">echo $?</span>
						</div>
						<div className="terminal-line error">
							<span className="terminal-output">404</span>
						</div>
						<div className="terminal-line">
							<span className="terminal-prompt">$</span>
							<span className="terminal-command">cat /var/log/error.log</span>
						</div>
						<div className="terminal-line">
							<span className="terminal-output dim">
								[ERROR] Page not found. The requested resource does not exist.
							</span>
						</div>
						<div className="terminal-line">
							<span className="terminal-output dim">
								[INFO] Suggestion: Return to root directory
							</span>
						</div>
						<div className="terminal-line">
							<span className="terminal-prompt">$</span>
							<span className="terminal-cursor">█</span>
						</div>
					</div>
					<div className="terminal-actions">
						<Link className="button" to={homePath}>
							<span className="terminal-btn-icon">~</span>
							cd /home
						</Link>
						<button
							type="button"
							className="button ghost"
							onClick={() => window.history.back()}
						>
							<span className="terminal-btn-icon">←</span>
							cd ..
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
