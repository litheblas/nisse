import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { MembersService } from '../api'
import style from './styling/MembersListPage.module.css'

/*
MemberListPage, Blåsbasen
This file includes the logic for Blåsbasen, how filtering and search works.

There is two filtering steps.
First a static filter which is handled by the advanced search functionality.
Then a dynamic filter which is the text input filtering.

The static filter is first applied, which makes it possible to search with text.
*/

interface Member {
  id: string
  full_name: string
  active_period: string
  real_name?: string
  email?: string
  short_name?: string
  complete_adress?: string
  birth_date?: string
  phone_number_1?: string
  memberships?: Membership[]
  engagements?: Engagement[]
}

// Used to tell TS what Membership contains
// It does contain more but we only use membership_type
interface Membership {
  membership_type: string
}

// Used to tell TS what Engagement contains
// It does contain more but we only use engagement_type
interface Engagement {
  engagement_type: string
}

// List of what memberships that are shown in dropdown list, advanced search
const membershipGroups = [
  'Kompet',
  'Klarinett',
  'Hornbasun',
  'Flöjt',
  'Saxofon',
  'Trumpet',
  'Balett',
]

// List of what instruments that are shown in dropdown list, advanced search
const instrumentGroups = [
  'Banjo',
  'Klarinett',
  'Bas',
  'Flöjt',
  'Saxofon',
  'Trummor',
  'Tuba',
  'Trombon',
  'Trumpet',
  'Balett',
  'Horn',
]

// "Dictionary" for connecting instrument to sektioner
const instrumentMembershipGroups: Record<string, string> = {
  Banjo: 'Kompet',
  Klarinett: 'Klarinett',
  Bas: 'Kompet',
  Horn: 'Hornbasun',
  Flöjt: 'Flöjt',
  Saxofon: 'Saxofon',
  Trummor: 'Kompet',
  Tuba: 'Kompet',
  Trombon: 'Hornbasun',
  Trumpet: 'Trumpet',
  Balett: 'Balett',
}

// List of what engagements that are shown in dropdown list, advanced search
const engagementGroups = [
  'Dictator',
  'Skrivkunig',
  'Kronharpa',
  'Intendent',
  'Balettchef',
  'Spelraggare',
  'Domptör',
  'Notpiccolo',
  'Luciageneral',
  'Jubelgeneral',
]

// Define your initial queryFields, this is what is going to be loaded from each member as standard
const initialQueryFields =
  'id,full_name,active_period,real_name,email,short_name'

