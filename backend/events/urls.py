from django.urls import path
from events import views
from rest_framework import routers

from .views import EventFeed

router = routers.DefaultRouter()
router.register(r"", views.EventViewSet)
urlpatterns = [
    path("", EventFeed),
    path("calendar/<int:calendar>/events.ics", EventFeed()),
]


# TODO: Move this to the member app when it is created
member_router = routers.DefaultRouter()
member_router.register(r"", views.MemberViewSet)
