export function URLParams(
  showCompleted: boolean,
  priorityFilter: string,
  searchTerm: string
): string {
  const params = new URLSearchParams()

  if (showCompleted !== undefined) {
    params.append('completed', showCompleted.toString())
  }

  if (priorityFilter !== 'ALL') {
    params.append('priority', priorityFilter)
  }

  if (searchTerm) {
    params.append('title', searchTerm)
  }

  return params.toString() ? `?${params.toString()}` : ''
}
