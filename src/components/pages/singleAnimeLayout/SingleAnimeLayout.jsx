import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import RelatedAnime from '../../relatedAnime/RelatedAnime';
import AnimeRecommendations from '../../animeRecommendations/AnimeRecommendations';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleAnimeLayout.scss';

const SingleAnimeLayout = () => {
  const location = useLocation();
  const data = location.state ? location.state.data : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (!data) {
    return <ErrorMessage />
  }

  const { 
    mal_id,
    images, 
    score, 
    scored_by, 
    rating, 
    status, 
    genres, 
    title_english, 
    title, 
    season, 
    year,
    episodes,
    synopsis 
  } = data;
  const img = images.webp.large_image_url;
  const displayEpisodes = episodes ? episodes : '?'; 

  return (
    <div className="single-anime">
      <div>
        <img src={img} alt="anime-img" className="single-anime__img" />
        <div className="single-anime__info">
          <div className="single-anime__score">
            <div className="title_fz18fw600 single-anime__score-title">Score</div>
            <p className="single-anime__score-text">
              <span className='single-anime__score-text single-anime__score-text_bold'>{score}</span> 
              by {scored_by} users
            </p>
          </div>
          <div className="single-anime__rating">{rating}</div>
          <div className="single-anime__status">{status}</div>
          <div className="single-anime__genre">
            {genres.map((item, index) => (
              <div key={index} className="single-anime__genre-item">
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="single-anime__about">
          <div>
            <div className="title_fz30fw700">{title_english}</div>
            <div className="title_fz18fw500">{title}</div>
          </div>
          <div className="single-anime__release">
            <div>{season} {year}</div>
            <div>{displayEpisodes} episodes</div>
          </div>
        </div>
        <div className="single-anime__descr">{synopsis}</div>
        <div className="title_fz25fw500 related-anime__title">Related Anime</div>
        <RelatedAnime id={mal_id} />
        <div className="title_fz25fw500 recommendations__title">Recommendations</div>
        <AnimeRecommendations id={mal_id} />
      </div>
    </div>
  )
}

export default SingleAnimeLayout;