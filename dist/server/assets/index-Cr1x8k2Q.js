import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { B as Button } from "./button-DX5axzHM.js";
import { MessageSquare } from "lucide-react";
import "react";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function Home() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center min-h-screen p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl text-center space-y-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight sm:text-6xl", children: "Welcome to Arab GPT" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "Your AI-powered chat assistant. Start a conversation and get intelligent responses instantly." }),
    /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(Link, { to: "/chat", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gap-2", children: [
      /* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5" }),
      "Start Chatting"
    ] }) }) })
  ] }) });
}
export {
  Home as component
};
