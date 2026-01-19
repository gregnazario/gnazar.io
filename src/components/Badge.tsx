import type { ReactNode } from "react";

type BadgeProps = {
	children: ReactNode;
};

export default function Badge({ children }: BadgeProps) {
	return <span className="badge">{children}</span>;
}
