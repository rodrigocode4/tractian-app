import { type RouteObject } from 'react-router-dom'

import { ROUTE } from '../routes/routes.constants'

export const Companies: RouteObject = {
  path: ROUTE.COMPANIES,
  element: <h1>Companies</h1>,
}
