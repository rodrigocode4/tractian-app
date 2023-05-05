import { type RouteObject } from 'react-router-dom'

import { ROUTE } from '../constants.routes'
import * as User from './pages/user.page'
import * as Users from './pages/users.page'

export const UsersRoute: RouteObject[] = [
  {
    path: ROUTE.USERS,
    loader: Users.loader,
    element: <Users.UsersPage />,
  },
  {
    path: `${ROUTE.USERS}/:id`,
    loader: User.loader,
    element: <User.UserPage />,
  },
]
