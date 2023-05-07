import { LoaderFunctionArgs, json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Col, Row, Space, Typography } from 'antd'
import { PageContainer } from '~/components/page-container'
import { getCompanyById } from '~/modules/companies/companies.services'
import { ROUTE } from '~/modules/constants.routes'
import { getUnitById } from '~/modules/units/units.services'

import { UnitLoaderDataType } from '../units.types'

export async function loader({ params }: LoaderFunctionArgs) {
  const unitResult = await getUnitById(params.id as string)

  const { name: companyName } = await getCompanyById(`${unitResult.companyId}`)

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

  return (
    <PageContainer>
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
    </PageContainer>
  )
}
