import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { Event, EventTypeEnum, EventsService } from '../api'
import { EventLite } from '../components/EventLite'

interface FilterSettings {
  showConcerts: boolean
  showOfficial: boolean
  showOther: boolean
  showPastEvents: boolean
}

export const EventsPage = () => {
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    showConcerts: true,
    showOfficial: true,
    showOther: true,
    showPastEvents: false,
  })

  const filterEvents = useCallback(
    (events: Event[]) => {
      // TODO: This could be a performance issue if the list of events is very
      // large
      return events
        .filter(
          (event) =>
            filterSettings.showPastEvents ||
            new Date(event.end_time) > new Date()
        )
        .filter(
          (event) =>
            (filterSettings.showConcerts &&
              event.event_type === EventTypeEnum._1) ||
            (filterSettings.showOfficial &&
              event.event_type === EventTypeEnum._2) ||
            (filterSettings.showOther && event.event_type === EventTypeEnum._3)
        )
        .sort(
          (a, b) =>
            new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        )
    },
    [filterSettings]
  )

  const { isLoading, isError, isIdle, data, error } = useQuery(
    'event_list',
    EventsService.eventsList.bind(window),
    { select: filterEvents }
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
      {/* TODO: Style the filter settings */}
      <input
        type="checkbox"
        checked={filterSettings.showConcerts}
        onChange={() =>
          setFilterSettings({
            ...filterSettings,
            showConcerts: !filterSettings.showConcerts,
          })
        }
        id="showConcerts"
      />
      <label htmlFor="showConcerts">Visa konserter</label>
      <input
        type="checkbox"
        checked={filterSettings.showOfficial}
        onChange={() =>
          setFilterSettings({
            ...filterSettings,
            showOfficial: !filterSettings.showOfficial,
          })
        }
        id="showOfficial"
      />
      <label htmlFor="showOfficial">Visa officiella events</label>
      <input
        type="checkbox"
        checked={filterSettings.showOther}
        onChange={() =>
          setFilterSettings({
            ...filterSettings,
            showOther: !filterSettings.showOther,
          })
        }
        id="showOther"
      />
      <label htmlFor="showOther">Visa övriga events</label>

      <input
        type="checkbox"
        checked={filterSettings.showPastEvents}
        onChange={() =>
          setFilterSettings({
            ...filterSettings,
            showPastEvents: !filterSettings.showPastEvents,
          })
        }
        id="showPastEvents"
      />
      <label htmlFor="showPastEvents">Visa passerade events</label>

      <div>
        {data.map((event) => (
          <EventLite key={event.id} event={event} />
        ))}
      </div>
    </>
  )
}
