import { Link } from "@tanstack/react-router";
import { memo } from "react";

import Badge from "@/components/Badge";
import type { Project } from "@/lib/content-i18n";
import { defaultLocale, type Locale, t } from "@/lib/i18n";

type ProjectCardProps = {
	project: Project;
	showRole?: boolean;
	showAction?: boolean;
	locale?: Locale;
};

export default memo(function ProjectCard({
	project,
	showRole = false,
	showAction = false,
	locale = defaultLocale,
}: ProjectCardProps) {
	// For default locale, use /projects/$slug route
	// For other locales, use /$locale/projects/$slug route
	if (locale === defaultLocale) {
		return (
			<article className="card">
				<div className="card-meta">
					{project.year ? <span>{project.year}</span> : null}
					{showRole && project.role ? <span>{project.role}</span> : null}
					{project.featured ? <Badge>Featured</Badge> : null}
				</div>
				<h3>
					<Link to="/projects/$slug" params={{ slug: project.slug }}>
						{project.title}
					</Link>
				</h3>
				<p>{project.summary}</p>
				{showAction ? (
					<div className="hero-actions">
						<Link
							className="button ghost"
							to="/projects/$slug"
							params={{ slug: project.slug }}
						>
							{t(locale, "readMore")}
						</Link>
					</div>
				) : null}
			</article>
		);
	}

	return (
		<article className="card">
			<div className="card-meta">
				{project.year ? <span>{project.year}</span> : null}
				{showRole && project.role ? <span>{project.role}</span> : null}
				{project.featured ? <Badge>Featured</Badge> : null}
			</div>
			<h3>
				<Link
					to="/$locale/projects/$slug"
					params={{ locale, slug: project.slug }}
				>
					{project.title}
				</Link>
			</h3>
			<p>{project.summary}</p>
			{showAction ? (
				<div className="hero-actions">
					<Link
						className="button ghost"
						to="/$locale/projects/$slug"
						params={{ locale, slug: project.slug }}
					>
						{t(locale, "readMore")}
					</Link>
				</div>
			) : null}
		</article>
	);
});
