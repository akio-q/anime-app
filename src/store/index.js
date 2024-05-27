import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import filtersReducer from '../components/filters/filtersSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filters: filtersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;