import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AnimeCard from "../animeCard/AnimeCard"
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import namiSticker from '../../resources/img/nami_sticker.png';

const checkEpisodesMatch = (episodes, episodesSet) => {
  if (episodesSet.size === 0) return true;
  if (episodesSet.has(episodes.toString())) return true;

  const episodeNumber = parseInt(episodes);

  if (episodesSet.has('12+') && episodeNumber >= 12 & episodeNumber < 24) return true;
  if (episodesSet.has('24+') && episodeNumber >= 24 & episodeNumber < 100) return true;
  if (episodesSet.has('100+') && episodeNumber >= 100) return true;

  return false;
};

const filterData = (data, filters) => {
  const { season, year, genre, rating, status, episodes } = filters;

  const seasonSet = new Set(season.map(filter => filter.value));
  const yearSet = new Set(year.map(filter => filter.value));
  const genreSet = new Set(genre.map(filter => filter.value));
  const ratingSet = new Set(rating.map(filter => filter.value));
  const statusSet = new Set(status.map(filter => filter.value));
  const episodesSet = new Set(episodes.map(filter => filter.value));

  return data.filter(item => {
    const matchesSeason = !item.sesason || seasonSet.size === 0 || seasonSet.has(item.season.toLowerCase());
    const matchesYear = !item.year || yearSet.size === 0 || yearSet.has(item.year.toString());
    const matchesGenre = !item.genres || genreSet.size === 0 || item.genres.some(genre => genreSet.has(genre.name.toLowerCase()));
    const matchesRating = !item.score || ratingSet.size === 0 || ratingSet.has(Math.round(item.score).toString());
    const matchesStatus = !item.status || statusSet.size === 0 || statusSet.has(item.status.toLowerCase());
    const matchesEpisodes = !item.episodes || episodesSet.size === 0 || checkEpisodesMatch(item.episodes, episodesSet);

    return matchesSeason && matchesYear && matchesGenre && matchesRating && matchesStatus && matchesEpisodes;
  });
}

const AnimeList = () => {
  const { filters, loadingStatus } = useSelector(state => state.filters);
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);

  useEffect(() => {
    const filteredList = filterData(filters.search, filters);
    setFilteredAnimeList(filteredList);
    console.log(filteredAnimeList);
  }, [filters]);

  if (loadingStatus === 'loading') {
    return <Spinner />
  } else if (loadingStatus === 'failed') {
    return <ErrorMessage />
  }

  const renderAnimeList = (arr) => {
    if (arr.length === 0) { 
      return (
        <div className='error-message limit-error anime__list-error '>
          <img src={namiSticker} className='error-message__img' alt="nami-error" />
          <div className="title_fz18fw600 error-message__text">Oops! We couldn't find any anime matching your search. <br /> Please check the spelling or try searching for a different title.</div>
        </div>
      )
    } else {
      const items = arr.map((item, i) => (
        <AnimeCard key={i} id={item.mal_id} data={item} />
      ))
      return (
        <div className="anime__list">
          {items}
        </div>
      )
    }
  }

  const animeList = renderAnimeList(filteredAnimeList);
  return (
    <>
      {animeList}
    </>
  )
}

export default AnimeList;