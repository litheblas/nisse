import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Event, EventsService } from '../api'
import { EditEventForm } from '../components/EditEventForm'
import { dateTimeToIsoWithTimezone } from '../utils/CustomTimeFormat'

const defaultEvent: Event = {
  id: '',
  name: '',
  location: '',
  start_time: dateTimeToIsoWithTimezone(new Date()),
  end_time: dateTimeToIsoWithTimezone(new Date()),
  description: '',
  attendees: [],
  creator: '',
}

export const AddEventPage = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: EventsService.eventsCreate.bind(window),
    onSuccess: async (data) => {
      const created_event = data as Event
      await queryClient.invalidateQueries({
        queryKey: ['event_list', 'event_edit'],
      })
      navigate('/events#' + created_event.id)
    },
  })

  return (
    <EditEventForm
      baseEvent={defaultEvent}
      onSubmit={(event) => {
        mutation.mutate(event)
      }}
    />
  )
}
