import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../api/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;