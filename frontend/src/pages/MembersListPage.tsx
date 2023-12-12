import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { MembersService } from '../api'
import style from './styling/MembersListPage.module.css'

// TODO: Create more search filters such as sektion, aktiv, gamling, uppdrag...
// TODO: Add sort_by functionality for full_name, last_name, short_name, active_period...
// Make it possible to change between high->low or low->high

export const MembersListPage = () => {
  const { isLoading, isError, isIdle, data, error } = useQuery(
    'member_list',
    MembersService.membersList.bind(
      window,
      'id,full_name,active_period,short_name,real_name'
    )
  )

  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [currentPage, setCurrentPage] = useState(1)

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredMembers, setFilteredMembers] = useState(data)

  if (isLoading || isIdle) {
    return <span>Loading...</span>
  }

  if (isError) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    else return <span>Unknown error!</span>
  }

  if (!data) {
    return <span>No data available</span>
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    // Filter the data based on the search query
    const filtered = data.filter((member) => {
      const { full_name, active_period, short_name, real_name } = member

      return (
        (full_name && full_name.toLowerCase().includes(query.toLowerCase())) ||
        (short_name &&
          short_name.toLowerCase().includes(query.toLowerCase())) ||
        (real_name && real_name.toLowerCase().includes(query.toLowerCase())) ||
        (active_period &&
          active_period.toString().replace(/–/g, '-').includes(query))
      )
    })

    setFilteredMembers(filtered) // Update the filtered members state
    setCurrentPage(1) // Reset to the first page when performing a new search
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
      <h1 className={style.header}>Blåsbasen</h1>
      <div className={style.inputContainer}>
        <input
          type="text"
          placeholder="Sök på namn eller aktiv period"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
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
