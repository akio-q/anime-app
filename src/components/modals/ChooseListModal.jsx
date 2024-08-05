import { IoMdClose } from "react-icons/io";
import '../../style/modal.scss';

const ChooseListModal = ({ isOpen, onClose, onChoose, currentList, handleRemoveFromList }) => {
  if (!isOpen) return null;

  const lists = ['watching', 'completed', 'planned', 'on-hold', 'dropped'];
  const availableLists = lists.filter(list => list !== currentList);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <IoMdClose className="modal__close" onClick={onClose} />
        <div className='title_fz25fw600 modal__title'>Choose List To {currentList ? 'Transfer' : 'Add'}</div>
        <ul className="modal__list">
          {availableLists.map(list => (
            <li 
              key={list}
              className='modal__list-item' 
              onClick={() => onChoose(list)}>{list}</li>
          ))}
        </ul>
        {currentList ? (
          <button className="button button__red" onClick={handleRemoveFromList}>Remove from list</button>
        ) : null}
      </div>
    </div>
  );
};

export default ChooseListModal;