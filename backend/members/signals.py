from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .models import Membership


@receiver(post_save, sender=Membership)
@receiver(post_delete, sender=Membership)
def update_active_period(sender, instance, **kwargs):
    instance.member.set_active_period()
