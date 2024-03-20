from factory import LazyAttribute
from factory.django import DjangoModelFactory, ImageField, Password
from factory.faker import Faker
from factory.fuzzy import FuzzyChoice, FuzzyText
from factory.random import randgen
from members.models import Member

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
