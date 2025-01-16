"use client";

import { MobileSidebar } from "@/app/components/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

function BreadcrumbHeader() {
  const pathName = usePathname();
  const paths = pathName === "/" ? [""] : pathName?.split("/").filter(Boolean);

  // Build cumulative paths for correct navigation
  const getBreadcrumbPath = (index: number) => {
    return `/${paths.slice(0, index + 1).join("/")}`;
  };

  return (
      <div className="flex items-center justify-between w-full px-4 py-2">
        <div className="flex items-center gap-2">
          <MobileSidebar />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-primary">
                  home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {paths.length > 0 && paths[0] !== "" && (
                  <>
                    <BreadcrumbSeparator />
                    {paths.map((path, index) => (
                        <React.Fragment key={index}>
                          <BreadcrumbItem>
                            <BreadcrumbLink
                                href={getBreadcrumbPath(index)}
                                className="capitalize hover:text-primary"
                            >
                              {path.replace(/-/g, " ")}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          {index !== paths.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                  </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
  );
}

export default BreadcrumbHeader;