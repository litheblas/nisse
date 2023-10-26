import { LoaderFunction } from 'react-router-typesafe'
import { MembersService } from '../api'

export const membersListLoader = (async () => {
  const members = await MembersService.membersList()
  return members
}) satisfies LoaderFunction
