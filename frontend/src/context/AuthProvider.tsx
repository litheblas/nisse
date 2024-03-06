import CircularProgress from '@mui/material/CircularProgress'
import Keycloak from 'keycloak-js'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { OpenAPI } from '../api'
import { KEYCLOAK_ADMIN_ROLE_NAME } from '../constants/Constants'
import { AuthContext } from './AuthContext'
import style from './AuthProvider.module.css'

async function initKeycloak() {
  const keycloak = new Keycloak({
    url: import.meta.env.VITE_NISSE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_NISSE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_NISSE_KEYCLOAK_CLIENT_ID,
  })

  try {
    const authenticated = await keycloak.init({ onLoad: 'login-required' })

    console.log(
      `User is ${authenticated ? 'authenticated' : 'not authenticated'}`
    )
    if (authenticated) {
      await keycloak.loadUserProfile()
    }
  } catch (error) {
    console.error('Failed to initialize adapter:', error)
  }
  return keycloak
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [keycloakInstance, setKeycloakInstance] = useState<Keycloak>()
  const didInit = useRef(false)

  useEffect(() => {
    // Bypass login for development
    if (import.meta.env.VITE_NISSE_BYPASS_LOGIN === 'true') {
      return
    }

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

  // Bypass login for development
  if (import.meta.env.VITE_NISSE_BYPASS_LOGIN === 'true') {
    // eslint-disable-next-line @typescript-eslint/require-await
    OpenAPI.TOKEN = async () => ''
    return (
      <AuthContext.Provider
        value={{
          getUserInfo: () => ({
            id: '00000000-0000-0000-0000-000000000000',
            username: 'test-user',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
          }),
          isAdmin: () =>
            import.meta.env.VITE_NISSE_BYPASS_LOGIN_IS_ADMIN === 'true',
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          logout: () => {},
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }

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

  const getUserInfo = () => {
    return keycloakInstance.profile!
  }

  const isAdmin = () => {
    return keycloakInstance.hasRealmRole(KEYCLOAK_ADMIN_ROLE_NAME)
  }

  const getToken = async () => {
    await keycloakInstance.updateToken(5)
    return keycloakInstance.token!
  }

  OpenAPI.TOKEN = getToken

  return (
    <AuthContext.Provider value={{ getUserInfo, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
