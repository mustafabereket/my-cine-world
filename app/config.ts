export const GET_GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";
export const GET_POPULAR_MOVIES =
  "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
export const SEARCH_MOVIES = "https://api.themoviedb.org/3/search/movie";
export const GET_MOVIE_BY_ID = (id: string) =>
  `https://api.themoviedb.org/3/movie/${id}`;
export const GET_MOVIE_IMAGES_BY_ID = (id: string) =>
  `https://api.themoviedb.org/3/movie/${id}/images?include_adult=true`;

export const preImgURL = "https://www.themoviedb.org/t/p/w500";
