import http from '~/infrastructure/http'

import { ROUTE } from '../routes/contants.routes'
import { UnitSchema } from './units.schemas'
import { UnitType } from './units.types'

export const getUnitById = async (id: number) => {
  const unitResult = await http.get<UnitType>(`${ROUTE.UNITS}/${id}`)

  const unit = UnitSchema.parse(unitResult.data)

  return unit
}