export const MembersListPage = () => {
  const [queryFields, setQueryFields] = useState(initialQueryFields)

  // MemberList query, change queryFields and trigger refetch() to add more information on each member
  const { isLoading, isError, isIdle, data, error, refetch } = useQuery(
    ['member_list', queryFields],
    MembersService.membersList.bind(window, queryFields)
  )

  // Pagination variables
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [currentPage, setCurrentPage] = useState(1)

  // Search filter variables
  const [searchQuery, setSearchQuery] = useState('')
  const [staticFilteredMembers, setStaticFilteredMembers] = useState(data)
  const [filteredMembers, setFilteredMembers] = useState(data)

  // Sort order variable
  const [sortBy, setSortBy] = useState('short_name (desc)')

  // Function to handle sorting option change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }

  // Array of sorting options
  const sortingOptions = [
    { value: 'full_name (desc)', label: 'Namn: (A-Ö)' },
    { value: 'full_name (asc)', label: 'Namn: (Ö-A)' },
    { value: 'active_period (asc)', label: 'Aktiv period: Ökande' },
    { value: 'active_period (desc)', label: 'Aktiv period: Minskande' },
    { value: 'short_name (desc)', label: 'Smeknamn: (A-Ö)' },
    { value: 'short_name (asc)', label: 'Smeknamn: (Ö-A)' },
    // Add more sorting options as needed
  ]

  // filter logic for user text input searching
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (!staticFilteredMembers) {
      return <span>No data available</span>
    }

    // Filter the data based on the search query
    const filtered = staticFilteredMembers.filter((member) => {
      const queryLowerCase = query.toLowerCase()
      const includesQuery = (str: string | undefined) =>
        str && str.toLowerCase().includes(queryLowerCase)

      // Apply basic filtering logic for normal search
      const basicFilter: boolean =
        includesQuery(member.full_name) ||
        includesQuery(member.real_name) ||
        includesQuery(member.email) ||
        !!(
          member.active_period &&
          member.active_period
            .toString()
            .replace(/–/g, '-')
            .toLowerCase()
            .includes(query.toLowerCase())
        )

      return basicFilter
    })

    setFilteredMembers(filtered) // Update the filtered members state
    setCurrentPage(1) // Reset to the first page when performing a new search
  }

  // Function to handle changes in queryFields, refetch the data
  const handleQueryFieldsChange = (newQueryFields: string) => {
    setQueryFields(newQueryFields)
    void refetch() // Refetch the data when queryFields changes
  }

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch((prevState) => !prevState)
    // refetch with inital query fields
    if (showAdvancedSearch) {
      handleQueryFieldsChange(initialQueryFields)
    }
  }

  // Trigger for updating static filter
  const [triggerFilterUpdate, setTriggerFilterUpdate] = useState(false)

  // Variables for advanced static search
  const [sortActive, setSortActive] = useState(true)
  const [sortGamling, setSortGamling] = useState(true)
  const [selectedMembershipGroup, setSelectedMembershipGroup] = useState('')
  const [selectedInstrumentGroup, setSelectedInstrumentGroup] = useState('')
  const [selectedEngagementGroup, setSelectedEngagementGroup] = useState('')

  // Function for "Sök advancerat" button. Based on variables, update search query, refetch information and trigger filter
  const searchAdvanced = () => {
    let searchQuery: string = initialQueryFields

    // If membership needs to be loaded for advanced search query, add and refetch
    if (
      (selectedMembershipGroup !== '' &&
        selectedMembershipGroup !== 'Alla medlemsgrupper') ||
      (selectedInstrumentGroup !== '' &&
        selectedInstrumentGroup !== 'Alla instrumentgrupper')
    ) {
      searchQuery += ',memberships'
      handleQueryFieldsChange(searchQuery)
    }
    if (
      selectedEngagementGroup !== '' &&
      selectedEngagementGroup !== 'Alla engagemangsgrupper'
    ) {
      searchQuery += ',engagements'
      handleQueryFieldsChange(searchQuery)
    }
    setTriggerFilterUpdate(!triggerFilterUpdate)
  }

  // useEffect to update staticFilteredMembers when data is changed or showAdvancedSearch is pressed
  // This is where the static filter is applied.
  // Normal text search is possible to search within after this filter is applied.
  useEffect(() => {
    const filterAdvanced = () => {
      if (!data) {
        return <span>No data available</span>
      }

      const staticFiltered = data.filter((member) => {
        let staticFilter = false
        if (sortActive && member.active_period.length == 5) {
          staticFilter = true
        }
        if (sortGamling && member.active_period.length == 9) {
          staticFilter = true
        }
        // Filter on instrument groups
        if (
          selectedMembershipGroup !== '' &&
          selectedMembershipGroup !== 'Alla medlemsgrupper'
        ) {
          const matchingMembership = member.memberships.some((membership) => {
            const typedMembership = membership as Membership
            return (
              instrumentMembershipGroups[typedMembership.membership_type] ===
              selectedMembershipGroup
            )
          })
          staticFilter = matchingMembership
        }
        // Filter on instrument
        if (
          selectedInstrumentGroup !== '' &&
          selectedInstrumentGroup !== 'Alla instrumentgrupper'
        ) {
          const matchingMembership = member.memberships.some((membership) => {
            const typedMembership = membership as Membership
            return typedMembership.membership_type === selectedInstrumentGroup
          })
          staticFilter = matchingMembership
        }
        // Filter on engagements
        if (
          selectedEngagementGroup !== '' &&
          selectedEngagementGroup !== 'Alla engagemangsgrupper'
        ) {
          const matchingEngagement = member.engagements.some((engagement) => {
            const typedEngagement = engagement as Engagement
            return typedEngagement.engagement_type === selectedEngagementGroup
          })
          staticFilter = matchingEngagement
        }
        return staticFilter
      })

      setStaticFilteredMembers(staticFiltered)
    }

    // When advanced search is active, then use filterAdvanced, otherwise skip the static filter
    if (showAdvancedSearch) {
      filterAdvanced()
    } else {
      setStaticFilteredMembers(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, showAdvancedSearch, triggerFilterUpdate])

  // Function to export data as CSV
  const exportToCsv = () => {
    let searchQuery: string = initialQueryFields
    searchQuery += ',complete_adress,birth_date,phone_number_1'
    handleQueryFieldsChange(searchQuery)

    // Replace en dash with hyphen in active_period for CSV export
    const membersForExport = sortedMembers.map((member) => ({
      ...member,
      active_period: member.active_period.replace(/–/g, '-'),
    }))

    // Define the fields to include in the CSV
    const fields: (keyof Member)[] = [
      'real_name',
      'short_name',
      'active_period',
      'email',
      'complete_adress',
      'birth_date',
      'phone_number_1',
    ]

    // Generate CSV header
    const header = fields.join(';')

    const csvContent = membersForExport
      .map((member) => {
        // Extract values for each field
        const values = fields.map((field) => member[field] || '')
        // Join values with semicolons
        return values.join(';')
      })
      .join('\n')

    // Combine header and content
    const csvData = `${header}\n${csvContent}`
    console.log(csvData)

    // Create a Blob object for the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a temporary anchor element
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'members.csv')

    // Simulate a click on the anchor element to download the CSV file
    link.click()

    // Release the URL object
    URL.revokeObjectURL(url)
  }

  // Rendering of page header
  const renderPageHeader = () => {
    return (
      <>
        <h1 className={style.header}>Blåsbasen</h1>
        <div className={style.inputContainer}>
          <div className={style.searchBarContainer}>
            <input
              type="text"
              placeholder="Sök på namn eller aktiv period"
              value={searchQuery}
              onChange={handleSearch}
            />
            <select
              className={style.advancedButton}
              value={sortBy}
              onChange={handleSortChange}
            >
              {sortingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              className={style.advancedButton}
              onClick={toggleAdvancedSearch}
            >
              {showAdvancedSearch
                ? 'Hide Advanced Search'
                : 'Show Advanced Search'}
            </button>
          </div>
        </div>
        {showAdvancedSearch && (
          <div className={style.advancedSearchContainer}>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={sortActive}
                  onChange={() => setSortActive(!sortActive)}
                />
                aktiv
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sortGamling}
                  onChange={() => setSortGamling(!sortGamling)}
                />
                gamling
              </label>
              <select
                className={style.dropdown}
                value={selectedMembershipGroup}
                onChange={(e) => setSelectedMembershipGroup(e.target.value)}
              >
                <option value="">Alla medlemsgrupper</option>
                {membershipGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              <select
                className={style.dropdown}
                value={selectedInstrumentGroup}
                onChange={(e) => setSelectedInstrumentGroup(e.target.value)}
              >
                <option value="">Alla instrumentgrupper</option>
                {instrumentGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              <select
                className={style.dropdown}
                value={selectedEngagementGroup}
                onChange={(e) => setSelectedEngagementGroup(e.target.value)}
              >
                <option value="">Alla engagemangsgrupper</option>
                {engagementGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <button className={style.advancedButton} onClick={searchAdvanced}>
              Sök advancerat
            </button>
            <button className={style.advancedButton} onClick={exportToCsv}>
              Export Members as CSV
            </button>
          </div>
        )}
      </>
    )
  }

  if (isLoading || isIdle) {
    return (
      <>
        {renderPageHeader()}
        <div className={style.loadingSpinnerContainer}>
          <CircularProgress color="inherit" />
        </div>
      </>
    )
  }

  if (isError) {
    return (
      <>
        {renderPageHeader()}
        {error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <span>Unknown error!</span>
        )}
      </>
    )
  }

  // If no dynamic filter (text in search box) is active, show staticFilteredMembers members
  const membersToDisplay = searchQuery
    ? filteredMembers || []
    : staticFilteredMembers
    ? staticFilteredMembers
    : data

  // Sort membersToDisplay array based on the selected option
  const sortedMembers = [...membersToDisplay].sort((a, b) => {
    if (sortBy === 'full_name (desc)') {
      return a.full_name.localeCompare(b.full_name)
    } else if (sortBy === 'full_name (asc)') {
      return a.full_name.localeCompare(b.full_name) * -1
    } else if (sortBy === 'active_period (asc)') {
      return a.active_period.localeCompare(b.active_period)
    } else if (sortBy === 'active_period (desc)') {
      return a.active_period.localeCompare(b.active_period) * -1
    } else if (sortBy === 'short_name (desc)') {
      return a.short_name.localeCompare(b.short_name)
    } else if (sortBy === 'short_name (asc)') {
      return a.short_name.localeCompare(b.short_name) * -1
    }
    // Add more sorting options as needed
    return 0 // Default sorting behavior
  })

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedMembers.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const showAll = () => {
    setItemsPerPage(Infinity)
  }

  const showLess = () => {
    setItemsPerPage(15)
  }

  return (
    <>
      {renderPageHeader()}
      <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Aktiv period</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((member) => (
            <tr key={member.id}>
              <td>
                <Link to={member.id}>{member.full_name}</Link>
              </td>
              <td>{member.active_period}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {(membersToDisplay.length > itemsPerPage ||
        itemsPerPage === Infinity) && (
        <div className={style.pagination}>
          {itemsPerPage !== Infinity && (
            <>
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </>
          )}
          <button onClick={itemsPerPage === Infinity ? showLess : showAll}>
            {itemsPerPage === Infinity ? 'Show Less' : 'Show All'}
          </button>
        </div>
      )}
    </>
  )
}
