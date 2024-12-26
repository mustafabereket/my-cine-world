import { getPopularGenres } from "@/app/api/movie-services";
import styles from "./PopularGenres.module.scss";
import React from "react";
import { Genre } from "@/app/types";

const PopularGenres = async () => {
  const { genres } = await getPopularGenres();

  return (
    <div className={styles.mainContainer}>
      {" "}
      <div className="heading">
        <h2>Popular Genres</h2>
      </div>
      <div className={styles.genreContainer}>
        {genres.map((genre: Genre) => (
          <div key={genre.id} className={"genreButton"}>
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularGenres;
