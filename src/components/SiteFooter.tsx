import { Link } from "@tanstack/react-router";

import SocialLinks from "@/components/SocialLinks";
import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer">
			<div className="container footer-grid">
				<div>
					<strong>{siteConfig.title}</strong>
				</div>
				<nav aria-label="Site" className="footer-nav">
					<Link to="/blog">Blog</Link>
					<Link to="/projects">Projects</Link>
					<Link to="/archive">Archive</Link>
					<Link to="/tags">Tags</Link>
					<a href="/rss.xml">RSS</a>
				</nav>
				<SocialLinks />
				<div>
					<div>
						&copy; {year} {siteConfig.author}
					</div>
				</div>
			</div>
		</footer>
	);
}
