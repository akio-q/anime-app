import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAnimeByIdQuery } from '../../../api/apiSlice';
import { AuthContext } from '../../../context/AuthContext';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Helmet from 'react-helmet';
import { IoMdAddCircleOutline } from "react-icons/io";

import AnimeRelations from '../../animeRelations/AnimeRelations';
import AnimeRecommendations from '../../animeRecommendations/AnimeRecommendations';
import ChooseListModal from '../../modals/ChooseListModal';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleAnime.scss';

const SingleAnime = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
  const displayTitle = title_english || title;
  const displayEpisodes = episodes ? episodes : '?'; 
  const displaySeasonAndYear = season && year 
                                ? `${season} ${year}` 
                                : season 
                                ? `${season}, (year unknown)` 
                                : year 
                                ? `${year}, (season unknown)` 
                                : 'Season and year unknown';

  const handleListButtonClick = () => {
    if (currentUser) {
      setIsModalOpen(true);
    } else {
      navigate('/login');
    }
  }

  const handleAddToList = async (listName) => {
    try {
      const animeListDocRef = doc(db, 'users', currentUser.uid, 'animeLists', listName);
      const animeDataToAdd = {
        animeId: mal_id,
        images,
        episodes,
        title_english,
        title
      };

      await setDoc(animeListDocRef, {
        anime: arrayUnion(animeDataToAdd)
      }, { merge: true });
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding anime to list: ', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Discover {displayTitle} - AniSurf</title>
        <meta 
          name="description" 
          content={`Explore detailed information about ${displayTitle}, including its score, rating, genres, synopsis and more!`} />
      </Helmet>
      <div className="single-anime">
        <div>
          <img src={img} alt="anime-img" className="single-anime__img" />
          <button
            className=' button single-anime__list-button' 
            onClick={handleListButtonClick}><IoMdAddCircleOutline /> Add to List</button>
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
              <div className="title_fz30fw700 single-anime__main-title">{displayTitle}</div>
              <div className="title_fz18fw500 single-anime__secondary-title">{title}</div>
            </div>
            <div className="single-anime__release">
              <div>{displaySeasonAndYear}</div>
              <div>{displayEpisodes} episodes</div>
            </div>
          </div>
          <div className="single-anime__descr">{synopsis}</div>
          <div className="title_fz25fw500 related-anime__title">Anime Relations</div>
          <AnimeRelations id={mal_id} />
          <div className="title_fz25fw500 recommendations__title">Recommendations</div>
          <AnimeRecommendations id={mal_id} />
        </div>
        <ChooseListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onChoose={handleAddToList}
        />
      </div>
    </>
  )
}

export default SingleAnime;