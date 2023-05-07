import { Outlet } from 'react-router-dom'

import { Layout, Typography } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { Menu } from '~/components/menu'
import { makeStyles } from '~/infrastructure/styles'

export function Root() {
  const styles = useStyles()
  return (
    <Layout style={styles.container}>
      <Menu />
      <Layout>
        <Content style={styles.content}>
          <Outlet />
        </Content>
        <Footer style={styles.footer}>
          <Typography.Link>Tractian App</Typography.Link>
        </Footer>
      </Layout>
    </Layout>
  )
}

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
  },
  content: {
    margin: '0 16px',
  },
  footer: {
    textAlign: 'center',
  },
})
