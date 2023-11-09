from events.models import Event
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
            "event_type",
        ]
