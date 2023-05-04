import { Outlet, useNavigation } from 'react-router-dom'

import { Layout, Typography } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { Menu } from '~/components/menu'

export function Root() {
  const nav = useNavigation()
  console.log('nav: ', nav.state)
  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Menu />
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Typography.Link>Tractian App</Typography.Link>
        </Footer>
      </Layout>
    </Layout>
  )
}
