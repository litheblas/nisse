from django_keycloak_auth.keycloak import KeycloakConnect
from django_keycloak_auth.middleware import KeycloakMiddleware
from nisse_backend.settings import KEYCLOAK_CONFIG, KEYCLOAK_NISSE_DEFAULT_ROLES
from rest_framework.response import Response
from rest_framework.views import APIView


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


"""
This class is used to authorize the user. It is used to check if the user has the required roles to access the endpoint.
Any new endpoint that requires authorization should also add the required roles in the keycloak_roles variable.
If this is note done the endpoint will be accessible to all users, even if they are not logged in.
"""


class Authorize(APIView):
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    def get(self, request, format=None):
        return Response(status=200)
