import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.jikan.moe/v4'}),
  tagTypes: ['Anime'],
  endpoints: builder => ({
    getTopSeasonalAnime: builder.query({
      query: () => '/seasons/now'
    }),
    getUpcomingAnime: builder.query({
      query: () => '/seasons/upcoming',
    })
  })
})

export const {useGetTopSeasonalAnimeQuery, useGetUpcomingAnimeQuery} = apiSlice;
export default apiSlice.reducer;