import { createFileRoute, Link } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import { defaultLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { fetchProject } from "@/server/content";

type ProjectLoaderData = Awaited<ReturnType<typeof fetchProject>>;

export const Route = createFileRoute("/projects/$slug")({
	loader: async ({ params }): Promise<ProjectLoaderData> =>
		fetchProject({ data: { slug: params.slug, locale: defaultLocale } }),
	component: ProjectPage,
	head: ({ loaderData }) => {
		if (!loaderData) {
			return {
				meta: [{ title: "Project not found | Greg Nazario" }],
			};
		}

		return {
			meta: [
				{ title: `${loaderData.project.title} | Greg Nazario` },
				{ name: "description", content: loaderData.project.summary },
				{ property: "og:title", content: loaderData.project.title },
				{ property: "og:description", content: loaderData.project.summary },
				{
					property: "og:url",
					content: `${siteConfig.url}/projects/${loaderData.project.slug}`,
				},
			],
		};
	},
});

function ProjectPage() {
	const data = Route.useLoaderData();

	if (!data) {
		return (
			<section className="section">
				<div className="container">
					<div className="card">
						<h2>Project not found</h2>
						<p>This project does not exist.</p>
						<Link className="button ghost" to="/projects">
							Back to projects
						</Link>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="section">
			<div className="container">
				<div className="stack">
					<Link className="button ghost" to="/projects">
						Back to projects
					</Link>
					<article className="prose">
						<h1>{data.project.title}</h1>
						<div className="card-meta">
							{data.project.year ? <span>{data.project.year}</span> : null}
							{data.project.role ? <span>{data.project.role}</span> : null}
							{data.project.featured ? <Badge>Featured</Badge> : null}
						</div>
						{/* biome-ignore lint/security/noDangerouslySetInnerHtml: content is local */}
						<div dangerouslySetInnerHTML={{ __html: data.html }} />
						{data.project.links.length > 0 ? (
							<div className="hero-actions">
								{data.project.links.map((link) => (
									<a
										key={link.href}
										className="button ghost"
										href={link.href}
										target="_blank"
										rel="noreferrer noopener"
									>
										{link.label}
									</a>
								))}
							</div>
						) : null}
					</article>
				</div>
			</div>
		</section>
	);
}
