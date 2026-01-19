import { Link, createFileRoute } from "@tanstack/react-router";

import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";
import Typewriter from "@/components/Typewriter";
import { siteConfig } from "@/lib/site";
import { fetchBlogPosts, fetchProjects } from "@/server/content";

export const Route = createFileRoute("/")({
	loader: async () => {
		const [posts, projects] = await Promise.all([
			fetchBlogPosts(),
			fetchProjects(),
		]);

		return {
			posts: posts.slice(0, 2),
			projects: projects.slice(0, 2),
		};
	},
	component: HomePage,
});

function HomePage() {
	const { posts, projects } = Route.useLoaderData();

	return (
		<>
			<section className="hero">
				<div className="container hero-grid">
					<div className="stack">
						<div>
							<h1>{siteConfig.title}</h1>
							<Typewriter
								as="p"
								text="Founding Engineer at Aptos Labs. I build and scale infrastructure, create developer tooling, and lead teams shipping frontier technology."
								speed={14}
								delay={120}
							/>
						</div>
						<div className="hero-actions">
							<Link className="button" to="/projects">
								View projects
							</Link>
							<Link className="button ghost" to="/blog">
								Read my blog
							</Link>
						</div>
						<SocialLinks />
					</div>
					<div className="hero-card">
						<img
							src="/images/headshot.png"
							alt="Greg Nazario"
							className="hero-image"
							width={420}
							height={520}
						/>
						<div className="stack">
							<span className="eyebrow">Currently</span>
							<div>Founding Engineer, Aptos Labs</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<SectionHeading
						eyebrow="Experience"
						title="11+ years at the frontier"
						subtitle={
							<Typewriter
								as="p"
								text="I have spent more than a decade building platforms where scale, reliability, and velocity matter. Today I focus on frontier technology while bringing production rigor to every system."
								speed={14}
								delay={120}
							/>
						}
					/>
					<div className="grid two">
						<div className="card">
							<span className="eyebrow">Highlights</span>
							<ul className="highlight-list">
								<li>
									<span className="mono">Infrastructure scaling</span>
									<Typewriter
										as="p"
										text="Designing and operating high-throughput systems that stay reliable under growth."
										speed={12}
										cursor={false}
									/>
								</li>
								<li>
									<span className="mono">Developer tooling</span>
									<Typewriter
										as="p"
										text="Creating platforms and workflows that keep teams fast, consistent, and productive."
										speed={12}
										cursor={false}
									/>
								</li>
								<li>
									<span className="mono">Leadership & mentorship</span>
									<Typewriter
										as="p"
										text="Growing teams, mentoring engineers, and aligning delivery with long-term strategy."
										speed={12}
										cursor={false}
									/>
								</li>
							</ul>
						</div>
						<div className="card">
							<span className="eyebrow">Signals</span>
							<div className="stat-grid">
								<div className="stat">
									<div className="stat-value">11+</div>
									<div className="stat-label">Years experience</div>
								</div>
								<div className="stat">
									<div className="stat-value">Frontier</div>
									<div className="stat-label">Technology focus</div>
								</div>
								<div className="stat">
									<div className="stat-value">Leadership</div>
									<div className="stat-label">Mentorship & teams</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<SectionHeading
						title="Focus areas"
						subtitle={
							<Typewriter
								as="p"
								text="Where I spend my time when systems have to be both fast and right."
								speed={14}
								delay={120}
							/>
						}
					/>
					<div className="grid three">
						<div className="card">
							<h3>Infrastructure scaling</h3>
							<Typewriter
								as="p"
								text="Designing dependable platforms that grow with traffic, latency, and security demands."
								speed={12}
								cursor={false}
							/>
						</div>
						<div className="card">
							<h3>Developer tooling</h3>
							<Typewriter
								as="p"
								text="Building internal products, CI/CD systems, and workflows that ship faster with confidence."
								speed={12}
								cursor={false}
							/>
						</div>
						<div className="card">
							<h3>Leadership & mentorship</h3>
							<Typewriter
								as="p"
								text="Coaching teams, building cultures of ownership, and aligning technical strategy with outcomes."
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
						title="Latest writing"
						subtitle={
							<Typewriter
								as="p"
								text="Updates on systems, infrastructure, and the craft of building."
								speed={14}
								delay={120}
							/>
						}
					/>
					<div className="grid two">
						{posts.map((post) => (
							<PostCard key={post.slug} post={post} maxTags={2} />
						))}
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<SectionHeading
						title="Featured projects"
						subtitle={
							<Typewriter
								as="p"
								text="Selected work across products, research, and experimentation."
								speed={14}
								delay={120}
							/>
						}
					/>
					<div className="grid two">
						{projects.map((project) => (
							<ProjectCard key={project.slug} project={project} />
						))}
					</div>
					<div style={{ marginTop: "2rem" }}>
						<Link className="button ghost" to="/projects">
							View all projects
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
