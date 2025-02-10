// app/workflow/_components/WorkflowContext.tsx
"use client";

import { createContext, useContext } from "react";

interface WorkflowType {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    definition: string;
    status: string;
    createdAt: Date;
    updateAt: Date;
}

const WorkflowContext = createContext<WorkflowType | null>(null);

export function WorkflowProvider({
                                     children,
                                     workflow
                                 }: {
    children: React.ReactNode;
    workflow: WorkflowType;
}) {
    return (
        <WorkflowContext.Provider value={workflow}>
            {children}
        </WorkflowContext.Provider>
    );
}

export function useWorkflow() {
    const context = useContext(WorkflowContext);
    if (!context) {
        throw new Error("useWorkflow must be used within a WorkflowProvider");
    }
    return context;
}