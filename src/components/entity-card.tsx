import { useNavigate } from 'react-router-dom'

import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Typography } from 'antd'

interface Props {
  id: number
  route: string
  name: string
}

export function EntityCard({ id, route, name }: Props) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`${route}/${id}`)}
      hoverable
      bodyStyle={{
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Avatar icon={<UserOutlined />}>{name.at(0)}</Avatar>
      <Typography.Text>{name}</Typography.Text>
    </Card>
  )
}
