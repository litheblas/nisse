import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Attendee, Event, EventTypeEnum, EventsService } from '../api'
import OtherIcon from '../assets/blottartuban.svg'
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

const EventAttendeesList: React.FC<EventAttendeesListProps> = ({
  attendees,
}) => {
  return (
    <div className={style.attendeesContainer}>
      <div className={style.attendeesTable}>
        <div className={style.headerRow}>
          <h3>Deltagare: {attendees.length} st</h3>
        </div>
        {attendees.map((attendee, index) => (
          <div key={index} className={style.dataRow}>
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
        ))}
      </div>
    </div>
  )
}

export const EventLite = ({ event }: { event: Event }) => {
  const start_time = new Date(event.start_time)
  const end_time = new Date(event.end_time)

  const day = start_time.toLocaleDateString('sv-SV', {
    day: 'numeric',
  })
  const month = start_time.toLocaleDateString('sv-SV', {
    month: 'long',
  })
  const time = start_time.toLocaleTimeString('sv-SV', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const [showAttendees, setShowAttendees] = useState(false)
  const changeAttendeesVisibility = () => {
    setShowAttendees((prev) => !prev)
  }

  const { isLoading, isError, isIdle, data, error } = useQuery({
    queryKey: 'events/' + event.id,
    queryFn: EventsService.eventsRetrieve.bind(window, event.id),
    enabled: showAttendees,
  })

  if (showAttendees && (isLoading || isIdle)) {
    return (
      <>
        <div className={style.loadingSpinnerContainer}>
          <CircularProgress color="inherit" />
        </div>
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
              <span>
                <br />
                {/* TODO: Show the creator name instead */}
                Skapare: {event.creator}
              </span>
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
        </div>
      </div>
      <div className={style.emptyColumn}></div>
      {showAttendees === false || (
        <div>
          {/* Other components or information */}
          {data && data.attendees ? (
            <EventAttendeesList attendees={data.attendees} />
          ) : null}
        </div>
      )}
    </div>
  )
}
