import { type RouteObject } from 'react-router-dom'

import { ROUTE } from '../constants.routes'
import * as WorkOrder from './pages/work-order.page'
import * as WorkOrders from './pages/work-orders.page'

export const WorkOrdersRoute: RouteObject[] = [
  {
    path: ROUTE.WORK_ORDERS,
    loader: WorkOrders.loader,
    element: <WorkOrders.WorkOrdersPage />,
  },
  {
    path: `${ROUTE.WORK_ORDERS}/:id`,
    loader: WorkOrder.loader,
    element: <WorkOrder.WorkOrderPage />,
  },
]
