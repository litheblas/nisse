import json

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "put events from json-file into database"

    def handle(self, *args, **options):
        with open("events.json", "r") as f:
            data = json.load(f)

            for spelning in data["spelningar"]:
                pass

            for fest in data["egna_fester"]:
                pass

            for aktivitet in data["andra_aktiviteter"]:
                pass
