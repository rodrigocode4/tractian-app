import { LoaderFunctionArgs, json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Col, Layout, Row, Space, Typography, theme } from 'antd'
import { getCompanyById } from '~/modules/companies/companies.services'
import { getUnitById } from '~/modules/units/units.services'

import { ROUTE } from '../../routes/contants.routes'
import { UnitLoaderDataType } from '../units.types'

export async function loader({ params }: LoaderFunctionArgs) {
  const unitResult = await getUnitById(params.id as string)

  const { name: companyName } = await getCompanyById(unitResult.companyId)

  return json({
    unit: {
      ...unitResult,
      companyName,
    },
  })
}

export function UnitPage() {
  const { unit } = useLoaderData() as UnitLoaderDataType

  const navigate = useNavigate()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout
      style={{ minHeight: '100%', minWidth: '100%', padding: 16, background: colorBgContainer }}
    >
      <Typography.Title style={{ alignSelf: 'center' }}>{unit.name}</Typography.Title>
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
            <Card
              title="Company"
              hoverable
              onClick={() => navigate(`${ROUTE.COMPANIES}/${unit.companyId}`)}
            >
              <Typography.Text style={{ alignSelf: 'center' }}>{unit.companyName}</Typography.Text>
            </Card>
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}
