# Arab GPT

A modern AI-powered chat application built with TanStack Start, shadcn-ui, and Vercel AI SDK.

## Features

- 🤖 AI-powered chat using OpenAI GPT models
- 🎨 Beautiful UI with shadcn-ui components
- ⚡ Real-time streaming responses
- 🌓 Dark mode support
- 📱 Responsive design
- 🔄 Built with TanStack Start for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

Create a `.env` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

You can also copy from the example file:

```bash
cp env-example.txt .env
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start)
- **UI Components**: [shadcn-ui](https://ui.shadcn.com/)
- **AI Integration**: [AI SDK v5](https://ai-sdk.dev/) with `@ai-sdk/react`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Important Notes

- This project uses AI SDK v5 with the `@ai-sdk/react` package for the React UI hooks
- The `useChat` hook is imported from `@ai-sdk/react` 
- The API uses the new `sendMessage` method instead of the older `handleSubmit` pattern
- AI responses are streamed in real-time using the `streamText` function from AI SDK Core

## Project Structure

```
arab-gpt/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn-ui components
│   │   ├── ChatMessage.tsx  # Individual message component
│   │   ├── ChatMessages.tsx # Message list container
│   │   └── ChatInput.tsx    # Chat input component (optional)
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── routes/
│   │   ├── api/
│   │   │   └── chat.ts      # AI chat API endpoint
│   │   ├── chat.tsx         # Main chat page
│   │   └── index.tsx        # Landing page
│   └── styles/
│       └── app.css          # Global styles
├── public/                  # Static assets
└── package.json
```

## Customization

### Changing the AI Model

Edit `src/routes/api/chat.ts` and change the model:

```typescript
const result = streamText({
  model: openai('gpt-4'), // Change to your preferred model
  messages,
})
```

### Using a Different AI Provider

The Vercel AI SDK supports multiple providers. To use Anthropic Claude for example:

1. Install the package:

```bash
npm install @ai-sdk/anthropic
```

2. Update `src/routes/api/chat.ts`:

```typescript
import { anthropic } from '@ai-sdk/anthropic'

// ...

const result = streamText({
  model: anthropic('claude-3-5-sonnet-20241022'),
  messages,
})
```

3. Update your `.env`:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Styling

The app uses shadcn-ui's theming system. You can customize colors in `src/styles/app.css` by modifying the CSS variables.

## License

MIT
