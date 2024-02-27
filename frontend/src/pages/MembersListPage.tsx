import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { MembersService } from '../api'
import style from './styling/MembersListPage.module.css'

// TODO: Create more search filters such as sektion, aktiv, gamling, uppdrag...
// TODO: Add sort_by functionality for full_name, last_name, short_name, active_period...
// Make it possible to change between high->low or low->high

/*
const membershipGroups: Record<string, string> = {
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
*/

// Define your initial queryFields
const initialQueryFields = 'id,full_name,active_period,real_name'

export const MembersListPage = () => {
  const [queryFields, setQueryFields] = useState(initialQueryFields)

  const { isLoading, isError, isIdle, data, error, refetch } = useQuery(
    ['member_list', queryFields],
    MembersService.membersList.bind(window, queryFields)
  )

  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [currentPage, setCurrentPage] = useState(1)

  const [searchQuery, setSearchQuery] = useState('')
  const [staticFilteredMembers, setStaticFilteredMembers] = useState(data)
  const [filteredMembers, setFilteredMembers] = useState(data)

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

  const [triggerFilterUpdate, setTriggerFilterUpdate] = useState(false)
  const [sortActive, setSortActive] = useState(true)
  const [sortGamling, setSortGamling] = useState(true)

  // Baed on checkboxes marked, update query field to load extra information.
  const searchAdvanced = () => {
    let searchQuery: string = initialQueryFields
    const example = false
    if (example) {
      // make true if you want to refetch data with new search query
      //  This is an example
      searchQuery += ',email'
      handleQueryFieldsChange(searchQuery)
    } else {
      setTriggerFilterUpdate(!triggerFilterUpdate)
    }
  }

  // useEffect to update staticFilteredMembers after refetch() completes or showAdvancedSearch is pressed
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
        return staticFilter
      })

      setStaticFilteredMembers(staticFiltered)
    }

    if (showAdvancedSearch) {
      filterAdvanced()
    } else {
      setStaticFilteredMembers(data)
    }
  }, [data, showAdvancedSearch, triggerFilterUpdate])

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
                aktiva
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sortGamling}
                  onChange={() => setSortGamling(!sortGamling)}
                />
                gamling
              </label>
            </div>
            <button className={style.advancedButton} onClick={searchAdvanced}>
              Sök advancerat
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

  // If no filter (text in search box) is active, show staticFilteredMembers members
  const membersToDisplay = searchQuery
    ? filteredMembers || []
    : staticFilteredMembers
    ? staticFilteredMembers
    : data

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = membersToDisplay.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(membersToDisplay.length / itemsPerPage)

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
              <td>{member.email}</td>
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
