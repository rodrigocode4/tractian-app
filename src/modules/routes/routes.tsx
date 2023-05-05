import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import { Error } from '~/components/error'
import { AssetsRoute } from '~/modules/assets'
import { CompaniesRoute } from '~/modules/companies'
import { UnitsRoute } from '~/modules/units'
import { UsersRoute } from '~/modules/users'
import { WorkOrders } from '~/modules/work-orders'

import { Root } from '../root'
import { ROUTE } from './contants.routes'

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect(ROUTE.ASSETS),
  },
  {
    path: '/',
    errorElement: <Error />,
    element: <Root />,
    children: [...AssetsRoute, ...UsersRoute, ...UnitsRoute, ...CompaniesRoute, WorkOrders],
  },
])

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

export function Routes() {
  return <RouterProvider router={router} />
}
