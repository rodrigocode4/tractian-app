import { LoaderFunctionArgs, json, useLoaderData } from 'react-router-dom'

import { Col, Divider, Progress, Row, Space, Statistic, Typography, theme } from 'antd'
import { EntityCard } from '~/components/entity-card'
import { PageContainer } from '~/components/page-container'
import { Palette } from '~/infrastructure/palette'
import { ROUTE } from '~/modules/constants.routes'

import { getColorStatus, getTextStatus } from '../assets.helpers'
import { getAssetService } from '../assets.services'
import { AssetLoaderDataType } from '../assets.types'
import { HightChatsHealthHistory } from '../components/hight-chats-history'

export async function loader({ params }: LoaderFunctionArgs) {
  const { asset, users, company, unit } = await getAssetService(params.id as string)
  return json({ asset, users, company, unit })
}

export function AssetPage() {
  const { asset, users, company, unit } = useLoaderData() as AssetLoaderDataType

  const {
    token: { colorInfoText },
  } = theme.useToken()

  return (
    <PageContainer>
      <Typography.Title style={{ alignSelf: 'center' }}>{asset.name}</Typography.Title>
      <Divider />
      <Row>
        <Typography.Text>Health</Typography.Text>
        <Progress
          showInfo
          percent={asset.healthscore}
          strokeColor={{ '0%': Palette.redDark, '50%': Palette.yellow, '100%': Palette.green }}
        />
      </Row>
      <Divider />
      <Space
        direction="horizontal"
        style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}
      >
        <Statistic
          title="Status"
          value={getTextStatus(asset.status)}
          valueStyle={{ color: getColorStatus(asset.status) }}
        />
        <Statistic
          title="Temperature(max)"
          value={asset.specifications.maxTemp}
          valueStyle={{ color: colorInfoText }}
        />
        <Statistic
          title="Power"
          value={asset.specifications.power}
          valueStyle={{ color: colorInfoText }}
        />
        <Statistic
          title="RPM"
          value={asset.specifications.rpm}
          valueStyle={{ color: colorInfoText }}
        />
      </Space>
      <Divider />
      <HightChatsHealthHistory healthHistory={asset.healthHistory} />
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
        <Col flex={1}>
          <Typography.Title style={{ display: 'flex', justifyContent: 'center' }} level={3}>
            Company
          </Typography.Title>
          <Space
            size={16}
            wrap
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <EntityCard id={company.id} route={ROUTE.COMPANIES} name={company.name} />
          </Space>
        </Col>
        <Col flex={1}>
          <Typography.Title style={{ display: 'flex', justifyContent: 'center' }} level={3}>
            Unit
          </Typography.Title>
          <Space
            size={16}
            wrap
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <EntityCard id={unit.id} route={ROUTE.UNITS} name={unit.name} />
          </Space>
        </Col>
      </Row>
    </PageContainer>
  )
}
