import { Link, createFileRoute } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import SocialLinks from "@/components/SocialLinks";
import { formatDate } from "@/lib/format";
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
							<p>
								Founding Senior Software Engineer at Aptos. I build reliable,
								high-performance systems and love turning complex ideas into
								polished experiences.
							</p>
						</div>
						<div className="hero-actions">
							<Link className="button" to="/projects">
								View projects
							</Link>
							<Link className="button ghost" to="/blog">
								Read the blog
							</Link>
						</div>
						<SocialLinks />
					</div>
					<div className="hero-card">
						<img
							src="/images/headshot.jpg"
							alt="Greg Nazario"
							className="hero-image"
							width={420}
							height={520}
						/>
						<div className="stack">
							<strong>Currently</strong>
							<div>
								Founding Senior Software Engineer, Aptos
								<br />
								Former Engineer at AWS and Meta
								<br />
								Former Researcher at Carnegie Mellon
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<div className="section-heading">
						<h2>What I focus on</h2>
						<p>Systems, product, and content that feel great to use.</p>
					</div>
					<div className="grid three">
						<div className="card">
							<h3>Engineering leadership</h3>
							<p>
								Building teams and foundations for long-term reliability,
								performance, and security.
							</p>
						</div>
						<div className="card">
							<h3>Research to production</h3>
							<p>
								Translating research and experimentation into polished, scalable
								products.
							</p>
						</div>
						<div className="card">
							<h3>Developer experience</h3>
							<p>
								Crafting tooling, documentation, and UX that makes complex
								systems feel approachable.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<div className="section-heading">
						<h2>Latest writing</h2>
						<p>
							Updates on systems, infrastructure, and the craft of building.
						</p>
					</div>
					<div className="grid two">
						{posts.map((post) => (
							<article key={post.slug} className="card">
								<div className="card-meta">
									<span>{formatDate(post.date)}</span>
									{post.tags.slice(0, 2).map((tag) => (
										<Badge key={tag}>{tag}</Badge>
									))}
								</div>
								<h3>
									<Link to="/blog/$slug" params={{ slug: post.slug }}>
										{post.title}
									</Link>
								</h3>
								<p>{post.summary}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<div className="section-heading">
						<h2>Featured projects</h2>
						<p>Selected work across products, research, and experimentation.</p>
					</div>
					<div className="grid two">
						{projects.map((project) => (
							<article key={project.slug} className="card">
								<div className="card-meta">
									{project.year ? <span>{project.year}</span> : null}
									{project.featured ? <Badge>Featured</Badge> : null}
								</div>
								<h3>
									<Link to="/projects/$slug" params={{ slug: project.slug }}>
										{project.title}
									</Link>
								</h3>
								<p>{project.summary}</p>
							</article>
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
