from events import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"", views.EventViewSet)

# TODO: Move this to the member app when it is created
member_router = routers.DefaultRouter()
member_router.register(r"", views.MemberViewSet)
