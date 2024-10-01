from json import loads

from django.core.management.base import BaseCommand
from members.models import Member
from members.utils import create_keycloak_users, get_keycloak_users


class Command(BaseCommand):
    help = "Export members to Keycloak"

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_false",
            help="Only lists the members which would be exported without exporting them.",
        )

    def handle(self, *args, **options):
        kc_members = [user["id"] for user in loads(get_keycloak_users().text)]
        members_to_add = []

        print("Members to export:")
        for member in Member.objects.exclude(email__exact=""):
            if str(member.id) not in kc_members:
                members_to_add.append(member)
                print(member)

        if len(members_to_add) < 1:
            print("\nNo members to export")
            return

        if options["dry_run"]:
            if ret_code := create_keycloak_users(members_to_add).status_code != 200:
                print(f"\nSomething went wrong ({ret_code})")
            else:
                print("\nSuccessfully exported members")
        else:
            print("\nDry run, no members were exported")
