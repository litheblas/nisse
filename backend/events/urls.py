from django.urls import path
from . import views

urlpatterns = [
    path("",views.EventFeed),
    path("calendar/<int:calendar>/events.ics", views.EventFeed),
     path("calendar/events.ics", views.EventFeed)
]
