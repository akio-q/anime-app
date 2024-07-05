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
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import chopperSticker from '../../resources/img/chopper_sticker.png'
import './filters.scss';

const Filters = () => {
  const { filters } = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const { 
    data: animeGenres = {}, 
    loading: isGenresLoading, 
    error: isGenresError 
  } = useGetAnimeGenresQuery();
  const {
    data: animeSeasons = {},
    loading: isSeasonsLoading,
    error: isSeasonsError
  } = useGetAnimeSeasonsQuery();

  if (isGenresLoading || isSeasonsLoading) {
    return <Spinner />
  } else if (isGenresError || isSeasonsError) {
    return <ErrorMessage errorStatus={429} />
  }

  const genreOptions = animeGenres.data ? animeGenres.data.map(item => {
    const nameLowerCase = item.name.toLowerCase(); 
    return { value: nameLowerCase, label: item.name }
  }) : [];
  const yearOptions = animeSeasons.data ? animeSeasons.data.map(({year}) => {
    const yearString = year.toString();
    return { value: yearString, label: yearString }
  }) : [];

  const handleFilterClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    dispatch(setFilterTrigger(true));
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
                { value: 'fall', label: 'Fall' },
                { value: 'winter', label: 'Winter' },
                { value: 'spring', label: 'Spring' },
                { value: 'summer', label: 'Summer' },
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
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' },
                { value: '8', label: '8' },
                { value: '9', label: '9' },
                { value: '10', label: '10' }
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
                { value: 'currently airing', label: 'Currently Airing' },
                { value: 'finished airing', label: 'Finished Airing' },
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'not yet aired', label: 'Not Yet Aired' },
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