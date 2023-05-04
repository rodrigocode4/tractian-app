import { z } from 'zod'

import { UserSchema, UsersSchema } from './users.schemas'

export type UserType = z.infer<typeof UserSchema>

export type UsersType = z.infer<typeof UsersSchema>
