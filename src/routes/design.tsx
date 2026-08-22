import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/design")({
	head: () => ({
		meta: [
			{ name: "robots", content: "noindex, nofollow" },
			{ title: "Design system — gnazar.io" },
			{
				name: "description",
				content: "Evergreen design system styleguide for gnazar.io",
			},
		],
	}),
	component: DesignSystemPage,
});

const ramp = [
	{ name: "green-50", value: "#f0f9f2" },
	{ name: "green-100", value: "#dcf0e1" },
	{ name: "green-200", value: "#b9e2c6" },
	{ name: "green-300", value: "#8bd0a3" },
	{ name: "green-400", value: "#4ade80" },
	{ name: "green-500", value: "#23b268" },
	{ name: "green-600", value: "#0a8a55" },
	{ name: "green-700", value: "#0b7a4e" },
	{ name: "green-800", value: "#067647" },
	{ name: "green-900", value: "#075c3a" },
	{ name: "green-950", value: "#042415" },
];

const semanticTokens = [
	{ name: "--bg", token: "var(--bg)" },
	{ name: "--bg-muted", token: "var(--bg-muted)" },
	{ name: "--surface", token: "var(--surface)" },
	{ name: "--surface-elevated", token: "var(--surface-elevated)" },
	{ name: "--text", token: "var(--text)" },
	{ name: "--text-muted", token: "var(--text-muted)" },
	{ name: "--border", token: "var(--border)" },
	{ name: "--border-strong", token: "var(--border-strong)" },
	{ name: "--accent", token: "var(--accent)" },
	{ name: "--accent-strong", token: "var(--accent-strong)" },
	{ name: "--accent-soft", token: "var(--accent-soft)" },
	{ name: "--code-bg", token: "var(--code-bg)" },
	{ name: "--danger", token: "var(--danger)" },
	{ name: "--warning", token: "var(--warning)" },
];

const typeSamples = [
	{
		label: "Display — 800, −0.035em",
		style: "hero",
		text: "Systems that grow",
	},
	{
		label: "H2 — 700, −0.025em",
		style: "h2",
		text: "Layered surfaces, soft depth",
	},
	{ label: "H3 — 650", style: "h3", text: "Developer tooling and platforms" },
	{
		label: "Body — 400/1.65",
		style: "body",
		text: "Body copy is full-contrast Inter at 1rem with a 1.65 line-height. It never renders in the muted tone.",
	},
	{
		label: "Small — muted",
		style: "small",
		text: "Secondary copy uses the muted green-gray.",
	},
];

