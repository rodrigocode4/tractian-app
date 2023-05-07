import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, List, Space, Typography } from 'antd'
import { PageContainer } from '~/components/page-container'
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

  return (
    <PageContainer hasBgColor={false}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
        dataSource={units}
        renderItem={(item) => (
          <List.Item>
            <Card onClick={() => navigate(`${ROUTE.UNITS}/${item.id}`)} hoverable title={item.name}>
              <Space
                direction="vertical"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
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
