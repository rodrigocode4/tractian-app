import http from '~/infrastructure/http'

import { ROUTE } from '../routes/contants.routes'
import { UserSchema, UsersSchema } from './users.schemas'
import { UserType } from './users.types'

export const getUserById = async (id: number) => {
  const usersResult = await http.get<UserType>(`${ROUTE.USERS}/${id}`)

  const user = UserSchema.parse(usersResult.data)

  return user
}

export const getUserByAssignedUserIds = async (assignedUserIds: number[]) => {
  const usersResult = await Promise.all(assignedUserIds.map((userId) => getUserById(userId)))

  const users = UsersSchema.parse(usersResult)

  return users
}
