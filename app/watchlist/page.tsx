import React from "react";
import style from "./page.module.scss";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard/MovieCard";
import BackButton from "../components/ui/BackButton/BackButton";

const fetchWatchlistMovies = async () => {
  const resp = await fetch(`http://localhost:3000/api/watchlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type
    },
  });

  const data = await resp.json();

  return data;
};

const WatchList = async () => {
  const { results, page, total_results } = await fetchWatchlistMovies();

  return (
    <div className={style.mainContainer}>
      <div className={style.heading}>
        <h1>My Watch List</h1>
        <BackButton />
      </div>
      {results.length ? (
        <div className={style.resultsContainer}>
          {results.map((movie: Movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      ) : (
        <div>
          <h4>
            No movies found on your watchlist, please go ahead and add some and
            then come back
          </h4>
        </div>
      )}
    </div>
  );
};

export default WatchList;
