import React from "react";
import {
  BaseEdge,
  getBezierPath,
  getSmoothStepPath,
  useViewport,
  type EdgeProps,
} from "@xyflow/react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { zoom } = useViewport();

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      type="bezier"
      style={{ strokeWidth: 3 / zoom, stroke: selected ? "#fff" : "#919191" }}
    />
  );
}
