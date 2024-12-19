"use client";

import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import MovieCard from "../MovieCard/MovieCard";

const Carousel = ({ movies }) => {
  const [windowSize, setWindowSize] = useState({ start: 0, end: 4 });
  const [inCarousel, setInCarousel] = useState(
    movies.slice(windowSize.start, windowSize.end)
  );

  useEffect(() => {
    setInCarousel(movies.slice(windowSize.start, windowSize.end));
  }, [windowSize]);

  const handleClick = (direction) => {
    if ((direction = "next")) {
      setWindowSize((prev) => {
        return { start: prev.start + 1, end: prev.end + 1 };
      });
    } else {
      setWindowSize((prev) => {
        return { start: prev.start - 1, end: prev.end - 1 };
      });
    }
  };

  return (
    <div className={styles.mainCarousel}>
      <div>
        <button
          disabled={windowSize.start == 0}
          onClick={() => {
            handleClick("prev");
          }}
        >
          {" "}
          Prev{" "}
        </button>
      </div>
      <div className={styles.inCarousel}>
        {inCarousel.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div>
        <button
          disabled={windowSize.end === movies.length}
          onClick={() => {
            handleClick("next");
          }}
        >
          {" "}
          Next{" "}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
