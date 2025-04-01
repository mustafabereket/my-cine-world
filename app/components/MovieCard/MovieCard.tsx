import React from "react";
import Image from "next/image";
import styles from "./MovieCard.module.scss";
import { Movie } from "@/app/types";
import { preImgURL } from "@/app/config";
import Link from "next/link";
import AddOrRemoveWatchList from "../ui/AddOrRemoveWatchList/AddOrRemoveWatchList";
import { Rating, Tooltip } from "@mui/material";

interface MovieCardProps {
  movie: Movie;
  query?: string;
  action?: "add" | "remove";
}

const MovieCard = ({ movie, query, action = "add" }: MovieCardProps) => {
  const { title, vote_average, poster_path, overview, id } = movie;

  return (
    <Link className={styles.card} href={`/movie-details/${id}/?query=${query}`}>
      <div className={styles.imageContainer}>
        <AddOrRemoveWatchList id={id} action={action} />
        <Image
          alt={title || "No alt title found"}
          src={preImgURL + poster_path}
          width={300}
          height={400}
          className={styles.imgContainer}
        />
      </div>

      <div>
        <Tooltip
          title={`Rating: ${
            vote_average ? vote_average.toFixed(2) : `Not a rated movie`
          }`}
          arrow
        >
          <div>
            <h2>{title}</h2>
            {vote_average ? (
              <Rating readOnly max={10} value={vote_average} />
            ) : null}
          </div>
        </Tooltip>
      </div>
      <div>{overview}</div>
    </Link>
  );
};

export default MovieCard;
