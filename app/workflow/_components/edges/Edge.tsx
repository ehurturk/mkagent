import React from "react";
import {
  BaseEdge,
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
}: EdgeProps) {
  const [edgePath, ,] = getSmoothStepPath({
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
