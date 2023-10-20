from enum import IntEnum
from models import Event
from django_ical.views import ICalFeed

class EventTypes(IntEnum):
    CONCERT = 1
    OFFICIAL = 2
    OTHER = 3

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]


class CalendarTypes(IntEnum):
    CONCERT = 1
    OFFICIAL = 2
    ALL = 3

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]

class EventFeed(ICalFeed):
    product_id = '-//litheblas.org//EventFeed//'
    timezone = 'Europe/Stockholm'
    file_name = "events.ics"
    calendar_type = EventTypes.CONCERT
    def __init__(self, calendar_type: CalendarTypes):
        super()
        self.calendar_type = calendar_type



    def items(self):
        match self.calendar_type:
            case CalendarTypes.CONCERT:
                return Event.objects.filter(event_type=EventTypes.CONCERT)
            case CalendarTypes.OFFICIAL:
                return Event.objects.exclude(event_type=EventTypes.OTHER)
            case CalendarTypes.ALL:
                return Event.objects.all().order_by('-start_time')

    def item_title(self, item):
        return item.event_name

    def item_description(self, item):
        return item.event_description

    def item_start_datetime(self, item):
        return item.start_time
