import http from '~/infrastructure/http'

import { ROUTE } from '../constants.routes'
import { CompaniesSchema, CompanySchema } from './companies.schemas'
import { CompaniesType, CompanyType } from './companies.types'

export const getCompanyById = async (id: string) => {
  const companyResult = await http.get<CompanyType>(`${ROUTE.COMPANIES}/${id}`)

  return CompanySchema.parse(companyResult.data)
}

export const getAllCompanies = async () => {
  const companiesResult = await http.get<CompaniesType>(ROUTE.COMPANIES)

  return CompaniesSchema.parse(companiesResult.data)
}
