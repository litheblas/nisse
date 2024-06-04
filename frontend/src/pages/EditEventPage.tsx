import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Event, EventsService } from '../api'
import { EditEventForm } from '../components/EditEventForm'

export const EditEventPage = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()

  const { isLoading, isError, isIdle, data, error } = useQuery(
    'event_edit',
    EventsService.eventsRetrieve.bind(window, eventId!)
  )

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (event: Event) => {
      console.log(event)
      return EventsService.eventsUpdate(event.id, event)
    },
    onSuccess: async (data) => {
      const created_event = data
      await queryClient.invalidateQueries({
        queryKey: ['event_list', 'event_edit'],
      })
      navigate('/events#' + created_event.id)
    },
  })

  if (isLoading || isIdle) {
    return <span>Loading...</span>
  }

  if (isError) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    else return <span>Unknown error!</span>
  }

  return (
    <EditEventForm
      baseEvent={data}
      onSubmit={(event) => {
        mutation.mutate(event)
      }}
    />
  )
}
