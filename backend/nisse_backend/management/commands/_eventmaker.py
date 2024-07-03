import datetime


class ImportedEvent:
    def __init__(
        self,
        start_date: datetime.datetime,
        location: str,
        fritext: str,
        eventType,
        end_date: datetime.datetime = None,
        name="",
        full_day=False,
    ):
        self.name = name
        self.start_date = start_date
        self.end_date = end_date
        self.location = location
        self.fritext = fritext
        self.type = eventType
        self.full_day = full_day
