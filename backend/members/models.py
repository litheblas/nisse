import os
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit
from phonenumber_field.modelfields import PhoneNumberField

AVATAR_LOCATION = "avatars"
PLACEHOLDER_IMAGE = "placeholderImage_400x400.png"
PLACEHOLDER_IMAGE_PATH = os.path.join(AVATAR_LOCATION, PLACEHOLDER_IMAGE)


def member_profile_picture_path(instance, filename):
    # Produces a path for the image file for profile picture
    # makes filename to "username.FILE_TYPE"
    filetype_index = filename.rfind(".")
    file_end = filename[filetype_index:]
    new_filename = str(instance.id) + file_end
    return os.path.join(AVATAR_LOCATION, new_filename)


class Member(AbstractUser):
    """A LiTHe Blas internal sites member"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nickname = models.CharField(blank=True, max_length=200)
    birth_date = models.DateField(blank=True, null=True)
    liu_id = models.CharField(blank=True, max_length=8)
    pronouns = models.CharField(blank=True, max_length=20)
    street_address = models.CharField(blank=True, max_length=50)
    postal_code = models.CharField(blank=True, max_length=10)
    postal_town = models.CharField(blank=True, max_length=50)
    postal_country = models.CharField(blank=True, max_length=50)
    phone_number_1 = PhoneNumberField(blank=True)
    phone_number_2 = PhoneNumberField(blank=True)
    phone_number_3 = PhoneNumberField(blank=True)
    arbitrary_text = models.TextField(blank=True)
    national_id = models.CharField(blank=True, max_length=4)
    profile_picture = ProcessedImageField(
        blank=True,
        default=PLACEHOLDER_IMAGE_PATH,
        upload_to=member_profile_picture_path,
        processors=[
            ResizeToFit(
                height=400, width=400, upscale=True, mat_color=(150, 150, 150, 0)
            )
        ],
    )

    @property
    def full_name(self) -> str:
        return (
            f'{self.first_name} "{self.nickname}" {self.last_name}'
            if self.nickname
            else f"{self.first_name} {self.last_name}"
        )

    @property
    def short_name(self) -> str:
        return (
            f"{self.nickname}"
            if self.nickname
            else f"{self.first_name} {self.last_name}"
        )

    @property
    def active_period(self) -> str:
        memberships = Membership.objects.filter(member=self).order_by("start")
        if not memberships:
            return ""
        # Below is an implementation which will guarantee the correct start/end year
        # in edge cases where someone is accepted on several instruments at the same time,
        # or if the Memberships are assigned incorrectly.
        # We can easily ensure correct Membership assignments with new members, but
        # there's lots of weird stuff going on in the old database...
        # TODO: remove comments or replace implementation once we try on old data

        # start = memberships.first().start.year
        # memberships = memberships.order_by(models.F("end").asc(nulls_last=True))
        # end = memberships.last().end.year if memberships.last().end else None
        # return f"{start}–{end}" if end else f"{start}–"
        return (
            f"{memberships.first().start.year}–{memberships.last().end.year}"
            if memberships.last().end
            else f"{memberships.first().start.year}–"
        )

    def clean(self) -> None:
        """This is used in Django.admin and serializer"""
        super.clean()
        from django.core.exceptions import ValidationError

        if self.username == "":
            raise ValidationError("username cannot be empty")

    def __str__(self):
        return self.full_name


class EngagementType(models.Model):
    """Titles such as Dictator, Skrivkunig or Luciageneral"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Engagement(models.Model):
    """A EngagementType-Member relation for joining those two together"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    engagementType = models.ForeignKey(
        EngagementType, null=True, on_delete=models.SET_NULL
    )
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    start = models.DateField()
    end = models.DateField(blank=True, null=True)

    def __str__(self):
        return (
            f"{self.member.full_name}, {self.engagementType} ({self.start}–{self.end})"
            if self.end
            else f"{self.member.full_name}, {self.engagementType} ({self.start}–)"
        )


class MembershipType(models.Model):
    """Membershiptype such as Clarinett, Ballet or Saxophone"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    instrument = models.CharField(max_length=50)

    def __str__(self):
        return self.instrument


class Membership(models.Model):
    """A MembershipType-Member relation for joining those two together"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    membershipType = models.ForeignKey(
        MembershipType, null=True, on_delete=models.SET_NULL
    )
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    start = models.DateField()
    end = models.DateField(blank=True, null=True)
    is_trial = models.BooleanField()

    def __str__(self):
        return (
            f"{self.member.full_name}, {self.membershipType} ({self.start}–{self.end})"
            if self.end
            else f"{self.member.full_name}, {self.membershipType} ({self.start}–)"
        )
