import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetAnimeRelationsQuery } from '../../api/apiSlice';
import { delayedFetchAnimeRelationsData } from '../../utils/delayedFetchData';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './animeRelations.scss';

const AnimeRelations = ({id, isSingleAnimePageMountedRef}) => {
  const {
    data: animeRelations = {},
    isLoading,
    isError,
    error
  } = useGetAnimeRelationsQuery(id);
  const [animeData, setAnimeData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const animeRelationsData = animeRelations?.data ?? [];
    
    delayedFetchAnimeRelationsData(
      animeRelationsData, 
      setIsDataLoading, 
      setAnimeData, 
      isSingleAnimePageMountedRef
    );
  }, [animeRelations]);

  if (isLoading || isDataLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage errorStatus={error.status} />
  } 

  const renderAnimeRelations = (arr) => {
    return arr.map((item, i) => {
      if (item.data) {
        const { mal_id, images, title} = item.data;
        const img = images.webp.large_image_url;

        return (
          <NavLink 
            key={mal_id} 
            className="related-anime__item"
            end 
            to={`/anime/${mal_id}`}>
            <img src={img} className='related-anime__item-img' alt="" />
            <div className="title_fz16fw500 related-anime__item-title">{title}</div>
          </NavLink>
        )
      } else {
        return <ErrorMessage key={i} errorStatus={429} isDirectionRow={true} />
      }
    })
  }

  const items = renderAnimeRelations(animeData);
  return (
    <div className="related-anime">
      { 
        !animeData.length ? 
          <div className='title title_fz16fw300'>
            This anime has no relations
          </div> : 
          <div className="related-anime__wrapper">
            {items}
          </div>
      }
    </div>
  )
}

export default AnimeRelations;