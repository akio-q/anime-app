import { useGetTopSeasonalAnimeQuery, useGetUpcomingAnimeQuery, useGetTopAnimeQuery } from "../../api/apiSlice";

import TopAnimeSlider from "../topAnimeSlider/TopAnimeSlider";
import CategoryAnimeSlider from '../categoryAnimeSlider/CategoryAnimeSlider';

import '../animeList/animeList.scss';

const Home = () => {
  const {
    data: topSeasonalAnime = {},
    isLoading: isTopSeasonalAnimeLoading,
    isError: isTopSeasonalAnimeError,
    error: TopSeasonalAnimeError
  } = useGetTopSeasonalAnimeQuery();
  const {
    data: topAnime = {},
    isLoading: isTopAnimeLoading,
    isError: isTopAnimeError,
    error: topAnimeError
  } = useGetTopAnimeQuery();
  const {
    data: upcomingAnime = {},
    isLoading: isUpcomingAnimeLoading,
    isError: isUpcomingAnimeError,
    error: upcomingAnimeError
  } = useGetUpcomingAnimeQuery();

  return (
    <div className="anime">
      <TopAnimeSlider />
      <CategoryAnimeSlider 
        title='Top Seasonal Anime' 
        data={topSeasonalAnime.data} 
        isLoading={isTopSeasonalAnimeLoading} 
        isError={isTopSeasonalAnimeError}
        error={TopSeasonalAnimeError} />
      <CategoryAnimeSlider 
        title='Popular Anime' 
        data={topAnime.data} 
        isLoading={isTopAnimeLoading} 
        isError={isTopAnimeError}
        error={topAnimeError} />
      <CategoryAnimeSlider 
        title='Upcoming Anime' 
        data={upcomingAnime.data} 
        isLoading={isUpcomingAnimeLoading} 
        isError={isUpcomingAnimeError}
        error={upcomingAnimeError} />
    </div>
  )
}

export default Home;