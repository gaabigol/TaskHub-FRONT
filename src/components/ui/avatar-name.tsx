import { cn } from '@/lib/utils'

interface AvatarNameProps {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  initials?: string
}

export function AvatarName({ name, className, size = 'md', initials }: AvatarNameProps) {
  // Generate initials if not provided
  const derivedInitials =
    initials ||
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  }

  return (
    <div
      className={cn(
        'rounded-full bg-primary flex items-center justify-center text-white font-medium',
        sizeClasses[size],
        className
      )}
    >
      {derivedInitials}
    </div>
  )
}
