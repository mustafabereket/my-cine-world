"use client";
import React from "react";
import styles from "./AddToWatchList.module.scss";
import AddIcon from "@mui/icons-material/Add";

const addToWatchlist = async (id: number) => {
  if (id) {
    const resp = await fetch(`/api/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type
      },
      body: JSON.stringify({ id }),
    });
    const data = await resp.json();
    //setSearchResults(data.results);
    console.log(data);
    return data;
  } else {
    return [];
  }
};

const AddToWatchList = ({ id }) => {
  return (
    <div
      className={styles.favoritesIcon}
      onClick={(e) => {
        e.preventDefault();
        addToWatchlist(id);
      }}
    >
      <AddIcon></AddIcon>
    </div>
  );
};

export default AddToWatchList;
