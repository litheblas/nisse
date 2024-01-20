from django.shortcuts import get_object_or_404
from django_ical.views import ICalFeed
from events.serializers import EventSerializer
from nisse_backend.settings import KEYCLOAK_NISSE_DEFAULT_ROLES
from rest_framework import viewsets
from rest_framework.decorators import APIView
from rest_framework.parsers import JSONParser
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


"""
*   body = {
*       event: id,
*       members: [id1,id2,id3]
*       }
"""


class Register(APIView):
    serializer_class = EventSerializer
    parser_classes = [JSONParser]
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    def post(self, request):
        data = request.data
        event = Event.objects.get(pk=data["event"])
        for member_id in data["members"]:
            event.attendees.add(member_id)
        return Response("")


class UnRegister(APIView):
    serializer_class = EventSerializer
    parser_classes = [JSONParser]
    keycloak_roles = KEYCLOAK_NISSE_DEFAULT_ROLES

    def post(self, request):
        data = request.data
        event = Event.objects.get(pk=data["event"])
        for member_id in data["members"]:
            event.attendees.remove(member_id)
        return Response("")
