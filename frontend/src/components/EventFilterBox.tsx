import CSS from 'csstype'
import { Dispatch, SetStateAction } from 'react'
import { Switch } from './Switch'

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
    <div style={style.container}>
      <label htmlFor="showConcerts">Visa konserter</label>
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

      <label htmlFor="showOfficial">Visa officiella events</label>
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

      <label htmlFor="showOther">Visa övriga events</label>
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

      <label htmlFor="showPastEvents">Visa passerade events</label>
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
    </div>
  )
}

const style: Record<string, CSS.Properties> = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
    gridGap: '8px',
    alignItems: 'center',
    width: '100%',
  },
}
