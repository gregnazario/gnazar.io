import { memo } from "react";

import Badge from "@/components/Badge";
import type { Project, ProjectStatus } from "@/lib/content-i18n";
import { formatDate } from "@/lib/format";
import { defaultLocale, type Locale, t } from "@/lib/i18n";

const STATUS_KEYS: Record<ProjectStatus, string> = {
	active: "statusActive",
	maintained: "statusMaintained",
	archived: "statusArchived",
};

type ProjectHeaderProps = {
	project: Project;
	locale?: Locale;
};

/**
 * Hero image, meta line, tech badges, and GitHub stats shown above a
 * project's body. Shared by the default-locale and localized routes.
 */
export default memo(function ProjectHeader({
	project,
	locale = defaultLocale,
}: ProjectHeaderProps) {
	const hasStats =
		project.stars !== undefined ||
		project.forks !== undefined ||
		project.lastPush !== undefined;

	return (
		<>
			{project.image ? (
				<img
					className="project-hero-image"
					src={project.image}
					alt={`${project.title} screenshot or poster`}
					width={1200}
					height={750}
					fetchPriority="high"
					decoding="async"
				/>
			) : null}
			<div className="card-meta">
				{project.year ? <span>{project.year}</span> : null}
				{project.role ? <span>{project.role}</span> : null}
				{project.featured ? <Badge>Featured</Badge> : null}
				{project.status ? (
					<span className={`badge status-${project.status}`}>
						{t(locale, STATUS_KEYS[project.status])}
					</span>
				) : null}
			</div>
			{project.tech && project.tech.length > 0 ? (
				<div className="card-tech">
					{project.tech.map((item) => (
						<Badge key={item}>{item}</Badge>
					))}
				</div>
			) : null}
			{hasStats ? (
				<div className="project-stats">
					{project.stars !== undefined ? (
						<span className="project-stat">
							★ {project.stars}{" "}
							{t(locale, project.stars === 1 ? "star" : "stars")}
						</span>
					) : null}
					{project.forks !== undefined ? (
						<span className="project-stat">
							⑂ {project.forks}{" "}
							{t(locale, project.forks === 1 ? "fork" : "forks")}
						</span>
					) : null}
					{project.lastPush ? (
						<span className="project-stat">
							{t(locale, "lastPush")} {formatDate(project.lastPush, locale)}
						</span>
					) : null}
				</div>
			) : null}
		</>
	);
});
