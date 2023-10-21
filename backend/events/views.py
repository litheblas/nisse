from django.shortcuts import render
from .models import Event
from .utils import EventTypes, CalendarTypes
from django_ical.views import ICalFeed

# Create your views here.
class EventFeed(ICalFeed):
    timezone = 'Europe/Stockholm'
    file_name = "events.ics"
    calendar_type = CalendarTypes.ALL
    product_id = '-//litheblas.org//EventFeed//'



    def __init__(self,request, calendar: CalendarTypes):
        self.calendar_type = calendar
        print(calendar)
        product_id = '-//litheblas.org//EventFeed//' + str(calendar)

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
