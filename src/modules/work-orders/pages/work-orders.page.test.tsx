import * as RouterDOM from 'react-router-dom'

import { Mock } from 'vitest'
import { workOrdersMock } from '~/infrastructure/__mocks__/modules/work-orders'
import { apiMock, renderPageRoute, screen, userEvent } from '~/infrastructure/test-helpers'
import { ROUTE } from '~/modules/constants.routes'

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof RouterDOM>('react-router-dom')
  return {
    ...mod,
    useNavigate: vi.fn(),
  }
})

describe('WorkOrders', () => {
  afterEach(() => {
    ;(RouterDOM.useNavigate as Mock).mockRestore()
    apiMock.reset()
  })

  test('Should be return two work orders', async () => {
    apiMock.onGet(ROUTE.WORK_ORDERS).reply(200, workOrdersMock)

    renderPageRoute(ROUTE.WORK_ORDERS)

    const workOrdersCards = await screen.findAllByTestId('work-order-item')
    expect(workOrdersCards).toHaveLength(2)
  })

  test('Given list of work orders When click in work order card Then redirect to work order', async () => {
    apiMock.onGet(ROUTE.WORK_ORDERS).reply(200, workOrdersMock)
    const nevigate = vi.fn()
    ;(RouterDOM.useNavigate as Mock).mockReturnValue(nevigate)

    renderPageRoute(ROUTE.WORK_ORDERS)

    const [workOrderItem] = await screen.findAllByTestId('work-order-item')
    await userEvent.click(workOrderItem)

    expect(nevigate).toBeCalledWith(`${ROUTE.WORK_ORDERS}/${workOrdersMock.at(0)!.id}`)
  })
})
