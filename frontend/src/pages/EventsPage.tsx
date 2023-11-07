import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { Event, EventTypeEnum, EventsService } from '../api'
import { EventFilterBox } from '../components/EventFilterBox'
import { EventsList } from '../components/EventsList'
import style from './styling/EventsPage.module.css'

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
      <div className={style.container}>
        <div>
          <h1 className="pageHeading">Events</h1>
          <p>
            Här kan man se kommande händelser för blåset, inklusive spelningar,
            officiella events, och andra roliga saker. Om du har något kul som
            händer som du tycker att hela föreningen borde känna till (inklusive
            gamlingar) så kan du lägga till ett event själv.
          </p>
        </div>
        <div className={style.buttonAndFilters}>
          <button
            className={`standardButton blueButton ${style.newEventButton}`}
          >
            Skapa nytt event
          </button>
          <EventFilterBox
            filterSettings={filterSettings}
            setFilterSettings={setFilterSettings}
          />
        </div>
      </div>

      <EventsList events={data} />
    </>
  )
}
