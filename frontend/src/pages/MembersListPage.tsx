import { useLoaderData } from 'react-router-typesafe'
import { membersListLoader } from '../loaders/MembersListLoader'

export const MembersListPage = () => {
  const members = useLoaderData<typeof membersListLoader>()
  return (
    <>
      <h1>Blåsbasen</h1>
      <div>
        {members.map((member) => (
          <p key={member.id}>{member.id}</p>
        ))}
      </div>
    </>
  )
}
