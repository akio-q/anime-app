import { useSelector } from "react-redux";
import AnimeCard from "../animeCard/AnimeCard"
import Spinner from "../Spinner/Spinner";
import { ErrorMessage } from "formik";

const AnimeList = () => {
  const { animeData, animeLoadingStatus } = useSelector(state => state.anime);

  if (animeLoadingStatus === 'loading') {
    return <Spinner />
  } else if (animeLoadingStatus === 'error') {
    return <ErrorMessage />
  }

  const renderAnimeList = (arr) => {
    return arr.map(item => (
      <AnimeCard key={item.mal_id} id={item.mal_id} data={item} />
    ))
  }

  const items = renderAnimeList(animeData);
  return (
    <>
      <div className="title_fz25fw500 anime__list-title">Search Results:</div>
      <div className="anime__list">
        {items}
      </div>
    </>
  )
}

export default AnimeList;