/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'

export const StatusSchema = z.enum([
  'inOperation',
  'inDowntime',
  'inAlert',
  'unplannedStop',
  'plannedStop',
])

export const AssetSchema = z.object({
  assignedUserIds: z.array(z.number().int()),
  companyId: z.number().int(),
  healthHistory: z.array(
    z.object({
      status: StatusSchema,
      timestamp: z.string().datetime(),
    }),
  ),
  healthscore: z.number(),
  id: z.number().int(),
  image: z.string().url(),
  metrics: z.object({
    lastUptimeAt: z.string().datetime(),
    totalCollectsUptime: z.number(),
    totalUptime: z.number(),
  }),
  model: z.string(),
  name: z.string(),
  sensors: z.array(z.string()),
  specifications: z.object({
    maxTemp: z
      .number()
      .nullable()
      .optional()
      .transform((value: any) => {
        if ([null, undefined].includes(value)) {
          return `---`
        }

        return `${value} ºC`
      }),
    power: z
      .number()
      .nullable()
      .optional()
      .transform((value: any) => {
        if ([null, undefined].includes(value)) {
          return `---`
        }

        return `${value} kWh`
      }),
    rpm: z
      .number()
      .nullable()
      .optional()
      .transform((value: any) => {
        if ([null, undefined].includes(value)) {
          return `---`
        }

        return `${value} RPM`
      }),
  }),
  status: StatusSchema,
  unitId: z.number().int(),
})

export const AssetsSchema = z.array(AssetSchema)
