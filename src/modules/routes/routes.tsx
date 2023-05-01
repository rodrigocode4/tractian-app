import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import { Assets } from '~/modules/assets/assets.routes'
import { Companies } from '~/modules/companies/companies.routes'
import { Units } from '~/modules/units/units.routes'
import { Users } from '~/modules/users/users.routes'
import { WorkOrders } from '~/modules/work-orders/works-orders.routes'

import { Root } from '../root'
import { ROUTE } from './routes.constants'

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect(ROUTE.ASSETS),
  },
  {
    path: '/',
    element: <Root />,
    children: [Assets, Users, Units, Companies, WorkOrders],
  },
])

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

export function Routes() {
  return <RouterProvider router={router} />
}
