import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Space, Typography } from 'antd'
import { List } from '~/components/list'
import { PageContainer } from '~/components/page-container'
import { makeStyles } from '~/infrastructure/styles'
import { getCompanyById } from '~/modules/companies/companies.services'
import { ROUTE } from '~/modules/constants.routes'
import { getUnitById } from '~/modules/units/units.services'

import { getAllUsersService } from '../users.services'
import { UsersLoaderDataType } from '../users.types'

export async function loader() {
  const usersResult = await getAllUsersService()

  const users = await Promise.all(
    usersResult.map(async (user) => {
      const { name: unitName } = await getUnitById(`${user.unitId}`)
      const { name: companyName } = await getCompanyById(`${user.companyId}`)

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
  const styles = useStyles()

  return (
    <PageContainer hasBgColor={false}>
      <List
        dataSource={users}
        renderItem={(item) => (
          <List.Item onClick={() => navigate(`${ROUTE.USERS}/${item.id}`)}>
            <Card hoverable title={item.name}>
              <Space direction="vertical" style={styles.cardSpace}>
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
    </PageContainer>
  )
}

const useStyles = makeStyles({
  cardSpace: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
