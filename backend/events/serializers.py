from events.models import Event, Member
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "attendees",
            "creator",
            "description",
            "end_time",
            "id",
            "location",
            "name",
            "start_time",
            "type",
        ]


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "id",
        ]
