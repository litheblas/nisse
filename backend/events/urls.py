from django.urls import path
from .views import EventFeed


urlpatterns = [
     path("calendar/<int:calendar>/events.ics", EventFeed()),
]
