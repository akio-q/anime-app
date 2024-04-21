import { useNavigate } from 'react-router-dom';

import './animeCard.scss';

const AnimeCard = ({id, data}) => {
  const navigate = useNavigate();

  const navigateToSingleAnimePage = () => {
    navigate(`/anime/${id}`, {state: {data}})
  }

  const {images, episodes, title_english, title} = data;
  const img = images.webp.large_image_url;
  const displayEpisodes = episodes ? episodes : '?'; 
  const displayTitle = title_english && title_english.length > 37 
                        ? title_english.slice(0, 37) + '...' 
                        : title_english ?? title;
  
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