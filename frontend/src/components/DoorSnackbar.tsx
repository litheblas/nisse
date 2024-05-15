import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Snackbar } from '@mui/material'

interface DoorSnackbarProps {
  message: string
  open: boolean
  closeSnackbar: () => void
}

export const DoorSnackbar = (props: DoorSnackbarProps) => {
  const action = (
    <IconButton onClick={props.closeSnackbar}>
      <FontAwesomeIcon icon={faClose} color="white" />
    </IconButton>
  )

  return (
    <Snackbar
      open={props.open}
      message={props.message}
      action={action}
      autoHideDuration={5000}
      onClose={props.closeSnackbar}
    />
  )
}
