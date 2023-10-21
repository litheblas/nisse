from django_ical.views import ICalFeed

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
        return item.event_name

    def item_description(self, item):
        return item.event_descritption

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
        return item.event_id

    def product_id(self, obj):
        """Unique ID for specific calendar"""
        return "-//litheblas.org//EventFeed//" + str(obj)
