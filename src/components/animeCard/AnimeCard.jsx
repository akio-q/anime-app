import { Link } from 'react-router-dom';

import './animeCard.scss';

const AnimeCard = ({id, img, episodes, title}) => {
  const displayEpisodes = episodes ? episodes : 0; 

  return (
    <div className='anime__card'>
      <img src={img} alt="anime-card" className="anime__card-img" />
      <div className="anime__card-episodes">{displayEpisodes}</div>
      <Link to={`/anime/${id}`} className="title_fz14fw500 anime__card-title">{title}</Link>
    </div>
  )
}

export default AnimeCard;