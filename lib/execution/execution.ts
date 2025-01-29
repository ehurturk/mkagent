import {Edge} from '@xyflow/react';
import {TaskType} from '@/app/workflow/types/task';
import {AppNode} from "@/app/workflow/types/appNode";
import {TaskRegistry} from '@/app/workflow/lib/tasks/registry';

export type TaskParameterStore = Record<string, unknown>;

export interface ExecutionState {
    variables: Record<string, unknown>;
    metadata: Record<string, unknown>;
}

// Represents the status of each node during execution
export enum NodeExecutionStatus {
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
    SKIPPED = 'SKIPPED',
    ERROR = 'ERROR',
}

interface NodeExecutionState {
    status: NodeExecutionStatus;
    outputs?: TaskParameterStore;
    error?: Error;
}

export class WorkflowExecutionEngine {
    // react-flow data
    private nodes: AppNode[];
    private edges: Edge[];
    // store the execution state of each task
    private readonly executionState: Map<string, NodeExecutionState>;
    // a global execution state
    private readonly globalState: ExecutionState;

    constructor(nodes: AppNode[], edges: Edge[]) {
        this.nodes = nodes;
        this.edges = edges;
        this.executionState = new Map();
        this.globalState = {
            variables: {},
            metadata: {},
        };

        // Initialize execution state for all nodes
        nodes.forEach(node => {
            this.executionState.set(node.id, {
                status: NodeExecutionStatus.PENDING,
            });
        });
    }

    // Find all entry point nodes
    private findEntryPoints(): AppNode[] {
        return this.nodes.filter(node => {
            const task = TaskRegistry[node.data.type];
            return task.isEntryPoint;
        });
    }

    // Get all outgoing edges for a node
    private getOutgoingEdges(nodeId: string): Edge[] {
        return this.edges.filter(edge => edge.source === nodeId);
    }

    // Get all incoming edges for a node
    private getIncomingEdges(nodeId: string): Edge[] {
        return this.edges.filter(edge => edge.target === nodeId);
    }

    // Check if all incoming nodes are completed
    private areAllDependenciesCompleted(nodeId: string): boolean {
        const incomingEdges = this.getIncomingEdges(nodeId);
        return incomingEdges.every(edge => {
            const sourceState = this.executionState.get(edge.source);
            return sourceState?.status === NodeExecutionStatus.COMPLETED;
        });
    }

    // Collect inputs for a node from its incoming edges
    private async collectNodeInputs(node: AppNode): Promise<TaskParameterStore> {
        const inputs: TaskParameterStore = {};
        const incomingEdges = this.getIncomingEdges(node.id);
        console.log("INCOMING EDGES FOR NODE:", node.type, ": ", incomingEdges);

        for (const edge of incomingEdges) {
            const sourceNode = this.nodes.find(n => n.id === edge.source);
            if (!sourceNode) continue;

            const sourceState = this.executionState.get(edge.source)
            console.log("SOURCE STATE:", sourceState);
            if (!sourceState?.outputs) continue;

            // Map the output to the corresponding input
            // FIXME: edge.sourceHandle sems a lil sus we may need to use the node id instead of node name.
            const sourceOutput = sourceState.outputs[edge.sourceHandle || ''];
            if (sourceOutput !== undefined) {
                inputs[edge.targetHandle || ''] = sourceOutput;
            }
        }

        return inputs;
    }

    private async executeNode(node: AppNode): Promise<void> {
        try {
            const task = TaskRegistry[node.data.type];
            const nodeState = this.executionState.get(node.id);

            if (!nodeState || nodeState.status === NodeExecutionStatus.COMPLETED) {
                return;
            }

            // Update status to running
            this.executionState.set(node.id, {
                ...nodeState,
                status: NodeExecutionStatus.RUNNING,
            });

            // Collect inputs from incoming edges
            const inputs = await this.collectNodeInputs(node);
            console.log("INPUTS ARE:", inputs)

            // Execute the task
            const outputs = await task.execute(inputs, this.globalState);

            const mappedOutputs: TaskParameterStore = {};
            task.outputs.forEach(outputDef => {
                // Use the output name as the key in our store
                if (outputs[outputDef.name] !== undefined) {
                    mappedOutputs[outputDef.name] = outputs[outputDef.name];
                }
            });

            // Update execution state with outputs
            this.executionState.set(node.id, {
                status: NodeExecutionStatus.COMPLETED,
                outputs,
            });

            // Process outgoing edges based on task type
            if (task.type === TaskType.ON_CONDITION) {
                // Handle conditional branching
                const outgoingEdges = this.getOutgoingEdges(node.id);
                // FIXME: outputs.selectedBranch seems a lil sus.
                const selectedBranch = outputs.selectedBranch as string;

                // Mark non-selected branches as skipped
                outgoingEdges.forEach(edge => {
                    if (edge.sourceHandle !== selectedBranch) {
                        const targetNode = this.nodes.find(n => n.id === edge.target);
                        if (targetNode) {
                            this.skipBranch(targetNode);
                        }
                    }
                });
            }
        } catch (error) {
            this.executionState.set(node.id, {
                status: NodeExecutionStatus.ERROR,
                error: error as Error,
            });
            throw error;
        }
    }

    // Skip a branch of nodes
    private skipBranch(startNode: AppNode): void {
        const nodesToSkip = new Set<string>();
        const queue = [startNode.id];

        while (queue.length > 0) {
            const currentNodeId = queue.shift()!;
            nodesToSkip.add(currentNodeId);

            // Add all downstream nodes to queue
            const outgoingEdges = this.getOutgoingEdges(currentNodeId);
            outgoingEdges.forEach(edge => {
                if (!nodesToSkip.has(edge.target)) {
                    queue.push(edge.target);
                }
            });
        }

        // Mark all nodes in the branch as skipped
        nodesToSkip.forEach(nodeId => {
            this.executionState.set(nodeId, {
                status: NodeExecutionStatus.SKIPPED,
            });
        });
    }

    // Execute the workflow with concurrency
    public async execute(maxConcurrency = 3): Promise<void> {
        const entryPoints = this.findEntryPoints();
        const executionQueue = [...entryPoints];
        const executing = new Set<string>();

        while (executionQueue.length > 0 || executing.size > 0) {
            // Fill up concurrent execution slots
            while (
                executionQueue.length > 0 &&
                executing.size < maxConcurrency
                ) {
                const node = executionQueue[0];
                if (this.areAllDependenciesCompleted(node.id)) {
                    executionQueue.shift();
                    executing.add(node.id);

                    // Execute node and handle completion
                    this.executeNode(node)
                        .then(() => {
                            executing.delete(node.id);

                            // Add ready-to-execute downstream nodes to queue
                            const outgoingEdges = this.getOutgoingEdges(node.id);
                            outgoingEdges.forEach(edge => {
                                const targetNode = this.nodes.find(n => n.id === edge.target);
                                if (
                                    targetNode &&
                                    this.areAllDependenciesCompleted(targetNode.id) &&
                                    !executionQueue.includes(targetNode) &&
                                    !executing.has(targetNode.id)
                                ) {
                                    executionQueue.push(targetNode);
                                }
                            });
                        })
                        .catch(error => {
                            executing.delete(node.id);
                            throw error;
                        });
                } else {
                    // Move node to end of queue if dependencies aren't ready
                    executionQueue.push(executionQueue.shift()!);
                }
            }

            // Wait a bit before checking again
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Get the current execution state
    public getExecutionState(): Map<string, NodeExecutionState> {
        return new Map(this.executionState);
    }
}