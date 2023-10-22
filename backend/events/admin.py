from django.contrib import admin

from . import models


@admin.register(models.Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["event_name", "start_time"]


@admin.register(models.Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ["id"]
