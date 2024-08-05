import { IoMdClose } from "react-icons/io";
import '../../style/modal.scss';

const ChooseListModal = ({ isOpen, onClose, onChoose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <IoMdClose className="modal__close" onClick={onClose} />
        <div className='title_fz25fw600 modal__title'>Choose List</div>
        <ul className="modal__list">
          <li 
            className='modal__list-item' 
            onClick={() => onChoose('watching')}>Watching</li>
          <li 
            className='modal__list-item' 
            onClick={() => onChoose('completed')}>Completed</li>
          <li 
            className='modal__list-item' 
            onClick={() => onChoose('planned')}>Planned</li>
          <li 
            className='modal__list-item' 
            onClick={() => onChoose('on-hold')}>On Hold</li>
          <li 
            className='modal__list-item' 
            onClick={() => onChoose('dropped')}>Dropped</li>
        </ul>
      </div>
    </div>
  );
};

export default ChooseListModal;