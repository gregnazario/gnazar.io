import { Link } from "@tanstack/react-router";
import { memo } from "react";

import { defaultLocale, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type BreadcrumbItem = {
	label: string;
	href?: string;
};

type BreadcrumbsProps = {
	items: BreadcrumbItem[];
	locale?: Locale;
};

export function generateBreadcrumbSchema(
	items: BreadcrumbItem[],
	locale: Locale = defaultLocale,
) {
	const baseUrl =
		locale === defaultLocale ? siteConfig.url : `${siteConfig.url}/${locale}`;

	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.label,
			item: item.href ? `${baseUrl}${item.href}` : undefined,
		})),
	};
}

export default memo(function Breadcrumbs({
	items,
	locale = defaultLocale,
}: BreadcrumbsProps) {
	if (items.length === 0) return null;

	return (
		<nav className="breadcrumbs" aria-label="Breadcrumb">
			<ol className="breadcrumbs-list">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					const localizedHref =
						locale === defaultLocale
							? item.href
							: item.href === "/"
								? `/${locale}`
								: `/${locale}${item.href}`;

					return (
						<li key={item.label} className="breadcrumbs-item">
							{item.href && !isLast ? (
								<>
									<Link to={localizedHref as string}>{item.label}</Link>
									<span className="breadcrumbs-separator" aria-hidden="true">
										/
									</span>
								</>
							) : (
								<span aria-current={isLast ? "page" : undefined}>
									{item.label}
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
});
