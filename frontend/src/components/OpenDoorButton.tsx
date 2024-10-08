import { CircularProgress } from '@mui/material'
import { useMutation } from 'react-query'
import { DoorService } from '../api'
import { useSnackbar } from '../context/SnackbarContext'

export const OpenDoorButton = () => {
  const { showSnackbar } = useSnackbar()

  const mutation = useMutation({
    mutationFn: () => {
      return DoorService.doorCreate()
    },
    onSuccess: () => {
      showSnackbar('Blåsrummet är öppet')
    },
    onError: () => {
      showSnackbar('Det gick inte att öppna Blåsrummet')
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
