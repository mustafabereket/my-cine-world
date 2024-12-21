import {
  GET_GENRES_URL,
  GET_POPULAR_MOVIES,
  GET_MOVIE_BY_ID,
  GET_MOVIE_IMAGES_BY_ID,
} from "../config";
const TOKEN = process.env.AUTH_TOKEN;

const headers = {
  headers: {
    // Correct format: headers as an object
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
};

export const getPopularMovies = async () => {
  try {
    const resp = await fetch(GET_POPULAR_MOVIES, headers);
    const data = await resp.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPopularGenres = async () => {
  try {
    const resp = await fetch(GET_GENRES_URL, headers);
    const data = await resp.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getMovieByID = async (id: string) => {
  try {
    const resp = await fetch(GET_MOVIE_BY_ID(id), headers);
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getMovieImagesByID = async (id: string) => {
  try {
    const resp = await fetch(GET_MOVIE_IMAGES_BY_ID(id), headers);
    const data = await resp.json();
    data.backdrops = data.backdrops
      .sort((a, b) => parseInt(a.vote) - parseInt(b.vote))
      .slice(0, 8);
    data.logos = data.logos
      .sort((a, b) => parseInt(a.vote) - parseInt(b.vote))
      .slice(0, 2);
    data.posters = data.posters
      .sort((a, b) => parseInt(a.vote) - parseInt(b.vote))
      .slice(0, 8);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
