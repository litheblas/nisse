import { useLoaderData } from 'react-router-typesafe'
import { memberLoader } from '../loaders/MemberLoader'

export const MemberPage = () => {
  const memberData = useLoaderData<typeof memberLoader>()

  return (
    <>
      <p>Medlem</p>
      <p>{memberData.id}</p>
    </>
  )
}
