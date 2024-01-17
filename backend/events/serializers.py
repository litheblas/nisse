from events.models import Event
from members.serializers import DynamicFieldsModelSerializer


class EventSerializer(DynamicFieldsModelSerializer):
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

    def validate(self, data):
        """Validation for serializer is made here. A temp instance of Event is created
        to run the Event.clean() method."""
        instance = Event(**data)
        instance.clean()
        return data
