import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, notFound, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn, a as getRequestHeaders } from "../server.js";
import { json } from "@tanstack/router-core/ssr/client";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
const createMiddleware = (options, __opts) => {
  const resolvedOptions = {
    type: "request",
    ...__opts || options
  };
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { middleware })
      );
    },
    inputValidator: (inputValidator) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { inputValidator })
      );
    },
    client: (client) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { client })
      );
    },
    server: (server) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { server })
      );
    }
  };
};
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
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
            router2.invalidate();
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
const appCss = "/assets/app-D0xpWrhc.css";
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const Route$j = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `
      })
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
    ],
    scripts: [
      {
        src: "/customScript.js",
        type: "text/javascript"
      }
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
      /* @__PURE__ */ jsxs("div", { className: "p-2 flex gap-2 text-lg", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            activeProps: {
              className: "font-bold"
            },
            activeOptions: { exact: true },
            children: "Home"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/posts",
            activeProps: {
              className: "font-bold"
            },
            children: "Posts"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/users",
            activeProps: {
              className: "font-bold"
            },
            children: "Users"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/route-a",
            activeProps: {
              className: "font-bold"
            },
            children: "Pathless Layout"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/deferred",
            activeProps: {
              className: "font-bold"
            },
            children: "Deferred"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/this-route-does-not-exist",
            activeProps: {
              className: "font-bold"
            },
            children: "This Route Does Not Exist"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      children,
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$d = () => import("./users-WSMaB3JD.js");
const Route$i = createFileRoute("/users")({
  loader: async () => {
    const res = await fetch("/api/users");
    if (!res.ok) {
      throw new Error("Unexpected status code");
    }
    const data = await res.json();
    return data;
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const Route$h = createFileRoute("/redirect")({
  beforeLoad: () => {
    throw redirect({
      to: "/posts"
    });
  }
});
const createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const fetchPost_createServerFn_handler = createSsrRpc("0029094260fc8f554fa3ac223696de0e9591567ec6420250e896c91244c812c5");
const fetchPost = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(fetchPost_createServerFn_handler, async ({
  data,
  context
}) => {
  console.log("Request context:", context);
  console.info(`Fetching post with id ${data}...`);
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${data}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw notFound();
    }
    throw new Error("Failed to fetch post");
  }
  const post = await res.json();
  return post;
});
const fetchPosts_createServerFn_handler = createSsrRpc("cbb8ca69048418e62742f2c511faa56326b80ace384144a35bb3e0bf5e8124be");
const fetchPosts = createServerFn().handler(fetchPosts_createServerFn_handler, async () => {
  console.info("Fetching posts...");
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await res.json();
  return posts.slice(0, 10);
});
const $$splitComponentImporter$c = () => import("./posts-F28yEcdg.js");
const Route$g = createFileRoute("/posts")({
  loader: async () => fetchPosts(),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./deferred-BLez4F1b.js");
const personServerFn_createServerFn_handler = createSsrRpc("f76e8f8721c12c8547a3ced6a10916f5b5076c1a10dcbeaa607360ce419d0a48");
const personServerFn = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(personServerFn_createServerFn_handler, ({
  data: name
}) => {
  return {
    name,
    randomNumber: Math.floor(Math.random() * 100)
  };
});
const slowServerFn_createServerFn_handler = createSsrRpc("fc3988c64f434639dfd4eab3f926b87ee39cc0c14f65b4d0e852c7fd73279a3b");
const slowServerFn = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(slowServerFn_createServerFn_handler, async ({
  data: name
}) => {
  await new Promise((r) => setTimeout(r, 1e3));
  return {
    name,
    randomNumber: Math.floor(Math.random() * 100)
  };
});
const Route$f = createFileRoute("/deferred")({
  loader: async () => {
    return {
      deferredStuff: new Promise((r) => setTimeout(() => r("Hello deferred!"), 2e3)),
      deferredPerson: slowServerFn({
        data: "Tanner Linsley"
      }),
      person: await personServerFn({
        data: "John Doe"
      })
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const Route$e = createFileRoute("/customScript.js")({
  server: {
    handlers: {
      GET: () => {
        return new Response('console.log("Hello from customScript.js!")', {
          headers: {
            "Content-Type": "application/javascript"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$a = () => import("./chat-BJLCFOpG.js");
const Route$d = createFileRoute("/chat")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./_pathlessLayout-BhrcpZGS.js");
const Route$c = createFileRoute("/_pathlessLayout")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./index-Cr1x8k2Q.js");
const Route$b = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./users.index-Bef-9o5f.js");
const Route$a = createFileRoute("/users/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./posts.index-DU8oxB5n.js");
const Route$9 = createFileRoute("/posts/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitNotFoundComponentImporter$1 = () => import("./users._userId-ByCGGDX3.js");
const $$splitComponentImporter$5 = () => import("./users._userId-BRxey1WK.js");
const $$splitErrorComponentImporter$2 = () => import("./users._userId-CG2IqJzb.js");
const Route$8 = createFileRoute("/users/$userId")({
  loader: async ({
    params: {
      userId
    }
  }) => {
    try {
      const res = await fetch("/api/users/" + userId);
      if (!res.ok) {
        throw new Error("Unexpected status code");
      }
      const data = await res.json();
      return data;
    } catch {
      throw new Error("Failed to fetch user");
    }
  },
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
const $$splitNotFoundComponentImporter = () => import("./posts._postId-BQJblE3a.js");
const $$splitComponentImporter$4 = () => import("./posts._postId-CUsYms8n.js");
const $$splitErrorComponentImporter$1 = () => import("./posts._postId-C9z5TBp-.js");
const Route$7 = createFileRoute("/posts/$postId")({
  loader: ({
    params: {
      postId
    }
  }) => fetchPost({
    data: postId
  }),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const userLoggerMiddleware = createMiddleware().server(async ({
  next
}) => {
  console.info("In: /users");
  console.info("Request Headers:", getRequestHeaders());
  const result = await next();
  result.response.headers.set("x-users", "true");
  console.info("Out: /users");
  return result;
});
const testParentMiddleware = createMiddleware().server(async ({
  next
}) => {
  console.info("In: testParentMiddleware");
  const result = await next();
  result.response.headers.set("x-test-parent", "true");
  console.info("Out: testParentMiddleware");
  return result;
});
const testMiddleware = createMiddleware().middleware([testParentMiddleware]).server(async ({
  next
}) => {
  console.info("In: testMiddleware");
  const result = await next();
  result.response.headers.set("x-test", "true");
  console.info("Out: testMiddleware");
  return result;
});
const Route$6 = createFileRoute("/api/users")({
  server: {
    middleware: [testMiddleware, userLoggerMiddleware],
    handlers: {
      GET: async ({
        request
      }) => {
        console.info("GET /api/users @", request.url);
        console.info("Fetching users... @", request.url);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        const list = data.slice(0, 10);
        return json(list.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email
        })));
      }
    }
  }
});
const Route$5 = createFileRoute("/api/chat")({
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
const $$splitComponentImporter$3 = () => import("./_nested-layout-BocDAsiI.js");
const Route$4 = createFileRoute("/_pathlessLayout/_nested-layout")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./posts_._postId.deep-Dqp1M3IX.js");
const $$splitErrorComponentImporter = () => import("./posts_._postId.deep-C9z5TBp-.js");
const Route$3 = createFileRoute("/posts_/$postId/deep")({
  loader: async ({
    params: {
      postId
    }
  }) => fetchPost({
    data: postId
  }),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const Route$2 = createFileRoute("/api/users/$userId")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        console.info(`Fetching users by id=${params.userId}... @`, request.url);
        try {
          const res = await fetch(
            "https://jsonplaceholder.typicode.com/users/" + params.userId
          );
          if (!res.ok) {
            throw new Error("Failed to fetch user");
          }
          const user = await res.json();
          return json({
            id: user.id,
            name: user.name,
            email: user.email
          });
        } catch (e) {
          console.error(e);
          return json({ error: "User not found" }, { status: 404 });
        }
      }
    }
  }
});
const $$splitComponentImporter$1 = () => import("./route-b-CsHX6n6-.js");
const Route$1 = createFileRoute("/_pathlessLayout/_nested-layout/route-b")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./route-a-xd-e2Wm0.js");
const Route = createFileRoute("/_pathlessLayout/_nested-layout/route-a")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const UsersRoute = Route$i.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => Route$j
});
const RedirectRoute = Route$h.update({
  id: "/redirect",
  path: "/redirect",
  getParentRoute: () => Route$j
});
const PostsRoute = Route$g.update({
  id: "/posts",
  path: "/posts",
  getParentRoute: () => Route$j
});
const DeferredRoute = Route$f.update({
  id: "/deferred",
  path: "/deferred",
  getParentRoute: () => Route$j
});
const CustomScriptDotjsRoute = Route$e.update({
  id: "/customScript.js",
  path: "/customScript.js",
  getParentRoute: () => Route$j
});
const ChatRoute = Route$d.update({
  id: "/chat",
  path: "/chat",
  getParentRoute: () => Route$j
});
const PathlessLayoutRoute = Route$c.update({
  id: "/_pathlessLayout",
  getParentRoute: () => Route$j
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$j
});
const UsersIndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => UsersRoute
});
const PostsIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => PostsRoute
});
const UsersUserIdRoute = Route$8.update({
  id: "/$userId",
  path: "/$userId",
  getParentRoute: () => UsersRoute
});
const PostsPostIdRoute = Route$7.update({
  id: "/$postId",
  path: "/$postId",
  getParentRoute: () => PostsRoute
});
const ApiUsersRoute = Route$6.update({
  id: "/api/users",
  path: "/api/users",
  getParentRoute: () => Route$j
});
const ApiChatRoute = Route$5.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$j
});
const PathlessLayoutNestedLayoutRoute = Route$4.update({
  id: "/_nested-layout",
  getParentRoute: () => PathlessLayoutRoute
});
const PostsPostIdDeepRoute = Route$3.update({
  id: "/posts_/$postId/deep",
  path: "/posts/$postId/deep",
  getParentRoute: () => Route$j
});
const ApiUsersUserIdRoute = Route$2.update({
  id: "/$userId",
  path: "/$userId",
  getParentRoute: () => ApiUsersRoute
});
const PathlessLayoutNestedLayoutRouteBRoute = Route$1.update({
  id: "/route-b",
  path: "/route-b",
  getParentRoute: () => PathlessLayoutNestedLayoutRoute
});
const PathlessLayoutNestedLayoutRouteARoute = Route.update({
  id: "/route-a",
  path: "/route-a",
  getParentRoute: () => PathlessLayoutNestedLayoutRoute
});
const PathlessLayoutNestedLayoutRouteChildren = {
  PathlessLayoutNestedLayoutRouteARoute,
  PathlessLayoutNestedLayoutRouteBRoute
};
const PathlessLayoutNestedLayoutRouteWithChildren = PathlessLayoutNestedLayoutRoute._addFileChildren(
  PathlessLayoutNestedLayoutRouteChildren
);
const PathlessLayoutRouteChildren = {
  PathlessLayoutNestedLayoutRoute: PathlessLayoutNestedLayoutRouteWithChildren
};
const PathlessLayoutRouteWithChildren = PathlessLayoutRoute._addFileChildren(
  PathlessLayoutRouteChildren
);
const PostsRouteChildren = {
  PostsPostIdRoute,
  PostsIndexRoute
};
const PostsRouteWithChildren = PostsRoute._addFileChildren(PostsRouteChildren);
const UsersRouteChildren = {
  UsersUserIdRoute,
  UsersIndexRoute
};
const UsersRouteWithChildren = UsersRoute._addFileChildren(UsersRouteChildren);
const ApiUsersRouteChildren = {
  ApiUsersUserIdRoute
};
const ApiUsersRouteWithChildren = ApiUsersRoute._addFileChildren(
  ApiUsersRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  PathlessLayoutRoute: PathlessLayoutRouteWithChildren,
  ChatRoute,
  CustomScriptDotjsRoute,
  DeferredRoute,
  PostsRoute: PostsRouteWithChildren,
  RedirectRoute,
  UsersRoute: UsersRouteWithChildren,
  ApiChatRoute,
  ApiUsersRoute: ApiUsersRouteWithChildren,
  PostsPostIdDeepRoute
};
const routeTree = Route$j._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  NotFound as N,
  Route$i as R,
  Route$g as a,
  Route$f as b,
  Route$8 as c,
  Route$7 as d,
  Route$3 as e,
  router as r
};
