import http from '~/infrastructure/http'

import { getCompanyById } from '../companies/companies.services'
import { ROUTE } from '../routes/contants.routes'
import { getUnitById } from '../units/units.services'
import { getUserByAssignedUserIds } from '../users/users.services'
import { AssetSchema } from './assets.schemas'
import { AssetType } from './assets.types'

const getAssetById = async (id: string) => {
  const assetResult = await http.get<AssetType>(`${ROUTE.ASSETS}/${id}`)

  const asset = AssetSchema.parse(assetResult.data)

  return asset
}

export const getAssetsService = async (id: string) => {
  const asset = await getAssetById(id)

  const [users, company, unit] = await Promise.all([
    getUserByAssignedUserIds(asset.assignedUserIds),
    getCompanyById(asset.companyId),
    getUnitById(asset.unitId),
  ])

  return {
    asset,
    users,
    company,
    unit,
  }
}
