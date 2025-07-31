export interface TUser {
  name: string
  avatar: string
}

export interface HeaderProps {
  user: TUser | null
}
