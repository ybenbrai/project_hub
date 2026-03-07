import { Project } from "../types";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-xl border border-slate-800/80 bg-slate-900/45 p-5 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-900/70">
      <div>
        <span className="inline-flex rounded-full border border-slate-700 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-500">
          {project.type}
        </span>
        <h3 className="mt-3 text-xl font-semibold text-gray-100">{project.name}</h3>
      </div>

      <p className="mt-3 min-h-20 text-sm leading-6 text-gray-400">{project.description}</p>

      {project.techStack && project.techStack.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-full border border-slate-700/80 bg-slate-800/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex items-center gap-3">
        <span className="text-xs uppercase tracking-wide text-slate-500">Links</span>
        {project.repoLink ? (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 transition hover:border-slate-500 hover:bg-white/10 hover:text-white"
            aria-label={`Open ${project.name} repository`}
            title="Open repository"
          >
            <GitHubIcon />
            Repo
          </a>
        ) : null}
        {project.deployedUrl ? (
          <a
            href={project.deployedUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            aria-label={`Open ${project.name} live site`}
            title="Open live site"
          >
            <ExternalLinkIcon />
            Live
          </a>
        ) : null}
        {!project.repoLink && !project.deployedUrl ? (
          <span className="text-xs text-slate-500">No links yet</span>
        ) : null}
      </div>
    </article>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.76.08-.75.08-.75 1.2.08 1.84 1.24 1.84 1.24 1.08 1.83 2.82 1.3 3.5.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.36 1.23-3.19-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.22a11.4 11.4 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22.65 1.65.24 2.87.12 3.17.77.83 1.23 1.89 1.23 3.19 0 4.58-2.8 5.6-5.48 5.9.43.37.82 1.1.82 2.23v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" />
    </svg>
  );
}
