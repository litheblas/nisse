from members.serializers import MemberSerializer
from rest_framework import viewsets

from .models import Member


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    # permission_classes = [permissions.IsAuthenticated]
