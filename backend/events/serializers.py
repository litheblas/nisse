from events.models import Event, Member
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "creator",
            "event_id",
            "location",
            "end_time",
            "event_name",
            "start_time",
            "event_type",
            "event_attendees",
            "event_descritption",
        ]


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "id",
        ]
