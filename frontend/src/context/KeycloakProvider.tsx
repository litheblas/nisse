import CircularProgress from '@mui/material/CircularProgress'
import Keycloak from 'keycloak-js'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { OpenAPI } from '../api'
import { KeycloakContext } from './KeycloakContext'
import style from './KeycloakProvider.module.css'

async function initKeycloak() {
  const keycloak = new Keycloak({
    url: import.meta.env.VITE_NISSE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_NISSE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_NISSE_KEYCLOAK_CLIENT_ID,
  })

  try {
    const authenticated = await keycloak.init({ onLoad: 'login-required' })

    await keycloak.loadUserProfile()

    console.log(
      `User is ${authenticated ? 'authenticated' : 'not authenticated'}`
    )
  } catch (error) {
    console.error('Failed to initialize adapter:', error)
  }
  return keycloak
}

interface KeycloakProviderProps {
  children: ReactNode
}

const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
  const [keycloakInstance, setKeycloakInstance] = useState<Keycloak>()
  const didInit = useRef(false)

  useEffect(() => {
    // Needed to prevent infinite loop
    // https://github.com/keycloak/keycloak/issues/19452
    if (didInit.current) {
      return
    }
    didInit.current = true

    const initialize = async () => {
      if (!keycloakInstance) {
        setKeycloakInstance(await initKeycloak())
      }
    }
    initialize().catch(console.error)
  }, [keycloakInstance])

  if (!keycloakInstance) {
    return (
      <div className={style.loadingSpinnerContainer}>
        <CircularProgress color="inherit" />
        <h1>Loggar in</h1>
      </div>
    )
  }

  const logout = () => {
    keycloakInstance
      .logout({
        redirectUri: import.meta.env.VITE_NISSE_LOGOUT_REDIRECT_URL,
      })
      .catch(console.error)
  }

  const getToken = async () => {
    await keycloakInstance.updateToken(5)
    return keycloakInstance.token!
  }

  OpenAPI.TOKEN = getToken

  return (
    <KeycloakContext.Provider value={{ keycloakInstance, logout }}>
      {children}
    </KeycloakContext.Provider>
  )
}

export default KeycloakProvider
