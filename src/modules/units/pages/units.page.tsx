import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Space, Typography } from 'antd'
import { List } from '~/components/list'
import { PageContainer } from '~/components/page-container'
import { makeStyles } from '~/infrastructure/styles'
import { getCompanyById } from '~/modules/companies/companies.services'
import { ROUTE } from '~/modules/constants.routes'
import { getAllUnits } from '~/modules/units/units.services'

import { UnitsLoaderDataType } from '../units.types'

export async function loader() {
  const unitsResult = await getAllUnits()

  const units = await Promise.all(
    unitsResult.map(async (unit) => {
      const { name: companyName } = await getCompanyById(`${unit.companyId}`)

      return {
        ...unit,
        companyName,
      }
    }),
  )

  return json({ units })
}

export function UnitsPage() {
  const { units } = useLoaderData() as UnitsLoaderDataType
  const navigate = useNavigate()
  const styles = useStyles()

  return (
    <PageContainer hasBgColor={false}>
      <List
        dataSource={units}
        renderItem={(item) => (
          <List.Item onClick={() => navigate(`${ROUTE.UNITS}/${item.id}`)}>
            <Card hoverable title={item.name}>
              <Space direction="vertical" style={styles.cardSpace}>
                <Space direction="horizontal" key={1}>
                  <Typography.Text type="secondary">Unit: </Typography.Text>
                  <Typography.Text type="secondary" strong>
                    {item.name}
                  </Typography.Text>
                </Space>
                <Space direction="horizontal" key={2}>
                  <Typography.Text type="secondary">Company: </Typography.Text>
                  <Typography.Text type="secondary" strong>
                    {item.companyName}
                  </Typography.Text>
                </Space>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </PageContainer>
  )
}

const useStyles = makeStyles({
  cardSpace: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
