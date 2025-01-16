// lib/actions/workflowActions.ts
"use server";

import prisma from "@/lib/db";
import {revalidatePath} from "next/cache";
import {Prisma} from "@prisma/client";
import {AppNode} from "@/app/workflow/types/appNode";
import {Edge} from "@xyflow/react";
import {CreateFlowNode} from "@/app/workflow/lib/createFlowNode";
import {TaskType} from "@/app/workflow/types/task";

export async function createWorkflow(data: {
  userId: string;
  name: string;
  description?: string;
  status: string;
}) {
  if (!data) {
    return { success: false, data: null, error: "No data provided" };
  }

  const initialFlow: {nodes: AppNode[]; edges: Edge[]} = {
    nodes: [CreateFlowNode(TaskType.CREATE_PROMPT)],
    edges: []
  }


  try {
    const workflow = await prisma.workflow.create({
      data: {
        userId: data.userId,
        name: data.name,
        description: data.description,
        definition: JSON.stringify(initialFlow),
        status: data.status,
      },
    });

    revalidatePath("/workflows");
    return { success: true, data: workflow, error: null };
  } catch (error) {
    console.error("Error creating workflow:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          data: null,
          error: "A workflow with this name already exists for this user",
        };
      }
    }

    // Include error details in development
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? `Failed to create workflow: ${error}`
        : "Failed to create workflow";

    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
}

export async function updateWorkflow(
  id: string,
  data: {
    userId?: string;
    name?: string;
    description?: string;
    definition?: string;
    status?: string;
  }
) {
  try {
    // Remove undefined values
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    const workflow = await prisma.workflow.update({
      where: { id },
      data: updateData,
    });

    return { success: true, data: workflow, error: null };
  } catch (error) {
    console.error("Error updating workflow:", error);

    return {
      success: false,
      data: null,
      error: `Failed to update workflow: ${error}`,
    };
  }
}

export async function getUserWorkflows(userId: string) {
  try {
    const workflows = await prisma.workflow.findMany({
      where: { userId },
    });
    return { data: workflows };
  } catch (error) {
    return { error: `Failed to fetch workflows: ${error}` };
  }
}

export async function getWorkflow(id: string) {
  try {
    const workflow = await prisma.workflow.findMany({
      where: { id },
    });
    if (workflow.length === 0) {
      return {success: false, data: null, error: "No workflow found"};
    }
    return { success: true, data: workflow[0], error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: `Failed to fetch workflow: ${error}`,
    };
  }
}

export async function deleteWorkflow(id: string) {
  try {
    await prisma.workflow.delete({
      where: { id },
    });
    revalidatePath("/workflows");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete workflow" };
  }
}
