import { Button } from '@/components/ui/button'
import { quickActions } from '@/config/quickActions'

interface QuickActionsProps {
  onSelectAction: (promptTemplate: string) => void
  disabled?: boolean
}

export function QuickActions({ onSelectAction, disabled }: QuickActionsProps) {
  return (
    <div className="px-3 sm:px-4 py-2 border-t bg-background/50 shrink-0">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onSelectAction(action.prompt)}
            disabled={disabled}
            className="whitespace-nowrap text-xs sm:text-sm shrink-0"
          >
            {action.icon && <span className="mr-1 text-sm">{action.icon}</span>}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

