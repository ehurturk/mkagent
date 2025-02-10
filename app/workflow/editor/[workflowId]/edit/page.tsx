// app/workflow/editor/[workflowId]/edit/page.tsx
"use client";

import {ThemeWrapper} from "@/app/components/ThemeWrapper";
import Editor from "@/app/workflow/_components/Editor";
import {useWorkflow} from "@/app/workflow/_components/WorkflowContext";
import {useEffect} from "react";

function Page() {
    const workflow = useWorkflow();

    useEffect(() => {
        console.log(workflow);
    }, [workflow]);

    return (
        <ThemeWrapper>
            <Editor workflow={workflow}/>
        </ThemeWrapper>
    );
}

export default Page;