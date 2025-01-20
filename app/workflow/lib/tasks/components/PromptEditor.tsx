"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Variable,
  Copy,
  Wand2,
  FileIcon,
  AlertCircle,
  ChevronRight,
  Check,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import toast from "react-hot-toast";
import { useWorkflowSave } from "@/app/workflow/lib/hooks/useWorkflowSave";
import { EditorComponentProps } from "@/app/workflow/types/task";
import { useReactFlow } from "@xyflow/react";
import { useWorkflowId } from "@/app/workflow/lib/hooks/useWorkflowId";

interface HighlightedMessageProps {
  text: string;
}

const HighlightedMessage: React.FC<HighlightedMessageProps> = ({ text }) => {
  const parts = text.split(/(\${[^}]+})/g);
  return (
    <div className="font-mono whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.match(/^\${[^}]+}$/)) {
          return (
            <span
              key={i}
              className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-semibold"
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
};

const PromptEditor: React.FC<EditorComponentProps> = ({
  id,
  param,
  value,
  onSave,
}) => {
  const [systemMessage, setSystemMessage] = useState<string>(
    value["systemMessage"]
  );
  const [humanMessage, setHumanMessage] = useState<string>(
    value["humanMessage"]
  );
  const [variables, setVariables] = useState<Record<string, string>>(
    value["variables"]
  );
  const [preview, setPreview] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { workflowId } = useWorkflowId();
  const { saveWorkflow, isSaving } = useWorkflowSave(workflowId!!);
  const { toObject } = useReactFlow();

  useEffect(() => {
    const variableRegex = /\${([^}]+)}/g;
    const matches = Array.from(humanMessage.matchAll(variableRegex));
    const newVars: Record<string, string> = {};

    matches.forEach((match) => {
      const varName = match[1];
      newVars[varName] = variables[varName] || "";
    });

    setVariables(newVars);
  }, [humanMessage]);

  useEffect(() => {
    let result = humanMessage;
    Object.entries(variables).forEach(([key, value]) => {
      result = result.replace(
        new RegExp(`\\$\{${key}\}`, "g"),
        value || `\${${key}}`
      );
    });
    setPreview(result);
  }, [humanMessage, variables]);

  const handleSubmit = async () => {
    const data = {
      systemMessage,
      humanMessage,
      variables,
    };

    await onSave.mutateAsync(data);
    await saveWorkflow(toObject());
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard
        .writeText(
          JSON.stringify(
            {
              system: systemMessage,
              human: preview,
              variables,
            },
            null,
            2
          )
        )
        .then(() => setIsCopied(true))
        .catch(() => setIsCopied(false));
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      setIsCopied(false);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 3000);
      return () => clearTimeout(timeout); // Cleanup if component unmounts
    }
  }, [isCopied]);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        className="group relative flex items-center gap-2 overflow-hidden"
        variant="outline"
      >
        <Wand2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
        <span>Open Editor</span>
        <span className="absolute right-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 translate-x-2">
          <ChevronRight className="h-4 w-4" />
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <Wand2 className="h-5 w-5 text-primary" />
              Prompt Editor
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Design your prompt template with variables and preview the
              results.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-[1.5fr,1fr] gap-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="systemMessage"
                    className="text-sm font-medium"
                  >
                    System Message
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    Set behavior and context
                  </span>
                </div>
                <Textarea
                  id="systemMessage"
                  className="font-mono resize-none min-h-[100px]"
                  value={systemMessage}
                  onChange={(e) => setSystemMessage(e.target.value)}
                  placeholder="You are a helpful assistant..."
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="humanMessage" className="text-sm font-medium">
                    Human Message
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    Use ${"{variable}"} for dynamic values
                  </span>
                </div>
                <Textarea
                  id="humanMessage"
                  className="font-mono resize-none min-h-[120px]"
                  value={humanMessage}
                  onChange={(e) => setHumanMessage(e.target.value)}
                  placeholder="Write a ${type} about ${topic}..."
                  rows={4}
                />
                <div className="rounded-lg border bg-muted/50 p-3">
                  <HighlightedMessage text={humanMessage} />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  Preview
                  <span className="text-xs text-muted-foreground font-normal">
                    (with variables substituted)
                  </span>
                </Label>
                <div className="rounded-lg border bg-muted/50 p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {preview || "Preview will appear here..."}
                  </pre>
                </div>
              </div>
            </div>

            <div className="border-l pl-8 space-y-6">
              <div className="flex items-center gap-2 pb-2">
                <Variable className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-sm">Template Variables</h3>
              </div>

              {Object.keys(variables).length === 0 ? (
                <Alert variant="default" className="bg-muted/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm text-muted-foreground">
                    No variables detected. Add variables using ${"{name}"}{" "}
                    syntax in your message.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid gap-4">
                  {Object.entries(variables).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label
                        htmlFor={`var-${key}`}
                        className="text-sm flex items-center gap-2"
                      >
                        <span className="font-mono text-primary">{key}:</span>
                      </Label>
                      <Input
                        id={`var-${key}`}
                        value={value}
                        onChange={(e) =>
                          setVariables((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        className="font-mono"
                        placeholder={`Value for ${key}...`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Separator className="my-2" />

          <DialogFooter className="gap-3">
            <div className="flex-1 flex gap-2">
              <Button
                disabled={isCopied}
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy JSON
                  </>
                )}
              </Button>
            </div>
            <Button
              disabled={onSave.isPending || isSaving}
              onClick={handleSubmit}
              variant="default"
            >
              <FileIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PromptEditor;
