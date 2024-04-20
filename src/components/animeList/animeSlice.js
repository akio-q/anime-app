import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  animeData: [],
  animeLoadingStatus: 'idle'
}

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    animeFetching: state => {state.animeLoadingStatus = 'loading'},
    animeFetched: (state, action) => {
      state.animeLoadingStatus = 'idle';
      state.animeData = action.payload;
    },
    animeFetchingError: state => {state.animeLoadingStatus = 'error'}
  }
});

const {actions, reducer} = animeSlice;

export default reducer;
export const {
  animeFetching,
  animeFetched,
  animeFetchingError
} = actions;