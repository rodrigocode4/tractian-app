import { Outlet, useRouteError } from 'react-router-dom'

import { Layout } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { Menu } from '~/components/menu'

export function Error() {
  const error = useRouteError()
  console.log({ error })
  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Menu />
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>ERROR</Footer>
      </Layout>
    </Layout>
  )
}
