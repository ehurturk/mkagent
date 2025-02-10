"use client";

import React from "react";
import FlowEditor from "@/app/workflow/_components/FlowEditor";
import {IWorkflow} from "@/lib/models";
import TaskMenu from "@/app/workflow/_components/TaskMenu";
import {DragDropProvider} from "@/app/workflow/lib/DragDropContext";

function Editor({workflow}: { workflow: IWorkflow }) {

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <section className="flex h-full overflow-auto">
                <DragDropProvider>
                    <TaskMenu/>
                    <FlowEditor workflow={workflow}/>
                </DragDropProvider>
            </section>
        </div>
    );
}

export default Editor;
