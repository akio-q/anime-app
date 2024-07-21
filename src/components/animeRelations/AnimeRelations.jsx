import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetAnimeRelationsQuery } from '../../api/apiSlice';
import { delayedFetchAnimeRelationsData } from '../../utils/delayedFetchData';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import './animeRelations.scss';

const AnimeRelations = ({id}) => {
  const {
    data: animeRelations = {},
    isLoading,
    isError,
    error
  } = useGetAnimeRelationsQuery(id);
  const [animeData, setAnimeData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const animeRelationsData = animeRelations?.data ?? [];

  useEffect(() => {
    delayedFetchAnimeRelationsData(animeRelationsData, setIsDataLoading, setAnimeData);
  }, [animeRelationsData]);

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
        return <ErrorMessage key={i} errorStatus={429} />
      }
    })
  }

  const items = renderAnimeRelations(animeData);
  return (
    <div className="related-anime">
      {items}
    </div>
  )
}

export default AnimeRelations;