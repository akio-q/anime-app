import AnimeList from "../../animeList/AnimeList";
import Filters from '../../filters/Filters';

import './searchResults.scss';

const SearchResults = () => {
  return (
    <div className="search-results">
      <div className="search-results__container">
        <AnimeList />
      </div>
      <Filters />
    </div>
  )
}

export default SearchResults;