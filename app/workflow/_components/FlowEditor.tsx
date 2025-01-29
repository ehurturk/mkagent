"use client";

import React, {useCallback, useEffect} from "react";
import {
    ReactFlow,
    useEdgesState,
    useNodesState,
    Background,
    MiniMap,
    Controls,
    BackgroundVariant,
    ColorMode,
    useReactFlow,
    addEdge,
    Connection,
    Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import {nodeTypes} from "@/app/workflow/types/nodeTypes";
import {useTheme} from "next-themes";
import {IWorkflow} from "@/lib/models";

import {useDragDrop} from "@/app/workflow/lib/DragDropContext";
import {CreateFlowNode} from "@/app/workflow/lib/createFlowNode";
import {TaskRegistry} from "@/app/workflow/lib/tasks/registry";
import {TaskParameterType, TaskType} from "@/app/workflow/types/task";
import {AppNode} from "@/app/workflow/types/appNode";
import {useWorkflowId} from "@/app/workflow/lib/hooks/useWorkflowId";
import {edgeTypes} from "@/app/workflow/types/edgeTypes";
// import { useExecutionStore } from "@/app/workflow/lib/store/useExecutionStore";

const fitViewOptions = {padding: 1};

function FlowEditor({workflow}: { workflow: IWorkflow }) {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    // const { env } = useExecutionStore();
    const {setWorkflowId} = useWorkflowId();

    const {theme} = useTheme();

    const [type] = useDragDrop();
    const {screenToFlowPosition, updateNodeData, getNode} = useReactFlow();

    useEffect(() => {
        setWorkflowId(workflow.id);
    }, [setWorkflowId, workflow?.id]);

    const onConnect = useCallback(
        (params: Connection) => {
            const targetH = params.targetHandle;
            const sourceH = params.sourceHandle;

            if (!sourceH || !targetH) return;

            const s = getNode(params.source) as AppNode;
            const t = getNode(params.target) as AppNode;

            if (!s || !t) return;

            // TODO: Either the types must match OR it must be a future execution (we don't know the type yet).
            if (
                TaskRegistry[s.data.type].outputs.some(
                    (out) =>
                        out.type.toString() === t.data.type.toString() ||
                        out.type === TaskParameterType.COMPUTATION
                ) ||
                TaskRegistry[t.data.type].inputs.some(
                    (inp) =>
                        inp.type.toString() === s.data.type.toString() ||
                        inp.type === TaskParameterType.COMPUTATION
                )
            ) {
                setEdges(() => addEdge({...params, type: "custom"}, edges));
                // env.addToDependencies(t.id, s.id);
            }

            if (!params.targetHandle) return;
            const nodeInputs = t.data.inputs;
            delete nodeInputs[params.targetHandle];
            updateNodeData(t.id, {
                inputs: nodeInputs,
            });
        },
        [getNode, updateNodeData, setEdges, edges]
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (event: any) => {
            event.preventDefault();

            if (!type) return;

            const pos = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = CreateFlowNode(
                TaskRegistry[type as TaskType].type,
                pos
            );
            setNodes((nds: AppNode[]) => [...nds, newNode]);
        },
        [screenToFlowPosition, setNodes, type]
    );

    useEffect(() => {
        console.log(workflow.definition);
        try {
            const flow = JSON.parse(workflow.definition);
            if (!flow) return;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
        } catch (err) {
            console.log(err);
        }
    }, [setEdges, setNodes, workflow.definition]);

    const getNodeColor = (node: AppNode) => {
        return TaskRegistry[node.data.type].theme;
    };

    return (
        <main className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitViewOptions={fitViewOptions}
                colorMode={theme as ColorMode}
                onDrop={onDrop}
                onDragOver={onDragOver}
                snapToGrid={true}
                fitView
            >
                <MiniMap pannable={true} zoomable={true} nodeColor={getNodeColor}/>
                <Controls position="top-right" fitViewOptions={fitViewOptions}/>
                <Background variant={BackgroundVariant.Dots} size={1.3}/>
            </ReactFlow>
        </main>
    );
}

export default FlowEditor;
