import traceback
from json import loads
from os import getenv
from time import time

from requests import request

ENDPOINT = getenv("NISSE_KEYCLOAK_SERVER_URL")
REALM = getenv("NISSE_KEYCLOAK_REALM")


def get_keycloak_service_token():
    try:
        # Generate access token using client secret
        req = request(
            url=ENDPOINT + "/realms/" + REALM + "/protocol/openid-connect/token",
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


def create_keycloak_users(members):
    """Export members to Keycloak."""

    members_json = []
    for member in members:
        members_json.append(
            {
                # User values
                "id": str(member.id),
                "username": member.username,
                "firstName": member.first_name,
                "lastName": member.last_name,
                "email": member.email,
                "attributes": (  # Maybe skip attribute nickname, as we would need to update Keycloak each time we update a nickname in NISSE
                    # Not sure if MediaWiki expects a nickname
                    {"nickname": [member.nickname]}
                    if member.nickname != ""
                    else {}
                ),
                # Static values
                "createdTimestamp": str(  # Current timestamp written in milliseconds
                    round(time() * 1000)
                ),
                "enabled": "true",
                "totp": "false",  # Time Based One-Time Password, disabled
                "emailVerified": "false",
                "credentials": [],
                "disableableCredentialTypes": [],
                "requiredActions": [],
                "realmRoles": ["default-roles-litheblas"],
                "clientRoles": {"nisse": ["user"]},
                "notBefore": 0,
                "groups": [],
            }
        )

    token = get_keycloak_service_token()
    if not token:
        return

    return request(
        # Has to be a partial import, or else we can't specify an ID
        url=ENDPOINT + "/admin/realms/" + REALM + "/partialImport",
        method="POST",
        headers={
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        json={"users": members_json},
    )


def get_keycloak_users():
    """Get all Keycloak users and their attributes."""

    token = get_keycloak_service_token()
    if not token:
        return

    return request(
        url=ENDPOINT + "/admin/realms/" + REALM + "/users",
        method="GET",
        headers={
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
    )
