import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { MembersService } from '../api'
import style from './styling/MembersListPage.module.css'

// TODO: Create more search filters such as sektion, aktiv, gamling, uppdrag...
// TODO: Add sort_by functionality for full_name, last_name, short_name, active_period...
// Make it possible to change between high->low or low->high

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
  const [filteredMembers, setFilteredMembers] = useState(data)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (!data) {
      return <span>No data available</span>
    }

    // Filter the data based on the search query
    const filtered = data.filter((member) => {
      const queryLowerCase = query.toLowerCase()
      const includesQuery = (str: string | undefined) =>
        str && str.toLowerCase().includes(queryLowerCase)

      // Apply basic filtering logic for normal search
      let basicFilter: boolean

      basicFilter =
        includesQuery(member.full_name) ||
        includesQuery(member.real_name) ||
        !!(
          member.active_period &&
          member.active_period
            .toString()
            .replace(/–/g, '-')
            .toLowerCase()
            .includes(query.toLowerCase())
        )

      // Check if email should be included in filtering
      if (showAdvancedSearch) {
        basicFilter = basicFilter || !!includesQuery(member.email) // Add email to filter
      }

      return basicFilter
    })

    setFilteredMembers(filtered) // Update the filtered members state
    setCurrentPage(1) // Reset to the first page when performing a new search
  }

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch((prevState) => !prevState)
    handleQueryFieldsChange('id,full_name,active_period,real_name,email')
  }

  // Function to handle changes in queryFields
  const handleQueryFieldsChange = (newQueryFields: string) => {
    setQueryFields(newQueryFields)
    void refetch() // Refetch the data when queryFields changes
  }

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
            {/* Place your advanced search inputs/components here */}
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

  // If no filter is active, show all members
  const membersToDisplay = searchQuery ? filteredMembers || [] : data

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
