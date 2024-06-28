import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Snackbar } from '@mui/material'
import { ReactNode, useState } from 'react'
import { SnackbarContext } from './SnackbarContext'

interface SnackbarProviderProps {
  children: ReactNode
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const showSnackbar = (status: string) => {
    setSnackbarOpen(true)
    setSnackbarMessage(status)
  }

  const closeSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  const action = (
    <IconButton onClick={closeSnackbar}>
      <FontAwesomeIcon icon={faClose} color="white" />
    </IconButton>
  )

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        action={action}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      />
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
