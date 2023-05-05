import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Layout, List, Space, Typography } from 'antd'
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
        dataSource={workOrders}
        renderItem={(item) => (
          <List.Item>
            <Card
              onClick={() => navigate(`${ROUTE.WORK_ORDERS}/${item.id}`)}
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
              <Space
                direction="vertical"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
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
    </Layout>
  )
}
