import {
  CreateWorkflowButton,
  CreateWorkflowCard,
} from "@/app/(dashboard)/workflows/components/CreateWorkflowButton";
import { Activity, Box, Layers } from "lucide-react";
import { getUserWorkflows } from "@/app/workflow/lib/actions/workflowActions";
import WorkflowCard from "@/app/(dashboard)/workflows/components/WorkflowCard";
import { Suspense } from "react";
import WorkflowsLoadingFallback from "@/app/(dashboard)/workflows/components/WorkflowsLoadingFallback";

export default async function Page() {
  // TODO: implement user auth / id logic.

  const workflows = await getUserWorkflows("ZAZAZA").catch((error) => {
    console.error(error);
    // TODO: Show error?
    return [];
  });

  return (
    <div className="relative min-h-screen bg-background">
      {/* Gradient background */}
      <div className="fixed inset-0 md:left-[280px] bg-gradient-to-br from-blue-900/5 via-background to-purple-900/5 animate-gradient-xy -z-10" />

      <div className="relative container mx-auto px-10 py-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Workflows
            </h1>
            <p className="text-muted-foreground mt-2">
              Create and manage your AI automation workflows.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200" />
            <CreateWorkflowButton />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "Total Workflows",
              value: workflows?.length || 0,
              icon: Box,
            },
            {
              label: "Active Workflows",
              value:
                workflows?.filter((w) => w.status.toLowerCase() === "published")
                  .length || 0,
              icon: Activity,
            },
            {
              label: "Draft Workflows",
              value:
                workflows?.filter((w) => w.status.toLowerCase() === "draft")
                  .length || 0,
              icon: Layers,
            },
          ].map((stat) => (
            <div key={stat.label} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <div className="relative p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border transition-all group-hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Create New Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200" />
            <CreateWorkflowCard />
          </div>

          {/* Existing Workflows */}

          <Suspense fallback={<WorkflowsLoadingFallback />}>
            {workflows &&
              workflows.map((workflow) => (
                <WorkflowCard
                  key={workflow.id}
                  {...workflow}
                  description={workflow.description || ""}
                />
              ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
