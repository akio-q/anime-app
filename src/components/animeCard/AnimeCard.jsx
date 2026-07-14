import { NavLink } from 'react-router-dom';

import './animeCard.scss';

const AnimeCard = ({ id, coverImage, episodes, title }) => {
  const img = coverImage?.large || '';
  
  const displayEpisodes = episodes ? episodes : '?'; 
  
  const rawTitle = title?.english || title?.romaji || 'Unknown Title';

  const displayTitle = rawTitle.length > 37 
                        ? rawTitle.slice(0, 37) + '...' 
                        : rawTitle;
  
  return (
    <div className='anime__card'>
      <img src={img} alt={displayTitle} className="anime__card-img" />
      <div className="anime__card-episodes">{displayEpisodes}</div>
      <NavLink
        className="title_fz14fw500 anime__card-title"
        end
        to={`/anime/${id}`}>{displayTitle}</NavLink>
    </div>
  )
}

export default AnimeCard;