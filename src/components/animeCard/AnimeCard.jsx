import { NavLink } from 'react-router-dom';
import './animeCard.scss';

const AnimeCard = ({ id, coverImage, episodes, title }) => {
  const img = coverImage?.extraLarge || coverImage?.large || '';
  const displayEpisodes = episodes ? episodes : '?'; 
  const displayTitle = title?.english || title?.romaji || 'Unknown Title';
  
  return (
    <div className='anime__card'>
      <img src={img} alt={displayTitle} className="anime__card-img" />
      <div className="anime__card-episodes">{displayEpisodes}</div>
      <div className="anime__card-info">
        <NavLink
          className="title_fz14fw500 anime__card-title"
          end
          to={`/anime/${id}`}>{displayTitle}</NavLink>
      </div>
      
    </div>
  )
}

export default AnimeCard;