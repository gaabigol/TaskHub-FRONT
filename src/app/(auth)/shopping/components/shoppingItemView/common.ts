import { TUnit } from '@/service/shoppingItem/type'

export function URLParams(
  name?: string,
  purchased?: boolean,
  unit?: TUnit,
  category?: string
): string {
  const params = new URLSearchParams()

  if (name != undefined && name !== '') {
    params.append('name', name)
  }

  if (purchased != undefined) {
    params.append('purchased', purchased.toString())
  }
  if (unit != undefined) {
    params.append('unit', unit)
  }

  if (category && category !== 'ALL') {
    params.append('category', category)
  }

  return params.toString() ? `?${params.toString()}` : ''
}
