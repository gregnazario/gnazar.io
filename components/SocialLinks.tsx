import Image from "next/image";

import { siteConfig } from "@/lib/site";

const socials = [
  {
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
    icon: "/icons/linkedin.png",
  },
  {
    href: siteConfig.social.github,
    label: "GitHub",
    icon: "/icons/github.png",
  },
  {
    href: siteConfig.social.twitter,
    label: "Twitter",
    icon: "/icons/twitter.svg",
  },
];

export default function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social links">
      {socials.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-label={item.label}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image src={item.icon} alt="" width={18} height={18} />
        </a>
      ))}
    </div>
  );
}
