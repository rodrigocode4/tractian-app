import { z } from 'zod'

export const CompanySchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export const CompaniesSchema = z.array(CompanySchema)
