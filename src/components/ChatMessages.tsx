import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./ChatMessage"
import type { UIMessage } from "ai"

interface ChatMessagesProps {
  messages: UIMessage[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ScrollArea ref={scrollRef} className="flex-1 p-3 sm:p-4">
      <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 sm:py-12 px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome to Arab GPT</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Start a conversation by typing a message below
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))
        )}
      </div>
    </ScrollArea>
  )
}

