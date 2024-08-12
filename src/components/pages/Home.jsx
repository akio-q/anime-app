import { useEffect } from "react";
import { useLazyGetTopSeasonalAnimeQuery, useLazyGetUpcomingAnimeQuery, useLazyGetTopAnimeQuery } from "../../api/apiSlice";
import { useThrottle } from "../../hooks/useThrottle";
import Helmet from 'react-helmet';

import TopAnimeSlider from "../topAnimeSlider/TopAnimeSlider";
import CategoryAnimeSlider from '../categoryAnimeSlider/CategoryAnimeSlider';
import RecentAnimeRecommendations from "../recentAnimeRecommendations/RecentAnimeRecommendations";

import '../animeList/animeList.scss';

const Home = () => {
  const [fetchTopSeasonalAnime, { 
    data: topSeasonalAnime, 
    isLoading: isTopSeasonalAnimeLoading, 
    isError: isTopSeasonalAnimeError, 
    error: TopSeasonalAnimeError }] = useLazyGetTopSeasonalAnimeQuery();
  const [fetchTopAnime, { 
    data: topAnime, 
    isLoading: 
    isTopAnimeLoading, 
    isError: isTopAnimeError, 
    error: topAnimeError }] = useLazyGetTopAnimeQuery();
  const [fetchUpcomingAnime, { 
    data: upcomingAnime, 
    isLoading: isUpcomingAnimeLoading, 
    isError: isUpcomingAnimeError, 
    error: upcomingAnimeError }] = useLazyGetUpcomingAnimeQuery();  

  const throttledFetchTopSeasonalAnime = useThrottle(fetchTopSeasonalAnime, 1000);
  const throttledFetchTopAnime = useThrottle(fetchTopAnime, 1000); 
  const throttledFetchUpcomingAnime = useThrottle(fetchUpcomingAnime, 1000); 

  useEffect(() => {
    throttledFetchTopSeasonalAnime();
    throttledFetchTopAnime();
    throttledFetchUpcomingAnime();
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Home | AniSurf | Discover your favorite anime</title>
        <meta 
          name="description" 
          content="Discover your favorite anime, get the latest anime recommendations, create your own anime lists and more!" />
        <meta 
          name="keywords" 
          content="anime, seasonal anime, popular anime, upcoming anime, anime recommendations, anime discovery, anime list" />
      </Helmet>
      <div className="anime">
        <TopAnimeSlider />
        <div className="anime__wrapper">
          <div className="anime__wrapper-container">
            <CategoryAnimeSlider 
              title='Top Seasonal Anime' 
              data={topSeasonalAnime?.data} 
              isLoading={isTopSeasonalAnimeLoading} 
              isError={isTopSeasonalAnimeError}
              error={TopSeasonalAnimeError} />
            <CategoryAnimeSlider 
              title='Popular Anime' 
              data={topAnime?.data} 
              isLoading={isTopAnimeLoading} 
              isError={isTopAnimeError}
              error={topAnimeError} />
            <CategoryAnimeSlider 
              title='Upcoming Anime' 
              data={upcomingAnime?.data} 
              isLoading={isUpcomingAnimeLoading} 
              isError={isUpcomingAnimeError}
              error={upcomingAnimeError} />
          </div>
          <RecentAnimeRecommendations />
        </div>
      </div>
    </>
  )
}

export default Home;