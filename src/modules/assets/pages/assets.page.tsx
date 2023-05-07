import { json, useLoaderData, useNavigate } from 'react-router-dom'

import { Card, Col, Space, Statistic, Typography } from 'antd'
import { List } from '~/components/list'
import { PageContainer } from '~/components/page-container'
import { ROUTE } from '~/modules/constants.routes'

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
    <PageContainer hasBgColor={false}>
      <List
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
    </PageContainer>
  )
}
