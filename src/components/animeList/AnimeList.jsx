import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetAnimeSearchQuery } from '../../api/apiSlice';
import { 
  setData, 
  incrementPage, 
  setFilterTrigger, 
  resetPage,
  setLoading,          
  setLoadingFailed } from "../filters/filtersSlice";

import AnimeCard from "../animeCard/AnimeCard"
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import namiSticker from '../../resources/img/nami_sticker.png';

const AnimeList = () => {
  const { data, filters, page, filterTrigger, loadingStatus } = useSelector(state => state.filters);
  const dispatch = useDispatch();
  
  const [fetchAnimeSearch, { isFetching }] = useLazyGetAnimeSearchQuery();

  useEffect(() => {
    if (filterTrigger) {
      const fetchNewFilters = async () => {
        dispatch(setLoading());

        try {
          const response = await fetchAnimeSearch({ ...filters, page: 1 }).unwrap();
          
          if (response?.data) {
            dispatch(resetPage()); 
            dispatch(setData(response.data));
          }
        } catch (error) {
          console.error("Failed to fetch filtered anime: ", error);
          dispatch(setLoadingFailed());
        } finally {
          dispatch(setFilterTrigger(false));  
        }
      };

      fetchNewFilters();
    }
  }, [filterTrigger, filters, dispatch, fetchAnimeSearch]);

  if (loadingStatus === 'loading') {
    return <Spinner />
  } else if (loadingStatus === 'failed') {
    return <ErrorMessage />
  }

  const onLoadMore = async () => {
    const nextPage = page + 1;
    dispatch(incrementPage());
    
    try {
      const response = await fetchAnimeSearch({ ...filters, page: nextPage }).unwrap();
      
      if (response?.data?.Page) {
        const updatedData = {
          ...data,
          Page: {
            ...data.Page,
            media: [...(data?.Page?.media || []), ...response.data.Page.media],
            pageInfo: response.data.Page.pageInfo
          }
        }
        dispatch(setData(updatedData));
      }
    } catch (error) {
      console.error("Failed to load more anime: ", error);
    }
  }

  const renderAnimeList = (arr) => {
    if (!arr || arr.length === 0) {       
      return (
        <div className='error-message limit-error anime__list-error '>
          <img src={namiSticker} className='error-message__img' alt="nami-error" />
          <div className="title_fz18fw600 error-message__text">
            Oops! No anime matches your search or filter criteria.  <br /> Please try adjusting your filters or search terms.
          </div>
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

  const mediaArray = data?.Page?.media || [];
  const hasNextPage = data?.Page?.pageInfo?.hasNextPage || false;
  
  const animeList = renderAnimeList(mediaArray);

  return (
    <>
      {animeList}
      <div className="anime__list-button-container">
        <button 
          className="button anime__list-button" 
          onClick={onLoadMore}
          style={{ 'display': hasNextPage ? 'block' : 'none' }}
          disabled={isFetching}>
            {isFetching ? 'Loading...' : 'Load More'}
        </button>
      </div> 
    </>
  )
}

export default AnimeList;