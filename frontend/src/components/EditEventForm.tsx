import * as Form from '@radix-ui/react-form'
import { useEffect, useState } from 'react'
import { Event, EventTypeEnum } from '../api'
import { eventTypeToString } from '../utils/EventTypeToString'
import style from './styling/EditEventForm.module.css'

interface EditEventFormProps {
  baseEvent: Event
  onSubmit: (event: Event) => void
}

export const EditEventForm = ({ baseEvent, onSubmit }: EditEventFormProps) => {
  const [isFullDay, setIsFullDay] = useState<boolean>(baseEvent.full_day)

  // This is needed, since the component is rendered before the baseEvent is
  // fully loaded
  useEffect(() => {
    setIsFullDay(baseEvent.full_day)
  }, [baseEvent.full_day])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))

    const submittedEvent: Event = {
      ...baseEvent,
      name: data.name as string,
      event_type: data.event_type as unknown as EventTypeEnum,
      description: data.description as string,
      location: data.location as string,
      full_day: data.full_day as unknown as boolean,
      start_time: data.start_time as string,
      end_time: data.stop_time as string,
    }

    onSubmit(submittedEvent)
  }

  return (
    <Form.Root onSubmit={handleSubmit}>
      {/* Name */}
      <Form.Field className={style.FormField} name="name">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Titel</Form.Label>
          <Form.Message className={style.FormMessage} match="valueMissing">
            Eventet måste ha en titel
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={280}
            required
            defaultValue={baseEvent.name}
            key={baseEvent.name}
          />
        </Form.Control>
      </Form.Field>

      {/* Event type */}
      <Form.Field className={style.FormField} name="event_type">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Kategori</Form.Label>
        </div>
        <Form.Control asChild>
          <select
            className={style.Input}
            required
            defaultValue={baseEvent.event_type}
            key={baseEvent.event_type}
          >
            {/* TODO: Find a way to not hard code this */}
            <option value={EventTypeEnum._1}>
              {eventTypeToString(EventTypeEnum._1)}
            </option>
            <option value={EventTypeEnum._2}>
              {eventTypeToString(EventTypeEnum._2)}
            </option>
            <option value={EventTypeEnum._3}>
              {eventTypeToString(EventTypeEnum._3)}
            </option>
          </select>
        </Form.Control>
      </Form.Field>

      {/*Full day event or not*/}
      <Form.Field className={style.FormField} name="full_day">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Heldagsevenemang?</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Checkbox}
            type="checkbox"
            checked={isFullDay}
            value={isFullDay.toString()}
            onChange={() => setIsFullDay(!isFullDay)}
          />
        </Form.Control>
      </Form.Field>

      {/* TODO: Fix date and time formatting, alt. change date/time pickers */}
      {/* Start time */}
      <Form.Field className={style.FormField} name="start_time">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Start</Form.Label>
          <Form.Message className={style.FormMessage} match="valueMissing">
            Eventet måste ha en starttid
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type={isFullDay ? 'date' : 'datetime-local'}
            required
            defaultValue={
              isFullDay
                ? baseEvent.start_time.slice(0, 10)
                : baseEvent.start_time.slice(0, 19)
            }
            key={
              isFullDay
                ? baseEvent.start_time.slice(0, 10)
                : baseEvent.start_time.slice(0, 19)
            }
          />
        </Form.Control>
      </Form.Field>

      {/* End time */}
      <Form.Field className={style.FormField} name="stop_time">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Slut</Form.Label>
          <Form.Message className={style.FormMessage} match="valueMissing">
            Eventet måste ha en sluttid
          </Form.Message>
          <Form.Message
            className={style.FormMessage}
            match={(
              value: string,
              formData: { get: (arg0: string) => unknown }
            ) =>
              new Date(value) <= new Date(formData.get('start_time') as string)
            }
          >
            Eventet kan inte sluta innan det har börjat
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type={isFullDay ? 'date' : 'datetime-local'}
            required
            defaultValue={
              isFullDay
                ? baseEvent.end_time.slice(0, 10)
                : baseEvent.end_time.slice(0, 19)
            }
            key={
              isFullDay
                ? baseEvent.end_time.slice(0, 10)
                : baseEvent.end_time.slice(0, 19)
            }
          />
        </Form.Control>
      </Form.Field>

      {/* Location */}
      <Form.Field className={style.FormField} name="location">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Plats</Form.Label>
          <Form.Message className={style.FormMessage} match="valueMissing">
            Eventet måste ha en plats
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={100}
            required
            defaultValue={baseEvent.location}
            key={baseEvent.location}
          />
        </Form.Control>
      </Form.Field>

      {/* Description */}
      <Form.Field className={style.FormField} name="description">
        <Form.Label className={style.FormLabel}>Beskrivning</Form.Label>
        <Form.Control asChild>
          <textarea
            className={style.Textarea}
            defaultValue={baseEvent.description}
            key={baseEvent.description}
            rows={8}
          />
        </Form.Control>
      </Form.Field>

      {/* Submit button */}
      <Form.Submit asChild>
        <button className={`${style.Button} standardButton blueButton`}>
          Spara
        </button>
      </Form.Submit>
    </Form.Root>
  )
}
