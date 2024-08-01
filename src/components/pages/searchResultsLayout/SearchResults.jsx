import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch } from "../../filters/filtersSlice";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>Search Results for "{animeName}" | AniSurf</title>
        <meta
          name="description"
          content={`Explore the search results for "${animeName}". Discover information about various anime matching your search query.`}
        />
      </Helmet>
      <div className="search-results">
        <div className="search-results__container">
          <AnimeList />
        </div>
        <Filters />
      </div>
    </>
  )
}

export default SearchResults;