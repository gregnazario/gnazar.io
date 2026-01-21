import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function renderMarkdown(source: string): Promise<string> {
	// biome-ignore lint/suspicious/noExplicitAny: unified plugin chain has complex types incompatible with TS 5.9
	const processor = unified() as any;
	const file = await processor
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkMath)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeKatex)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: "wrap" })
		.use(rehypeStringify)
		.process(source);

	return String(file);
}
