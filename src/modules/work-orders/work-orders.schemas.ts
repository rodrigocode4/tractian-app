import { z } from 'zod'

const Id = z.number().int()

export const PrioritySchema = z.enum(['high', 'low'])

export const StatusSchema = z.enum(['in progress', 'completed'])

export const WorkOrderSchema = z.object({
  assetId: Id,
  assignedUserIds: z.array(Id),
  checklist: z.array(
    z.object({
      completed: z.boolean(),
      task: z.string(),
    }),
  ),
  description: z.string(),
  id: Id,
  priority: PrioritySchema,
  status: StatusSchema,
  title: z.string(),
})

export const WorkOrdersSchema = z.array(WorkOrderSchema)
