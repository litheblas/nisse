import datetime


class ImportedEvent:
    def __init__(
        self,
        start_date: datetime.datetime | datetime.date,
        location: str,
        fritext: str,
        eventType,
        end_date: datetime.datetime | datetime.date = "",
        name="",
    ):
        self.name = name
        self.start_date = start_date
        self.end_date = end_date
        self.location = location
        self.fritext = fritext
        self.type = eventType
