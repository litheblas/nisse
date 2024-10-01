from typing import Dict, List

from rest_framework import serializers

from .models import (
    Engagement,
    EngagementType,
    GrasMembership,
    Member,
    Membership,
    MembershipType,
)


# Copied from https://www.django-rest-framework.org/api-guide/serializers/#dynamically-modifying-fields
# Should probably add to a utils file if used for other serializers
class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop("fields", None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            fields = fields.split(",")
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class EngagementSerializer(DynamicFieldsModelSerializer):
    engagementType = serializers.SerializerMethodField()
    member = serializers.SerializerMethodField()

    class Meta:
        model = Engagement
        fields = [
            "id",
            "engagementType",
            "member",
            "start",
            "end",
        ]

    def get_engagementType(self, obj) -> Dict:
        return obj.engagementType

    def get_member(self, obj) -> Dict:
        return obj.member


class MembershipSerializer(DynamicFieldsModelSerializer):
    membershipType = serializers.SerializerMethodField()
    member = serializers.SerializerMethodField()

    class Meta:
        model = Membership
        fields = ["id", "membershipType", "member", "start", "end", "is_trial"]

    def get_membershipType(self, obj) -> Dict:
        return obj.memebershipType

    def get_member(self, obj) -> Dict:
        return obj.member


class EngagementTypeSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = EngagementType
        fields = ["id", "title"]


class MembershipTypeSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = MembershipType
        fields = ["id", "instrument"]


class MemberSerializer(DynamicFieldsModelSerializer):
    memberships = serializers.SerializerMethodField()
    engagements = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "short_name",
            "username",
            "real_name",
            "nickname",
            "birth_date",
            "liu_id",
            "pronouns",
            "street_address",
            "postal_code",
            "postal_town",
            "postal_country",
            "phone_number_1",
            "phone_number_2",
            "phone_number_3",
            "arbitrary_text",
            "national_id",
            "profile_picture",
            "active_period",
            "memberships",
            "engagements",
            "complete_adress",
        ]

        def validate(self, data):
            """Validation for serializer is made here. A temp instance of Event is created
            to run the Event.clean() method."""
            instance = Member(**data)
            instance.clean()
            return data

    def get_memberships(self, obj) -> List[Dict]:
        return obj.memberships

    def get_engagements(self, obj) -> List[Dict]:
        return obj.engagements


class AttendeeSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Member
        fields = ["id", "full_name", "profile_picture"]


class GrasSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = GrasMembership
        fields = ["id", "member", "status", "status_date"]
