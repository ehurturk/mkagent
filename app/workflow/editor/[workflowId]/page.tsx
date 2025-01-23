import { ThemeWrapper } from "@/app/components/ThemeWrapper";
import Editor from "@/app/workflow/_components/Editor";
import { getWorkflow } from "@/app/workflow/lib/actions/workflowActions";
import React from "react";
import { notFound } from "next/navigation";
export const runtime = "edge";
async function Page({ params }: { params: Promise<{ workflowId: string }> }) {
  const { workflowId } = await params;

  const workflow = await getWorkflow(workflowId).catch((error) => {
    console.error(error);
    notFound();
  });

  return (
    <ThemeWrapper>
      <Editor workflow={workflow} />
    </ThemeWrapper>
  );
}

export default Page;
