import { z } from 'zod'

import { UnitSchema, UnitsSchema } from './units.schemas'

export type UnitType = z.infer<typeof UnitSchema>

export type UnitsType = z.infer<typeof UnitsSchema>

export type UnitCustomType = UnitType & { companyName: string }

export type UnitsLoaderDataType = {
  units: UnitCustomType[]
}

export type UnitLoaderDataType = {
  unit: UnitCustomType
}
