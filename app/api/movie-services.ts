import { GET_GENRES_URL, GET_POPULAR_MOVIES } from "../config";
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
