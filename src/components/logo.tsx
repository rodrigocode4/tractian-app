import { Link } from 'react-router-dom'

import { ROUTE } from '~/modules/routes/routes.constants'

import LogoSVG from '../assets/logo.svg'

export function Logo() {
  return (
    <Link
      to={ROUTE.ROOT}
      style={{
        height: 32,
        margin: 16,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={LogoSVG} alt="Logotipo da Tractian" />
    </Link>
  )
}
