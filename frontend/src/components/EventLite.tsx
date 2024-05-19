import { useContext, useEffect, useState } from 'react'
import { QueryObserverResult, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Attendee, Event, EventTypeEnum, EventsService } from '../api'
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
}
// Define the type for the attendance status state
type AttendanceStatusState = Record<string, string>

const attendanceStatusList = [
  { id: '1', label: 'N' },
  { id: '2', label: 'SA' },
  { id: '3', label: 'OF' },
  { id: '4', label: 'AF' },
  { id: '5', label: 'AS' },
  { id: '6', label: 'SAF' },
]

const EventAttendeesList = ({ attendees }: EventAttendeesListProps) => {
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

        // Manually trigger a refetch of the query to update attendees list
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
  // Access the AuthContext, keycloak
  const { getUserInfo } = useContext(AuthContext)
  // Get userId from keycloak. Keycloak id synced with memberId
  const userInfo = getUserInfo()
  // Replace with backend member ID like: 'bfa1c0d9-0d2d-4e57-b617-9ccd2c390083' to test.
  // Should work when keycloak id synced with backend member id.
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
  const changeAttendeesVisibility = () => {
    setShowAttendees((prev) => !prev)
  }

  const { refetch, isLoading, isError, isIdle, data, error } = useQuery({
    queryKey: 'events/' + event.id,
    queryFn: EventsService.eventsRetrieve.bind(window, event.id),
    enabled: showAttendees,
  })

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
            {/* Shows the event creator, if one exists */}
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
      {showAttendees === false || (
        <div>
          {data && data.attendees ? (
            <EventAttendeesList attendees={data.attendees} />
          ) : null}
        </div>
      )}
    </div>
  )
}
