import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { MembersService } from '../api'

export const MemberPage = () => {
  const { memberId } = useParams<{ memberId: string }>()

  const { isLoading, isError, isIdle, data, error } = useQuery(
    'member_page',
    MembersService.membersRetrieve.bind(
      window,
      memberId!,
      'id,full_name,active_period,profile_picture'
    )
  )

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

  const { full_name, active_period, profile_picture } = data

  return (
    <>
      <p>Medlem</p>
      <p>{memberId}</p>
      <div>
        <h2>{full_name}</h2>
        <h2>{active_period}</h2>
        <img src={profile_picture} alt="Profile Picture" />
      </div>
    </>
  )
}
