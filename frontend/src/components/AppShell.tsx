import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

import { Menu } from './Menu'
import style from './styling/AppShell.module.css'

export const AppShell = () => {
  return (
    <>
      <div className={style.container}>
        <Header />
        <div className={style.pageContainer}>
          <div className={style.pageContent}>
            <div className={style.sidebarMenu}>
              <Menu />
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
