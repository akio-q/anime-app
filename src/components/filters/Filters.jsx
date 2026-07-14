import { useDispatch, useSelector } from "react-redux";
import { useGetAnimeGenresQuery, useGetAnimeSeasonsQuery } from "../../api/apiSlice";
import { 
  setSeason, 
  setYear, 
  setGenre, 
  setRating, 
  setStatus, 
  setEpisodes, 
  setFilterTrigger } from "./filtersSlice";

import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import chopperSticker from '../../resources/img/chopper_sticker.png'
import './filters.scss';

const Filters = ({ isMobileScreen, setIsHamburgerActive }) => {
  const { filters } = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const { 
    data: animeGenres, 
    isLoading: isGenresLoading, 
    isError: isGenresError 
  } = useGetAnimeGenresQuery();
  
  const {
    data: animeSeasons,
    isLoading: isSeasonsLoading,
    isError: isSeasonsError
  } = useGetAnimeSeasonsQuery();

  if (isGenresLoading || isSeasonsLoading) {
    return <Spinner />
  } else if (isGenresError || isSeasonsError) {
    return <ErrorMessage errorStatus={429} />
  }

  const genresArray = animeGenres?.data?.GenreCollection || [];
  const genreOptions = genresArray.map(genre => {
    return { value: genre.toLowerCase(), label: genre }
  });

  const seasonsArray = Array.isArray(animeSeasons) ? animeSeasons : [];
  const yearOptions = seasonsArray.map(({year}) => {
    const yearString = year.toString();
    return { value: yearString, label: yearString }
  });

  const handleFilterClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    dispatch(setFilterTrigger(true));
    if (isMobileScreen) {
      setIsHamburgerActive(false);
    }
  };

  return (
    <div className="anime__filters">
      <div className="anime__filters-title title title_fz25fw500">Filter Anime</div>
      <form onSubmit={handleFilterClick}>
        <div className="anime__filters-section">
          
          <div className="anime__filters-item">
            <div className="title_fz18fw600">Season:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[
                { value: '?', label: '?' },
                { value: 'FALL', label: 'Fall' },
                { value: 'WINTER', label: 'Winter' },
                { value: 'SPRING', label: 'Spring' },
                { value: 'SUMMER', label: 'Summer' },
              ]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Season"
              value={filters.season}
              onChange={(selected) => dispatch(setSeason(selected))}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Year:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[{ value: '?', label: '?' }, ...yearOptions]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Year"
              value={filters.year}
              onChange={(selected) => dispatch(setYear(selected))}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Genre:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={genreOptions}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Genre"
              value={filters.genre}
              onChange={(selected) => dispatch(setGenre(selected))}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Rating:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[
                { value: '?', label: '?' },
                { value: '10', label: '10+' },
                { value: '20', label: '20+' },
                { value: '30', label: '30+' },
                { value: '40', label: '40+' },
                { value: '50', label: '50+' },
                { value: '60', label: '60+' },
                { value: '70', label: '70+' },
                { value: '80', label: '80+' },
                { value: '90', label: '90+' }
              ]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Rating"
              value={filters.rating}
              onChange={(selected) => dispatch(setRating(selected))}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Status:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[
                { value: 'RELEASING', label: 'Currently Airing' },
                { value: 'FINISHED', label: 'Finished Airing' },
                { value: 'NOT_YET_RELEASED', label: 'Upcoming' },
                { value: 'CANCELLED', label: 'Cancelled' },
              ]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Status"
              value={filters.status}
              onChange={(selected) => dispatch(setStatus(selected))}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Episodes:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[
                { value: '?', label: '?' },
                { value: '1', label: '1' },
                { value: '12+', label: '12+' },
                { value: '24+', label: '24+' },
                { value: '100+', label: '100+' }
              ]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Episodes"
              value={filters.episodes}
              onChange={(selected) => dispatch(setEpisodes(selected))}
            />
          </div>

        </div>
        <img className="anime__filters-sticker" src={chopperSticker} alt="chopper-sticker" />
        <button type="submit" className="button button__filter">Filter</button>
      </form>
    </div>
  );
}

export default Filters;