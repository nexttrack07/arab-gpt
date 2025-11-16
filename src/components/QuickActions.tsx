import { Button } from '@/components/ui/button'
import { quickActions } from '@/config/quickActions'

interface QuickActionsProps {
  onSelectAction: (promptTemplate: string) => void
  disabled?: boolean
}

export function QuickActions({ onSelectAction, disabled }: QuickActionsProps) {
  return (
    <div className="px-4 py-2 border-t bg-background/50">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onSelectAction(action.prompt)}
            disabled={disabled}
            className="whitespace-nowrap"
          >
            {action.icon && <span className="mr-1">{action.icon}</span>}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

