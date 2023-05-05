import http from '~/infrastructure/http'

import { ROUTE } from '../routes/contants.routes'
import { UserSchema, UsersSchema } from './users.schemas'
import { UserType, UsersType } from './users.types'

export const getUserById = async (id: string) => {
  const usersResult = await http.get<UserType>(`${ROUTE.USERS}/${id}`)

  return UserSchema.parse(usersResult.data)
}

export const getUserByAssignedUserIds = async (assignedUserIds: number[]) => {
  const usersResult = await Promise.all(assignedUserIds.map((userId) => getUserById(`${userId}`)))

  return UsersSchema.parse(usersResult)
}

export const getAllUsersService = async () => {
  const usersResult = await http.get<UsersType>(ROUTE.USERS)

  return UsersSchema.parse(usersResult.data)
}
