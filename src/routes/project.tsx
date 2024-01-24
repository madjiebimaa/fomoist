import ProjectFormDialog from "@/components/ProjectFormDialog";

export default function ProjectPage() {
  return (
    <>
      <h2 className="font-bold text-3xl text-slate-900">My Projects</h2>
      <div className="flex flex-col gap-2 mt-auto">
        <ProjectFormDialog />
      </div>
    </>
  );
}
