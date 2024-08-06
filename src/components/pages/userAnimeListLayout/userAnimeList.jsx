import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

import AnimeCard from '../../animeCard/AnimeCard';
import Pagination from '../../pagination/Pagination';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './userAnimeList.scss';

const UserAnimeList = () => {
  const [activeTab, setActiveTab] = useState('watching');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const joinDate = currentUser?.metadata?.creationTime;

  const animeLists = ['watching', 'completed', 'planned', 'on-hold', 'dropped'];
  const ITEMS_PER_PAGE = 7;

  useEffect(() => {
    const fetchAnimeList = async () => {
      setLoading(true);
      setError(null);

      try {
        const animeListRef = doc(db, 'users', currentUser.uid, 'animeLists', activeTab);
        const querySnapshot = await getDoc(animeListRef);

        if (querySnapshot.exists()) {
          const animeData = querySnapshot.data().anime || [];
          
          setAnimeList(animeData);
          setTotalPages(Math.ceil(animeData.length / ITEMS_PER_PAGE));
        } else {
          setAnimeList([]);
          setTotalPages(0);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, [activeTab, currentUser.uid]);

  const displayedAnimeList = animeList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className='user-anime-list'>
      <div className="user-anime-list__user">
        <img src={currentUser.photoURL} alt="" className="user-anime-list__user-photo" />
        <div className="title_fz25fw600 user-anime-list__user-name">{currentUser.displayName}</div>
        <div className='title_fz16fw500'>Join Date: {joinDate ? new Date(joinDate).toLocaleDateString() : 'N/A'}</div>
      </div>
      <div className="user-anime-list__content">
        <div className="title_fz30fw600 user-anime-list__title">{`${currentUser.displayName}'s Anime List`}</div>
        <div className="user-anime-list__tabs">
          {animeLists.map(list => {
            return (
              <button 
                className={`user-anime-list__tab ${activeTab === list ? 'active' : ''}`} 
                onClick={() => {
                  setActiveTab(list);
                  setCurrentPage(1);
                }}>
                  {list}
              </button>
            )
          })}
        </div>
        <div className="user-anime-list__container">
          {loading ? (
            <div className="user-anime-list__wrapper">
              <Spinner />
            </div>
          ) : error ? (
            <div className="user-anime-list__wrapper">
              <ErrorMessage />
            </div>
          ) : animeList.length === 0 ? (
            <div className="user-anime-list__wrapper title_fz16fw300">
              No anime found in this list.
            </div>
          ) : (
            <div className="anime__list">
              {displayedAnimeList.map((anime) => {
                const { animeId, images, episodes, title_english, title } = anime; 

                return (
                  <AnimeCard 
                    key={animeId} 
                    id={animeId}
                    images={images}
                    episodes={episodes}
                    title_english={title_english}
                    title={title} />
                )
              })}
            </div>
          )}
        </div>
        {animeList.length ? 
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage} /> 
        : null}
      </div>
    </div>
  )
}

export default UserAnimeList;