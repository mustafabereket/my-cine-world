import styles from "./PopularGenres.module.scss";
import React from "react";
import { Genre } from "@/app/types";
import { getPopularGenres } from "@/app/api/movie-services";

const PopularGenres = async () => {
  // Fetch the data at build time
  const { genres } = await getPopularGenres();

  return (
    <div className={styles.mainContainer}>
      <div className="heading">
        <h2>Popular Genres</h2>
      </div>
      <div className={styles.genreContainer}>
        {genres &&
          genres.map((genre: Genre) => (
            <div key={genre.id} className={"genreButton"}>
              {genre.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularGenres;
