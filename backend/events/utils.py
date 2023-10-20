from enum import IntEnum

class EventTypes(IntEnum):
    CONCERT = 1
    OFFICIAL = 2
    OTHER = 3

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]
