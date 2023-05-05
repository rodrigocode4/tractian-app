import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Col, Layout, List, Space, Statistic, Typography } from 'antd'

import { ROUTE } from '../../routes/contants.routes'
import { getColorHealth, getColorStatus, getTextStatus } from '../assets.helpers'
import { getAllAssetsService } from '../assets.services'
import { AssetsLoaderDataType } from '../assets.types'

export async function loader() {
  const assets = await getAllAssetsService()

  return json({ assets })
}

export function AssetsPage() {
  const { assets } = useLoaderData() as AssetsLoaderDataType

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
        dataSource={assets}
        renderItem={(item) => (
          <List.Item>
            <Card
              onClick={() => navigate(`${ROUTE.ASSETS}/${item.id}`)}
              hoverable
              title={item.name}
              actions={[
                <Space direction="vertical" key={1}>
                  <Typography.Text type="secondary">Temperature(max)</Typography.Text>
                  <Typography.Text type="secondary" strong>
                    {item.specifications.maxTemp}
                  </Typography.Text>
                </Space>,
                <Space direction="vertical" key={2}>
                  <Typography.Text type="secondary">Power</Typography.Text>
                  <Typography.Text type="secondary" strong>
                    {item.specifications.power}
                  </Typography.Text>
                </Space>,
                <Space direction="vertical" key={3}>
                  <Typography.Text type="secondary">RPM</Typography.Text>
                  <Typography.Text type="secondary" strong>
                    {item.specifications.rpm}
                  </Typography.Text>
                </Space>,
              ]}
            >
              <Space
                direction="horizontal"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Col>
                  <Statistic
                    title="Health"
                    value={item.healthscore}
                    valueStyle={{ color: getColorHealth(item.healthscore), display: 'flex' }}
                    suffix="%"
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Status"
                    value={getTextStatus(item.status)}
                    valueStyle={{ color: getColorStatus(item.status), display: 'flex' }}
                  />
                </Col>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </Layout>
  )
}
