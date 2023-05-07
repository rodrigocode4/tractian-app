import { Link } from 'react-router-dom'

import { makeStyles } from '~/infrastructure/styles'
import { ROUTE } from '~/modules/constants.routes'

import LogoSVG from '../assets/logo.svg'

export function Logo() {
  const styles = useStyles()

  return (
    <Link to={ROUTE.ROOT} style={styles.link}>
      <img src={LogoSVG} alt="Logotipo da Tractian" style={styles.image} />
    </Link>
  )
}

const useStyles = makeStyles({
  link: {
    height: 32,
    margin: 16,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    objectFit: 'contain',
    maxHeight: '100%',
    maxWidth: '100%',
  },
})
