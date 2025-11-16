import { createFileRoute } from '@tanstack/react-router'
import { useChat } from '@ai-sdk/react'
import { ChatMessages } from '@/components/ChatMessages'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { useState, FormEvent } from 'react'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

function ChatPage() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status, error } = useChat({
    api: '/api/chat',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === 'loading') return
    
    const userMessage = input
    setInput('')
    
    await sendMessage({
      content: userMessage,
      role: 'user',
    })
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <h1 className="text-lg font-semibold">Arab GPT</h1>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {error && (
          <div className="bg-destructive/15 text-destructive px-4 py-2 text-sm">
            Error: {error.message}
          </div>
        )}
        
        <ChatMessages messages={messages} />

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-background">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={status === 'loading'}
            className="flex-1"
            autoFocus
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || status === 'loading'}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

