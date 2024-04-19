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
      query: () => '/seasons/upcoming'
    }),
    getTopAnime: builder.query({
      query: () => '/top/anime'
    }),
    getAnimeRecommendations: builder.query({
      query: id => `/anime/${id}/recommendations`
    }),
    getRelatedAnime: builder.query({
      query: id => `/anime/${id}/relations`
    }),
    getAnimeSearch: builder.query({
      query: value => `/anime?q=${value}` 
    })
  })
})

export const {
  useGetTopSeasonalAnimeQuery,
  useGetUpcomingAnimeQuery, 
  useGetTopAnimeQuery,
  useGetAnimeRecommendationsQuery,
  useGetRelatedAnimeQuery,
  useGetAnimeSearchQuery
} = apiSlice;
export default apiSlice.reducer;