import spinner from './spinner.svg';

const Spinner = () => {
  return (
    <img 
      src={spinner} 
      style={{margin: '0 auto', background: 'none', display: 'block'}}
      alt="spinner" />
  )
}

export default Spinner;