import React, { useState, useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";

import './userAnimeList.scss';

const UserAnimeList = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const { currentUser } = useContext(AuthContext);
  const joinDate = currentUser?.metadata?.creationTime;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
            className={`user-anime-list__tab ${activeTab === 'tab1' ? 'active' : ''}`} 
            onClick={() => handleTabClick('tab1')}
          >
            Watching
          </button>
          <button 
            className={`user-anime-list__tab ${activeTab === 'tab2' ? 'active' : ''}`} 
            onClick={() => handleTabClick('tab2')}
          >
            Completed
          </button>
          <button 
            className={`user-anime-list__tab ${activeTab === 'tab3' ? 'active' : ''}`} 
            onClick={() => handleTabClick('tab3')}
          >
            Planned
          </button>
          <button 
            className={`user-anime-list__tab ${activeTab === 'tab3' ? 'active' : ''}`} 
            onClick={() => handleTabClick('tab3')}
          >
            On Hold
          </button>
          <button 
            className={`user-anime-list__tab ${activeTab === 'tab3' ? 'active' : ''}`} 
            onClick={() => handleTabClick('tab3')}
          >
            Dropped
          </button>
        </div>
        <div className="user-anime-list__items">
          {activeTab === 'tab1' && <div>Content for Tab 1</div>}
          {activeTab === 'tab2' && <div>Content for Tab 2</div>}
          {activeTab === 'tab3' && <div>Content for Tab 3</div>}
          {activeTab === 'tab4' && <div>Content for Tab 3</div>}
          {activeTab === 'tab5' && <div>Content for Tab 3</div>}
        </div>
      </div>
    </div>
  )
}

export default UserAnimeList;