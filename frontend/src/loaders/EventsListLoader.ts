import { LoaderFunction } from 'react-router-typesafe'
import { EventsService } from '../api'

export const eventsListLoader = (async () => {
  const events = await EventsService.eventsList()
  return events
}) satisfies LoaderFunction
