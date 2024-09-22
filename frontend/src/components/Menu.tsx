import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { OpenDoorButton } from './OpenDoorButton'
import style from './styling/Menu.module.css'

const linkStyle = ({ isActive }: { isActive: boolean }) => {
  return [style.menuItem, isActive ? style.menuItemActive : ''].join(' ')
}

interface MenuProps {
  closePopover?: () => void
}

export const Menu = ({ closePopover }: MenuProps) => {
  const { logout } = useAuth()
  const handleClosePopover = () => closePopover && closePopover()

  return (
    <menu className={style.container}>
      <OpenDoorButton />
      <div className={style.menuHeading}>Sidor</div>
      <NavLink className={linkStyle} to="/events" onClick={handleClosePopover}>
        Kalender
      </NavLink>
      <NavLink className={linkStyle} to="/members" onClick={handleClosePopover}>
        Blåsbasen
      </NavLink>

      <div className={style.menuHeading}>Information</div>
      <NavLink
        className={linkStyle}
        to="/informationChannels"
        onClick={handleClosePopover}
      >
        Informationskanaler
      </NavLink>
      <NavLink className={linkStyle} to="/stadgar" onClick={handleClosePopover}>
        Stadgar och mötesprotokoll
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://wiki.litheblas.org"
        onClick={handleClosePopover}
      >
        Wiki
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://wiki.litheblas.org/Integritetspolicy"
        onClick={handleClosePopover}
      >
        Integritetspolicy
      </NavLink>

      <div className={style.menuHeading}>Musik & Dans</div>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/danser/"
        onClick={handleClosePopover}
      >
        Danser
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/notarkiv/"
        onClick={handleClosePopover}
      >
        Notarkiv
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://wiki.litheblas.org/Kategori:S%C3%A5ngl%C3%A5tar"
        onClick={handleClosePopover}
      >
        Sing-a-long
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/musik/"
        onClick={handleClosePopover}
      >
        Inspelningar
      </NavLink>

      <div className={style.menuHeading}>Bilder</div>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/galleri/"
        onClick={handleClosePopover}
      >
        Galleriet
      </NavLink>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/timeline/"
        onClick={handleClosePopover}
      >
        Blåsare i tiden
      </NavLink>

      <div className={style.menuHeading}>Övrigt</div>
      <NavLink
        className={style.menuItem}
        to="https://www.litheblas.org/internt/barstat/"
        onClick={handleClosePopover}
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
