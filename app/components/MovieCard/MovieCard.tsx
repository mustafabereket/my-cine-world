import React from "react";
import Image from "next/image";
import styles from "./MovieCard.module.scss";
import { Movie } from "@/app/types";
import { preImgURL } from "@/app/config";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
  query?: string;
}

const MovieCard = ({ movie, query }: MovieCardProps) => {
  const { title, vote_average, poster_path, overview, id } = movie;

  return (
    <div className={styles.card}>
      <Link href={`/movie-details/${id}/?query=${query}`}>
        <Image
          alt={title}
          src={preImgURL + poster_path}
          width={250}
          height={300}
          className={styles.imgContainer}
        />
        <h3>{title}</h3>
        <div>Rating: {vote_average}</div>
        <div>{overview}</div>
      </Link>
    </div>
  );
};

export default MovieCard;
