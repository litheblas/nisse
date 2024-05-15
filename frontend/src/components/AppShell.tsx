import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

import { useState } from 'react'
import { DoorSnackbar } from './DoorSnackbar'
import { Menu } from './Menu'
import style from './styling/AppShell.module.css'

export const AppShell = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const handleClick = (status: string) => {
    setOpen(true)
    setMessage(status)
  }

  return (
    <>
      <div className={style.container}>
        <Header />
        <div className={style.pageContainer}>
          <div className={style.pageContent}>
            <div className={style.sidebarMenu}>
              <Menu onOpen={(status: string) => handleClick(status)} />
              <DoorSnackbar
                open={open}
                message={message}
                closeSnackbar={() => {
                  setOpen(false)
                }}
              />
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
