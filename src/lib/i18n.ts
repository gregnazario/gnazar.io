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
		star: "star",
		stars: "stars",
		fork: "fork",
		forks: "forks",
		lastPush: "Last push",
		statusActive: "active",
		statusMaintained: "maintained",
		statusArchived: "archived",
		socialLinks: "Social links",
		switchToMode: "Switch to {mode} mode",
		light: "light",
		dark: "dark",
		translatedBy: "Translated by AI",
		toggleTheme: "Toggle color theme",
		selectLanguage: "Select language",
		search: "Search",
		openMenu: "Open menu",
		closeMenu: "Close menu",
		site: "Site",
		archive: "Archive",
		tags: "Tags",
		tagOne: "tag",
		tagMany: "tags",
		postOne: "post",
		postMany: "posts",
		tagsAcross: "{tags} across {posts}",
		postsTaggedWith: 'Posts tagged "{tag}"',
		browsePostsByTopic: "Browse blog posts by topic.",
		browsePostsByDate: "Browse all blog posts by date.",
		noTagsYet: "No tags yet.",
		noPostsYet: "No posts yet.",
		noPostsWithTag: "No posts found with this tag.",
		viewAllTags: "View all tags",
		projectsIntro: "Selected work across systems, products, and research.",
		blogIntro: "Notes on systems, engineering, and building products.",
		heroTagline:
			"Founding Engineer at Aptos Labs. I build and scale infrastructure, create developer tooling, and lead teams shipping frontier technology.",
		currentRole: "Founding Engineer, Aptos Labs",
		experienceIntro:
			"I have spent more than a decade building platforms where scale, reliability, and velocity matter. I spent 8 years at AWS and Meta, working on infrastructure and developer tooling. After that, I helped found Aptos Labs, bringing Meta level infrastructure to the public blockchain space.",
		infrastructureScaling: "Infrastructure scaling",
		developerTooling: "Developer tooling",
		leadershipMentorship: "Leadership & mentorship",
		infrastructureScalingHighlight:
			"Designing and operating high-throughput systems that stay reliable under growth.",
		developerToolingHighlight:
			"Creating platforms and workflows that keep teams fast, consistent, and productive.",
		leadershipMentorshipHighlight:
			"Growing teams, mentoring engineers, and aligning delivery with long-term strategy.",
		networkingCloudBlockchain: "Networking, Cloud, Blockchain",
		focusAreasIntro:
			"Where I spend my time when systems have to be both fast and right.",
		infrastructureScalingFocus:
			"Designing dependable platforms that grow with traffic, latency, and security demands.",
		developerToolingFocus:
			"Building internal products, CI/CD systems, and workflows that ship faster with confidence.",
		leadershipMentorshipFocus:
			"Coaching teams, building cultures of ownership, and aligning technical strategy with outcomes.",
		latestWritingIntro:
			"Updates on systems, infrastructure, and the craft of building.",
		featuredProjectsIntro:
			"Selected work across products, research, and experimentation.",
		featured: "Featured",
		minRead: "{minutes} min read",
		updated: "Updated",
		readMoreAbout: "Read more about {title}",
		backToProjects: "Back to projects",
		previousProject: "Previous project",
		nextProject: "Next project",
		previous: "Previous",
		next: "Next",
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
		star: "estrella",
		stars: "estrellas",
		fork: "fork",
		forks: "forks",
		lastPush: "Último envío",
		statusActive: "activo",
		statusMaintained: "mantenido",
		statusArchived: "archivado",
		socialLinks: "Enlaces sociales",
		switchToMode: "Cambiar a modo {mode}",
		light: "claro",
		dark: "oscuro",
		translatedBy: "Traducido por IA",
		toggleTheme: "Cambiar el tema de color",
		selectLanguage: "Seleccionar idioma",
		search: "Buscar",
		openMenu: "Abrir menú",
		closeMenu: "Cerrar menú",
		site: "Sitio",
		archive: "Archivo",
		tags: "Etiquetas",
		tagOne: "etiqueta",
		tagMany: "etiquetas",
		postOne: "artículo",
		postMany: "artículos",
		tagsAcross: "{tags} en {posts}",
		postsTaggedWith: "Artículos con la etiqueta «{tag}»",
		browsePostsByTopic: "Explora las entradas del blog por tema.",
		browsePostsByDate: "Explora todas las entradas del blog por fecha.",
		noTagsYet: "Aún no hay etiquetas.",
		noPostsYet: "Aún no hay entradas.",
		noPostsWithTag: "No hay entradas con esta etiqueta.",
		viewAllTags: "Ver todas las etiquetas",
		projectsIntro:
			"Trabajo seleccionado entre sistemas, productos e investigación.",
		blogIntro: "Notas sobre sistemas, ingeniería y creación de productos.",
		heroTagline:
			"Founding Engineer en Aptos Labs. Construyo y escalo infraestructura, creo herramientas para desarrolladores y lidero equipos que lanzan tecnología de vanguardia.",
		currentRole: "Founding Engineer, Aptos Labs",
		experienceIntro:
			"Llevo más de una década construyendo plataformas donde la escala, la fiabilidad y la velocidad importan. Pasé 8 años en AWS y Meta trabajando en infraestructura y herramientas para desarrolladores. Después ayudé a fundar Aptos Labs para llevar la infraestructura de nivel Meta al ámbito de las blockchains públicas.",
		infrastructureScaling: "Escalado de infraestructura",
		developerTooling: "Herramientas para desarrolladores",
		leadershipMentorship: "Liderazgo y mentoría",
		infrastructureScalingHighlight:
			"Diseño y operación de sistemas de alto rendimiento que siguen siendo fiables al crecer.",
		developerToolingHighlight:
			"Creación de plataformas y flujos de trabajo que mantienen a los equipos rápidos, consistentes y productivos.",
		leadershipMentorshipHighlight:
			"Formación de equipos, mentoría a ingenieros y alineación de la entrega con la estrategia a largo plazo.",
		networkingCloudBlockchain: "Networking, Cloud, Blockchain",
		focusAreasIntro:
			"En lo que dedico mi tiempo cuando los sistemas tienen que ser rápidos y correctos a la vez.",
		infrastructureScalingFocus:
			"Diseño de plataformas fiables que crecen con el tráfico, la latencia y las exigencias de seguridad.",
		developerToolingFocus:
			"Construcción de productos internos, sistemas de CI/CD y flujos de trabajo que se publican más rápido y con confianza.",
		leadershipMentorshipFocus:
			"Acompañamiento de equipos, culturas de responsabilidad y alineación de la estrategia técnica con los resultados.",
		latestWritingIntro:
			"Novedades sobre sistemas, infraestructura y el oficio de construir.",
		featuredProjectsIntro:
			"Trabajo seleccionado entre productos, investigación y experimentación.",
		featured: "Destacado",
		minRead: "{minutes} min de lectura",
		updated: "Actualizado",
		readMoreAbout: "Leer más sobre {title}",
		backToProjects: "Volver a proyectos",
		previousProject: "Proyecto anterior",
		nextProject: "Proyecto siguiente",
		previous: "Anterior",
		next: "Siguiente",
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
		star: "étoile",
		stars: "étoiles",
		fork: "fork",
		forks: "forks",
		lastPush: "Dernier envoi",
		statusActive: "actif",
		statusMaintained: "maintenu",
		statusArchived: "archivé",
		socialLinks: "Liens sociaux",
		switchToMode: "Passer en mode {mode}",
		light: "clair",
		dark: "sombre",
		translatedBy: "Traduit par IA",
		toggleTheme: "Changer le thème de couleur",
		selectLanguage: "Choisir la langue",
		search: "Rechercher",
		openMenu: "Ouvrir le menu",
		closeMenu: "Fermer le menu",
		site: "Site",
		archive: "Archives",
		tags: "Étiquettes",
		tagOne: "étiquette",
		tagMany: "étiquettes",
		postOne: "article",
		postMany: "articles",
		tagsAcross: "{tags} pour {posts}",
		postsTaggedWith: "Articles étiquetés « {tag} »",
		browsePostsByTopic: "Parcourir les articles du blog par sujet.",
		browsePostsByDate: "Parcourir tous les articles du blog par date.",
		noTagsYet: "Aucune étiquette pour l'instant.",
		noPostsYet: "Aucun article pour l'instant.",
		noPostsWithTag: "Aucun article avec cette étiquette.",
		viewAllTags: "Voir toutes les étiquettes",
		projectsIntro:
			"Une sélection de réalisations entre systèmes, produits et recherche.",
		blogIntro:
			"Notes sur les systèmes, l'ingénierie et la construction de produits.",
		heroTagline:
			"Founding Engineer chez Aptos Labs. Je conçois et fais évoluer des infrastructures, je crée des outils pour les développeurs et je dirige des équipes qui livrent des technologies de pointe.",
		currentRole: "Founding Engineer, Aptos Labs",
		experienceIntro:
			"Je construis depuis plus de dix ans des plateformes où l'échelle, la fiabilité et la vitesse comptent. J'ai passé 8 ans chez AWS et Meta sur l'infrastructure et les outils de développement, puis j'ai contribué à fonder Aptos Labs pour apporter une infrastructure de niveau Meta à la blockchain publique.",
		infrastructureScaling: "Montée en charge de l'infrastructure",
		developerTooling: "Outils de développement",
		leadershipMentorship: "Leadership et mentorat",
		infrastructureScalingHighlight:
			"Conception et exploitation de systèmes à haut débit qui restent fiables en croissance.",
		developerToolingHighlight:
			"Création de plateformes et de flux de travail qui gardent les équipes rapides, cohérentes et productives.",
		leadershipMentorshipHighlight:
			"Constitution d'équipes, mentorat des ingénieurs et alignement de la livraison sur la stratégie à long terme.",
		networkingCloudBlockchain: "Réseau, Cloud, Blockchain",
		focusAreasIntro:
			"Là où je passe mon temps quand les systèmes doivent être à la fois rapides et justes.",
		infrastructureScalingFocus:
			"Conception de plateformes fiables qui s'adaptent au trafic, à la latence et aux exigences de sécurité.",
		developerToolingFocus:
			"Construction de produits internes, de systèmes CI/CD et de flux de travail qui livrent plus vite et en confiance.",
		leadershipMentorshipFocus:
			"Accompagnement des équipes, cultures de la responsabilité et alignement de la stratégie technique sur les résultats.",
		latestWritingIntro:
			"Nouvelles sur les systèmes, l'infrastructure et l'art de construire.",
		featuredProjectsIntro:
			"Une sélection de réalisations entre produits, recherche et expérimentation.",
		featured: "En vedette",
		minRead: "{minutes} min de lecture",
		updated: "Mis à jour",
		readMoreAbout: "Lire la suite de {title}",
		backToProjects: "Retour aux projets",
		previousProject: "Projet précédent",
		nextProject: "Projet suivant",
		previous: "Précédent",
		next: "Suivant",
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
		star: "星标",
		stars: "星标",
		fork: "复刻",
		forks: "复刻",
		lastPush: "最后推送",
		statusActive: "活跃",
		statusMaintained: "维护中",
		statusArchived: "已归档",
		socialLinks: "社交链接",
		switchToMode: "切换到{mode}模式",
		light: "浅色",
		dark: "深色",
		translatedBy: "AI翻译",
		toggleTheme: "切换颜色主题",
		selectLanguage: "选择语言",
		search: "搜索",
		openMenu: "打开菜单",
		closeMenu: "关闭菜单",
		site: "站点",
		archive: "归档",
		tags: "标签",
		tagOne: "个标签",
		tagMany: "个标签",
		postOne: "篇文章",
		postMany: "篇文章",
		tagsAcross: "共 {tags}，涵盖 {posts}",
		postsTaggedWith: "标有“{tag}”的文章",
		browsePostsByTopic: "按主题浏览博客文章。",
		browsePostsByDate: "按日期浏览全部博客文章。",
		noTagsYet: "暂无标签。",
		noPostsYet: "暂无文章。",
		noPostsWithTag: "没有带有此标签的文章。",
		viewAllTags: "查看所有标签",
		projectsIntro: "精选的系统、产品与研究成果。",
		blogIntro: "关于系统、工程和产品构建的笔记。",
		heroTagline:
			"Aptos Labs 创始工程师。我构建并扩展基础设施，打造开发者工具，并领导团队交付前沿技术。",
		currentRole: "创始工程师，Aptos Labs",
		experienceIntro:
			"十多年来，我一直在构建规模、可靠性和速度都至关重要的平台。我曾在 AWS 和 Meta 工作了 8 年，负责基础设施和开发者工具。之后，我参与创立了 Aptos Labs，将 Meta 级别的基础设施带入公有链领域。",
		infrastructureScaling: "基础设施扩展",
		developerTooling: "开发者工具",
		leadershipMentorship: "领导力与导师制",
		infrastructureScalingHighlight: "设计并运营随增长依然可靠的高吞吐量系统。",
		developerToolingHighlight: "打造让团队保持快速、一致且高效的平台与工作流。",
		leadershipMentorshipHighlight:
			"培养团队、指导工程师，并使交付与长期战略保持一致。",
		networkingCloudBlockchain: "网络、云、区块链",
		focusAreasIntro: "当系统既要快又要正确时，我把时间花在这些地方。",
		infrastructureScalingFocus:
			"设计能够随流量、延迟和安全需求增长的可靠平台。",
		developerToolingFocus:
			"构建内部产品、CI/CD 系统和更快、更自信地交付的工作流。",
		leadershipMentorshipFocus:
			"辅导团队，打造主人翁文化，并让技术战略与成果保持一致。",
		latestWritingIntro: "关于系统、基础设施和构建之道的更新。",
		featuredProjectsIntro: "精选的产品、研究与实验成果。",
		featured: "精选",
		minRead: "{minutes} 分钟阅读",
		updated: "更新于",
		readMoreAbout: "阅读更多关于{title}",
		backToProjects: "返回项目",
		previousProject: "上一个项目",
		nextProject: "下一个项目",
		previous: "上一篇",
		next: "下一篇",
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
		star: "별",
		stars: "별",
		fork: "포크",
		forks: "포크",
		lastPush: "마지막 푸시",
		statusActive: "활발",
		statusMaintained: "유지 보수",
		statusArchived: "보관됨",
		socialLinks: "소셜 링크",
		switchToMode: "{mode} 모드로 전환",
		light: "라이트",
		dark: "다크",
		translatedBy: "AI 번역",
		toggleTheme: "색상 테마 전환",
		selectLanguage: "언어 선택",
		search: "검색",
		openMenu: "메뉴 열기",
		closeMenu: "메뉴 닫기",
		site: "사이트",
		archive: "아카이브",
		tags: "태그",
		tagOne: "개의 태그",
		tagMany: "개의 태그",
		postOne: "개의 글",
		postMany: "개의 글",
		tagsAcross: "{posts}에 걸친 {tags}",
		postsTaggedWith: '"{tag}" 태그가 달린 글',
		browsePostsByTopic: "주제별로 블로그 글을 둘러보세요.",
		browsePostsByDate: "날짜별로 모든 블로그 글을 둘러보세요.",
		noTagsYet: "아직 태그가 없습니다.",
		noPostsYet: "아직 글이 없습니다.",
		noPostsWithTag: "이 태그가 달린 글이 없습니다.",
		viewAllTags: "모든 태그 보기",
		projectsIntro: "시스템, 제품, 연구를 아우른 대표 작업입니다.",
		blogIntro: "시스템, 엔지니어링, 제품 만들기에 대한 글입니다.",
		heroTagline:
			"Aptos Labs 창업 엔지니어. 인프라를 구축하고 확장하며, 개발자 도구를 만들고, 첨단 기술을 출시하는 팀을 이끕니다.",
		currentRole: "창업 엔지니어, Aptos Labs",
		experienceIntro:
			"저는 규모, 안정성, 속도가 중요한 플랫폼을 10년 넘게 구축해 왔습니다. AWS와 Meta에서 8년 동안 인프라와 개발자 도구 작업을 했고, 이후 Aptos Labs 설립을 도우며 Meta 수준의 인프라를 퍼블릭 블록체인 영역으로 가져왔습니다.",
		infrastructureScaling: "인프라 확장",
		developerTooling: "개발자 도구",
		leadershipMentorship: "리더십과 멘토링",
		infrastructureScalingHighlight:
			"성장해도 안정적으로 유지되는 고처리량 시스템을 설계하고 운영합니다.",
		developerToolingHighlight:
			"팀이 빠르고 일관되게 생산적으로 일할 수 있는 플랫폼과 워크플로를 만듭니다.",
		leadershipMentorshipHighlight:
			"팀을 키우고 엔지니어를 멘토링하며, 장기 전략에 맞춰 납기를 조정합니다.",
		networkingCloudBlockchain: "네트워킹, 클라우드, 블록체인",
		focusAreasIntro:
			"시스템이 빠르면서도 정확해야 할 때 제 시간을 쓰는 곳입니다.",
		infrastructureScalingFocus:
			"트래픽, 지연 시간, 보안 요구 사항에 맞춰 성장하는 안정적인 플랫폼을 설계합니다.",
		developerToolingFocus:
			"더 빠르고 확신 있게 출시할 수 있는 내부 제품, CI/CD 시스템, 워크플로를 구축합니다.",
		leadershipMentorshipFocus:
			"팀을 코칭하고 주인 의식 문화를 만들며, 기술 전략과 성과를 일치시킵니다.",
		latestWritingIntro:
			"시스템, 인프라, 그리고 만드는 일에 대한 글을 올립니다.",
		featuredProjectsIntro: "제품, 연구, 실험을 아우른 대표 작업입니다.",
		featured: "주요",
		minRead: "{minutes}분 읽기",
		updated: "업데이트",
		readMoreAbout: "{title} 자세히 보기",
		backToProjects: "프로젝트로 돌아가기",
		previousProject: "이전 프로젝트",
		nextProject: "다음 프로젝트",
		previous: "이전",
		next: "다음",
	},
};

/** `t` with `{placeholder}` substitution: `tf(locale, "minRead", { minutes: 3 })`. */
export function tf(
	locale: Locale,
	key: string,
	values: Record<string, string | number>,
): string {
	return Object.entries(values).reduce(
		(text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
		t(locale, key),
	);
}

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
