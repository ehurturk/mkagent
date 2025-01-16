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
    ColorMode, useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import {nodeTypes} from "@/app/workflow/types/nodeTypes";
import {useTheme} from "next-themes";
import {IWorkflow} from "@/lib/models";

import {DragDropProvider, useDragDrop} from "@/app/workflow/lib/DragDropContext";
import {CreateFlowNode} from "@/app/workflow/lib/createFlowNode";
import {TaskRegistry} from "@/app/workflow/lib/tasks/registry";
import {TaskType} from "@/app/workflow/types/task";
import {AppNode} from "@/app/workflow/types/appNode";

const fitViewOptions = {padding: 1};

function FlowEditor({workflow}: { workflow: IWorkflow }) {
    // const [nodes, setNodes, onNodesChange] = useNodesState([
    //   CreateFlowNode(TaskType.USE_LLM),
    //   CreateFlowNode(TaskType.CREATE_PROMPT),
    // ]);
    // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const {theme} = useTheme();

    const [type, _] = useDragDrop();
    const {screenToFlowPosition} = useReactFlow();

    // TODO: Use a customized edge on connect callback.
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback((event: any) => {
        event.preventDefault();

        if (!type) return;

        const pos = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        })

        const newNode = CreateFlowNode(TaskRegistry[type as TaskType].type, pos);
        setNodes((nds: AppNode[]) => [...nds, newNode]);
    }, [screenToFlowPosition, type]);

    useEffect(() => {
        console.log(workflow.definition)
        try {
            const flow = JSON.parse(workflow.definition);
            if (!flow) return;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
        } catch (error) {
        }
    }, []);

    return (
        <main className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitViewOptions={fitViewOptions}
                colorMode={theme as ColorMode}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
            >
                <MiniMap/>
                <Controls position="top-right" fitViewOptions={fitViewOptions}/>
                <Background variant={BackgroundVariant.Dots}/>
            </ReactFlow>
        </main>
    );
}

export default FlowEditor;
