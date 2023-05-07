import * as React from 'react'
import { useNavigation } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'
import { Layout, Spin, theme } from 'antd'
import { BasicProps } from 'antd/es/layout/layout'
import { makeStyles } from '~/infrastructure/styles'

interface Props extends BasicProps {
  children?: React.ReactNode
  hasBgColor?: boolean
}

export function PageContainer({ children, hasBgColor = true, ...restProps }: Props) {
  const navigation = useNavigation()
  const styles = useStyles()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Spin
      size="large"
      spinning={navigation.state !== 'idle'}
      indicator={<LoadingOutlined />}
      style={{}}
    >
      <Layout
        style={{
          ...styles.container,
          backgroundColor: hasBgColor ? colorBgContainer : undefined,
        }}
        {...restProps}
      >
        {children}
      </Layout>
    </Spin>
  )
}

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    minWidth: '100%',
    paddingTop: 16,
  },
  spin: {
    minHeight: '100vh',
  },
})
