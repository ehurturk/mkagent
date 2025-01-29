"use client";

import {Button} from "@/components/ui/button";
import {useState, useCallback} from "react";
import {Loader2} from "lucide-react";
import {useEdges, useNodes} from "@xyflow/react";
import toast from "react-hot-toast";
import {WorkflowExecutionEngine, NodeExecutionStatus} from "@/lib/execution/execution";
import {AppNode} from "@/app/workflow/types/appNode";

export default function ExecuteButton() {
    const [isExecuting, setIsExecuting] = useState(false);
    const nodes = useNodes() as AppNode[];
    const edges = useEdges();

    const handleExecute = useCallback(async () => {
        if (nodes.length === 0) {
            toast.error("No nodes in the workflow to execute!");
            return;
        }

        const engine = new WorkflowExecutionEngine(nodes, edges);

        setIsExecuting(true);
        await toast.promise(
            async () => {
                try {
                    await engine.execute();
                    const finalState = engine.getExecutionState();

                    // Check for any errors in the final state
                    const hasErrors = Array.from(finalState.values()).some(
                        state => state.status === NodeExecutionStatus.ERROR
                    );

                    if (hasErrors) {
                        throw new Error("Some nodes failed during execution");
                    }

                    console.log("@ENGINE: Final state", finalState);
                    return finalState;
                } catch (error) {
                    console.error("Workflow execution error:", error);
                    throw error; // Re-throw to trigger toast error
                }
            },
            {
                loading: "Executing workflow...",
                success: () => {
                    setIsExecuting(false);
                    return "Workflow execution completed successfully!";
                },
                error: (err: Error) => {
                    setIsExecuting(false);
                    return `Error executing workflow: ${err.message}`;
                },
            }
        );
    }, [nodes, edges]);

    // Disable button if there are no nodes or already executing
    const isDisabled = isExecuting || nodes.length === 0;

    return (
        <Button
            variant="outline"
            onClick={handleExecute}
            disabled={isDisabled}
            className="min-w-[160px]" // Prevent button size changes
        >
            {isExecuting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Executing Workflow
                </>
            ) : (
                "Execute Workflow"
            )}
        </Button>
    );
}