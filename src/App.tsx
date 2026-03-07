import { useMemo, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import { Project } from "./types";
import projectsFromFile from "./data/projects.json";

function fuzzyIncludes(value: string, query: string): boolean {
  const target = value.toLowerCase();
  const q = query.toLowerCase().trim();

  if (!q) {
    return true;
  }

  if (target.includes(q)) {
    return true;
  }

  // Subsequence match helps tolerate missing/extra characters in quick searches.
  let qIndex = 0;
  for (let i = 0; i < target.length && qIndex < q.length; i += 1) {
    if (target[i] === q[qIndex]) {
      qIndex += 1;
    }
  }

  return qIndex === q.length;
}

function toProject(entry: Partial<Project>, index: number): Project {
  return {
    id: entry.id || `file-project-${index}`,
    name: entry.name || `Unnamed Project ${index + 1}`,
    type: entry.type || "General",
    description: entry.description || "No description provided.",
    repoLink: entry.repoLink || "",
    deployedUrl: entry.deployedUrl || ""
  };
}

const initialProjects: Project[] = (projectsFromFile as Partial<Project>[]).map(toProject);

export default function App() {
  const [projects] = useState<Project[]>(initialProjects);
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const types = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.type)))], [projects]);

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const typeMatch = typeFilter === "All" || project.type === typeFilter;
      const keywordMatch =
        query.length === 0 ||
        fuzzyIncludes(project.name, query) ||
        fuzzyIncludes(project.description, query) ||
        fuzzyIncludes(project.type, query) ||
        (project.techStack || []).some((tech) => fuzzyIncludes(tech, query));

      return typeMatch && keywordMatch;
    });
  }, [projects, typeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_18%_8%,rgba(56,189,248,0.12),transparent_30%),linear-gradient(180deg,#020617_0%,#020617_50%,#030712_100%)] text-slate-100">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <header className="mb-8 border-b border-slate-800 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-4xl font-semibold tracking-tight text-white">Project Hub</h1>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                {projects.length} project{projects.length === 1 ? "" : "s"}
              </span>
              <label className="flex items-center gap-2 text-xs text-slate-400">
                <span>Type</span>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-sm text-slate-100 outline-none ring-sky-500/40 transition focus:ring"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="relative flex items-center text-xs text-slate-400">
                <SearchIcon className="pointer-events-none absolute left-2.5 text-slate-500" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="w-40 rounded-md border border-slate-700 bg-slate-900 py-1.5 pl-8 pr-2.5 text-sm text-slate-100 outline-none ring-sky-500/40 transition placeholder:text-slate-500 focus:ring md:w-52"
                />
              </label>
            </div>
          </div>
        </header>

        <section>
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium text-slate-300">Projects</h2>
            <p className="text-sm text-slate-500">Showing {filteredProjects.length}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {filteredProjects.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="text-sm text-slate-400">No projects found for this criteria.</p>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M10.5 3a7.5 7.5 0 0 1 5.93 12.08l4.25 4.24-1.42 1.42-4.24-4.25A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
    </svg>
  );
}
