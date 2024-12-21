import React from "react";
import styles from "./PopularMovies.module.scss";
import { getPopularMovies } from "@/app/api/movie-services";
import Carousel from "../Carousel/Carousel";
import { Genre } from "@/app/types";
import { getPopularGenres } from "../../api/movie-services";

const PopularMovies = async () => {
  const { results: movies } = await getPopularMovies(); // Fetch movies dynamically
  const { genres } = await getPopularGenres();

  if (!movies) {
    return <div>Error loading movies</div>;
  }

  return (
    <div className={styles.popularContainer}>
      <h2>Popular Genres</h2>
      <div className={styles.genreContainer}>
        {genres.map((genre: Genre) => (
          <div key={genre.id} className={"genreButton"}>
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
