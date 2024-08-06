import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Helmet from 'react-helmet';

import AnimeCard from '../../animeCard/AnimeCard';
import Pagination from '../../pagination/Pagination';
import UserCard from '../../userCard/UserCard';
import Spinner from '../../spinner/Spinner';
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

  const animeLists = ['watching', 'completed', 'planned', 'on-hold', 'dropped'];
  const ITEMS_PER_PAGE = 20;

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
    <>
      <Helmet>
        <title>{`AniSurf | ${currentUser.displayName}'s Anime List`}</title>
        <meta
          name="description"
          content={`Explore and manage your anime list, including watching, completed, planned, on-hold, and dropped titles. View details and pagination for each list.`}
        />
      </Helmet>
      <div className='user-anime-list'>
        <UserCard additionalClass={'user-card__list'} />
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
    </>
  )
}

export default UserAnimeList;