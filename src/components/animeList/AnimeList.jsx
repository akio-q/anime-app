import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetAnimeSearchQuery } from '../../api/apiSlice';
import { setData, incrementPage, setFilterTrigger } from "../filters/filtersSlice";
import filterData from "../../utils/filterData";

import AnimeCard from "../animeCard/AnimeCard"
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import namiSticker from '../../resources/img/nami_sticker.png';

const AnimeList = () => {
  const { data, filters, page, filterTrigger, loadingStatus } = useSelector(state => state.filters);
  const [fetchAnimeSearch, { data: animeSearchData, isFetching }] = useLazyGetAnimeSearchQuery();
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.data) {
      const filteredData = filterData(data.data, filters);
      setFilteredAnimeList(filteredData);
      setHasNextPage(data.pagination.has_next_page);
    }
  }, [data]);
  
  useEffect(() => {
    if (animeSearchData && animeSearchData.data) {
      const updatedData = {
        ...data,
        data: [...data.data, ...animeSearchData.data],
        pagination: animeSearchData.pagination
      }

      dispatch(setData(updatedData));
    }
  }, [animeSearchData]);

  useEffect(() => {
    if (filterTrigger) {
      const filteredData = filterData(data.data, filters);
      setFilteredAnimeList(filteredData);
      dispatch(setFilterTrigger(false));  
    }
  }, [filterTrigger]);

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
      const items = arr.map(item => {
        const { mal_id, images, episodes, title_english, title } = item;
      
        return (
          <AnimeCard 
            key={mal_id} 
            id={mal_id} 
            images={images}
            episodes={episodes}
            title_english={title_english}
            title={title} />
        )
      })
      
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
        <button 
          className="button anime__list-button" 
          onClick={onLoadMore}
          style={{'display': hasNextPage ? 'block' : 'none'}}
          disabled={isFetching}>
            {isFetching ? 'Loading...' : 'Load More'}
        </button>
      </div> 
    </>
  )
}

export default AnimeList;