from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models


class MemberEngagementInline(admin.TabularInline):
    model = models.Engagement


class MemberMembershipInline(admin.TabularInline):
    model = models.Membership


@admin.register(models.Member)
class MemberAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            "LiThe Blås custom fields",
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
    inlines = [MemberMembershipInline, MemberEngagementInline]


@admin.register(models.MembershipType)
class MembershipTypeAdmin(admin.ModelAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {"fields": ["id", "instrument"]},
        ),
    )


@admin.register(models.EngagementType)
class EngagementTypeAdmin(admin.ModelAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {"fields": ["id", "title"]},
        ),
    )
