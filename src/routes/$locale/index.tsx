import {
	createFileRoute,
	Link,
	notFound,
	redirect,
} from "@tanstack/react-router";

import NotFound from "@/components/NotFound";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";
import Typewriter from "@/components/Typewriter";
import { isValidLocale, type Locale, t } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { fetchBlogPosts, fetchProjects } from "@/server/content";

export const Route = createFileRoute("/$locale/")({
	beforeLoad: ({ params }) => {
		const locale = params.locale as Locale;

		// Redirect /en to / (default locale doesn't need prefix)
		if (locale === "en") {
			throw redirect({ to: "/" });
		}
	},
	loader: async ({ params }) => {
		const locale = params.locale as Locale;

		// Show 404 for invalid locales (must be in loader, not beforeLoad, for SSR)
		if (!isValidLocale(locale)) {
			throw notFound();
		}

		const [posts, projects] = await Promise.all([
			fetchBlogPosts({ data: { locale } }),
			fetchProjects({ data: { locale } }),
		]);

		return {
			posts: posts.slice(0, 2),
			projects: projects.slice(0, 2),
			locale,
		};
	},
	component: HomePage,
	notFoundComponent: NotFound,
});

function HomePage() {
	const { posts, projects, locale } = Route.useLoaderData();

	return (
		<>
			<section className="hero">
				<div className="container hero-grid">
					<div className="stack">
						<div>
							<h1>{siteConfig.author}</h1>
							<Typewriter
								as="p"
								text="Founding Engineer at Aptos Labs. I build and scale infrastructure, create developer tooling, and lead teams shipping frontier technology."
								speed={14}
								delay={120}
							/>
						</div>
						<div className="hero-actions">
							<Link className="button" to={`/${locale}/projects` as string}>
								{t(locale, "viewProjects")}
							</Link>
							<Link className="button ghost" to={`/${locale}/blog` as string}>
								{t(locale, "readMyBlog")}
							</Link>
						</div>
						<SocialLinks />
					</div>
					<div className="hero-card">
						<picture>
							<source srcSet="/images/headshot.avif" type="image/avif" />
							<source srcSet="/images/headshot.webp" type="image/webp" />
							<img
								src="/images/headshot-optimized.png"
								alt="Greg Nazario"
								className="hero-image"
								width={420}
								height={520}
								fetchPriority="high"
								decoding="async"
							/>
						</picture>
						<div className="stack">
							<span className="eyebrow">{t(locale, "currently")}</span>
							<div>Founding Engineer, Aptos Labs</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<SectionHeading
						eyebrow={t(locale, "experience")}
						title={`11+ ${t(locale, "yearsAtFrontier")}`}
					/>
					<div className="grid two">
						<div className="card">
							<span className="eyebrow">{t(locale, "highlights")}</span>
							<ul className="highlight-list">
								<li>
									<span className="mono">Infrastructure scaling</span>
								</li>
								<li>
									<span className="mono">Developer tooling</span>
								</li>
								<li>
									<span className="mono">Leadership & mentorship</span>
								</li>
							</ul>
						</div>
						<div className="card">
							<span className="eyebrow">{t(locale, "signals")}</span>
							<div className="stat-grid">
								<div className="stat">
									<div className="stat-value">11+</div>
									<div className="stat-label">
										{t(locale, "yearsExperience")}
									</div>
								</div>
								<div className="stat">
									<div className="stat-value">
										Networking, Cloud, Blockchain
									</div>
									<div className="stat-label">
										{t(locale, "technologyFocus")}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<SectionHeading title={t(locale, "focusAreas")} />
					<div className="grid three">
						<div className="card">
							<h3>Infrastructure scaling</h3>
						</div>
						<div className="card">
							<h3>Developer tooling</h3>
						</div>
						<div className="card">
							<h3>Leadership & mentorship</h3>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<SectionHeading title={t(locale, "latestWriting")} />
					<div className="grid two">
						{posts.map((post) => (
							<PostCard
								key={post.slug}
								post={post}
								maxTags={2}
								locale={locale}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<SectionHeading title={t(locale, "featuredProjects")} />
					<div className="grid two">
						{projects.map((project) => (
							<ProjectCard
								key={project.slug}
								project={project}
								locale={locale}
							/>
						))}
					</div>
					<div style={{ marginTop: "2rem" }}>
						<Link className="button ghost" to={`/${locale}/projects` as string}>
							{t(locale, "viewAllProjects")}
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
