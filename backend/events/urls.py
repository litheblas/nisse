from django.urls import path
from .views import EventFeed

urlpatterns = [
    path("", views.index, name="index"),
     path("calendar/<int:calendar>/events.ics", EventFeed()),
]
