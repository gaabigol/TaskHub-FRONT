export type TUser = {
  id: number
  username: string
  email: string
  createdAt: string
  updatedAt: string
  displayName: string | null
  avatarInitials: string | null
}

export type TGetUserResponse = {
  success: boolean
  data: TUser
}

export type TUpdateUserRequest = {
  displayName?: string
  avatarInitials?: string
}

export type TUpdateUserResponse = {
  success: boolean
  message: string
  data: TUser
}

export type TCreateUserRequest = {
  username: string
  email: string
  password: string
}

export type TCreateUserResponse = {
  success: boolean
  message: string
  data: TUser
}
