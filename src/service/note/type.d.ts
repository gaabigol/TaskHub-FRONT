export type TColor = 'BLUE' | 'GREEN' | 'PURPLE' | 'YELLOW' | 'RED'

export type TCreateNoteRequest = {
  title: string
  color: string
  content: string
}

export type TNote = {
  id: number
  title: string
  content: string
  color: TColor
  createdAt: string
  userId: number
}

export type TCreateNoteResponse = {
  success: boolean
  message: string
  data: TNote
}

export type TUpdateNoteRequest = {
  id: number
  title?: string
  color?: string
  content?: string
}

export type TUpdateNoteResponse = {
  success: boolean
  message: string
  data: TNote
}

export type TGetNoteResponse = {
  total: number
  data: TNote[]
}
