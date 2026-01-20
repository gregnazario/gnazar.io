import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import NotFound from "@/components/NotFound";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { isValidLocale, type Locale, t } from "@/lib/i18n";
import { fetchProjects } from "@/server/content";

export const Route = createFileRoute("/$locale/projects/")({
	beforeLoad: ({ params }) => {
		const locale = params.locale as Locale;

		// Redirect /en/projects to /projects (default locale doesn't need prefix)
		if (locale === "en") {
			throw redirect({ to: "/projects" });
		}
	},
	loader: async ({ params }) => {
		const locale = params.locale as Locale;

		// Show 404 for invalid locales (must be in loader, not beforeLoad, for SSR)
		if (!isValidLocale(locale)) {
			throw notFound();
		}

		const projects = await fetchProjects({ data: { locale } });
		return { projects, locale };
	},
	component: ProjectsPage,
	notFoundComponent: NotFound,
	head: ({ loaderData }) => ({
		meta: [
			{ title: `${t(loaderData?.locale ?? "en", "projects")} | Greg Nazario` },
			{
				name: "description",
				content: "Selected work across systems, products, and research.",
			},
		],
	}),
});

function ProjectsPage() {
	const { projects, locale } = Route.useLoaderData();

	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title={t(locale, "projects")}
					subtitle="Selected work across systems, products, and research."
				/>
				<div className="grid two">
					{projects.map((project) => (
						<ProjectCard
							key={project.slug}
							project={project}
							showRole
							showAction
							locale={locale}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
