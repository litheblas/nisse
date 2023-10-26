import { Event } from '../api'

export const EventLite = ({ event }: { event: Event }) => {
  return (
    <div>
      <p>event.id: {event.id}</p>
      <p>event.title: {event.name}</p>
      <p>event.start: {event.start_time}</p>
      <p>event.end: {event.end_time}</p>
      <p>event.description: {event.description}</p>
      <p>event.location: {event.location}</p>
      <p>event.event_type: {event.event_type}</p>
      <p>event.event_attendees: {event.attendees}</p>
      <p>event.creator: {event.creator}</p>
    </div>
  )
}
