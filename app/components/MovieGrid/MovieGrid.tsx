import React from "react";
import styles from "./MovieGrid.module.scss";
import { Movie } from "@/app/types";
import MovieCard from "../MovieCard/MovieCard";

const MovieGrid = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className={styles.mainContainer}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} size="sm" />
      ))}
    </div>
  );
};

export default MovieGrid;
