import { useGetAnimeGenresQuery, useGetAnimeSeasonsQuery } from "../../api/apiSlice";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './filters.scss';

const Filters = () => {
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

  const genresOptions = animeGenres.data ? animeGenres.data.map(item => {
    const nameLowerCase = item.name.toLowerCase(); 
    return { value: nameLowerCase, label: item.name }
  }) : [];
  const yearOptions = animeSeasons.data ? animeSeasons.data.map(({year}) => {
    const yearString = year.toString();
    return { value: yearString, label: yearString }
  }) : [];

  return (
    <div className="anime__filters">
      <div className="anime__filters-title title title_fz25fw500">Filter Anime</div>
      <form>
        <div className="anime__filters-section">
          <div className="anime__filters-item">
            <div className="title_fz18fw600">Season:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[
                { value: 'fall', label: 'Fall' },
                { value: 'winter', label: 'Winter' },
                { value: 'spring', label: 'Spring' },
                { value: 'summer', label: 'Summer' },
              ]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Season"
            />
          </div>
          <div className="anime__filters-item">
            <div className="title_fz18fw600">Year:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={yearOptions}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Year"
            />
          </div>
          <div className="anime__filters-item">
            <div className="title_fz18fw600">Genre:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={genresOptions}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Genre"
            />
          </div>
          <div className="anime__filters-item">
            <div className="title_fz18fw600">Rating:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' },
                { value: '8', label: '8' },
                { value: '9', label: '9' },
                { value: '10', label: '10' },
              ]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Rating"
            />
          </div>
          <div className="anime__filters-item">
            <div className="title_fz18fw600">Status:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[
                { value: 'airing', label: 'Airing' },
                { value: 'finished airing', label: 'Finished Airing' },
                { value: 'upcoming', label: 'Upcoming' },
              ]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Status"
            />
          </div>
          <div className="anime__filters-item">
            <div className="title_fz18fw600">Episodes:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[
                { value: '1', label: '1' },
                { value: '12+', label: '12+' },
                { value: '24+', label: '24+' },
                { value: '100+', label: '100+' },  
                { value: '?', label: '?' }
              ]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Episodes"
            />
          </div>
        </div>
        
        <button type="submit" className="button button__filter">Filter</button>
      </form>
    </div>
  );
}

export default Filters;