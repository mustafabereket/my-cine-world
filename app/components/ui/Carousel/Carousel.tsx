"use client";

import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.scss";
import MovieCard from "../../MovieCard/MovieCard";
import { Movie } from "@/app/types";

interface CarouselProps {
  movies: Movie[]; // The movies prop is an array of Movie objects
}

const Carousel = ({ movies }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  // Adjust the number of visible movies based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 976) {
        setIsMobile(true);
      } else if (window.innerWidth < 1368) {
        setVisibleCount(2);
        setIsMobile(false);
      } else if (window.innerWidth < 1758) {
        setVisibleCount(3);
        setIsMobile(false);
      } else {
        setVisibleCount(4);
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", updateVisibleCount);
    updateVisibleCount();

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Get the movies currently in the carousel
  const inCarousel = movies.slice(currentIndex, currentIndex + visibleCount);

  const handleClick = (direction: "next" | "prev") => {
    setCurrentIndex(
      (prev) =>
        direction === "next"
          ? Math.min(prev + 1, movies.length - visibleCount) // Prevent overflow
          : Math.max(prev - 1, 0) // Prevent underflow
    );
  };

  return (
    <div className={styles.mainCarousel}>
      {!isMobile ? (
        <>
          {" "}
          <button
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
            disabled={currentIndex + visibleCount >= movies.length}
            onClick={() => handleClick("next")}
          >
            Next
          </button>
        </>
      ) : (
        <div className={styles.mobileView}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
