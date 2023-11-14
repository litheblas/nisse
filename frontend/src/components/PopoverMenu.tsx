import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Popover from '@radix-ui/react-popover'
import { Menu } from './Menu'
import style from './styling/PopoverMenu.module.css'

export const PopoverMenu = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={style.button}>
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
            className={style.buttonIcon}
          />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={style.menuContainer}>
          <Popover.Arrow />
          <Menu />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
