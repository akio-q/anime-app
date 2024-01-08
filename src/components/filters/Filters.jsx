import FilterSeasonAndYear from './FilterSeasonAndYear';
import FilterGenre from './FilterGenre';
import FilterRating from './FilterRating';

import './filters.scss';

const Filters = () => {
  return (
    <div className="anime__filters">
      <FilterSeasonAndYear />
      <FilterGenre />
      <FilterRating />
    </div>
  )
}

export default Filters;