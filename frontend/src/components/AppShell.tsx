import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

import { useState } from 'react'
import { DoorSnackbar } from './DoorSnackbar'
import { Menu } from './Menu'
import style from './styling/AppShell.module.css'

export const AppShell = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const handleClick = (status: string) => {
    setSnackbarOpen(true)
    setSnackbarMessage(status)
  }

  return (
    <>
      <div className={style.container}>
        <Header />
        <div className={style.pageContainer}>
          <div className={style.pageContent}>
            <div className={style.sidebarMenu}>
              <Menu onDoorOpen={(status: string) => handleClick(status)} />
              <DoorSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                closeSnackbar={() => {
                  setSnackbarOpen(false)
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
