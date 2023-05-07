import { LoaderFunctionArgs, json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Col, Row, Space, Typography } from 'antd'
import { PageContainer } from '~/components/page-container'
import { makeStyles } from '~/infrastructure/styles'
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
  const styles = useStyles()

  return (
    <PageContainer>
      <Typography.Title style={styles.title}>{unit.name}</Typography.Title>
      <Row>
        <Col flex={1}>
          <Space size={16} wrap style={styles.spaceRow}>
            <Card
              title="Company"
              hoverable
              onClick={() => navigate(`${ROUTE.COMPANIES}/${unit.companyId}`)}
            >
              <Typography.Text style={styles.text}>{unit.companyName}</Typography.Text>
            </Card>
          </Space>
        </Col>
      </Row>
    </PageContainer>
  )
}

const useStyles = makeStyles({
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    alignSelf: 'center',
  },
  spaceRow: {
    display: 'flex',
    justifyContent: 'center',
  },
})
