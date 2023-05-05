import { type RouteObject } from 'react-router-dom'

import { ROUTE } from '../constants.routes'
import * as Companies from './pages/companies.page'
import * as Company from './pages/company.page'

export const CompaniesRoute: RouteObject[] = [
  {
    path: ROUTE.COMPANIES,
    loader: Companies.loader,
    element: <Companies.CompaniesPage />,
  },

  {
    path: `${ROUTE.COMPANIES}/:id`,
    loader: Company.loader,
    element: <Company.CompanyPage />,
  },
]
