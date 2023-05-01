import { type RouteObject } from 'react-router-dom'

import { ROUTE } from '../routes/routes.constants'

export const Users: RouteObject = {
  path: ROUTE.USERS,
  element: <h1>Users</h1>,
}
