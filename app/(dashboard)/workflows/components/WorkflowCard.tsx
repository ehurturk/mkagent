"use client";

import { DeleteWorkflowButton } from "@/app/(dashboard)/workflows/components/DeleteWorkflow";
import React from "react";
import { useRouter } from 'next/navigation';

export default function WorkflowCard({ id, name, status, description, updateAt }: {id: string, name: string, status: string, description: string, updateAt: Date}) {
  const router = useRouter();

  return (
      <div
          className="relative group cursor-pointer"
          onClick={() => router.push(`/workflow/editor/${id}`)}
      >
        <div
            className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"
        />
        <div
            className="relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 transition-all group-hover:-translate-y-1"
        >
          <div className="flex flex-col h-full min-h-[200px]">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                {name}
              </h3>
              <div onClick={(e) => e.stopPropagation()}>
                <DeleteWorkflowButton
                    workflowId={id}
                    workflowName={name}
                    onDeleted={() => {
                      // TODO: add error handling
                      router.refresh();
                    }}
                />
              </div>
              <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      status === "PUBLISHED"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                  }`}
              >
              {status}
            </span>
            </div>
            <p className="text-muted-foreground text-sm flex-grow">
              {description}
            </p>
            <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
              Updated {updateAt.toISOString()}
            </div>
          </div>
        </div>
      </div>
  );
}