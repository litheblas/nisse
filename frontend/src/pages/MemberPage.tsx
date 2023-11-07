import { useParams } from 'react-router-dom'

export const MemberPage = () => {
  const { memberId } = useParams()

  return (
    <>
      <p>Medlem</p>
      <p>{memberId}</p>
    </>
  )
}
