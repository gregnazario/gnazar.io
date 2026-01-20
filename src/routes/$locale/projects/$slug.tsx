import {
	createFileRoute,
	Link,
	notFound,
	redirect,
} from "@tanstack/react-router";

import Badge from "@/components/Badge";
import NotFound from "@/components/NotFound";
import { isValidLocale, type Locale, t } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { fetchProject } from "@/server/content";

type ProjectLoaderData = {
	project: NonNullable<Awaited<ReturnType<typeof fetchProject>>>["project"];
	html: string;
	locale: Locale;
} | null;

export const Route = createFileRoute("/$locale/projects/$slug")({
	beforeLoad: ({ params }) => {
		const locale = params.locale as Locale;

		// Redirect /en/projects/slug to /projects/slug (default locale doesn't need prefix)
		if (locale === "en") {
			throw redirect({ to: "/projects/$slug", params: { slug: params.slug } });
		}
	},
	loader: async ({ params }): Promise<ProjectLoaderData> => {
		const locale = params.locale as Locale;

		// Show 404 for invalid locales (must be in loader, not beforeLoad, for SSR)
		if (!isValidLocale(locale)) {
			throw notFound();
		}

		const data = await fetchProject({
			data: { slug: params.slug, locale },
		});

		if (!data) {
			return null;
		}

		return { ...data, locale };
	},
	component: ProjectPage,
	notFoundComponent: NotFound,
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
					content: `${siteConfig.url}/${loaderData.locale}/projects/${loaderData.project.slug}`,
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

	const { project, html, locale } = data;

	return (
		<section className="section">
			<div className="container">
				<div className="stack">
					<Link className="button ghost" to={`/${locale}/projects` as string}>
						{t(locale, "projects")}
					</Link>
					{project.isTranslated && (
						<div className="translation-notice">
							<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
							</svg>
							{t(locale, "translatedBy")}
						</div>
					)}
					<article className="prose">
						<h1>{project.title}</h1>
						<div className="card-meta">
							{project.year ? <span>{project.year}</span> : null}
							{project.role ? <span>{project.role}</span> : null}
							{project.featured ? <Badge>Featured</Badge> : null}
						</div>
						{/* biome-ignore lint/security/noDangerouslySetInnerHtml: content is local */}
						<div dangerouslySetInnerHTML={{ __html: html }} />
						{project.links.length > 0 ? (
							<div className="hero-actions">
								{project.links.map((link) => (
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
