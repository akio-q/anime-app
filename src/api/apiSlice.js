import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

class RequestQueue {
  constructor(delayMs) {
    this.delayMs = delayMs;
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.processNext();
    });
  }

  async processNext() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;

    const { requestFn, resolve, reject } = this.queue.shift();

    try {
      const result = await requestFn();
      resolve(result);
    } catch (error) {
      reject(error);
    }

    setTimeout(() => {
      this.isProcessing = false;
      this.processNext();
    }, this.delayMs);
  }
}

const jikanQueue = new RequestQueue(500);

const rateLimitedBaseQuery = async (args, api, extraOptions) => {
  return jikanQueue.enqueue(() => 
    fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4' })(args, api, extraOptions)
  );
};

const staggeredBaseQuery = retry(rateLimitedBaseQuery, { maxRetries: 3 });

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: staggeredBaseQuery,
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
      query: ({ value, page = 1 }) => ({
        url: '/anime',
        params: {
          q: value,
          page: page,
          sfw: true 
        }
      })
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
});

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