import { CircularProgress } from '@mui/material'
import { useMutation } from 'react-query'
import { DoorService } from '../api'

interface OpenDoorButtonProps {
  onOpen: (status: string) => void
}

export const OpenDoorButton = (props: OpenDoorButtonProps) => {
  const mutation = useMutation({
    mutationFn: () => {
      return DoorService.doorCreate()
    },
    onSuccess: () => {
      props.onOpen('Blåsrummet är öppet')
    },
    onError: () => {
      props.onOpen('Det gick inte att öppna Blåsrummet')
    },
  })

  if (mutation.isLoading) {
    return (
      <button
        type="button"
        className={`standardButton blueButton`}
        title="Öppna Blåsrummet"
        disabled
      >
        <CircularProgress color="inherit" size="0.95em" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`standardButton blueButton`}
      title="Öppna Blåsrummet"
      onClick={() => {
        mutation.mutate()
      }}
    >
      Öppna Blåsrummet
    </button>
  )
}
