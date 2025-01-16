"use client";

import { ParamProps } from "@/app/workflow/types/appNode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId, useState } from "react";

function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
  const [ival, setIval] = useState(value);
  const id = useId();
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Input
        id={id}
        value={ival}
        placeholder="Enter value here"
        onChange={(e) => setIval(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />
    </div>
  );
}

export default StringParam;
