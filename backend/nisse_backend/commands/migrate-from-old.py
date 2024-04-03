import mariadb
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

"""
SELECT * FROM medlem
          LEFT JOIN instrument ON medlem.instr = instrument.instrid
          WHERE medlem.pers = {$_GET['id']}
          ORDER BY datum";
"""

"""
MariaDB [litheblas]> DESCRIBE person;
+------------------+-----------------------------------------------+------+-----+------------+----------------+
| Field            | Type                                          | Null | Key | Default    | Extra          |
+------------------+-----------------------------------------------+------+-----+------------+----------------+
| persid           | int(10) unsigned                              | NO   | PRI | NULL       | auto_increment |
| fnamn            | varchar(63)                                   | YES  | MUL | NULL       |                |
| enamn            | varchar(63)                                   | YES  | MUL | NULL       |                |
| smek             | varchar(63)                                   | YES  |     | NULL       |                |
| fodd             | date                                          | YES  |     | NULL       |                |
| pnr_sista        | varchar(4)                                    | YES  |     | NULL       |                |
| gatuadr          | varchar(63)                                   | YES  |     | NULL       |                |
| postnr           | varchar(15)                                   | YES  |     | NULL       |                |
| ort              | varchar(63)                                   | YES  |     | NULL       |                |
| land             | varchar(63)                                   | YES  |     | NULL       |                |
| epost            | varchar(63)                                   | YES  |     | NULL       |                |
| studentid        | varchar(8)                                    | YES  |     | NULL       |                |
| hemnr            | varchar(20)                                   | YES  |     | NULL       |                |
| mobilnr          | varchar(31)                                   | YES  |     | NULL       |                |
| jobbnr           | varchar(20)                                   | YES  |     | NULL       |                |
| icqnr            | varchar(20)                                   | YES  |     | NULL       |                |
| fritext          | longtext                                      | YES  |     | NULL       |                |
| blasmail         | varchar(15)                                   | YES  | UNI | NULL       |                |
| gras_medlem_till | date                                          | YES  |     | NULL       |                |
| arbete           | varchar(63)                                   | YES  |     | NULL       |                |
| icke_blasare     | enum('Y')                                     | YES  |     | NULL       |                |
| password         | varchar(32)                                   | YES  |     | NULL       |                |
| nomail           | enum('Y')                                     | YES  |     | NULL       |                |
| veg              | enum('Y')                                     | YES  |     | NULL       |                |
| gluten           | enum('Y')                                     | YES  |     | NULL       |                |
| nykter           | enum('Y')                                     | YES  |     | NULL       |                |
| allergi          | longtext                                      | YES  |     | NULL       |                |
| admin            | enum('web','blasbas','baren','graset','ragg') | YES  |     | NULL       |                |
| sedd_av_anv      | date                                          | YES  |     | 0000-00-00 |                |
| latlong          | varchar(63)                                   | YES  |     | NULL       |                |
| kon              | enum('M','K')                                 | YES  |     | NULL       |                |
| epost_utskick    | enum('allt','info','jubileum','inget')        | YES  |     | jubileum   |                |
| senast_kollad    | datetime /* mariadb-5.3 */                    | YES  |     | NULL       |                |
+------------------+-----------------------------------------------+------+-----+------------+----------------+

MariaDB [litheblas]> describe medlem;
+----------+------------------------------------------+------+-----+------------+----------------+
| Field    | Type                                     | Null | Key | Default    | Extra          |
+----------+------------------------------------------+------+-----+------------+----------------+
| medlemid | int(10) unsigned                         | NO   | PRI | NULL       | auto_increment |
| pers     | int(10) unsigned                         | NO   | MUL | 0          |                |
| datum    | date                                     | NO   |     | 0000-00-00 |                |
| typ      | enum('prov','antagen','gamling','heder') | NO   |     | prov       |                |
| instr    | int(10) unsigned                         | NO   |     | 0          |                |
+----------+------------------------------------------+------+-----+------------+----------------+

MariaDB [litheblas]> describe instrument;
+---------+------------------+------+-----+---------+----------------+
| Field   | Type             | Null | Key | Default | Extra          |
+---------+------------------+------+-----+---------+----------------+
| instrid | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| lnamn   | varchar(31)      | NO   |     |         |                |
| knamn   | varchar(31)      | YES  |     | NULL    |                |
| sekt    | int(10) unsigned | NO   | MUL | 0       |                |
| hemsida | varchar(255)     | YES  |     | NULL    |                |
+---------+------------------+------+-----+---------+----------------+

MariaDB [litheblas]> describe sektion;
+-------------+------------------+------+-----+---------+----------------+
| Field       | Type             | Null | Key | Default | Extra          |
+-------------+------------------+------+-----+---------+----------------+
| sektid      | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| lnamn       | varchar(31)      | NO   |     |         |                |
| knamn       | varchar(31)      | YES  |     | NULL    |                |
| hemsida     | varchar(255)     | YES  |     | NULL    |                |
| listordning | int(10) unsigned | NO   |     | 0       |                |
+-------------+------------------+------+-----+---------+----------------+

medlem = medlemskap
instr = instrumentID
sektion = obsoloete


"""


