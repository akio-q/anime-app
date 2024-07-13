import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAnimeByIdQuery } from '../../../api/apiSlice';

import RelatedAnime from '../../relatedAnime/RelatedAnime';
import AnimeRecommendations from '../../animeRecommendations/AnimeRecommendations';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleAnimeLayout.scss';

const SingleAnimeLayout = () => {
  const { animeId } = useParams();
  const {
    data: anime,
    isLoading, 
    isError,
    error
  } = useGetAnimeByIdQuery(animeId);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [animeId]);

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage errorStatus={error.status} />
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
  } = anime.data;
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
            <div className="title_fz30fw700 single-anime__main-title">{title_english}</div>
            <div className="title_fz18fw500 single-anime__secondary-title">{title}</div>
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