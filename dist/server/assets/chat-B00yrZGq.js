import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useChat } from "@ai-sdk/react";
import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User, Bot, X, Lock, Send } from "lucide-react";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
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
        "flex gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg",
        isUser ? "bg-muted/50" : "bg-background"
      ),
      children: [
        /* @__PURE__ */ jsx(Avatar, { className: "h-7 w-7 sm:h-8 sm:w-8 mt-1 shrink-0", children: /* @__PURE__ */ jsx(AvatarFallback, { className: isUser ? "bg-primary text-primary-foreground" : "bg-secondary", children: isUser ? /* @__PURE__ */ jsx(User, { className: "h-3 w-3 sm:h-4 sm:w-4" }) : /* @__PURE__ */ jsx(Bot, { className: "h-3 w-3 sm:h-4 sm:w-4" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-1 sm:space-y-2 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-xs sm:text-sm", children: isUser ? "You" : "Arab GPT" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm whitespace-pre-wrap leading-relaxed wrap-break-word", children: content })
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
  return /* @__PURE__ */ jsx(ScrollArea, { ref: scrollRef, className: "flex-1 p-3 sm:p-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-3 sm:space-y-4 max-w-3xl mx-auto", children: messages.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center py-8 sm:py-12 px-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-bold mb-2", children: "Welcome to Arab GPT" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm sm:text-base", children: "Start a conversation by typing a message below" })
  ] }) : messages.map((message) => /* @__PURE__ */ jsx(
    ChatMessage,
    {
      message
    },
    message.id
  )) }) });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
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
  return /* @__PURE__ */ jsx("div", { className: "px-3 sm:px-4 py-2 border-t bg-background/50 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0", children: quickActions.map((action) => /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "outline",
      size: "sm",
      onClick: () => onSelectAction(action.prompt),
      disabled,
      className: "whitespace-nowrap text-xs sm:text-sm shrink-0",
      children: [
        action.icon && /* @__PURE__ */ jsx("span", { className: "mr-1 text-sm", children: action.icon }),
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
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
function ChatPage() {
  const [input, setInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const inputRef = useRef(null);
  const {
    messages,
    sendMessage,
    status,
    error
  } = useChat();
  useEffect(() => {
    const authenticated = sessionStorage.getItem("authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }
  }, []);
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setIsCheckingPassword(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: passwordInput
        })
      });
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem("authenticated", "true");
        setIsAuthenticated(true);
        setPasswordInput("");
      } else {
        setPasswordError("Incorrect password");
      }
    } catch (err) {
      setPasswordError("Failed to verify password");
    } finally {
      setIsCheckingPassword(false);
    }
  };
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Dialog, { open: !isAuthenticated, onOpenChange: () => {
    }, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", onInteractOutside: (e) => e.preventDefault(), onEscapeKeyDown: (e) => e.preventDefault(), children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5" }),
          "Password Required"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Please enter the password to access Arab GPT" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handlePasswordSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Input, { type: "password", placeholder: "Enter password", value: passwordInput, onChange: (e) => setPasswordInput(e.target.value), disabled: isCheckingPassword, autoFocus: true, className: passwordError ? "border-destructive" : "" }),
          passwordError && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: passwordError })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isCheckingPassword || !passwordInput, children: isCheckingPassword ? "Verifying..." : "Unlock" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-screen max-h-screen overflow-hidden", children: [
      /* @__PURE__ */ jsx("header", { className: "border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "flex h-12 sm:h-14 items-center px-3 sm:px-4", children: /* @__PURE__ */ jsx("h1", { className: "text-base sm:text-lg font-semibold", children: "Arab GPT" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-hidden flex flex-col min-h-0", children: [
        error && /* @__PURE__ */ jsxs("div", { className: "bg-destructive/15 text-destructive px-3 sm:px-4 py-2 text-xs sm:text-sm shrink-0", children: [
          "Error: ",
          error.message
        ] }),
        /* @__PURE__ */ jsx(ChatMessages, { messages }),
        /* @__PURE__ */ jsx(QuickActions, { onSelectAction: handleQuickAction, disabled: status === "streaming" || status === "submitted" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2 p-3 sm:p-4 border-t bg-background shrink-0", children: [
          /* @__PURE__ */ jsx(Textarea, { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, placeholder: "Type your message...", disabled: status === "streaming" || status === "submitted", className: "flex-1 min-h-[50px] sm:min-h-[60px] max-h-[150px] sm:max-h-[200px] resize-none text-sm sm:text-base", autoFocus: true }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: !input.trim() || status === "streaming" || status === "submitted", size: "icon", className: "self-end h-[50px] w-[50px] sm:h-10 sm:w-10 shrink-0", children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  ChatPage as component
};
