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
    if (data && data.Page) {
      const filteredData = filterData(data.Page.media, filters);
      setFilteredAnimeList(filteredData);
      setHasNextPage(data.Page.pageInfo.hasNextPage);
    }
  }, [data, filters]);
  
  useEffect(() => {
    if (animeSearchData && animeSearchData.Page) {
      const updatedData = {
        ...data,
        Page: {
          ...data.Page,
          media: [...data.Page.media, ...animeSearchData.Page.media],
          pageInfo: animeSearchData.Page.pageInfo
        }
      }

      dispatch(setData(updatedData));
    }
  }, [animeSearchData, data, dispatch]);

  useEffect(() => {
    if (filterTrigger) {
      const filteredData = filterData(data.Page.media, filters);
      setFilteredAnimeList(filteredData);
      dispatch(setFilterTrigger(false));  
    }
  }, [filterTrigger, data, filters, dispatch]);

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
        const { id, coverImage, episodes, title } = item;
      
        return (
          <AnimeCard 
            key={id} 
            id={id} 
            coverImage={coverImage}
            episodes={episodes}
            title={title} 
          />
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