import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { Member, MembersService } from '../api'
import { EditMemberForm } from '../components/EditMemberForm'

export const MemberPage = () => {
  const { memberId } = useParams()
  const { isLoading, isError, isIdle, data, error } = useQuery(
    'member_view',
    MembersService.membersRetrieve.bind(window, memberId!, undefined)
  )

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (member: Member) => {
      console.log(member)
      return MembersService.membersUpdate(member.id, member)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['member_list', 'member_view'],
      })
    },
  })

  if (isLoading || isIdle) {
    return <span>Loading...</span>
  }
  if (isError) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    else return <span>Unknown error!?</span>
  }
  console.log(data)
  return (
    <EditMemberForm
      baseMember={data}
      onSubmit={(member) => {
        mutation.mutate(member)
      }}
    />
  )
}
