import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import filterData from "../../utils/filterData";

import AnimeCard from "../animeCard/AnimeCard"
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import namiSticker from '../../resources/img/nami_sticker.png';

const AnimeList = () => {
  const { data, filters, loadingStatus } = useSelector(state => state.filters);
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);

  useEffect(() => {
    const filteredData = filterData(data, filters);
    console.log("Filtered Data:", filteredData);
    setFilteredAnimeList(filteredData);
  }, [data, filters]);

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
          <div className="title_fz18fw600 error-message__text">Oops! No anime matches your search or filter criteria.  <br /> Please try adjusting your filters or search terms.</div>
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
      <div className="anime__list-button-container">
        <button className="button anime__list-button">Load More</button>
      </div>
    </>
  )
}

export default AnimeList;