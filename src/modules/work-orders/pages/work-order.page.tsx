import { LoaderFunctionArgs, json, useLoaderData } from 'react-router-dom'

import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Avatar, Col, Divider, Layout, List, Row, Space, Statistic, Typography, theme } from 'antd'
import { EntityCard } from '~/components/entity-card'
import { Palette } from '~/infrastructure/palette'
import { getAssetById } from '~/modules/assets/assets.services'
import { ROUTE } from '~/modules/constants.routes'
import { getUserById } from '~/modules/users/users.services'

import { getColorPriority, getColorStatus } from '../work-orders.helpers'
import { getWorkOrderById } from '../work-orders.services'
import { WorkOrderLoaderDataType } from '../work-orders.types'

export async function loader({ params }: LoaderFunctionArgs) {
  const workOrder = await getWorkOrderById(params.id as string)
  const asset = await getAssetById(`${workOrder.assetId}`)

  const users = await Promise.all(
    workOrder.assignedUserIds.map((userId) => getUserById(`${userId}`)),
  )

  return json({ workOrder, asset, users })
}

export function WorkOrderPage() {
  const { workOrder, asset, users } = useLoaderData() as WorkOrderLoaderDataType

  const {
    token: { colorBgContainer, colorInfoText },
  } = theme.useToken()

  return (
    <Layout
      style={{ minHeight: '100%', minWidth: '100%', padding: 16, background: colorBgContainer }}
    >
      <Typography.Title style={{ alignSelf: 'center' }}>{workOrder.title}</Typography.Title>
      <Divider />
      <Space
        direction="horizontal"
        style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}
      >
        <Statistic
          title="Status"
          value={workOrder.status}
          valueStyle={{ color: getColorStatus(workOrder.status) }}
        />
        <Statistic
          title="Priority"
          value={workOrder.priority}
          valueStyle={{ color: getColorPriority(workOrder.priority) }}
        />
        <Statistic title="Asset" value={asset.name} valueStyle={{ color: colorInfoText }} />
      </Space>
      <Divider />
      <Row>
        <Col flex={1}>
          <Typography.Title level={3} style={{ display: 'flex', justifyContent: 'center' }}>
            Users
          </Typography.Title>
          <Space
            size={16}
            wrap
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {users.map(({ id, name }) => (
              <EntityCard key={id} id={id} route={ROUTE.USERS} name={name} />
            ))}
          </Space>
        </Col>
        <Col flex={2}>
          <Typography.Title style={{ display: 'flex', justifyContent: 'center' }} level={3}>
            Checklist
          </Typography.Title>

          <List
            bordered
            itemLayout="horizontal"
            dataSource={workOrder.checklist}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: item.completed ? Palette.green : Palette.yellow }}
                      icon={item.completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                    />
                  }
                  title={item.task}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Layout>
  )
}
