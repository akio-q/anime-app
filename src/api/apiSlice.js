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
                recommendations(page: 1, perPage: 25, sort: RATING_DESC) {
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
      query: ({ search, season, year, genre, status, rating, episodes, page = 1 }) => {
        const variables = { page: page };

        if (search) variables.search = search;
        
        if (season && season.length > 0 && season[0].value !== '?') variables.season = season[0].value;
        if (year && year.length > 0 && year[0].value !== '?') variables.seasonYear = parseInt(year[0].value);
        if (status && status.length > 0 && status[0].value !== '?') variables.status = status[0].value;
        
        if (genre && genre.length > 0) {
          variables.genre_in = genre.map(g => g.label);
        }

        if (rating && rating.length > 0 && rating[0].value !== '?') {
          const ratingNum = parseInt(rating[0].value.replace('+', ''));
          variables.averageScore_greater = ratingNum - 1; 
        }

        if (episodes && episodes.length > 0 && episodes[0].value !== '?') {
          const epValue = episodes[0].value;
          
          if (epValue === '1') {
            variables.episodes = 1;
          } else {
            const epNum = parseInt(epValue.replace('+', ''));
            variables.episodes_greater = epNum - 1;
          }
        }

        return {
          url: '/',
          method: 'POST',
          body: {
            query: `
              query (
                $page: Int, 
                $search: String, 
                $season: MediaSeason, 
                $seasonYear: Int, 
                $genre_in: [String],
                $status: MediaStatus,
                $averageScore_greater: Int,
                $episodes: Int,
                $episodes_greater: Int
              ) {
                Page(page: $page, perPage: 25) {
                  pageInfo { hasNextPage }
                  
                  media(
                    search: $search, 
                    season: $season, 
                    seasonYear: $seasonYear, 
                    genre_in: $genre_in,
                    status: $status,
                    averageScore_greater: $averageScore_greater,
                    episodes: $episodes,
                    episodes_greater: $episodes_greater,
                    type: ANIME, 
                    sort: POPULARITY_DESC, 
                    isAdult: false
                  ) {
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
            variables: variables
          }
        }
      }
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