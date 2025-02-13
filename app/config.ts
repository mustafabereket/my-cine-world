const ACCOUNT_ID = process.env.ACCOUNT_ID;

const TOKEN = process.env.AUTH_TOKEN;

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const headers = {
  headers: {
    // Correct format: headers as an object
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
};

export const GET_GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";
export const GET_POPULAR_MOVIES =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
export const SEARCH_MOVIES = "https://api.themoviedb.org/3/search/movie";
export const GET_MOVIE_BY_ID = (id: string) =>
  `https://api.themoviedb.org/3/movie/${id}`;
export const GET_MOVIE_IMAGES_BY_ID = (id: string) =>
  `https://api.themoviedb.org/3/movie/${id}/images?include_adult=false`;

export const preImgURL = "https://www.themoviedb.org/t/p/w500";

export const GET_WATCHLIST_MOVIES = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`;
export const ADD_TO_WATCHLIST = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist`;
