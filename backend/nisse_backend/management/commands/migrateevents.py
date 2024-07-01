import json
import re
from datetime import datetime, timedelta

from django.core.management.base import BaseCommand
from events.models import Event, EventTypes
from nisse_backend.management.commands._eventmaker import ImportedEvent


class Command(BaseCommand):
    help = "put events from json-file into database"

    def handle(self, *args, **options):
        events = []
        with open("legacy_events.json", "r") as f:
            data = json.load(f)

        for spelning in data["spelningar"]:
            spelning_has_headers = (
                spelning["fritext"].find("<h1>") != -1
                and spelning["fritext"].find("</h1>") != -1
            )
            if not spelning_has_headers:
                event_name = ""
            else:
                start_of_name = spelning["fritext"].find("<h1>") + 4
                end_of_name = spelning["fritext"].find("</h1>")
                event_name = spelning["fritext"][start_of_name:end_of_name]
            event_fritext = spelning["fritext"]
            timestring = ""
            daystring = spelning["date"]
            hourstring = spelning["time"]

            if spelning["date"] == "None":
                daystring = "1997-01-01"

            if spelning["time"] == "None":
                hourstring == "00:00:00"

            timestring = f"{daystring} {hourstring}"
            events.append(
                ImportedEvent(
                    start_date=datetime.strptime(timestring, "%Y-%m-%d %H:%M:%S"),
                    end_date=None,
                    location=re.sub(r"<.*?>", "", spelning["location"]),
                    fritext=event_fritext,
                    eventType=EventTypes.CONCERT,
                    name=event_name,
                )
            )

        for fest in data["egna_fester"]:
            start_date = (
                datetime.strptime(fest["start_date"], "%Y-%m-%d")
                if fest["start_date"] != "None"
                else datetime.strptime("1997-01-01", "%Y-%m-%d") - timedelta(days=1)
            )
            end_date = (
                datetime.strptime(fest["end_date"], "%Y-%m-%d")
                if fest["end_date"] != "None"
                else start_date + timedelta(days=1)
            )
            events.append(
                ImportedEvent(
                    start_date=start_date,
                    end_date=end_date,
                    location="",
                    eventType=EventTypes.OFFICIAL,
                    fritext=fest["fritext"],
                    name=fest["event_name"],
                    full_day=True,
                )
            )

        for aktivitet in data["andra_aktiviteter"]:
            startstring = (
                aktivitet["start_time"]
                if aktivitet["start_time"] != "None"
                else "1997-01-01 00:00:00+00:00"
            )
            endstring = (
                aktivitet["end_time"]
                if aktivitet["end_time"] != "None"
                else "1997-01-01 00:00:00+00:00"
            )

            events.append(
                ImportedEvent(
                    start_date=datetime.strptime(startstring, "%Y-%m-%d %H:%M:%S%z"),
                    end_date=datetime.strptime(endstring, "%Y-%m-%d %H:%M:%S%z"),
                    location=aktivitet["location"],
                    eventType=EventTypes.OTHER,
                    fritext="",
                    name=aktivitet["event_name"],
                )
            )

        for event in events:
            print(f"Saving {event.name} with at date {event.start_date}")
            Event(
                creator=None,
                name=event.name,
                start_time=event.start_date,
                end_time=(
                    event.end_date
                    if event.end_date
                    else event.start_date + timedelta(hours=1)
                ),
                event_type=event.type,
                description=event.fritext,
                location=event.location,
                full_day=event.full_day,
            ).save()
