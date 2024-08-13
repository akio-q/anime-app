import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.jikan.moe/v4'}),
  tagTypes: ['Anime'],
  endpoints: builder => ({
    getAnimeById: builder.query({
      query: id => `anime/${id}`
    }),
    getTopSeasonalAnime: builder.query({
      query: () => '/seasons/now',
      keepUnusedDataFor: 300
    }),
    getUpcomingAnime: builder.query({
      query: () => '/seasons/upcoming',
      keepUnusedDataFor: 600
    }),
    getTopAnime: builder.query({
      query: () => '/top/anime',
      keepUnusedDataFor: 1200 
    }),
    getAnimeRecommendations: builder.query({
      query: id => `/anime/${id}/recommendations`
    }),
    getAnimeRelations: builder.query({
      query: id => `/anime/${id}/relations`
    }),
    getAnimeSearch: builder.query({
      query: ({ value, page = 1 }) => `/anime?q=${value}&page=${page}` 
    }),
    getAnimeGenres: builder.query({
      query: () => '/genres/anime',
      keepUnusedDataFor: 1800 
    }),
    getAnimeSeasons: builder.query({
      query: () => '/seasons',
      keepUnusedDataFor: 1800 
    }),
    getRecentAnimeRecommendations: builder.query({
      query: () => '/recommendations/anime',
      keepUnusedDataFor: 300
    })
  })
})

export const {
  useGetAnimeByIdQuery,
  useGetTopSeasonalAnimeQuery,
  useLazyGetTopSeasonalAnimeQuery,
  useLazyGetUpcomingAnimeQuery, 
  useLazyGetTopAnimeQuery,
  useGetAnimeRecommendationsQuery,
  useGetAnimeRelationsQuery,
  useGetAnimeSearchQuery,
  useLazyGetAnimeSearchQuery,
  useGetAnimeGenresQuery,
  useGetAnimeSeasonsQuery,
  useGetRecentAnimeRecommendationsQuery
} = apiSlice;
export default apiSlice.reducer;