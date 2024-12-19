"use client";

import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import MovieCard from "../MovieCard/MovieCard";

const Carousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Adjust the number of visible movies based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };

    window.addEventListener("resize", updateVisibleCount);
    updateVisibleCount();

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Get the movies currently in the carousel
  const inCarousel = movies.slice(currentIndex, currentIndex + visibleCount);

  const handleClick = (direction) => {
    setCurrentIndex(
      (prev) =>
        direction === "next"
          ? Math.min(prev + 1, movies.length - visibleCount) // Prevent overflow
          : Math.max(prev - 1, 0) // Prevent underflow
    );
  };

  return (
    <div className={styles.mainCarousel}>
      <button
        className={styles.button}
        disabled={currentIndex === 0}
        onClick={() => handleClick("prev")}
      >
        Prev
      </button>
      <div className={styles.inCarousel}>
        {inCarousel.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <button
        className={styles.button}
        disabled={currentIndex + visibleCount >= movies.length}
        onClick={() => handleClick("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
