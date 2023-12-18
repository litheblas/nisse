import CircularProgress from '@mui/material/CircularProgress'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { MembersService } from '../api'
import style from './styling/MemberPage.module.css'

// Import membership icons
import OtherIcon from '../assets/blottartuban-top-half.svg'
import BalettIcon from '../assets/membershipIcons/balett.png'
import BanjoIcon from '../assets/membershipIcons/banjo.png'
import KlarinettIcon from '../assets/membershipIcons/clarinet.png'
import BasIcon from '../assets/membershipIcons/electric_guitar.png'
import FlöjtIcon from '../assets/membershipIcons/fluteIcon.png'
import HornIcon from '../assets/membershipIcons/french_horn.png'
import SaxofonIcon from '../assets/membershipIcons/saxophone.png'
import TrummorIcon from '../assets/membershipIcons/snare_drum.png'
import TrombonIcon from '../assets/membershipIcons/trombone.png'
import TrumpetIcon from '../assets/membershipIcons/trumpet.png'
import TubaIcon from '../assets/membershipIcons/tuba.png'

// Import memberPage icons
import addressIcon from '../assets/memberPageIcons/addressIcon.svg'
import mailIcon from '../assets/memberPageIcons/mailIcon.svg'
import phoneIcon from '../assets/memberPageIcons/phoneIcon.svg'

// Import medal icons
import medal1 from '../assets/medalIcons/medal1.png'
import medal10 from '../assets/medalIcons/medal10.png'
import medal2 from '../assets/medalIcons/medal2.png'
import medal3 from '../assets/medalIcons/medal3.png'
import medal4 from '../assets/medalIcons/medal4.png'
import medal5 from '../assets/medalIcons/medal5.png'
import medal6 from '../assets/medalIcons/medal6.png'
import medal7 from '../assets/medalIcons/medal7.png'
import medal8 from '../assets/medalIcons/medal8.png'
import medal9 from '../assets/medalIcons/medal9.png'

import tempProfilePic from '../assets/templateProfilePic.jpg'
interface Membership {
  id: number
  membership_type: string
  start_date: string
  end_date?: string | null
}

interface Engagement {
  id: number
  engagement_type: string
  start_date: string
  end_date?: string | null
}

const membershipTypeImages: Record<string, string> = {
  Banjo: BanjoIcon,
  Klarinett: KlarinettIcon,
  Bas: BasIcon,
  Horn: HornIcon,
  Flöjt: FlöjtIcon,
  Saxofon: SaxofonIcon,
  Trummor: TrummorIcon,
  Tuba: TubaIcon,
  Trombon: TrombonIcon,
  Trumpet: TrumpetIcon,
  Balett: BalettIcon,
}

const medalIcons = [
  medal1,
  medal2,
  medal3,
  medal4,
  medal5,
  medal6,
  medal7,
  medal8,
  medal9,
  medal10,
]

