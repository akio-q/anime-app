import { useNavigate } from 'react-router-dom';

import './animeCard.scss';

const AnimeCard = ({id, img, episodes, title, data}) => {
  const displayEpisodes = episodes ? episodes : 0; 
  const navigate = useNavigate();

  const navigateToSingleAnimePage = () => {
    navigate(`/anime/${id}`, {state: {data}})
  }

  return (
    <div className='anime__card'>
      <img src={img} alt="anime-card" className="anime__card-img" />
      <div className="anime__card-episodes">{displayEpisodes}</div>
      <div
        className="title_fz14fw500 anime__card-title"
        onClick={navigateToSingleAnimePage}>{title}</div>
    </div>
  )
}

export default AnimeCard;