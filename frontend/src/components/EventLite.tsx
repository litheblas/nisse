import { useContext, useEffect, useState } from 'react'
import { QueryObserverResult, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import {
  Attendee,
  Event,
  EventTypeEnum,
  EventsService,
  MembersService,
} from '../api' // Updated import
import OtherIcon from '../assets/blottartuban.svg'
import { AuthContext } from '../context/AuthContext'
import { DurationPill } from './DurationPill'
import style from './styling/EventLite.module.css'

const eventTypeToString = (event_type: EventTypeEnum): string => {
  switch (event_type) {
    case EventTypeEnum._1:
      return 'Spelning'
    case EventTypeEnum._2:
      return 'Officiellt event'
    case EventTypeEnum._3:
      return 'Övrigt event'
  }
}

interface EventAttendeesListProps {
  attendees: Attendee[]
  eventID: string
  refetch: () => Promise<QueryObserverResult<Event, unknown>> // Used when removing attendees as admin
}

type AttendanceStatusState = Record<string, string>

const attendanceStatusList = [
  { id: '1', label: 'N' },
  { id: '2', label: 'SA' },
  { id: '3', label: 'OF' },
  { id: '4', label: 'AF' },
  { id: '5', label: 'AS' },
  { id: '6', label: 'SAF' },
]

const EventAttendeesList = ({
  attendees,
  eventID,
  refetch,
}: EventAttendeesListProps) => {
  const [attendanceStatus, setAttendanceStatus] =
    useState<AttendanceStatusState>({})

  const handleAttendanceStatusClick = (
    attendeeId: string,
    statusId: string
  ) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [attendeeId]: statusId,
    }))
  }

  const handleUnregisterAttendeeClick = async (attendeeId: string) => {
    try {
      await EventsService.eventsUnregisterAttendeesCreate(eventID, {
        members: [attendeeId],
      })
      void refetch() // Trigger refetch after successful unregistration, updates the list
    } catch (error) {
      console.error('Error unregistering attendee:', error)
    }
  }

  return (
    <div className={style.attendeesContainer}>
      <div className={style.attendeesTable}>
        <div className={style.headerRow}>
          <h3>Deltagare: {attendees.length} st</h3>
        </div>
        {attendees.map((attendee, index) => (
          <div key={index} className={style.dataRow}>
            <div className={style.attendeeInfoContainer}>
              <div className={style.attendeeCounter}>
                <div>{index + 1}</div>
              </div>
              <div className={style.pictureColumn}>
                <img
                  src={OtherIcon} // TODO: Change to attendee.profile_picture
                  alt={'No Icon found'}
                  className={style.profilePicture}
                />
              </div>
              <div className={style.attendeeInfo}>
                <Link to={'/members/' + attendee.id}>{attendee.full_name}</Link>
              </div>
            </div>

            <div className={style.adminReporting}>
              {attendanceStatusList.map(({ id, label }) => (
                <div
                  key={id}
                  className={`${style.attendanceStatus} ${
                    attendanceStatus[attendee.id] === id ? style.selected : ''
                  }`}
                  onClick={() => handleAttendanceStatusClick(attendee.id, id)}
                >
                  {label}
                </div>
              ))}
              <button
                onClick={() => void handleUnregisterAttendeeClick(attendee.id)}
                className="standardButton blueButton"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface RegistrationButtonProps {
  eventId: string
  memberId: string
  refetchQuery: () => Promise<QueryObserverResult<Event, unknown>>
}
const RegistrationButton = ({
  eventId,
  memberId,
  refetchQuery,
}: RegistrationButtonProps) => {
  const [isAttending, setIsAttending] = useState(false)

  useEffect(() => {
    EventsService.eventsIsAttendingRetrieve(eventId, memberId)
      .then((response) => {
        setIsAttending(response)
      })
      .catch((error) => {
        console.error('Error checking attendance:', error)
      })
  }, [eventId, memberId])

  const handleButtonClick = () => {
    let updatePromise

    if (isAttending) {
      updatePromise = EventsService.eventsUnregisterAttendeesCreate(eventId, {
        members: [memberId],
      })
    } else {
      updatePromise = EventsService.eventsRegisterAttendeesCreate(eventId, {
        members: [memberId],
      })
    }

    updatePromise
      .then(() => {
        setIsAttending(!isAttending)

        return refetchQuery()
      })
      .catch((error) => {
        console.error('Error updating attendance:', error)
      })
  }

  return (
    <button onClick={handleButtonClick} className={`standardButton blueButton`}>
      {isAttending ? 'Avanmäla' : 'Anmäla'}
    </button>
  )
}

export const EventLite = ({ event }: { event: Event }) => {
  const { getUserInfo } = useContext(AuthContext)
  const userInfo = getUserInfo()
  const memberId = userInfo.id ? userInfo.id : ''

  const start_time = new Date(event.start_time)
  const end_time = new Date(event.end_time)

  const day = start_time.toLocaleDateString('sv-SV', {
    day: 'numeric',
  })
  const month = start_time.toLocaleDateString('sv-SV', {
    month: 'long',
  })
  const year = start_time.toLocaleDateString('sv-SV', {
    year: 'numeric',
  })
  const current_year = new Date().getFullYear()
  const time = start_time.toLocaleTimeString('sv-SV', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const [showAttendees, setShowAttendees] = useState(false)
  const [searchQuery, setSearchQuery] = useState('') // State for search query
  const [searchResults, setSearchResults] = useState<Attendee[]>([]) // State for search results
  const [staticMembers, setStaticMembers] = useState<Attendee[]>([]) // Static list of all members

  const loadMembers = () => {
    void MembersService.membersList().then((members) =>
      setStaticMembers(members)
    )
  }

  const changeAttendeesVisibility = () => {
    setShowAttendees((prev) => !prev)
  }

  const { refetch, isLoading, isError, isIdle, data, error } = useQuery({
    queryKey: 'events/' + event.id,
    queryFn: EventsService.eventsRetrieve.bind(window, event.id),
    enabled: showAttendees,
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) {
      const filtered = staticMembers.filter((member) => {
        const queryLowerCase = query.toLowerCase()
        const includesQuery = (str: string | undefined) =>
          str && str.toLowerCase().includes(queryLowerCase)
        return includesQuery(member.full_name)
      })
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const handleAddMember = async (memberId: string) => {
    // Function to handle adding a member with search
    try {
      await EventsService.eventsRegisterAttendeesCreate(event.id, {
        members: [memberId],
      })
      await refetch()
      setSearchQuery('')
      setSearchResults([])
    } catch (err) {
      console.error('Error adding member to event:', err)
    }
  }

  if (showAttendees && (isLoading || isIdle)) {
    return (
      <>
        <span>Loading!</span>
      </>
    )
  }

  if (showAttendees && isError) {
    return (
      <>
        {error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <span>Unknown error!</span>
        )}
      </>
    )
  }

  return (
    <div id={event.id} className={style.eventContainer}>
      <div className={style.eventDateBox}>
        <span className={style.eventDateDay}>{day}</span>
        <span>{month}</span>
        <span>{Number(year) != current_year ? year : null}</span>
        <span>{time}</span>
      </div>
      <div className={style.eventInfo}>
        <div className={style.topBar}>
          <h2>
            {eventTypeToString(event.event_type!)} - {event.name}
          </h2>
          <DurationPill start={start_time} end={end_time} />
        </div>

        <p>{event.description}</p>

        <div className={style.bottomBar}>
          <div>
            <span>Plats: {event.location}</span>
            {event.creator ? (
              <>
                <br />
                Skapare: {event.creator}
              </>
            ) : null}
          </div>
          <Link to={`edit/${event.id}`}>
            <button className="standardButton blueButton">Redigera</button>
          </Link>
          <button
            onClick={changeAttendeesVisibility}
            className="standardButton blueButton"
          >
            {showAttendees ? 'Göm deltagare' : 'Visa deltagare'}
          </button>
          {end_time > new Date() && (
            <RegistrationButton
              eventId={event.id}
              memberId={memberId}
              refetchQuery={refetch}
            />
          )}
        </div>
      </div>
      <div className={style.emptyColumn}></div>
      {showAttendees && (
        <div className={style.attendeesSection}>
          <EventAttendeesList
            attendees={data?.attendees || []}
            eventID={event.id}
            refetch={refetch}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Lägg till medlemmar..."
            onClick={() => {
              if (staticMembers.length === 0) loadMembers()
            }} // load members when search bar is pressed
          />
          {searchResults.length > 0 && (
            <div className={style.searchResults}>
              {searchResults.map((member) => (
                <div
                  key={member.id}
                  className={style.searchResult}
                  onClick={() => void handleAddMember(member.id)}
                >
                  {member.full_name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
