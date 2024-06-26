import json

from django.core.management.base import BaseCommand

# from events.models import Event
from members.models import (  # GrasMembership,
    Engagement,
    EngagementType,
    Member,
    Membership,
    MembershipType,
)
from personmaker import ImportedAssignment, ImportedInstrument, ImportedPerson

KEYCLOAK_API = ""
KEYCLOAK_REALM = ""


def do_events():
    pass


def do_members():
    with (
        open("legacy_persons.json", "r"),
        open("legacy_assignments.json"),
        open("legacy_id_to_blapp_id.json"),
    ) as (perosons_file, assignments_file, id_file):
        members = json.load(perosons_file)
        assignments = json.load(assignments_file)
        id_map = json.load(id_file)

        for member in members["data"]:
            newmember = ImportedPerson(
                legacyid=member["legacyid"],
                id=id_map[str(member["legacyid"])],
                fnamn=member["fnamn"],
                enamn=member["enamn"],
                smek=member["smek"],
                fodd=member["fodd"],
                pnr_sista=member["pnr_sista"],
                gatuadr=member["gatuadr"],
                postnr=member["postnr"],
                ort=member["ort"],
                land=member["land"],
                epost=member["epost"],
                studentid=member["studentid"],
                hemnr=member["hemnr"],
                mobilnr=member["mobilnr"],
                jobbnr=member["jobbnr"],
                fritext=member["fritext"],
                gras_medlem_till=member["gras_medlem_till"],
                kon=member["kon"],
            )
            for assignmentid in assignments["assignments"].keys():
                for assignment in assignments["assignmentrelations"][assignmentid]:
                    if assignment["persid"] == member["legacyid"]:
                        newmember.assignments.append(
                            ImportedAssignment(
                                assignments["assignments"][assignmentid],
                                assignment["start"],
                                assignment["end"],
                            )
                        )
            for instrumentid in assignments["instruments"].keys():
                for instrument in assignments["instrumentrelations"][instrumentid]:
                    if instrument["persid"] == member["legacyid"]:
                        newmember.instrument.append(
                            ImportedInstrument(
                                assignments["instruments"][instrumentid],
                                instrument["start"],
                            )
                        )
            newmember.sortAssignments()
            newmember.sortInstruments()
            newmember.addEnddateToInstrument()
            newmember.purgeGamling()
            Member(
                id=newmember.id,
                first_name=newmember.fnamn,
                last_name=newmember.enamn,
                nickname=newmember.smek,
                birthdate=newmember.fodd,
                national_id=newmember.pnr_sista,
                liu_id=newmember.studentid,
                pronouns=newmember.kon,
                street_address=newmember.gatuadr,
                postal_code=newmember.postnr,
                postal_town=newmember.ort,
                postal_country=newmember.land,
                phone_number_1=newmember.mobilnr,
                phone_number_2=newmember.hemnr,
                phone_number_3=newmember.jobbnr,
                arbitrary_text=newmember.fritext,
                email=newmember.epost,
            ).save()
            for assignment in newmember.assignments:
                Engagement(
                    member_id=newmember.id,
                    start=assignment.startdate,
                    end=assignment.enddate,
                    engagement_type=EngagementType.objects.get_or_create(
                        title=assignment.name
                    ),
                ).save()
            for instrument in newmember.instrument:
                Membership(
                    member_id=newmember.id,
                    start=instrument.startdate,
                    end=instrument.enddate,
                    is_trial=instrument.istriall,
                    engagement_type=MembershipType.objects.get_or_create(
                        title=instrument.instrument
                    ),
                ).save()

    pass


class Command(BaseCommand):
    help = """Migrate the old Database to the new one.\n
    --test: Test if connection to old db can be established\n
    --events: Migrate only events\n
    --members: Migrate only members\n
    --all: Migrate all data\n"""

    def add_arguments(self, parser):
        # Named arguments
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

        if options["all"] or (options["events"] and options["members"]):
            do_events()
            do_members()
        elif options["events"]:
            do_events()
        elif options["members"]:
            do_members()
        else:
            print("No option was selected. Please select an option to migrate data.")
