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
  page: 1,
  filterTrigger: false,
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
      state.filters.search = action.payload 
    },
    setAllFilters: (state, action) => { 
      state.filters = { ...state.filters, ...action.payload };
    },
    incrementPage: (state) => { 
      state.page += 1 
    },
    resetPage: (state) => { 
      state.page = 1 
    },
    setFilterTrigger: (state, action) => { 
      state.filterTrigger = action.payload 
    },
    resetFilters: (state) => { 
      state.filters = {
        search: state.filters.search, 
        season: [],
        year: [],
        episodes: [],
        rating: [],
        genre: [],
        status: []
      };
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
  setAllFilters,
  incrementPage,
  resetPage,
  setFilterTrigger,
  resetFilters,
  setLoading,
  setLoadingFailed
} = filtersSlice.actions;

export default filtersSlice.reducer;