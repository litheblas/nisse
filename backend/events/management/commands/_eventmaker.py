import datetime


class ImportedEvent:
    def __init__(
        self,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
        location: str,
        fritext: str,
        name="",
    ):
        self.name = name
        self.start_date = start_date
        self.end_date = end_date
        self.location = location
        self.fritext = fritext
