import { NavLink } from 'react-router-dom'
import style from './styling/Menu.module.css'

interface MenuItemProps {
  to: string
  label: string
}

const MenuItem = ({ to, label }: MenuItemProps) => {
  return (
    <li className={style.menuItem}>
      <NavLink
        // Applies style.menuItemLink, and style.menuItemLinkActive if the link
        // is active
        className={({ isActive }) =>
          [style.menuItemLink, isActive ? style.menuItemLinkActive : ''].join(
            ' '
          )
        }
        to={to}
      >
        {label}
      </NavLink>
    </li>
  )
}

interface MenuHeadingProps {
  label: string
}

const MenuHeading = ({ label }: MenuHeadingProps) => {
  return <li className={style.menuHeading}>{label}</li>
}

export const Menu = () => {
  return (
    <menu className={style.container}>
      <MenuHeading label="Sidor" />
      <MenuItem to="/" label="Info" />
      <MenuItem to="/events" label="Kalender" />
      <MenuItem to="/members" label="Blåsbasen" />

      <MenuHeading label="Information" />
      <MenuItem to="/informationChannels" label="Informationskanaler" />
      <MenuItem to="/" label="Stadgar" />
      <MenuItem to="/" label="Wiki" />

      <MenuHeading label="Musik" />
      <MenuItem to="/" label="Notarkiv" />
      <MenuItem to="/" label="Sing-a-long" />
      <MenuItem to="/" label="Inspelningar" />

      <MenuHeading label="Dans" />
      <MenuItem to="/" label="Aktiva danser" />
      <MenuItem to="/" label="Gamla danser" />

      <MenuHeading label="Bilder" />
      <MenuItem to="/" label="Galleriet" />

      <MenuHeading label="Övrigt" />
      <MenuItem to="/" label="Integritetspolicy" />
    </menu>
  )
}
