from json import loads

from django.core.management.base import BaseCommand
from members.models import Member
from members.utils import create_keycloak_users, get_keycloak_users


class Command(BaseCommand):
    help = "Export members to Keycloak"

    def handle(self, *args, **options):
        kc_members = [user["id"] for user in loads(get_keycloak_users().text)]
        members_to_add = Member.objects.all()

        print("Members to export:")
        for member in members_to_add:
            if str(member.id) in kc_members:
                members_to_add = members_to_add.exclude(id=member.id)
            else:
                print(member)

        if len(members_to_add) < 1:
            print("\nNo members to export")
            return

        if ret_code := create_keycloak_users(members_to_add).status_code != 200:
            print(f"\nSomething went wrong {ret_code}")
        else:
            print("\nSuccessfully exported members")
