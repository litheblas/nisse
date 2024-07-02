from datetime import date, datetime, timedelta, timezone

from events.models import Event
from factory import LazyAttribute, SubFactory
from factory.django import DjangoModelFactory, ImageField, Password
from factory.faker import Faker
from factory.fuzzy import FuzzyChoice, FuzzyDate, FuzzyDateTime, FuzzyText
from factory.random import randgen
from members.models import (
    Engagement,
    EngagementType,
    GrasMembership,
    Member,
    Membership,
    MembershipType,
)

NUMBERS = "0123456789"
PRONOUNS = ["he/him", "she/her", "they/them"]


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
        lambda o: "%s" % o.first_name[:3].lower()
        + o.last_name[:2].lower()
        + randgen.choice(NUMBERS)
        + randgen.choice(NUMBERS)
        + randgen.choice(NUMBERS)
    )
    pronouns = FuzzyChoice(PRONOUNS)
    street_address = Faker("street_address")
    postal_code = FuzzyText(length=5, chars=NUMBERS)
    postal_town = Faker("city")
    postal_country = Faker("country")
    phone_number_1 = FuzzyText(length=7, chars=NUMBERS, prefix="+4670")
    phone_number_2 = FuzzyText(length=7, chars=NUMBERS, prefix="+4672")
    phone_number_3 = FuzzyText(length=7, chars=NUMBERS, prefix="+4673")
    arbitrary_text = Faker("sentence")
    national_id = FuzzyText(length=4, chars=NUMBERS)
    profile_picture = ImageField()


class EventFactory(DjangoModelFactory):
    class Meta:
        model = Event

    creator = SubFactory(MemberFactory)
    location = Faker("street_address")
    name = Faker("word")
    full_day = randgen.choice([True, False])
    start_time = FuzzyDateTime(start_dt=datetime(1974, 1, 1, tzinfo=timezone.utc))
    end_time = LazyAttribute(lambda d: d.start_time + timedelta(hours=3))
    event_type = FuzzyChoice([1, 2, 3])
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
    start = FuzzyDate(start_date=date(1974, 1, 1))
    end = LazyAttribute(lambda d: d.start + timedelta(days=365))
    is_trial = randgen.choice([True, False])


class EngagementTypeFactory(DjangoModelFactory):
    class Meta:
        model = EngagementType

    title = Faker("word")


class EngagementFactory(DjangoModelFactory):
    class Meta:
        model = Engagement

    member = SubFactory(MemberFactory)
    engagementType = SubFactory(EngagementTypeFactory)
    start = FuzzyDate(start_date=date(1974, 1, 1))
    end = LazyAttribute(lambda d: d.start + timedelta(days=365))


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
            else randgen.choice([s.value for s in GrasMembership.StatusChoices])
        )
    )
    status_date = LazyAttribute(
        lambda g: (
            date(1974, 1, 1) + timedelta(days=randgen.randrange(0, 365 * 5))
            if g.empty_status
            else None
        )
    )
