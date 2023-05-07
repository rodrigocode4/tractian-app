import { useNavigate } from 'react-router-dom'

import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Typography } from 'antd'
import { makeStyles } from '~/infrastructure/styles'

interface Props {
  id: number
  route: string
  name: string
}

export function EntityCard({ id, route, name }: Props) {
  const navigate = useNavigate()
  const styles = useStyles()

  return (
    <Card onClick={() => navigate(`${route}/${id}`)} hoverable bodyStyle={styles.container}>
      <Avatar icon={<UserOutlined />}>{name.at(0)}</Avatar>
      <Typography.Text>{name}</Typography.Text>
    </Card>
  )
}

const useStyles = makeStyles({
  container: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
  },
})
