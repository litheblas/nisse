from django.db import models
from .utils import EventTypes
import uuid

# Create your models here.


class Member(models.Model):
    "Member stub"
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class Event(models.Model):
    creator = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    event_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    location = models.CharField(max_length=100)
    end_time = models.DateTimeField()
    event_name = models.CharField(max_length=280)
    start_time = models.DateTimeField()
    event_type = models.IntegerField(
        choices=EventTypes.choices(), default=EventTypes.OTHER
    )
    event_attendees = models.ManyToManyField(Member, related_name="+", blank=True)
    event_descritption = models.TextField(blank=True)
