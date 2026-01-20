import { createFileRoute } from "@tanstack/react-router";

import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { defaultLocale } from "@/lib/i18n";
import { fetchProjects } from "@/server/content";

export const Route = createFileRoute("/projects/")({
	loader: async () => fetchProjects({ data: { locale: defaultLocale } }),
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
				<SectionHeading
					title="Projects"
					subtitle="Selected work across systems, products, and research."
				/>
				<div className="grid two">
					{projects.map((project) => (
						<ProjectCard
							key={project.slug}
							project={project}
							showRole
							showAction
						/>
					))}
				</div>
			</div>
		</section>
	);
}
