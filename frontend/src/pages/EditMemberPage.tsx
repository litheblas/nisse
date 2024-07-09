import { CircularProgress } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Member, MembersService } from '../api'
import { EditMemberForm } from '../components/EditMemberForm'
import useProfilePicFetch from '../utils/FetchProfilePicture'
import style from './styling/MemberPage.module.css'

export const EditMemberPage = () => {
  const navigate = useNavigate()
  const { memberId } = useParams()

  const { isLoading, isError, isIdle, data, error } = useQuery(
    'member_edit',
    MembersService.membersRetrieve.bind(window, memberId!, undefined)
  )

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (member: Member) => {
      console.log(member)
      return MembersService.membersUpdate(member.id, member)
    },
    onSuccess: async (data) => {
      const created_member = data
      await queryClient.invalidateQueries({
        queryKey: ['member_list', 'member_edit'],
      })
      navigate('/members/' + created_member.id)
    },
  })
  const { isProfilePicLoading, profilePicError } = useProfilePicFetch(
    data?.profile_picture
  )

  if (isLoading || isProfilePicLoading || isIdle) {
    return (
      <div className={style.loadingSpinnerContainer}>
        <CircularProgress color="inherit" />
      </div>
    )
  }

  if (isError || profilePicError) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    else if (profilePicError instanceof Error)
      return <span>Error: {profilePicError.message}</span>
    else return <span>Unknown error!?</span>
  }

  return (
    <EditMemberForm
      baseMember={data}
      onSubmit={(member) => {
        mutation.mutate(member)
      }}
    />
  )
}
