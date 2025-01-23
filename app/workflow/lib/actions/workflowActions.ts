"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { AppNode } from "@/app/workflow/types/appNode";
import { Edge } from "@xyflow/react";
import { CreateFlowNode } from "@/app/workflow/lib/createFlowNode";
import { TaskType } from "@/app/workflow/types/task";

// export const runtime = "edge";
export async function createWorkflow(data: {
  userId: string;
  name: string;
  description?: string;
  status: string;
}) {
  if (!data) {
    throw new Error(`No data provided for workflow.`);
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [CreateFlowNode(TaskType.CREATE_PROMPT)],
    edges: [],
  };

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
    return workflow;
  } catch (error) {
    // TODO: remove in production.
    console.error("Error creating workflow:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(
          "A workflow with this name already exists for this user."
        );
      }
    }

    const errorMessage =
      process.env.NODE_ENV === "development"
        ? `Failed to create workflow: ${error}`
        : "Failed to create workflow";

    throw new Error(`Failed to create workflow: ${errorMessage}`);
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
      Object.entries(data).filter(([value]) => value !== undefined)
    );

    const workflow = await prisma.workflow.update({
      where: { id },
      data: updateData,
    });

    return workflow;
  } catch (error) {
    throw new Error(`Failed to update workflow: ${error}`);
  }
}

export async function getUserWorkflows(userId: string) {
  try {
    const workflows = await prisma.workflow.findMany({
      where: { userId },
    });
    return workflows;
  } catch (error) {
    throw new Error(`Failed to fetch workflows: ${error}`);
  }
}

export async function getWorkflow(id: string) {
  try {
    const workflow = await prisma.workflow.findMany({
      where: { id },
    });
    if (workflow.length === 0) {
      throw new Error("No workflow found");
    }
    return workflow[0];
  } catch (error) {
    throw new Error(`Failed to fetch workflow: ${error}`);
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
    throw new Error(`Failed to delete workflow: ${error}`);
  }
}
