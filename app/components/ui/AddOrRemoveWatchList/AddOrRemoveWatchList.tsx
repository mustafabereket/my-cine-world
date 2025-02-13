"use client";
import React from "react";
import styles from "./AddOrRemoveWatchList.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "@/app/utils/providers/helpers";
import { setLocalStorage } from "../../../utils/providers/helpers";

const addToLocalWatchlist = async (id: number, action: "add" | "remove") => {
  const localWatchList = getLocalStorage("watchlist");

  if (action === "add") {
    const index = localWatchList.indexOf(id);
    if (index === -1) localWatchList.push(id);
  } else {
    const index = localWatchList.indexOf(id);
    if (index > -1) localWatchList.splice(index, 1);
  }

  setLocalStorage("watchlist", localWatchList);
};

type AddOrRemoveWatchListProps = {
  id: number;
  action: "add" | "remove";
};

const AddOrRemoveWatchList = ({ id, action }: AddOrRemoveWatchListProps) => {
  const localWatchList = getLocalStorage("watchlist");

  const router = useRouter();
  if (localWatchList.indexOf(id) !== -1) action = "remove";
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
          addToLocalWatchlist(id, action);
          router.refresh();
        }}
      >
        {action == "add" ? <AddIcon></AddIcon> : <RemoveIcon></RemoveIcon>}
      </div>
    </Tooltip>
  );
};

export default AddOrRemoveWatchList;
