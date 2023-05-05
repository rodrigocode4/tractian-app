import { z } from 'zod'

import { AssetType } from '../assets/assets.types'
import { UsersType } from '../users/users.types'
import {
  PrioritySchema,
  StatusSchema,
  WorkOrderSchema,
  WorkOrdersSchema,
} from './work-orders.schemas'

export type WorkOrdersType = z.infer<typeof WorkOrdersSchema>

export type WorkOrderType = z.infer<typeof WorkOrderSchema>

export type PriorityType = z.infer<typeof PrioritySchema>

export type StatusType = z.infer<typeof StatusSchema>

export type WorkOrdersLoaderDataType = {
  workOrders: WorkOrdersType
}

export type WorkOrderLoaderDataType = {
  workOrder: WorkOrderType
  asset: AssetType
  users: UsersType
}
