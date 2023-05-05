import { Palette } from '~/infrastructure/palette'

import { StatusType } from './assets.types'

export const getColorHealth = (value: number) => {
  if (value >= 70) return Palette.green
  if (value >= 50) return Palette.yellow
  return Palette.red
}

export const getColorStatus = (value: StatusType) => {
  if (value === 'inOperation') return Palette.green
  if (value === 'inAlert') return Palette.yellow
  if (value === 'inDowntime') return Palette.red
  if (value === 'plannedStop') return Palette.redDark
  return Palette.orange
}

export const getTextStatus = (value: StatusType) => {
  if (value === 'inOperation') 'In operation'
  if (value === 'inAlert') return 'In alert'
  if (value === 'inDowntime') return 'In downtime'
  if (value === 'plannedStop') return 'Planned stop'
  return 'Unplanned stop'
}
