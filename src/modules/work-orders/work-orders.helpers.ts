import { Palette } from '~/infrastructure/palette'

import { PriorityType, StatusType } from './work-orders.types'

export const getColorStatus = (value: StatusType) => {
  const colorMap = {
    'in progress': Palette.yellow,
    completed: Palette.green,
  } as Record<StatusType, Palette>

  return colorMap[value]
}

export const getColorPriority = (value: PriorityType) => {
  const colorMap = {
    low: Palette.yellow,
    high: Palette.red,
  } as Record<PriorityType, Palette>

  return colorMap[value]
}
