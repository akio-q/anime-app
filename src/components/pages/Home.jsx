import { useGetUpcomingAnimeQuery } from "../../api/apiSlice";

import TopAnimeSlider from "../topAnimeSlider/TopAnimeSlider";
import CategoryAnimeSlider from '../categoryAnimeSlider/CategoryAnimeSlider';
import Filters from "../filters/Filters";
// import AnimeList from "../animeList/AnimeList";

import '../animeList/animeList.scss';

const Home = () => {
  const {
    data: upcomingAnime = [],
    isLoading,
    isError
  } = useGetUpcomingAnimeQuery();

  return (
    <div className="anime">
      <div className="anime__content">
        <TopAnimeSlider />
        <CategoryAnimeSlider 
          title='Upcoming Anime' 
          data={upcomingAnime.data} 
          isLoading={isLoading} 
          isError={isError} />
      </div>
      <Filters />
    </div>
  )
}

export default Home;