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

export function dateNow(): string {
  return format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR
  })
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'HIGH':
      return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    case 'MEDIUM':
      return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/20'
    case 'LOW':
      return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20'
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

export function buildQuery(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      searchParams.append(key, String(params[key]))
    }
  }
  return `?${searchParams.toString()}`
}

export const SHOPPING_CATEGORIES = {
  GENERAL: 'Geral',
  GROCERY: 'Mercearia',
  FRUITS: 'Frutas',
  VEGETABLES: 'Verduras',
  DAIRY: 'Laticínios',
  BAKERY: 'Padaria',
  MEAT: 'Carnes',
  BEVERAGES: 'Bebidas',
  CLEANING: 'Limpeza',
  HOUSEHOLD: 'Utilidades'
} as const

export type CategoryKey = keyof typeof SHOPPING_CATEGORIES

export function getShoppingCategoryLabel(category: string): string {
  const upperCategory = category.toUpperCase() as CategoryKey
  return SHOPPING_CATEGORIES[upperCategory] || SHOPPING_CATEGORIES.GENERAL
}

export const PRIORITIES = {
  MEDIUM: 'Média',
  HIGH: 'Alta',
  LOW: 'Baixa',
  ALL: 'Todas'
} as const

export type TPriority = keyof typeof PRIORITIES

export function getPriorityLabel(priority: TPriority): string {
  const upperPriority = priority.toUpperCase() as TPriority
  return PRIORITIES[upperPriority] || PRIORITIES.MEDIUM
}

export const CATEGORIES = {
  GENERAL: 'Geral',
  DEVELOPMENT: 'Desenvolvimento',
  DESIGN: 'Design',
  WORK: 'Trabalho',
  SEARCH: 'Pesquisa'
} as const

export type TCategory = keyof typeof CATEGORIES

export function getCategoryLabel(category: TCategory): string {
  const upperCategory = category.toUpperCase() as TCategory
  return CATEGORIES[upperCategory] || CATEGORIES.GENERAL
}
