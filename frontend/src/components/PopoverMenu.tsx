import { faBars, faBurger } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Popover from '@radix-ui/react-popover'
import CSS from 'csstype'
import { useState } from 'react'
import { Menu } from './Menu'

export const PopoverMenu = () => {
  // Replaces the menu icon with a burger icon at 13:37
  let buttonIcon = faBars
  if (new Date().getHours() === 13 && new Date().getMinutes() === 37) {
    buttonIcon = faBurger
  }

  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover.Root open={showPopover}>
      <Popover.Trigger asChild>
        <button
          style={style.button}
          onClick={() => setShowPopover(!showPopover)}
        >
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
          <Menu closePopover={() => setShowPopover(false)} />
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
