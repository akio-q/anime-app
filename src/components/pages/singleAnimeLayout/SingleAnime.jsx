import { useContext, useEffect, useState, useCallback } from 'react';
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

  const checkIfAnimeInAnyList = useCallback(async () => {
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
  }, [animeId, currentUser]);
  
  useEffect(() => {
    if (currentUser) {
      checkIfAnimeInAnyList();
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [animeId, currentUser, checkIfAnimeInAnyList]);

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage errorStatus={error?.status} />
  }

  const { 
    id,
    coverImage, 
    averageScore, 
    status, 
    genres, 
    title, 
    season, 
    seasonYear,
    episodes,
    description 
  } = anime?.data?.Media || {};
  
  const img = coverImage?.extraLarge || coverImage?.large || '';
  const displayTitle = title?.english || title?.romaji || 'Unknown Title';
  const displayEpisodes = episodes ? episodes : '?'; 
  const displaySeasonAndYear = season && seasonYear 
                                ? `${season} ${seasonYear}` 
                                : season 
                                ? `${season}, (year unknown)` 
                                : seasonYear 
                                ? `${seasonYear}, (season unknown)` 
                                : 'Season and year unknown';

  const cleanSynopsis = description ? description.replace(/<[^>]*>?/gm, '') : 'No synopsis available.';

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
        animeId: id,         
        coverImage,          
        episodes,
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
        animeId: id,
        coverImage,
        episodes,
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
          <img src={img} alt={displayTitle} className="single-anime__img" />
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
                <span className='single-anime__score-text single-anime__score-text_bold'>
                  {averageScore ? `${averageScore}%` : 'N/A'}
                </span> 
              </p>
            </div>
            
            <div className="single-anime__status">{status}</div>
            
            <div className="single-anime__genre">
              {(genres || []).map((genre, index) => (
                <div key={index} className="single-anime__genre-item">
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="single-anime__about">
            <div>
              <div className="title_fz30fw700 single-anime__main-title">{displayTitle}</div>
              <div className="title_fz18fw500 single-anime__secondary-title">{title?.romaji}</div>
            </div>
            <div className="single-anime__release">
              <div>{displaySeasonAndYear}</div>
              <div>{displayEpisodes} episodes</div>
            </div>
          </div>
          <div className="single-anime__descr">{cleanSynopsis}</div>
          
          <div className="title_fz25fw500 related-anime__title">Anime Relations</div>
          <AnimeRelations id={id} />
          
          <div className="title_fz25fw500 recommendations__title">Recommendations</div>
          <AnimeRecommendations id={id} />
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