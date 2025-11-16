import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
function DefaultCatchBoundary({ error }) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error("DefaultCatchBoundary Error:", error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const appCss = "/assets/app-itEsnCeN.css";
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      },
      {
        name: "description",
        content: "Arab GPT - Your AI-powered chat assistant"
      },
      {
        name: "theme-color",
        content: "#ffffff"
      }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" }
    ]
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter = () => import("./chat-B00yrZGq.js");
const Route$3 = createFileRoute("/chat")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route$2 = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/chat" });
  }
});
const Route$1 = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { messages } = body;
          if (!process.env.OPENAI_API_KEY) {
            return new Response(
              JSON.stringify({
                error: "OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file."
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" }
              }
            );
          }
          const modelMessages = convertToModelMessages(messages);
          const result = streamText({
            model: openai("gpt-4o-mini"),
            messages: modelMessages
          });
          return result.toUIMessageStreamResponse();
        } catch (error) {
          console.error("Error in chat API:", error);
          return new Response(
            JSON.stringify({
              error: "Internal server error",
              details: error instanceof Error ? error.message : "Unknown error"
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
      }
    }
  }
});
const Route = createFileRoute("/api/auth")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { password } = await request.json();
          const correctPassword = process.env.PASSWORD || "admin";
          if (password === correctPassword) {
            return new Response(
              JSON.stringify({ success: true }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" }
              }
            );
          }
          return new Response(
            JSON.stringify({ success: false, error: "Incorrect password" }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" }
            }
          );
        } catch (error) {
          return new Response(
            JSON.stringify({ success: false, error: "Failed to verify password" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
      }
    }
  }
});
const ChatRoute = Route$3.update({
  id: "/chat",
  path: "/chat",
  getParentRoute: () => Route$4
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const ApiChatRoute = Route$1.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$4
});
const ApiAuthRoute = Route.update({
  id: "/api/auth",
  path: "/api/auth",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  ChatRoute,
  ApiAuthRoute,
  ApiChatRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
    scrollRestoration: true
  });
  return router;
}
export {
  getRouter
};
