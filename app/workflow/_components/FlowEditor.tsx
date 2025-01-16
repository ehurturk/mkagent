"use client";

// import { Workflow } from "@/app/models/workflow";
import React, {useEffect} from "react";
import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  Background,
  MiniMap,
  Controls,
  BackgroundVariant,
  ColorMode,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
// import { CreateFlowNode } from "@/app/workflow/lib/createFlowNode";
// import { TaskType } from "@/app/workflow/types/task";
// import NodeComponent from "@/app/workflow/_components/nodes/NodeComponent";
import { nodeTypes } from "@/app/workflow/types/nodeTypes";
import { useTheme } from "next-themes";
import {IWorkflow} from "@/lib/models";

const fitViewOptions = { padding: 1 };

function FlowEditor({ workflow }: { workflow: IWorkflow }) {
  // const [nodes, setNodes, onNodesChange] = useNodesState([
  //   CreateFlowNode(TaskType.USE_LLM),
  //   CreateFlowNode(TaskType.CREATE_PROMPT),
  // ]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { theme } = useTheme();


  useEffect(() => {
    console.log(workflow.definition)
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
    } catch (error) {}
  }, []);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitViewOptions={fitViewOptions}
        colorMode={theme as ColorMode}
        fitView
      >
        <MiniMap />
        <Controls position="top-right" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
