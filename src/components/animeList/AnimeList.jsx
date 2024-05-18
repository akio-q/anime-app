import { useSelector } from "react-redux";
import AnimeCard from "../animeCard/AnimeCard"
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import namiSticker from '../../resources/img/nami_sticker.png';

const AnimeList = () => {
  const { animeData, animeLoadingStatus } = useSelector(state => state.anime);

  if (animeLoadingStatus === 'loading') {
    return <Spinner />
  } else if (animeLoadingStatus === 'error') {
    return <ErrorMessage />
  }

  const renderAnimeList = (arr) => {
    console.log(arr);
    if (arr.length === 0) {
      return (
        <div className='error-message limit-error anime__list-error '>
          <img src={namiSticker} className='error-message__img' alt="nami-error" />
          <div className="title_fz18fw600 error-message__text">Oops! We couldn't find any anime matching your search. <br /> Please check the spelling or try searching for a different title.</div>
        </div>
      )
    } else {
      const items = arr.map((item, i) => (
        <AnimeCard key={i} id={item.mal_id} data={item} />
      ))
      return (
        <div className="anime__list">
          {items}
        </div>
      )
    }
  }

  const animeList = renderAnimeList(animeData);
  return (
    <>
      <div className="title_fz25fw500 anime__list-title">Search Results:</div>
      {animeList}
    </>
  )
}

export default AnimeList;