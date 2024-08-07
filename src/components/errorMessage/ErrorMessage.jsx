import namiSticker from '../../resources/img/nami_sticker.png';
import './errorMessage.scss';

const ErrorMessage = ({ errorStatus, isSmall, isDirectionRow }) => {
  let errorMessageText,
      errorMessageClass;

  switch (errorStatus) {
    case 429:
      errorMessageText = 'Rate limiting error. Please try again in a moment'
      errorMessageClass = 'limit-error'
      break;
    case 404: 
      errorMessageText = '404 - Page Not Found.'
      errorMessageClass = 'not-found-error'
      break;
    default:
      errorMessageText = 'Oops, something went wrong...'
      errorMessageClass = '';
  }

  return (
    <div className={
      `error-message 
      ${errorMessageClass} 
      ${isSmall ? 'error-message_small' : ''}
      ${isDirectionRow ? 'error-message_row' : ''}`
    }>
      <img src={namiSticker} className='error-message__img' alt="nami-error" />
      <div className="title_fz18fw600 error-message__text">{errorMessageText}</div>
    </div>
  )
}

export default ErrorMessage;