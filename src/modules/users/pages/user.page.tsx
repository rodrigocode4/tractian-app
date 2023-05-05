import { LoaderFunctionArgs, json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Col, Layout, Row, Space, Typography, theme } from 'antd'
import { getCompanyById } from '~/modules/companies/companies.services'
import { getUnitById } from '~/modules/units/units.services'

import { ROUTE } from '../../routes/contants.routes'
import { getUserById } from '../users.services'
import { UserLoaderDataType } from '../users.types'

export async function loader({ params }: LoaderFunctionArgs) {
  const userResult = await getUserById(params.id as string)

  const { name: unitName } = await getUnitById(userResult.unitId)
  const { name: companyName } = await getCompanyById(userResult.companyId)

  return json({
    user: {
      ...userResult,
      unitName,
      companyName,
    },
  })
}

export function UserPage() {
  const { user } = useLoaderData() as UserLoaderDataType

  const navigate = useNavigate()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout
      style={{ minHeight: '100%', minWidth: '100%', padding: 16, background: colorBgContainer }}
    >
      <Typography.Title style={{ alignSelf: 'center' }}>{user.name}</Typography.Title>
      <Row>
        <Col flex={1}>
          <Space
            size={16}
            wrap
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card title="Email" hoverable>
              <Typography.Text style={{ alignSelf: 'center' }}>{user.email}</Typography.Text>
            </Card>
            <Card title="Unit" hoverable onClick={() => navigate(`${ROUTE.UNITS}/${user.unitId}`)}>
              <Typography.Text style={{ alignSelf: 'center' }}>{user.unitName}</Typography.Text>
            </Card>
            <Card
              title="Company"
              hoverable
              onClick={() => navigate(`${ROUTE.COMPANIES}/${user.companyId}`)}
            >
              <Typography.Text style={{ alignSelf: 'center' }}>{user.companyName}</Typography.Text>
            </Card>
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}
