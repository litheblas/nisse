import { Dispatch, SetStateAction } from 'react'
import { Switch } from './Switch'
import style from './styling/EventFilterBox.module.css'

interface FilterSettings {
  showConcerts: boolean
  showOfficial: boolean
  showOther: boolean
  showPastEvents: boolean
}

export const EventFilterBox = ({
  filterSettings,
  setFilterSettings,
}: {
  filterSettings: FilterSettings
  setFilterSettings: Dispatch<SetStateAction<FilterSettings>>
}) => {
  return (
    <div className={style.container}>
      <Switch
        checked={filterSettings.showConcerts}
        onCheckedChange={() =>
          setFilterSettings({
            ...filterSettings,
            showConcerts: !filterSettings.showConcerts,
          })
        }
        id="showConcerts"
      />
      <label htmlFor="showConcerts">Visa konserter</label>

      <Switch
        checked={filterSettings.showOfficial}
        onCheckedChange={() =>
          setFilterSettings({
            ...filterSettings,
            showOfficial: !filterSettings.showOfficial,
          })
        }
        id="showOfficial"
      />
      <label htmlFor="showOfficial">Visa officiella events</label>

      <Switch
        checked={filterSettings.showOther}
        onCheckedChange={() =>
          setFilterSettings({
            ...filterSettings,
            showOther: !filterSettings.showOther,
          })
        }
        id="showOther"
      />
      <label htmlFor="showOther">Visa övriga events</label>

      <Switch
        checked={filterSettings.showPastEvents}
        onCheckedChange={() =>
          setFilterSettings({
            ...filterSettings,
            showPastEvents: !filterSettings.showPastEvents,
          })
        }
        id="showPastEvents"
      />
      <label htmlFor="showPastEvents">Visa passerade events</label>
    </div>
  )
}
