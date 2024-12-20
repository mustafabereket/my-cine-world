"use client";
import { useState } from "react";
import Form from "next/form";
import styles from "./SearchBar.module.css";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "@/app/types";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async () => {
    const resp = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type
      },
      body: JSON.stringify({ searchText }),
    });
    const data = await resp.json();
    console.log(data);

    setSearchResults(data.results);
  };

  return (
    <div className={styles.mainContainer}>
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
      </Form>
      <div className={styles.searchResults}>
        {searchResults &&
          searchResults.map((movie: Movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </div>
    </div>
  );
};

export default SearchBar;
