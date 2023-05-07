import { useNavigate, useRouteError } from 'react-router-dom'

import { Button, Result, Typography } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import { ResultStatusType } from 'antd/es/result'
import { isAxiosError } from 'axios'
import { makeStyles } from '~/infrastructure/styles'
import { ROUTE } from '~/modules/constants.routes'

import { PageContainer } from './page-container'

export function Error() {
  const error = useRouteError()
  const natigate = useNavigate()
  const styles = useStyles()

  const handleGoHome = () => natigate(ROUTE.ROOT)

  // eslint-disable-next-line no-console
  console.log(error)

  return (
    <PageContainer style={styles.container}>
      {isAxiosError(error) ? (
        <Result
          status={error.status as ResultStatusType}
          title={error.status}
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button onClick={handleGoHome} type="primary">
              Back Home
            </Button>
          }
        />
      ) : (
        <Result
          status={'error'}
          title={'Error Page'}
          subTitle="Sorry, the page you visited has erro."
          extra={
            <Button onClick={handleGoHome} type="primary">
              Back Home
            </Button>
          }
        />
      )}
      <Footer style={styles.footer}>
        <Typography.Link>Tractian App</Typography.Link>
      </Footer>
    </PageContainer>
  )
}

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    paddingTop: 0,
    justifyContent: 'center',
  },
  footer: {
    textAlign: 'center',
    position: 'fixed',
    bottom: '0px',
    minWidth: '100%',
  },
})
