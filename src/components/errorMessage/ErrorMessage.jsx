import namiSticker from '../../resources/img/nami_sticker.png';
import './errorMessage.scss';

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <img src={namiSticker} className='error-message__img' alt="nami-error" />
      <div className="title_fz18fw600 error-message__text">Oops, something went wrong...</div>
    </div>
  )
}

export default ErrorMessage;