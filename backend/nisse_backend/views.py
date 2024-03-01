import os

import requests
from django.http import HttpResponse
from nisse_backend.settings import KEYCLOAK_NISSE_DEFAULT_ROLES, MEDIA_ROOT
from rest_framework.response import Response
from rest_framework.views import APIView

username = os.environ("ladan_name")
key = os.environ("ladan_key")
ip = os.environ("ladan_ip")


def serve_media(_request, file_name):
    """
    Serve a media file with the given file name.

    Args:
        _request: The HTTP request object (not used in this function).
        file_name (str): The name of the media file to be served.

    Returns:
        HttpResponse: The HTTP response containing the file content.
            If the file is found, the response will have the file content
            and the content type set to "image/png". If the file is not found,
            the response will have a JSON object with an "error" message
            and a status code of 404.
    """
    try:
        file_path = os.path.join(MEDIA_ROOT, file_name)
        with open(file_path, "rb") as file:
            return HttpResponse(file.read(), content_type="image/png")
    except FileNotFoundError:
        return Response({"error": "File not found"}, status=404)


class OpenDoor(APIView):
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    def post(self, request, format=None):
        """
        Sends a HTTP-request through a reverse ssh-tunnel to lådan lådan in Blåsrummet to open the door
        """
        resp = requests.post(url="localhost:5000", auth=(username, key), timeout=180)
        if resp == 200:
            return Response(status=200)
        else:
            return Response({"error": "could not open door"}, status=500)
