import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/auth')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { password } = await request.json()
          const correctPassword = process.env.PASSWORD || 'admin'
          
          if (password === correctPassword) {
            return new Response(
              JSON.stringify({ success: true }),
              { 
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              }
            )
          }
          
          return new Response(
            JSON.stringify({ success: false, error: 'Incorrect password' }),
            { 
              status: 401,
              headers: { 'Content-Type': 'application/json' }
            }
          )
        } catch (error) {
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to verify password' }),
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
