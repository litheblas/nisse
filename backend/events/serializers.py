from events.models import Event
from members.serializers import AttendeeSerializer, DynamicFieldsModelSerializer
from rest_framework import serializers


class EventSerializer(DynamicFieldsModelSerializer):
    creator = serializers.StringRelatedField(read_only=True)

    attendees = AttendeeSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            "attendees",
            "creator",
            "description",
            "end_time",
            "id",
            "location",
            "full_day",
            "name",
            "start_time",
            "event_type",
        ]

    def validate(self, data):
        """Validation for serializer is made here. A temp instance of Event is created
        to run the Event.clean() method."""
        instance = Event(**data)
        instance.clean()
        return data
