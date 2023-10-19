import { LoaderFunction } from 'react-router-typesafe'
import { Member } from '../types/Member'

interface MemberLoaderParams {
  memberId: string
}

export const memberLoader = (({ params }) => {
  const typedParams = params as unknown as MemberLoaderParams
  const m: Member = { id: typedParams.memberId, name: 'Kisac' }
  return m
}) satisfies LoaderFunction
