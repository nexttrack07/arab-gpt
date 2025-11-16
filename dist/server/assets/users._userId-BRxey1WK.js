import { jsxs, jsx } from "react/jsx-runtime";
import { c as Route } from "./router-Bh9cJtAG.js";
import "@tanstack/react-router";
import "@tanstack/react-router-devtools";
import "../server.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "@ai-sdk/openai";
import "ai";
function UserComponent() {
  const user = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold underline", children: user.name }),
    /* @__PURE__ */ jsx("div", { className: "text-sm", children: user.email }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: `/api/users/${user.id}`, className: "text-blue-800 hover:text-blue-600 underline", children: "View as JSON" }) })
  ] });
}
export {
  UserComponent as component
};
