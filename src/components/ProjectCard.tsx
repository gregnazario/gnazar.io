import { Link } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
	project: Project;
	showRole?: boolean;
	showAction?: boolean;
};

export default function ProjectCard({
	project,
	showRole = false,
	showAction = false,
}: ProjectCardProps) {
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
						View details
					</Link>
				</div>
			) : null}
		</article>
	);
}
