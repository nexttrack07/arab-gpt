import { jsx, jsxs } from "react/jsx-runtime";
import { useChat } from "@ai-sdk/react";
import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { c as cn, B as Button } from "./button-DX5axzHM.js";
import { User, Bot, Send } from "lucide-react";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("relative overflow-auto", className),
    ...props,
    children
  }
));
ScrollArea.displayName = "ScrollArea";
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = "Avatar";
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "img",
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = "AvatarImage";
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = "AvatarFallback";
function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const getMessageContent = () => {
    if ("content" in message && typeof message.content === "string") {
      return message.content;
    }
    if ("parts" in message && Array.isArray(message.parts)) {
      return message.parts.filter((part) => part.type === "text").map((part) => part.text).join("");
    }
    return "";
  };
  const content = getMessageContent();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex gap-3 p-4 rounded-lg",
        isUser ? "bg-muted/50" : "bg-background"
      ),
      children: [
        /* @__PURE__ */ jsx(Avatar, { className: "h-8 w-8 mt-1", children: /* @__PURE__ */ jsx(AvatarFallback, { className: isUser ? "bg-primary text-primary-foreground" : "bg-secondary", children: isUser ? /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm", children: isUser ? "You" : "Arab GPT" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm whitespace-pre-wrap leading-relaxed", children: content })
        ] })
      ]
    }
  );
}
function ChatMessages({ messages }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  return /* @__PURE__ */ jsx(ScrollArea, { ref: scrollRef, className: "flex-1 p-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-4 max-w-3xl mx-auto", children: messages.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center py-12", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-2", children: "Welcome to Arab GPT" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Start a conversation by typing a message below" })
  ] }) : messages.map((message) => /* @__PURE__ */ jsx(
    ChatMessage,
    {
      message
    },
    message.id
  )) }) });
}
const quickActions = [
  {
    id: "translate-to-arabic",
    label: "Translate to Arabic",
    icon: "🔤",
    prompt: `Translate this word (or sentence) to arabic. Do not translate literally and use expressions and language used by arabs today. However, it should be modern standard arabic. Also give at least 3 different variations if the input is a sentence.`
  }
  // Add more quick actions below:
  // {
  //   id: 'explain-simple',
  //   label: 'Explain Simply',
  //   icon: '💡',
  //   prompt: 'Explain this concept in simple terms:\n\n"{input}"',
  // },
  // {
  //   id: 'grammar-check',
  //   label: 'Check Grammar',
  //   icon: '✍️',
  //   prompt: 'Check the grammar and suggest improvements:\n\n"{input}"',
  // },
];
function QuickActions({ onSelectAction, disabled }) {
  return /* @__PURE__ */ jsx("div", { className: "px-4 py-2 border-t bg-background/50", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: quickActions.map((action) => /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "outline",
      size: "sm",
      onClick: () => onSelectAction(action.prompt),
      disabled,
      className: "whitespace-nowrap",
      children: [
        action.icon && /* @__PURE__ */ jsx("span", { className: "mr-1", children: action.icon }),
        action.label
      ]
    },
    action.id
  )) }) });
}
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
function ChatPage() {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const {
    messages,
    sendMessage,
    status,
    error
  } = useChat();
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim() || status === "streaming" || status === "submitted") return;
    const userMessage = input;
    setInput("");
    await sendMessage({
      text: userMessage
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleQuickAction = (promptTemplate) => {
    const existingContent = input;
    const separator = existingContent ? "\n\n" : "";
    const placeholderIndex = promptTemplate.indexOf("{input}");
    if (placeholderIndex !== -1) {
      const textBeforePlaceholder = promptTemplate.slice(0, placeholderIndex);
      const textAfterPlaceholder = promptTemplate.slice(placeholderIndex + 7);
      const newContent = existingContent + separator + textBeforePlaceholder + textAfterPlaceholder;
      setInput(newContent);
      const cursorPosition = existingContent.length + separator.length + placeholderIndex;
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
      }, 0);
    } else {
      setInput(existingContent + separator + promptTemplate);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-screen max-h-screen", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60", children: /* @__PURE__ */ jsx("div", { className: "flex h-14 items-center px-4", children: /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold", children: "Arab GPT" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-hidden flex flex-col", children: [
      error && /* @__PURE__ */ jsxs("div", { className: "bg-destructive/15 text-destructive px-4 py-2 text-sm", children: [
        "Error: ",
        error.message
      ] }),
      /* @__PURE__ */ jsx(ChatMessages, { messages }),
      /* @__PURE__ */ jsx(QuickActions, { onSelectAction: handleQuickAction, disabled: status === "streaming" || status === "submitted" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2 p-4 border-t bg-background", children: [
        /* @__PURE__ */ jsx(Textarea, { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, placeholder: "Type your message... (Shift+Enter for new line)", disabled: status === "streaming" || status === "submitted", className: "flex-1 min-h-[60px] max-h-[200px]", autoFocus: true }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: !input.trim() || status === "streaming" || status === "submitted", size: "icon", className: "self-end", children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }) })
      ] })
    ] })
  ] });
}
export {
  ChatPage as component
};
