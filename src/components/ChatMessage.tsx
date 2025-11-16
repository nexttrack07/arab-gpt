import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"
import type { UIMessage } from "ai"

interface ChatMessageProps {
  message: UIMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  // Extract content from UIMessage
  // User messages have 'content' property directly
  // Assistant messages have 'parts' array with text parts
  const getMessageContent = () => {
    if ('content' in message && typeof message.content === 'string') {
      return message.content
    }
    
    if ('parts' in message && Array.isArray(message.parts)) {
      return message.parts
        .filter((part: any) => part.type === 'text')
        .map((part: any) => part.text)
        .join('')
    }
    
    return ''
  }

  const content = getMessageContent()

  return (
    <div
      className={cn(
        "flex gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg",
        isUser ? "bg-muted/50" : "bg-background"
      )}
    >
      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 mt-1 shrink-0">
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground" : "bg-secondary"}>
          {isUser ? <User className="h-3 w-3 sm:h-4 sm:w-4" /> : <Bot className="h-3 w-3 sm:h-4 sm:w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
        <div className="font-semibold text-xs sm:text-sm">
          {isUser ? "You" : "Arab GPT"}
        </div>
        <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed wrap-break-word">
          {content}
        </div>
      </div>
    </div>
  )
}

