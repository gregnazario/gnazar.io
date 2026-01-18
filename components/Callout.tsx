import type { ReactNode } from "react";

type CalloutProps = {
  title?: string;
  children: ReactNode;
};

export default function Callout({ title, children }: CalloutProps) {
  return (
    <div className="callout">
      {title ? <strong>{title}</strong> : null}
      <div>{children}</div>
    </div>
  );
}
