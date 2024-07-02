from datetime import datetime


class ImportedAssignment:
    def __init__(self, assName, startdate, enddate):
        self.name = assName
        self.startdate: str = startdate if startdate != "None" else "1970-01-01"
        self.enddate: str = enddate


class ImportedInstrument:
    def __init__(self, instrument, startdate):
        self.instrument = instrument
        self.startdate: str = startdate if startdate != "None" else "1970-01-01"
        self.enddate = None
        self.istriall = instrument == "prov"


class ImportedPerson:
    legacyid = ""
    id = ""
    fnamn = ""
    enamn = ""
    smek = ""
    fodd = ""
    pnr_sista = ""
    gatuadr = ""
    postnr = ""
    ort = ""
    land = ""
    epost = ""
    studentid = ""
    hemnr = ""
    mobilnr = ""
    jobbnr = ""
    fritext = ""
    gras_medlem_till = ""
    kon = ""
    username = ""

    def __init__(
        self,
        legacyid,
        id,
        fnamn,
        enamn,
        smek,
        fodd,
        pnr_sista,
        gatuadr,
        postnr,
        ort,
        land,
        epost,
        studentid,
        hemnr,
        mobilnr,
        jobbnr,
        fritext,
        gras_medlem_till,
        kon,
        username,
    ):
        self.assignments = []
        self.instruments = []

        self.legacyid = legacyid
        self.id = id
        self.fnamn = fnamn
        self.enamn = enamn
        self.smek = smek
        self.fodd = fodd
        self.pnr_sista = pnr_sista
        self.gatuadr = gatuadr
        self.postnr = postnr
        self.ort = ort
        self.land = land
        self.epost = epost
        self.studentid = studentid
        self.hemnr = hemnr
        self.mobilnr = mobilnr
        self.jobbnr = jobbnr
        self.fritext = fritext
        self.gras_medlem_till = gras_medlem_till
        self.kon = kon
        self.username = username

    def __str__(self) -> str:
        return f"{self.fnamn} {self.smek} {self.enamn} ({self.id})"

    def sortAssignments(self):
        if self.assignments:
            self.assignments.sort(
                key=lambda x: datetime.strptime(x.startdate, "%Y-%m-%d")
            )

    def sortInstruments(self):
        if self.instruments:
            self.instruments.sort(
                key=lambda x: datetime.strptime(x.startdate, "%Y-%m-%d")
            )

    def addEnddateToInstrument(self):
        for i in range(len(self.instruments)):
            if i < len(self.instruments) - 1:
                self.instruments[i].enddate = self.instruments[i + 1].startdate

    def purgeGamling(self):
        if self.instruments and self.instruments[-1].instrument == "Gamling":
            # if self.instruments[-1].instrument == "Gamling":
            self.instruments.pop(-1)
