"use client";
import { useState, useEffect } from "react";
import Form from "next/form";
import styles from "./SearchBar.module.scss";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = () => {
    if (searchText) {
      fetchMovies(searchText);
    }
  };

  const fetchMovies = async (text) => {
    if (text) {
      router.push(`?query=${encodeURIComponent(text)}`);
      const resp = await fetch(`/api/search?query=${text}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
      });
      const data = await resp.json();
      setSearchResults(data.results);
    }
  };

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchText(query);
      fetchMovies(query);
    }
    console.log("sss");
  }, []);

  const clearSearch = () => {
    setSearchText("");
    setSearchResults([]);
    router.push("?");
  };

  return (
    <div className={styles.searchContainer}>
      SearchBar
      <Form className={styles.form} action={handleSubmit}>
        <label htmlFor="search-bar">
          Search any movie, artist, actor you like!!
        </label>
        <input
          type="text"
          className={styles.searchBox}
          name="search-bar"
          id="search-bar"
          placeholder="Let's go"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
        ></input>
        <button type="submit">Search</button>
        {searchResults.length ? (
          <button onClick={clearSearch}>Clear Search</button>
        ) : null}
      </Form>
      <div className={styles.searchResults}>
        {searchResults &&
          searchResults.map((movie: Movie) => {
            return (
              <MovieCard key={movie.id} movie={movie} query={searchText} />
            );
          })}
      </div>
    </div>
  );
};

export default SearchBar;
