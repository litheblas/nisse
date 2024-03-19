import os
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

# imagekit requires newer fork Pillow not the default package PIL
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit
from phonenumber_field.modelfields import PhoneNumberField

AVATAR_LOCATION = "avatars"
PLACEHOLDER_IMAGE = "placeholderImage_400x400.png"
PLACEHOLDER_IMAGE_PATH = os.path.join(AVATAR_LOCATION, PLACEHOLDER_IMAGE)


def member_profile_picture_path(instance, filename):
    # Produces a path for the image file for profile picture
    # makes filename to "username.FILE_TYPE"
    # Maybe save old image as something else somwhere else?
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
    # These needs to be here for backwards komp-ability (-öjj!)
    phone_number_2 = PhoneNumberField(blank=True)
    phone_number_3 = PhoneNumberField(blank=True)
    ############################################
    arbitrary_text = models.TextField(blank=True)
    national_id = models.CharField(blank=True, max_length=4)
    # The django model only stores the path to the profile picture, not the file it self
    # The image is served by something else such as nginx
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

    def set_active_period(self):
        memberships = Membership.objects.filter(member=self).order_by("start")
        if not memberships:
            self.active_period = ""
            self.save()
            return

        start = memberships.first().start.year
        memberships = memberships.order_by(models.F("end").asc(nulls_last=True))
        end = memberships.last().end.year if memberships.last().end else None
        self.active_period = f"{start}–{end}" if end else f"{start}–"
        self.save()

    active_period = models.CharField(blank=True, max_length=9, editable=False)

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
    def real_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    @property
    def complete_adress(self) -> str:
        return (
            f"{self.street_address}, {self.postal_code} {self.postal_town}, {self.postal_country}"
            if self.street_address
            and self.postal_code
            and self.postal_town
            and self.postal_country
            else ""
        )

    def clean(self) -> None:
        """This is used in Django.admin and serializer"""
        super().clean()
        from django.core.exceptions import ValidationError

        if self.username == "":
            raise ValidationError("username cannot be empty")

    @property
    def memberships(self):
        memberships = Membership.objects.filter(member=self).order_by("start")
        formatted_memberships = []

        for membership in memberships:
            formatted_membership = {
                "id": membership.id,
                "member_name": membership.member.full_name,
                "membership_type": str(membership.membershipType),
                "start_date": membership.start,
                "end_date": membership.end if membership.end else None,
            }
            formatted_memberships.append(formatted_membership)

        return formatted_memberships

    @property
    def engagements(self):
        engagements = Engagement.objects.filter(member=self).order_by("start")
        formatted_engagements = []

        for engagement in engagements:
            formatted_engagement = {
                "id": engagement.id,
                "member_name": engagement.member.full_name,
                "engagement_type": str(engagement.engagementType),
                "start_date": engagement.start,
                "end_date": engagement.end if engagement.end else None,
            }
            formatted_engagements.append(formatted_engagement)

        return formatted_engagements

    def __str__(self):
        return self.full_name


class GrasMembership(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    member = models.OneToOneField(Member, null=False, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(status__exact="", status_date__isnull=False)
                | (~models.Q(status__exact="") & models.Q(status_date__isnull=True)),
                name="grasstatus",
            )
        ]

    class StatusChoices(models.TextChoices):
        LIFETIME = "L", _("Lifetime")
        UNSURE = "U", _("Unsure")
        NEW = "N", _("New")

    status = models.CharField(
        max_length=1,
        blank=True,
        choices=StatusChoices,
        default="",
    )

    status_date = models.DateField(null=True, blank=True)


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
