const checkEpisodesMatch = (episodes, episodesSet) => {
  if (episodesSet.size === 0) return true;
  if (episodes === null) return episodesSet.has('?');
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
    const matchesSeason = seasonSet.size === 0 || (item.season === null ? seasonSet.has('?') : seasonSet.has(item.season.toLowerCase()));
    const matchesYear = yearSet.size === 0 || (item.year === null ? yearSet.has('?') : yearSet.has(item.year.toString()));
    const matchesGenre = genreSet.size === 0 || item.genres.some(genre => genreSet.has(genre.name.toLowerCase()));
    const matchesRating = ratingSet.size === 0 || (item.score === null ? ratingSet.has('?') : ratingSet.has(Math.round(item.score).toString()));
    const matchesStatus = statusSet.size === 0 || statusSet.has(item.status.toLowerCase());
    const matchesEpisodes = episodesSet.size === 0 || checkEpisodesMatch(item.episodes, episodesSet);

    return matchesSeason && matchesYear && matchesGenre && matchesRating && matchesStatus && matchesEpisodes;
  });
}

export default filterData;