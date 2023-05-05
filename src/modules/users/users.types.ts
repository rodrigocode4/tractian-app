import { z } from 'zod'

import { UserSchema, UsersSchema } from './users.schemas'

export type UserType = z.infer<typeof UserSchema>

export type UsersType = z.infer<typeof UsersSchema>

export type UserCustomType = UserType & { companyName: string; unitName: string }

export type UsersLoaderDataType = {
  users: UserCustomType[]
}
