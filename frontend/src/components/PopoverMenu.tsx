import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Popover from '@radix-ui/react-popover'
import CSS from 'csstype'
import { Menu } from './Menu'

export const PopoverMenu = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button style={style.button}>
          <FontAwesomeIcon icon={faBars} size="2x" style={style.buttonIcon} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content style={style.menuContainer}>
          <Popover.Arrow />
          <Menu />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

const style: Record<string, CSS.Properties> = {
  menuContainer: {
    border: 'blue 1px solid',
    marginRight: '8px',
  },

  button: {
    backgroundColor: 'unset',
  },

  buttonIcon: {
    width: '40px',
  },
}
