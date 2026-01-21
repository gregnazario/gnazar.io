import { useEffect } from "react";

const LANGUAGE_NAMES: Record<string, string> = {
	js: "JavaScript",
	javascript: "JavaScript",
	ts: "TypeScript",
	typescript: "TypeScript",
	tsx: "TSX",
	jsx: "JSX",
	py: "Python",
	python: "Python",
	rb: "Ruby",
	ruby: "Ruby",
	go: "Go",
	golang: "Go",
	rs: "Rust",
	rust: "Rust",
	java: "Java",
	kt: "Kotlin",
	kotlin: "Kotlin",
	swift: "Swift",
	c: "C",
	cpp: "C++",
	"c++": "C++",
	cs: "C#",
	csharp: "C#",
	php: "PHP",
	sql: "SQL",
	html: "HTML",
	css: "CSS",
	scss: "SCSS",
	sass: "Sass",
	less: "Less",
	json: "JSON",
	yaml: "YAML",
	yml: "YAML",
	xml: "XML",
	md: "Markdown",
	markdown: "Markdown",
	mdx: "MDX",
	sh: "Shell",
	bash: "Bash",
	zsh: "Zsh",
	fish: "Fish",
	powershell: "PowerShell",
	ps1: "PowerShell",
	dockerfile: "Dockerfile",
	docker: "Docker",
	makefile: "Makefile",
	make: "Makefile",
	nginx: "Nginx",
	apache: "Apache",
	graphql: "GraphQL",
	gql: "GraphQL",
	toml: "TOML",
	ini: "INI",
	env: "ENV",
	diff: "Diff",
	patch: "Patch",
	vim: "Vim",
	lua: "Lua",
	perl: "Perl",
	r: "R",
	scala: "Scala",
	clojure: "Clojure",
	clj: "Clojure",
	elixir: "Elixir",
	ex: "Elixir",
	erlang: "Erlang",
	erl: "Erlang",
	haskell: "Haskell",
	hs: "Haskell",
	ocaml: "OCaml",
	ml: "OCaml",
	fsharp: "F#",
	"f#": "F#",
	dart: "Dart",
	solidity: "Solidity",
	sol: "Solidity",
	move: "Move",
	wasm: "WebAssembly",
	wat: "WebAssembly",
	zig: "Zig",
	nim: "Nim",
	v: "V",
	julia: "Julia",
	jl: "Julia",
	text: "Plain Text",
	txt: "Plain Text",
	plaintext: "Plain Text",
};

/**
 * Component that adds language labels to code blocks
 * Should be included once in the blog post component
 */
export default function CodeBlockLabels() {
	useEffect(() => {
		// Find all code blocks with language class
		const codeBlocks = document.querySelectorAll(
			"pre > code[class*='language-']",
		);

		for (const code of codeBlocks) {
			const pre = code.parentElement;
			if (!pre) continue;

			// Skip if already has a label
			if (pre.querySelector(".code-language-label")) continue;

			// Extract language from class
			const classes = code.className.split(" ");
			const langClass = classes.find((c) => c.startsWith("language-"));
			if (!langClass) continue;

			const lang = langClass.replace("language-", "").toLowerCase();
			const displayName = LANGUAGE_NAMES[lang] || lang.toUpperCase();

			// Create label
			const label = document.createElement("div");
			label.className = "code-language-label";
			label.textContent = displayName;
			label.setAttribute("aria-hidden", "true");

			// Ensure pre has relative positioning
			pre.style.position = "relative";
			pre.insertBefore(label, pre.firstChild);
		}
	}, []);

	return null;
}
