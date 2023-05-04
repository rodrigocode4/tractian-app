import { z } from 'zod'

const Id = z.number().int()

export const UnitSchema = z.object({
  companyId: Id,
  id: Id,
  name: z.string(),
})

export const UnitsSchema = z.array(UnitSchema)
