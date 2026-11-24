import { Link } from "@tanstack/react-router";

import type { Project } from "@/lib/content-i18n";
import { defaultLocale, type Locale, t } from "@/lib/i18n";

export type ProjectRef = { slug: string; title: string };

type ProjectNavigationProps = {
	previous?: ProjectRef;
	next?: ProjectRef;
	locale?: Locale;
};

const toRef = (project?: Project): ProjectRef | undefined =>
	project ? { slug: project.slug, title: project.title } : undefined;

/** The projects listed just before and after `slug`, in the order the list shows them. */
export function projectNeighbours(
	projects: Project[],
	slug: string,
): { previous?: ProjectRef; next?: ProjectRef } {
	const index = projects.findIndex((project) => project.slug === slug);
	if (index === -1) {
		return {};
	}
	return {
		previous: toRef(projects[index - 1]),
		next: toRef(projects[index + 1]),
	};
}

function ProjectLink({
	slug,
	locale,
	className,
	children,
}: {
	slug: string;
	locale: Locale;
	className: string;
	children: React.ReactNode;
}) {
	return locale === defaultLocale ? (
		<Link to="/projects/$slug" params={{ slug }} className={className}>
			{children}
		</Link>
	) : (
		<Link
			to="/$locale/projects/$slug"
			params={{ locale, slug }}
			className={className}
		>
			{children}
		</Link>
	);
}

function Arrow({ direction }: { direction: "previous" | "next" }) {
	return (
		<svg
			className="post-nav-arrow"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
		>
			{direction === "previous" ? (
				<path d="M19 12H5M12 19l-7-7 7-7" />
			) : (
				<path d="M5 12h14M12 5l7 7-7 7" />
			)}
		</svg>
	);
}

/** Neighbouring projects and a way back to the list, under a project's body. */
export default function ProjectNavigation({
	previous,
	next,
	locale = defaultLocale,
}: ProjectNavigationProps) {
	return (
		<>
			<nav className="post-navigation project-navigation">
				<div className="post-nav-item post-nav-prev">
					{previous ? (
						<ProjectLink
							slug={previous.slug}
							locale={locale}
							className="post-nav-link"
						>
							<Arrow direction="previous" />
							<span className="post-nav-label">
								{t(locale, "previousProject")}
							</span>
							<span className="post-nav-title">{previous.title}</span>
						</ProjectLink>
					) : null}
				</div>
				<div className="post-nav-item post-nav-next">
					{next ? (
						<ProjectLink
							slug={next.slug}
							locale={locale}
							className="post-nav-link"
						>
							<span className="post-nav-label">{t(locale, "nextProject")}</span>
							<span className="post-nav-title">{next.title}</span>
							<Arrow direction="next" />
						</ProjectLink>
					) : null}
				</div>
			</nav>
			<div className="hero-actions">
				{locale === defaultLocale ? (
					<Link className="button ghost" to="/projects">
						{t(locale, "backToProjects")}
					</Link>
				) : (
					<Link
						className="button ghost"
						to="/$locale/projects"
						params={{ locale }}
					>
						{t(locale, "backToProjects")}
					</Link>
				)}
			</div>
		</>
	);
}
