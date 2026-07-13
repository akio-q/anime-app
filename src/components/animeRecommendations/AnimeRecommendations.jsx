import { useGetAnimeRecommendationsQuery } from '../../api/apiSlice';
import AnimeCard from '../animeCard/AnimeCard';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './animeRecommendations.scss';

const AnimeRecommendations = ({ id }) => {
  const {
    data: animeRecommendations = {},
    isLoading,
    isError,
    error
  } = useGetAnimeRecommendationsQuery(id);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage errorStatus={error?.status} />;

  const recommendations = animeRecommendations?.data || [];
  const top10 = recommendations.slice(0, 10);

  return (
    <div className="recommendations">
      {top10.length === 0 ? (
        <div className='title title_fz16fw300' style={{textAlign: 'center'}}>
          There are no recommendations for this anime
        </div>
      ) : (
        <div className="recommendations__wrapper">
          {top10.map(item => {
            const { mal_id, images, title } = item.entry;
            
            return (
              <AnimeCard 
                key={mal_id}
                id={mal_id}
                images={images}
                title={title} 
              />
            )
          })}
        </div>
      )}
    </div> 
  );
}

export default AnimeRecommendations;