function DesignSystemPage() {
	return (
		<div className="container ds-page">
			<header className="section-heading">
				<span className="eyebrow">Evergreen</span>
				<h1 style={{ fontSize: "clamp(2.2rem, 3vw + 1rem, 3rem)", margin: 0 }}>
					Design system
				</h1>
				<p>
					Living styleguide for gnazar.io. Tokens flip with the theme toggle —
					spec details live in <code>docs/design-system.md</code>.
				</p>
			</header>

			<section className="ds-section">
				<h2 className="ds-section-title">Brand ramp</h2>
				<div className="ds-swatches">
					{ramp.map((c) => (
						<div className="ds-swatch" key={c.name}>
							<div
								className="ds-swatch-color"
								style={{ background: c.value }}
							/>
							<div className="ds-swatch-meta">
								<span className="ds-swatch-name">{c.name}</span>
								<span className="ds-swatch-value">{c.value}</span>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="ds-section">
				<h2 className="ds-section-title">Semantic tokens (current theme)</h2>
				<div className="ds-swatches">
					{semanticTokens.map((t) => (
						<div className="ds-swatch" key={t.name}>
							<div
								className="ds-swatch-color"
								style={{ background: t.token }}
							/>
							<div className="ds-swatch-meta">
								<span className="ds-swatch-name">{t.name}</span>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="ds-section">
				<h2 className="ds-section-title">Typography</h2>
				<div className="card">
					{typeSamples.map((s) => (
						<div className="ds-type-row" key={s.label}>
							<span className="ds-type-label">{s.label}</span>
							{s.style === "hero" ? (
								<span
									className="ds-type-sample"
									style={{
										fontSize: "clamp(2.6rem, 4vw + 1rem, 4rem)",
										fontWeight: 800,
										letterSpacing: "-0.035em",
										lineHeight: 1.05,
										background: "var(--accent-gradient)",
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent",
									}}
								>
									{s.text}
								</span>
							) : s.style === "h2" ? (
								<span
									className="ds-type-sample"
									style={{
										fontSize: "clamp(1.6rem, 2vw + 0.8rem, 2.1rem)",
										fontWeight: 700,
										letterSpacing: "-0.025em",
									}}
								>
									{s.text}
								</span>
							) : s.style === "h3" ? (
								<span
									className="ds-type-sample"
									style={{ fontSize: "1.375rem", fontWeight: 650 }}
								>
									{s.text}
								</span>
							) : s.style === "small" ? (
								<span
									className="ds-type-sample"
									style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}
								>
									{s.text}
								</span>
							) : (
								<span className="ds-type-sample">{s.text}</span>
							)}
						</div>
					))}
				</div>
			</section>

			<section className="ds-section">
				<h2 className="ds-section-title">Radius + elevation</h2>
				<div className="ds-radius-row">
					<div className="ds-radius-demo" style={{ borderRadius: "8px" }}>
						sm 8
					</div>
					<div className="ds-radius-demo" style={{ borderRadius: "12px" }}>
						md 12
					</div>
					<div className="ds-radius-demo" style={{ borderRadius: "16px" }}>
						lg 16
					</div>
					<div className="ds-radius-demo" style={{ borderRadius: "24px" }}>
						xl 24
					</div>
					<div className="ds-radius-demo" style={{ borderRadius: "999px" }}>
						pill
					</div>
				</div>
				<div className="ds-shadow-row">
					<div
						className="ds-shadow-demo"
						style={{ boxShadow: "var(--shadow-sm)" }}
					>
						shadow-sm
					</div>
					<div
						className="ds-shadow-demo"
						style={{ boxShadow: "var(--shadow-md)" }}
					>
						shadow-md
					</div>
					<div
						className="ds-shadow-demo"
						style={{ boxShadow: "var(--shadow-lg)" }}
					>
						shadow-lg
					</div>
				</div>
			</section>

			<section className="ds-section">
				<h2 className="ds-section-title">Buttons + badges</h2>
				<div className="ds-row">
					<button type="button" className="button">
						Primary
					</button>
					<button type="button" className="button ghost">
						Ghost
					</button>
					<span className="badge">typescript</span>
					<span className="badge">infrastructure</span>
				</div>
			</section>

			<section className="ds-section">
				<h2 className="ds-section-title">Cards + callout</h2>
				<div className="grid two">
					<article className="card">
						<div className="card-meta">
							<span>Aug 21, 2026</span>
							<span className="badge">design</span>
						</div>
						<h3>A card with hover lift</h3>
						<p>
							Surface on canvas, hairline border, gradient crown, and a soft
							shadow that steps up on hover.
						</p>
					</article>
					<div className="callout">
						<strong>Callout</strong>
						<p style={{ margin: 0 }}>
							Accent-tinted surface with a 3px accent rule for notes that
							deserve attention.
						</p>
					</div>
				</div>
			</section>

			<section className="ds-section">
				<h2 className="ds-section-title">Prose + code</h2>
				<article className="prose">
					<p>
						Body copy renders full-contrast with{" "}
						<a href="#link">accent links</a> and <code>inline code</code> chips.
						Code blocks are always deep green:
					</p>
					<pre>
						<code>{`interface Evergreen {
  accent: "#0a8a55";
  glow: "rgba(74, 222, 128, 0.2)";
}

export const system: Evergreen = { ... };`}</code>
					</pre>
				</article>
			</section>

			<section className="ds-section">
				<h2 className="ds-section-title">Stats</h2>
				<div className="stat-grid">
					<div className="stat">
						<div className="stat-value">11+</div>
						<div className="stat-label">Years experience</div>
					</div>
					<div className="stat">
						<div className="stat-value">33/33</div>
						<div className="stat-label">WCAG AA pairs passing</div>
					</div>
				</div>
			</section>
		</div>
	);
}
