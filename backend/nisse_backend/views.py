import os

from django.http import HttpResponse
from nisse_backend.settings import MEDIA_ROOT
from rest_framework.response import Response


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
