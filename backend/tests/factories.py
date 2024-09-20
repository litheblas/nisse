import random
from datetime import date, timedelta, timezone
from string import digits as DIGITS

from events.models import Event
from factory import LazyAttribute, SubFactory
from factory.django import DjangoModelFactory, ImageField, Password
from factory.faker import Faker
from members.models import (
    Engagement,
    EngagementType,
    GrasMembership,
    Member,
    Membership,
    MembershipType,
)

PRONOUNS = ["he/him", "she/her", "they/them"]


def random_timedelta_within_year():
    return timedelta(days=random.randint(1, 365))  # nosec B311


class MemberFactory(DjangoModelFactory):
    class Meta:
        model = Member

    username = Faker("word")
    email = Faker("email")
    first_name = Faker("first_name")
    last_name = Faker("last_name")
    nickname = Faker("word")
    password = Password("pw")
    birth_date = Faker("date_of_birth")
    liu_id = LazyAttribute(
        lambda o: o.first_name[:3].lower()
        + o.last_name[:2].lower()
        + "".join(random.choices(DIGITS, k=3))  # nosec B311
    )
    pronouns = Faker("random_element", elements=PRONOUNS)
    street_address = Faker("street_address")
    postal_code = Faker("numerify", text="#####")
    postal_town = Faker("city")
    postal_country = Faker("country")
    phone_number_1 = Faker("numerify", text="+4672#######")
    phone_number_2 = Faker("numerify", text="+4672#######")
    phone_number_3 = Faker("numerify", text="+4673#######")
    arbitrary_text = Faker("sentence")
    national_id = Faker("numerify", text="####")
    profile_picture = ImageField()


class EventFactory(DjangoModelFactory):
    class Meta:
        model = Event

    creator = SubFactory(MemberFactory)
    location = Faker("street_address")
    name = Faker("word")
    full_day = Faker("boolean")
    start_time = Faker("date_time", tzinfo=timezone.utc)
    end_time = LazyAttribute(
        lambda d: d.start_time + timedelta(hours=random.randint(1, 3))  # nosec B311
    )
    event_type = Faker("random_element", elements=[1, 2, 3])
    description = Faker("sentence")


class MembershipTypeFactory(DjangoModelFactory):
    class Meta:
        model = MembershipType

    instrument = Faker("word")


class MembershipFactory(DjangoModelFactory):
    class Meta:
        model = Membership

    member = SubFactory(MemberFactory)
    membershipType = SubFactory(MembershipTypeFactory)
    start = Faker("date_between")
    end = LazyAttribute(lambda d: d.start + random_timedelta_within_year())
    is_trial = Faker("boolean")


class EngagementTypeFactory(DjangoModelFactory):
    class Meta:
        model = EngagementType

    title = Faker("word")


class EngagementFactory(DjangoModelFactory):
    class Meta:
        model = Engagement

    member = SubFactory(MemberFactory)
    engagementType = SubFactory(EngagementTypeFactory)
    start = start = Faker("date_between")
    end = LazyAttribute(lambda d: d.start + random_timedelta_within_year())


class GrasMembershipFactory(DjangoModelFactory):
    class Params:
        empty_status = False

    class Meta:
        model = GrasMembership

    member = SubFactory(MemberFactory)

    status = LazyAttribute(
        lambda g: (
            ""
            if g.empty_status
            else random.choice(
                [s.value for s in GrasMembership.StatusChoices]
            )  # nosec B311
        )
    )
    status_date = LazyAttribute(
        lambda g: (
            date.today() + random_timedelta_within_year() if g.empty_status else None
        )
    )
