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
    getAnimeRelations: builder.query({
      query: id => `/anime/${id}/relations`
    }),
    getAnimeSearch: builder.query({
      query: ({ value, page = 1 }) => `/anime?q=${value}&page=${page}` 
    }),
    getAnimeGenres: builder.query({
      query: () => '/genres/anime'
    }),
    getAnimeSeasons: builder.query({
      query: () => '/seasons'
    }),
    getRecentAnimeRecommendations: builder.query({
      query: () => '/recommendations/anime'
    })
  })
})

export const {
  useGetAnimeByIdQuery,
  useGetTopSeasonalAnimeQuery,
  useGetUpcomingAnimeQuery, 
  useGetTopAnimeQuery,
  useGetAnimeRecommendationsQuery,
  useGetAnimeRelationsQuery,
  useGetAnimeSearchQuery,
  useLazyGetAnimeSearchQuery,
  useGetAnimeGenresQuery,
  useGetAnimeSeasonsQuery,
  useGetRecentAnimeRecommendationsQuery
} = apiSlice;
export default apiSlice.reducer;