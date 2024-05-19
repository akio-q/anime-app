import { useEffect, useState, useMemo } from 'react';
import { useGetAnimeRecommendationsQuery } from '../../api/apiSlice';
import fetchAnimeData from '../../utils/fetchAnimeData';
import AnimeCard from '../animeCard/AnimeCard';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './animeRecommendations.scss';

const AnimeRecommendations = ({id}) => {
  const {
    data: animeRecommendations = {},
    isLoading,
    isError,
    error
  } = useGetAnimeRecommendationsQuery(id);
  const [animeData, setAnimeData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const animeRecommendationsData = animeRecommendations.data;
  const recommendations = useMemo(() => {
    if (!animeRecommendationsData || !animeRecommendationsData.length) {
      return [];
    }
    if (animeRecommendationsData.length < 10) {
      return animeRecommendationsData
    }

    const recommendations = animeRecommendationsData.slice();
    return recommendations.slice(0, 10);
  }, [animeRecommendationsData])

  useEffect(() => {
    const fetchDataForRecommendations = async () => {
      if (recommendations.length > 0) {
        setIsDataLoading(true);
        const data = [];

        for (const item of recommendations) {
          const anime = await fetchAnimeData(item.entry.mal_id);
          data.push(anime);
    
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
    
        setAnimeData(data);
        setIsDataLoading(false);
      } else {
        setIsDataLoading(false);
      }
    };

    fetchDataForRecommendations();
  }, [recommendations]);

  if (isLoading || isDataLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage errorStatus={error.status} />
  } 

  const renderAnimeRecommendations = (arr) => {
    return arr.map((item, i) => {
      if (item.data) {
        const { mal_id } = item.data;

        return ( 
          <AnimeCard 
            key={mal_id}
            id={mal_id}
            data={item.data}
          />
        )
      } else {
        return <ErrorMessage key={i} errorStatus={429} />
      }
    })
  }

  const items = renderAnimeRecommendations(animeData);
  return (
    <div className="recommendations">
    {!recommendations.length ? 
      <div className='title title_fz16fw300' style={{textAlign: 'center'}}>
        There is no recommendations for this anime
      </div> :
      <div className="recommendations__wrapper">
        {items}
      </div>}
    </div> 
  )
}

export default AnimeRecommendations;