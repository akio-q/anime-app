import { 
  useGetTopSeasonalAnimeQuery, 
  useGetUpcomingAnimeQuery, 
  useGetTopAnimeQuery } from "../../api/apiSlice";
import Helmet from 'react-helmet';

import TopAnimeSlider from "../topAnimeSlider/TopAnimeSlider";
import CategoryAnimeSlider from '../categoryAnimeSlider/CategoryAnimeSlider';
import RecentAnimeRecommendations from "../recentAnimeRecommendations/RecentAnimeRecommendations";

import '../animeList/animeList.scss';

const Home = () => {
  const { 
    data: topSeasonalAnime, 
    isLoading: isTopSeasonalAnimeLoading, 
    isError: isTopSeasonalAnimeError, 
    error: TopSeasonalAnimeError 
  } = useGetTopSeasonalAnimeQuery();
  
  const { 
    data: topAnime, 
    isLoading: isTopAnimeLoading, 
    isError: isTopAnimeError, 
    error: topAnimeError 
  } = useGetTopAnimeQuery();
  
  const { 
    data: upcomingAnime, 
    isLoading: isUpcomingAnimeLoading, 
    isError: isUpcomingAnimeError, 
    error: upcomingAnimeError 
  } = useGetUpcomingAnimeQuery();  

  return (
    <>
      <Helmet>
        <title>Home | AniSurf | Discover your favorite anime</title>
        <meta 
          name="description" 
          content="AniSurf is your go-to destination for discovering and exploring your favorite anime. Find your favorite anime, add them to your lists and much more! Join us and dive into the world of anime!" />
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
              data={topSeasonalAnime?.data?.Page?.media}
              isLoading={isTopSeasonalAnimeLoading} 
              isError={isTopSeasonalAnimeError}
              error={TopSeasonalAnimeError} />
            <CategoryAnimeSlider 
              title='Popular Anime' 
              data={topAnime?.data?.Page?.media} 
              isLoading={isTopAnimeLoading} 
              isError={isTopAnimeError}
              error={topAnimeError} />
            <CategoryAnimeSlider 
              title='Upcoming Anime' 
              data={upcomingAnime?.data?.Page?.media}
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