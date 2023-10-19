import { faFacebook, faInstagram, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import blottartubanTopHalf from 'src/assets/blottartuban-top-half.svg'
import style from './styling/Footer.module.css'

export const Footer = () => {
  return (
    <footer>
      <div className={style.content}>
        <div className={style.info}>
          <strong>LiTHe Blås</strong>
          <br />
          Kårallen, Linköpings universitet
          <br />
          581 83 Linköping
          <br />
          <br />
          <a href="mailto:lithe.blas@music.liu.se" target="_blank" rel="noopener noreferrer">
            lithe.blas@music.liu.se
          </a>
          <br />
          <a href="https://www.litheblas.org/sv/integritetspolicy/" target="_blank" rel="noopener noreferrer">
            Integritetspolicy
          </a>
          <br />
          PlusGiro 189397-3
          <div className={style.social_icons}>
            <a href="http://open.spotify.com/artist/3gwlyGQlIZzzVTgUWXghY6" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faSpotify} />
            </a>
            <a href="https://www.youtube.com/results?search_query=lithe+bl%C3%A5s" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="http://facebook.com/litheblas" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="http://instagram.com/litheblas" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        <img src={blottartubanTopHalf} alt="Blottartuban" />
      </div>
    </footer>
  )
}