export const MemberPage = () => {
  const { memberId } = useParams<{ memberId: string }>()

  const { isLoading, isError, isIdle, data, error } = useQuery(
    'member_page',
    MembersService.membersRetrieve.bind(
      window,
      memberId!,
      'id,email,full_name,profile_picture,memberships,engagements,birth_date,liu_id,complete_adress,phone_number_1,phone_number_2,phone_number_3,pronouns,arbitrary_text'
    )
  )

  if (isLoading || isIdle) {
    return (
      <>
        <div className={style.loadingSpinnerContainer}>
          <CircularProgress color="inherit" />
        </div>
      </>
    )
  }

  if (isError) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    else return <span>Unknown error!</span>
  }
  if (!data) {
    return <span>No data available</span>
  }

  const { full_name, memberships, engagements, arbitrary_text } = data

  // Explicitly define memberships and engagements as an array
  const typedMemberships: Membership[] = memberships as Membership[]
  const typedEngagements: Engagement[] = engagements as Engagement[]

  const activeMemberships = typedMemberships.filter(
    (memberships) => !memberships.end_date
  )
  const activeEngagements = typedEngagements.filter(
    (engagements) => !engagements.end_date
  )

  // list of attributes to show on personalInfo and icons.
  const personalInfo = [
    [data.email, mailIcon],
    [data.birth_date],
    [data.pronouns],
    [data.liu_id],
    [data.complete_adress, addressIcon],
    [data.phone_number_1, phoneIcon],
    [data.phone_number_2, phoneIcon],
    [data.phone_number_3, phoneIcon],
  ]

  // Filter out null attributes from personalInfo
  const personalInfoToShow = personalInfo.filter(
    (attr) => attr[0] !== null && attr[0] !== undefined && attr[0] !== ''
  )

  let newMedalIndex = 0
  function getMedalIcon() {
    const medalIcon = medalIcons[newMedalIndex]
    newMedalIndex = (newMedalIndex + 1) % medalIcons.length

    return medalIcon
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.leftColumnCentered}>
          <div className={style.profileImageContainer}>
            <img src={tempProfilePic} alt="Your Image" />
          </div>
        </div>

        <div className={style.rightColumn}>
          <div className={style.buttons}>
            <Link to={`../`}>
              <button
                className={`standardButton blueButton ${style.newButton}`}
              >
                Tillbaka till Blåsbasen
              </button>
            </Link>
            <Link to={`../`}>
              <button
                className={`standardButton blueButton ${style.newButton}`}
              >
                Ändra information
              </button>
            </Link>
          </div>

          <h1>{full_name}</h1>
          <div className={style.activeMembershipEngagements}>
            {/* Display active memberships */}
            {activeMemberships.map((membership: Membership) => (
              <h3 key={membership.id}>{membership.membership_type}</h3>
            ))}

            {/* Display active engagements */}
            {activeEngagements.map((engagement: Engagement) => (
              <h3 key={engagement.id}>{engagement.engagement_type}</h3>
            ))}
          </div>
          <h4>{arbitrary_text}</h4>
        </div>
      </div>

      {/* Display personal info */}
      <div className={style.personalInfoTableContainer}>
        {personalInfoToShow.map((attr, infoIndex) => (
          <div key={infoIndex} className={style.personalInfoAttribute}>
            <img src={attr[1] ? attr[1] : mailIcon} alt="no Icon" />
            <h4>{attr[0]}</h4>
          </div>
        ))}
      </div>

      <div className={style.container}>
        <div className={style.leftColumn}>
          {/* Memberships table */}
          <div className={style.gridContainer}>
            <div className={style.gridContainerHeader}>
              <h2>Medlemskap</h2>
            </div>
            {typedMemberships.map((membership: Membership) => (
              <div className={style.gridItem} key={membership.id}>
                <img
                  src={
                    membershipTypeImages[membership.membership_type] ||
                    OtherIcon
                  }
                  alt="No icon found"
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <p className={style.membershipTypeFont}>
                    Antagen {membership.membership_type}
                  </p>
                  <p className={style.dataRangeFont}>
                    {membership.start_date} - {membership.end_date || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Barstatistics table */}
          <div className={style.gridContainer}>
            <div className={style.gridContainerHeader}>
              <h2>Barstatistik</h2>
            </div>
            {typedMemberships.map((membership: Membership) => (
              <div className={style.gridItem} key={membership.id}>
                <img
                  src={
                    membershipTypeImages[membership.membership_type] ||
                    OtherIcon
                  }
                  alt="No icon found"
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <p className={style.membershipTypeFont}>
                    Antagen {membership.membership_type}
                  </p>
                  <p className={style.dataRangeFont}>
                    {membership.start_date} - {membership.end_date || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={style.rightColumn}>
          {/* Engagements table */}
          <div className={style.gridContainer}>
            <div className={style.gridContainerHeader}>
              <h2>Engagemang</h2>
            </div>
            {typedEngagements.map((engagement: Engagement) => (
              <div className={style.gridItem} key={engagement.id}>
                <img
                  src={getMedalIcon()}
                  alt="No icon found"
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <p className={style.membershipTypeFont}>
                    {engagement.engagement_type}
                  </p>
                  <p className={style.dataRangeFont}>
                    {engagement.start_date} - {engagement.end_date || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
