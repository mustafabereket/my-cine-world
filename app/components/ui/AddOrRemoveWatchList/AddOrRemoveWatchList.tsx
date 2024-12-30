"use client";
import React from "react";
import styles from "./AddOrRemoveWatchList.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";

const addToWatchlist = async (id: number, action: "add" | "remove") => {
  if (id) {
    const resp = await fetch(`/api/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type
      },
      body: JSON.stringify({ id, action }),
    });
    const data = await resp.json();
    //setSearchResults(data.results);
    console.log(data);
    return data;
  } else {
    return [];
  }
};

type AddOrRemoveWatchListProps = {
  id: number;
  action: "add" | "remove";
};

const AddOrRemoveWatchList = ({ id, action }: AddOrRemoveWatchListProps) => {
  const router = useRouter();

  const refreshData = () => {
    router.refresh();
  };
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: "1rem", // Adjust the value to your liking
            padding: "8px 12px",
          },
        },
      }}
      title={`${
        action == "add" ? "Add To WatchList" : "Remove From WatchList"
      }`}
      arrow
    >
      <div
        className={styles.favoritesIcon}
        onClick={(e) => {
          e.preventDefault();
          addToWatchlist(id, action);
          if (action == "remove") {
            refreshData();
          }
        }}
      >
        {action == "add" ? <AddIcon></AddIcon> : <RemoveIcon></RemoveIcon>}
      </div>
    </Tooltip>
  );
};

export default AddOrRemoveWatchList;
