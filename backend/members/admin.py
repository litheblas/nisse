from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models


class MemberEngagementInline(admin.TabularInline):
    model = models.Engagement
    extra = 0


class MemberMembershipInline(admin.TabularInline):
    model = models.Membership
    extra = 0


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
    list_display = ["instrument"]


@admin.register(models.EngagementType)
class EngagementTypeAdmin(admin.ModelAdmin):
    list_display = ["title"]
