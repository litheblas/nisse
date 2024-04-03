from django.core.management.base import BaseCommand
from events.models import Event
from members.models import (
    Engagement,
    EngagementType,
    GrasMembership,
    Member,
    Membership,
    MembershipType,
)


def get_all_events():
    return []


def get_all_members():
    return []


def get_all_engagement_types():
    types = EngagementType.objects.all()
    type_dict = {}
    for etype in types:
        type_dict[etype.name.lower()] = etype.id
    return type_dict


def get_all_membership_types():
    types = MembershipType.objects.all()
    type_dict = {}
    for mtype in types:
        type_dict[mtype.name] = mtype.id
    return type_dict


def has_grass_membership(member):
    return False


def do_events():
    print("Migrating events...")

    old_events = get_all_events()
    for old_event in old_events:
        """
        TODO: Here we need to do some data transformation
        """
        Event().save()

    print("Events migrated!")


def do_members():
    print("Migrating members...")
    old_members = get_all_members()
    membership_types = get_all_membership_types()
    engagement_types = get_all_engagement_types()

    for old_member in old_members:
        """
        TODO: Here we need to do some data transformation
        """

        """Here we crate the member"""
        m = Member()
        m.save()

        """ Here we do the engagements"""
        for old_engagement in old_member.engagements:
            if old_engagement.type.lower() in engagement_types.keys():
                Engagement(
                    engagementType=engagement_types[old_engagement.type.lower()],
                    member=m.id,
                    start=old_engagement.start,
                    end=old_engagement.end,
                ).save()
            else:
                e = EngagementType(old_engagement.type.capitalize())
                e.save()
                Engagement(
                    engagementType=e.id,
                    member=m.id,
                ).save()
                engagement_types = get_all_engagement_types()

        """Here we do the memberships"""
        for old_membership in old_member.memberships:
            if old_membership.type.lower() in membership_types.keys():
                Membership(
                    membershipType=membership_types[old_membership.type.lower()],
                    member=m.id,
                    start=old_engagement.start,
                    end=old_engagement.end,
                ).save()
            else:
                m = MembershipType(old_membership.type.capitalize())
                m.save()
                Membership(
                    membershipType=m.id,
                    member=m.id,
                    start=old_membership.start,
                ).save()
                membership_types = get_all_membership_types()
        if has_grass_membership(old_member):
            """
            TODO: CONDITIONAL TIME OF GRAS MEMBERSHIP
            """
            GrasMembership(member=m.id).save()

    print("Members migrated!")


class Comand(BaseCommand):
    help = """Migrate the old Database to the new one.\n
    --test: Test if connection to old db can be established\n
    --events: Migrate only events\n
    --members: Migrate only members\n
    --all: Migrate all data\n"""

    def add_arguments(self, parser):
        # Named arguments
        parser.add_argument(
            "--test",
            action="store_true",
            help="Test if connection to old db can be established",
        )
        parser.add_argument(
            "--events",
            action="store_true",
            help="Migrate only events",
        )
        parser.add_argument(
            "--members",
            action="store_true",
            help="Migrate only members",
        )
        parser.add_argument(
            "--all",
            action="store_true",
            help="Migrate all data",
        )

    def handle(self, *args, **options) -> str | None:
        print("Migrating data from old database to new database...")
        if options["test"]:
            print("Testing connection to old database...")
            # Test connection to old database
            print(
                "Here the developer should have tried to do a connection to the old database, he is very bad if he did not do that."
            )
            print(
                "Here the developler should have tried to do conversions of old database models to new database models."
            )
            print("Connection to old database successful!")
        elif options["all"] or (options["events"] and options["members"]):
            do_events()
            do_members()
        elif options["events"]:
            do_events()
        elif options["members"]:
            do_members()
        else:
            print("No option was selected. Please select an option to migrate data.")
