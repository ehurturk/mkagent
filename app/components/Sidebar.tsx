"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const routes = [
  {
    href: "",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];

function DesktopSidebar() {
  const pathname = usePathname();

  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div className="hidden md:flex flex-col h-screen w-[280px] bg-gray-900 text-gray-300 border-r border-gray-700">
      {/* Logo Section */}
      <div className="flex items-center justify-center p-6 border-b border-gray-700">
        <div className="flex items-center">
          <Brain className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-2xl font-bold text-white">mkagent</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col mt-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={`/${route.href}`}
            className={`flex items-center gap-4 p-3 mx-4 rounded-md transition-colors 
              ${
                activeRoute.href === route.href
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800 text-gray-400"
              }`}
          >
            <route.icon
              size={20}
              className={
                activeRoute.href === route.href ? "text-white" : "text-gray-500"
              }
            />
            <span className="font-medium">{route.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div className="flex md:hidden">
      {/* Changed to flex and simplified classes */}
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative z-50" // Added z-index
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] p-4 bg-gray-900 text-gray-300 border-r border-gray-700"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center group">
              <Brain className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                mkagent
              </span>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col mt-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={`/${route.href}`}
                className={`flex items-center gap-4 p-3 mx-4 rounded-md transition-colors 
              ${
                activeRoute.href === route.href
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800 text-gray-400"
              }`}
              >
                <route.icon
                  size={20}
                  className={
                    activeRoute.href === route.href
                      ? "text-white"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">{route.label}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default DesktopSidebar;
