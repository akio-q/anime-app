import AnimeList from "../animeList/AnimeList";
import Filters from '../filters/Filters';

const SearchResults = () => {
  return (
    <div className="anime">
      <div className="anime__content">
        <AnimeList />
      </div>
      <Filters />
    </div>
  )
}

export default SearchResults;