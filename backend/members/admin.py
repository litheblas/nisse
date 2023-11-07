from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models

admin.site.unregister(models.Member)


@admin.register(models.Member)
class MemberAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {
                "fields": [
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
