from rest_framework import serializers

from .models import Member


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "id",
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
        ]
