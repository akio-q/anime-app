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
  console.log(relatedAnimeData);

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
        const { mal_id, title} = item.data;

        return <li key={mal_id} className="related-anime__list-item">{title}</li>
      } else {
        return <ErrorMessage key={i} errorStatus={429} />
      }
    })
  }

  const items = renderRelatedAnime(animeData);
  return (
    <div className="related-anime">
      <ul className="related-anime__list">
        {items}
      </ul>
    </div>
  )
}

export default RelatedAnime;