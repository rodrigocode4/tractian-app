import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Layout, List, Space, Typography } from 'antd'
import { getCompanyById } from '~/modules/companies/companies.services'
import { getUnitById } from '~/modules/units/units.services'

import { ROUTE } from '../../routes/contants.routes'
import { getAllUsersService } from '../users.services'
import { UsersLoaderDataType } from '../users.types'

export async function loader() {
  const usersResult = await getAllUsersService()

  const users = await Promise.all(
    usersResult.map(async (user) => {
      const { name: unitName } = await getUnitById(user.unitId)
      const { name: companyName } = await getCompanyById(user.companyId)

      return {
        ...user,
        unitName,
        companyName,
      }
    }),
  )

  return json({ users })
}

export function UsersPage() {
  const { users } = useLoaderData() as UsersLoaderDataType
  const navigate = useNavigate()

  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100%', paddingTop: 16 }}>
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
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <Card onClick={() => navigate(`${ROUTE.USERS}/${item.id}`)} hoverable title={item.name}>
              <Space
                direction="vertical"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Space direction="horizontal" key={1}>
                  <Typography.Text type="secondary">Email: </Typography.Text>
                  <Typography.Text type="secondary" strong>
                    {item.email}
                  </Typography.Text>
                </Space>
                <Space direction="horizontal" key={3}>
                  <Typography.Text type="secondary">Unit: </Typography.Text>
                  <Typography.Text type="secondary" strong>
                    {item.unitName}
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
    </Layout>
  )
}
