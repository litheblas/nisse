import { faBars, faBurger } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Popover from '@radix-ui/react-popover'
import CSS from 'csstype'
import { Menu } from './Menu'

export const PopoverMenu = () => {
  // Replaces the menu icon with a burger icon at 13:37
  let buttonIcon = faBars
  if (new Date().getHours() === 13 && new Date().getMinutes() === 37) {
    buttonIcon = faBurger
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button style={style.button}>
          <FontAwesomeIcon
            icon={buttonIcon}
            size="2x"
            style={style.buttonIcon}
          />
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
