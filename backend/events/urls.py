from django.urls import include, path
from events import views
from rest_framework import routers

from .views import EventFeed, Register, UnRegister

router = routers.DefaultRouter()
router.register(r"", views.EventViewSet)
urlpatterns = [
    path("", include(router.urls)),
    path("calendar/<int:calendar>/events.ics", EventFeed()),
    path("register", Register.as_view()),
    path("unregister", UnRegister.as_view()),
]
