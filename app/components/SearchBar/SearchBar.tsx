"use client";
import { useState, useEffect } from "react";
import Form from "next/form";
import styles from "./SearchBar.module.scss";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const fetchMovies = async (text: string) => {
  if (text) {
    const resp = await fetch(`/api/search?query=${text}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    //setSearchResults(data.results);
    return data;
  } else {
    return [];
  }
};

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["movies", searchText],
    queryFn: () => fetchMovies(searchText),
    ...{
      enabled: false, // Disable automatic fetching
    },
  });
  console.log(data);
  const handleSubmit = () => {
    if (searchText) {
      router.push(`?query=${encodeURIComponent(searchText)}`);
      refetch();
    }
  };

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchText(query);
      refetch();
    }
  }, []);

  const clearSearch = () => {
    setSearchText("");
    //setSearchResults([]);
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
        <div>
          <button type="submit">Search</button>
          {data?.results?.length ? (
            <button onClick={clearSearch}>Clear Search</button>
          ) : null}
        </div>
      </Form>
      <div className={styles.searchResults}>
        {data?.results?.map((movie: Movie) => {
          return <MovieCard key={movie.id} movie={movie} query={searchText} />;
        })}

        {isLoading && <div>Loading . . .</div>}
      </div>
    </div>
  );
};

export default SearchBar;
