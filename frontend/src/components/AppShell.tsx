import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

import style from './styling/AppShell.module.css'

export const AppShell = () => {
  return (
    <>
      <div className={style.container}>
        <Header />
        <div className={style.pageContainer}>
          <div className={style.pageContent}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
