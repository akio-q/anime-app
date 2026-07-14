import { NavLink } from "react-router-dom";

const TopAnimeSliderSlide = ({id, data}) => {
  const { coverImage, title, description, genres } = data;
  
  const img = coverImage?.large || '';
  
  const displayTitle = title?.english || title?.romaji || 'Unknown Title';
  
  const cleanSynopsis = description ? description.replace(/<[^>]*>?/gm, '') : 'No synopsis available yet.';
  const descr = cleanSynopsis.length > 800 ? cleanSynopsis.slice(0, 800) + '...' : cleanSynopsis;
  
  const genresString = genres ? genres.join(', ') : 'No genres listed';

  return (
    <>
      <img src={img} alt={displayTitle} className="top-anime-slider__img" />
      <div className="top-anime-slider__info">
        <div className="title_fz30fw600 top-anime-slider__title">{displayTitle}</div>
        <div className="top-anime-slider__descr">{descr}</div>
        <div className="top-anime-slider__footer">
          <div className="top-anime-slider__genre">
            <i className='icon-price-tag'></i>
            <div className="top-anime-slider__genre-text">{genresString}</div>
          </div>
          <NavLink 
            className='button top-anime-slider__button'
            end
            to={`/anime/${id}`}>Visit the page</NavLink>
        </div>
      </div>
    </>
  )
}

export default TopAnimeSliderSlide;