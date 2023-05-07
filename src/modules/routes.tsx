import { RouteObject, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import { Error } from '~/components/error'
import { AssetsRoute } from '~/modules/assets'
import { CompaniesRoute } from '~/modules/companies'
import { UnitsRoute } from '~/modules/units'
import { UsersRoute } from '~/modules/users'
import { WorkOrdersRoute } from '~/modules/work-orders'

import { ROUTE } from './constants.routes'
import { Root } from './root'

const routerConfig: RouteObject[] = [
  {
    path: ROUTE.ROOT,
    loader: () => redirect(ROUTE.ASSETS),
  },
  {
    path: ROUTE.ROOT,
    errorElement: <Error />,
    element: <Root />,
    children: [...AssetsRoute, ...UsersRoute, ...UnitsRoute, ...CompaniesRoute, ...WorkOrdersRoute],
  },
  {
    path: '*',
    element: <Error />,
  },
]

const router = createBrowserRouter(routerConfig)

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

export { routerConfig }

export function Routes() {
  return <RouterProvider router={router} />
}
