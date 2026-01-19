import { Link, createFileRoute } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import { getAllProjects } from "@/lib/content";

export const Route = createFileRoute("/projects")({
	loader: async () => getAllProjects(),
	component: ProjectsPage,
	head: () => ({
		meta: [
			{ title: "Projects | Greg Nazario" },
			{
				name: "description",
				content: "Selected work across systems, products, and research.",
			},
		],
	}),
});

function ProjectsPage() {
	const projects = Route.useLoaderData();

	return (
		<section className="section">
			<div className="container">
				<div className="section-heading">
					<h2>Projects</h2>
					<p>Selected work across systems, products, and research.</p>
				</div>
				<div className="grid two">
					{projects.map((project) => (
						<article key={project.slug} className="card">
							<div className="card-meta">
								{project.year ? <span>{project.year}</span> : null}
								{project.role ? <span>{project.role}</span> : null}
								{project.featured ? <Badge>Featured</Badge> : null}
							</div>
							<h3>
								<Link to="/projects/$slug" params={{ slug: project.slug }}>
									{project.title}
								</Link>
							</h3>
							<p>{project.summary}</p>
							<div className="hero-actions">
								<Link
									className="button ghost"
									to="/projects/$slug"
									params={{ slug: project.slug }}
								>
									View details
								</Link>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
