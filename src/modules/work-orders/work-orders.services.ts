import http from '~/infrastructure/http'

import { ROUTE } from '../constants.routes'
import { WorkOrderSchema, WorkOrdersSchema } from './work-orders.schemas'
import { WorkOrderType, WorkOrdersType } from './work-orders.types'

export const getWorkOrderById = async (id: string) => {
  const workOrderResult = await http.get<WorkOrderType>(`${ROUTE.WORK_ORDERS}/${id}`)

  return WorkOrderSchema.parse(workOrderResult.data)
}

export const getAllWorkOrders = async () => {
  const workOrdersResult = await http.get<WorkOrdersType>(ROUTE.WORK_ORDERS)

  return WorkOrdersSchema.parse(workOrdersResult.data)
}
