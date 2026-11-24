import type { ReactNode } from "react";

type SectionHeadingProps = {
	title: string;
	subtitle?: ReactNode;
	eyebrow?: string;
	/** Heading level; pass "h1" when this heading is the page's title. */
	as?: "h1" | "h2";
};

export default function SectionHeading({
	title,
	subtitle,
	eyebrow,
	as: Heading = "h2",
}: SectionHeadingProps) {
	return (
		<div className="section-heading">
			{eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
			<Heading>{title}</Heading>
			{typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
		</div>
	);
}
