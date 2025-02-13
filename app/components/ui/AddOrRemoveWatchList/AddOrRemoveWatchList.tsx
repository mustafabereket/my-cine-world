"use client";
import React from "react";
import styles from "./AddOrRemoveWatchList.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";

const addToLocalWatchlist = async (id: number, action: "add" | "remove") => {
  const localWatchList = JSON.parse(localStorage.getItem("watchlist") || "[]");

  if (action === "add") {
    const index = localWatchList.indexOf(id);
    if (index === -1) localWatchList.push(id);
  } else {
    const index = localWatchList.indexOf(id);
    if (index > -1) localWatchList.splice(index, 1);
  }

  localStorage.setItem("watchlist", JSON.stringify(localWatchList));
};

type AddOrRemoveWatchListProps = {
  id: number;
  action: "add" | "remove";
};

const AddOrRemoveWatchList = ({ id, action }: AddOrRemoveWatchListProps) => {
  const localWatchList = JSON.parse(localStorage.getItem("watchlist") || "[]");

  const router = useRouter();
  if (localWatchList.indexOf(id) !== -1) action = "remove";
  const handleClick = (e) => {
    e.preventDefault();
    addToLocalWatchlist(id, action);
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
      <div className={styles.favoritesIcon} onClick={handleClick}>
        {action == "add" ? <AddIcon></AddIcon> : <RemoveIcon></RemoveIcon>}
      </div>
    </Tooltip>
  );
};

export default AddOrRemoveWatchList;
