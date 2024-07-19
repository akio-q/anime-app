import namiSticker from '../../resources/img/nami_sticker.png';
import './errorMessage.scss';

const ErrorMessage = ({ errorStatus, isSmall }) => {
  let errorMessageText,
      errorMessageClass;

  switch (errorStatus) {
    case 429:
      errorMessageText = 'Rate limiting error. Please try again in a moment'
      errorMessageClass = 'limit-error'
      break;
    default:
      errorMessageText = 'Oops, something went wrong...'
      errorMessageClass = '';
  }

  return (
    <div className={`error-message ${errorMessageClass} ${isSmall ? 'error-message_small' : ''}`}>
      <img src={namiSticker} className='error-message__img' alt="nami-error" />
      <div className="title_fz18fw600 error-message__text">{errorMessageText}</div>
    </div>
  )
}

export default ErrorMessage;