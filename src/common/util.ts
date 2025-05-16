import { format, formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'dd MMM', { locale: ptBR })
}

export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'HH:mm')
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'dd MMM, HH:mm', { locale: ptBR })
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistance(dateObj, new Date(), {
    addSuffix: true,
    locale: ptBR
  })
}

export function dateNow():string {
  return format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR
  })
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    case 'medium':
      return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/20'
    case 'low':
      return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20'
  }
}

export function getPriorityLabel(priority: string): string {
  switch (priority) {
    case 'high':
      return 'Alta'
    case 'medium':
      return 'Média'
    case 'low':
      return 'Baixa'
    default:
      return 'Normal'
  }
}

export function getActivityIcon(type: string): string {
  switch (type) {
    case 'create':
      return 'ri-add-line'
    case 'update':
      return 'ri-edit-line'
    case 'delete':
      return 'ri-delete-bin-line'
    case 'complete':
      return 'ri-check-line'
    case 'reopen':
      return 'ri-refresh-line'
    case 'purchase':
      return 'ri-shopping-cart-line'
    default:
      return 'ri-information-line'
  }
}

export function getActivityColor(type: string): string {
  switch (type) {
    case 'create':
      return 'bg-primary/10 text-primary'
    case 'update':
      return 'bg-secondary/10 text-secondary'
    case 'delete':
      return 'bg-destructive/10 text-destructive'
    case 'complete':
      return 'bg-success/10 text-success'
    case 'reopen':
      return 'bg-warning/10 text-warning'
    case 'purchase':
      return 'bg-secondary/10 text-secondary'
    default:
      return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}
