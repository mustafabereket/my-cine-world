import React from "react";
import styles from "./PopularMovies.module.css";
import { getPopularGenres, getPopularMovies } from "@/app/api/movie-services";
import Carousel from "../Carousel/Carousel";

const PopularMovies = async () => {
  // Fetch genres and movies during the build process
  const { genres } = await getPopularGenres();
  const { results: movies } = await getPopularMovies();

  if (!genres || !movies) {
    return <div>Error loading data</div>; // Handle edge cases
  }

  return (
    <div className={styles.popularContainer}>
      <h2>Popular Genres</h2>
      <div className={styles.genreContainer}>
        {genres.map((genre) => (
          <div key={genre.id} className={styles.genreButton}>
            {genre.name}
          </div>
        ))}
      </div>
      <h2>Popular Movies</h2>
      <div className={styles.popularMovieContainer}>
        <Carousel movies={movies} />
      </div>
    </div>
  );
};

export default PopularMovies;
