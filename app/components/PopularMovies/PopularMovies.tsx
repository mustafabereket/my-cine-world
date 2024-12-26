import React from "react";
import styles from "./PopularMovies.module.scss";
import { getPopularMovies } from "@/app/api/movie-services";
import Carousel from "../ui/Carousel/Carousel";
import { Genre } from "@/app/types";
import { getPopularGenres } from "../../api/movie-services";
import AddToWatchList from "../ui/AddToWatchList/AddToWatchList";

const PopularMovies = async () => {
  const { results: movies } = await getPopularMovies(); // Fetch movies dynamically

  if (!movies) {
    return <div>Error loading movies</div>;
  }

  return (
    <div className={styles.popularContainer}>
      <div className="heading">
        <h2>Popular Movies</h2>
      </div>
      <div className={styles.popularMovieContainer}>
        <Carousel movies={movies} />
      </div>
    </div>
  );
};

export default PopularMovies;
