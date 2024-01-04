import './animeCard.scss';

const AnimeCard = ({ classModifier }) => {
  const mod = classModifier ? ' anime__card_' + classModifier : null;

  return (
    <div className={'anime__card' + mod}>
      <img src='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/f154230aab3191aba977f337d392f812.jpe' alt="anime-card" className="anime__card-img" />
      <div className="anime__card-episodes">1088</div>
      <div className="anime__card-name">ONE PIECE</div>
    </div>
  )
}

export default AnimeCard;