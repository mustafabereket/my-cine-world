import {
  GET_GENRES_URL,
  GET_POPULAR_MOVIES,
  GET_MOVIE_BY_ID,
  GET_MOVIE_IMAGES_BY_ID,
} from "../config";
import { ADD_TO_WATCHLIST } from "../config";
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
    const resp = await fetch(GET_GENRES_URL, {
      ...headers,
      cache: "force-cache",
    });
    const data = await resp.json();
    console.log(data);
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

export const fetchWatchlistMovies = async () => {
  try {
    const resp = await fetch(`http://localhost:3000/api/watchlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the content type
      },
      cache: "no-cache",
    });

    const data = await resp.json();
    console.log("fetchWatchlistMovies", data);
    return data;
  } catch (err) {
    console.log("fetchWatchlistMovies", err);
    return { results: [], error: err };
  }
};

export const addToWatchList = async (movieId: number) => {
  try {
    const payload = { media_type: "movie", media_id: movieId, watchlist: true };
    const resp = await fetch(ADD_TO_WATCHLIST, {
      ...headers,
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getMovieImagesByID = async (id: string) => {
  try {
    const resp = await fetch(GET_MOVIE_IMAGES_BY_ID(id), headers);
    const data = await resp.json();
    if (data.backdrops) {
      data.backdrops = data.backdrops
        .sort(
          (a: { vote: string }, b: { vote: string }) =>
            parseInt(a.vote) - parseInt(b.vote)
        )
        .slice(0, 8);
    }
    if (data.logos) {
      data.logos = data.logos
        .sort(
          (a: { vote: string }, b: { vote: string }) =>
            parseInt(a.vote) - parseInt(b.vote)
        )
        .slice(0, 2);
    }
    if (data.posters) {
      data.posters = data.posters
        .sort(
          (a: { vote: string }, b: { vote: string }) =>
            parseInt(a.vote) - parseInt(b.vote)
        )
        .slice(0, 8);
    }
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
