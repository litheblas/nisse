from django_keycloak_auth.keycloak import KeycloakConnect
from django_keycloak_auth.middleware import KeycloakMiddleware
from nisse_backend.settings import KEYCLOAK_CONFIG


class NisseKeycloakConnect(KeycloakConnect):
    def decode(self, token, audience=None, options=None, raise_exception=True):
        return super().decode(
            token=token,
            audience=KEYCLOAK_CONFIG.get("KEYCLOAK_AUDIENCE", audience),
            options=options,
            raise_exception=raise_exception,
        )


class NisseKeycloakMiddleware(KeycloakMiddleware):
    def __init__(self, get_response):
        super().__init__(get_response=get_response)
        self.keycloak = NisseKeycloakConnect(
            server_url=self.keycloak_config.server_url,
            realm_name=self.keycloak_config.realm,
            client_id=self.keycloak_config.client_id,
            local_decode=self.keycloak_config.local_decode,
            client_secret_key=self.keycloak_config.client_secret_key,
        )
