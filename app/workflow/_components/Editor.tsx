"use client";

import React from "react";
import {ReactFlowProvider} from "@xyflow/react";
import FlowEditor from "@/app/workflow/_components/FlowEditor";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import {IWorkflow} from "@/lib/models";
import TaskMenu from "@/app/workflow/_components/TaskMenu";
import { DragDropProvider } from "@/app/workflow/lib/DragDropContext";

function Editor({workflow}: { workflow: IWorkflow }) {

    return (
        <ReactFlowProvider>
            <div className="flex flex-col h-full w-full overflow-hidden">
                <Topbar
                    title="Workflow Editor"
                    subtitle={workflow.name}
                    id={workflow.id}
                />
                <section className="flex h-full overflow-auto">
                    <DragDropProvider>
                        <TaskMenu/>
                        <FlowEditor workflow={workflow}/>
                    </DragDropProvider>
                </section>
            </div>
        </ReactFlowProvider>
    );
}

export default Editor;
