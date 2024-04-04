import { NavLink } from 'react-router-dom'
import { DoorService } from '../api'
import { useAuth } from '../context/AuthContext'
import style from './styling/Menu.module.css'

const linkStyle = ({ isActive }: { isActive: boolean }) => {
  return [style.menuItem, isActive ? style.menuItemActive : ''].join(' ')
}

export const Menu = () => {
  const { logout } = useAuth()

  return (
    <menu className={style.container}>
      <button
        onClick={() => {
          void DoorService.doorCreate()
          return false
        }}
        className={`standardButton blueButton`}
      >
        Öppna Blåsrumsdörren
      </button>
      <div className={style.menuHeading}>Sidor</div>
      <NavLink className={linkStyle} to="/">
        Info
      </NavLink>
      <NavLink className={linkStyle} to="/events">
        Kalender
      </NavLink>
      <NavLink className={linkStyle} to="/members">
        Blåsbasen
      </NavLink>

      <div className={style.menuHeading}>Information</div>
      <NavLink className={linkStyle} to="/informationChannels">
        Informationskanaler
      </NavLink>
      <NavLink className={linkStyle} to="/">
        Stadgar
      </NavLink>
      <NavLink className={linkStyle} to="/">
        Wiki
      </NavLink>
      <NavLink className={linkStyle} to="/">
        Integritetspolicy
      </NavLink>

      <div className={style.menuHeading}>Musik</div>
      <NavLink className={linkStyle} to="/">
        Notarkiv
      </NavLink>
      <NavLink className={linkStyle} to="/">
        Sing-a-long
      </NavLink>
      <NavLink className={linkStyle} to="/">
        Inspelningar
      </NavLink>

      <div className={style.menuHeading}>Dans</div>
      <NavLink className={linkStyle} to="/">
        Aktiva danser
      </NavLink>
      <NavLink className={linkStyle} to="/">
        Gamla danser
      </NavLink>

      <div className={style.menuHeading}>Bilder</div>
      <NavLink className={linkStyle} to="/">
        Galleriet
      </NavLink>

      <div className={`${style.menuHeading} ${style.hideInDesktopMode}`}>
        Övrigt
      </div>
      <NavLink
        className={`${style.menuItem} ${style.hideInDesktopMode}`}
        to="/"
        onClick={logout}
      >
        Logga ut
      </NavLink>
    </menu>
  )
}
