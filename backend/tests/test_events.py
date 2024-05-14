from datetime import datetime, timedelta, timezone

from django.core.exceptions import ValidationError
from django.test import TestCase

from .factories import EventFactory


class EventsTestCase(TestCase):
    def test_event_creation(self):
        event = EventFactory()
        event.full_clean()
        event.save()

    def test_events_constraints(self):
        event = EventFactory(
            start_time=datetime.now(tz=timezone.utc),
            end_time=datetime.now(tz=timezone.utc) - timedelta(hours=1),
        )
        with self.assertRaises(ValidationError):
            event.full_clean()
