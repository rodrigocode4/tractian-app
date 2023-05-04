import { z } from 'zod'

import { CompanyType } from '../companies/companies.types'
import { UnitType } from '../units/units.types'
import { UsersType } from '../users/users.types'
import { AssetSchema, AssetsSchema, StatusSchema } from './assets.schemas'

export type AssetType = z.infer<typeof AssetSchema>

export type AssetsType = z.infer<typeof AssetsSchema>

export type StatusType = z.infer<typeof StatusSchema>

export type AssetLoaderDataType = {
  asset: AssetType
  users: UsersType
  company: CompanyType
  unit: UnitType
}
