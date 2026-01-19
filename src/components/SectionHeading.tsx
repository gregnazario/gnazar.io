import type { ReactNode } from "react";

type SectionHeadingProps = {
	title: string;
	subtitle?: ReactNode;
	eyebrow?: string;
};

export default function SectionHeading({
	title,
	subtitle,
	eyebrow,
}: SectionHeadingProps) {
	return (
		<div className="section-heading">
			{eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
			<h2>{title}</h2>
			{typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
		</div>
	);
}
