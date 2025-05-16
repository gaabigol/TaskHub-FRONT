import { Fragment, ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function SummaryCard({
  title,
  value,
  icon,
  color,
  progress,
  progressLabel,
  lastUpdated
}: {
  title: string
  value: number
  icon: ReactNode
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'
  progress?: number
  progressLabel?: string
  lastUpdated?: string
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive'
  }

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>{icon}</div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-foreground-light">{title}</h3>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        </div>

        <div className="mt-4">
          {progress !== undefined && (
            <Fragment>
              <Progress value={progress} className="h-2 mb-1" />
              <p className="text-xs text-foreground-light">{progressLabel}</p>
            </Fragment>
          )}
          {lastUpdated && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground-light">Última atualização:</span>
              <span className="text-foreground">{lastUpdated}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
