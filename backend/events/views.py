from django.shortcuts import get_object_or_404
from django_ical.views import ICalFeed
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from events.serializers import EventSerializer
from nisse_backend.settings import KEYCLOAK_NISSE_DEFAULT_ROLES
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Event
from .utils import CalendarTypes, EventTypes


class EventFeed(ICalFeed):
    timezone = "Europe/Stockholm"
    file_name = "events.ics"

    def get_object(self, request, calendar: CalendarTypes):
        """This method returns param calendar sent in url"""
        return CalendarTypes(calendar)

    def items(self, obj: CalendarTypes):
        match obj:
            case CalendarTypes.CONCERT:
                return Event.objects.filter(event_type=EventTypes.CONCERT).order_by(
                    "-start_time"
                )
            case CalendarTypes.OFFICIAL:
                return Event.objects.exclude(event_type=EventTypes.OTHER).order_by(
                    "-start_time"
                )
            case CalendarTypes.ALL:
                return Event.objects.all().order_by("-start_time")

    def item_title(self, item):
        return item.name

    def item_description(self, item):
        return item.description

    def item_start_datetime(self, item):
        return item.start_time

    def item_end_datetime(self, item):
        return item.end_time

    def item_link(self) -> str:
        return ""

    def item_location(self, item):
        return item.location

    def item_guid(self, item):
        """Unique ID for specific event"""
        return item.id

    def product_id(self, obj):
        """Unique ID for specific calendar"""
        return "-//litheblas.org//EventFeed//" + str(obj)


class StringListSerializer(serializers.Serializer):
    members = serializers.ListField(child=serializers.CharField())


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # permission_classes = [permissions.IsAuthenticated]
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    def list(self, request):
        queryset = Event.objects.all()
        serializer = EventSerializer(
            queryset, many=True, fields=request.query_params.get("fields")
        )
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Event.objects.all()
        event = get_object_or_404(queryset, pk=pk)
        serializer = EventSerializer(event, fields=request.query_params.get("fields"))
        return Response(serializer.data)

    @extend_schema(
        request=StringListSerializer,
        description="Register attendees for the event.",
    )
    @action(detail=True, methods=["post"])
    def register_attendees(self, request, pk=None):
        event = self.get_object()
        members_to_register = request.data.get("members", [])

        for member_id in members_to_register:
            try:
                event.attendees.add(member_id)
            except Exception as e:
                return Response({"error": f"Member with id {member_id} not found: {e}"})

        return Response(
            {"message": "Attendees registered successfully"}, status=status.HTTP_200_OK
        )

    @extend_schema(
        request=StringListSerializer,
        description="Unregister attendees for the event.",
    )
    @action(detail=True, methods=["post"])
    def unregister_attendees(self, request, pk=None):
        event = self.get_object()
        members_to_unregister = request.data.get("members", [])

        for member_id in members_to_unregister:
            try:
                event.attendees.remove(member_id)
            except Exception as e:
                return Response({"error": f"Member with id {member_id} not found: {e}"})

        return Response(
            {"message": "Attendees unregistered successfully"},
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        parameters=[
            OpenApiParameter("member_id", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ],
        responses=OpenApiTypes.BOOL,
    )
    @action(detail=True, methods=["get"])
    def is_attending(self, request, pk=None):
        event = self.get_object()
        member_id_to_check = request.query_params.get("member_id", None)

        if not member_id_to_check:
            return Response(
                {"error": "Member ID is required in the query parameters."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        is_attending = event.attendees.filter(id=member_id_to_check).exists()
        return Response(is_attending, status=status.HTTP_200_OK)
