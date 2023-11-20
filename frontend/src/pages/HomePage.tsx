import { Link } from 'react-router-dom'
import style from './styling/HomePage.module.css'

interface BoxInfoProps {
  title: string
  description: string
  buttonText: string
  linkPath: string
}

const BoxInfo = ({
  title,
  description,
  buttonText,
  linkPath,
}: BoxInfoProps) => {
  return (
    <div className={style.box}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={linkPath} className={style.btn}>
        {buttonText}
      </Link>
    </div>
  )
}

export const HomePage = () => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1>Välkommen till LiTHe Blås interna hemsida</h1>
      </header>
      <main className={style.mainContent}>
        <BoxInfo
          title="Kalender"
          description="Se vart och när vi ska spela nästa gång. Prenumerera på kalender och håll dig alltid uppdaterad."
          buttonText="Kalender"
          linkPath="/events"
        />
        <BoxInfo
          title="Informationskanaler"
          description="Blåset har flera informationskanaler och det är viktigt att du håller dig uppdaterad. Glöm inte att gå med i Blåsets Discord."
          buttonText="Informationskanaler"
          linkPath="/informationskanaler"
        />
        <BoxInfo
          title="Wiki"
          description="På Blåsets interna Wiki hittar du allt som har med LiTHe Blås att göra."
          buttonText="Wiki"
          linkPath="/wiki"
        />
        <BoxInfo
          title="Blåsbasen"
          description="Hitta information om dig själv och andra Blåsare."
          buttonText="Blåsbasen"
          linkPath="/members"
        />
      </main>
    </div>
  )
}
