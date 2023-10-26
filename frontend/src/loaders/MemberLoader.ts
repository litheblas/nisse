import { LoaderFunction } from 'react-router-typesafe'
import { MembersService } from '../api'

interface MemberLoaderParams {
  memberId: string
}

export const memberLoader = (({ params }) => {
  const typedParams = params as unknown as MemberLoaderParams
  const member = MembersService.membersRetrieve(typedParams.memberId)
  return member
}) satisfies LoaderFunction
