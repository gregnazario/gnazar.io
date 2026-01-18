import Link from "next/link";

import Badge from "@/components/Badge";
import { getAllProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Selected work across systems, products, and research.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <h2>Projects</h2>
          <p>Selected work across systems, products, and research.</p>
        </div>
        <div className="grid two">
          {projects.map((project) => (
            <article key={project.slug} className="card">
              <div className="card-meta">
                {project.year ? <span>{project.year}</span> : null}
                {project.role ? <span>{project.role}</span> : null}
                {project.featured ? <Badge>Featured</Badge> : null}
              </div>
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p>{project.summary}</p>
              <div className="hero-actions">
                <Link className="button ghost" href={`/projects/${project.slug}`}>
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
