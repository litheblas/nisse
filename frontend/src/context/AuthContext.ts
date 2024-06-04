import { createContext, useContext } from 'react'

interface AuthContextState {
  getUserInfo: () => Keycloak.KeycloakProfile
  isAdmin: () => boolean
  logout: () => void
  getToken: () => Promise<string>
}

export const AuthContext = createContext<AuthContextState>(null!)

export const useAuth = () => useContext(AuthContext)
