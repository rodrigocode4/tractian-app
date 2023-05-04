import http from '~/infrastructure/http'

import { ROUTE } from '../routes/contants.routes'
import { CompanySchema } from './companies.schemas'
import { CompanyType } from './companies.types'

export const getCompanyById = async (id: number) => {
  const companyResult = await http.get<CompanyType>(`${ROUTE.COMPANIES}/${id}`)

  const company = CompanySchema.parse(companyResult.data)

  return company
}
