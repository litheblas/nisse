from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

router.register(r"", views.MemberViewSet)
router.register(r"membership", views.MembershipViewSet)
router.register(r"membershiptype", views.MembershipTypeViewSet)
router.register(r"engagement", views.EngagementViewSet)
router.register(r"engagementtype", views.EngagementTypeViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
