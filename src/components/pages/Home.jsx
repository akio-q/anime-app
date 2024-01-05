import TopAnimeSlider from "../topAnimeSlider/TopAnimeSlider";
import CategoryAnimeSlider from '../categoryAnimeSlider/CategoryAnimeSlider';
import Filters from "../filters/Filters";

import '../animeList/animeList.scss';

const MainPage = () => {
  return (
    <div className="anime">
      <div className="anime__content">
        <TopAnimeSlider />
        <CategoryAnimeSlider />
        <CategoryAnimeSlider />
        <CategoryAnimeSlider />
      </div>
      <Filters />
    </div>
  )
}

export default MainPage;