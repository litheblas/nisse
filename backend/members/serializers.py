from rest_framework import serializers

from .models import Member


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


class MemberSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Member
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "short_name",
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
        ]
