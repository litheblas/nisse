import { Link } from 'react-router-dom'
import logo from 'src/assets/logo-blue.svg'
import { PopoverMenu } from './PopoverMenu'
import style from './styling/Header.module.css'

export const Header = () => {
  return (
    <header className={style.container}>
      <div className={style.content}>
        <Link to="/">
          <img className={style.logo} src={logo} />
        </Link>
        <div className={style.menu}>
          <PopoverMenu />
        </div>
      </div>
    </header>
  )
}
