import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  ApartmentOutlined,
  DeploymentUnitOutlined,
  FunnelPlotOutlined,
  SendOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Layout, Menu as MenuAndt, MenuProps } from 'antd'
import { ROUTE } from '~/modules/constants.routes'

import { Logo } from './logo'

const getLabel = (label: string) => label.slice(1).replace('_', ' ')

const menuItems: MenuProps['items'] = [
  {
    key: ROUTE.ASSETS,
    label: getLabel(ROUTE.ASSETS),
    icon: <FunnelPlotOutlined />,
  },
  {
    key: ROUTE.USERS,
    label: getLabel(ROUTE.USERS),
    icon: <TeamOutlined />,
  },
  {
    key: ROUTE.UNITS,
    label: getLabel(ROUTE.UNITS),
    icon: <DeploymentUnitOutlined />,
  },
  {
    key: ROUTE.COMPANIES,
    label: getLabel(ROUTE.COMPANIES),
    icon: <ApartmentOutlined />,
  },
  {
    key: ROUTE.WORK_ORDERS,
    label: getLabel(ROUTE.WORK_ORDERS),
    icon: <SendOutlined />,
  },
]

export function Menu() {
  const [collapsed, setCollapsed] = React.useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Logo />
      <MenuAndt
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[ROUTE.ASSETS]}
        onClick={(e) => navigate(e.key)}
        items={menuItems}
        selectedKeys={[pathname.replace(/\/\d+/, '')]}
      />
    </Layout.Sider>
  )
}
