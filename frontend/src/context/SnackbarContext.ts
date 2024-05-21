import { createContext, useContext } from 'react'

interface SnackbarContextState {
  showSnackbar: (message: string) => void
}

export const SnackbarContext = createContext<SnackbarContextState>(null!)

export const useSnackbar = () => useContext(SnackbarContext)
