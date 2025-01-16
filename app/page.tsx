"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Network,
  Code2,
  Wand2,
  ChevronRight,
  Github,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      {/* <LightBeamsBackground /> */}
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20 animate-gradient-xy" />

      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center group">
              <Brain className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                mkagent
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/projects"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md transition-colors"
              >
                Projects
              </Link>
              <Link
                href="https://github.com"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md inline-flex items-center transition-colors"
              >
                <Github className="h-5 w-5 mr-1" />
                GitHub
              </Link>
              <Link href="/workflows" className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <button className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center">
                  Get Started
                  <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-400 focus:outline-none transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isNavOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-text-gradient pb-2">
                Build <code>AI Agents</code> Visually,
              </span>
              <span className="block text-gray-300 mt-2">
                With <code>0</code> Lines of <code>Code</code>.
              </span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-gray-400 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
              Create, configure, and deploy AI agent orchestrations with an
              intuitive drag-and-drop interface. Perfect for developers and
              non-developers alike.
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <Link
                  href="/workflows"
                  className="relative px-8 py-3 bg-black rounded-lg leading-none flex items-center justify-center"
                >
                  Start Building
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            {[
              {
                icon: Network,
                title: "Visual Agent Builder",
                description:
                  "Drag and drop nodes to create complex AI agent workflows. Connect tools, functions, and APIs with ease.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Code2,
                title: "Code Generation",
                description:
                  "Automatically generate Langchain code from your visual workflows. Deploy anywhere with confidence.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Wand2,
                title: "Custom Tools & Functions",
                description:
                  "Create and integrate custom tools, functions, and API calls to extend your agent's capabilities.",
                gradient: "from-cyan-500 to-blue-500",
              },
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative p-6 bg-gray-800 rounded-xl transition-transform group-hover:-translate-y-1">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 blur-3xl" />
        <div className="relative max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Ready to get started?
            </span>
            <span className="block mt-2 text-white">
              Build your first AI agent today.
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Join our community of builders and create powerful AI agents without
            writing a single line of code.
          </p>
          <div className="mt-8 relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
            <Link
              href="/workflows"
              className="relative px-8 py-3 bg-black rounded-lg leading-none flex items-center justify-center"
            >
              Start Building
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 mkagent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
