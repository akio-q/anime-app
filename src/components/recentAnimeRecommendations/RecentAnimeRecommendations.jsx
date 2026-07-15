import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetRecentAnimeRecommendationsQuery } from '../../api/apiSlice';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './recentAnimeRecommendations.scss';

const RecentAnimeRecommendations = () => {
  const {
    data: recentRecommendations = {},
    isLoading, 
    isError,
    error
  } = useGetRecentAnimeRecommendationsQuery();

  const data = useMemo(() => {
    const recs = recentRecommendations?.data?.Page?.recommendations || [];
    const seenIds = new Set();

    const uniqueRecs = recs.filter((item) => {
      const animeId = item?.media?.id;
      
      if (!animeId || seenIds.has(animeId)) {
        return false;
      }
      
      seenIds.add(animeId);
      return true;
    });

    return uniqueRecs.slice(0, 10);
  }, [recentRecommendations]);

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage errorStatus={error?.status} />
  }

  const renderRecentAnimeRecommendations = (arr) => {
    return arr.map((item, i) => {
      const animeData = item.media;
      
      if (!animeData) return null;

      const { id, coverImage, title } = animeData;
      const img = coverImage?.extraLarge || coverImage?.large || '';
      const displayTitle = title?.english || title?.romaji || 'Unknown Title';

      return (
        <div className="recent-recommendations__card" key={`${id}-${i}`}>
          <NavLink 
            className="recent-recommendations__info" 
            end
            to={`/anime/${id}`}>
            <img 
              src={img} 
              alt={displayTitle}
              className="recent-recommendations__img" />
            <div className="title_fz14fw500 recent-recommendations__title">{displayTitle}</div>
          </NavLink>
          <div className="recent-recommendations__number">{i + 1}</div>
        </div>
      )
    })
  }

  const items = renderRecentAnimeRecommendations(data);
  return (
    <div className="recent-recommendations">
      <div className="title_fz25fw500">Recent Recommendations</div>
      <div className="recent-recommendations__list">
        {items}
      </div>
    </div>
  )
}

export default RecentAnimeRecommendations;