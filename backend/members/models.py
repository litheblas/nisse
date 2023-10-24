from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Member(AbstractUser):
    nickname = models.CharField(blank=True)
    birth_date = models.DateField(blank=True, null=True)
    liu_id = models.CharField(blank=True, max_length=6)
    street_address = models.CharField(blank=True)
    postal_code = models.CharField(blank=True)
    postal_town = models.CharField(blank=True)
    postal_country = models.CharField(blank=True)
    phone_number_1 = PhoneNumberField(blank=True)
    phone_number_2 = PhoneNumberField(blank=True)
    phone_number_3 = PhoneNumberField(blank=True)
    arbitrary_text = models.TextField(blank=True)
