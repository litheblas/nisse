from django.urls import include, path
from events import views
from rest_framework import routers

from .views import EventFeed

router = routers.DefaultRouter()
router.register(r"", views.EventViewSet)
urlpatterns = [
    path("", include(router.urls)),
    path("calendar/<int:calendar>/events.ics", EventFeed()),
]
