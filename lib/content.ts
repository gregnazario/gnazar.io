import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  published: boolean;
  content: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role?: string;
  year?: string;
  featured: boolean;
  links: ProjectLink[];
  content: string;
};

async function getSlugs(folder: "blog" | "projects"): Promise<string[]> {
  const directory = path.join(contentRoot, folder);
  const entries = await fs.readdir(directory);
  return entries
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(/\.mdx$/, ""));
}

function normalizeString(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return fallback;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

function normalizeBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeLinks(value: unknown): ProjectLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }
      const record = item as Record<string, unknown>;
      const label = normalizeString(record.label, "");
      const href = normalizeString(record.href, "");
      if (!label || !href) {
        return null;
      }
      return { label, href };
    })
    .filter((item): item is ProjectLink => item !== null);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentRoot, "blog", `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const title = normalizeString(data.title, slug);
    const summary = normalizeString(data.summary, "");
    const date = normalizeString(data.date, "");
    const tags = normalizeStringArray(data.tags);
    const published = normalizeBoolean(data.published, true);

    return {
      slug,
      title,
      summary,
      date,
      tags,
      published,
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await getSlugs("blog");
  const posts = await Promise.all(slugs.map((slug) => getBlogPostBySlug(slug)));
  return posts
    .filter((post): post is BlogPost => Boolean(post))
    .filter((post) => post.published)
    .sort((a, b) => {
      const left = new Date(a.date).getTime();
      const right = new Date(b.date).getTime();
      return right - left;
    });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(contentRoot, "projects", `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const title = normalizeString(data.title, slug);
    const summary = normalizeString(data.summary, "");
    const role = normalizeString(data.role, "");
    const year = normalizeString(data.year, "");
    const featured = normalizeBoolean(data.featured, false);
    const links = normalizeLinks(data.links);

    return {
      slug,
      title,
      summary,
      role: role || undefined,
      year: year || undefined,
      featured,
      links,
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const slugs = await getSlugs("projects");
  const projects = await Promise.all(
    slugs.map((slug) => getProjectBySlug(slug))
  );
  return projects
    .filter((project): project is Project => Boolean(project))
    .sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return a.title.localeCompare(b.title);
    });
}
