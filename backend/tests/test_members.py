from django.db.utils import IntegrityError
from django.test import TestCase

from .factories import (
    EngagementFactory,
    GrasMembershipFactory,
    MemberFactory,
    MembershipFactory,
)


class MemberTestCase(TestCase):
    def test_member_creation(self):
        m = MemberFactory()
        m.full_clean()
        m.save()

    def test_email_disallow_nonblank_duplicates(self):
        m = MemberFactory(email="foo@bar.com")
        m.full_clean()
        m.save()

        with self.assertRaises(IntegrityError):
            MemberFactory(email="foo@bar.com")

    def test_email_allow_blank_duplicates(self):
        m1 = MemberFactory(email="")
        m1.full_clean()
        m1.save()

        m2 = MemberFactory(email="")
        m2.full_clean()
        m2.save()

    def test_membership_creation(self):
        membership = MembershipFactory()
        membership.full_clean()
        membership.save()

    def test_engagement_creation(self):
        engagement = EngagementFactory()
        engagement.full_clean()
        engagement.save()

    def test_grasmembership_creation(self):
        g1 = GrasMembershipFactory(empty_status=True)
        g1.full_clean()
        g1.save()

        g2 = GrasMembershipFactory(empty_status=False)
        g2.full_clean()
        g2.save()

    def test_grasmembership_disallow_nonblank_status_statusdate(self):
        with self.assertRaises(IntegrityError):
            GrasMembershipFactory(status="L", status_date="1974-1-1")

    def test_grasmembership_disallow_blank_status_statusdate(self):
        with self.assertRaises(IntegrityError):
            GrasMembershipFactory(status="", status_date=None)
