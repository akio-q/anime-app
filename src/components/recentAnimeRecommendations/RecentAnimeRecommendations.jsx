import { useMemo } from 'react';
import { useGetRecentAnimeRecommendationsQuery } from '../../api/apiSlice';

import Spinner from '../Spinner/Spinner';
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
    if (!recentRecommendations || !recentRecommendations.data || !recentRecommendations.data.length) {
      return [];
    }

    const data = recentRecommendations.data.slice();
    return data.slice(0, 10);
  }, [recentRecommendations])

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage errorStatus={error.status} />
  }

  const renderRecentAnimeRecommendations = (arr) => {
    return arr.map(item => {
      const { images, title } = item.entry[0];
      const img = images.webp.large_image_url;

      return (
        <div className="recent-recommendations__card" key={item.mal_id}>
        <div className="recent-recommendations__info">
          <img 
            src={img} 
            alt={title}
            className="recent-recommendations__img" />
          <div className="title_fz16fw500">{title}</div>
        </div>
        <button className='button button__recent-recommendations'>
          <i className='icon-arrow-right'></i>
        </button>
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