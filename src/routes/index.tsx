import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Arab GPT
        </h1>
        <p className="text-lg text-muted-foreground">
          Your AI-powered chat assistant. Start a conversation and get intelligent responses instantly.
        </p>
        <div className="pt-4">
          <Link to="/chat">
            <Button size="lg" className="gap-2">
              <MessageSquare className="h-5 w-5" />
              Start Chatting
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
