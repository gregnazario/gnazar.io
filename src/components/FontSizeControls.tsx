import { memo, useCallback, useEffect, useState } from "react";

const FONT_SIZES = [
	{ label: "S", value: "small", size: "0.9rem" },
	{ label: "M", value: "medium", size: "1rem" },
	{ label: "L", value: "large", size: "1.1rem" },
	{ label: "XL", value: "xlarge", size: "1.2rem" },
];

const STORAGE_KEY = "font-size-preference";

export default memo(function FontSizeControls() {
	const [fontSize, setFontSize] = useState("medium");

	const applyFontSize = useCallback((value: string) => {
		const size = FONT_SIZES.find((s) => s.value === value);
		if (size) {
			document.documentElement.style.setProperty(
				"--prose-font-size",
				size.size,
			);
		}
	}, []);

	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved && FONT_SIZES.some((s) => s.value === saved)) {
			setFontSize(saved);
			applyFontSize(saved);
		}
	}, [applyFontSize]);

	const handleChange = (value: string) => {
		setFontSize(value);
		applyFontSize(value);
		localStorage.setItem(STORAGE_KEY, value);
	};

	return (
		<fieldset className="font-size-controls" aria-label="Font size">
			<span className="font-size-label">Text size:</span>
			{FONT_SIZES.map((size) => (
				<button
					key={size.value}
					type="button"
					className={`font-size-button ${fontSize === size.value ? "font-size-active" : ""}`}
					onClick={() => handleChange(size.value)}
					aria-pressed={fontSize === size.value}
					title={`${size.value} text`}
				>
					{size.label}
				</button>
			))}
		</fieldset>
	);
});
