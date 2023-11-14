import { useQuery } from 'react-query'
import { MembersService } from '../api'

export const MembersListPage = () => {
  const { isLoading, isError, isIdle, data, error } = useQuery(
    'member_list',
    MembersService.membersList.bind(window)
  )

  if (isLoading || isIdle) {
    return <span>Loading...</span>
  }

  if (isError) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    else return <span>Unknown error!</span>
  }

  return (
    <>
      <h1 className="pageHeading">Blåsbasen</h1>
      <div>
        {data.map((member) => (
          <p key={member.id}>{member.id}</p>
        ))}
      </div>
    </>
  )
}
