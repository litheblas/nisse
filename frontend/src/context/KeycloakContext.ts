import Keycloak from 'keycloak-js'
import { createContext, useContext } from 'react'

interface KeycloakContextState {
  keycloakInstance: Keycloak
  logout: () => void
}

export const KeycloakContext = createContext<KeycloakContextState>(null!)

export const useKeycloak = () => useContext(KeycloakContext)
