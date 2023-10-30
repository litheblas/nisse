import { useQuery } from 'react-query'
import { EventsService } from '../api'
import { EventLite } from '../components/EventLite'

export const EventsPage = () => {
  const { isLoading, isError, isIdle, data, error } = useQuery(
    'event_list',
    EventsService.eventsList.bind(window)
  )

  if (isLoading || isIdle) {
    return <span>Loading...</span>
  }

  if (isError) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    else return <span>Unknown error!</span>
  }

  return (
    <>
      <h1>Events</h1>
      <div>
        {data.map((event) => (
          <EventLite key={event.id} event={event} />
        ))}
      </div>
    </>
  )
}
