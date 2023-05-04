import { StatusType } from './assets.types'

export const getColorHealth = (value: number) => {
  if (value >= 70) return '#3f8600'
  if (value >= 50) return '#e29700'
  return '#870000'
}

export const getColorStatus = (value: StatusType) => {
  if (value === 'inOperation') return '#3f8600'
  if (value === 'inAlert') return '#e29700'
  if (value === 'inDowntime') return '#870000'
  if (value === 'plannedStop') return '#d60000'
  return '#ff6f00'
}

export const getTextStatus = (value: StatusType) => {
  if (value === 'inOperation') 'In operation'
  if (value === 'inAlert') return 'In alert'
  if (value === 'inDowntime') return 'In downtime'
  if (value === 'plannedStop') return 'Planned stop'
  return 'Unplanned stop'
}
