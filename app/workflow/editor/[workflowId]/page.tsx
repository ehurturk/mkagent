import { ThemeWrapper } from "@/app/components/ThemeWrapper";
import Editor from "@/app/workflow/_components/Editor";
import { getWorkflow } from "@/app/workflow/lib/actions/workflowActions";
import React from "react";
import { notFound } from "next/navigation";

async function Page({ params }: { params: { workflowId: string } }) {
  const { workflowId } = await params;

  const workflow = await getWorkflow(workflowId);

  if (!workflow.success || !workflow.data) {
    // console.error("ERROR HAPPENED WHILE LOADING WORKFLOW!: ", workflow.error);
    notFound();
  }

  return (
    <ThemeWrapper>
      <Editor workflow={workflow.data} />
    </ThemeWrapper>
  );
}

export default Page;