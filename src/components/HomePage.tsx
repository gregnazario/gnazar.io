import { Link } from "@tanstack/react-router";

import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";
import Typewriter from "@/components/Typewriter";
import type { BlogPost, Project } from "@/lib/content-i18n";
import { defaultLocale, type Locale, t } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type HomePageProps = {
	posts: BlogPost[];
	projects: Project[];
	locale?: Locale;
};

/**
 * The home page for every language. All copy comes from the translation
 * table so the English and localized routes can't drift apart.
 */
export default function HomePage({
	posts,
	projects,
	locale = defaultLocale,
}: HomePageProps) {
	const isDefaultLocale = locale === defaultLocale;

	return (
		<>
			<section className="hero">
				<div className="container hero-grid">
					<div className="stack">
						<div>
							<h1>{siteConfig.author}</h1>
							<Typewriter
								as="p"
								text={t(locale, "heroTagline")}
								speed={14}
								delay={120}
							/>
						</div>
						<div className="hero-actions">
							{isDefaultLocale ? (
								<>
									<Link className="button" to="/projects">
										{t(locale, "viewProjects")}
									</Link>
									<Link className="button ghost" to="/blog">
										{t(locale, "readMyBlog")}
									</Link>
								</>
							) : (
								<>
									<Link className="button" to={`/${locale}/projects` as string}>
										{t(locale, "viewProjects")}
									</Link>
									<Link
										className="button ghost"
										to={`/${locale}/blog` as string}
									>
										{t(locale, "readMyBlog")}
									</Link>
								</>
							)}
						</div>
						<SocialLinks />
					</div>
					<div className="hero-card">
						<picture>
							<source srcSet="/images/headshot.avif" type="image/avif" />
							<source srcSet="/images/headshot.webp" type="image/webp" />
							<img
								src="/images/headshot-optimized.png"
								alt={siteConfig.author}
								className="hero-image"
								width={420}
								height={520}
								fetchPriority="high"
								decoding="async"
							/>
						</picture>
						<div className="stack">
							<span className="eyebrow">{t(locale, "currently")}</span>
							<div>{t(locale, "currentRole")}</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<SectionHeading
						eyebrow={t(locale, "experience")}
						title={`11+ ${t(locale, "yearsAtFrontier")}`}
						subtitle={
							<Typewriter
								as="p"
								text={t(locale, "experienceIntro")}
								speed={14}
								delay={120}
							/>
						}
					/>
					<div className="grid two">
						<div className="card">
							<span className="eyebrow">{t(locale, "highlights")}</span>
							<ul className="highlight-list">
								<li>
									<span className="mono">
										{t(locale, "infrastructureScaling")}
									</span>
									<Typewriter
										as="p"
										text={t(locale, "infrastructureScalingHighlight")}
										speed={12}
										cursor={false}
									/>
								</li>
								<li>
									<span className="mono">{t(locale, "developerTooling")}</span>
									<Typewriter
										as="p"
										text={t(locale, "developerToolingHighlight")}
										speed={12}
										cursor={false}
									/>
								</li>
								<li>
									<span className="mono">
										{t(locale, "leadershipMentorship")}
									</span>
									<Typewriter
										as="p"
										text={t(locale, "leadershipMentorshipHighlight")}
										speed={12}
										cursor={false}
									/>
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
										{t(locale, "networkingCloudBlockchain")}
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
					<SectionHeading
						title={t(locale, "focusAreas")}
						subtitle={
							<Typewriter
								as="p"
								text={t(locale, "focusAreasIntro")}
								speed={14}
								delay={120}
							/>
						}
					/>
					<div className="grid three">
						<div className="card">
							<h3>{t(locale, "infrastructureScaling")}</h3>
							<Typewriter
								as="p"
								text={t(locale, "infrastructureScalingFocus")}
								speed={12}
								cursor={false}
							/>
						</div>
						<div className="card">
							<h3>{t(locale, "developerTooling")}</h3>
							<Typewriter
								as="p"
								text={t(locale, "developerToolingFocus")}
								speed={12}
								cursor={false}
							/>
						</div>
						<div className="card">
							<h3>{t(locale, "leadershipMentorship")}</h3>
							<Typewriter
								as="p"
								text={t(locale, "leadershipMentorshipFocus")}
								speed={12}
								cursor={false}
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<SectionHeading
						title={t(locale, "latestWriting")}
						subtitle={
							<Typewriter
								as="p"
								text={t(locale, "latestWritingIntro")}
								speed={14}
								delay={120}
							/>
						}
					/>
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
					<SectionHeading
						title={t(locale, "featuredProjects")}
						subtitle={
							<Typewriter
								as="p"
								text={t(locale, "featuredProjectsIntro")}
								speed={14}
								delay={120}
							/>
						}
					/>
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
						{isDefaultLocale ? (
							<Link className="button ghost" to="/projects">
								{t(locale, "viewAllProjects")}
							</Link>
						) : (
							<Link
								className="button ghost"
								to={`/${locale}/projects` as string}
							>
								{t(locale, "viewAllProjects")}
							</Link>
						)}
					</div>
				</div>
			</section>
		</>
	);
}
