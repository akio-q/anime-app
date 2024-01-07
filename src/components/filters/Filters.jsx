import FilterSeasonAndYear from './FilterSeasonAndYear';
import FilterGenre from './FilterGenre';

import './filters.scss';

const Filters = () => {
  return (
    <div className="anime__filters">
      <FilterSeasonAndYear />
      <FilterGenre />
    </div>
  )
}

export default Filters;