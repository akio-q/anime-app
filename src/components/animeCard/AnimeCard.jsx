import './animeCard.scss';

const AnimeCard = ({img, episodes, title}) => {
  return (
    <div className='anime__card'>
      <img src={img} alt="anime-card" className="anime__card-img" />
      <div className="anime__card-episodes">{episodes}</div>
      <div className="title_fz14fw500 anime__card-title">{title}</div>
    </div>
  )
}

export default AnimeCard;