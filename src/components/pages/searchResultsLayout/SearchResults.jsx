import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch } from "../../filters/filtersSlice";

import AnimeList from "../../animeList/AnimeList";
import Filters from '../../filters/Filters';

import './searchResults.scss';

const SearchResults = () => {
  const { animeName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (animeName) {
      dispatch(setSearch(animeName));
    }
  }, [animeName]);

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