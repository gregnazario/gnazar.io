import type { MetadataRoute } from "next";

import { getAllBlogPosts, getAllProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    getAllBlogPosts(),
    getAllProjects(),
  ]);
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: now,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: now,
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: now,
    })),
  ];
}
