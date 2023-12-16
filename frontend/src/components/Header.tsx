import { Link } from 'react-router-dom'
import logo from 'src/assets/logo-blue.svg'
import { useKeycloak } from '../context/KeycloakContext'
import { PopoverMenu } from './PopoverMenu'
import style from './styling/Header.module.css'

export const Header = () => {
  const { logout } = useKeycloak()

  return (
    <header className={style.container}>
      <div className={style.content}>
        <Link to="/" className={style.logo}>
          <img src={logo} />
        </Link>
        <Link
          to="/"
          onClick={logout}
          className={`standardButton blueButton ${style.logoutButton}`}
        >
          Logga ut
        </Link>
        <div className={style.menu}>
          <PopoverMenu />
        </div>
      </div>
    </header>
  )
}
