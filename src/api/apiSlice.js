import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.jikan.moe/v4'}),
  tagTypes: ['Anime'],
  endpoints: builder => ({
    getTopAnime: builder.query({
      query: () => '/seasons/now'
    })
  })
})

export const {useGetTopAnimeQuery} = apiSlice;
export default apiSlice.reducer;