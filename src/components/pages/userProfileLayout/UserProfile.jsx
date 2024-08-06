import { useState } from 'react';
import UserCard from '../../userCard/UserCard';

import './userProfile.scss';

const UserProfile = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  return (
    <div className="user-profile">
      <UserCard />
      <div className="user-profile__content">
        <div className="user-profile__change">
          <div className="title_fz18fw500 user-profile__change-title">Change Display Name</div>
          <input 
            type="text" 
            placeholder='Enter Display Name'
            className='user-profile__change-input' />
          <button className='button'>Submit changes</button>
        </div>
        <div className="user-profile__change">
          <div className="title_fz18fw500 user-profile__change-title">Change Email</div>
          <input 
            type="text" 
            placeholder='Enter Email'
            className='user-profile__change-input' />
          <button className='button'>Submit changes</button>
        </div>
        <div className="user-profile__change">
          <div className="title_fz18fw500 user-profile__change-title">Change Avatar</div>
          <input 
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{display: 'none'}}
          />
          <label htmlFor="avatar" className='user-profile__change-input_file'>
            <i className='icon-user-circle'></i>
            <span>
              { fileName && fileName.length > 15 ? `${fileName.slice(0, 15)}...`
              : fileName ? fileName
              : 'Add a profile picture' }
            </span>
          </label>
          <button className='button'>Submit changes</button>
        </div>
        <div className="user-profile__change">
          <div className="title_fz18fw500 user-profile__change-title">Change Password</div>
          <input 
            type="password"
            placeholder='Enter Password' 
            className='user-profile__change-input' />
          <button className='button'>Submit changes</button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;