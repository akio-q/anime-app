import FilterSeasonAndYear from './FilterSeasonAndYear';
import FilterGenre from './FilterGenre';
import FilterRating from './FilterRating';
import FilterStatus from './FilterStatus';

import './filters.scss';

const Filters = () => {
  return (
    <div className="anime__filters">
      <FilterSeasonAndYear />
      <FilterGenre />
      <FilterRating />
      <FilterStatus />
    </div>
  )
}

export default Filters;