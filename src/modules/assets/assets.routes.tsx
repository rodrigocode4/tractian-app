import { type RouteObject } from 'react-router-dom'

import { ROUTE } from '../routes/routes.constants'

export const Assets: RouteObject = {
  path: ROUTE.ASSETS,
  element: <h1>Assets</h1>,
}
