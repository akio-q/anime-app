import { useNavigate } from 'react-router-dom';

import './animeCard.scss';

const AnimeCard = ({id, images, episodes, englishTitle, title, data}) => {
  const navigate = useNavigate();

  const navigateToSingleAnimePage = () => {
    navigate(`/anime/${id}`, {state: {data}})
  }

  const img = images.webp.large_image_url;
  const displayEpisodes = episodes ? episodes : 0; 
  const displayTitle = englishTitle && englishTitle.length > 37 
                        ? englishTitle.slice(0, 37) + '...' 
                        : englishTitle ?? title;
  
  return (
    <div className='anime__card'>
      <img src={img} alt="anime-card" className="anime__card-img" />
      <div className="anime__card-episodes">{displayEpisodes}</div>
      <div
        className="title_fz14fw500 anime__card-title"
        onClick={navigateToSingleAnimePage}>{displayTitle}</div>
    </div>
  )
}

export default AnimeCard;