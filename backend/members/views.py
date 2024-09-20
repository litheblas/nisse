from django.shortcuts import get_object_or_404
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from members.serializers import MemberSerializer,EngagementSerializer,MembershipSerializer
from nisse_backend.settings import KEYCLOAK_NISSE_DEFAULT_ROLES
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from .models import Member,Engagement,Membership


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    parser_classes = [MultiPartParser]
    # permission_classes = [permissions.IsAuthenticated]
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES
    # TODO: Change so only admins can do certain stuff
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

class EngagementViewSet(viewsets.ModelViewSet):
    queryset = Engagement.objects.all()
    serializer_class = EngagementSerializer
    parser_classes = [MultiPartParser]
    # permission_classes = [permissions.IsAuthenticated]
    # TODO: Change so only admins can do certain stuff
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def list(self, request):
        queryset = Engagement.objects.all()
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
        queryset = Engagement.objects.all()
        queryset = Member.objects.all()
        engagement = get_object_or_404(queryset, pk=pk)
        serializer = EngagementSerializer(engagement, fields=request.query_params.get("fields"))
        return Response(serializer.data)

    def create(self, request):
        return Response()

    @extend_schema(
        request=EngagementSerializer,
        responses={200: EngagementSerializer},
    )
    def update(self, request, ):
        return Response()

    @extend_schema(
        request=EngagementSerializer,
        responses={200: EngagementSerializer},
    )
    def partial_update(self, request):
        super.partial_upda
        return Response()

class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
    parser_classes = [MultiPartParser]
    # permission_classes = [permissions.IsAuthenticated]
    # TODO: Change so only admins can do certain stuff
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    @extend_schema(
        parameters=[
            OpenApiParameter("fields", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ]
    )
    def list(self, request):
        queryset = Engagement.objects.all()
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
        queryset = Membership.objects.all()
        queryset = Member.objects.all()
        membership = get_object_or_404(queryset, pk=pk)
        serializer = EngagementSerializer(membership, fields=request.query_params.get("fields"))
        return Response(serializer.data)

    @extend_schema(
        request=MembershipSerializer,
        responses={201: MembershipSerializer},
    )
    def create(self, request, *args, **kwargs):
        serializer = MembershipSerializer(data = request.data, fields = request.query_params.get("fields"))
        Memb
        return Response()

    @extend_schema(
        request=MembershipSerializer,
        responses={200: MembershipSerializer},
    )
    def update(self, request):
        return Response()

    @extend_schema(
        request=MembershipSerializer,
        responses={200: MembershipSerializer},
    )
    def partial_update(self, request, *args, **kwargs):
        return Response()
