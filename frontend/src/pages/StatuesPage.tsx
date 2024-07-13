import stadgarPDF from '../assets/stadgar.pdf'
import style from './styling/StatuesPage.module.css'

export const StatuesPage = () => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1>Stadgar</h1>
      </header>

      <div className={style.infoContainer}>
        <p>
          Här kan man se föreningens stadgar. För att se föreningens
          mötesprotokoll eller andra styrdokument, tryck på knappen för att gå
          vidare till Google Drive.
        </p>

        <button
          onClick={() =>
            window.open(
              'https://drive.google.com/drive/folders/1DNFzCN0o3qRWROojrVfndK-37J9w27Td?usp=sharing',
              '_blank',
              'noopener,noreferrer'
            )
          }
        >
          Drive för mötesprotokoll och styrdokument
        </button>
      </div>
      <p>
        Ser du ingen PDF kan du ladda ner den{' '}
        <a href={stadgarPDF} target="_blank" rel="noopener noreferrer">
          här
        </a>
        .
      </p>
      <embed
        src={stadgarPDF}
        type="application/pdf"
        width="100%"
        height="800px"
        style={{ display: 'block' }}
      />
    </div>
  )
}
