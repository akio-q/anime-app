import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  filters: {
    search: '',
    season: [],
    year: [],
    episodes: [],
    rating: [],
    genre: [],
    status: []
  },
  loadingStatus: 'idle', 
  error: null
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.loadingStatus = 'idle';
      state.error = null;
    },
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    setSeason: (state, action) => {
      state.filters.season = action.payload;
      state.loadingStatus = 'idle';
      state.error = null;
    },
    setYear: (state, action) => {
      state.filters.year = action.payload;
      state.loadingStatus = 'idle';
      state.error = null;
    },
    setGenre: (state, action) => {
      state.filters.genre = action.payload;
      state.loadingStatus = 'idle';
      state.error = null;
    },
    setRating: (state, action) => {
      state.filters.rating = action.payload;
      state.loadingStatus = 'idle';
      state.error = null;
    },
    setStatus: (state, action) => {
      state.filters.status = action.payload;
      state.loadingStatus = 'idle';
      state.error = null;
    },
    setEpisodes: (state, action) => {
      state.filters.episodes = action.payload;
      state.loadingStatus = 'idle';
      state.error = null;
    },
    setLoading: (state) => {
      state.loadingStatus = 'loading';
      state.error = null;
    },
    setLoadingFailed: (state, action) => {
      state.loadingStatus = 'failed';
      state.error = action.payload;
    }
  }
});

export const {
  setData,
  setSearch,
  setSeason,
  setYear,
  setGenre,
  setRating,
  setStatus,
  setEpisodes,
  setLoading,
  setLoadingFailed
} = filtersSlice.actions;
export default filtersSlice.reducer;