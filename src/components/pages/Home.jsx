import TopAnimeSlider from "../topAnimeSlider/TopAnimeSlider";
import CategoryAnimeSlider from '../categoryAnimeSlider/CategoryAnimeSlider';

import '../animeList/animeList.scss';

const MainPage = () => {
  return (
    <div className="anime">
      <div className="anime__content">
        <TopAnimeSlider />
        <CategoryAnimeSlider />
      </div>
      <div className="anime__filters">

      </div>
    </div>
  )
}

export default MainPage;