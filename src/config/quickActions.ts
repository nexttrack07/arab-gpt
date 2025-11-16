/**
 * Quick Action Templates Configuration
 * 
 * Add or modify quick action buttons here.
 * Each action will appear as a button above the chat input.
 * 
 * How to use:
 * - label: The text shown on the button
 * - prompt: The template text. Use {input} as a placeholder where the user's text will go
 * - icon: Optional emoji or icon to display (you can use any emoji)
 */

export interface QuickAction {
  id: string
  label: string
  prompt: string
  icon?: string
}

export const quickActions: QuickAction[] = [
  {
    id: 'translate-to-arabic',
    label: 'Translate to Arabic',
    icon: '🔤',
    prompt: `Translate this word (or sentence) to arabic. Do not translate literally and use expressions and language used by arabs today. However, it should be modern standard arabic. Also give at least 3 different variations if the input is a sentence.`,
  },
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
]

