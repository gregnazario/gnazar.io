import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import { formatDate } from "@/lib/format";
import { defaultLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { fetchProject } from "@/server/content";

type ProjectLoaderData = NonNullable<Awaited<ReturnType<typeof fetchProject>>>;

export const Route = createFileRoute("/projects/$slug")({
	loader: async ({ params }): Promise<ProjectLoaderData> => {
		const data = await fetchProject({
			data: { slug: params.slug, locale: defaultLocale },
		});

		if (!data) {
			throw notFound();
		}

		return data;
	},
	component: ProjectPage,
	head: ({ loaderData }) => {
		if (!loaderData) {
			return {
				meta: [{ title: "Project not found | Greg Nazario" }],
			};
		}

		const ogImage = `${siteConfig.url}/og/${loaderData.project.slug}.png`;

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
				{ property: "og:image", content: ogImage },
				{ property: "og:image:width", content: "1200" },
				{ property: "og:image:height", content: "630" },
				{ property: "og:image:alt", content: loaderData.project.title },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: loaderData.project.title },
				{ name: "twitter:description", content: loaderData.project.summary },
				{ name: "twitter:image", content: ogImage },
				{ name: "twitter:image:alt", content: loaderData.project.title },
			],
		};
	},
});

function ProjectPage() {
	const data = Route.useLoaderData();

	return (
		<section className="section">
			<div className="container">
				<div className="stack">
					<Link className="button ghost" to="/projects">
						Back to projects
					</Link>
					<article className="prose">
						<h1>{data.project.title}</h1>
						{data.project.image ? (
							<img
								className="project-hero-image"
								src={data.project.image}
								alt=""
								width={1200}
								height={750}
								// React 18 only recognizes the lowercase attribute; the camelCase
								// prop logs a dev warning and the types reject the lowercase form.
								{...{ fetchpriority: "high" }}
								decoding="async"
							/>
						) : null}
						<div className="card-meta">
							{data.project.year ? <span>{data.project.year}</span> : null}
							{data.project.role ? <span>{data.project.role}</span> : null}
							{data.project.featured ? <Badge>Featured</Badge> : null}
							{data.project.status ? (
								<span className={`badge status-${data.project.status}`}>
									{data.project.status}
								</span>
							) : null}
						</div>
						{data.project.tech && data.project.tech.length > 0 ? (
							<div className="card-tech">
								{data.project.tech.map((item) => (
									<Badge key={item}>{item}</Badge>
								))}
							</div>
						) : null}
						{data.project.stars !== undefined ||
						data.project.forks !== undefined ||
						data.project.lastPush ? (
							<div className="project-stats">
								{data.project.stars !== undefined ? (
									<span className="project-stat">
										★ {data.project.stars} star
										{data.project.stars === 1 ? "" : "s"}
									</span>
								) : null}
								{data.project.forks !== undefined ? (
									<span className="project-stat">
										⑂ {data.project.forks} fork
										{data.project.forks === 1 ? "" : "s"}
									</span>
								) : null}
								{data.project.lastPush ? (
									<span className="project-stat">
										Last push {formatDate(data.project.lastPush)}
									</span>
								) : null}
							</div>
						) : null}
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
