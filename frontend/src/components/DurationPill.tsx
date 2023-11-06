import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './styling/DurationPill.module.css'

export const DurationPill = ({ start, end }: { start: Date; end: Date }) => {
  const start_time = start.toLocaleTimeString('sv-SV', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const end_time = end.toLocaleTimeString('sv-SV', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const start_date = start.toLocaleDateString('sv-SV', {
    day: 'numeric',
    month: 'long',
  })

  const end_date = end.toLocaleDateString('sv-SV', {
    day: 'numeric',
    month: 'long',
  })

  if (start_date === end_date) {
    return (
      <span className={style.container}>
        <FontAwesomeIcon icon={faClock} className={style.icon} />
        {`${start_time} - ${end_time}`}
      </span>
    )
  }

  return (
    <span className={style.container}>
      <FontAwesomeIcon icon={faClock} className={style.icon} />
      {`${start_date} ${start_time} - ${end_date} ${end_time}`}
    </span>
  )
}
