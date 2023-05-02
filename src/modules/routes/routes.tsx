import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import { Assets } from '~/modules/assets'
import { Companies } from '~/modules/companies'
import { Units } from '~/modules/units'
import { Users } from '~/modules/users'
import { WorkOrders } from '~/modules/work-orders'

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
