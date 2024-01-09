import TopAnimeSlider from "../topAnimeSlider/TopAnimeSlider";
import CategoryAnimeSlider from '../categoryAnimeSlider/CategoryAnimeSlider';
import Filters from "../filters/Filters";
import AnimeList from "../animeList/AnimeList";

import '../animeList/animeList.scss';

const MainPage = () => {
  return (
    <div className="anime">
      <div className="anime__content">
        {/* <TopAnimeSlider />
        <CategoryAnimeSlider />
        <CategoryAnimeSlider />
        <CategoryAnimeSlider /> */}
        <AnimeList />
      </div>
      <Filters />
    </div>
  )
}

export default MainPage;