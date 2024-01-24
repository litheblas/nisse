from django.shortcuts import get_object_or_404
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from members.serializers import MemberSerializer
from nisse_backend.settings import KEYCLOAK_NISSE_DEFAULT_ROLES
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Member


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    # permission_classes = [permissions.IsAuthenticated]
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def list(self, request):
        queryset = Member.objects.all()
        serializer = MemberSerializer(
            queryset, many=True, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def retrieve(self, request, pk=None):
        queryset = Member.objects.all()
        member = get_object_or_404(queryset, pk=pk)
        serializer = MemberSerializer(member, fields=request.query_params.get("fields"))
        return Response(serializer.data)
