from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Member(AbstractUser):
    nickname = models.CharField(blank=True, max_length=200)
    birth_date = models.DateField(blank=True, null=True)
    liu_id = models.CharField(blank=True, max_length=8)
    pronouns = models.CharField(blank=True, max_length=5)
    street_address = models.CharField(blank=True, max_length=50)
    postal_code = models.CharField(blank=True, max_length=10)
    postal_town = models.CharField(blank=True, max_length=50)
    postal_country = models.CharField(blank=True, max_length=50)
    phone_number_1 = PhoneNumberField(blank=True)
    phone_number_2 = PhoneNumberField(blank=True)
    phone_number_3 = PhoneNumberField(blank=True)
    arbitrary_text = models.TextField(blank=True)
    personal_number = models.CharField(blank=True)
