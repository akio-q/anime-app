import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetAnimeSearchQuery } from '../../api/apiSlice';
import { setData, incrementPage } from "../filters/filtersSlice";
import filterData from "../../utils/filterData";

import AnimeCard from "../animeCard/AnimeCard"
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import namiSticker from '../../resources/img/nami_sticker.png';

const AnimeList = () => {
  const { data, filters, page, loadingStatus } = useSelector(state => state.filters);
  const [fetchAnimeSearch, { data: animeSearchData }] = useLazyGetAnimeSearchQuery();
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.data) {
      const filteredData = filterData(data.data, filters);
      setFilteredAnimeList(filteredData); 
    }
  }, [data, filters]);
  useEffect(() => {
    if (animeSearchData && animeSearchData.data) {
      console.log(animeSearchData);
      const filteredData = filterData(animeSearchData.data, filters);
      setFilteredAnimeList(prevList => [...prevList, ...filteredData]);
    }
  }, [animeSearchData])

  if (loadingStatus === 'loading') {
    return <Spinner />
  } else if (loadingStatus === 'failed') {
    return <ErrorMessage />
  }

  const onLoadMore = () => {
    dispatch(incrementPage());
    fetchAnimeSearch({ value: filters.search, page: page + 1 }); 
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
      {data && data.pagination && data.pagination.has_next_page ? 
        <div className="anime__list-button-container">
          <button className="button anime__list-button" onClick={onLoadMore}>Load More</button>
        </div> 
        : null
      }
    </>
  )
}

export default AnimeList;