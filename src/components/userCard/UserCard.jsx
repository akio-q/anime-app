import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import './userCard.scss';

const UserCard = ({ additionalClass }) => {
  const { currentUser } = useContext(AuthContext);
  const joinDate = currentUser?.metadata?.creationTime;

  return (
    <div className={`user-card ${additionalClass || ''}`}>
      <img src={currentUser.photoURL} alt="" className="user-card__photo" />
      <div className="title_fz25fw600">{currentUser.displayName}</div>
      <div className='title_fz16fw500'>Join Date: {joinDate ? new Date(joinDate).toLocaleDateString() : 'N/A'}</div>
    </div>
  )
}

export default UserCard;