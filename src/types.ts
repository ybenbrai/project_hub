export type ProjectStatus = "Active" | "Paused" | "Done";

export type Project = {
  id: string;
  name: string;
  type: string;
  description: string;
  repoLink: string;
  deployedUrl?: string;
  techStack?: string[];
  status?: ProjectStatus;
};
