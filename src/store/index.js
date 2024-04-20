import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import anime from '../components/animeList/animeSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    anime
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;