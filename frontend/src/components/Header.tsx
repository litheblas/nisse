import { Link } from 'react-router-dom'
import logo from 'src/assets/logo-blue.svg'
import { useAuth } from '../context/AuthContext'
import { PopoverMenu } from './PopoverMenu'
import style from './styling/Header.module.css'
import { useQuery } from 'react-query'

export const Header = () => {
  const { logout } = useAuth()

  return (
    <header className={style.container}>
      <div className={style.content}>
        <Link to="/" className={style.logo}>
          <img src={logo} />
        </Link>

        <button
        onClick={
          () => {
            return;
          }
        }
          className={`standardButton blueButton ${style.openDoorButton}`}
        >
          Öppna Blåsrumsdörren
        </button>

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
