"use client";

import { ParamProps } from "@/app/workflow/types/appNode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useId, useState } from "react";
import { MessageCircleQuestionIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function StringParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const [ival, setIval] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  useEffect(() => {
    setIval(value || "");
  }, [value]);

  return (
    <div className="space-y-2 p-2 w-full group transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label
            htmlFor={id}
            className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors"
          >
            {param.name}
          </Label>
          {param.required && (
            <span className="text-destructive text-xs">*</span>
          )}
          {param.description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger type="button">
                  <MessageCircleQuestionIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{param.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div className="relative">
        <Input
          id={id}
          value={ival}
          disabled={disabled}
          placeholder={`Enter ${param.name.toLowerCase()}...`}
          onChange={(e) => setIval(e.target.value)}
          onBlur={(e) => {
            setIsFocused(false);
            updateNodeParamValue.mutateAsync(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          className={`
            bg-background/50 
            transition-all 
            duration-200
            border-border/50
            focus:border-primary/50
            ${isFocused ? "shadow-sm shadow-primary/25" : ""}
            ${!ival && "text-muted-foreground/60"}
          `}
        />
        <div
          className={`
            absolute 
            bottom-0 
            left-0 
            right-0 
            h-[2px] 
            bg-gradient-to-r 
            from-primary/0 
            via-primary/50 
            to-primary/0 
            transition-opacity 
            duration-200
            ${isFocused ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>

      {param.hint && (
        <p className="text-xs text-muted-foreground mt-1">{param.hint}</p>
      )}
    </div>
  );
}

export default StringParam;
