import logo from 'src/assets/logo-blue.svg'
import style from './styling/Header.module.css'

export const Header = () => {
  return (
    <header className={style.container}>
      <div className={style.content}>
        <a href="/">
          <img className={style.logo} src={logo} />
        </a>
        <button className={style.logOutButton}>Logga ut</button>
      </div>
    </header>
  )
}
