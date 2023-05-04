import { z } from 'zod'

const Id = z.number().int()

export const UserSchema = z.object({
  companyId: Id,
  email: z.string().email(),
  id: Id,
  name: z.string(),
  unitId: Id,
})

export const UsersSchema = z.array(UserSchema)
