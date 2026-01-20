import { memo, type ReactNode } from "react";

type BadgeProps = {
	children: ReactNode;
};

export default memo(function Badge({ children }: BadgeProps) {
	return <span className="badge">{children}</span>;
});
