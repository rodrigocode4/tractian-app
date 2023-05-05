import http from '~/infrastructure/http'

import { getCompanyById } from '../companies/companies.services'
import { ROUTE } from '../constants.routes'
import { getUnitById } from '../units/units.services'
import { getUserByAssignedUserIds } from '../users/users.services'
import { AssetSchema, AssetsSchema } from './assets.schemas'
import { AssetType, AssetsType } from './assets.types'

export const getAssetById = async (id: string) => {
  const assetResult = await http.get<AssetType>(`${ROUTE.ASSETS}/${id}`)

  return AssetSchema.parse(assetResult.data)
}

export const getAssetService = async (id: string) => {
  const asset = await getAssetById(id)

  const [users, company, unit] = await Promise.all([
    getUserByAssignedUserIds(asset.assignedUserIds),
    getCompanyById(`${asset.companyId}`),
    getUnitById(`${asset.unitId}`),
  ])

  return {
    asset,
    users,
    company,
    unit,
  }
}

export const getAllAssetsService = async () => {
  const assetsResult = await http.get<AssetsType>(ROUTE.ASSETS)

  return AssetsSchema.parse(assetsResult.data)
}
