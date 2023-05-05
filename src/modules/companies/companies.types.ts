import { z } from 'zod'

import { CompaniesSchema, CompanySchema } from './companies.schemas'

export type CompanyType = z.infer<typeof CompanySchema>

export type CompaniesType = z.infer<typeof CompaniesSchema>

export type CompaniesLoaderDataType = {
  companies: CompaniesType
}

export type CompanyLoaderDataType = {
  company: CompanyType
}
