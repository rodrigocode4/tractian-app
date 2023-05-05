import { type RouteObject } from 'react-router-dom'

import { ROUTE } from '../constants.routes'
import * as Asset from './pages/asset.page'
import * as Assets from './pages/assets.page'

export const AssetsRoute: RouteObject[] = [
  {
    path: ROUTE.ASSETS,
    loader: Assets.loader,
    element: <Assets.AssetsPage />,
  },
  {
    path: `${ROUTE.ASSETS}/:id`,
    loader: Asset.loader,
    element: <Asset.AssetPage />,
  },
]
