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

const anilistQueue = new RequestQueue(670);

const rateLimitedBaseQuery = async (args, api, extraOptions) => {
  return anilistQueue.enqueue(() => 
    fetchBaseQuery({ baseUrl: 'https://graphql.anilist.co' })(args, api, extraOptions)
  );
};

const staggeredBaseQuery = retry(rateLimitedBaseQuery, { maxRetries: 3 });

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: staggeredBaseQuery,
  tagTypes: ['Anime'],
  endpoints: builder => ({
    getAnimeById: builder.query({
      query: (id) => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
            query ($id: Int) {
              Media(id: $id, type: ANIME) {
                id
                title { english romaji }
                coverImage { extraLarge large }
                averageScore
                stats { scoreDistribution { amount } }
                status
                genres
                season
                seasonYear
                episodes
                description
              }
            }
          `,
          variables: { id }
        }
      })
    }),
    getTopSeasonalAnime: builder.query({
      query: () => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
            query {
              Page(page: 1, perPage: 25) {
                media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
                  id
                  title { english romaji }
                  coverImage { extraLarge large }
                  bannerImage
                  episodes
                  description
                  genres
                }
              }
            }
          `
        }
      }),
      keepUnusedDataFor: 300
    }),
    getUpcomingAnime: builder.query({
      query: () => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
            query {
              Page(page: 1, perPage: 25) {
                media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
                  id
                  title { english romaji }
                  coverImage { extraLarge large }
                  episodes
                }
              }
            }
          `
        }
      }),
      keepUnusedDataFor: 600
    }),
    getTopAnime: builder.query({
      query: () => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
            query {
              Page(page: 1, perPage: 25) {
                media(type: ANIME, sort: SCORE_DESC) {
                  id
                  title { english romaji }
                  coverImage { extraLarge large }
                  episodes
                }
              }
            }
          `
        }
      }),
      keepUnusedDataFor: 1200 
    }),
    getAnimeRecommendations: builder.query({
      query: (id) => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
            query ($id: Int) {
              Media(id: $id, type: ANIME) {
                recommendations(page: 1, perPage: 10, sort: RATING_DESC) {
                  nodes {
                    mediaRecommendation {
                      id
                      title { english romaji }
                      coverImage { extraLarge large }
                      episodes
                    }
                  }
                }
              }
            }
          `,
          variables: { id }
        }
      })
    }),
    getAnimeRelations: builder.query({
      query: (id) => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
            query ($id: Int) {
              Media(id: $id, type: ANIME) {
                relations {
                  edges {
                    relationType
                    node {
                      id
                      title { english romaji }
                      type
                      coverImage { extraLarge large }
                    }
                  }
                }
              }
            }
          `,
          variables: { id }
        }
      })
    }),
    getAnimeSearch: builder.query({
      query: ({ value, page = 1 }) => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
            query ($search: String, $page: Int) {
              Page(page: $page, perPage: 25) {
                pageInfo { hasNextPage }
                media(search: $search, type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
                  id
                  title { english romaji }
                  coverImage { extraLarge large }
                  episodes
                  season
                  seasonYear
                  genres
                  averageScore
                  status
                }
              }
            }
          `,
          variables: { search: value, page: page }
        }
      })
    }),
    getAnimeGenres: builder.query({
      query: () => ({
        url: '/',
        method: 'POST',
        body: {
          query: `query { GenreCollection }`
        }
      }),
      keepUnusedDataFor: 1800 
    }),
    getAnimeSeasons: builder.query({
      queryFn: () => {
        const currentYear = new Date().getFullYear();
        const yearsArray = [];
        for (let y = currentYear + 1; y >= 1950; y--) {
          yearsArray.push({ year: y });
        }
        return { data: yearsArray };
      },
      keepUnusedDataFor: 86400 
    }),
    getRecentAnimeRecommendations: builder.query({
      query: () => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
            query {
              Page(page: 1, perPage: 30) {
                recommendations(sort: ID_DESC) {
                  media {
                    id
                    title { english romaji }
                    coverImage { extraLarge large }
                    episodes
                  }
                }
              }
            }
          `
        }
      }),
      keepUnusedDataFor: 300
    })
  })
});

export const {
  useGetAnimeByIdQuery,
  useGetTopSeasonalAnimeQuery,
  useLazyGetTopSeasonalAnimeQuery,
  useGetUpcomingAnimeQuery, 
  useGetTopAnimeQuery,
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