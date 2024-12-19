import React from "react";
import Image from "next/image";
import styles from "./MovieCard.module.css";
const preURL = "https://www.themoviedb.org/t/p/w500";
const MovieCard = ({ movie }) => {
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
      <h3 className={styles.cardBody}>{title}</h3>
      <div className={styles.cardBody}>Rating: {vote_average}</div>
      <div className={styles.cardBody}>
        {overview.length > 126 ? overview.substring(0, 126) + "..." : overview}
      </div>
    </div>
  );
};

export default MovieCard;
