"use client";

import React, { useCallback, useEffect } from "react";
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
  Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { nodeTypes } from "@/app/workflow/types/nodeTypes";
import { useTheme } from "next-themes";
import { IWorkflow } from "@/lib/models";

import { useDragDrop } from "@/app/workflow/lib/DragDropContext";
import { CreateFlowNode } from "@/app/workflow/lib/createFlowNode";
import { TaskRegistry } from "@/app/workflow/lib/tasks/registry";
import { TaskType } from "@/app/workflow/types/task";
import { AppNode } from "@/app/workflow/types/appNode";
import { useWorkflowId } from "@/app/workflow/lib/hooks/useWorkflowId";

const fitViewOptions = { padding: 1 };

function FlowEditor({ workflow }: { workflow: IWorkflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { setWorkflowId } = useWorkflowId();

  const { theme } = useTheme();

  const [type] = useDragDrop();
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    setWorkflowId(workflow.id);
  }, [workflow?.id]);

  // TODO: Use a customized edge on connect callback.
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => eds.concat(params)),
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!type) return;

      const pos = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = CreateFlowNode(TaskRegistry[type as TaskType].type, pos);
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
        fitViewOptions={fitViewOptions}
        colorMode={theme as ColorMode}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <MiniMap pannable={true} zoomable={true} nodeColor={getNodeColor} />
        <Controls position="top-right" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} size={1.3} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
