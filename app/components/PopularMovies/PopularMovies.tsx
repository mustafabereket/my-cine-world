import React from "react";
import styles from "./PopularMovies.module.css";
import { getPopularGenres } from "@/app/api/movie-services";
import { getPopularMovies } from "../../api/movie-services";
import Carousel from "../Carousel/Carousel";

const PopularMovies = async () => {
  const { genres } = await getPopularGenres();

  const { results } = await getPopularMovies();
  console.log("yooo", results);
  return (
    <div className={styles.popularContainer}>
      <h2>Popular Genres</h2>
      <div className={styles.genreContainer}>
        {genres.map((genre) => {
          return (
            <div key={genre.id} className={styles.genreButton}>
              {genre.name}
            </div>
          );
        })}
      </div>
      <h2>Popular Movies</h2>
      <div className={styles.popularMovieContainer}>
        <Carousel movies={results} />
      </div>
    </div>
  );
};

export default PopularMovies;
