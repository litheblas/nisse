from django.db.models.base import Model
#from django.shortcuts import render
from .models import Event
from .utils import EventTypes, CalendarTypes
from django_ical.views import ICalFeed

# Create your views here.
class EventFeed(ICalFeed):
    timezone = 'Europe/Stockholm'
    file_name = "events.ics"

    def get_object(self, request, calendar):
        return CalendarTypes(calendar)

    def items(self, obj):
        match obj:
            case CalendarTypes.CONCERT:
                return Event.objects.filter(event_type=EventTypes.CONCERT)
            case CalendarTypes.OFFICIAL:
                return Event.objects.exclude(event_type=EventTypes.OTHER)
            case CalendarTypes.ALL:
                 return Event.objects.all().order_by('-start_time')

    def item_title(self, item):
        return item.event_name

    def item_description(self, item):
        return item.event_descritption

    def item_start_datetime(self, item):
        return item.start_time

    def item_end_datetime(self, item):
        return item.end_time

    def item_link(self, ) -> str:
        return "www.litheblas.org"

    def product_id(self,obj):
        return "-//litheblas.org//EventFeed//" + str(obj)
