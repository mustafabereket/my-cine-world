"use client";

import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./WatchListItems.module.scss";
import { Movie } from "@/app/types";
import { getLocalStorage } from "../../utils/providers/helpers";

const WatchListItems = () => {
  const [movies, setMovies] = useState([]);

  const retrieveMovies = async (ids: string[]) => {
    console.log("IDS", ids);
    const movieList = await fetch("/api/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type
      },
      body: JSON.stringify({ ids }),
    });

    const data = await movieList.json();
    console.log("movies burda", data);
    setMovies(data);
  };

  useEffect(() => {
    const items = getLocalStorage("watchlist");
    retrieveMovies(items);

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleStorageChange = () => {
    const items = getLocalStorage("watchlist");
    retrieveMovies(items);
  };

  return (
    <div className={styles.mainContainer}>
      {movies.length ? (
        <div className={styles.resultsContainer}>
          {movies.map((movie: Movie) => {
            return (
              <div key={movie.id} onClick={handleStorageChange}>
                <MovieCard key={movie.id} movie={movie} action={"remove"} />
              </div>
            );
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

export default WatchListItems;
