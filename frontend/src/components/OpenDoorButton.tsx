import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, IconButton, Snackbar } from '@mui/material'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { DoorService } from '../api'

export const OpenDoorButton = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const closeSnackbar = () => {
    setOpen(false)
  }

  const action = (
    <IconButton onClick={closeSnackbar}>
      <FontAwesomeIcon icon={faClose} color="white" />
    </IconButton>
  )

  const mutation = useMutation({
    mutationFn: () => {
      return DoorService.doorCreate()
    },
    onSuccess: () => {
      setOpen(true)
      setMessage('Blåsrumsdörren är öppen')
    },
    onError: () => {
      setOpen(true)
      setMessage('Det gick inte att öppna Blåsrummet')
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
    <>
      <button
        className={`standardButton blueButton`}
        title="Öppna Blåsrummet"
        onClick={() => {
          mutation.mutate()
        }}
      >
        Öppna Blåsrummet
      </button>
      {/* TODO: fix Snackbar in mobile view*/}
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        action={action}
      />
    </>
  )
}
