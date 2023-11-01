import { Dispatch, SetStateAction } from 'react'
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
      <input
        type="checkbox"
        checked={filterSettings.showConcerts}
        onChange={() =>
          setFilterSettings({
            ...filterSettings,
            showConcerts: !filterSettings.showConcerts,
          })
        }
        id="showConcerts"
      />
      <label htmlFor="showConcerts">Visa konserter</label>
      <input
        type="checkbox"
        checked={filterSettings.showOfficial}
        onChange={() =>
          setFilterSettings({
            ...filterSettings,
            showOfficial: !filterSettings.showOfficial,
          })
        }
        id="showOfficial"
      />
      <label htmlFor="showOfficial">Visa officiella events</label>
      <input
        type="checkbox"
        checked={filterSettings.showOther}
        onChange={() =>
          setFilterSettings({
            ...filterSettings,
            showOther: !filterSettings.showOther,
          })
        }
        id="showOther"
      />
      <label htmlFor="showOther">Visa övriga events</label>

      <input
        type="checkbox"
        checked={filterSettings.showPastEvents}
        onChange={() =>
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
