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
