import { useState } from 'react';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import './filters.scss';

const Filters = () => {
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
              options={[
                { value: '2024', label: '2024' },
                { value: '2023', label: '2023' },
                { value: '2022', label: '2022' },
                { value: '2021', label: '2021' },
              ]}
              hideSearch={true}
              rightAligned={true}
              placeholderButtonLabel="Select Genre"
            />
          </div>
          <div className="anime__filters-item">
            <div className="title_fz18fw600">Genre:</div>
            <ReactMultiSelectCheckboxes 
              className="react-select-container"
              options={[
                { value: 'isekai', label: 'Isekai' },
                { value: 'horror', label: 'Horror' },
                { value: 'fantasy', label: 'Fantasy' },
                { value: 'school', label: 'School' },
              ]}
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
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                
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