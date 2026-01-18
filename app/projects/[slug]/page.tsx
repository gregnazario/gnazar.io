import Link from "next/link";
import { notFound } from "next/navigation";

import Badge from "@/components/Badge";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { siteConfig } from "@/lib/site";

type ProjectPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const content = await renderMdx(project.content);

  return (
    <section className="section">
      <div className="container">
        <div className="stack">
          <Link className="button ghost" href="/projects">
            Back to projects
          </Link>
          <article className="prose">
            <h1>{project.title}</h1>
            <div className="card-meta">
              {project.year ? <span>{project.year}</span> : null}
              {project.role ? <span>{project.role}</span> : null}
              {project.featured ? <Badge>Featured</Badge> : null}
            </div>
            {content}
            {project.links.length > 0 ? (
              <div className="hero-actions">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    className="button ghost"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  );
}
