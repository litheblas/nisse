from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models


@admin.register(models.Member)
class MemberAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {
                "fields": [
                    "profile_picture",
                    "nickname",
                    "birth_date",
                    "liu_id",
                    "street_address",
                    "postal_code",
                    "postal_town",
                    "postal_country",
                    "phone_number_1",
                    "phone_number_2",
                    "phone_number_3",
                ]
            },
        ),
    )
