import { useGetTopSeasonalAnimeQuery, useGetUpcomingAnimeQuery, useGetTopAnimeQuery } from "../../api/apiSlice";

import TopAnimeSlider from "../topAnimeSlider/TopAnimeSlider";
import CategoryAnimeSlider from '../categoryAnimeSlider/CategoryAnimeSlider';
import Filters from "../filters/Filters";
// import AnimeList from "../animeList/AnimeList";

import '../animeList/animeList.scss';

const Home = () => {
  const {
    data: topSeasonalAnime = [],
    isLoading: isTopSeasonalAnimeLoading,
    isError: isTopSeasonalAnimeError
  } = useGetTopSeasonalAnimeQuery();
  const {
    data: topAnime = [],
    isLoading: isTopAnimeLoading,
    isError: isTopAnimeError
  } = useGetTopAnimeQuery();
  const {
    data: upcomingAnime = {},
    isLoading: isUpcomingAnimeLoading,
    isError: isUpcomingAnimeError
  } = useGetUpcomingAnimeQuery();

  return (
    <div className="anime">
      <div className="anime__content">
        <TopAnimeSlider />
        <CategoryAnimeSlider 
          title='Top Seasonal Anime' 
          data={topSeasonalAnime.data} 
          isLoading={isTopSeasonalAnimeLoading} 
          isError={isTopSeasonalAnimeError} />
        <CategoryAnimeSlider 
          title='Popular Anime' 
          data={topAnime.data} 
          isLoading={isTopAnimeLoading} 
          isError={isTopAnimeError} />
        <CategoryAnimeSlider 
          title='Upcoming Anime' 
          data={upcomingAnime.data} 
          isLoading={isUpcomingAnimeLoading} 
          isError={isUpcomingAnimeError} />
      </div>
      <Filters />
    </div>
  )
}

export default Home;