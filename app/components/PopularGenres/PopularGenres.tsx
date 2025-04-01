"use client";

import styles from "./PopularGenres.module.scss";
import React, { useState } from "react";
import { Genre } from "@/app/types";
import { getPopularGenres } from "@/app/api/movie-services";
import GenreButton from "../ui/GenreButton/GenreButton";
import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import Carousel from "../ui/Carousel/Carousel";
import MovieGrid from "../MovieGrid/MovieGrid";
import Pagination from "../ui/Pagination/Pagination";

const fetchGenres = async () => {
  try {
    const resp = await fetch("/api/genres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();
    console.log("DATA", data);
    return data;
  } catch (error) {
    return error;
  }
};

const PopularGenres = () => {
  // Convert this to be fetched immediately with ReactQuery
  // const { genres } = await getPopularGenres();
  const queryClient = useQueryClient();

  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const fetchDiscoverMovies = async (pageNum) => {
    const keys = Array.from(selectedGenres).join(",");
    const resp = await fetch(`/api/discover?keys=${keys}&page=${pageNum}`);
    const data = await resp.json();
    console.log(data);
    return data;
  };

  const {
    data: discoverMovies,
    isLoading: discoverIsLoading,
    error: errorIsLoading,
  } = useQuery({
    queryKey: ["discoverMovies", Array.from(selectedGenres), currentPage],
    queryFn: () => fetchDiscoverMovies(currentPage),
    enabled: selectedGenres.size > 0,
    keepPreviousData: true,
  });

  const genres = data?.genres.filter((item) => item.id !== 12); // adventure exception

  const handleClick = (id) => {
    const tempSet = new Set(selectedGenres);
    tempSet.has(id) ? tempSet.delete(id) : tempSet.add(id);
    setSelectedGenres(tempSet);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };
  const totalPages = discoverMovies?.total_pages ?? 0;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.mainContainer}>
      <div className="heading">
        <h2>Popular Genres</h2>
      </div>
      <div className={styles.genreContainer}>
        {genres &&
          genres.map((genre: Genre) => (
            <div
              key={genre.id}
              className={`genreButton ${
                selectedGenres.has(genre.id) ? styles.selected : ""
              }`}
              onClick={() => handleClick(genre.id)}
            >
              {genre.name}
            </div>
          ))}
      </div>
      {/* {discoverMovies && (
        <h4>
          Explore movies with genres:{" "}
          {genres
            .filter((genre) => selectedGenres.has(genre.id))
            .map((item) => (
              <span key={item.name + item.id}>{item.name + " "} </span>
            ))}
        </h4>
      )} */}
      {discoverMovies && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {discoverMovies && <MovieGrid movies={discoverMovies.results} />}
      {discoverMovies && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PopularGenres;
