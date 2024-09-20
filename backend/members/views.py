from django.shortcuts import get_object_or_404
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from members.serializers import (
    EngagementSerializer,
    EngagementTypeSerializer,
    MemberSerializer,
    MembershipSerializer,
    MembershipTypeSerializer,
)
from nisse_backend.settings import KEYCLOAK_NISSE_DEFAULT_ROLES
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from .models import Engagement, EngagementType, Member, Membership, MembershipType


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    parser_classes = [MultiPartParser]
    # permission_classes = [permissions.IsAuthenticated]
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES
    # TODO: Change so only admins can do certain stuff

    """All these are overritten because we want to have an endpoint that allows only some of the fields to be retrieved"""

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(
            queryset, many=True, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        member = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(
            member, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)


class EngagementViewSet(viewsets.ModelViewSet):
    queryset = Engagement.objects.all()
    serializer_class = EngagementSerializer
    parser_classes = [MultiPartParser]
    # permission_classes = [permissions.IsAuthenticated]
    # TODO: Change so only admins can do certain stuff
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    """All these are overritten because we want to have an endpoint that allows only some of the fields to be retrieved"""

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(
            queryset, many=True, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        engagement = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(
            engagement, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)


class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
    parser_classes = [MultiPartParser]
    # permission_classes = [permissions.IsAuthenticated]
    # TODO: Change so only admins can do certain stuff
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    """All these are overritten because we want to have an endpoint that allows only some of the fields to be retrieved"""

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def list(self, request):
        queryset = self.get_queryset()
        serializer = EngagementSerializer(
            queryset, many=True, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        membership = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(
            membership, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)


class MembershipTypeViewSet(viewsets.ModelViewSet):
    queryset = MembershipType.objects.all()
    serializer_class = MembershipTypeSerializer
    parser_classes = [MultiPartParser]
    # permission_classes = [permissions.IsAuthenticated]
    # TODO: Change so only admins can do certain stuff
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    """All these are overritten because we want to have an endpoint that allows only some of the fields to be retrieved"""

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(
            queryset, many=True, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        membershiptype = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(
            membershiptype, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)


class EngagementTypeViewSet(viewsets.ModelViewSet):
    queryset = EngagementType.objects.all()
    serializer_class = EngagementTypeSerializer
    parser_classes = [MultiPartParser]
    # permission_classes = [permissions.IsAuthenticated]
    # TODO: Change so only admins can do certain stuff
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    """All these are overritten because we want to have an endpoint that allows only some of the fields to be retrieved"""

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(
            queryset, many=True, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        membershiptype = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(
            membershiptype, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)
