import AnimeCard from "../animeCard/AnimeCard";
import TopAnimeSlider from "../topAnimeSlider/TopAnimeSlider";

import '../animeList/animeList.scss';

const MainPage = () => {
  return (
    <div className="anime">
      <div className="anime__content">
        <TopAnimeSlider />
      </div>
      <div className="anime__filters">

      </div>
    </div>
  )
}

export default MainPage;