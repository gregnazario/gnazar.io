import type { AnchorHTMLAttributes } from "react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import Callout from "@/components/Callout";

function Anchor({
  href = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/");
  if (isInternal) {
    return <Link href={href} {...props} />;
  }

  return (
    <a href={href} {...props} target="_blank" rel="noreferrer noopener" />
  );
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  Callout,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  pre: (props) => <pre {...props} />,
  code: (props) => <code {...props} />,
};
