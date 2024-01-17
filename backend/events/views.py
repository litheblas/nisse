from django_ical.views import ICalFeed
from events.serializers import EventSerializer
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


"""
*   body = {
*       event: id,
*       members: [id1,id2,id3]
*       }
"""


class Register(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        data = request.data
        event = Event.objects.get(pk=data["event"])
        for member_id in data["members"]:
            event.attendees.add(member_id)
        return Response("")


class UnRegister(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        data = request.data
        event = Event.objects.get(pk=data["event"])
        for member_id in data["members"]:
            event.attendees.remove(member_id)
        return Response("")
