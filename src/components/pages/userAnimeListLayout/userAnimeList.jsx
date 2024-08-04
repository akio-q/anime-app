import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { getDocs, collection, query, getDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

import AnimeCard from '../../animeCard/AnimeCard';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './userAnimeList.scss';

const UserAnimeList = () => {
  const [activeTab, setActiveTab] = useState('watching');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const joinDate = currentUser?.metadata?.creationTime;

  useEffect(() => {
    const fetchAnimeList = async () => {
      setLoading(true);
      setError(null);

      try {
        const animeListRef = doc(db, 'users', currentUser.uid, 'animeLists', activeTab);
        const querySnapshot = await getDoc(animeListRef);

        if (querySnapshot.exists()) {
          setAnimeList(querySnapshot.data().anime);
        } else {
          setAnimeList([]);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, [activeTab, currentUser.uid]);

  return (
    <div className='user-anime-list'>
      <div className="user-anime-list__user">
        <img src={currentUser.photoURL} alt="" className="user-anime-list__user-photo" />
        <div className="title_fz25fw600 user-anime-list__user-name">{currentUser.displayName}</div>
        <div className='title_fz16fw500'>Join Date: {joinDate ? new Date(joinDate).toLocaleDateString() : 'N/A'}</div>
      </div>
      <div className="user-anime-list__content">
        <div className="title_fz30fw600">{`${currentUser.displayName}'s Anime List`}</div>
        <div className="user-anime-list__tabs">
          <button 
            className={`user-anime-list__tab ${activeTab === 'watching' ? 'active' : ''}`} 
            onClick={() => setActiveTab('watching')}>
            Watching
          </button>
          <button 
            className={`user-anime-list__tab ${activeTab === 'completed' ? 'active' : ''}`} 
            onClick={() => setActiveTab('completed')}>
            Completed
          </button>
          <button 
            className={`user-anime-list__tab ${activeTab === 'planned' ? 'active' : ''}`} 
            onClick={() => setActiveTab('planned')}>
            Planned
          </button>
          <button 
            className={`user-anime-list__tab ${activeTab === 'on-hold' ? 'active' : ''}`} 
            onClick={() => setActiveTab('on-hold')}>
            On Hold
          </button>
          <button 
            className={`user-anime-list__tab ${activeTab === 'dropped' ? 'active' : ''}`} 
            onClick={() => setActiveTab('dropped')}>
            Dropped
          </button>
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
              {animeList.map((anime) => (
                <AnimeCard 
                  key={anime.animeId} 
                  id={anime.animeId}
                  data={anime.data} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserAnimeList;