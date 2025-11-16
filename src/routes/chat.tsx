import { createFileRoute } from '@tanstack/react-router'
import { useChat } from '@ai-sdk/react'
import { ChatMessages } from '@/components/ChatMessages'
import { QuickActions } from '@/components/QuickActions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useState, FormEvent, useRef, KeyboardEvent } from 'react'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

function ChatPage() {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { messages, sendMessage, status, error } = useChat({
    api: '/api/chat',
  })

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || status === 'loading') return
    
    const userMessage = input
    setInput('')
    
    await sendMessage({
      content: userMessage,
      role: 'user',
    })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
    // Allow Shift+Enter for new lines (default textarea behavior)
  }

  const handleQuickAction = (promptTemplate: string) => {
    // Get existing content
    const existingContent = input
    const separator = existingContent ? '\n\n' : '' // Add spacing if there's existing content
    
    // Find the {input} placeholder and position cursor there
    const placeholderIndex = promptTemplate.indexOf('{input}')
    
    if (placeholderIndex !== -1) {
      // Remove the {input} placeholder
      const textBeforePlaceholder = promptTemplate.slice(0, placeholderIndex)
      const textAfterPlaceholder = promptTemplate.slice(placeholderIndex + 7) // 7 is length of '{input}'
      
      const newContent = existingContent + separator + textBeforePlaceholder + textAfterPlaceholder
      setInput(newContent)
      
      // Calculate cursor position (existing content + separator + position of placeholder)
      const cursorPosition = existingContent.length + separator.length + placeholderIndex
      
      // Focus the input and set cursor position after a brief delay to ensure state updates
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition)
        }
      }, 0)
    } else {
      // No placeholder, just append the template
      setInput(existingContent + separator + promptTemplate)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
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

        {/* Quick Actions */}
        <QuickActions 
          onSelectAction={handleQuickAction}
          disabled={status === 'loading'}
        />

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-background">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Shift+Enter for new line)"
            disabled={status === 'loading'}
            className="flex-1 min-h-[60px] max-h-[200px]"
            autoFocus
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || status === 'loading'}
            size="icon"
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

