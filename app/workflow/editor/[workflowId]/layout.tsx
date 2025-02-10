// app/workflow/editor/[workflowId]/layout.tsx
import {ReactFlowProvider} from "@xyflow/react";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import {getWorkflow} from "@/app/workflow/lib/actions/workflowActions";
import {notFound} from "next/navigation";
import {WorkflowProvider} from "@/app/workflow/_components/WorkflowContext";

export default async function WorkflowLayout({
                                                 children,
                                                 params,
                                             }: {
    children: React.ReactNode;
    params: Promise<{ workflowId: string }>;
}) {
    const {workflowId} = await params;

    const workflow = await getWorkflow(workflowId).catch((error) => {
        console.error(error);
        notFound();
    });

    return (
        <ReactFlowProvider>
            <WorkflowProvider workflow={workflow}>
                <div className="flex h-screen flex-col">
                    <Topbar/>
                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
            </WorkflowProvider>
        </ReactFlowProvider>
    );
}