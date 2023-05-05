import { type RouteObject } from 'react-router-dom'

import { ROUTE } from '../routes/contants.routes'
import * as Unit from './pages/unit.page'
import * as Units from './pages/units.page'

export const UnitsRoute: RouteObject[] = [
  {
    path: ROUTE.UNITS,
    loader: Units.loader,
    element: <Units.UnitsPage />,
  },
  {
    path: `${ROUTE.UNITS}/:id`,
    loader: Unit.loader,
    element: <Unit.UnitPage />,
  },
]
