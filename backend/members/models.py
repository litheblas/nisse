import os
import uuid

from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator
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
    new_filename = instance.username + file_end
    return os.path.join(AVATAR_LOCATION, new_filename)


class Member(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nickname = models.CharField(blank=True, max_length=200)
    birth_date = models.DateField(blank=True, null=True)
    liu_id = models.CharField(
        blank=True, max_length=8, validators=[MinLengthValidator(8)]
    )
    pronouns = models.CharField(blank=True, max_length=20)
    street_address = models.CharField(blank=True, max_length=50)
    postal_code = models.CharField(blank=True, max_length=10)
    postal_town = models.CharField(blank=True, max_length=50)
    postal_country = models.CharField(blank=True, max_length=50)
    phone_number_1 = PhoneNumberField(blank=True)
    phone_number_2 = PhoneNumberField(blank=True)
    phone_number_3 = PhoneNumberField(blank=True)
    arbitrary_text = models.TextField(blank=True)
    national_id = models.CharField(
        blank=True, max_length=12, validators=[MinLengthValidator(12)]
    )
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