def open_connection():
    try:
        conn = mariadb.connect(
            user="user",
            password="password",  # nosec
            host="localhost",
            port=3306,
            database="db",
        )
        return conn
    except mariadb.Error:
        print("Could not connect to old database")
        return None


def get_all_events(db_conn):
    return db_conn.cursor().execute("SELECT * FROM pagang").fetchall()


def get_all_members(db_conn):
    return db_conn.cursor().execute("SELECT * FROM person").fetchall()


def get_all_engagement_types(db_conn):
    types = EngagementType.objects.all()
    type_dict = {}
    for etype in types:
        type_dict[etype.name.lower()] = etype.id
    return type_dict


def get_all_membership_types(db_conn):
    types = MembershipType.objects.all()
    type_dict = {}
    for mtype in types:
        type_dict[mtype.name] = mtype.id
    return type_dict


def has_grass_membership(member):
    return False


def do_events(db_conn):
    print("Migrating events...")

    old_events = get_all_events()
    for old_event in old_events:
        """
        TODO: Here we need to do some data transformation
        """
        Event().save()

    print("Events migrated!")


def do_members(db_conn):
    print("Migrating members...")
    old_members = get_all_members()
    membership_types = get_all_membership_types()
    engagement_types = get_all_engagement_types()

    for old_member in old_members:
        (
            persid,
            fnamn,
            enamn,
            smek,
            fodd,
            pnr_sista,
            gatuadr,
            postnr,
            ort,
            land,
            epost,
            studentid,
            hemnr,
            mobilnr,
            jobbnr,
            icqnr,
            fritext,
            blasmail,
            gras_medlem_till,
            arbete,
            icke_blasare,
            password,
            nomail,
            veg,
            gluten,
            nykter,
            allergi,
            admin,
            sedd_av_anv,
            latlong,
            kon,
            epost_utskick,
            senast_kollad,
        ) = old_member
        """
        TODO: Here we need to do some data transformation
        """
        old_memberships = (
            db_conn.cursor()
            .execute(
                "SELECT * FROM medlem LEFT JOIN instrument ON medlem.instr = instrument.instrid WHERE medlem.pers = ? ORDER BY datum;",
                persid,
            )
            .fetchall()
        )

        old_engagements = db_conn.cursor().execute(
            "SELECT * FROM persfunk, funk WHERE persfunk.funk = funk.funkid AND persfunk.pers = ? ORDER BY startdatum;",
            persid,
        )

        """Here we crate the member"""
        m = Member(
            first_name=fnamn,
            last_name=enamn,
            nickname=smek,
            birth_date=fodd,
            email=epost,
            pronouns=kon,
            phone_number_1=mobilnr,
            phone_number_2=hemnr,
            phone_number_3=jobbnr,
            street_address=gatuadr,
            postal_code=postnr,
            postal_town=ort,
            postal_country=land,
            liu_id=studentid,
            arbitary_text=fritext,
            national_id=pnr_sista,
        )
        m.save()

        """
        Here we do the memberships
        This is how the data should be ordered after the query
        """
        for medlemid, pers, datum, typ, instr, instrid, lnamn, knamn in old_memberships:
            if lnamn.lower() in membership_types.keys():
                Membership(
                    membershipType=membership_types[lnamn.lower()],
                    member=m.id,
                    start=datum,
                ).save()
            else:
                mt = MembershipType(lnamn.capitalize())
                mt.save()
                Membership(
                    membershipType=mt.id,
                    member=m.id,
                    start=datum,
                ).save()
                membership_types = get_all_membership_types()

        """
        Here we do the engagements
        This is how the data should be ordered after the query
        """
        for (
            id,
            pers,
            funk,
            startdatum,
            slutdatum,
            funkid,
            namn,
            styr,
            beskr,
        ) in old_engagements:
            if namn.lower() in engagement_types.keys():
                Engagement(
                    engagementType=engagement_types[namn.lower()],
                    member=m.id,
                    start=startdatum,
                    end=slutdatum,
                ).save()
            else:
                e = EngagementType(namn.capitalize())
                e.save()
                Engagement(
                    engagementType=e.id,
                    member=m.id,
                ).save()
                engagement_types = get_all_engagement_types()

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
            conn = open_connection()
            if conn is None:
                return
            print(
                "Here the developler should have tried to do conversions of old database models to new database models."
            )
            print("Connection to old database successful!")
        elif options["all"] or (options["events"] and options["members"]):
            conn = open_connection()
            do_events(conn)
            do_members(conn)
        elif options["events"]:
            conn = open_connection()
            do_events(conn)
        elif options["members"]:
            conn = open_connection()
            do_members(conn)
        else:
            print("No option was selected. Please select an option to migrate data.")
