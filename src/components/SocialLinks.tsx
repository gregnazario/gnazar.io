import { memo } from "react";

import { siteConfig } from "@/lib/site";

const socials = [
	{
		href: siteConfig.social.linkedin,
		label: "LinkedIn",
		icon: "linkedin",
	},
	{
		href: siteConfig.social.github,
		label: "GitHub",
		icon: "github",
	},
	{
		href: siteConfig.social.twitter,
		label: "X",
		icon: "x",
	},
];

const iconMap: Record<string, React.ReactNode> = {
	linkedin: (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<title>LinkedIn</title>
			<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM0.5 8h4V23h-4V8Zm7.5 0h3.8v2.05h.06c.53-1 1.82-2.05 3.74-2.05 4 0 4.74 2.64 4.74 6.08V23h-4v-6.74c0-1.61-.03-3.68-2.24-3.68-2.24 0-2.58 1.75-2.58 3.56V23h-4V8Z" />
		</svg>
	),
	github: (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<title>GitHub</title>
			<path d="M12 0.5C5.37 0.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.07-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.72.08-.72 1.2.09 1.83 1.23 1.83 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.48-1.34-5.48-5.95 0-1.31.47-2.39 1.24-3.24-.12-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.69.24 2.94.12 3.25.77.85 1.24 1.93 1.24 3.24 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22 0 1.6-.02 2.9-.02 3.29 0 .32.22.7.83.58 4.77-1.59 8.2-6.09 8.2-11.39C24 5.87 18.63 0.5 12 0.5Z" />
		</svg>
	),
	x: (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<title>X</title>
			<path d="M18.9 2H22l-7.2 8.24L23.5 22h-6.7l-5.2-6.84L5.9 22H2.8l7.7-8.8L0.5 2h6.9l4.7 6.2L18.9 2Zm-1.2 18h1.9L7.3 3.8H5.3L17.7 20Z" />
		</svg>
	),
};

export default memo(function SocialLinks() {
	return (
		<nav className="social-links" aria-label="Social links">
			{socials.map((item) => (
				<a
					key={item.href}
					href={item.href}
					aria-label={item.label}
					target="_blank"
					rel="noreferrer noopener"
				>
					<span className="social-icon">{iconMap[item.icon]}</span>
				</a>
			))}
		</nav>
	);
});
