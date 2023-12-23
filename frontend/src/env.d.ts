/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NISSE_BACKEND_API_URL: string
  readonly VITE_NISSE_KEYCLOAK_URL: string
  readonly VITE_NISSE_KEYCLOAK_REALM: string
  readonly VITE_NISSE_KEYCLOAK_CLIENT_ID: string
  readonly VITE_NISSE_LOGOUT_REDIRECT_URL: string
  readonly VITE_NISSE_BYPASS_LOGIN: string
  readonly VITE_NISSE_BYPASS_LOGIN_IS_ADMIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
