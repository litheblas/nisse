from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

PLACEHOLDER_IMAGE = "members/profile_pictures/placeholderImage_400x400.png"


def member_profile_picture_path(instance, filename):
    # Produces a path for the image file for profile picture
    # makes filename to "username.FILE_TYPE"
    return (
        f"members/profile_pictures/{instance.username}{filename[filename.rfind('.'):]}"
    )


class Member(AbstractUser):
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
    profile_picture = models.ImageField(
        blank=True, default=PLACEHOLDER_IMAGE, upload_to=member_profile_picture_path
    )
