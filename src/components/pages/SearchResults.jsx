import Search from "../animeSearchForm/AnimeSearchForm";
import Filters from '../filters/Filters';

const SearchResults = () => {
  return (
    <div className="anime">
      <div className="anime__content">
        <Search />
      </div>
      <Filters />
    </div>
  )
}

export default SearchResults;