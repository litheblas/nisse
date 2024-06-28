import json
from datetime import date, datetime, time, timedelta

from django.core.management.base import BaseCommand
from events.models import Event, EventTypes, ImportedEvent


class Command(BaseCommand):
    help = "put events from json-file into database"

    def handle(self, *args, **options):
        events = []
        with open("events.json", "r") as f:
            data = json.load(f)

        for spelning in data["spelningar"]:
            start_of_name = spelning["fritext"].find("<h1>") + 4
            end_of_name = spelning["fritext"].find("</h1>")
            event_name = spelning["fritext"][start_of_name:end_of_name]
            event_fritext = spelning["fritext"][end_of_name + 5 :]
            timestring = spelning["date"] + " " + spelning["time"]
            events.append(
                ImportedEvent(
                    start_date=datetime.strptime(timestring, "%Y-%m-%d %H:%M:%S"),
                    end_date=None,
                    location=spelning["location"],
                    fritext=event_fritext,
                    eventType=EventTypes.CONCERT,
                    name=event_name,
                )
            )

        for fest in data["egna_fester"]:
            events.append(
                ImportedEvent(
                    start_date=datetime.combine(
                        date.strftime(fest["start_date"], "%Y-%m-%d"), time()
                    ),
                    end_date=datetime.combine(
                        date.strftime(fest["end_date"], "%Y-%m-%d"), time()
                    ),
                    location="",
                    eventType=EventTypes.OFFICIAL,
                    fritext=fest["fritext"],
                    name=fest["event_name"],
                    full_day=True,
                )
            )

        for aktivitet in data["andra_aktiviteter"]:
            events.append(
                ImportedEvent(
                    start_date=datetime.strftime(
                        aktivitet["start_time"], "%Y-%m-%d %H:%M:%S"
                    ),
                    end_date=datetime.strftime(
                        aktivitet["end_time"], "%Y-%m-%d %H:%M:%S"
                    ),
                    location=aktivitet["location"],
                    eventType=EventTypes.OTHER,
                    fritext="",
                    name=aktivitet["event_name"],
                )
            )

        for event in events:
            Event(
                creator=None,
                name=event.name,
                start_time=event.start_date,
                end_time=event.end_date
                if event.end_date
                else event.start_date + timedelta(hours=1),
                event_type=event.type,
                description=event.fritext,
                location=event.location,
                full_day=event.full_day,
            ).save()
