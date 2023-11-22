import { Link } from 'react-router-dom'
import style from './styling/InformationChannelsPage.module.css'

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
      {buttonText && buttonText.trim() !== '' && (
        <Link to={linkPath} className={style.btn}>
          {buttonText}
        </Link>
      )}
    </div>
  )
}

export const InformationChannelsPage = () => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1>Informationskanaler</h1>
      </header>
      <main className={style.mainContent}>
        <BoxInfo
          title="Discord"
          description="Blåset har en Discord server där du kan spela spel, hänga, plugga eller vad du tycker passar. Här kan det även komma små utskick av information för att nå ut till så många som möjligt."
          buttonText="Blåsets Discord"
          linkPath="https://discord.com/invite/9WeayJK"
        />
        <BoxInfo
          title="blasare-info@lists.lysator.liu.se"
          description="Infolistan är den viktiga mailinglistan för dig som aktiv blåsare. Se till så du finns på den med en aktiv mailadress!"
          buttonText="Gå med i Infolistan"
          linkPath="https://lists.lysator.liu.se/mailman/postorius/lists/blasare-info.lists.lysator.liu.se/"
        />
        <BoxInfo
          title="blasare@lists.lysator.liu.se"
          description="Bajslistan är en mindre viktig lista där allt från gamla historier, blåsare som säljer en möbel eller gamlingar som har åsikter kan förekomma."
          buttonText="Gå med i Bajslistan"
          linkPath="https://lists.lysator.liu.se/mailman/postorius/lists/blasare.lists.lysator.liu.se/"
        />
        <BoxInfo
          title="aktiva@lists.litheblas.org"
          description="Alla aktiva i LiTHe Blås (förra rep-listan). Självklart får Gamlingar också vara med, men räkna med spoilers! Är du aktiv i LiTHe Blås hamnar du där automagiskt, men om du inte är det peta på Skrivkunig."
          buttonText=""
          linkPath=""
        />
        <BoxInfo
          title="Övriga listor (@lists.litheblas.org)"
          description="Sektionslistor, grupplistor, och lite annat smått och gott kan man gå med i här. Om du inte är med i en maillista behöver din mail godkännas innan det släpps igenom. Om du inte är med inom 24h peta på Skrivkunig."
          buttonText="Gå med i övriga listor"
          linkPath="https://lists.litheblas.org/postorius/lists/"
        />
      </main>
    </div>
  )
}
