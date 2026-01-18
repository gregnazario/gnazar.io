import Link from "next/link";

import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" href="/">
          {siteConfig.title}
        </Link>
        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a className="button ghost" href={siteConfig.social.github}>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
