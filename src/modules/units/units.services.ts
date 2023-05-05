import http from '~/infrastructure/http'

import { ROUTE } from '../routes/contants.routes'
import { UnitSchema, UnitsSchema } from './units.schemas'
import { UnitType, UnitsType } from './units.types'

export const getUnitById = async (id: string) => {
  const unitResult = await http.get<UnitType>(`${ROUTE.UNITS}/${id}`)

  return UnitSchema.parse(unitResult.data)
}

export const getAllUnits = async () => {
  const unitResult = await http.get<UnitsType>(ROUTE.UNITS)

  return UnitsSchema.parse(unitResult.data)
}
