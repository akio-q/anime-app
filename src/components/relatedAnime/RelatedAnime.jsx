import { useEffect, useMemo, useState } from 'react';
import { useGetRelatedAnimeQuery } from '../../api/apiSlice';
import delayedFetchAnimeData from '../../utils/delayedFetchData';
import { delayedFetchRelatedAnimeData } from '../../utils/delayedFetchData';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import './relatedAnime.scss';

const RelatedAnime = ({id}) => {
  const {
    data: relatedAnime = {},
    isLoading,
    isError,
    error
  } = useGetRelatedAnimeQuery(id);
  const [animeData, setAnimeData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const relatedAnimeData = relatedAnime?.data ?? [];

  useEffect(() => {
    delayedFetchRelatedAnimeData(relatedAnimeData, setIsDataLoading, setAnimeData);
  }, [relatedAnimeData]);

  if (isLoading || isDataLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage errorStatus={error.status} />
  } 

  const renderRelatedAnime = (arr) => {
    return arr.map((item, i) => {
      if (item.data) {
        const { mal_id, images, title} = item.data;
        const img = images.webp.large_image_url;

        return (
          <div key={mal_id} className="related-anime__item">
            <img src={img} className='related-anime__item-img' alt="" />
            <div className="title_fz16fw500 related-anime__item-title">{title}</div>
          </div>
        )
      } else {
        return <ErrorMessage key={i} errorStatus={429} />
      }
    })
  }

  console.log(animeData);

  const items = renderRelatedAnime(animeData);
  return (
    <div className="related-anime">
      {items}
    </div>
  )
}

export default RelatedAnime;