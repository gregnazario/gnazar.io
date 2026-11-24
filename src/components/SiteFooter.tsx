import { Link } from "@tanstack/react-router";

import SocialLinks from "@/components/SocialLinks";
import { defaultLocale, t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
	const year = new Date().getFullYear();
	const locale = useLocale();

	return (
		<footer className="site-footer">
			<div className="container footer-grid">
				<div>
					<strong>{siteConfig.title}</strong>
				</div>
				{/* Links follow the reader's language; English keeps its unprefixed paths */}
				<nav aria-label={t(locale, "site")} className="footer-nav">
					{locale === defaultLocale ? (
						<>
							<Link to="/blog">{t(locale, "blog")}</Link>
							<Link to="/projects">{t(locale, "projects")}</Link>
							<Link to="/archive">{t(locale, "archive")}</Link>
							<Link to="/tags">{t(locale, "tags")}</Link>
						</>
					) : (
						<>
							<Link to={`/${locale}/blog` as string}>{t(locale, "blog")}</Link>
							<Link to={`/${locale}/projects` as string}>
								{t(locale, "projects")}
							</Link>
							<Link to={`/${locale}/archive` as string}>
								{t(locale, "archive")}
							</Link>
							<Link to={`/${locale}/tags` as string}>{t(locale, "tags")}</Link>
						</>
					)}
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
