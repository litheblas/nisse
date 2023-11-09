import { EventTypeEnum } from '../api/models/EventTypeEnum'

export const eventTypeToString = (event_type: EventTypeEnum): string => {
  switch (event_type) {
    case EventTypeEnum._1:
      return 'Spelning'
    case EventTypeEnum._2:
      return 'Officiellt event'
    case EventTypeEnum._3:
      return 'Övrigt event'
  }
}
