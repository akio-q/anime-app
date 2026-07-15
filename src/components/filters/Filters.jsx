import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAnimeGenresQuery, useGetAnimeSeasonsQuery } from "../../api/apiSlice";
import { setAllFilters, setFilterTrigger } from "./filtersSlice";

import Select, { components } from "react-select"; 
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import chopperSticker from '../../resources/img/chopper_sticker.png';
import './filters.scss';

const CheckboxOption = (props) => {
  return (
    <components.Option {...props}>
      <div className="custom-select-option">
        <input 
          type="checkbox" 
          checked={props.isSelected} 
          onChange={() => null} 
        />
        <label>{props.label}</label>
      </div>
    </components.Option>
  );
};

const CustomValueContainer = ({ children, ...props }) => {
  const selectedCount = props.getValue().length;
  
  return (
    <components.ValueContainer {...props}>
      {selectedCount > 0 && (
        <div className="rs__placeholder" style={{ position: 'absolute' }}>
          {selectedCount} selected
        </div>
      )}
      {children}
    </components.ValueContainer>
  );
};

const Filters = ({ isMobileScreen, setIsHamburgerActive }) => {
  const { filters } = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const [pendingFilters, setPendingFilters] = useState(filters);

  useEffect(() => {
    setPendingFilters(filters);
  }, [filters]);

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

    dispatch(setAllFilters(pendingFilters));
    dispatch(setFilterTrigger(true));
    
    if (isMobileScreen) {
      setIsHamburgerActive(false);
    }
  };

  const selectConfig = {
    isMulti: true,
    isSearchable: false, 
    closeMenuOnSelect: false, 
    hideSelectedOptions: false, 
    className: "react-select-container",
    classNamePrefix: "rs", 
    components: { 
      Option: CheckboxOption,
      ValueContainer: CustomValueContainer, 
      IndicatorSeparator: () => null 
    } 
  };

  return (
    <div className="anime__filters">
      <div className="anime__filters-title title title_fz25fw500">Filter Anime</div>
      <form onSubmit={handleFilterClick}>
        <div className="anime__filters-section">
          
          <div className="anime__filters-item">
            <div className="title_fz18fw600">Season:</div>
            <Select 
              {...selectConfig}
              options={[
                { value: '?', label: '?' },
                { value: 'FALL', label: 'Fall' },
                { value: 'WINTER', label: 'Winter' },
                { value: 'SPRING', label: 'Spring' },
                { value: 'SUMMER', label: 'Summer' },
              ]}
              placeholder="Select Season"
              value={pendingFilters.season}
              onChange={(selected) => setPendingFilters({ ...pendingFilters, season: selected })}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Year:</div>
            <Select 
              {...selectConfig}
              options={[{ value: '?', label: '?' }, ...yearOptions]}
              placeholder="Select Year"
              value={pendingFilters.year}
              onChange={(selected) => setPendingFilters({ ...pendingFilters, year: selected })}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Genre:</div>
            <Select 
              {...selectConfig}
              options={genreOptions}
              placeholder="Select Genre"
              value={pendingFilters.genre}
              onChange={(selected) => setPendingFilters({ ...pendingFilters, genre: selected })}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Rating:</div>
            <Select 
              {...selectConfig}
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
              placeholder="Select Rating"
              value={pendingFilters.rating}
              onChange={(selected) => setPendingFilters({ ...pendingFilters, rating: selected })}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Status:</div>
            <Select 
              {...selectConfig}
              options={[
                { value: 'RELEASING', label: 'Currently Airing' },
                { value: 'FINISHED', label: 'Finished Airing' },
                { value: 'NOT_YET_RELEASED', label: 'Upcoming' },
                { value: 'CANCELLED', label: 'Cancelled' },
              ]}
              placeholder="Select Status"
              value={pendingFilters.status}
              onChange={(selected) => setPendingFilters({ ...pendingFilters, status: selected })}
            />
          </div>

          <div className="anime__filters-item">
            <div className="title_fz18fw600">Episodes:</div>
            <Select 
              {...selectConfig}
              options={[
                { value: '?', label: '?' },
                { value: '1', label: '1' },
                { value: '12+', label: '12+' },
                { value: '24+', label: '24+' },
                { value: '100+', label: '100+' }
              ]}
              placeholder="Select Episodes"
              value={pendingFilters.episodes}
              onChange={(selected) => setPendingFilters({ ...pendingFilters, episodes: selected })}
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