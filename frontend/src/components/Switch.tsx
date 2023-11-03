import * as RadixSwitch from '@radix-ui/react-switch'
import style from './styling/Switch.module.css'

export const Switch = ({
  id,
  checked,
  onCheckedChange,
}: {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) => {
  return (
    <RadixSwitch.Root
      className={style.Root}
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <RadixSwitch.Thumb className={style.Thumb} />
    </RadixSwitch.Root>
  )
}
