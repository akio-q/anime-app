import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import filterData from "../../utils/filterData";

import AnimeCard from "../animeCard/AnimeCard"
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import namiSticker from '../../resources/img/nami_sticker.png';

const AnimeList = () => {
  const { filters, loadingStatus } = useSelector(state => state.filters);
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);

  useEffect(() => {
    const filteredList = filterData(filters.search, filters);
    setFilteredAnimeList(filteredList);
    console.log(filteredAnimeList);
  }, [filters]);

  if (loadingStatus === 'loading') {
    return <Spinner />
  } else if (loadingStatus === 'failed') {
    return <ErrorMessage />
  }

  const renderAnimeList = (arr) => {
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

  const animeList = renderAnimeList(filteredAnimeList);
  return (
    <>
      {animeList}
    </>
  )
}

export default AnimeList;