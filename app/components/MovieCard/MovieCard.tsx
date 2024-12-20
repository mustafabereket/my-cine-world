import React from "react";
import Image from "next/image";
import styles from "./MovieCard.module.scss";
import { Movie } from "@/app/types";
const preURL = "https://www.themoviedb.org/t/p/w500";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { title, vote_average, poster_path, overview } = movie;
  console.log(title, vote_average, poster_path, overview);
  return (
    <div className={styles.card}>
      <Image
        alt={title}
        src={preURL + poster_path}
        width={250}
        height={300}
        className={styles.imgContainer}
      />
      <h3>{title}</h3>
      <div>Rating: {vote_average}</div>
      <div>{overview}</div>
    </div>
  );
};

export default MovieCard;
