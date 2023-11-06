import { Event, EventTypeEnum } from '../api'
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

  return (
    <div className={style.eventContainer}>
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
          <button className="standardButton blueButton">Redigera</button>
          <button className="standardButton blueButton">Visa deltagare</button>
        </div>
      </div>
    </div>
  )
}
