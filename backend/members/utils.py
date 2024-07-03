import traceback
from json import loads
from os import getenv
from time import time

from requests import request

ENDPOINT = getenv("NISSE_KEYCLOAK_SERVER_URL")


def get_keycloak_service_token():
    try:
        # Generate access token using client secret
        req = request(
            url=ENDPOINT + "/realms/litheblas/protocol/openid-connect/token",
            method="POST",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data={
                "grant_type": "client_credentials",
                "client_id": getenv("NISSE_KEYCLOAK_SERVICE_ACCOUNT"),
                "client_secret": getenv(
                    "NISSE_KEYCLOAK_SERVICE_SECRET"  # Found in clients -> nisse-service-account -> credentials
                ),
            },
        )
        if req.status_code != 200:
            raise PermissionError(f"Authentication failed ({req.status_code})")

    except PermissionError:
        print(traceback.print_exc())
        return None

    return loads(req.text).get("access_token")


def create_keycloak_user():
    """Create a Keycloak user."""

    token = get_keycloak_service_token()
    if not token:
        return

    return request(
        # Has to be a partial import, or else we can't specify an ID
        url=ENDPOINT + "/admin/realms/litheblas/partialImport",
        method="POST",
        headers={
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        json={
            "users": [
                # TODO: Add function parameters and insert below
                {
                    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
                    "createdTimestamp": str(  # Current timestamp written in milliseconds
                        round(time() * 1000)
                    ),
                    "username": "username",
                    "enabled": "true",
                    "totp": "false",  # Time Based One-Time Password, disabled
                    "emailVerified": "false",
                    "firstName": "firstName",
                    "lastName": "lastName",
                    "email": "email@email.com",
                    "credentials": [],
                    "disableableCredentialTypes": [],
                    "requiredActions": [],  # Maybe require an action like update password?
                    "realmRoles": ["default-roles-litheblas"],
                    "clientRoles": {"nisse": ["user"]},
                    "notBefore": 0,
                    "groups": [],
                }
            ]
        },
    )
