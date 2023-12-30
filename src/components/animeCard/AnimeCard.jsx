import './animeCard.scss';

const AnimeCard = () => {
  return (
    <div className="anime-card">
      <img src='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/f154230aab3191aba977f337d392f812.jpe' alt="anime-card" className="anime-card__img" />
      <div className="anime-card__episodes">1088</div>
      <div className="anime-card__name">ONE PIECE</div>
    </div>
  )
}

export default AnimeCard;