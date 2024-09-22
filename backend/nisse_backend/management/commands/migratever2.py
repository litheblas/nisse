import json
from datetime import date, datetime

from django.core.management.base import BaseCommand

# from events.models import Event
from members.models import (  # GrasMembership,
    Engagement,
    EngagementType,
    GrasMembership,
    Member,
    Membership,
    MembershipType,
)
from nisse_backend.management.commands._personmaker import (
    ImportedAssignment,
    ImportedInstrument,
    ImportedPerson,
)

KEYCLOAK_API = ""
KEYCLOAK_REALM = ""


def do_members():
    Member.objects.all().exclude(username="admin").delete()
    Membership.objects.all().delete()
    Engagement.objects.all().delete()
    GrasMembership.objects.all().delete()
    EngagementType.objects.all().delete()
    MembershipType.objects.all().delete()

    assignments_file = open("legacy_assignments.json")
    perosons_file = open("legacy_persons.json", "r")
    id_file = open("legacy_id_to_blapp_id.json")
    members = json.load(perosons_file)
    assignments = json.load(assignments_file)
    id_map = json.load(id_file)

    assignments_file.close()
    perosons_file.close()
    id_file.close()

    for member in members["data"]:
        newmember = ImportedPerson(
            legacyid=member["legacyid"],
            id=(
                str(id_map[str(member["legacyid"])])
                if str(member["legacyid"]) in id_map
                else member["legacyid"]
            ),
            fnamn=member["fnamn"],
            enamn=member["enamn"],
            smek=member["smek"],
            fodd=member["fodd"] if member["fodd"] != "None" else None,
            pnr_sista=member["pnr_sista"],
            gatuadr=member["gatuadr"],
            postnr=member["postnr"] if len(member["postnr"]) <= 10 else "",
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
            username=member["username"],
        )
        print(f"On member {newmember}")

        for assignmentid in assignments["assignments"]:
            for assobj in assignments["assignmentrelations"][assignmentid]:
                if assobj["persid"] == str(member["legacyid"]):
                    newmember.assignments.append(
                        ImportedAssignment(
                            assignments["assignments"][assignmentid],
                            assobj["start"],
                            assobj["end"],
                        )
                    )

        for instrumentid in assignments["instruments"].keys():
            for memberobj in assignments["memberrelations"][instrumentid]:
                if memberobj["persid"] == str(member["legacyid"]):
                    newmember.instruments.append(
                        ImportedInstrument(
                            assignments["instruments"][instrumentid],
                            memberobj["start"],
                        )
                    )
        for provobj in assignments["memberrelations"]["prov"]:
            if provobj["persid"] == str(member["legacyid"]):
                newmember.instruments.append(
                    ImportedInstrument(
                        "Provantagen",
                        provobj["start"],
                    )
                )

        for hedersobj in assignments["memberrelations"]["heder"]:
            if hedersobj["persid"] == str(member["legacyid"]):
                newmember.instruments.append(
                    ImportedInstrument(
                        "Hedersmedlem",
                        hedersobj["start"],
                    )
                )

        for gamlingobj in assignments["memberrelations"]["gamling"]:
            if gamlingobj["persid"] == str(member["legacyid"]):
                newmember.instruments.append(
                    ImportedInstrument(
                        "Gamling",
                        gamlingobj["start"],
                    )
                )

        newmember.sortAssignments()
        newmember.sortInstruments()
        newmember.addEnddateToInstrument()
        newmember.purgeGamling()

        mem = Member(
            id=newmember.id,
            first_name=newmember.fnamn,
            last_name=newmember.enamn,
            nickname=newmember.smek,
            birth_date=newmember.fodd,
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
            username=newmember.username,
        )

        print(f"Saving member {newmember} as {mem}")

        mem.save()

        infinity_date = date(9999, 12, 31)
        unsure_date = date(1970, 1, 1)
        new_date = date(1970, 1, 2)

        if newmember.gras_medlem_till != "None":
            this_date = datetime.strptime(newmember.gras_medlem_till, "%Y-%m-%d").date()
            if this_date == infinity_date:  # if infinite
                GrasMembership(member=mem, status="L").save()
            elif this_date == unsure_date:  # if unsure
                GrasMembership(member=mem, status="U").save()
            elif this_date == new_date:  # if new
                GrasMembership(member=mem, status="N").save()
            else:
                GrasMembership(
                    member=mem,
                    status_date=datetime.strptime(
                        newmember.gras_medlem_till, "%Y-%m-%d"
                    ).date(),
                ).save()

        print(f"Saved member {newmember}")

        for assignment in newmember.assignments:
            Engagement(
                member_id=newmember.id,
                start=datetime.strptime(assignment.startdate, "%Y-%m-%d").date(),
                end=(
                    datetime.strptime(assignment.enddate, "%Y-%m-%d").date()
                    if assignment.enddate
                    else None
                ),
                engagementType=EngagementType.objects.get_or_create(
                    title=assignment.name
                )[0],
            ).save()

        for instrument in newmember.instruments:
            Membership(
                member_id=newmember.id,
                start=datetime.strptime(instrument.startdate, "%Y-%m-%d").date(),
                end=(
                    datetime.strptime(instrument.enddate, "%Y-%m-%d").date()
                    if instrument.enddate
                    else None
                ),
                is_trial=instrument.istriall,
                membershipType=MembershipType.objects.get_or_create(
                    instrument=instrument.instrument
                )[0],
            ).save()


class Command(BaseCommand):
    help = "Migrate the old Database members to the new one."

    def handle(self, *args, **options) -> str | None:
        print("Migrating data from old database to new database...")
        do_members()
