import Link from "next/link";

import { siteConfig } from "@/lib/site";
import SocialLinks from "@/components/SocialLinks";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <strong>{siteConfig.title}</strong>
          <div>Thoughtful software, reliable systems, and clean design.</div>
        </div>
        <SocialLinks />
        <div>
          <div>&copy; {year} {siteConfig.title}</div>
          <Link href="/blog">Read the blog</Link>
        </div>
      </div>
    </footer>
  );
}
