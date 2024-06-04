import { Event } from '../api'
import { EventLite } from '../components/EventLite'

export const EventsList = ({ events }: { events: Event[] }) => {
  return (
    <>
      {events.map((event) => (
        <EventLite key={event.id} event={event} />
      ))}
    </>
  )
}
