import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, List, Space, Typography } from 'antd'
import { PageContainer } from '~/components/page-container'
import { getAllCompanies } from '~/modules/companies/companies.services'
import { ROUTE } from '~/modules/constants.routes'

import { CompaniesLoaderDataType } from '../companies.types'

export async function loader() {
  const companies = await getAllCompanies()

  return json({ companies })
}

export function CompaniesPage() {
  const { companies } = useLoaderData() as CompaniesLoaderDataType
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
        dataSource={companies}
        renderItem={(item) => (
          <List.Item>
            <Card
              onClick={() => navigate(`${ROUTE.COMPANIES}/${item.id}`)}
              hoverable
              title={item.name}
            >
              <Space
                direction="vertical"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Space direction="horizontal" key={1}>
                  <Typography.Text type="secondary">Company: </Typography.Text>
                  <Typography.Text type="secondary" strong>
                    {item.name}
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
