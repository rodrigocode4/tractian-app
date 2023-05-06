import * as RouterDOM from 'react-router-dom'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AxiosMockAdapter from 'axios-mock-adapter'
import { routerConfig } from '~/modules/routes'

import http from './http'

const apiMock = new AxiosMockAdapter(http, { delayResponse: 0, onNoMatch: 'throwException' })

const renderPageRoute = (route = '/') => {
  const router = RouterDOM.createMemoryRouter(routerConfig, {
    initialEntries: [route],
  })

  render(<RouterDOM.RouterProvider router={router} />)
}

export { apiMock, userEvent, renderPageRoute }

export * from '@testing-library/react'
