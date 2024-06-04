import CircularProgress from '@mui/material/CircularProgress'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Event, EventTypeEnum, EventsService } from '../api'
import { EventFilterBox } from '../components/EventFilterBox'
import { EventsList } from '../components/EventsList'
import { useScrollToLocation } from '../hooks/UseScrollToLocation.ts'
import style from './styling/EventsPage.module.css'

interface FilterSettings {
  showConcerts: boolean
  showOfficial: boolean
  showOther: boolean
  showPastEvents: boolean
}

export const EventsPage = () => {
  useScrollToLocation()

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
            (new Date(a.start_time).getTime() -
              new Date(b.start_time).getTime()) *
            (filterSettings.showPastEvents ? -1 : 1)
        )
    },
    [filterSettings]
  )

  const fetFunc = useCallback(() => {
    if (filterSettings.showPastEvents) {
      return EventsService.eventsList()
    }
    return EventsService.eventsListUpcomingList()
  }, [filterSettings.showPastEvents])

  const { isLoading, isError, isIdle, data, error, refetch } = useQuery(
    'event_list',
    fetFunc,
    { select: filterEvents }
  )

  useEffect(() => {
    void refetch()
  }, [filterSettings.showPastEvents, refetch])

  const renderInfoAndFilters = () => {
    return (
      <div className={style.container}>
        <div>
          <header className={style.header}>
            <h1>Events</h1>
          </header>
          <p>
            Här kan man se kommande händelser för blåset, inklusive spelningar,
            officiella events, och andra roliga saker. Om du har något kul som
            händer som du tycker att hela föreningen borde känna till (inklusive
            gamlingar) så kan du lägga till ett event själv.
          </p>
        </div>
        <div className={style.buttonAndFilters}>
          <Link to={`add`}>
            <button
              className={`standardButton blueButton ${style.newEventButton}`}
            >
              Skapa nytt event
            </button>
          </Link>
          <EventFilterBox
            filterSettings={filterSettings}
            setFilterSettings={setFilterSettings}
          />
        </div>
      </div>
    )
  }

  if (isLoading || isIdle) {
    return (
      <>
        {renderInfoAndFilters()}
        <div className={style.loadingSpinnerContainer}>
          <CircularProgress color="inherit" />
        </div>
      </>
    )
  }

  if (isError) {
    return (
      <>
        {renderInfoAndFilters()}
        {error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <span>Unknown error!</span>
        )}
      </>
    )
  }

  return (
    <>
      {renderInfoAndFilters()}
      <EventsList events={data} />
    </>
  )
}
