import uuid

from django.db import models
from members.models import Member

from .utils import EventTypes

# Create your models here.


class Event(models.Model):
    creator = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_day = models.BooleanField()
    location = models.CharField(max_length=100)
    end_time = models.DateTimeField()
    name = models.CharField(max_length=280)
    start_time = models.DateTimeField()
    event_type = models.IntegerField(
        choices=EventTypes.choices(), default=EventTypes.OTHER
    )
    attendees = models.ManyToManyField(Member, related_name="+", blank=True)
    description = models.TextField(blank=True)

    objects = models.Manager()

    def clean(self) -> None:
        """This is used in Django.admin and serializer"""
        from django.core.exceptions import ValidationError

        if self.start_time > self.end_time:
            raise ValidationError("Event can't start after it ends")
