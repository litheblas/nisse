from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

router.register(r"", views.MemberViewSet)
router.register(r"", views.MembershipViewSet)
router.register(r"", views.MembershipTypeViewSet)

router.register(r"", views.EngagementViewSet)
router.register(r"", views.EngagementTypeViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
