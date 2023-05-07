import * as React from 'react'
import { useNavigation } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'
import { Layout, Spin, theme } from 'antd'
import { BasicProps } from 'antd/es/layout/layout'

interface Props extends BasicProps {
  children?: React.ReactNode
  hasBgColor?: boolean
}

export function PageContainer({ children, hasBgColor = true, ...restProps }: Props) {
  const navigation = useNavigation()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Spin
      size="large"
      spinning={navigation.state !== 'idle'}
      indicator={<LoadingOutlined />}
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout
        style={{
          minHeight: '100vh',
          minWidth: '100%',
          paddingTop: 16,
          backgroundColor: hasBgColor ? colorBgContainer : undefined,
        }}
        {...restProps}
      >
        {children}
      </Layout>
    </Spin>
  )
}
