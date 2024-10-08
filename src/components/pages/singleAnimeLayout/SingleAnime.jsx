import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAnimeByIdQuery } from '../../../api/apiSlice';
import { AuthContext } from '../../../context/AuthContext';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import Helmet from 'react-helmet';

import AnimeRelations from '../../animeRelations/AnimeRelations';
import AnimeRecommendations from '../../animeRecommendations/AnimeRecommendations';
import ChooseListModal from '../../modals/ChooseListModal';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleAnime.scss';

const SingleAnime = () => {
  const isMountedRef = useRef(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInList, setIsInList] = useState(false);
  const [currentList, setCurrentList] = useState('');
  const { currentUser } = useContext(AuthContext);

  const { animeId } = useParams();
  const {
    data: anime,
    isLoading, 
    isError,
    error
  } = useGetAnimeByIdQuery(animeId);

  useEffect(() => {
    isMountedRef.current = true;

    if (currentUser) {
      checkIfAnimeInAnyList();
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    return () => {
      isMountedRef.current = false;
    }
  }, [animeId, currentUser]);

  const checkIfAnimeInAnyList = async () => {
    if (!animeId || !currentUser || !currentUser.uid) return;

    const lists = ['watching', 'completed', 'planned', 'on-hold', 'dropped'];

    for (const list of lists) {
      const animeListDocRef = doc(db, 'users', currentUser.uid, 'animeLists', list);
      const querySnapshot = await getDoc(animeListDocRef);

      if (querySnapshot.exists() && querySnapshot.data().anime.some(a => a.animeId === +animeId)) {
        setIsInList(true);
        setCurrentList(list);
        break;
      } else {
        setIsInList(false);
        setCurrentList('');
      }
    }
  };

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
      toast.error('Please log in or sign up to add anime to your list', { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000
      });
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

      if (isInList) {
        const currentListDocRef = doc(db, 'users', currentUser.uid, 'animeLists', currentList);
        await setDoc(currentListDocRef, {
          anime: arrayRemove(animeDataToAdd)
        }, { merge: true });
      }

      await setDoc(animeListDocRef, {
        anime: arrayUnion(animeDataToAdd)
      }, { merge: true });
      
      setIsModalOpen(false);
      setIsInList(true);
      setCurrentList(listName);

      toast.success(`Anime successfully moved to '${listName}' list`, { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.message, { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000
      });
    }
  };

  const handleRemoveFromList = async () => {
    try {
      const animeListDocRef = doc(db, 'users', currentUser.uid, 'animeLists', currentList);
      const animeDataToRemove = {
        animeId: mal_id,
        images,
        episodes,
        title_english,
        title
      };

      await setDoc(animeListDocRef, {
        anime: arrayRemove(animeDataToRemove)
      }, { merge: true });

      setIsInList(false);
      setCurrentList('');

      toast.success(`Anime successfully removed from '${currentList}' list`, { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.message, { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000
      });
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
            onClick={handleListButtonClick}>
              {isInList ? (
                <>
                  <FaEdit />
                  Edit List
                </>
              ) : (
                <>
                  <IoMdAddCircleOutline /> 
                  Add to List
                </>
              )}
          </button>
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
          <AnimeRelations id={mal_id} isSingleAnimePageMountedRef={isMountedRef} />
          <div className="title_fz25fw500 recommendations__title">Recommendations</div>
          <AnimeRecommendations id={mal_id} isSingleAnimePageMountedRef={isMountedRef} />
        </div>
        <ChooseListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onChoose={handleAddToList}
          currentList={currentList}
          handleRemoveFromList={handleRemoveFromList}
        />
        <ToastContainer />
      </div>
    </>
  )
}

export default SingleAnime;