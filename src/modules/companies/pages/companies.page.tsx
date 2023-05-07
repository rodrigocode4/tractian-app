import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Space, Typography } from 'antd'
import { List } from '~/components/list'
import { PageContainer } from '~/components/page-container'
import { makeStyles } from '~/infrastructure/styles'
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
  const styles = useStyles()

  return (
    <PageContainer hasBgColor={false}>
      <List
        dataSource={companies}
        renderItem={(item) => (
          <List.Item onClick={() => navigate(`${ROUTE.COMPANIES}/${item.id}`)}>
            <Card hoverable title={item.name}>
              <Space direction="vertical" style={styles.spaceCard}>
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

const useStyles = makeStyles({
  spaceCard: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
