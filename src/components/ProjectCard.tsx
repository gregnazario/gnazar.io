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

function CardBody({
	project,
	showRole,
	showAction,
	locale,
}: {
	project: Project;
	showRole: boolean;
	showAction: boolean;
	locale: Locale;
}) {
	const to =
		locale === defaultLocale ? "/projects/$slug" : "/$locale/projects/$slug";
	const params =
		locale === defaultLocale
			? { slug: project.slug }
			: { locale, slug: project.slug };

	return (
		<article className="card project-card">
			{project.image ? (
				<Link
					className="project-card-image"
					to={to}
					params={params}
					tabIndex={-1}
				>
					<img
						src={project.image}
						alt={`${project.title} preview`}
						loading="lazy"
						decoding="async"
						width={1200}
						height={750}
					/>
				</Link>
			) : null}
			<div className="card-meta">
				{project.year ? <span>{project.year}</span> : null}
				{showRole && project.role ? <span>{project.role}</span> : null}
				{project.featured ? <Badge>Featured</Badge> : null}
			</div>
			<h3>
				<Link to={to} params={params}>
					{project.title}
				</Link>
			</h3>
			<p>{project.summary}</p>
			{project.tech && project.tech.length > 0 ? (
				<div className="card-tech">
					{project.tech.map((item) => (
						<Badge key={item}>{item}</Badge>
					))}
				</div>
			) : null}
			{showAction ? (
				<div className="hero-actions">
					<Link className="button ghost" to={to} params={params}>
						{t(locale, "readMore")}
					</Link>
				</div>
			) : null}
		</article>
	);
}

export default memo(function ProjectCard({
	project,
	showRole = false,
	showAction = false,
	locale = defaultLocale,
}: ProjectCardProps) {
	return (
		<CardBody
			project={project}
			showRole={showRole}
			showAction={showAction}
			locale={locale}
		/>
	);
});
