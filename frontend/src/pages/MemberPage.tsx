import { useLoaderData } from 'react-router-typesafe'
import { memberLoader } from '../loaders/MemberLoader'

export const MemberPage = () => {
  const member = useLoaderData<typeof memberLoader>()

  return (
    <>
      <p>Medlem</p>
      <p>{member.id}</p>
    </>
  )
}
