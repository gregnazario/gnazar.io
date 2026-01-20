export const locales = ["en", "es", "fr", "zh", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
	en: "English",
	es: "Español",
	fr: "Français",
	zh: "中文",
	ko: "한국어",
};

export const localeNativeNames: Record<Locale, string> = {
	en: "English",
	es: "Español",
	fr: "Français",
	zh: "中文",
	ko: "한국어",
};

// ISO 639-1 to full locale code mapping
export const localeToHreflang: Record<Locale, string> = {
	en: "en",
	es: "es",
	fr: "fr",
	zh: "zh-Hans",
	ko: "ko",
};

// UI translations for static text
export const translations: Record<Locale, Record<string, string>> = {
	en: {
		home: "Home",
		blog: "Blog",
		projects: "Projects",
		readMore: "Read more",
		viewProjects: "View projects",
		readMyBlog: "Read my blog",
		latestWriting: "Latest writing",
		featuredProjects: "Featured projects",
		viewAllProjects: "View all projects",
		focusAreas: "Focus areas",
		experience: "Experience",
		yearsAtFrontier: "years at the frontier",
		highlights: "Highlights",
		signals: "Signals",
		yearsExperience: "Years experience",
		technologyFocus: "Technology focus",
		currently: "Currently",
		pageNotFound: "Page not found",
		pageNotFoundDesc: "That page does not exist. Head back to the homepage.",
		goHome: "Go home",
		skipToContent: "Skip to content",
		socialLinks: "Social links",
		switchToMode: "Switch to {mode} mode",
		light: "light",
		dark: "dark",
		translatedBy: "Translated by AI",
	},
	es: {
		home: "Inicio",
		blog: "Blog",
		projects: "Proyectos",
		readMore: "Leer más",
		viewProjects: "Ver proyectos",
		readMyBlog: "Leer mi blog",
		latestWriting: "Últimos escritos",
		featuredProjects: "Proyectos destacados",
		viewAllProjects: "Ver todos los proyectos",
		focusAreas: "Áreas de enfoque",
		experience: "Experiencia",
		yearsAtFrontier: "años en la frontera",
		highlights: "Destacados",
		signals: "Señales",
		yearsExperience: "Años de experiencia",
		technologyFocus: "Enfoque tecnológico",
		currently: "Actualmente",
		pageNotFound: "Página no encontrada",
		pageNotFoundDesc: "Esa página no existe. Vuelve a la página de inicio.",
		goHome: "Ir al inicio",
		skipToContent: "Saltar al contenido",
		socialLinks: "Enlaces sociales",
		switchToMode: "Cambiar a modo {mode}",
		light: "claro",
		dark: "oscuro",
		translatedBy: "Traducido por IA",
	},
	fr: {
		home: "Accueil",
		blog: "Blog",
		projects: "Projets",
		readMore: "Lire la suite",
		viewProjects: "Voir les projets",
		readMyBlog: "Lire mon blog",
		latestWriting: "Derniers écrits",
		featuredProjects: "Projets en vedette",
		viewAllProjects: "Voir tous les projets",
		focusAreas: "Domaines d'expertise",
		experience: "Expérience",
		yearsAtFrontier: "ans à la pointe",
		highlights: "Points forts",
		signals: "Signaux",
		yearsExperience: "Années d'expérience",
		technologyFocus: "Focus technologique",
		currently: "Actuellement",
		pageNotFound: "Page non trouvée",
		pageNotFoundDesc: "Cette page n'existe pas. Retournez à la page d'accueil.",
		goHome: "Retour à l'accueil",
		skipToContent: "Aller au contenu",
		socialLinks: "Liens sociaux",
		switchToMode: "Passer en mode {mode}",
		light: "clair",
		dark: "sombre",
		translatedBy: "Traduit par IA",
	},
	zh: {
		home: "首页",
		blog: "博客",
		projects: "项目",
		readMore: "阅读更多",
		viewProjects: "查看项目",
		readMyBlog: "阅读我的博客",
		latestWriting: "最新文章",
		featuredProjects: "精选项目",
		viewAllProjects: "查看所有项目",
		focusAreas: "专注领域",
		experience: "经验",
		yearsAtFrontier: "年前沿经验",
		highlights: "亮点",
		signals: "信号",
		yearsExperience: "年经验",
		technologyFocus: "技术重点",
		currently: "目前",
		pageNotFound: "页面未找到",
		pageNotFoundDesc: "该页面不存在。返回首页。",
		goHome: "返回首页",
		skipToContent: "跳至内容",
		socialLinks: "社交链接",
		switchToMode: "切换到{mode}模式",
		light: "浅色",
		dark: "深色",
		translatedBy: "AI翻译",
	},
	ko: {
		home: "홈",
		blog: "블로그",
		projects: "프로젝트",
		readMore: "더 읽기",
		viewProjects: "프로젝트 보기",
		readMyBlog: "블로그 읽기",
		latestWriting: "최신 글",
		featuredProjects: "주요 프로젝트",
		viewAllProjects: "모든 프로젝트 보기",
		focusAreas: "전문 분야",
		experience: "경력",
		yearsAtFrontier: "년의 최전선 경험",
		highlights: "하이라이트",
		signals: "신호",
		yearsExperience: "년 경력",
		technologyFocus: "기술 중점",
		currently: "현재",
		pageNotFound: "페이지를 찾을 수 없습니다",
		pageNotFoundDesc: "해당 페이지가 존재하지 않습니다. 홈페이지로 돌아가세요.",
		goHome: "홈으로",
		skipToContent: "콘텐츠로 건너뛰기",
		socialLinks: "소셜 링크",
		switchToMode: "{mode} 모드로 전환",
		light: "라이트",
		dark: "다크",
		translatedBy: "AI 번역",
	},
};

export function t(locale: Locale, key: string): string {
	return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

export function isValidLocale(locale: string): locale is Locale {
	return locales.includes(locale as Locale);
}

export function getLocaleFromPath(path: string): Locale {
	const segments = path.split("/").filter(Boolean);
	const firstSegment = segments[0];
	if (firstSegment && isValidLocale(firstSegment)) {
		return firstSegment;
	}
	return defaultLocale;
}

export function removeLocaleFromPath(path: string): string {
	const segments = path.split("/").filter(Boolean);
	const firstSegment = segments[0];
	if (firstSegment && isValidLocale(firstSegment)) {
		return `/${segments.slice(1).join("/")}`;
	}
	return path;
}

export function addLocaleToPath(path: string, locale: Locale): string {
	if (locale === defaultLocale) {
		return path;
	}
	const cleanPath = removeLocaleFromPath(path);
	return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}
