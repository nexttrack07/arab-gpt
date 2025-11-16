import { createFileRoute } from '@tanstack/react-router'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json()

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

        // Stream the response from OpenAI
        const result = streamText({
          model: openai('gpt-4o-mini'),
          messages,
        })

        // Return the streaming response
        return result.toDataStreamResponse()
      },
    },
  },
})

