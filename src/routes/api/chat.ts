import { createFileRoute } from '@tanstack/react-router'
import { openai } from '@ai-sdk/openai'
import { streamText, convertToModelMessages } from 'ai'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const { messages } = body

          // Check for OpenAI API key
          if (!process.env.OPENAI_API_KEY) {
            return new Response(
              JSON.stringify({ 
                error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file.' 
              }),
              { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              }
            )
          }

          // Convert UIMessages to CoreMessages using the official helper
          const modelMessages = convertToModelMessages(messages)

          // Stream the response from OpenAI
          const result = streamText({
            model: openai('gpt-4o-mini'),
            messages: modelMessages,
          })

          // Return the streaming response in UIMessage format
          return result.toUIMessageStreamResponse()
        } catch (error) {
          console.error('Error in chat API:', error)
          return new Response(
            JSON.stringify({ 
              error: 'Internal server error',
              details: error instanceof Error ? error.message : 'Unknown error'
            }),
            { 
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          )
        }
      },
    },
  },
})

