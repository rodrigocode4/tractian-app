import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Space, Typography } from 'antd'
import { List } from '~/components/list'
import { PageContainer } from '~/components/page-container'
import { makeStyles } from '~/infrastructure/styles'
import { ROUTE } from '~/modules/constants.routes'

import { getAllWorkOrders } from '../work-orders.services'
import { WorkOrdersLoaderDataType } from '../work-orders.types'

export async function loader() {
  const workOrders = await getAllWorkOrders()

  return json({ workOrders })
}

export function WorkOrdersPage() {
  const { workOrders } = useLoaderData() as WorkOrdersLoaderDataType
  const navigate = useNavigate()
  const styles = useStyles()

  return (
    <PageContainer hasBgColor={false}>
      <List
        dataSource={workOrders}
        renderItem={(item) => (
          <List.Item
            data-testid="work-order-item"
            onClick={() => navigate(`${ROUTE.WORK_ORDERS}/${item.id}`)}
          >
            <Card
              hoverable
              title={item.title}
              actions={[
                <Space direction="vertical" key={1}>
                  <Typography.Text type="secondary">Status</Typography.Text>
                  <Typography.Text
                    type={item.status === 'completed' ? 'success' : 'warning'}
                    strong
                  >
                    {item.status}
                  </Typography.Text>
                </Space>,
                <Space direction="vertical" key={2}>
                  <Typography.Text type="secondary">Priority</Typography.Text>
                  <Typography.Text type={item.priority === 'high' ? 'danger' : 'warning'} strong>
                    {item.priority}
                  </Typography.Text>
                </Space>,
              ]}
            >
              <Space direction="vertical" style={styles.cardSpace}>
                <Space direction="horizontal" align="baseline">
                  <Typography.Text style={{ wordBreak: 'normal' }} type="secondary">
                    Description:{' '}
                  </Typography.Text>
                  <Typography.Text type="secondary" strong>
                    {item.description}
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
