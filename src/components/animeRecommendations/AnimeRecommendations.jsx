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

  const recommendations = animeRecommendations?.data?.Media?.recommendations?.nodes || [];

  return (
    <div className="recommendations">
      {recommendations.length === 0 ? (
        <div className='title title_fz16fw300' style={{textAlign: 'center'}}>
          There are no recommendations for this anime
        </div>
      ) : (
        <div className="recommendations__wrapper">
          {recommendations.map((item, index) => {
            const animeData = item.mediaRecommendation;
            
            if (!animeData) return null;

            const { id, coverImage, title, episodes } = animeData;
            
            return (
              <AnimeCard 
                key={`${id}-${index}`}
                id={id}
                coverImage={coverImage}
                title={title} 
                episodes={episodes}
              />
            )
          })}
        </div>
      )}
    </div> 
  );
}

export default AnimeRecommendations;