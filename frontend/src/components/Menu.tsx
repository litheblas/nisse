import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { OpenDoorButton } from './OpenDoorButton'
import style from './styling/Menu.module.css'

const linkStyle = ({ isActive }: { isActive: boolean }) => {
  return [style.menuItem, isActive ? style.menuItemActive : ''].join(' ')
}

export const Menu = () => {
  const { logout } = useAuth()

  return (
    <menu className={style.container}>
      <OpenDoorButton />
      <div className={style.menuHeading}>Sidor</div>
      <NavLink className={linkStyle} to="/events">
        Kalender
      </NavLink>
      <NavLink className={linkStyle} to="/members">
        Blåsbasen
      </NavLink>

      <div className={style.menuHeading}>Information</div>
      <NavLink className={linkStyle} to="/informationskanaler">
        Informationskanaler
      </NavLink>
      <NavLink className={linkStyle} to="/stadgar">
        Stadgar och mötesprotokoll
      </NavLink>
      <NavLink className={style.menuItem} to="https://wiki.litheblas.org">
        Wiki
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://wiki.litheblas.org/Integritetspolicy"
      >
        Integritetspolicy
      </NavLink>

      <div className={style.menuHeading}>Musik & Dans</div>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/danser/"
      >
        Danser
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/notarkiv/"
      >
        Notarkiv
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://wiki.litheblas.org/Kategori:S%C3%A5ngl%C3%A5tar"
      >
        Sing-a-long
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/musik/"
      >
        Inspelningar
      </NavLink>

      <div className={style.menuHeading}>Bilder</div>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/galleri/"
      >
        Galleriet
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/timeline/"
      >
        Blåsare i tiden
      </NavLink>

      <div className={style.menuHeading}>Övrigt</div>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/barstat/"
      >
        Barstatistik
      </NavLink>

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
