import { useLoaderData } from 'react-router-typesafe'
import { EventLite } from '../components/EventLite'
import { eventsListLoader } from '../loaders/EventsListLoader'

export const EventsListPage = () => {
  const events = useLoaderData<typeof eventsListLoader>()
  return (
    <>
      <h1>Events</h1>
      <div>
        {events.map((event) => (
          <EventLite key={event.id} event={event} />
        ))}
      </div>
    </>
  )
}
